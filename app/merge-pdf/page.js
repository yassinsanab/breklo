'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Split PDF',    slug: 'split-pdf',    desc: 'Break one PDF into many' },
  { name: 'Compress PDF', slug: 'compress-pdf', desc: 'Shrink without quality loss' },
  { name: 'Organize PDF', slug: 'organize-pdf', desc: 'Reorder and remove pages' },
];

const howSteps = [
  { title: 'Upload your PDFs',  body: 'Drag and drop two or more PDF files into the workbench, or click to browse from your device.' },
  { title: 'Reorder if needed', body: 'Drag the file cards to rearrange. Use the ↑↓ arrows for precise reordering.' },
  { title: 'Merge & download',  body: 'Click Merge. Your combined PDF downloads in seconds — no email, no watermark.' },
];

/* ─── icons ─── */
const I = {
  up:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>,
  x:     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  arrUp: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>,
  arrDn: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>,
  arr:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  grip:  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg>,
};

export default function MergePDF() {
  const [files, setFiles]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [drag, setDrag]       = useState({ from: null });
  const [dragOver, setDragOver] = useState(false);
  const [bookmarks, setBookmarks] = useState('yes');
  const [filename, setFilename]   = useState('merged-by-breklo');

  function addFiles(incoming) {
    const pdfs = Array.from(incoming).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfs]);
  }
  function removeFile(i) { setFiles(prev => prev.filter((_, idx) => idx !== i)); }
  function move(i, dir) {
    setFiles(prev => {
      const arr = [...prev];
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return arr;
    });
  }
  function reorderTo(idx) {
    if (drag.from == null || drag.from === idx) { setDrag({ from: null }); return; }
    setFiles(prev => {
      const arr = [...prev];
      const [m] = arr.splice(drag.from, 1);
      arr.splice(idx, 0, m);
      return arr;
    });
    setDrag({ from: null });
  }

  async function merge() {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const merged = await PDFDocument.create();
      for (const file of files) {
        const buf = await file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      const bytes = await merged.save();
      downloadFile(bytes, (filename || 'merged') + '.pdf');
    } catch (e) {
      alert('Error merging PDFs. Please check your files.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="merge-pdf"
      title="Merge PDF files in seconds."
      subtitle="Combine two, ten, or fifty PDFs into a single document. Drag to reorder, then download — right in your browser."
      bullets={[
        'Combine unlimited PDF files into one',
        'Drag to reorder before merging',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
      ]}
      relatedTools={related}
      howSteps={howSteps}
      tagLabel="Free · No account · Drag to reorder"
    >
      {/* WB HEAD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 18, marginBottom: 20, borderBottom: '1px solid var(--bk-line)', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, fontWeight: 600, color: 'var(--bk-ink)', letterSpacing: '-.015em' }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--bk-brand-soft)', color: 'var(--bk-brand-ink)', display: 'grid', placeItems: 'center' }}>{I.up}</span>
          <span>Your PDFs</span>
          {files.length > 0 && (
            <span style={{ fontSize: 12, color: 'var(--bk-ink-4)', fontWeight: 500, background: 'var(--bk-paper-2)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--bk-line)' }}>
              {files.length} file{files.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button onClick={() => document.getElementById('mp-input').click()} style={{ height: 36, padding: '0 14px', fontSize: 13, fontWeight: 500, color: 'var(--bk-ink-3)', background: '#fff', border: '1px solid var(--bk-line)', borderRadius: 8, cursor: 'pointer' }}>
          + Add files
        </button>
        <input id="mp-input" type="file" multiple accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {/* DROP / FILE GRID */}
      {files.length === 0 ? (
        <div
          className="bk-drop"
          data-dragging={dragOver}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
          onClick={() => document.getElementById('mp-input').click()}
        >
          <div className="bk-drop-ic">{I.up}</div>
          <div className="bk-drop-title">Drop your PDF files here</div>
          <div className="bk-drop-sub">or click to browse — up to 100 MB per file</div>
        </div>
      ) : (
        <>
          <div className="bk-file-grid">
            {files.map((f, i) => (
              <div
                key={i}
                className={'bk-file-card' + (drag.from === i ? ' dragging' : '')}
                draggable
                onDragStart={() => setDrag({ from: i })}
                onDragOver={e => e.preventDefault()}
                onDrop={() => reorderTo(i)}
              >
                <span className="order">{i + 1}</span>
                <button className="remove" onClick={() => removeFile(i)} aria-label="Remove">{I.x}</button>
                <div className="bk-file-thumb">
                  <div className="tag">PDF</div>
                  <div className="ln" style={{ width: '90%' }} />
                  <div className="ln" style={{ width: '70%' }} />
                  <div className="ln h" style={{ width: '60%' }} />
                  <div className="ln" style={{ width: '90%' }} />
                  <div className="ln" style={{ width: '50%' }} />
                </div>
                <div className="bk-file-name">{f.name}</div>
                <div className="bk-file-meta">
                  <span>PDF</span>
                  <span>{formatSize(f.size)}</span>
                </div>
                <div className="bk-file-arrows">
                  <button onClick={() => move(i, -1)} disabled={i === 0} title="Move up">{I.arrUp}</button>
                  <button onClick={() => move(i, 1)} disabled={i === files.length - 1} title="Move down">{I.arrDn}</button>
                  <span className="grip">{I.grip}</span>
                </div>
              </div>
            ))}
            <button
              className="bk-drop"
              style={{ minHeight: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '20px', cursor: 'pointer', background: 'var(--bk-paper-2)' }}
              onClick={() => document.getElementById('mp-input').click()}
            >
              <span style={{ width: 36, height: 36, borderRadius: 10, background: '#fff', border: '1px solid var(--bk-line)', display: 'grid', placeItems: 'center', color: 'var(--bk-brand)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12h14"/></svg>
              </span>
              <span style={{ fontSize: 13, color: 'var(--bk-ink-4)', fontWeight: 500 }}>Add more</span>
            </button>
          </div>

          {/* SETTINGS */}
          <div style={{ marginTop: 20, padding: 20, background: 'var(--bk-paper-2)', border: '1px solid var(--bk-line)', borderRadius: 14, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 24 }}>
            <div>
              <label className="bk-input-label">Output filename</label>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid var(--bk-line)', borderRadius: 9, overflow: 'hidden' }}>
                <input value={filename} onChange={e => setFilename(e.target.value)} style={{ flex: 1, border: 0, outline: 0, padding: '10px 12px', font: '14px/1 Inter,sans-serif', color: 'var(--bk-ink)', background: 'transparent' }} />
                <span style={{ padding: '0 12px', fontSize: 13, color: 'var(--bk-ink-5)', borderLeft: '1px solid var(--bk-line)', height: 38, display: 'flex', alignItems: 'center' }}>.pdf</span>
              </div>
            </div>
            <div>
              <label className="bk-input-label">Bookmarks for each PDF</label>
              <div style={{ display: 'flex', background: '#fff', border: '1px solid var(--bk-line)', borderRadius: 9, padding: 3, gap: 2 }}>
                {[['yes', 'Yes — easier navigation'], ['no', 'No']].map(([v, l]) => (
                  <button key={v} onClick={() => setBookmarks(v)} style={{
                    flex: 1, padding: '8px 10px', borderRadius: 7, fontSize: 13, fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer', border: 0,
                    background: bookmarks === v ? 'var(--bk-brand)' : 'transparent',
                    color: bookmarks === v ? '#fff' : 'var(--bk-ink-3)',
                    boxShadow: bookmarks === v ? '0 1px 2px rgba(37,99,235,.3)' : 'none',
                  }}>{l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 13, color: 'var(--bk-ink-4)' }}>Drag to reorder. Files are processed locally — nothing uploads.</div>
            <button className="bk-primary" onClick={merge} disabled={files.length < 2 || loading}>
              <span>{loading ? 'Merging…' : `Merge ${files.length} PDF${files.length !== 1 ? 's' : ''}`}</span>
              {I.arr}
            </button>
          </div>
        </>
      )}

      <ToolContent slug="merge-pdf" />
    </ToolLayout>
  );
}
