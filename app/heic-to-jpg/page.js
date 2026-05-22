'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'Compress Image', slug: 'compress-image' },
  { name: 'JPG to PNG', slug: 'jpg-to-png' },
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
];

export default function HeicToJpg() {
  const [files, setFiles]     = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  function addFiles(incoming) {
    const heics = Array.from(incoming).filter(f =>
      f.type === 'image/heic' || f.type === 'image/heif' ||
      f.name.toLowerCase().endsWith('.heic') || f.name.toLowerCase().endsWith('.heif')
    );
    setFiles(prev => [...prev, ...heics]);
    setDone(false); setProgress('');
  }

  function removeFile(i) { setFiles(prev => prev.filter((_, idx) => idx !== i)); }

  async function convert() {
    if (files.length === 0) return;
    setLoading(true); setDone(false);
    try {
      const heic2any = (await import('heic2any')).default;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`Converting ${i + 1} of ${files.length}...`);
        const blob = await heic2any({ blob: file, toType: 'image/jpeg', quality });
        const outBlob = Array.isArray(blob) ? blob[0] : blob;
        downloadBlob(outBlob, file.name.replace(/\.heic?/i, '.jpg').replace(/\.heif?/i, '.jpg'));
        await new Promise(r => setTimeout(r, 200));
      }
      setProgress(`Done — ${files.length} file${files.length > 1 ? 's' : ''} converted`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting HEIC files. Make sure the files are valid HEIC/HEIF images.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="HEIC to JPG"
      subtitle="Convert iPhone HEIC and HEIF photos to universally supported JPG format."
      bullets={[
        'Convert iPhone HEIC and HEIF photos',
        'Compatible with all devices and platforms',
        'Adjust output quality before converting',
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
          {files.length === 0 ? 'Drop HEIC / HEIF files here' : 'Add more files'}
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>iPhone photos (.heic, .heif) — or click to browse</p>
        <input id="fi" type="file" multiple accept=".heic,.heif,image/heic,image/heif" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <div style={{ marginBottom: 14 }}>
            {files.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fff', border: '1px solid #f0f0f0', borderRadius: 9, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, background: '#f0fdf4', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: '#15803d' }}>HIC</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(f.size)}</div>
                </div>
                <button onClick={() => removeFile(i)} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Output quality</label>
              <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{Math.round(quality * 100)}%</span>
            </div>
            <input type="range" min="0.5" max="1" step="0.01" value={quality}
              onChange={e => setQuality(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#0071e3' }}
            />
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
        {loading ? 'Converting...' : done ? 'Convert again' : `Convert ${files.length} file${files.length !== 1 ? 's' : ''} to JPG`}
      </button>
    </ToolLayout>
  );
}
