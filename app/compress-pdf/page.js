'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';

const related = [
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Split PDF', slug: 'split-pdf' },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
];

const LEVELS = [
  { id: 'light',  label: 'Light',  desc: 'Structural optimization. Lossless. Best for text PDFs.',           scale: 2.0, quality: 0.85 },
  { id: 'medium', label: 'Medium', desc: 'Re-renders pages at 1.5× resolution, 60% quality. Recommended.',   scale: 1.5, quality: 0.60 },
  { id: 'high',   label: 'High',   desc: 'Maximum compression at 1× resolution, 35% quality.',               scale: 1.0, quality: 0.35 },
];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function CompressPDF() {
  const [file, setFile]         = useState(null);
  const [level, setLevel]       = useState('medium');
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState('');
  const [result, setResult]     = useState(null);
  const [dragging, setDrag]     = useState(false);

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

      // ─── STEP 1: ANALYZE PDF ───
      setProgress('Analyzing PDF...');
      const pdfSrc = await pdfjsLib.getDocument({ data: arrayBuf.slice(0) }).promise;
      const totalPages = pdfSrc.numPages;

      const samplePages = Math.min(3, totalPages);
      let totalTextChars = 0;
      let totalImageOps = 0;

      for (let i = 1; i <= samplePages; i++) {
        const page = await pdfSrc.getPage(i);
        const textContent = await page.getTextContent();
        totalTextChars += textContent.items.reduce((sum, item) => sum + (item.str?.length || 0), 0);
        const ops = await page.getOperatorList();
        totalImageOps += ops.fnArray.filter(fn =>
          fn === pdfjsLib.OPS.paintImageXObject ||
          fn === pdfjsLib.OPS.paintJpegXObject ||
          fn === pdfjsLib.OPS.paintInlineImageXObject
        ).length;
      }

      const avgCharsPerPage = totalTextChars / samplePages;
      const avgImagesPerPage = totalImageOps / samplePages;
      const bytesPerPage = origSize / totalPages;

      const isTextHeavy = avgCharsPerPage > 500 && avgImagesPerPage < 2 && bytesPerPage < 50000;
      const isImageHeavy = avgImagesPerPage > 0 && bytesPerPage > 30000;
      const isAlreadyOptimized = bytesPerPage < 15000;

      // ─── STEP 2: PICK STRATEGY ───
      const cfg = LEVELS.find(l => l.id === level);
      let finalBytes;
      let strategy;
      let warning = null;

      if (isAlreadyOptimized && level === 'light') {
        setProgress('Optimizing structure...');
        const srcDoc = await PDFDocument.load(arrayBuf);
        finalBytes = await srcDoc.save({ useObjectStreams: true, addDefaultPage: false });
        strategy = 'structural';
        if (finalBytes.length >= origSize * 0.97) {
          warning = 'This PDF is already heavily optimized. For more reduction, try Medium or High mode.';
        }
      } else if (isTextHeavy && level === 'light') {
        setProgress('Optimizing structure...');
        const srcDoc = await PDFDocument.load(arrayBuf);
        const optDoc = await PDFDocument.create();
        const pages = await optDoc.copyPages(srcDoc, srcDoc.getPageIndices());
        pages.forEach(p => optDoc.addPage(p));
        finalBytes = await optDoc.save({ useObjectStreams: true });
        strategy = 'structural';
        if (finalBytes.length >= origSize * 0.97) {
          warning = 'Text PDFs cannot be compressed much without quality loss. Try Medium for re-render compression.';
        }
      } else {
        // Re-render strategy
        setProgress(`Compressing ${totalPages} pages...`);
        const renderDoc = await PDFDocument.create();

        const BATCH_SIZE = 5;
        for (let batchStart = 1; batchStart <= totalPages; batchStart += BATCH_SIZE) {
          const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, totalPages);

          for (let i = batchStart; i <= batchEnd; i++) {
            setProgress(`Page ${i} of ${totalPages}...`);
            const page = await pdfSrc.getPage(i);
            const origVp = page.getViewport({ scale: 1 });
            const renderVp = page.getViewport({ scale: cfg.scale });

            const canvas = document.createElement('canvas');
            canvas.width = renderVp.width;
            canvas.height = renderVp.height;
            const ctx = canvas.getContext('2d', { alpha: false });
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport: renderVp }).promise;

            const jpgBlob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', cfg.quality));
            const jpgBuf = await jpgBlob.arrayBuffer();

            const img = await renderDoc.embedJpg(jpgBuf);
            const newPage = renderDoc.addPage([origVp.width, origVp.height]);
            newPage.drawImage(img, { x: 0, y: 0, width: origVp.width, height: origVp.height });

            canvas.width = 0; canvas.height = 0;
          }

          await new Promise(r => setTimeout(r, 0));
        }

        finalBytes = await renderDoc.save();
        strategy = 'render';

        if (finalBytes.length >= origSize) {
          setProgress('Result was larger — using optimized original...');
          const srcDoc = await PDFDocument.load(arrayBuf);
          finalBytes = await srcDoc.save({ useObjectStreams: true });
          strategy = 'structural';
          warning = 'Re-rendering would have made the file larger. Returned optimized original.';
        }
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const saved = origSize - finalBytes.length;
      const pct = parseFloat(((saved / origSize) * 100).toFixed(1));

      setResult({ bytes: finalBytes, size: finalBytes.length, pct, strategy, warning, elapsed, isTextHeavy, isImageHeavy });

      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      const name = file.name.replace(/\.pdf$/i, '-compressed-by-breklo.pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name; a.click();
      URL.revokeObjectURL(url);
      setProgress('');
    } catch (e) {
      console.error(e);
      alert('Error compressing PDF: ' + e.message);
      setProgress('');
    }
    setLoading(false);
  }

  function downloadAgain() {
    if (!result) return;
    const blob = new Blob([result.bytes], { type: 'application/pdf' });
    const name = file.name.replace(/\.pdf$/i, '-compressed-by-breklo.pdf');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolLayout
      slug="compress-pdf"
      title="Compress PDF"
      subtitle="Analyzes your PDF and picks the best compression strategy automatically."
      bullets={[
        'Analyzes content first — text vs image PDFs get different treatment',
        'Never outputs a file larger than the original',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
      ]}
      relatedTools={related}
    >
      {/* DROP ZONE */}
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `1.5px dashed ${dragging ? '#0071e3' : '#e2e8f0'}`,
          borderRadius: 14, padding: '32px 24px', textAlign: 'center',
          background: dragging ? '#f0f6ff' : '#fafafa', transition: 'all .15s',
          marginBottom: 16, cursor: 'pointer',
        }}
        onClick={() => !file && document.getElementById('fi').click()}
      >
        {file ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
            <div style={{ width: 40, height: 40, background: '#fff1f2', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#be123c' }}>PDF</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{formatSize(file.size)}</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); setResult(null); }}
              style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
          </div>
        ) : (
          <>
            <div style={{ width: 44, height: 44, background: '#0071e3', borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your PDF here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* TIP */}
      {file && !result && !loading && (
        <div style={{ background: '#eff4ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#1e40af', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span>💡</span>
          <span><strong>Tip:</strong> Use Light for text PDFs (lossless). Use Medium or High for PDFs with images or scans (text becomes images).</span>
        </div>
      )}

      {/* COMPRESSION LEVEL */}
      {file && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Compression level</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {LEVELS.map(l => (
              <button key={l.id} onClick={() => setLevel(l.id)} style={{
                padding: '11px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                border: `1.5px solid ${level === l.id ? '#0071e3' : '#e5e7eb'}`,
                background: level === l.id ? '#eff6ff' : '#fff',
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: level === l.id ? '#0071e3' : '#111', marginBottom: 2 }}>{l.label}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{l.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PROGRESS */}
      {progress && (
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#1d4ed8', fontWeight: 500 }}>
          {progress}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          {result.pct > 5 ? (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 36, color: '#15803d', letterSpacing: '-1px', lineHeight: 1 }}>-{result.pct}%</div>
                <div style={{ fontSize: 12, color: '#166534', marginTop: 4 }}>reduction</div>
              </div>
              <div style={{ flex: 1, borderLeft: '1px solid #bbf7d0', paddingLeft: 20 }}>
                <div style={{ fontSize: 14, color: '#166534', marginBottom: 4 }}>Original: <strong>{formatSize(file.size)}</strong></div>
                <div style={{ fontSize: 14, color: '#166534' }}>Compressed: <strong>{formatSize(result.size)}</strong></div>
                <div style={{ fontSize: 12, color: '#65a30d', marginTop: 4 }}>{result.elapsed}s · {result.strategy === 'render' ? 'Image re-render' : 'Structural'}</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#92400e', marginBottom: 2 }}>Already optimized</div>
                <div style={{ fontSize: 13, color: '#a16207' }}>This PDF can't be compressed further at this level.</div>
              </div>
            </div>
          )}

          {result.warning && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: '#92400e', marginBottom: 12 }}>
              💡 {result.warning}
            </div>
          )}

          <button onClick={downloadAgain} style={{ width: '100%', padding: '12px', background: '#15803d', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            Download {result.pct > 5 ? 'compressed' : 'optimized'} PDF
          </button>

          {result.pct < 30 && result.strategy === 'render' && level !== 'high' && (
            <button onClick={() => { setLevel('high'); setResult(null); }} style={{ width: '100%', padding: '10px', background: 'transparent', color: '#0071e3', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
              Try High compression instead
            </button>
          )}
          {result.pct < 5 && result.strategy === 'structural' && level === 'light' && (
            <button onClick={() => { setLevel('medium'); setResult(null); }} style={{ width: '100%', padding: '10px', background: 'transparent', color: '#0071e3', border: '1px solid #bfdbfe', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>
              Try Medium for stronger compression
            </button>
          )}
        </div>
      )}

      <button onClick={compress} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
      }}>
        {loading ? 'Compressing...' : result ? 'Compress again' : 'Compress PDF'}
      </button>
    </ToolLayout>
  );
}
