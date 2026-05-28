'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'Compress Image', slug: 'compress-image' },
  { name: 'PNG to JPG', slug: 'png-to-jpg' },
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
];

export default function SvgToJpg() {
  const [files, setFiles]     = useState([]);
  const [quality, setQuality] = useState(0.95);
  const [scale, setScale]     = useState(2);
  const [bg, setBg]           = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  function addFiles(incoming) {
    const svgs = Array.from(incoming).filter(f =>
      f.type === 'image/svg+xml' || f.name.toLowerCase().endsWith('.svg')
    );
    setFiles(prev => [...prev, ...svgs]);
    setDone(false); setProgress('');
  }

  function removeFile(i) { setFiles(prev => prev.filter((_, idx) => idx !== i)); }

  async function convert() {
    if (files.length === 0) return;
    setLoading(true); setDone(false);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`Converting ${i + 1} of ${files.length}...`);

        const svgText = await file.text();
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const jpgBlob = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            // Get natural dimensions from SVG viewBox or width/height attributes
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgEl = doc.querySelector('svg');
            let w = img.naturalWidth || 800;
            let h = img.naturalHeight || 600;

            // Try viewBox
            const vb = svgEl?.getAttribute('viewBox');
            if (vb) {
              const parts = vb.split(/[\s,]+/);
              if (parts.length === 4) { w = parseFloat(parts[2]); h = parseFloat(parts[3]); }
            }

            const canvas = document.createElement('canvas');
            canvas.width = w * scale;
            canvas.height = h * scale;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            canvas.toBlob(b => b ? resolve(b) : reject(new Error('failed')), 'image/jpeg', quality);
          };
          img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG load failed')); };
          img.src = url;
        });

        downloadBlob(jpgBlob, file.name.replace(/\.svg$/i, '.jpg'));
        await new Promise(r => setTimeout(r, 150));
      }
      setProgress(`Done — ${files.length} file${files.length > 1 ? 's' : ''} converted`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting SVG. Make sure the file is a valid SVG.');
      setProgress('');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="SVG to JPG"
      subtitle="Convert SVG vector graphics to JPG images. Choose output scale and background colour."
      bullets={[
        'Renders SVG at 1x, 2x or 3x resolution',
        'Custom background colour for transparent SVGs',
        'Convert multiple SVG files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
      slug="svg-to-jpg"
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
          {files.length === 0 ? 'Drop SVG files here' : 'Add more SVGs'}
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>or click to browse</p>
        <input id="fi" type="file" multiple accept=".svg,image/svg+xml" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <div style={{ marginBottom: 14 }}>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 9, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, background: '#f0fdf4', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#15803d' }}>SVG</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(f.size)}</div>
                </div>
                <button onClick={() => removeFile(i)} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
            {/* Scale */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Output scale</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {[1, 2, 3].map(s => (
                  <button key={s} onClick={() => setScale(s)} style={{
                    flex: 1, padding: '9px 0', borderRadius: 8,
                    border: `1.5px solid ${scale === s ? '#0071e3' : '#e5e7eb'}`,
                    background: scale === s ? '#eff6ff' : '#fff',
                    color: scale === s ? '#0071e3' : '#555',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}>{s}×</button>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>2× recommended for sharp output</p>
            </div>

            {/* Quality */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Output quality</label>
                <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{Math.round(quality * 100)}%</span>
              </div>
              <input type="range" min="0.5" max="1" step="0.01" value={quality}
                onChange={e => setQuality(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#0071e3' }} />
            </div>

            {/* Background */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 7 }}>Background colour</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid #e5e7eb', borderRadius: 9, padding: '9px 12px', width: 'fit-content' }}>
                <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                  style={{ width: 28, height: 28, border: 'none', borderRadius: 5, cursor: 'pointer' }} />
                <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{bg}</span>
              </div>
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>SVGs with transparent backgrounds need a fill colour for JPG output</p>
            </div>
          </div>
        </>
      )}

      {progress && (
        <div style={{ background: done ? '#f0fdf4' : '#eff6ff', border: `1px solid ${done ? '#bbf7d0' : '#bfdbfe'}`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: done ? '#15803d' : '#1d4ed8', fontWeight: 500 }}>
          {progress}
        </div>
      )}

      <button onClick={convert} disabled={files.length === 0 || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: files.length === 0 ? '#e5e7eb' : '#0071e3',
        color: files.length === 0 ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: files.length === 0 ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Convert again' : `Convert ${files.length > 0 ? files.length : ''} SVG${files.length !== 1 ? 's' : ''} to JPG`}
      </button>
      <ToolContent slug="svg-to-jpg" />
    </ToolLayout>
  );
}
