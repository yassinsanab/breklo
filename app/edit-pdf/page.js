'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ─── 20 FONTS ─────────────────────────────────────────────── */
const FONTS = [
  { label: 'Inter',           value: 'Inter, sans-serif' },
  { label: 'Georgia',         value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Courier New',     value: '"Courier New", monospace' },
  { label: 'Verdana',         value: 'Verdana, sans-serif' },
  { label: 'Trebuchet MS',    value: '"Trebuchet MS", sans-serif' },
  { label: 'Impact',          value: 'Impact, sans-serif' },
  { label: 'Comic Sans',      value: '"Comic Sans MS", cursive' },
  { label: 'Palatino',        value: '"Palatino Linotype", serif' },
  { label: 'Garamond',        value: 'Garamond, serif' },
  { label: 'Montserrat',      value: 'Montserrat, sans-serif' },
  { label: 'Oswald',          value: 'Oswald, sans-serif' },
  { label: 'Raleway',         value: 'Raleway, sans-serif' },
  { label: 'Playfair',        value: '"Playfair Display", serif' },
  { label: 'Roboto Slab',     value: '"Roboto Slab", serif' },
  { label: 'Dancing Script',  value: '"Dancing Script", cursive' },
  { label: 'Pacifico',        value: 'Pacifico, cursive' },
  { label: 'Lobster',         value: 'Lobster, cursive' },
  { label: 'Sacramento',      value: 'Sacramento, cursive' },
  { label: 'Great Vibes',     value: '"Great Vibes", cursive' },
];

const GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Oswald&family=Raleway&family=Playfair+Display&family=Roboto+Slab&family=Dancing+Script&family=Pacifico&family=Lobster&family=Sacramento&family=Great+Vibes&display=swap';

/* ─── COLORS ────────────────────────────────────────────────── */
const COLORS = [
  '#2563eb','#dc2626','#16a34a','#d97706',
  '#7c3aed','#db2777','#0891b2','#0a0a0a',
  '#64748b','#f59e0b','#10b981','#8b5cf6',
];

/* ─── SVG ICON ──────────────────────────────────────────────── */
const Ic = ({ d, size = 18, sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

/* ─── TOOL DEFINITIONS ──────────────────────────────────────── */
const TOOLS = [
  { id:'select',    label:'Select',    cursor:'default',    icon:['M4 4l7 18 3-7 7-3z'] },
  { id:'text',      label:'Add Text',  cursor:'text',       icon:['M4 7V5h16v2','M12 5v14','M9 19h6'] },
  { id:'draw',      label:'Draw',      cursor:'crosshair',  icon:['M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9','M3 21h18'] },
  { id:'highlight', label:'Highlight', cursor:'crosshair',  icon:['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2','M9 5a2 2 0 002 2h2a2 2 0 002-2','M9 5a2 2 0 012-2h2a2 2 0 012 2','M9 12h6','M9 16h4'] },
  { id:'sign',      label:'Sign',      cursor:'crosshair',  icon:['M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L18 5.5','M15 3l4 4','M8 17l2-2 2.5 2.5-2 2L8 17z','M17 8L7 18'] },
  { id:'shape',     label:'Rectangle', cursor:'crosshair',  icon:['M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'] },
  { id:'image',     label:'Add Image', cursor:'pointer',    icon:['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z','M12 13m-3 0a3 3 0 106 0 3 3 0 00-6 0'] },
  { id:'eraser',    label:'Eraser',    cursor:'cell',       icon:['M20 20H7L3 16l9.5-9.5','M13 5l4 4'] },
];

/* ─── SIGN MODAL ────────────────────────────────────────────── */
function SignModal({ onClose, onApply }) {
  const canvasRef = useRef(null);
  const [mode, setMode]       = useState('draw');
  const [typeText, setTypeText] = useState('');
  const [signFont, setSignFont] = useState(FONTS[16].value); // Pacifico
  const drawingRef = useRef(false);
  const lastPosRef = useRef(null);

  function setupCanvas() {
    const c = canvasRef.current; if (!c) return;
    c.width  = 480; c.height = 160;
    const ctx = c.getContext('2d');
    ctx.fillStyle   = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth   = 2.5;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }
  useEffect(setupCanvas, []);

  function getPos(e) {
    const r = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / r.width;
    const scaleY = canvasRef.current.height / r.height;
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left) * scaleX, y: (t.clientY - r.top) * scaleY };
  }
  function onDown(e) {
    e.preventDefault(); drawingRef.current = true;
    const pos = getPos(e); lastPosRef.current = pos;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
  }
  function onMove(e) {
    if (!drawingRef.current) return; e.preventDefault();
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPosRef.current = pos;
  }
  function onUp(e) { e.preventDefault(); drawingRef.current = false; }
  function clear() { setupCanvas(); }

  function apply() {
    if (mode === 'draw') {
      onApply({ type: 'sign-img', dataUrl: canvasRef.current.toDataURL('image/png') });
    } else {
      onApply({ type: 'sign-text', text: typeText, font: signFont });
    }
    onClose();
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ background:'#fff', borderRadius:20, width:'100%', maxWidth:540, boxShadow:'0 32px 80px rgba(0,0,0,.25)', overflow:'hidden' }}>
        <div style={{ padding:'22px 24px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ font:'700 18px/1 Inter,sans-serif', color:'#0a0a0a', margin:0 }}>Create your signature</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#71717a', padding:4, display:'flex' }}>
            <Ic d="M18 6L6 18M6 6l12 12" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, padding:'16px 24px 0' }}>
          {[['draw','✍ Draw'], ['type','T Type']].map(([id, lbl]) => (
            <button key={id} onClick={() => setMode(id)} style={{
              padding:'8px 18px', borderRadius:8, fontSize:14, fontWeight:500, cursor:'pointer',
              border:`1.5px solid ${mode===id ? '#bfdbfe' : 'transparent'}`,
              background: mode===id ? '#eff4ff' : 'transparent',
              color: mode===id ? '#1d4ed8' : '#71717a', fontFamily:'inherit',
            }}>{lbl}</button>
          ))}
        </div>

        <div style={{ padding:'16px 24px' }}>
          {mode === 'draw' ? (
            <div style={{ position:'relative' }}>
              <canvas ref={canvasRef}
                style={{ width:'100%', height:160, border:'1.5px dashed #d4d4d8', borderRadius:12, cursor:'crosshair', display:'block', touchAction:'none', background:'#fff' }}
                onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
                onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
              />
              <span style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', fontSize:11, color:'#a1a1aa', pointerEvents:'none' }}>
                Draw your signature above
              </span>
            </div>
          ) : (
            <div>
              <div style={{ border:'1.5px solid #e4e4e7', borderRadius:12, padding:'12px 16px', marginBottom:12, minHeight:64, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontFamily:signFont, fontSize:36, color:'#1d4ed8', letterSpacing:2 }}>
                  {typeText || 'Your Signature'}
                </span>
              </div>
              <input value={typeText} onChange={e=>setTypeText(e.target.value)}
                placeholder="Type your name…"
                style={{ width:'100%', padding:'10px 14px', border:'1.5px solid #e4e4e7', borderRadius:9, fontSize:15, fontFamily:'inherit', outline:'none', marginBottom:12 }}
              />
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                {[FONTS[16],FONTS[17],FONTS[18],FONTS[19],FONTS[14],FONTS[13]].map(f => (
                  <button key={f.label} onClick={() => setSignFont(f.value)} style={{
                    padding:'6px 14px', borderRadius:8, border:`1.5px solid ${signFont===f.value ? '#2563eb' : '#e4e4e7'}`,
                    background: signFont===f.value ? '#eff4ff' : '#fff',
                    fontFamily:f.value, fontSize:15, cursor:'pointer', color: signFont===f.value ? '#1d4ed8' : '#52525b',
                  }}>{f.label}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding:'0 24px 22px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {mode === 'draw' && <button onClick={clear} style={{ fontSize:13, color:'#71717a', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>Clear</button>}
          {mode !== 'draw' && <div />}
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={onClose} style={{ padding:'9px 20px', borderRadius:9, border:'1px solid #e4e4e7', background:'#fff', fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'inherit', color:'#3f3f46' }}>Cancel</button>
            <button onClick={apply} style={{ padding:'9px 22px', borderRadius:9, border:'none', background:'#2563eb', color:'#fff', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 4px 12px rgba(37,99,235,.3)' }}>
              Apply →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TEXT INPUT OVERLAY ────────────────────────────────────── */
function TextOverlay({ pos, color, font, fontSize, onCommit, onCancel }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onCommit(ref.current.value); }
    if (e.key === 'Escape') onCancel();
  }
  return (
    <div style={{ position:'absolute', left: pos.x, top: pos.y - 28, zIndex:50, pointerEvents:'all' }}>
      <textarea ref={ref}
        rows={2}
        onKeyDown={onKey}
        onBlur={e => onCommit(e.target.value)}
        placeholder="Type here… (Enter to confirm)"
        style={{ border:`2px solid ${color}`, borderRadius:8, outline:'none', padding:'6px 10px', fontSize, color, fontFamily: font, background:'rgba(255,255,255,.97)', minWidth:160, resize:'both', boxShadow:'0 4px 20px rgba(0,0,0,.18)', lineHeight:1.4 }}
      />
    </div>
  );
}

/* ─── MAIN EDITOR ────────────────────────────────────────────── */
export default function EditPDF() {
  // file state
  const [file, setFile]         = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [curPage, setCurPage]   = useState(1);
  const [zoom, setZoom]         = useState(1.4);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [dragging, setDrag]     = useState(false);

  // tool state
  const [tool, setTool]         = useState('select');
  const [color, setColor]       = useState('#2563eb');
  const [lineWidth, setLineWidth] = useState(2.5);
  const [font, setFont]         = useState(FONTS[0].value);
  const [fontSize, setFontSize] = useState(18);
  const [textPos, setTextPos]   = useState(null);
  const [showSign, setShowSign] = useState(false);

  // annotation history: { [page]: ann[] }
  const [annots, setAnnots]     = useState({});
  const historyRef              = useRef([]); // stack of annot snapshots
  const redoRef                 = useRef([]);

  // canvas refs — 3-layer approach
  const pdfCanvasRef  = useRef(null);  // layer 1: PDF
  const annCanvasRef  = useRef(null);  // layer 2: committed annotations
  const liveCanvasRef = useRef(null);  // layer 3: in-progress drawing

  // pdfjs ref
  const pdfjsDocRef = useRef(null);
  const pdfjsLib    = useRef(null);

  // drawing state (refs to avoid stale closures)
  const isDrawing  = useRef(false);
  const livePoints = useRef([]);
  const shapeStart = useRef(null);

  // sign pending position
  const pendingSignPos = useRef({ x: 60, y: 60 });

  /* ── Load fonts ── */
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
  }, []);

  /* ── Load PDF ── */
  async function loadPdf(f) {
    if (!f || f.type !== 'application/pdf') return;
    setLoading(true);
    setFile(f); setAnnots({}); historyRef.current = []; redoRef.current = [];
    setCurPage(1);
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjsLib.current = pdfjs;
      const buf  = await f.arrayBuffer();
      const doc  = await pdfjs.getDocument({ data: buf }).promise;
      pdfjsDocRef.current = doc;
      setNumPages(doc.numPages);
    } catch(e) { alert('Could not load PDF. Is it valid?'); }
    setLoading(false);
  }

  /* ── Render PDF layer ── */
  const renderPdfLayer = useCallback(async (pageNum, scale) => {
    const doc = pdfjsDocRef.current;
    const canvas = pdfCanvasRef.current;
    if (!doc || !canvas) return;
    const page = await doc.getPage(pageNum);
    const vp   = page.getViewport({ scale });
    canvas.width  = vp.width;
    canvas.height = vp.height;
    canvas.style.width  = vp.width  + 'px';
    canvas.style.height = vp.height + 'px';
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    // Sync other canvas sizes
    [annCanvasRef, liveCanvasRef].forEach(ref => {
      if (!ref.current) return;
      ref.current.width  = vp.width;
      ref.current.height = vp.height;
      ref.current.style.width  = vp.width  + 'px';
      ref.current.style.height = vp.height + 'px';
    });
  }, []);

  /* ── Render annotation layer ── */
  const renderAnnLayer = useCallback((pageNum, currentAnnots) => {
    const canvas = annCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const page = (currentAnnots || annots)[pageNum] || [];
    page.forEach(ann => drawAnn(ctx, ann));
  }, [annots]);

  function drawAnn(ctx, ann) {
    ctx.save();
    if (ann.type === 'path') {
      if (!ann.points || ann.points.length < 2) { ctx.restore(); return; }
      ctx.beginPath();
      ctx.strokeStyle = ann.color;
      ctx.lineWidth   = ann.lineWidth || 2.5;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.moveTo(ann.points[0].x, ann.points[0].y);
      // smooth path
      for (let i = 1; i < ann.points.length - 1; i++) {
        const mx = (ann.points[i].x + ann.points[i+1].x) / 2;
        const my = (ann.points[i].y + ann.points[i+1].y) / 2;
        ctx.quadraticCurveTo(ann.points[i].x, ann.points[i].y, mx, my);
      }
      ctx.lineTo(ann.points[ann.points.length-1].x, ann.points[ann.points.length-1].y);
      ctx.stroke();
    } else if (ann.type === 'highlight') {
      ctx.globalAlpha = 0.35;
      ctx.fillStyle   = ann.color;
      ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
    } else if (ann.type === 'rect') {
      ctx.strokeStyle = ann.color;
      ctx.lineWidth   = ann.lineWidth || 2;
      ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
    } else if (ann.type === 'text') {
      ctx.fillStyle  = ann.color;
      ctx.font       = `${ann.fontSize || 18}px ${ann.font || 'Inter, sans-serif'}`;
      // multiline
      const lines = ann.text.split('\n');
      lines.forEach((line, i) => ctx.fillText(line, ann.x, ann.y + i * (ann.fontSize || 18) * 1.35));
    } else if (ann.type === 'sign-img') {
      const img = new Image();
      img.onload = () => {
        const ac = annCanvasRef.current;
        if (ac) {
          const c = ac.getContext('2d');
          c.drawImage(img, ann.x, ann.y, ann.w, ann.h);
        }
      };
      img.src = ann.dataUrl;
    } else if (ann.type === 'sign-text') {
      ctx.font       = `36px ${ann.font}`;
      ctx.fillStyle  = '#1d4ed8';
      ctx.fillText(ann.text, ann.x, ann.y);
    } else if (ann.type === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      if (!ann.points || ann.points.length < 2) { ctx.restore(); return; }
      ctx.beginPath();
      ctx.lineWidth = ann.lineWidth || 20;
      ctx.lineCap   = 'round';
      ctx.lineJoin  = 'round';
      ctx.moveTo(ann.points[0].x, ann.points[0].y);
      ann.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ── Re-render when page/zoom/annots change ── */
  useEffect(() => {
    if (!pdfjsDocRef.current) return;
    renderPdfLayer(curPage, zoom).then(() => renderAnnLayer(curPage, annots));
  }, [curPage, zoom, annots]);

  /* ── Push annotation (with history) ── */
  function pushAnn(ann) {
    historyRef.current.push(JSON.parse(JSON.stringify(annots)));
    redoRef.current = [];
    setAnnots(prev => {
      const page = [...(prev[curPage] || []), ann];
      return { ...prev, [curPage]: page };
    });
  }

  /* ── Undo ── */
  function undo() {
    if (historyRef.current.length === 0) return;
    redoRef.current.push(JSON.parse(JSON.stringify(annots)));
    const prev = historyRef.current.pop();
    setAnnots(prev);
  }

  /* ── Redo ── */
  function redo() {
    if (redoRef.current.length === 0) return;
    historyRef.current.push(JSON.parse(JSON.stringify(annots)));
    const next = redoRef.current.pop();
    setAnnots(next);
  }

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') { e.preventDefault(); redo(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [annots]);

  /* ── Get position on canvas ── */
  function getPos(e) {
    const canvas = liveCanvasRef.current;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const t = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
  }

  /* ── Canvas pointer down ── */
  function onDown(e) {
    e.preventDefault();
    if (textPos) return;
    const pos = getPos(e);

    if (tool === 'text') {
      setTextPos(pos);
      return;
    }
    if (tool === 'sign') {
      pendingSignPos.current = pos;
      setShowSign(true);
      return;
    }
    if (tool === 'image') {
      document.getElementById('img-input').click();
      return;
    }
    if (tool === 'select') return;

    isDrawing.current  = true;
    livePoints.current = [pos];
    shapeStart.current = pos;
  }

  /* ── Canvas pointer move ── */
  function onMove(e) {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    livePoints.current.push(pos);
    const canvas = liveCanvasRef.current;
    const ctx    = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (tool === 'draw') {
      const pts = livePoints.current;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      if (pts.length > 1) {
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length - 1; i++) {
          ctx.quadraticCurveTo(pts[i].x, pts[i].y, (pts[i].x + pts[i+1].x)/2, (pts[i].y + pts[i+1].y)/2);
        }
        ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
        ctx.stroke();
      }
    } else if (tool === 'highlight') {
      const s = shapeStart.current;
      ctx.globalAlpha = 0.35;
      ctx.fillStyle   = color;
      ctx.fillRect(s.x, s.y, pos.x - s.x, pos.y - s.y);
    } else if (tool === 'rect') {
      const s = shapeStart.current;
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineWidth;
      ctx.strokeRect(s.x, s.y, pos.x - s.x, pos.y - s.y);
    } else if (tool === 'eraser') {
      const pts = livePoints.current;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha  = 1;
      ctx.beginPath();
      ctx.lineWidth = 20;
      ctx.lineCap   = 'round';
      ctx.lineJoin  = 'round';
      if (pts.length > 1) {
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  /* ── Canvas pointer up ── */
  function onUp(e) {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const pos = getPos(e);
    const ctx = liveCanvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, liveCanvasRef.current.width, liveCanvasRef.current.height);

    if (tool === 'draw') {
      if (livePoints.current.length < 2) return;
      pushAnn({ type:'path', points: [...livePoints.current, pos], color, lineWidth });
    } else if (tool === 'highlight') {
      const s = shapeStart.current;
      const w = pos.x - s.x, h = pos.y - s.y;
      if (Math.abs(w) < 4 || Math.abs(h) < 4) return;
      pushAnn({ type:'highlight', x:s.x, y:s.y, w, h, color });
    } else if (tool === 'rect') {
      const s = shapeStart.current;
      const w = pos.x - s.x, h = pos.y - s.y;
      if (Math.abs(w) < 4 || Math.abs(h) < 4) return;
      pushAnn({ type:'rect', x:s.x, y:s.y, w, h, color, lineWidth });
    } else if (tool === 'eraser') {
      if (livePoints.current.length < 2) return;
      pushAnn({ type:'eraser', points: [...livePoints.current, pos], lineWidth:20 });
    }
    livePoints.current = [];
  }

  /* ── Commit text ── */
  function commitText(val) {
    if (val.trim() && textPos) {
      pushAnn({ type:'text', x:textPos.x, y:textPos.y + fontSize, text:val.trim(), color, font, fontSize });
    }
    setTextPos(null);
  }

  /* ── Apply signature ── */
  function applySign(sig) {
    const pos = pendingSignPos.current;
    if (sig.type === 'sign-img') {
      pushAnn({ type:'sign-img', x:pos.x, y:pos.y, w:220, h:80, dataUrl:sig.dataUrl });
    } else {
      pushAnn({ type:'sign-text', x:pos.x, y:pos.y+36, text:sig.text, font:sig.font });
    }
  }

  /* ── Add image from file ── */
  async function addImage(f) {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = e => {
      pushAnn({ type:'sign-img', x:50, y:50, w:200, h:150, dataUrl:e.target.result });
    };
    reader.readAsDataURL(f);
  }

  /* ── Save PDF ── */
  async function savePdf() {
    if (!file) return;
    setSaving(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const buf     = await file.arrayBuffer();
      const pdfDoc  = await PDFDocument.load(buf);
      const hFont   = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Helper: hex to rgb
      function h2rgb(hex) {
        const r = parseInt(hex.slice(1,3),16)/255;
        const g = parseInt(hex.slice(3,5),16)/255;
        const b = parseInt(hex.slice(5,7),16)/255;
        return rgb(r, g, b);
      }

      for (const [pnStr, anns] of Object.entries(annots)) {
        const pn   = parseInt(pnStr);
        const page = pdfDoc.getPage(pn - 1);
        const { width: pgW, height: pgH } = page.getSize();

        // canvas dimensions (what user saw)
        const cvW = pdfCanvasRef.current?.width  || 800;
        const cvH = pdfCanvasRef.current?.height || 1100;
        const sx  = pgW / cvW;
        const sy  = pgH / cvH;

        for (const ann of anns) {
          if (ann.type === 'text') {
            const lines = ann.text.split('\n');
            lines.forEach((line, i) => {
              try {
                page.drawText(line, {
                  x:     ann.x * sx,
                  y:     pgH - (ann.y + i * (ann.fontSize||18) * 1.35) * sy,
                  size:  (ann.fontSize||18) * Math.min(sx, sy),
                  font:  hFont,
                  color: h2rgb(ann.color || '#000000'),
                });
              } catch {}
            });
          } else if (ann.type === 'path' && ann.points?.length > 1) {
            const c = h2rgb(ann.color || '#000000');
            for (let i = 0; i < ann.points.length - 1; i++) {
              page.drawLine({
                start: { x: ann.points[i].x * sx,   y: pgH - ann.points[i].y * sy },
                end:   { x: ann.points[i+1].x * sx, y: pgH - ann.points[i+1].y * sy },
                thickness: (ann.lineWidth||2.5) * Math.min(sx, sy),
                color: c,
              });
            }
          } else if (ann.type === 'highlight') {
            page.drawRectangle({
              x:      ann.x * sx,
              y:      pgH - (ann.y + ann.h) * sy,
              width:  ann.w * sx,
              height: Math.abs(ann.h) * sy,
              color:  h2rgb(ann.color || '#fbbf24'),
              opacity: 0.35,
            });
          } else if (ann.type === 'rect') {
            page.drawRectangle({
              x:         ann.x * sx,
              y:         pgH - (ann.y + (ann.h < 0 ? ann.h : 0)) * sy,
              width:     Math.abs(ann.w) * sx,
              height:    Math.abs(ann.h) * sy,
              borderColor: h2rgb(ann.color || '#000'),
              borderWidth: (ann.lineWidth||2) * Math.min(sx, sy),
              color: undefined,
            });
          } else if (ann.type === 'sign-img') {
            try {
              const resp = await fetch(ann.dataUrl);
              const imgBuf = await resp.arrayBuffer();
              const isPng = ann.dataUrl.startsWith('data:image/png');
              const emb   = isPng ? await pdfDoc.embedPng(imgBuf) : await pdfDoc.embedJpg(imgBuf);
              page.drawImage(emb, {
                x:      ann.x * sx,
                y:      pgH - (ann.y + Math.abs(ann.h || 80)) * sy,
                width:  (ann.w||200) * sx,
                height: Math.abs(ann.h||80) * sy,
              });
            } catch {}
          } else if (ann.type === 'sign-text') {
            try {
              page.drawText(ann.text, {
                x:    ann.x * sx,
                y:    pgH - ann.y * sy,
                size: 28 * Math.min(sx, sy),
                font: hFont,
                color: rgb(0.11, 0.3, 0.87),
              });
            } catch {}
          }
        }
      }

      const bytes = await pdfDoc.save();
      const blob  = new Blob([bytes], { type:'application/pdf' });
      const url   = URL.createObjectURL(blob);
      const a     = document.createElement('a');
      a.href = url; a.download = file.name.replace('.pdf','-edited.pdf'); a.click();
      URL.revokeObjectURL(url);
    } catch(e) {
      console.error(e);
      alert('Error saving. Please try again.');
    }
    setSaving(false);
  }

  /* ── Page thumbnails ── */
  const thumbRefs = useRef({});
  useEffect(() => {
    if (!pdfjsDocRef.current) return;
    for (let i = 1; i <= numPages; i++) {
      const c = thumbRefs.current[i];
      if (!c) continue;
      pdfjsDocRef.current.getPage(i).then(page => {
        const vp = page.getViewport({ scale: 0.14 });
        c.width = vp.width; c.height = vp.height;
        page.render({ canvasContext: c.getContext('2d'), viewport: vp });
      });
    }
  }, [numPages]);

  const canEdit = historyRef.current.length > 0;
  const canRedo = redoRef.current.length > 0;
  const activeTool = TOOLS.find(t => t.id === tool);

  /* ─────────── UPLOAD SCREEN ─────────────────────────────── */
  if (!file) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif", background:'#fff' }}>
      <style>{`@import url('${GOOGLE_FONTS_URL}')`}</style>
      <nav style={{ height:58, borderBottom:'1px solid #e4e4e7', display:'flex', alignItems:'center', padding:'0 24px', justifyContent:'space-between' }}>
        <Link href="/" style={{ fontWeight:700, fontSize:20, letterSpacing:'-.4px', color:'#0a0a0a', textDecoration:'none' }}>
          breklo<span style={{ color:'#2563eb' }}>.</span>
        </Link>
        <Link href="/" style={{ fontSize:13, color:'#71717a', textDecoration:'none' }}>← All tools</Link>
      </nav>
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'60px 24px' }}>
        <div style={{ textAlign:'center', maxWidth:560, width:'100%' }}>
          <div style={{ width:68, height:68, background:'linear-gradient(135deg,#2563eb,#1d4ed8)', borderRadius:20, margin:'0 auto 24px', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', boxShadow:'0 12px 28px rgba(37,99,235,.3)' }}>
            <Ic d={['M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z','M14 3v6h6','M12 20h9','M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z']} size={30} sw={1.5} />
          </div>
          <h1 style={{ fontSize:38, fontWeight:700, letterSpacing:'-.03em', color:'#0a0a0a', marginBottom:12 }}>Edit PDF</h1>
          <p style={{ fontSize:17, color:'#71717a', marginBottom:40, lineHeight:1.65, maxWidth:440, margin:'0 auto 40px' }}>
            Add text, draw, highlight, sign and annotate your PDF directly in your browser. Free, private, no signup.
          </p>
          <div
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); loadPdf(e.dataTransfer.files[0]); }}
            onClick={() => document.getElementById('fi').click()}
            style={{ border:`2px dashed ${dragging ? '#2563eb' : '#d4d4d8'}`, borderRadius:20, padding:'52px 32px', textAlign:'center', background: dragging ? '#eff4ff' : '#fafafa', cursor:'pointer', transition:'all .15s', marginBottom:24 }}
          >
            <div style={{ width:56, height:56, background: dragging ? '#2563eb' : '#e4e4e7', borderRadius:14, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', color: dragging ? '#fff' : '#71717a', transition:'all .15s' }}>
              <Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" size={24} sw={2} />
            </div>
            <p style={{ fontWeight:600, fontSize:17, color:'#0a0a0a', marginBottom:6 }}>Drop your PDF here</p>
            <p style={{ fontSize:14, color:'#a1a1aa', marginBottom:24 }}>or click to browse — up to 100 MB</p>
            <button onClick={e => e.stopPropagation()} style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:11, padding:'13px 32px', fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'inherit', boxShadow:'0 8px 20px rgba(37,99,235,.3)' }}>
              Select PDF file
            </button>
            <p style={{ fontSize:12, color:'#d4d4d8', marginTop:14 }}>Files never leave your device · 100% free</p>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
            {['Add text','Draw & annotate','Highlight text','Sign PDF','Undo / Redo','20 fonts'].map(f => (
              <span key={f} style={{ padding:'5px 12px', background:'#f4f4f5', borderRadius:20, fontSize:13, color:'#52525b', fontWeight:500 }}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <input id="fi" type="file" accept=".pdf,application/pdf" style={{ display:'none' }} onChange={e => loadPdf(e.target.files[0])} />
    </div>
  );

  /* ─────────── EDITOR ────────────────────────────────────── */
  return (
    <div style={{ height:'100vh', display:'flex', flexDirection:'column', fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif", background:'#fff', overflow:'hidden' }}>
      <style>{`
        @import url('${GOOGLE_FONTS_URL}');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .tool-btn{border:none;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;width:48px;height:48px;border-radius:10px;transition:all .12s;font-family:inherit}
        .tool-btn:hover{background:#f4f4f5}
        .tool-btn.active{background:#eff4ff;color:#2563eb}
        .tool-btn .tl{font-size:9px;font-weight:500;color:inherit;opacity:.7;letter-spacing:.2px}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#d4d4d8;border-radius:3px}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{ height:54, borderBottom:'1px solid #e4e4e7', display:'flex', alignItems:'center', padding:'0 14px', gap:10, flexShrink:0, background:'#fff', zIndex:20 }}>
        <Link href="/" style={{ fontWeight:700, fontSize:18, letterSpacing:'-.4px', color:'#0a0a0a', textDecoration:'none', flexShrink:0 }}>
          breklo<span style={{ color:'#2563eb' }}>.</span>
        </Link>
        <div style={{ width:1, height:22, background:'#e4e4e7' }} />

        {/* File chip */}
        <div style={{ display:'flex', alignItems:'center', gap:7, flex:1, minWidth:0 }}>
          <span style={{ width:24, height:28, background:'#fee2e2', borderRadius:4, display:'grid', placeItems:'center', flexShrink:0 }}>
            <span style={{ fontSize:7, fontWeight:800, color:'#b91c1c', letterSpacing:'.04em' }}>PDF</span>
          </span>
          <span style={{ fontSize:13.5, fontWeight:500, color:'#18181b', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{file.name}</span>
        </div>

        {/* Undo / Redo */}
        {[
          [undo, !canEdit, ICONS.undo, 'Undo (Ctrl+Z)'],
          [redo, !canRedo, ICONS.redo, 'Redo (Ctrl+Y)'],
        ].map(([fn, dis, ic, title], i) => (
          <button key={i} onClick={fn} disabled={dis} title={title} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor: dis ? 'default' : 'pointer', color: dis ? '#d4d4d8' : '#52525b', flexShrink:0 }}>
            <Ic d={ic} size={15} />
          </button>
        ))}

        <div style={{ width:1, height:22, background:'#e4e4e7' }} />

        {/* Zoom */}
        <div style={{ display:'flex', alignItems:'center', gap:4, flexShrink:0 }}>
          <button onClick={() => setZoom(z => Math.max(0.4, +(z-0.2).toFixed(1)))} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:7, width:28, height:28, cursor:'pointer', color:'#52525b', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
          <span style={{ fontSize:12.5, color:'#52525b', minWidth:38, textAlign:'center', fontWeight:500 }}>{Math.round(zoom*100)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, +(z+0.2).toFixed(1)))} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:7, width:28, height:28, cursor:'pointer', color:'#52525b', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
        </div>

        <div style={{ width:1, height:22, background:'#e4e4e7' }} />

        {/* Page nav */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0, fontSize:13, color:'#52525b', fontWeight:500 }}>
          <button onClick={() => setCurPage(p => Math.max(1,p-1))} disabled={curPage===1} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:6, width:26, height:26, cursor: curPage===1 ? 'default' : 'pointer', color: curPage===1 ? '#d4d4d8' : '#52525b', fontSize:12 }}>‹</button>
          <span>{curPage} / {numPages}</span>
          <button onClick={() => setCurPage(p => Math.min(numPages,p+1))} disabled={curPage===numPages} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:6, width:26, height:26, cursor: curPage===numPages ? 'default' : 'pointer', color: curPage===numPages ? '#d4d4d8' : '#52525b', fontSize:12 }}>›</button>
        </div>

        <div style={{ width:1, height:22, background:'#e4e4e7' }} />

        <button onClick={() => { setFile(null); setPdfDoc && setPdfDoc(null); }} style={{ background:'none', border:'1px solid #e4e4e7', borderRadius:8, padding:'0 12px', height:32, fontSize:13, fontWeight:500, cursor:'pointer', color:'#52525b', fontFamily:'inherit', display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
          <Ic d="M18 6L6 18M6 6l12 12" size={12} /> New file
        </button>

        <button onClick={savePdf} disabled={saving} style={{ background:'#2563eb', color:'#fff', border:'none', borderRadius:9, padding:'0 18px', height:36, display:'flex', alignItems:'center', gap:7, cursor: saving ? 'wait' : 'pointer', fontSize:14, fontWeight:600, fontFamily:'inherit', boxShadow:'0 2px 10px rgba(37,99,235,.3)', flexShrink:0 }}>
          <Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={14} sw={2.2} />
          {saving ? 'Saving…' : 'Download'}
        </button>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>

        {/* ── LEFT: TOOLBAR ── */}
        <div style={{ width:60, borderRight:'1px solid #e4e4e7', display:'flex', flexDirection:'column', alignItems:'center', padding:'10px 0', gap:2, flexShrink:0, overflowY:'auto', background:'#fff' }}>
          {TOOLS.map(t => (
            <button key={t.id} className={`tool-btn${tool===t.id ? ' active' : ''}`} onClick={() => setTool(t.id)} title={t.label}
              style={{ color: tool===t.id ? '#2563eb' : '#71717a' }}>
              <Ic d={t.icon} size={17} />
              <span className="tl">{t.label.split(' ')[0]}</span>
            </button>
          ))}
          <div style={{ width:36, height:1, background:'#e4e4e7', margin:'8px 0' }} />
          {/* Mini color dots */}
          {COLORS.slice(0,6).map(c => (
            <button key={c} onClick={() => setColor(c)} title={c} style={{ width:20, height:20, borderRadius:'50%', background:c, border:'none', cursor:'pointer', outline: color===c ? `3px solid ${c}` : 'none', outlineOffset:2, boxShadow: color===c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none', margin:'2px 0', transform: color===c ? 'scale(1.2)' : 'scale(1)', transition:'all .12s' }} />
          ))}
        </div>

        {/* ── THUMBNAILS ── */}
        <div style={{ width:88, borderRight:'1px solid #e4e4e7', overflowY:'auto', padding:'10px 6px', display:'flex', flexDirection:'column', gap:6, flexShrink:0, background:'#fafafa' }}>
          {Array.from({ length:numPages }, (_,i) => i+1).map(n => (
            <button key={n} onClick={() => setCurPage(n)} style={{ background:'none', border:`2px solid ${curPage===n ? '#2563eb' : '#e4e4e7'}`, borderRadius:8, padding:4, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3, transition:'border-color .12s' }}>
              <canvas ref={el => { thumbRefs.current[n]=el; if(el && pdfjsDocRef.current){ pdfjsDocRef.current.getPage(n).then(page => { const vp=page.getViewport({scale:.13}); el.width=vp.width; el.height=vp.height; page.render({canvasContext:el.getContext('2d'),viewport:vp}); }); } }} style={{ borderRadius:3, display:'block', maxWidth:'100%' }} />
              <span style={{ fontSize:9.5, color: curPage===n ? '#2563eb' : '#a1a1aa', fontWeight: curPage===n ? 600 : 400 }}>{n}</span>
            </button>
          ))}
        </div>

        {/* ── MAIN CANVAS ── */}
        <div style={{ flex:1, overflow:'auto', background:'#52525b', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:24, position:'relative' }}
          onClick={e => { if (textPos && e.target === e.currentTarget) setTextPos(null); }}
        >
          {loading && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(82,82,91,.7)', zIndex:10 }}>
              <div style={{ background:'#fff', borderRadius:16, padding:'24px 32px', fontSize:15, fontWeight:600, color:'#0a0a0a' }}>Loading PDF…</div>
            </div>
          )}
          {/* 3 stacked canvases */}
          <div style={{ position:'relative', boxShadow:'0 8px 48px rgba(0,0,0,.5)', borderRadius:2, userSelect:'none', flexShrink:0 }}>
            <canvas ref={pdfCanvasRef} style={{ display:'block', position:'relative', zIndex:1 }} />
            <canvas ref={annCanvasRef} style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none' }} />
            <canvas ref={liveCanvasRef}
              style={{ position:'absolute', inset:0, zIndex:3, cursor: activeTool?.cursor || 'default' }}
              onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
              onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            />
            {/* Text input floating over canvas */}
            {textPos && (
              <TextOverlay
                pos={textPos}
                color={color}
                font={font}
                fontSize={fontSize}
                onCommit={commitText}
                onCancel={() => setTextPos(null)}
              />
            )}
          </div>
        </div>

        {/* ── RIGHT: PROPERTIES ── */}
        <div style={{ width:220, borderLeft:'1px solid #e4e4e7', background:'#fff', padding:'16px 14px', flexShrink:0, overflowY:'auto', display:'flex', flexDirection:'column', gap:20 }}>

          {/* Active tool */}
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>Tool</div>
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 12px', background:'#eff4ff', borderRadius:9, border:'1px solid #bfdbfe' }}>
              <span style={{ color:'#2563eb' }}><Ic d={activeTool?.icon} size={15} /></span>
              <span style={{ fontSize:13.5, fontWeight:600, color:'#1d4ed8' }}>{activeTool?.label}</span>
            </div>
          </div>

          {/* Colors */}
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>Color</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{ width:26, height:26, borderRadius:'50%', background:c, border:'none', cursor:'pointer', boxShadow: color===c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none', transform: color===c ? 'scale(1.15)' : 'scale(1)', transition:'all .12s' }} />
              ))}
            </div>
            {/* Custom color */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:8 }}>
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                style={{ width:28, height:28, border:'1px solid #e4e4e7', borderRadius:6, cursor:'pointer', padding:2 }} />
              <span style={{ fontSize:12, color:'#71717a', fontFamily:'monospace' }}>{color}</span>
            </div>
          </div>

          {/* Line width */}
          {['draw','rect','eraser'].includes(tool) && (
            <div>
              <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>
                {tool === 'eraser' ? 'Eraser size' : 'Line width'}: {tool === 'eraser' ? '20px' : lineWidth + 'px'}
              </div>
              {tool !== 'eraser' && (
                <input type="range" min="1" max="20" step="0.5" value={lineWidth} onChange={e => setLineWidth(parseFloat(e.target.value))}
                  style={{ width:'100%', accentColor:'#2563eb' }} />
              )}
            </div>
          )}

          {/* Font settings */}
          {tool === 'text' && (
            <>
              <div>
                <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>Font size: {fontSize}px</div>
                <input type="range" min="8" max="72" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))}
                  style={{ width:'100%', accentColor:'#2563eb' }} />
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#a1a1aa', marginTop:3 }}>
                  <span>8</span><span>72</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>Font</div>
                <select value={font} onChange={e => setFont(e.target.value)}
                  style={{ width:'100%', padding:'7px 10px', border:'1px solid #e4e4e7', borderRadius:8, fontSize:13, fontFamily:'inherit', outline:'none', background:'#fff', cursor:'pointer' }}>
                  {FONTS.map(f => (
                    <option key={f.label} value={f.value} style={{ fontFamily:f.value }}>{f.label}</option>
                  ))}
                </select>
                {/* Preview */}
                <div style={{ marginTop:8, padding:'8px 10px', background:'#fafafa', borderRadius:8, border:'1px solid #e4e4e7', minHeight:36, display:'flex', alignItems:'center' }}>
                  <span style={{ fontFamily:font, fontSize:Math.min(fontSize, 20), color }}>{color === '#fff' ? '' : 'Preview text'}</span>
                </div>
              </div>
            </>
          )}

          {/* Annotations */}
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>
              Annotations
            </div>
            <div style={{ fontSize:13, color:'#52525b' }}>
              <div>Total: <strong>{Object.values(annots).flat().length}</strong></div>
              <div>This page: <strong style={{ color:'#2563eb' }}>{annots[curPage]?.length || 0}</strong></div>
              <div>History: <strong>{historyRef.current.length}</strong> steps</div>
            </div>
          </div>

          {/* Quick undo/redo buttons */}
          <div style={{ display:'flex', gap:6 }}>
            <button onClick={undo} disabled={!canEdit} style={{ flex:1, padding:'8px', borderRadius:8, border:'1px solid #e4e4e7', background:'#fff', fontSize:12, fontWeight:500, cursor: canEdit ? 'pointer' : 'default', color: canEdit ? '#52525b' : '#d4d4d8', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
              <Ic d={ICONS.undo} size={12} /> Undo
            </button>
            <button onClick={redo} disabled={!canRedo} style={{ flex:1, padding:'8px', borderRadius:8, border:'1px solid #e4e4e7', background:'#fff', fontSize:12, fontWeight:500, cursor: canRedo ? 'pointer' : 'default', color: canRedo ? '#52525b' : '#d4d4d8', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
              <Ic d={ICONS.redo} size={12} /> Redo
            </button>
          </div>

          {/* Clear page */}
          {(annots[curPage]?.length || 0) > 0 && (
            <button onClick={() => { historyRef.current.push(JSON.parse(JSON.stringify(annots))); redoRef.current=[]; setAnnots(a => ({ ...a, [curPage]:[] })); }}
              style={{ padding:'9px', borderRadius:9, border:'1px solid #fecaca', background:'#fff1f2', color:'#b91c1c', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'inherit' }}>
              Clear this page
            </button>
          )}

          {/* Keyboard shortcuts */}
          <div>
            <div style={{ fontSize:10, fontWeight:600, color:'#a1a1aa', textTransform:'uppercase', letterSpacing:'.8px', marginBottom:8 }}>Shortcuts</div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {[['Ctrl+Z','Undo'],['Ctrl+Y','Redo'],['Ctrl+S','Download']].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', fontSize:11.5, color:'#71717a' }}>
                  <kbd style={{ background:'#f4f4f5', border:'1px solid #e4e4e7', borderRadius:4, padding:'1px 5px', fontFamily:'monospace', fontSize:11 }}>{k}</kbd>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden image input */}
      <input id="img-input" type="file" accept="image/*" style={{ display:'none' }} onChange={e => addImage(e.target.files[0])} />

      {/* Sign Modal */}
      {showSign && <SignModal onClose={() => setShowSign(false)} onApply={sig => { applySign(sig); setShowSign(false); }} />}
    </div>
  );
}

const ICONS = {
  undo: 'M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13',
  redo: 'M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13',
};
