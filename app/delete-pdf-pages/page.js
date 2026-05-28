'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
  { name: 'Split PDF', slug: 'split-pdf' },
  { name: 'Organize PDF', slug: 'organize-pdf' },
];

export default function DeletePages() {
  const [file, setFile]       = useState(null);
  const [pageCount, setCount] = useState(0);
  const [pages, setPages]     = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setDone(false);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setCount(doc.getPageCount());
  }

  function parseToDelete(input, total) {
    const toDelete = new Set();
    input.split(',').forEach(part => {
      const [a, b] = part.trim().split('-').map(n => parseInt(n) - 1);
      if (!isNaN(a) && !isNaN(b)) {
        for (let i = a; i <= Math.min(b, total - 1); i++) if (i >= 0) toDelete.add(i);
      } else if (!isNaN(a) && a >= 0 && a < total) toDelete.add(a);
    });
    return toDelete;
  }

  async function deletePages() {
    if (!file || !pages.trim()) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const src = await PDFDocument.load(await file.arrayBuffer());
      const toDelete = parseToDelete(pages, pageCount);
      const keep = Array.from({ length: pageCount }, (_, i) => i).filter(i => !toDelete.has(i));
      if (keep.length === 0) { alert('Cannot delete all pages.'); setLoading(false); return; }
      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(src, keep);
      copied.forEach(p => newDoc.addPage(p));
      downloadFile(await newDoc.save(), file.name);
      setDone(true);
    } catch (e) {
      alert('Error deleting pages.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="delete-pdf-pages"
      title="Delete PDF Pages"
      subtitle="Remove unwanted pages from your PDF document quickly and for free."
      bullets={[
        'Remove any pages by number or range',
        'Keeps all other pages intact',
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
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{formatSize(file.size)} · {pageCount} pages</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); setCount(0); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
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

      {file && (
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
            Pages to delete <span style={{ color: '#9ca3af', fontWeight: 400 }}>(1–{pageCount})</span>
          </label>
          <input
            type="text" value={pages} onChange={e => setPages(e.target.value)}
            placeholder={`e.g. 2, 4, 6-8`}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
          />
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>Comma-separated. Use dashes for ranges.</p>
        </div>
      )}

      <button onClick={deletePages} disabled={!file || loading || !pages.trim()} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: (!file || !pages.trim()) ? '#e5e7eb' : '#ef4444',
        color: (!file || !pages.trim()) ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: (!file || !pages.trim()) ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Deleting...' : done ? 'Done! Delete again?' : 'Delete Pages'}
      </button>
      <ToolContent slug="delete-pdf-pages" />
    </ToolLayout>
  );
}
