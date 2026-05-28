'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { downloadBlob, formatSize } from '@/lib/imageUtils';

const related = [
  { name: 'Compress Image', slug: 'compress-image' },
  { name: 'JPG to WebP', slug: 'jpg-to-webp' },
  { name: 'PNG to JPG', slug: 'png-to-jpg' },
];

const PRESETS = [
  { label: '1920×1080', w: 1920, h: 1080 },
  { label: '1280×720', w: 1280, h: 720 },
  { label: '800×600', w: 800, h: 600 },
  { label: '400×400', w: 400, h: 400 },
];

export default function ResizeImage() {
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [origW, setOrigW]       = useState(0);
  const [origH, setOrigH]       = useState(0);
  const [mode, setMode]         = useState('pixels'); // 'pixels' | 'percent'
  const [width, setWidth]       = useState('');
  const [height, setHeight]     = useState('');
  const [percent, setPercent]   = useState(50);
  const [keepAR, setKeepAR]     = useState(true);
  const [outputFmt, setFmt]     = useState('image/jpeg');
  const [quality, setQuality]   = useState(0.92);
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [dragging, setDrag]     = useState(false);

  async function handleFile(f) {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f); setDone(false);
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      setOrigW(img.naturalWidth);
      setOrigH(img.naturalHeight);
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
    };
    img.src = url;
  }

  function handleWidthChange(val) {
    setWidth(val);
    if (keepAR && origW && origH) {
      const ratio = origH / origW;
      setHeight(String(Math.round(parseInt(val) * ratio) || ''));
    }
  }

  function handleHeightChange(val) {
    setHeight(val);
    if (keepAR && origW && origH) {
      const ratio = origW / origH;
      setWidth(String(Math.round(parseInt(val) * ratio) || ''));
    }
  }

  function applyPreset(p) {
    setMode('pixels');
    if (keepAR && origW && origH) {
      const scale = Math.min(p.w / origW, p.h / origH);
      setWidth(String(Math.round(origW * scale)));
      setHeight(String(Math.round(origH * scale)));
    } else {
      setWidth(String(p.w));
      setHeight(String(p.h));
    }
  }

  async function resize() {
    if (!file) return;
    setLoading(true); setDone(false);
    try {
      let targetW, targetH;
      if (mode === 'percent') {
        targetW = Math.round(origW * percent / 100);
        targetH = Math.round(origH * percent / 100);
      } else {
        targetW = parseInt(width) || origW;
        targetH = parseInt(height) || origH;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      const blob = await new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (outputFmt === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetW, targetH);
          }
          ctx.drawImage(img, 0, 0, targetW, targetH);
          URL.revokeObjectURL(url);
          const q = outputFmt === 'image/png' ? undefined : quality;
          canvas.toBlob(b => b ? resolve(b) : reject(new Error('failed')), outputFmt, q);
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('load failed')); };
        img.src = url;
      });

      const ext = outputFmt === 'image/jpeg' ? 'jpg' : outputFmt === 'image/png' ? 'png' : 'webp';
      downloadBlob(blob, file.name.replace(/\.[^/.]+$/, '') + `-${targetW}x${targetH}.${ext}`);
      setDone(true);
    } catch (e) {
      alert('Error resizing image. Please try again.');
    }
    setLoading(false);
  }

  const targetW = mode === 'percent' ? Math.round(origW * percent / 100) : (parseInt(width) || 0);
  const targetH = mode === 'percent' ? Math.round(origH * percent / 100) : (parseInt(height) || 0);

  return (
    <ToolLayout
      title="Resize Image"
      subtitle="Resize images by exact pixel dimensions or percentage. Supports JPG, PNG, WebP and GIF."
      bullets={[
        'Resize by pixels or percentage',
        'Lock aspect ratio to avoid distortion',
        'Quick presets for common sizes',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
      slug="resize-image"
    >
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `1.5px dashed ${dragging ? '#0071e3' : '#e2e8f0'}`,
          borderRadius: 14, padding: file ? '16px' : '32px 24px', textAlign: 'center',
          background: dragging ? '#f0f6ff' : '#fafafa', transition: 'all .15s',
          marginBottom: 16, cursor: file ? 'default' : 'pointer',
        }}
        onClick={() => !file && document.getElementById('fi').click()}
      >
        {file ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {preview && <img src={preview} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />}
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{formatSize(file.size)} · {origW}×{origH}px</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); setDone(false); }}
              style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
          </div>
        ) : (
          <>
            <div style={{ width: 44, height: 44, background: '#0071e3', borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your image here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>JPG, PNG, WebP, GIF — or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {file && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 14 }}>

          {/* MODE TOGGLE */}
          <div style={{ display: 'flex', gap: 8 }}>
            {[['pixels', 'By pixels'], ['percent', 'By percentage']].map(([v, l]) => (
              <button key={v} onClick={() => setMode(v)} style={{
                flex: 1, padding: '9px', borderRadius: 8,
                border: `1.5px solid ${mode === v ? '#0071e3' : '#e5e7eb'}`,
                background: mode === v ? '#eff6ff' : '#fff',
                color: mode === v ? '#0071e3' : '#555',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>{l}</button>
            ))}
          </div>

          {mode === 'pixels' ? (
            <>
              {/* PRESETS */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick presets</label>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                  {PRESETS.map(p => (
                    <button key={p.label} onClick={() => applyPreset(p)} style={{
                      padding: '6px 12px', borderRadius: 7, border: '1px solid #e5e7eb',
                      background: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', color: '#555',
                    }}>{p.label}</button>
                  ))}
                </div>
              </div>

              {/* W × H INPUTS */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Width (px)</label>
                  <input type="number" value={width} onChange={e => handleWidthChange(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                </div>
                <button onClick={() => setKeepAR(!keepAR)} title="Lock aspect ratio"
                  style={{ width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${keepAR ? '#0071e3' : '#e5e7eb'}`, background: keepAR ? '#eff6ff' : '#fff', cursor: 'pointer', marginTop: 18, flexShrink: 0, fontSize: 14 }}>
                  {keepAR ? '🔒' : '🔓'}
                </button>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Height (px)</label>
                  <input type="number" value={height} onChange={e => handleHeightChange(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #e5e7eb', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
                </div>
              </div>
            </>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Scale</label>
                <span style={{ fontSize: 13, color: '#0071e3', fontWeight: 600 }}>{percent}% → {Math.round(origW * percent / 100)}×{Math.round(origH * percent / 100)}px</span>
              </div>
              <input type="range" min="5" max="200" step="5" value={percent}
                onChange={e => setPercent(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0071e3' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 3 }}>
                <span>5%</span><span>100%</span><span>200%</span>
              </div>
            </div>
          )}

          {/* OUTPUT FORMAT + QUALITY */}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Output format</label>
              <select value={outputFmt} onChange={e => setFmt(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #e5e7eb', fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#fff' }}>
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            {outputFmt !== 'image/png' && (
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, color: '#6b7280' }}>Quality</label>
                  <span style={{ fontSize: 12, color: '#0071e3', fontWeight: 600 }}>{Math.round(quality * 100)}%</span>
                </div>
                <input type="range" min="0.5" max="1" step="0.01" value={quality}
                  onChange={e => setQuality(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#0071e3', marginTop: 6 }} />
              </div>
            )}
          </div>

          {/* SIZE PREVIEW */}
          {targetW > 0 && targetH > 0 && (
            <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 9, padding: '10px 14px', fontSize: 13, color: '#374151' }}>
              Output: <strong>{targetW}×{targetH}px</strong>
              {origW > 0 && <span style={{ color: '#9ca3af', marginLeft: 8 }}>
                ({targetW > origW ? '+' : ''}{Math.round((targetW / origW - 1) * 100)}% width)
              </span>}
            </div>
          )}
        </div>
      )}

      <button onClick={resize} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Resizing...' : done ? 'Done! Resize again?' : 'Resize Image'}
      </button>
      <ToolContent slug="resize-image" />
    </ToolLayout>
  );
}
