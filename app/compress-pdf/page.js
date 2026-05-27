'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';

const related = [
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Split PDF', slug: 'split-pdf' },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
];

const LEVELS = [
  { id: 'light',  label: 'Light',  desc: 'Good quality. Best for sharing and email.',  scale: 2.0, quality: 0.82 },
  { id: 'medium', label: 'Medium', desc: 'Balanced. Great for most documents.',         scale: 1.5, quality: 0.62 },
  { id: 'high',   label: 'High',   desc: 'Smallest file. Best for archiving.',          scale: 1.0, quality: 0.42 },
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
    try {
      const cfg = LEVELS.find(l => l.id === level);
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
      const { PDFDocument } = await import('pdf-lib');

      const arrayBuf = await file.arrayBuffer();
      const src = await pdfjsLib.getDocument({ data: arrayBuf }).promise;
      const total = src.numPages;
      const newPdf = await PDFDocument.create();

      for (let i = 1; i <= total; i++) {
        setProgress(`Compressing page ${i} of ${total}...`);
        const page = await src.getPage(i);
        const viewport = page.getViewport({ scale: cfg.scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport }).promise;

        const jpgBlob = await new Promise(resolve =>
          canvas.toBlob(resolve, 'image/jpeg', cfg.quality)
        );
        const jpgBuf = await jpgBlob.arrayBuffer();

        const origViewport = page.getViewport({ scale: 1 });
        const img = await newPdf.embedJpg(jpgBuf);
        const newPage = newPdf.addPage([origViewport.width, origViewport.height]);
        newPage.drawImage(img, { x: 0, y: 0, width: origViewport.width, height: origViewport.height });
      }

      setProgress('Finalizing...');
      const bytes = await newPdf.save();
      const newSize = bytes.length;
      const saved = file.size - newSize;
      const pct = parseFloat(Math.max(0, ((saved / file.size) * 100)).toFixed(1));

      setResult({ bytes, size: newSize, pct });

      const blob = new Blob([bytes], { type: 'application/pdf' });
      const name = file.name.replace(/\.pdf$/i, '-compressed-by-breklo.pdf');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name; a.click();
      URL.revokeObjectURL(url);

      setProgress('');
    } catch (e) {
      console.error(e);
      alert('Error compressing PDF. Please try again.');
      setProgress('');
    }
    setLoading(false);
  }

  function downloadResult() {
    if (!result) return;
    const blob = new Blob([result.bytes], { type: 'application/pdf' });
    const name = file.name.replace(/\.pdf$/i, '-compressed-by-breklo.pdf');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  }

  const nextLevel = level === 'light' ? 'medium' : level === 'medium' ? 'high' : null;

  return (
    <ToolLayout
      slug="compress-pdf"
      title="Compress PDF"
      subtitle="Significantly reduce PDF file size — choose your compression level."
      bullets={[
        'Three compression levels to choose from',
        'Re-renders pages as JPEG for maximum size reduction',
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
          <p style={{ fontSize: 11, color: '#f59e0b', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            ⚠ All modes convert pages to images. Text will not be selectable in the output.
          </p>
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
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ textAlign: 'center', minWidth: 64 }}>
              <div style={{ fontWeight: 800, fontSize: 28, color: '#15803d', letterSpacing: '-1px', lineHeight: 1 }}>
                {result.pct > 0 ? `-${result.pct}%` : '0%'}
              </div>
              <div style={{ fontSize: 11, color: '#166534', marginTop: 2 }}>reduction</div>
            </div>
            <div style={{ borderLeft: '1px solid #bbf7d0', paddingLeft: 20, flex: 1 }}>
              <div style={{ fontSize: 13, color: '#166534', marginBottom: 4 }}>Original: <strong>{formatSize(file.size)}</strong></div>
              <div style={{ fontSize: 13, color: '#166534' }}>Compressed: <strong>{formatSize(result.size)}</strong></div>
            </div>
          </div>
          {/* Reduction bar */}
          <div style={{ background: '#dcfce7', borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: '#16a34a', height: '100%', width: `${Math.min(100, result.pct)}%`, borderRadius: 6, transition: 'width .6s ease' }}/>
          </div>
          <button onClick={downloadResult} style={{
            width: '100%', padding: '11px', borderRadius: 9, border: 'none',
            background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            Download compressed PDF
          </button>
          {result.pct < 30 && nextLevel && (
            <button onClick={() => { setLevel(nextLevel); setResult(null); }} style={{
              width: '100%', marginTop: 8, padding: '9px', borderRadius: 9,
              border: '1.5px solid #0071e3', background: '#fff', color: '#0071e3',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>
              Try stronger compression ({LEVELS.find(l => l.id === nextLevel)?.label})
            </button>
          )}
        </div>
      )}

      <button onClick={compress} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Compressing...' : result ? 'Compress again' : 'Compress PDF'}
      </button>
    </ToolLayout>
  );
}
