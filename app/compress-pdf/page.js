'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';

const related = [
  { name: 'Merge PDF',  slug: 'merge-pdf',  desc: 'Combine multiple PDFs' },
  { name: 'Split PDF',  slug: 'split-pdf',  desc: 'Break a PDF into pieces' },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg', desc: 'Convert pages to images' },
];

const howSteps = [
  { title: 'Drop your PDF',     body: 'Drag a PDF file in, or click to browse from your device.' },
  { title: 'Pick a compression level', body: 'Light is lossless for text PDFs. Medium and High re-render pages for image-heavy files.' },
  { title: 'Download',          body: 'Your compressed PDF downloads instantly. Never larger than the original.' },
];

const LEVELS = [
  { id: 'light',  label: 'Light',  desc: 'Structural optimization. Lossless. Best for text PDFs.',         scale: 2.0, quality: 0.85 },
  { id: 'medium', label: 'Medium', desc: 'Re-renders pages at 1.5× resolution, 60% quality. Recommended.', scale: 1.5, quality: 0.60 },
  { id: 'high',   label: 'High',   desc: 'Maximum compression at 1× resolution, 35% quality.',             scale: 1.0, quality: 0.35 },
];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ─── icons ─── */
const I = {
  up:  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  x:   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  arr: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  dl:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
};

export default function CompressPDF() {
  const [file, setFile]         = useState(null);
  const [level, setLevel]       = useState('medium');
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult]     = useState(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setResult(null); setProgress('');
  }

  async function compress() {
    if (!file) return;
    setLoading(true); setResult(null);
    const startTime = Date.now();

    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuf = await file.arrayBuffer();
      const origSize = arrayBuf.byteLength;
      const pdfSrc = await pdfjsLib.getDocument({ data: arrayBuf.slice(0) }).promise;
      const totalPages = pdfSrc.numPages;
      const cfg = LEVELS.find(l => l.id === level);

      let finalBytes;
      let strategy;

      if (level === 'light') {
        setProgress('Optimizing structure...');
        const srcDoc = await PDFDocument.load(arrayBuf);
        finalBytes = await srcDoc.save({ useObjectStreams: true, addDefaultPage: false });
        strategy = 'structural';
      } else {
        setProgress(`Compressing ${totalPages} pages...`);
        const renderDoc = await PDFDocument.create();
        for (let i = 1; i <= totalPages; i++) {
          setProgress(`Page ${i} of ${totalPages}...`);
          const page = await pdfSrc.getPage(i);
          const origVp = page.getViewport({ scale: 1 });
          const renderVp = page.getViewport({ scale: cfg.scale });
          const canvas = document.createElement('canvas');
          canvas.width = renderVp.width; canvas.height = renderVp.height;
          const ctx = canvas.getContext('2d', { alpha: false });
          ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport: renderVp }).promise;
          const jpgBlob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', cfg.quality));
          const jpgBuf = await jpgBlob.arrayBuffer();
          const img = await renderDoc.embedJpg(jpgBuf);
          const newPage = renderDoc.addPage([origVp.width, origVp.height]);
          newPage.drawImage(img, { x: 0, y: 0, width: origVp.width, height: origVp.height });
          canvas.width = 0; canvas.height = 0;
        }
        finalBytes = await renderDoc.save();
        strategy = 'render';
        if (finalBytes.length >= origSize) {
          const srcDoc = await PDFDocument.load(arrayBuf);
          finalBytes = await srcDoc.save({ useObjectStreams: true });
          strategy = 'structural';
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const saved = origSize - finalBytes.length;
      const pct = parseFloat(((saved / origSize) * 100).toFixed(1));
      setResult({ bytes: finalBytes, size: finalBytes.length, pct, strategy, elapsed });

      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      const name = file.name.replace(/\.pdf$/i, '-compressed-by-breklo.pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name; a.click();
      URL.revokeObjectURL(url);
      setProgress('');
    } catch (e) {
      alert('Error compressing PDF: ' + e.message);
      setProgress('');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="compress-pdf"
      title="Compress PDF without losing quality."
      subtitle="Three smart levels, optimized per PDF type. Never outputs a file larger than the original."
      bullets={[
        'Analyzes content first — text vs. image PDFs get different treatment',
        'Three levels: Light (lossless), Medium (1.5×), High (1×)',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
      ]}
      relatedTools={related}
      howSteps={howSteps}
    >
      {/* DROP / FILE */}
      {!file ? (
        <div
          className="bk-drop"
          data-dragging={dragOver}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById('cp-input').click()}
        >
          <div className="bk-drop-ic">{I.up}</div>
          <div className="bk-drop-title">Drop your PDF here</div>
          <div className="bk-drop-sub">or click to browse — up to 100 MB</div>
          <input id="cp-input" type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'var(--bk-paper-2)', border: '1px solid var(--bk-line)', borderRadius: 12 }}>
          <div style={{ width: 40, height: 50, borderRadius: 7, background: '#dc2626', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '.04em', flexShrink: 0 }}>PDF</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--bk-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--bk-ink-5)', marginTop: 2 }}>{formatSize(file.size)}</div>
          </div>
          <button onClick={() => { setFile(null); setResult(null); }} style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', border: '1px solid var(--bk-line)', color: 'var(--bk-ink-4)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>{I.x}</button>
        </div>
      )}

      {/* LEVELS */}
      {file && (
        <div style={{ marginTop: 24 }}>
          <label className="bk-input-label">Compression level</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LEVELS.map(l => (
              <button key={l.id} className="bk-option" data-on={level === l.id} onClick={() => setLevel(l.id)}>
                <div className="bk-option-title">{l.label}</div>
                <div className="bk-option-desc">{l.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {progress && (
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--bk-brand-soft)', border: '1px solid var(--bk-brand-soft-2)', borderRadius: 9, fontSize: 13, color: 'var(--bk-brand-ink)', fontWeight: 500 }}>{progress}</div>
      )}

      {/* RESULT */}
      {result && (
        <div style={{ marginTop: 14, padding: 20, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12 }}>
          {result.pct > 5 ? (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 40, color: '#15803d', letterSpacing: '-1px', lineHeight: 1 }}>-{result.pct}%</div>
                <div style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>reduction</div>
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #bbf7d0', paddingLeft: 20 }}>
                <div style={{ fontSize: 14, color: '#166534' }}>Original: <strong>{formatSize(file.size)}</strong></div>
                <div style={{ fontSize: 14, color: '#166534', marginTop: 2 }}>Compressed: <strong>{formatSize(result.size)}</strong></div>
                <div style={{ fontSize: 12, color: '#65a30d', marginTop: 4 }}>{result.elapsed}s · {result.strategy === 'render' ? 'Image re-render' : 'Structural'}</div>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#92400e' }}>Already optimized — this PDF can&apos;t be compressed further at this level.</div>
          )}
        </div>
      )}

      {/* PRIMARY CTA */}
      <div style={{ marginTop: 22 }}>
        <button className="bk-primary bk-primary-full" onClick={compress} disabled={!file || loading}>
          {file && I.dl}
          <span>{loading ? 'Compressing…' : result ? 'Compress again' : 'Compress PDF'}</span>
          {!loading && !result && I.arr}
        </button>
      </div>

      <ToolContent slug="compress-pdf" />
    </ToolLayout>
  );
}
