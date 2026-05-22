'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
  { name: 'Image to PDF', slug: 'image-to-pdf' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

export default function PngToPdf() {
  const [files, setFiles]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  function addFiles(incoming) {
    const imgs = Array.from(incoming).filter(f => f.type === 'image/png');
    setFiles(prev => [...prev, ...imgs]);
    setDone(false);
  }

  function removeFile(i) { setFiles(prev => prev.filter((_, idx) => idx !== i)); }
  function move(i, dir) {
    setFiles(prev => {
      const arr = [...prev]; const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      [arr[i], arr[j]] = [arr[j], arr[i]]; return arr;
    });
  }

  async function convert() {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const pdf = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        const img = await pdf.embedPng(buf);
        const page = pdf.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      downloadFile(await pdf.save(), 'breklo-converted.pdf');
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting images. Make sure all files are valid PNGs.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="PNG to PDF"
      subtitle="Convert one or multiple PNG images into a single PDF document."
      bullets={[
        'Preserves PNG transparency and quality',
        'Each image becomes one PDF page',
        'Drag to reorder images before converting',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
    >
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
        style={{
          border: `1.5px dashed ${dragging ? '#0071e3' : '#e2e8f0'}`,
          borderRadius: 14, padding: '32px 24px', textAlign: 'center',
          background: dragging ? '#f0f6ff' : '#fafafa', transition: 'all .15s',
          marginBottom: 16, cursor: 'pointer',
        }}
        onClick={() => document.getElementById('fi').click()}
      >
        <div style={{ width: 44, height: 44, background: '#0071e3', borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
        </div>
        <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>
          {files.length === 0 ? 'Drop PNG files here' : 'Add more PNGs'}
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>or click to browse</p>
        <input id="fi" type="file" multiple accept="image/png" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 9, marginBottom: 6 }}>
              <div style={{ width: 36, height: 36, background: '#f5f3ff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: '#6d28d9' }}>PNG</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(f.size)}</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={() => move(i, -1)} disabled={i === 0} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12, color: '#555' }}>↑</button>
                <button onClick={() => move(i, 1)} disabled={i === files.length - 1} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12, color: '#555' }}>↓</button>
                <button onClick={() => removeFile(i)} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', fontSize: 12, color: '#ef4444' }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button onClick={convert} disabled={files.length === 0 || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: files.length === 0 ? '#e5e7eb' : '#0071e3',
        color: files.length === 0 ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: files.length === 0 ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Done! Convert again?' : `Convert ${files.length > 0 ? files.length : ''} PNG${files.length !== 1 ? 's' : ''} to PDF`}
      </button>
    </ToolLayout>
  );
}
