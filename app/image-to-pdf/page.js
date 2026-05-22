'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
  { name: 'PNG to PDF', slug: 'png-to-pdf' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

const ACCEPT = 'image/jpeg,image/jpg,image/png,image/webp,image/gif';

function getExt(file) {
  return file.name.split('.').pop().toUpperCase();
}

function fileToDataURL(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = e => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

export default function ImageToPdf() {
  const [files, setFiles]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);
  const [fitMode, setFitMode] = useState('original'); // 'original' | 'a4'

  function addFiles(incoming) {
    const imgs = Array.from(incoming).filter(f => f.type.startsWith('image/'));
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
        let img;

        // Convert non-jpg/png to jpg first via canvas
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          img = await pdf.embedJpg(buf);
        } else {
          // Use canvas to convert PNG/WebP/GIF to embeddable format
          const dataUrl = await fileToDataURL(file);
          const imgEl = await new Promise((res) => {
            const i = new Image();
            i.onload = () => res(i);
            i.src = dataUrl;
          });
          const canvas = document.createElement('canvas');
          canvas.width = imgEl.naturalWidth;
          canvas.height = imgEl.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(imgEl, 0, 0);
          const jpgBuf = await new Promise(r => canvas.toBlob(b => b.arrayBuffer().then(r), 'image/jpeg', 0.95));
          img = await pdf.embedJpg(jpgBuf);
        }

        let pageWidth = img.width;
        let pageHeight = img.height;

        if (fitMode === 'a4') {
          // A4 in points: 595 x 842
          pageWidth = 595;
          pageHeight = 842;
          const scale = Math.min(pageWidth / img.width, pageHeight / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const x = (pageWidth - drawW) / 2;
          const y = (pageHeight - drawH) / 2;
          const page = pdf.addPage([pageWidth, pageHeight]);
          page.drawImage(img, { x, y, width: drawW, height: drawH });
        } else {
          const page = pdf.addPage([pageWidth, pageHeight]);
          page.drawImage(img, { x: 0, y: 0, width: pageWidth, height: pageHeight });
        }
      }

      downloadFile(await pdf.save(), 'breklo-converted.pdf');
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting images. Please try again.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="Image to PDF"
      subtitle="Convert JPG, PNG, WebP or GIF images into a PDF document. Supports multiple images."
      bullets={[
        'Supports JPG, PNG, WebP and GIF',
        'Combine multiple images into one PDF',
        'Choose original size or fit to A4',
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
          {files.length === 0 ? 'Drop images here' : 'Add more images'}
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>JPG, PNG, WebP, GIF — or click to browse</p>
        <input id="fi" type="file" multiple accept={ACCEPT} style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          {/* PAGE SIZE */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {[['original', 'Original size'], ['a4', 'Fit to A4']].map(([v, l]) => (
              <button key={v} onClick={() => setFitMode(v)} style={{
                flex: 1, padding: '9px', borderRadius: 8,
                border: `1.5px solid ${fitMode === v ? '#0071e3' : '#e5e7eb'}`,
                background: fitMode === v ? '#eff6ff' : '#fff',
                color: fitMode === v ? '#0071e3' : '#555',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 9, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, background: '#eff6ff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#1d4ed8' }}>{getExt(f)}</span>
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
        </>
      )}

      <button onClick={convert} disabled={files.length === 0 || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: files.length === 0 ? '#e5e7eb' : '#0071e3',
        color: files.length === 0 ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: files.length === 0 ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Done! Convert again?' : `Convert ${files.length > 0 ? files.length : ''} image${files.length !== 1 ? 's' : ''} to PDF`}
      </button>
    </ToolLayout>
  );
}
