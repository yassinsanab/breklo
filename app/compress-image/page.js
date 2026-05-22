'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'JPG to PNG', slug: 'jpg-to-png' },
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

export default function CompressImage() {
  const [files, setFiles]     = useState([]);
  const [quality, setQuality] = useState(0.8);
  const [maxMB, setMaxMB]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [dragging, setDrag]   = useState(false);

  function addFiles(incoming) {
    const imgs = Array.from(incoming).filter(f => f.type.startsWith('image/') && !f.type.includes('heic'));
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
    const newResults = [];
    try {
      const imageCompression = (await import('browser-image-compression')).default;
      for (const file of files) {
        try {
          const options = {
            maxSizeMB: maxMB,
            maxWidthOrHeight: 4096,
            useWebWorker: true,
            initialQuality: quality,
          };
          const compressed = await imageCompression(file, options);
          const saved = file.size - compressed.size;
          const pct = ((saved / file.size) * 100).toFixed(1);
          newResults.push({ name: file.name, original: file.size, compressed: compressed.size, pct, blob: compressed });
          downloadBlob(compressed, `breklo-compressed-${file.name}`);
          await new Promise(r => setTimeout(r, 200));
        } catch {
          newResults.push({ name: file.name, error: true });
        }
      }
      setResults(newResults);
    } catch (e) {
      alert('Error compressing images. Please try again.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="Compress Image"
      subtitle="Reduce image file sizes without noticeable quality loss. Supports JPG, PNG, WebP and more."
      bullets={[
        'Compress JPG, PNG, WebP and GIF',
        'Control output quality and max file size',
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
        <div style={{ marginBottom: 16 }}>
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

      {/* SETTINGS */}
      {files.length > 0 && (
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Quality</label>
              <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{Math.round(quality * 100)}%</span>
            </div>
            <input type="range" min="0.3" max="1" step="0.01" value={quality}
              onChange={e => setQuality(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#0071e3' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 3 }}>
              <span>Smaller file</span><span>Best quality</span>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
              Max file size: <span style={{ color: '#0071e3' }}>{maxMB} MB</span>
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[0.5, 1, 2, 5].map(v => (
                <button key={v} onClick={() => setMaxMB(v)} style={{
                  flex: 1, padding: '8px 0', borderRadius: 8,
                  border: `1.5px solid ${maxMB === v ? '#0071e3' : '#e5e7eb'}`,
                  background: maxMB === v ? '#eff6ff' : '#fff',
                  color: maxMB === v ? '#0071e3' : '#555',
                  fontWeight: 600, fontSize: 12, cursor: 'pointer',
                }}>{v} MB</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {results.map((r, i) => (
            <div key={i} style={{ background: r.error ? '#fff1f2' : '#f0fdf4', border: `1px solid ${r.error ? '#fecaca' : '#bbf7d0'}`, borderRadius: 9, padding: '10px 14px', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#374151', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{r.name}</span>
              {r.error
                ? <span style={{ fontSize: 12, color: '#ef4444', fontWeight: 600, flexShrink: 0 }}>Failed</span>
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
