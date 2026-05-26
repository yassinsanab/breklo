'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { formatSize } from '@/lib/pdfUtils';
import { downloadBlob } from '@/lib/download';

const related = [
  { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
  { name: 'PDF to Text', slug: 'pdf-to-text' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

export default function PdfToPng() {
  const [file, setFile]         = useState(null);
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState('');
  const [done, setDone]         = useState(false);
  const [dragging, setDrag]     = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setDone(false); setProgress('');
  }

  async function convert() {
    if (!file) return;
    setLoading(true); setDone(false);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;

      for (let i = 1; i <= total; i++) {
        setProgress(`Converting page ${i} of ${total}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
        downloadBlob(blob, file.name.replace(/\.pdf$/i, '.png'), total > 1 ? `page-${i}` : '');
        await new Promise(r => setTimeout(r, 300));
      }
      setProgress(`Done — ${total} image${total > 1 ? 's' : ''} downloaded`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting PDF. Please try again.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="pdf-to-png"
      title="PDF to PNG"
      subtitle="Convert every page of your PDF into high-quality, transparent-ready PNG images."
      bullets={[
        'Lossless PNG output — no quality loss',
        'Each page becomes a separate PNG file',
        'Transparent background support',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
    >
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
            <button onClick={e => { e.stopPropagation(); setFile(null); setDone(false); setProgress(''); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
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

      {progress && (
        <div style={{ background: done ? '#f0fdf4' : '#eff6ff', border: `1px solid ${done ? '#bbf7d0' : '#bfdbfe'}`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: done ? '#15803d' : '#1d4ed8', fontWeight: 500 }}>
          {progress}
        </div>
      )}

      <button onClick={convert} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Convert again' : 'Convert to PNG'}
      </button>
    </ToolLayout>
  );
}
