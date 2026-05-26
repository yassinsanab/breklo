'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Rotate PDF', slug: 'rotate-pdf' },
  { name: 'Delete PDF Pages', slug: 'delete-pdf-pages' },
];

export default function OrganizePDF() {
  const [file, setFile]       = useState(null);
  const [pageCount, setCount] = useState(0);
  const [order, setOrder]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setDone(false);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(await f.arrayBuffer());
    const n = doc.getPageCount();
    setCount(n);
    setOrder(Array.from({ length: n }, (_, i) => i));
  }

  function moveItem(i, dir) {
    setOrder(prev => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  }

  async function save() {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(await file.arrayBuffer());
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(src, order);
      copied.forEach(p => newDoc.addPage(p));
      downloadFile(await newDoc.save(), file.name);
      setDone(true);
    } catch (e) {
      alert('Error organizing PDF.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="organize-pdf"
      title="Organize PDF"
      subtitle="Reorder pages in your PDF by dragging them up or down to your preferred order."
      bullets={[
        'Reorder pages with up/down controls',
        'Preview page numbers at a glance',
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
          borderRadius: 14, padding: file ? '16px' : '32px 24px', textAlign: 'center',
          background: dragging ? '#f0f6ff' : '#fafafa', transition: 'all .15s',
          marginBottom: 16, cursor: file ? 'default' : 'pointer',
        }}
        onClick={() => !file && document.getElementById('fi').click()}
      >
        {file ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: '#fff1f2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: '#be123c' }}>PDF</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{file.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(file.size)} · {pageCount} pages</div>
              </div>
              <button onClick={() => { setFile(null); setOrder([]); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 26, height: 26, cursor: 'pointer', color: '#ef4444', fontSize: 11 }}>✕</button>
            </div>
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              {order.map((pageIdx, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 8, marginBottom: 5 }}>
                  <span style={{ width: 28, height: 28, background: '#eff6ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1d4ed8', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#374151', flex: 1 }}>Page {pageIdx + 1}</span>
                  <div style={{ display: 'flex', gap: 3 }}>
                    <button onClick={() => moveItem(i, -1)} disabled={i === 0} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 5, width: 26, height: 26, cursor: 'pointer', fontSize: 11, color: '#555' }}>↑</button>
                    <button onClick={() => moveItem(i, 1)} disabled={i === order.length - 1} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 5, width: 26, height: 26, cursor: 'pointer', fontSize: 11, color: '#555' }}>↓</button>
                  </div>
                </div>
              ))}
            </div>
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

      <button onClick={save} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Saving...' : done ? 'Downloaded! Organize again?' : 'Save Organized PDF'}
      </button>
    </ToolLayout>
  );
}
