'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Organize PDF', slug: 'organize-pdf' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

export default function RotatePDF() {
  const [file, setFile]       = useState(null);
  const [angle, setAngle]     = useState(90);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setDone(false);
  }

  async function rotate() {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer());
      doc.getPages().forEach(p => {
        const current = p.getRotation().angle;
        p.setRotation(degrees((current + angle) % 360));
      });
      const bytes = await doc.save();
      downloadFile(bytes, 'breklo-rotated.pdf');
      setDone(true);
    } catch (e) {
      alert('Error rotating PDF.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="rotate-pdf"
      title="Rotate PDF"
      subtitle="Rotate all pages in your PDF by 90°, 180°, or 270° with one click."
      bullets={[
        'Rotate all pages at once',
        'Choose 90°, 180° or 270° rotation',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
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
            <button onClick={e => { e.stopPropagation(); setFile(null); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
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

      {/* ANGLE SELECTOR */}
      {file && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[90, 180, 270].map(a => (
            <button key={a} onClick={() => setAngle(a)} style={{
              flex: 1, padding: '10px', borderRadius: 9,
              border: `1.5px solid ${angle === a ? '#0071e3' : '#e5e7eb'}`,
              background: angle === a ? '#eff6ff' : '#fff',
              color: angle === a ? '#0071e3' : '#555',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
            }}>
              {a}° {a === 90 ? '↻' : a === 180 ? '↺↻' : '↺'}
            </button>
          ))}
        </div>
      )}

      <button onClick={rotate} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Rotating...' : done ? 'Done! Rotate again?' : `Rotate ${angle}°`}
      </button>
    </ToolLayout>
  );
}
