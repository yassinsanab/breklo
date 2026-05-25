'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ─── ICONS ────────────────────────────────────────────────── */
const Ic = ({ d, size = 18, sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const ICONS = {
  upload:    'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  text:      ['M4 7V5h16v2','M12 5v14','M9 19h6'],
  highlight: ['M12 20h9','M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z'],
  draw:      ['M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9','M3 21h18'],
  sign:      ['M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L18 5.5','M15 3l4 4','M8 17l2-2 2.5 2.5-2 2L8 17z','M17 8L7 18'],
  cursor:    'M4 4l7 18 3-7 7-3z',
  undo:      'M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13',
  redo:      'M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13',
  zoomIn:    ['M11 19a8 8 0 100-16 8 8 0 000 16z','M21 21l-4.35-4.35','M11 8v6','M8 11h6'],
  zoomOut:   ['M11 19a8 8 0 100-16 8 8 0 000 16z','M21 21l-4.35-4.35','M8 11h6'],
  download:  'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  close:     'M18 6L6 18M6 6l12 12',
  check:     'M20 6L9 17l-5-5',
  page:      ['M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z','M14 3v6h6'],
  eraser:    ['M20 20H7L3 16l9.5-9.5','M13 5l4 4'],
  fill:      ['M3 4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z','M7 9h8','M7 13h10','M7 17h4'],
  comment:   'M21 11.5a8.4 8.4 0 01-3.1 6.6L18 22l-4.1-1.2A9 9 0 1 1 21 11.5z',
  cross:     ['M3 6h18','M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2','M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6'],
  image:     ['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z','M12 13m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  more:      'M12 5v.01M12 12v.01M12 19v.01',
  search:    ['M11 19a8 8 0 100-16 8 8 0 000 16z','M21 21l-4.3-4.3'],
  share:     ['M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8','M16 6l-4-4-4 4','M12 2v13'],
  print:     ['M6 9V2h12v7','M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2','M6 14h12v8H6z'],
  done:      'M20 6L9 17l-5-5',
};

/* ─── TOOL CONFIG ──────────────────────────────────────────── */
const TOOLS = [
  { id: 'select',    label: 'Select',     icon: ICONS.cursor,    group: 'main' },
  { id: 'text',      label: 'Add text',   icon: ICONS.text,      group: 'main' },
  { id: 'draw',      label: 'Draw',       icon: ICONS.draw,      group: 'main' },
  { id: 'highlight', label: 'Highlight',  icon: ICONS.highlight, group: 'main' },
  { id: 'sign',      label: 'Sign',       icon: ICONS.sign,      group: 'main' },
  { id: 'comment',   label: 'Comment',    icon: ICONS.comment,   group: 'main' },
  { id: 'image',     label: 'Add image',  icon: ICONS.image,     group: 'main' },
  { id: 'cross',     label: 'Erase',      icon: ICONS.eraser,    group: 'main' },
];

const COLORS = ['#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#db2777','#0891b2','#0a0a0a'];

/* ─── SIGN MODAL ─────────────────────────────────────────────── */
function SignModal({ onClose, onApply }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [mode, setMode] = useState('draw'); // 'draw' | 'type'
  const [typeText, setTypeText] = useState('');
  const [font, setFont] = useState('cursive');
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
  }, [mode]);

  function getPos(e) {
    const r = canvasRef.current.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }

  function start(e) {
    e.preventDefault();
    setDrawing(true);
    const pos = getPos(e);
    lastPos.current = pos;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function move(e) {
    if (!drawing) return;
    e.preventDefault();
    const pos = getPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function end(e) { e.preventDefault(); setDrawing(false); }

  function clear() {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function apply() {
    if (mode === 'draw') {
      onApply({ type: 'sign', dataUrl: canvasRef.current.toDataURL() });
    } else {
      onApply({ type: 'sign-text', text: typeText, font });
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 18, width: '100%', maxWidth: 520, boxShadow: '0 32px 64px rgba(0,0,0,.2)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ font: '600 18px/1 Inter,sans-serif', color: '#0a0a0a', margin: 0 }}>Create signature</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717a', padding: 4 }}>
            <Ic d={ICONS.close} size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '16px 24px 0' }}>
          {[['draw', 'Draw'], ['type', 'Type']].map(([id, label]) => (
            <button key={id} onClick={() => setMode(id)} style={{
              padding: '8px 18px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              border: '1.5px solid transparent', fontFamily: 'inherit',
              background: mode === id ? '#eff4ff' : 'transparent',
              color: mode === id ? '#1d4ed8' : '#71717a',
              borderColor: mode === id ? '#bfdbfe' : 'transparent',
            }}>{label}</button>
          ))}
        </div>

        {/* Canvas / Type area */}
        <div style={{ padding: '16px 24px' }}>
          {mode === 'draw' ? (
            <div style={{ position: 'relative' }}>
              <canvas
                ref={canvasRef}
                width={472} height={160}
                style={{ width: '100%', height: 160, border: '1.5px dashed #d4d4d8', borderRadius: 12, cursor: 'crosshair', display: 'block', touchAction: 'none' }}
                onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
                onTouchStart={start} onTouchMove={move} onTouchEnd={end}
              />
              <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', fontSize: 12, color: '#a1a1aa', pointerEvents: 'none' }}>
                Draw your signature here
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text" value={typeText} onChange={e => setTypeText(e.target.value)}
                placeholder="Type your signature…"
                style={{ width: '100%', height: 80, padding: '0 16px', border: '1.5px solid #e4e4e7', borderRadius: 12, fontSize: 32, outline: 'none', fontFamily: font, color: '#1d4ed8', textAlign: 'center' }}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                {['cursive', 'Georgia, serif', 'Brush Script MT, cursive', 'Comic Sans MS, cursive'].map(f => (
                  <button key={f} onClick={() => setFont(f)} style={{
                    flex: 1, padding: '8px 4px', borderRadius: 8, border: `1.5px solid ${font === f ? '#2563eb' : '#e4e4e7'}`,
                    background: font === f ? '#eff4ff' : '#fff', cursor: 'pointer', fontFamily: f, fontSize: 14,
                    color: font === f ? '#1d4ed8' : '#71717a',
                  }}>Aa</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={clear} style={{ fontSize: 13, color: '#71717a', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{ padding: '9px 20px', borderRadius: 9, border: '1px solid #e4e4e7', background: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', color: '#3f3f46' }}>Cancel</button>
            <button onClick={apply} style={{ padding: '9px 20px', borderRadius: 9, border: 'none', background: '#2563eb', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Apply signature</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN EDITOR ────────────────────────────────────────────── */
export default function EditPDF() {
  const [file, setFile]           = useState(null);
  const [pdfDoc, setPdfDoc]       = useState(null);
  const [numPages, setNumPages]   = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom]           = useState(1.5);
  const [tool, setTool]           = useState('select');
  const [color, setColor]         = useState('#2563eb');
  const [fontSize, setFontSize]   = useState(16);
  const [annotations, setAnnotations] = useState({}); // { pageNum: [annotation] }
  const [drawing, setDrawing]     = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [showSign, setShowSign]   = useState(false);
  const [textInput, setTextInput] = useState(null);
  const [saving, setSaving]       = useState(false);
  const [dragging, setDrag]       = useState(false);
  const [history, setHistory]     = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const mainCanvasRef  = useRef(null);
  const drawCanvasRef  = useRef(null);
  const thumbCanvases  = useRef({});
  const pdfLibRef      = useRef(null);
  const pdfjsRef       = useRef(null);

  /* ── load file ── */
  async function loadFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f);
    setAnnotations({});
    setHistory([]);
    setRedoStack([]);
    setCurrentPage(1);
    const buf = await f.arrayBuffer();
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const doc = await pdfjsLib.getDocument({ data: buf.slice() }).promise;
    pdfjsRef.current = pdfjsLib;
    pdfLibRef.current = doc;
    setPdfDoc(doc);
    setNumPages(doc.numPages);
  }

  /* ── render page to canvas ── */
  const renderPage = useCallback(async (pageNum, canvas, scale) => {
    if (!pdfLibRef.current || !canvas) return;
    const page = await pdfLibRef.current.getPage(pageNum);
    const vp = page.getViewport({ scale });
    canvas.width = vp.width;
    canvas.height = vp.height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, vp.width, vp.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
  }, []);

  /* ── render main page ── */
  useEffect(() => {
    if (!pdfDoc || !mainCanvasRef.current) return;
    renderPage(currentPage, mainCanvasRef.current, zoom).then(() => {
      redrawAnnotations();
      syncDrawCanvas();
    });
  }, [pdfDoc, currentPage, zoom]);

  /* ── render thumbnails ── */
  useEffect(() => {
    if (!pdfDoc) return;
    for (let i = 1; i <= numPages; i++) {
      const canvas = thumbCanvases.current[i];
      if (canvas) renderPage(i, canvas, 0.15);
    }
  }, [pdfDoc, numPages]);

  /* ── sync draw canvas size ── */
  function syncDrawCanvas() {
    const main = mainCanvasRef.current;
    const draw = drawCanvasRef.current;
    if (!main || !draw) return;
    draw.width = main.width;
    draw.height = main.height;
    draw.style.width = main.style.width || main.width + 'px';
    draw.style.height = main.style.height || main.height + 'px';
  }

  /* ── draw annotations onto main canvas ── */
  function redrawAnnotations() {
    const main = mainCanvasRef.current;
    if (!main) return;
    const ctx = main.getContext('2d');
    const pageAnns = annotations[currentPage] || [];
    pageAnns.forEach(ann => drawAnnotation(ctx, ann));
  }

  function drawAnnotation(ctx, ann) {
    if (ann.type === 'path') {
      ctx.beginPath();
      ctx.strokeStyle = ann.color;
      ctx.lineWidth = ann.lineWidth || 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (ann.points.length > 0) {
        ctx.moveTo(ann.points[0].x, ann.points[0].y);
        ann.points.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    } else if (ann.type === 'text') {
      ctx.font = `${ann.fontSize || 16}px Inter, sans-serif`;
      ctx.fillStyle = ann.color;
      ctx.fillText(ann.text, ann.x, ann.y);
    } else if (ann.type === 'highlight') {
      ctx.fillStyle = ann.color + '55';
      ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
    } else if (ann.type === 'sign') {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, ann.x, ann.y, ann.w, ann.h);
      img.src = ann.dataUrl;
    } else if (ann.type === 'sign-text') {
      ctx.font = `32px ${ann.font}`;
      ctx.fillStyle = '#1d4ed8';
      ctx.fillText(ann.text, ann.x, ann.y);
    }
  }

  /* ── push annotation ── */
  function pushAnnotation(ann) {
    setHistory(h => [...h, JSON.parse(JSON.stringify(annotations))]);
    setRedoStack([]);
    setAnnotations(prev => {
      const page = prev[currentPage] || [];
      return { ...prev, [currentPage]: [...page, ann] };
    });
  }

  /* ── undo / redo ── */
  function undo() {
    if (history.length === 0) return;
    setRedoStack(r => [JSON.parse(JSON.stringify(annotations)), ...r]);
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setAnnotations(prev);
  }

  function redo() {
    if (redoStack.length === 0) return;
    setHistory(h => [...h, JSON.parse(JSON.stringify(annotations))]);
    const next = redoStack[0];
    setRedoStack(r => r.slice(1));
    setAnnotations(next);
  }

  useEffect(() => { redrawAnnotations(); }, [annotations, currentPage]);

  /* ── canvas interaction ── */
  function getCanvasPos(e) {
    const canvas = drawCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const t = e.touches ? e.touches[0] : e;
    return {
      x: (t.clientX - rect.left) * scaleX,
      y: (t.clientY - rect.top) * scaleY,
    };
  }

  function handleCanvasDown(e) {
    const pos = getCanvasPos(e);

    if (tool === 'draw') {
      setDrawing(true);
      setCurrentPath([pos]);
    } else if (tool === 'text') {
      setTextInput({ x: pos.x, y: pos.y + 20, screenX: e.clientX, screenY: e.clientY });
    } else if (tool === 'sign') {
      setShowSign(true);
      window._pendingSignPos = pos;
    } else if (tool === 'highlight') {
      setDrawing(true);
      setCurrentPath([pos]);
    }
  }

  function handleCanvasMove(e) {
    if (!drawing) return;
    const pos = getCanvasPos(e);
    const draw = drawCanvasRef.current;
    const ctx = draw.getContext('2d');

    if (tool === 'draw') {
      setCurrentPath(p => [...p, pos]);
      ctx.clearRect(0, 0, draw.width, draw.height);
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      const pts = [...currentPath, pos];
      if (pts.length > 0) {
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
      }
    } else if (tool === 'highlight') {
      const start = currentPath[0];
      ctx.clearRect(0, 0, draw.width, draw.height);
      ctx.fillStyle = color + '44';
      ctx.fillRect(start.x, start.y, pos.x - start.x, pos.y - start.y);
    }
  }

  function handleCanvasUp(e) {
    if (!drawing) return;
    const pos = getCanvasPos(e);
    const draw = drawCanvasRef.current;
    const ctx = draw.getContext('2d');
    ctx.clearRect(0, 0, draw.width, draw.height);

    if (tool === 'draw') {
      pushAnnotation({ type: 'path', points: [...currentPath, pos], color, lineWidth: 2.5 });
    } else if (tool === 'highlight') {
      const start = currentPath[0];
      pushAnnotation({ type: 'highlight', x: start.x, y: start.y, w: pos.x - start.x, h: pos.y - start.y, color });
    }
    setDrawing(false);
    setCurrentPath([]);
  }

  /* ── text commit ── */
  function commitText(text) {
    if (text.trim() && textInput) {
      pushAnnotation({ type: 'text', x: textInput.x, y: textInput.y, text, color, fontSize });
    }
    setTextInput(null);
  }

  /* ── sign apply ── */
  function applySign(sig) {
    const pos = window._pendingSignPos || { x: 100, y: 200 };
    if (sig.type === 'sign') {
      pushAnnotation({ type: 'sign', x: pos.x, y: pos.y, w: 200, h: 80, dataUrl: sig.dataUrl });
    } else {
      pushAnnotation({ type: 'sign-text', x: pos.x, y: pos.y, text: sig.text, font: sig.font });
    }
    setShowSign(false);
  }

  /* ── save/download ── */
  async function saveAndDownload() {
    if (!file) return;
    setSaving(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const buf = await file.arrayBuffer();
      const pdfLibDoc = await PDFDocument.load(buf);
      const helvetica = await pdfLibDoc.embedFont(StandardFonts.Helvetica);

      for (const [pageNumStr, anns] of Object.entries(annotations)) {
        const pageNum = parseInt(pageNumStr);
        const page = pdfLibDoc.getPage(pageNum - 1);
        const { height: pageH } = page.getSize();
        const mainCanvas = mainCanvasRef.current;
        const scaleX = page.getWidth() / (mainCanvas?.width || 800);
        const scaleY = pageH / (mainCanvas?.height || 1000);

        for (const ann of anns) {
          if (ann.type === 'text') {
            const hexToRgb = h => {
              const r = parseInt(h.slice(1,3),16)/255, g = parseInt(h.slice(3,5),16)/255, b = parseInt(h.slice(5,7),16)/255;
              return rgb(r,g,b);
            };
            page.drawText(ann.text, {
              x: ann.x * scaleX,
              y: pageH - ann.y * scaleY,
              size: (ann.fontSize || 16) * Math.min(scaleX, scaleY),
              font: helvetica,
              color: hexToRgb(ann.color || '#000000'),
            });
          } else if (ann.type === 'path' && ann.points.length > 1) {
            // draw strokes using lines
            for (let i = 0; i < ann.points.length - 1; i++) {
              const p1 = ann.points[i];
              const p2 = ann.points[i+1];
              const hexToRgb = h => {
                const r = parseInt(h.slice(1,3),16)/255, g = parseInt(h.slice(3,5),16)/255, b = parseInt(h.slice(5,7),16)/255;
                return rgb(r,g,b);
              };
              page.drawLine({
                start: { x: p1.x * scaleX, y: pageH - p1.y * scaleY },
                end:   { x: p2.x * scaleX, y: pageH - p2.y * scaleY },
                thickness: (ann.lineWidth || 2.5) * Math.min(scaleX, scaleY),
                color: hexToRgb(ann.color || '#000000'),
              });
            }
          } else if (ann.type === 'sign') {
            const imgBytes = await fetch(ann.dataUrl).then(r => r.arrayBuffer());
            const img = await pdfLibDoc.embedPng(imgBytes);
            page.drawImage(img, { x: ann.x * scaleX, y: pageH - (ann.y + ann.h) * scaleY, width: ann.w * scaleX, height: ann.h * scaleY });
          }
        }
      }

      const bytes = await pdfLibDoc.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '-edited.pdf');
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Error saving PDF. Please try again.');
    }
    setSaving(false);
  }

  /* ── cursor by tool ── */
  const cursors = { select: 'default', text: 'text', draw: 'crosshair', highlight: 'crosshair', sign: 'crosshair', comment: 'crosshair', image: 'crosshair', cross: 'not-allowed' };

  /* ─── UPLOAD SCREEN ─────────────────────────────────────── */
  if (!file) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", background: '#fff' }}>
        {/* Mini nav */}
        <nav style={{ height: 58, borderBottom: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontWeight: 700, fontSize: 20, letterSpacing: '-.4px', color: '#0a0a0a', textDecoration: 'none' }}>
            breklo<span style={{ color: '#2563eb' }}>.</span>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: '#71717a', textDecoration: 'none' }}>← Back to tools</Link>
        </nav>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 560, width: '100%' }}>
            <div style={{ width: 64, height: 64, background: '#2563eb', borderRadius: 18, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 24px rgba(37,99,235,.25)' }}>
              <Ic d={ICONS.page} size={28} sw={1.6} />
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-.03em', color: '#0a0a0a', marginBottom: 12 }}>Edit PDF</h1>
            <p style={{ fontSize: 17, color: '#71717a', marginBottom: 40, lineHeight: 1.6 }}>
              Add text, draw, highlight, sign and annotate your PDF — all in your browser, for free.
            </p>

            <div
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={e => { e.preventDefault(); setDrag(false); loadFile(e.dataTransfer.files[0]); }}
              onClick={() => document.getElementById('file-input').click()}
              style={{
                border: `2px dashed ${dragging ? '#2563eb' : '#d4d4d8'}`,
                borderRadius: 20, padding: '52px 32px', textAlign: 'center',
                background: dragging ? '#eff4ff' : '#fafafa', cursor: 'pointer',
                transition: 'all .15s', marginBottom: 24,
              }}
            >
              <div style={{ width: 52, height: 52, background: dragging ? '#2563eb' : '#e4e4e7', borderRadius: 14, margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: dragging ? '#fff' : '#71717a', transition: 'all .15s' }}>
                <Ic d={ICONS.upload} size={22} sw={2} />
              </div>
              <p style={{ fontWeight: 600, fontSize: 17, color: '#0a0a0a', marginBottom: 6 }}>Drop your PDF here</p>
              <p style={{ fontSize: 14, color: '#a1a1aa', marginBottom: 24 }}>or click to browse — up to 100 MB</p>
              <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 11, padding: '13px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 18px rgba(37,99,235,.25)' }}>
                Select PDF file
              </button>
              <p style={{ fontSize: 12, color: '#d4d4d8', marginTop: 14 }}>100% free · No signup · Files never leave your device</p>
              <input id="file-input" type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => loadFile(e.target.files[0])} />
            </div>

            {/* Feature pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Add text', 'Draw & annotate', 'Highlight', 'Sign PDF', 'Free forever'].map(f => (
                <span key={f} style={{ padding: '6px 14px', background: '#f4f4f5', borderRadius: 20, fontSize: 13, color: '#52525b', fontWeight: 500 }}>{f}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── EDITOR ─────────────────────────────────────────────── */
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif", background: '#fff', overflow: 'hidden' }}>

      {/* ── TOP BAR ── */}
      <header style={{ height: 56, borderBottom: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0, background: '#fff', zIndex: 10 }}>
        {/* Logo */}
        <Link href="/" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.4px', color: '#0a0a0a', textDecoration: 'none', flexShrink: 0 }}>
          breklo<span style={{ color: '#2563eb' }}>.</span>
        </Link>

        {/* Filename */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <div style={{ width: 28, height: 28, background: '#fee2e2', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: '#b91c1c' }}>PDF</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#18181b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {/* Undo/Redo */}
          <button onClick={undo} disabled={history.length === 0} title="Undo" style={{ background: 'none', border: '1px solid #e4e4e7', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: history.length === 0 ? 'default' : 'pointer', color: history.length === 0 ? '#d4d4d8' : '#52525b' }}>
            <Ic d={ICONS.undo} size={15} />
          </button>
          <button onClick={redo} disabled={redoStack.length === 0} title="Redo" style={{ background: 'none', border: '1px solid #e4e4e7', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: redoStack.length === 0 ? 'default' : 'pointer', color: redoStack.length === 0 ? '#d4d4d8' : '#52525b' }}>
            <Ic d={ICONS.redo} size={15} />
          </button>

          <div style={{ width: 1, height: 24, background: '#e4e4e7' }} />

          {/* Zoom */}
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} style={{ background: 'none', border: '1px solid #e4e4e7', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#52525b' }}>
            <Ic d={ICONS.zoomOut} size={15} />
          </button>
          <span style={{ fontSize: 13, color: '#52525b', minWidth: 40, textAlign: 'center', fontWeight: 500 }}>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(3, z + 0.25))} style={{ background: 'none', border: '1px solid #e4e4e7', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#52525b' }}>
            <Ic d={ICONS.zoomIn} size={15} />
          </button>

          <div style={{ width: 1, height: 24, background: '#e4e4e7' }} />

          <button onClick={() => { setFile(null); setPdfDoc(null); }} style={{ background: 'none', border: '1px solid #e4e4e7', borderRadius: 8, padding: '0 12px', height: 34, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#52525b', fontFamily: 'inherit' }}>
            <Ic d={ICONS.close} size={13} /> New file
          </button>

          <button onClick={saveAndDownload} disabled={saving} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 9, padding: '0 18px', height: 36, display: 'flex', alignItems: 'center', gap: 7, cursor: saving ? 'wait' : 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(37,99,235,.3)' }}>
            <Ic d={ICONS.download} size={14} sw={2.2} /> {saving ? 'Saving…' : 'Download'}
          </button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── LEFT SIDEBAR: TOOLS ── */}
        <div style={{ width: 64, borderRight: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0', gap: 4, flexShrink: 0, overflowY: 'auto', background: '#fff' }}>
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} title={t.label} style={{
              width: 44, height: 44, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer', border: 'none',
              background: tool === t.id ? '#eff4ff' : 'transparent',
              color: tool === t.id ? '#2563eb' : '#71717a',
              transition: 'all .12s',
            }}>
              <Ic d={t.icon} size={18} />
            </button>
          ))}

          <div style={{ width: 36, height: 1, background: '#e4e4e7', margin: '8px 0' }} />

          {/* Color swatches */}
          {COLORS.slice(0, 5).map(c => (
            <button key={c} onClick={() => setColor(c)} title={c} style={{
              width: 22, height: 22, borderRadius: '50%', background: c, border: `2.5px solid ${color === c ? '#2563eb' : 'transparent'}`, cursor: 'pointer', outline: color === c ? '2px solid #bfdbfe' : 'none', outlineOffset: 1, transition: 'all .12s',
            }} />
          ))}
        </div>

        {/* ── PAGE THUMBNAILS ── */}
        <div style={{ width: 96, borderRight: '1px solid #e4e4e7', overflowY: 'auto', padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, background: '#fafafa' }}>
          {Array.from({ length: numPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setCurrentPage(n)} style={{
              background: 'none', border: `2px solid ${currentPage === n ? '#2563eb' : '#e4e4e7'}`, borderRadius: 8, padding: 4, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'border-color .12s',
            }}>
              <canvas ref={el => { thumbCanvases.current[n] = el; if (el && pdfDoc) renderPage(n, el, 0.15); }} style={{ borderRadius: 4, display: 'block', maxWidth: '100%' }} />
              <span style={{ fontSize: 10, color: currentPage === n ? '#2563eb' : '#a1a1aa', fontWeight: currentPage === n ? 600 : 400 }}>{n}</span>
            </button>
          ))}
        </div>

        {/* ── MAIN CANVAS AREA ── */}
        <div style={{ flex: 1, overflow: 'auto', background: '#71717a', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, position: 'relative' }}>
          <div style={{ position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,.4)', borderRadius: 2 }}>
            {/* PDF render canvas */}
            <canvas ref={mainCanvasRef} style={{ display: 'block' }} />
            {/* Draw overlay canvas */}
            <canvas
              ref={drawCanvasRef}
              style={{ position: 'absolute', inset: 0, cursor: cursors[tool] || 'default' }}
              onMouseDown={handleCanvasDown}
              onMouseMove={handleCanvasMove}
              onMouseUp={handleCanvasUp}
              onMouseLeave={handleCanvasUp}
            />
            {/* Text input overlay */}
            {textInput && (
              <div style={{ position: 'absolute', left: textInput.x, top: textInput.y - 28, zIndex: 20 }}>
                <input
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') commitText(e.target.value); if (e.key === 'Escape') setTextInput(null); }}
                  onBlur={e => commitText(e.target.value)}
                  style={{ border: `1.5px solid ${color}`, borderRadius: 6, outline: 'none', padding: '4px 8px', fontSize, color, fontFamily: 'Inter,sans-serif', background: 'rgba(255,255,255,.95)', minWidth: 120, boxShadow: '0 2px 12px rgba(0,0,0,.15)' }}
                  placeholder="Type here…"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: PROPERTIES ── */}
        <div style={{ width: 220, borderLeft: '1px solid #e4e4e7', background: '#fff', padding: 16, flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Current tool info */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Tool</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#eff4ff', borderRadius: 9, border: '1px solid #bfdbfe' }}>
              <span style={{ color: '#2563eb' }}><Ic d={TOOLS.find(t2 => t2.id === tool)?.icon || ICONS.cursor} size={16} /></span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1d4ed8' }}>{TOOLS.find(t2 => t2.id === tool)?.label}</span>
            </div>
          </div>

          {/* Color */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Color</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)} style={{
                  width: 26, height: 26, borderRadius: '50%', background: c, border: 'none', cursor: 'pointer',
                  outline: color === c ? `3px solid ${c}` : 'none', outlineOffset: 2,
                  boxShadow: color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none',
                  transform: color === c ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all .12s',
                }} />
              ))}
            </div>
          </div>

          {/* Font size (for text tool) */}
          {tool === 'text' && (
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Font size</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[12, 14, 16, 20, 24, 32].map(s => (
                  <button key={s} onClick={() => setFontSize(s)} style={{
                    flex: 1, padding: '6px 0', borderRadius: 7, border: `1.5px solid ${fontSize === s ? '#2563eb' : '#e4e4e7'}`,
                    background: fontSize === s ? '#eff4ff' : '#fff', color: fontSize === s ? '#2563eb' : '#71717a',
                    fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  }}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {/* Page info */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Page</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #e4e4e7', background: '#fff', cursor: currentPage === 1 ? 'default' : 'pointer', color: currentPage === 1 ? '#d4d4d8' : '#52525b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ‹
              </button>
              <span style={{ flex: 1, textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#18181b' }}>{currentPage} / {numPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage === numPages}
                style={{ width: 30, height: 30, borderRadius: 7, border: '1px solid #e4e4e7', background: '#fff', cursor: currentPage === numPages ? 'default' : 'pointer', color: currentPage === numPages ? '#d4d4d8' : '#52525b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ›
              </button>
            </div>
          </div>

          {/* Annotations count */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 10 }}>Annotations</div>
            <div style={{ fontSize: 13, color: '#52525b' }}>
              {Object.values(annotations).flat().length} total
              {annotations[currentPage]?.length > 0 && <span style={{ color: '#2563eb', fontWeight: 600 }}> · {annotations[currentPage].length} on this page</span>}
            </div>
          </div>

          {/* Clear page */}
          {annotations[currentPage]?.length > 0 && (
            <button onClick={() => { setHistory(h => [...h, JSON.parse(JSON.stringify(annotations))]); setAnnotations(a => ({ ...a, [currentPage]: [] })); }}
              style={{ padding: '9px', borderRadius: 9, border: '1px solid #fecaca', background: '#fff1f2', color: '#b91c1c', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
              Clear this page
            </button>
          )}
        </div>
      </div>

      {/* ── BOTTOM PAGE NAV ── */}
      <div style={{ height: 44, borderTop: '1px solid #e4e4e7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexShrink: 0, background: '#fafafa' }}>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
          style={{ fontSize: 13, color: currentPage === 1 ? '#d4d4d8' : '#52525b', background: 'none', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
          ← Prev
        </button>
        <span style={{ fontSize: 13, color: '#3f3f46', fontWeight: 500 }}>Page {currentPage} of {numPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))} disabled={currentPage === numPages}
          style={{ fontSize: 13, color: currentPage === numPages ? '#d4d4d8' : '#52525b', background: 'none', border: 'none', cursor: currentPage === numPages ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
          Next →
        </button>
      </div>

      {/* ── SIGN MODAL ── */}
      {showSign && <SignModal onClose={() => setShowSign(false)} onApply={applySign} />}
    </div>
  );
}
