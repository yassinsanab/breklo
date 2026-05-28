'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { loadImage, downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'Compress Image', slug: 'compress-image' },
  { name: 'Image to PDF', slug: 'image-to-pdf' },
  { name: 'JPG to PNG', slug: 'jpg-to-png' },
];

export default function MergeImages() {
  const [files, setFiles]     = useState([]);
  const [direction, setDir]   = useState('vertical');
  const [gap, setGap]         = useState(0);
  const [bg, setBg]           = useState('#ffffff');
  const [outputFmt, setFmt]   = useState('image/jpeg');
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

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

  async function merge() {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const images = await Promise.all(files.map(f => loadImage(f)));

      let totalW, totalH;
      if (direction === 'vertical') {
        totalW = Math.max(...images.map(img => img.naturalWidth));
        totalH = images.reduce((sum, img) => sum + img.naturalHeight, 0) + gap * (images.length - 1);
      } else {
        totalW = images.reduce((sum, img) => sum + img.naturalWidth, 0) + gap * (images.length - 1);
        totalH = Math.max(...images.map(img => img.naturalHeight));
      }

      const canvas = document.createElement('canvas');
      canvas.width = totalW;
      canvas.height = totalH;
      const ctx = canvas.getContext('2d');

      // background
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, totalW, totalH);

      let offset = 0;
      for (const img of images) {
        if (direction === 'vertical') {
          const x = Math.floor((totalW - img.naturalWidth) / 2);
          ctx.drawImage(img, x, offset, img.naturalWidth, img.naturalHeight);
          offset += img.naturalHeight + gap;
        } else {
          const y = Math.floor((totalH - img.naturalHeight) / 2);
          ctx.drawImage(img, offset, y, img.naturalWidth, img.naturalHeight);
          offset += img.naturalWidth + gap;
        }
        URL.revokeObjectURL(img._url);
      }

      const ext = outputFmt === 'image/jpeg' ? 'jpg' : outputFmt === 'image/png' ? 'png' : 'webp';
      const quality = outputFmt === 'image/png' ? undefined : 0.92;
      const blob = await new Promise(r => canvas.toBlob(r, outputFmt, quality));
      downloadBlob(blob, (files[0]?.name.replace(/\.[^/.]+$/, '') || 'merged') + '.' + ext);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error merging images. Please check your files.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="merge-images"
      title="Merge Images"
      subtitle="Combine multiple images into one — stack them vertically or side by side."
      bullets={[
        'Stack images vertically or horizontally',
        'Control spacing and background color',
        'Export as JPG, PNG or WebP',
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
        <input id="fi" type="file" multiple accept="image/*" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {/* FILE LIST */}
      {files.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 9, marginBottom: 6 }}>
              <div style={{ width: 36, height: 36, background: '#eff6ff', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: '#1d4ed8' }}>IMG</span>
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

      {/* OPTIONS */}
      {files.length >= 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
          {/* Direction */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[['vertical', '↕ Vertical'], ['horizontal', '↔ Horizontal']].map(([v, l]) => (
              <button key={v} onClick={() => setDir(v)} style={{
                flex: 1, padding: '9px', borderRadius: 8,
                border: `1.5px solid ${direction === v ? '#0071e3' : '#e5e7eb'}`,
                background: direction === v ? '#eff6ff' : '#fff',
                color: direction === v ? '#0071e3' : '#555',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>

          {/* Gap */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Gap between images</label>
              <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{gap}px</span>
            </div>
            <input type="range" min="0" max="100" step="4" value={gap}
              onChange={e => setGap(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#0071e3' }}
            />
          </div>

          {/* Background & format */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Background</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #e5e7eb', borderRadius: 8, padding: '8px 12px' }}>
                <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: 24, height: 24, border: 'none', borderRadius: 4, cursor: 'pointer' }} />
                <span style={{ fontSize: 13, color: '#555' }}>{bg}</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Output format</label>
              <select value={outputFmt} onChange={e => setFmt(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }}>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <button onClick={merge} disabled={files.length < 2 || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: files.length < 2 ? '#e5e7eb' : '#0071e3',
        color: files.length < 2 ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: files.length < 2 ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Merging...' : done ? 'Done! Merge again?' : `Merge ${files.length} image${files.length !== 1 ? 's' : ''}`}
      </button>
      {files.length < 2 && <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 8 }}>Add at least 2 images to merge</p>}
      <ToolContent slug="merge-images" />
    </ToolLayout>
  );
}
