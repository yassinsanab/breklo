'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadBlob, formatSize, replaceExt } from '@/lib/imageUtils';

const related = [
  { name: 'AVIF to JPG', slug: 'avif-to-jpg' },
  { name: 'AVIF to PNG', slug: 'avif-to-png' },
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
];

// Feature-detect AVIF encoding (only Chromium browsers encode AVIF via canvas)
function detectAvifEncode() {
  return new Promise((resolve) => {
    try {
      const c = document.createElement('canvas');
      c.width = c.height = 2;
      c.toBlob(
        (blob) => resolve(!!blob && blob.type === 'image/avif'),
        'image/avif',
        0.8
      );
    } catch {
      resolve(false);
    }
  });
}

// Convert a raster image file to AVIF via canvas
function convertToAvif(file, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob && blob.type === 'image/avif') resolve(blob);
          else reject(new Error('AVIF encoding not supported'));
        },
        'image/avif',
        quality
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not load image')); };
    img.src = url;
  });
}

export default function JpgToAvif() {
  const [files, setFiles]     = useState([]);
  const [quality, setQuality] = useState(0.6);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);
  const [supported, setSupported] = useState(null); // null = checking

  useEffect(() => { detectAvifEncode().then(setSupported); }, []);

  function addFiles(incoming) {
    const imgs = Array.from(incoming).filter(f =>
      f.type === 'image/jpeg' || f.type === 'image/jpg' || f.type === 'image/png' ||
      /\.(jpe?g|png)$/i.test(f.name)
    );
    setFiles(prev => [...prev, ...imgs]);
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
        const blob = await convertToAvif(file, quality);
        downloadBlob(blob, replaceExt(file.name, 'avif'));
        await new Promise(r => setTimeout(r, 150));
      }
      setProgress(`Done — ${files.length} file${files.length > 1 ? 's' : ''} converted`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Your browser could not encode AVIF. Please use Chrome or Edge for JPG to AVIF.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="jpg-to-avif"
      title="JPG to AVIF"
      subtitle="Convert JPG and PNG images to AVIF — the modern format that's 30–50% smaller than WebP at the same quality."
      bullets={[
        'Dramatically smaller files than JPG or WebP',
        'Perfect for fast, modern websites',
        'Adjustable quality',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
    >
      {/* Browser support notice */}
      {supported === false && (
        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#9a3412', lineHeight: 1.5 }}>
          <strong>Heads up:</strong> Your current browser can't create AVIF files. AVIF encoding works in
          Chrome and Edge. You can still use <a href="/avif-to-jpg" style={{ color: '#0071e3' }}>AVIF to JPG</a> and
          {' '}<a href="/avif-to-png" style={{ color: '#0071e3' }}>AVIF to PNG</a> in any browser.
        </div>
      )}

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
          {files.length === 0 ? 'Drop JPG or PNG files here' : 'Add more files'}
        </p>
        <p style={{ fontSize: 13, color: '#9ca3af' }}>JPG, PNG — or click to browse</p>
        <input id="fi" type="file" multiple accept="image/jpeg,image/png,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
      </div>

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
              <button onClick={() => removeFile(i)} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Output quality</label>
            <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{Math.round(quality * 100)}%</span>
          </div>
          <input type="range" min="0.3" max="0.9" step="0.01" value={quality}
            onChange={e => setQuality(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#0071e3' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 3 }}>
            <span>Smaller file</span><span>Best quality</span>
          </div>
        </div>
      )}

      {progress && (
        <div style={{ background: done ? '#f0fdf4' : '#eff6ff', border: `1px solid ${done ? '#bbf7d0' : '#bfdbfe'}`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: done ? '#15803d' : '#1d4ed8', fontWeight: 500 }}>
          {progress}
        </div>
      )}

      <button onClick={convert} disabled={files.length === 0 || loading || supported === false} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: (files.length === 0 || supported === false) ? '#e5e7eb' : '#0071e3',
        color: (files.length === 0 || supported === false) ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: (files.length === 0 || supported === false) ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Convert again' : `Convert ${files.length || ''} file${files.length !== 1 ? 's' : ''} to AVIF`}
      </button>
      <ToolContent slug="jpg-to-avif" />
    </ToolLayout>
  );
}
