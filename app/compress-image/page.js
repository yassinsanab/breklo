'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
  { name: 'PNG to WebP', slug: 'png-to-webp' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

const PRESETS = [
  { id: 'web',   label: 'Web',        desc: 'Optimised for websites. ~70% quality, max 1200px.',   quality: 0.70, maxPx: 1200 },
  { id: 'email', label: 'Email',       desc: 'Small enough to attach. ~60% quality, max 900px.',    quality: 0.60, maxPx: 900  },
  { id: 'max',   label: 'Maximum',     desc: 'Smallest possible file. ~45% quality, max 800px.',    quality: 0.45, maxPx: 800  },
  { id: 'custom',label: 'Custom',      desc: 'Set your own quality and size.',                       quality: null, maxPx: null },
];

function compressViaCanvas(file, quality, maxPx) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      // Scale down if larger than maxPx
      if (maxPx && Math.max(w, h) > maxPx) {
        const ratio = maxPx / Math.max(w, h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      // Always output JPEG for max compression
      canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('toBlob failed')), 'image/jpeg', quality);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Load failed')); };
    img.src = url;
  });
}

export default function CompressImage() {
  const [files, setFiles]       = useState([]);
  const [preset, setPreset]     = useState('web');
  const [customQ, setCustomQ]   = useState(0.65);
  const [customPx, setCustomPx] = useState(1200);
  const [loading, setLoading]   = useState(false);
  const [results, setResults]   = useState([]);
  const [dragging, setDrag]     = useState(false);

  function addFiles(incoming) {
    const imgs = Array.from(incoming).filter(f => f.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imgs]);
    setResults([]);
  }

  function removeFile(i) {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
    setResults([]);
  }

  async function compress() {
    if (files.length === 0) return;
    setLoading(true); setResults([]);

    const cfg = PRESETS.find(p => p.id === preset);
    const quality = preset === 'custom' ? customQ : cfg.quality;
    const maxPx   = preset === 'custom' ? customPx : cfg.maxPx;

    const newResults = [];
    for (const file of files) {
      try {
        const blob = await compressViaCanvas(file, quality, maxPx);
        const saved = file.size - blob.size;
        const pct = ((saved / file.size) * 100).toFixed(1);
        newResults.push({ name: file.name, original: file.size, compressed: blob.size, pct: Math.max(0, pct), blob });
        // Output filename: replace extension with .jpg
        const outName = file.name.replace(/\.[^/.]+$/, '') + '-compressed.jpg';
        downloadBlob(blob, outName);
        await new Promise(r => setTimeout(r, 150));
      } catch {
        newResults.push({ name: file.name, error: true });
      }
    }
    setResults(newResults);
    setLoading(false);
  }

  const totalSaved = results.filter(r => !r.error).reduce((sum, r) => sum + (r.original - r.compressed), 0);

  return (
    <ToolLayout
      slug="compress-image"
      title="Compress Image"
      subtitle="Reduce image file sizes dramatically. Choose a preset or set your own quality."
      bullets={[
        'Canvas-based compression for maximum reduction',
        'Choose web, email or maximum compression preset',
        'Compress multiple images at once',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
    >
      {/* DROP ZONE */}
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
              <div style={{ width: 36, height: 36, background: '#fefce8', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 800, color: '#a16207' }}>IMG</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(f.size)}</div>
              </div>
              <button onClick={() => removeFile(i)} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* PRESETS */}
      {files.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Compression preset</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
            {PRESETS.map(p => (
              <button key={p.id} onClick={() => setPreset(p.id)} style={{
                padding: '10px 12px', borderRadius: 9, textAlign: 'left', cursor: 'pointer',
                border: `1.5px solid ${preset === p.id ? '#0071e3' : '#e5e7eb'}`,
                background: preset === p.id ? '#eff6ff' : '#fff',
              }}>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: preset === p.id ? '#0071e3' : '#111', marginBottom: 2 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.4 }}>{p.desc}</div>
              </button>
            ))}
          </div>

          {preset === 'custom' && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Quality</label>
                  <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{Math.round(customQ * 100)}%</span>
                </div>
                <input type="range" min="0.1" max="0.95" step="0.01" value={customQ}
                  onChange={e => setCustomQ(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0071e3' }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Max dimension</label>
                  <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{customPx}px</span>
                </div>
                <input type="range" min="400" max="4000" step="100" value={customPx}
                  onChange={e => setCustomPx(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#0071e3' }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {totalSaved > 0 && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 9, padding: '10px 14px', marginBottom: 8, fontSize: 13, color: '#15803d', fontWeight: 600 }}>
              Total saved: {formatSize(totalSaved)} across {results.filter(r => !r.error).length} file{results.length !== 1 ? 's' : ''}
            </div>
          )}
          {results.map((r, i) => (
            <div key={i} style={{ background: r.error ? '#fff1f2' : '#f8fafc', border: `1px solid ${r.error ? '#fecaca' : '#f0f0f0'}`, borderRadius: 8, padding: '9px 14px', marginBottom: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{r.name}</span>
              {r.error
                ? <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>Failed</span>
                : <span style={{ fontSize: 12, color: '#15803d', fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>-{r.pct}% · {formatSize(r.compressed)}</span>
              }
            </div>
          ))}
        </div>
      )}

      <button onClick={compress} disabled={files.length === 0 || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: files.length === 0 ? '#e5e7eb' : '#0071e3',
        color: files.length === 0 ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: files.length === 0 ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Compressing...' : results.length > 0 ? 'Compress again' : `Compress ${files.length} image${files.length !== 1 ? 's' : ''}`}
      </button>
    </ToolLayout>
  );
}
