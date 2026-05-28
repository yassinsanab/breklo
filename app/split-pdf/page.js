'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
  { name: 'Delete PDF Pages', slug: 'delete-pdf-pages' },
];

export default function SplitPDF() {
  const [file, setFile]       = useState(null);
  const [mode, setMode]       = useState('all'); // 'all' | 'range'
  const [range, setRange]     = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f);
    setDone(false);
    const { PDFDocument } = await import('pdf-lib');
    const doc = await PDFDocument.load(await f.arrayBuffer());
    setPageCount(doc.getPageCount());
  }

  async function split() {
    if (!file) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const srcDoc = await PDFDocument.load(await file.arrayBuffer());
      const total = srcDoc.getPageCount();

      let indices = [];
      if (mode === 'all') {
        indices = Array.from({ length: total }, (_, i) => i);
      } else {
        // parse range e.g. "1,3,5-8"
        range.split(',').forEach(part => {
          const [a, b] = part.trim().split('-').map(n => parseInt(n) - 1);
          if (!isNaN(a) && !isNaN(b)) for (let i = a; i <= Math.min(b, total - 1); i++) indices.push(i);
          else if (!isNaN(a)) indices.push(Math.min(a, total - 1));
        });
      }

      if (mode === 'all') {
        // one file per page
        for (const i of indices) {
          const newDoc = await PDFDocument.create();
          const [page] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(page);
          const bytes = await newDoc.save();
          downloadFile(bytes, file.name, `page-${i + 1}`);
          await new Promise(r => setTimeout(r, 200));
        }
      } else {
        // one file with selected pages
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(srcDoc, indices);
        pages.forEach(p => newDoc.addPage(p));
        const bytes = await newDoc.save();
        downloadFile(bytes, file.name);
      }
      setDone(true);
    } catch (e) {
      alert('Error splitting PDF. Please check your file.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="split-pdf"
      title="Split PDF"
      subtitle="Split a PDF into individual pages, or extract a specific range of pages."
      bullets={[
        'Split into individual pages with one click',
        'Extract a custom range of pages',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
      ]}
      relatedTools={related}
    >
      {/* DROP */}
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
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{formatSize(file.size)} · {pageCount} pages</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); setPageCount(0); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
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

      {/* OPTIONS */}
      {file && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {[['all', 'Split all pages'], ['range', 'Extract page range']].map(([v, l]) => (
              <button key={v} onClick={() => setMode(v)} style={{
                flex: 1, padding: '9px', borderRadius: 8, border: `1.5px solid ${mode === v ? '#0071e3' : '#e5e7eb'}`,
                background: mode === v ? '#eff6ff' : '#fff', color: mode === v ? '#0071e3' : '#555',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>
          {mode === 'range' && (
            <div>
              <input
                type="text" value={range} onChange={e => setRange(e.target.value)}
                placeholder={`e.g. 1,3,5-8 (max page: ${pageCount})`}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: '1.5px solid #e5e7eb', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              />
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>Separate pages with commas. Use dashes for ranges.</p>
            </div>
          )}
        </div>
      )}

      <button
        onClick={split}
        disabled={!file || loading}
        style={{
          width: '100%', padding: '13px', borderRadius: 10, border: 'none',
          background: !file ? '#e5e7eb' : '#0071e3',
          color: !file ? '#9ca3af' : '#fff',
          fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Splitting...' : done ? 'Done! Split again?' : 'Split PDF'}
      </button>
      <ToolContent slug="split-pdf" />
    </ToolLayout>
  );
}
