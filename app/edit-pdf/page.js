'use client';
import { useState, useRef, useEffect, useCallback, useId } from 'react';
import Link from 'next/link';

/* ─── GOOGLE FONTS ──────────────────────────────────────────── */
const GF = 'https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Lobster&family=Sacramento&family=Great+Vibes&family=Montserrat:wght@400;600&family=Oswald&family=Raleway&family=Playfair+Display&family=Roboto+Slab&display=swap';

const FONTS = [
  { l:'Inter',          v:'Inter, sans-serif' },
  { l:'Georgia',        v:'Georgia, serif' },
  { l:'Times New Roman',v:'"Times New Roman", serif' },
  { l:'Courier New',    v:'"Courier New", monospace' },
  { l:'Verdana',        v:'Verdana, sans-serif' },
  { l:'Impact',         v:'Impact, sans-serif' },
  { l:'Trebuchet MS',   v:'"Trebuchet MS", sans-serif' },
  { l:'Palatino',       v:'"Palatino Linotype", serif' },
  { l:'Garamond',       v:'Garamond, serif' },
  { l:'Comic Sans',     v:'"Comic Sans MS", cursive' },
  { l:'Montserrat',     v:'Montserrat, sans-serif' },
  { l:'Oswald',         v:'Oswald, sans-serif' },
  { l:'Raleway',        v:'Raleway, sans-serif' },
  { l:'Playfair',       v:'"Playfair Display", serif' },
  { l:'Roboto Slab',    v:'"Roboto Slab", serif' },
  { l:'Dancing Script', v:'"Dancing Script", cursive' },
  { l:'Pacifico',       v:'Pacifico, cursive' },
  { l:'Lobster',        v:'Lobster, cursive' },
  { l:'Sacramento',     v:'Sacramento, cursive' },
  { l:'Great Vibes',    v:'"Great Vibes", cursive' },
];

const COLORS = ['#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#db2777','#0891b2','#0a0a0a','#64748b','#f59e0b','#ea580c','#f43f5e'];

/* ─── SMALL ICON ────────────────────────────────────────────── */
const Ic = ({ d, size = 17, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);

const I = {
  select:    'M4 4l7 18 3-7 7-3z',
  text:      ['M4 7V5h16v2','M12 5v14','M9 19h6'],
  draw:      ['M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9'],
  highlight: ['M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2','M9 3a2 2 0 012-2h2a2 2 0 012 2'],
  sign:      ['M20 19.5v.5a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8.5L18 5.5','M15 3l4 4','M8 17l2-2 2.5 2.5-2 2'],
  rect:      ['M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'],
  image:     ['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z','M12 13m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  eraser:    ['M20 20H7L3 16l9.5-9.5','M13 5l4 4'],
  undo:      'M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13',
  redo:      'M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13',
  dl:        'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  close:     'M18 6L6 18M6 6l12 12',
  trash:     ['M3 6h18','M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2','M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6'],
  up:        'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  zoom_in:   ['M11 19a8 8 0 100-16 8 8 0 000 16z','M21 21l-4.3-4.3','M11 8v6','M8 11h6'],
  zoom_out:  ['M11 19a8 8 0 100-16 8 8 0 000 16z','M21 21l-4.3-4.3','M8 11h6'],
  copy:      ['M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2','M8 4a2 2 0 012-2h4a2 2 0 012 2v2H8V4z'],
  check:     'M20 6L9 17l-5-5',
};

const TOOLS = [
  { id:'select',    label:'Select',    icon:I.select,    cursor:'default' },
  { id:'text',      label:'Text',      icon:I.text,      cursor:'text' },
  { id:'draw',      label:'Draw',      icon:I.draw,      cursor:'crosshair' },
  { id:'highlight', label:'Highlight', icon:I.highlight, cursor:'crosshair' },
  { id:'sign',      label:'Sign',      icon:I.sign,      cursor:'crosshair' },
  { id:'rect',      label:'Rectangle', icon:I.rect,      cursor:'crosshair' },
  { id:'image',     label:'Image',     icon:I.image,     cursor:'pointer' },
  { id:'eraser',    label:'Eraser',    cursor:'cell',    icon:I.eraser },
];

/* ─── ID GEN ────────────────────────────────────────────────── */
let _id = 0;
const uid = () => `ann_${++_id}_${Date.now()}`;

/* ─── SIGN MODAL ────────────────────────────────────────────── */
function SignModal({ onClose, onApply }) {
  const cvRef   = useRef(null);
  const drawing = useRef(false);
  const [mode, setMode]   = useState('draw');
  const [text, setText]   = useState('');
  const [font, setFont]   = useState(FONTS[16].v);

  function initCanvas() {
    const c = cvRef.current; if (!c) return;
    c.width = 480; c.height = 160;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 480, 160); // transparent — NO fillRect!
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth   = 3;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }
  useEffect(initCanvas, []);

  function pos(e) {
    const r = cvRef.current.getBoundingClientRect();
    const sx = cvRef.current.width / r.width;
    const sy = cvRef.current.height / r.height;
    const t  = e.touches ? e.touches[0] : e;
    return { x: (t.clientX - r.left)*sx, y: (t.clientY - r.top)*sy };
  }
  function down(e) { e.preventDefault(); drawing.current = true; const p = pos(e); const ctx = cvRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function move(e) { if (!drawing.current) return; e.preventDefault(); const p = pos(e); const ctx = cvRef.current.getContext('2d'); ctx.lineTo(p.x, p.y); ctx.stroke(); }
  function up(e)   { e.preventDefault(); drawing.current = false; }
  function clear() { initCanvas(); }

  function apply() {
    if (mode === 'draw') {
      // export as PNG (with alpha, no white bg)
      onApply({ type:'sign-img', dataUrl: cvRef.current.toDataURL('image/png'), w:240, h:80 });
    } else if (text.trim()) {
      onApply({ type:'sign-text', text:text.trim(), font });
    }
    onClose();
  }

  const signFonts = [FONTS[16],FONTS[17],FONTS[18],FONTS[19],FONTS[15],FONTS[13]];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:400,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:540,boxShadow:'0 32px 80px rgba(0,0,0,.3)',overflow:'hidden'}}>
        <div style={{padding:'22px 24px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{font:'700 18px/1 Inter,sans-serif',color:'#0a0a0a',margin:0}}>Create signature</h3>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#71717a',display:'flex'}}><Ic d={I.close} size={20}/></button>
        </div>
        <div style={{display:'flex',gap:4,padding:'14px 24px 0'}}>
          {[['draw','✍ Draw'],['type','T Type']].map(([id,lbl])=>(
            <button key={id} onClick={()=>setMode(id)} style={{padding:'8px 18px',borderRadius:8,fontSize:14,fontWeight:500,cursor:'pointer',border:`1.5px solid ${mode===id?'#bfdbfe':'transparent'}`,background:mode===id?'#eff4ff':'transparent',color:mode===id?'#1d4ed8':'#71717a',fontFamily:'inherit'}}>{lbl}</button>
          ))}
        </div>
        <div style={{padding:'14px 24px'}}>
          {mode==='draw' ? (
            <div style={{position:'relative'}}>
              {/* Checkered bg to show transparency */}
              <div style={{position:'absolute',inset:0,borderRadius:12,backgroundImage:'linear-gradient(45deg,#f0f0f0 25%,transparent 25%),linear-gradient(-45deg,#f0f0f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f0f0f0 75%),linear-gradient(-45deg,transparent 75%,#f0f0f0 75%)',backgroundSize:'16px 16px',backgroundPosition:'0 0,0 8px,8px -8px,-8px 0',opacity:.5}}/>
              <canvas ref={cvRef}
                style={{width:'100%',height:160,border:'1.5px dashed #d4d4d8',borderRadius:12,cursor:'crosshair',display:'block',touchAction:'none',position:'relative',background:'transparent'}}
                onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
                onTouchStart={down} onTouchMove={move} onTouchEnd={up}
              />
              <p style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',fontSize:11,color:'#a1a1aa',pointerEvents:'none',whiteSpace:'nowrap'}}>Draw here — background is transparent</p>
            </div>
          ) : (
            <div>
              <div style={{border:'1.5px solid #e4e4e7',borderRadius:12,padding:'12px 16px',marginBottom:12,minHeight:64,display:'flex',alignItems:'center',justifyContent:'center',backgroundImage:'linear-gradient(45deg,#f8f8f8 25%,transparent 25%),linear-gradient(-45deg,#f8f8f8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f8f8f8 75%),linear-gradient(-45deg,transparent 75%,#f8f8f8 75%)',backgroundSize:'12px 12px',backgroundPosition:'0 0,0 6px,6px -6px,-6px 0'}}>
                <span style={{fontFamily:font,fontSize:34,color:'#1d4ed8'}}>{text||'Your Signature'}</span>
              </div>
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your name…"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e4e4e7',borderRadius:9,fontSize:15,fontFamily:'inherit',outline:'none',marginBottom:12}}/>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {signFonts.map(f=>(
                  <button key={f.l} onClick={()=>setFont(f.v)} style={{padding:'6px 14px',borderRadius:8,border:`1.5px solid ${font===f.v?'#2563eb':'#e4e4e7'}`,background:font===f.v?'#eff4ff':'#fff',fontFamily:f.v,fontSize:15,cursor:'pointer',color:font===f.v?'#1d4ed8':'#52525b'}}>{f.l}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{padding:'0 24px 22px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          {mode==='draw'?<button onClick={clear} style={{fontSize:13,color:'#71717a',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit'}}>Clear</button>:<div/>}
          <div style={{display:'flex',gap:8}}>
            <button onClick={onClose} style={{padding:'9px 20px',borderRadius:9,border:'1px solid #e4e4e7',background:'#fff',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit',color:'#3f3f46'}}>Cancel</button>
            <button onClick={apply} style={{padding:'9px 22px',borderRadius:9,border:'none',background:'#2563eb',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 12px rgba(37,99,235,.3)'}}>Apply →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ANNOTATION OVERLAY OBJECT ─────────────────────────────── */
function AnnObject({ ann, selected, onSelect, onUpdate, onDelete, scale }) {
  const dragRef    = useRef(null);
  const resizeRef  = useRef(null);
  const editRef    = useRef(null);
  const [editing, setEditing]    = useState(false);
  const [editVal,  setEditVal]   = useState(ann.text || '');

  /* drag */
  function startDrag(e) {
    if (e.target.dataset.resize) return;
    e.stopPropagation();
    onSelect(ann.id);
    const startX = e.clientX - ann.x * scale;
    const startY = e.clientY - ann.y * scale;
    function onMove(ev) {
      onUpdate(ann.id, { x: (ev.clientX - startX)/scale, y: (ev.clientY - startY)/scale });
    }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  /* resize (bottom-right handle) */
  function startResize(e) {
    e.stopPropagation(); e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const origW  = ann.w || 200;
    const origH  = ann.h || 80;
    function onMove(ev) {
      const dw = (ev.clientX - startX)/scale;
      const dh = (ev.clientY - startY)/scale;
      onUpdate(ann.id, { w: Math.max(40, origW + dw), h: Math.max(20, origH + dh) });
    }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  /* font-size resize for text */
  function startFontResize(e) {
    e.stopPropagation(); e.preventDefault();
    const startY = e.clientY;
    const orig   = ann.fontSize || 18;
    function onMove(ev) { onUpdate(ann.id, { fontSize: Math.max(8, orig + (ev.clientY - startY)/3) }); }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function commitEdit() {
    setEditing(false);
    if (editVal.trim()) onUpdate(ann.id, { text: editVal });
    else onDelete(ann.id);
  }

  const W = (ann.w || 200) * scale;
  const H = (ann.h || 60) * scale;

  const handleStyle = {
    position:'absolute', width:10, height:10, borderRadius:2,
    background:'#2563eb', border:'2px solid #fff',
    boxShadow:'0 1px 4px rgba(0,0,0,.3)',
    cursor:'nwse-resize', zIndex:10,
  };

  /* ── TEXT ── */
  if (ann.type === 'text') {
    return (
      <div
        onMouseDown={startDrag}
        onDoubleClick={e => { e.stopPropagation(); setEditing(true); setTimeout(() => editRef.current?.select(), 50); }}
        style={{
          position:'absolute', left:ann.x*scale, top:ann.y*scale,
          cursor: editing ? 'text' : 'move',
          outline: selected ? '2px solid #2563eb' : editing ? '1.5px dashed #2563eb' : '1.5px dashed transparent',
          outlineOffset:3, borderRadius:4, padding:'2px 4px',
          minWidth:40, minHeight:20, userSelect: editing ? 'text' : 'none',
          zIndex: selected ? 30 : 20,
        }}
      >
        {editing ? (
          <textarea ref={editRef} value={editVal} onChange={e=>setEditVal(e.target.value)}
            onKeyDown={e => { if (e.key==='Escape') commitEdit(); if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); commitEdit(); }}}
            onBlur={commitEdit}
            style={{ background:'rgba(255,255,255,.95)', border:'1.5px solid #2563eb', borderRadius:5, padding:'3px 6px', fontSize:(ann.fontSize||18)*scale, fontFamily:ann.font, color:ann.color, outline:'none', resize:'none', minWidth:120, lineHeight:1.4, fontWeight:ann.bold?700:400, fontStyle:ann.italic?'italic':'normal' }}
            rows={2}
          />
        ) : (
          <span style={{ fontSize:(ann.fontSize||18)*scale, fontFamily:ann.font, color:ann.color, whiteSpace:'pre-wrap', lineHeight:1.4, fontWeight:ann.bold?700:400, fontStyle:ann.italic?'italic':'normal', pointerEvents:'none' }}>
            {ann.text}
          </span>
        )}
        {selected && !editing && (
          <>
            <div data-resize="br" onMouseDown={startFontResize} style={{...handleStyle, right:-5, bottom:-5, cursor:'se-resize'}} />
            <button onMouseDown={e=>{e.stopPropagation();onDelete(ann.id);}} style={{position:'absolute',top:-18,right:-4,background:'#ef4444',border:'none',borderRadius:4,width:16,height:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Ic d={I.close} size={9} sw={2.5}/></button>
          </>
        )}
      </div>
    );
  }

  /* ── SIGN-IMG or SIGN-TEXT ── */
  if (ann.type === 'sign-img' || ann.type === 'sign-text') {
    return (
      <div onMouseDown={startDrag}
        style={{ position:'absolute', left:ann.x*scale, top:ann.y*scale, width:W, height:H, cursor:'move',
          outline: selected ? '2px solid #2563eb' : '1.5px dashed transparent',
          outlineOffset:2, borderRadius:4, userSelect:'none', zIndex: selected?30:20 }}>
        {ann.type === 'sign-img' ? (
          <img src={ann.dataUrl} style={{width:'100%',height:'100%',objectFit:'contain',pointerEvents:'none',display:'block'}} alt="signature" />
        ) : (
          <span style={{fontFamily:ann.font,fontSize:Math.min(W/4,H*0.7),color:'#1d4ed8',whiteSpace:'nowrap',pointerEvents:'none',display:'flex',alignItems:'center',height:'100%'}}>{ann.text}</span>
        )}
        {selected && (
          <>
            <div data-resize="br" onMouseDown={startResize} style={{...handleStyle,right:-5,bottom:-5}} />
            <div data-resize="tr" onMouseDown={e=>{e.stopPropagation();e.preventDefault();const sY=e.clientY,oH=ann.h||80,oY=ann.y;function m(ev){const dh=(sY-ev.clientY)/scale;onUpdate(ann.id,{y:oY-dh,h:Math.max(20,oH+dh)});}function u(){window.removeEventListener('mousemove',m);window.removeEventListener('mouseup',u);}window.addEventListener('mousemove',m);window.addEventListener('mouseup',u);}} style={{...handleStyle,right:-5,top:-5,cursor:'ne-resize'}} />
            <button onMouseDown={e=>{e.stopPropagation();onDelete(ann.id);}} style={{position:'absolute',top:-18,right:-4,background:'#ef4444',border:'none',borderRadius:4,width:16,height:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Ic d={I.close} size={9} sw={2.5}/></button>
          </>
        )}
      </div>
    );
  }

  /* ── HIGHLIGHT / RECT ── */
  if (ann.type === 'highlight' || ann.type === 'rect') {
    const bW = (ann.w||100)*scale;
    const bH = (ann.h||40)*scale;
    return (
      <div onMouseDown={startDrag}
        style={{ position:'absolute', left:ann.x*scale, top:ann.y*scale, width:bW, height:bH, cursor:'move',
          background: ann.type==='highlight' ? ann.color+'44' : 'transparent',
          border: ann.type==='rect' ? `${(ann.lineWidth||2)*scale}px solid ${ann.color}` : (selected?`2px solid ${ann.color}`:'2px solid transparent'),
          borderRadius: ann.type==='highlight' ? 2 : 0,
          outline: selected ? '2px solid #2563eb' : 'none', outlineOffset:2,
          userSelect:'none', zIndex: selected?30:20 }}>
        {selected && (
          <>
            <div data-resize="br" onMouseDown={startResize} style={{...handleStyle,right:-5,bottom:-5}} />
            <button onMouseDown={e=>{e.stopPropagation();onDelete(ann.id);}} style={{position:'absolute',top:-18,right:-4,background:'#ef4444',border:'none',borderRadius:4,width:16,height:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Ic d={I.close} size={9} sw={2.5}/></button>
          </>
        )}
      </div>
    );
  }

  /* ── IMAGE ── */
  if (ann.type === 'image') {
    return (
      <div onMouseDown={startDrag}
        style={{ position:'absolute', left:ann.x*scale, top:ann.y*scale, width:W, height:H, cursor:'move',
          outline: selected ? '2px solid #2563eb' : '1.5px dashed transparent', outlineOffset:2, borderRadius:4, userSelect:'none', zIndex: selected?30:20 }}>
        <img src={ann.dataUrl} style={{width:'100%',height:'100%',objectFit:'contain',pointerEvents:'none',display:'block'}} alt="" />
        {selected && (
          <>
            <div data-resize="br" onMouseDown={startResize} style={{...handleStyle,right:-5,bottom:-5}} />
            <button onMouseDown={e=>{e.stopPropagation();onDelete(ann.id);}} style={{position:'absolute',top:-18,right:-4,background:'#ef4444',border:'none',borderRadius:4,width:16,height:16,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}><Ic d={I.close} size={9} sw={2.5}/></button>
          </>
        )}
      </div>
    );
  }

  return null;
}

/* ─── DRAW CANVAS (freehand paths rendered as SVG) ──────────── */
function DrawLayer({ paths, scale }) {
  return (
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:15}} overflow="visible">
      {paths.map(path => (
        <polyline key={path.id}
          points={path.points.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')}
          fill="none" stroke={path.color} strokeWidth={(path.lineWidth||2.5)*scale}
          strokeLinecap="round" strokeLinejoin="round" opacity={path.opacity||1}
        />
      ))}
    </svg>
  );
}

/* ─── MAIN EDITOR ────────────────────────────────────────────── */
export default function EditPDF() {
  const [file,       setFile]      = useState(null);
  const [numPages,   setNumPages]  = useState(0);
  const [curPage,    setCurPage]   = useState(1);
  const [zoom,       setZoom]      = useState(1.4);
  const [loading,    setLoading]   = useState(false);
  const [saving,     setSaving]    = useState(false);
  const [draggingIn, setDragIn]    = useState(false);
  const [tool,       setTool]      = useState('select');
  const [color,      setColor]     = useState('#2563eb');
  const [lineWidth,  setLineWidth] = useState(2.5);
  const [font,       setFont]      = useState(FONTS[0].v);
  const [fontSize,   setFontSize]  = useState(18);
  const [bold,       setBold]      = useState(false);
  const [italic,     setItalic]    = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showSign,   setShowSign]  = useState(false);

  // Page annotations: { [page]: { objects: AnnObject[], paths: path[] } }
  const [pages,      setPages]     = useState({});
  const histStack    = useRef([]);
  const redoStack    = useRef([]);

  const pdfCanvasRef  = useRef(null);
  const liveCanvasRef = useRef(null);
  const overlayRef    = useRef(null);
  const pdfjsDoc      = useRef(null);
  const thumbRefs     = useRef({});

  // live drawing
  const isDrawing    = useRef(false);
  const livePoints   = useRef([]);
  const shapeStart   = useRef(null);
  const signPos      = useRef({ x:60, y:60 });

  /* ── load fonts ── */
  useEffect(() => {
    const l = document.createElement('link');
    l.rel  = 'stylesheet';
    l.href = GF;
    document.head.appendChild(l);
    return () => document.head.removeChild(l);
  }, []);

  /* ── keyboard shortcuts ── */
  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if ((e.metaKey||e.ctrlKey) && !e.shiftKey && e.key==='z') { e.preventDefault(); undo(); }
      if ((e.metaKey||e.ctrlKey) && (e.key==='y'||(e.shiftKey&&e.key==='z'))) { e.preventDefault(); redo(); }
      if ((e.metaKey||e.ctrlKey) && e.key==='s') { e.preventDefault(); savePdf(); }
      if (e.key==='Delete'||e.key==='Backspace') { if(selectedId) deleteAnn(selectedId); }
      if (e.key==='Escape') setSelectedId(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, pages]);

  /* ── get/set page data ── */
  function getPage(p) { return pages[p] || { objects:[], paths:[] }; }
  function snapshot() { return JSON.parse(JSON.stringify(pages)); }

  function setPageData(p, updater) {
    histStack.current.push(snapshot());
    redoStack.current = [];
    setPages(prev => {
      const cur = prev[p] || { objects:[], paths:[] };
      return { ...prev, [p]: updater(cur) };
    });
  }

  function undo() {
    if (!histStack.current.length) return;
    redoStack.current.push(snapshot());
    setPages(histStack.current.pop());
    setSelectedId(null);
  }
  function redo() {
    if (!redoStack.current.length) return;
    histStack.current.push(snapshot());
    setPages(redoStack.current.pop());
    setSelectedId(null);
  }

  /* ── load PDF ── */
  async function loadPdf(f) {
    if (!f || f.type !== 'application/pdf') return;
    setLoading(true);
    setFile(f); setPages({}); setSelectedId(null);
    histStack.current = []; redoStack.current = [];
    setCurPage(1);
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      const buf = await f.arrayBuffer();
      pdfjsDoc.current = await pdfjs.getDocument({ data: buf }).promise;
      setNumPages(pdfjsDoc.current.numPages);
    } catch { alert('Could not open PDF.'); }
    setLoading(false);
  }

  /* ── render PDF canvas ── */
  const [canvasW, setCanvasW] = useState(0);
  const [canvasH, setCanvasH] = useState(0);

  useEffect(() => {
    if (!pdfjsDoc.current) return;
    pdfjsDoc.current.getPage(curPage).then(page => {
      const vp = page.getViewport({ scale: zoom });
      const c  = pdfCanvasRef.current; if (!c) return;
      c.width  = vp.width;
      c.height = vp.height;
      setCanvasW(vp.width);
      setCanvasH(vp.height);
      page.render({ canvasContext: c.getContext('2d'), viewport: vp });
      // sync live canvas
      const lc = liveCanvasRef.current; if (!lc) return;
      lc.width  = vp.width;
      lc.height = vp.height;
    });
  }, [curPage, zoom, numPages]);

  /* ── render thumbnails ── */
  useEffect(() => {
    if (!pdfjsDoc.current) return;
    for (let i=1; i<=numPages; i++) {
      const c = thumbRefs.current[i]; if (!c) continue;
      pdfjsDoc.current.getPage(i).then(page => {
        const vp = page.getViewport({ scale:.13 });
        c.width = vp.width; c.height = vp.height;
        page.render({ canvasContext: c.getContext('2d'), viewport: vp });
      });
    }
  }, [numPages]);

  /* ── add annotation ── */
  function addObject(obj) {
    setPageData(curPage, pd => ({ ...pd, objects: [...pd.objects, { id:uid(), ...obj }] }));
  }
  function addPath(path) {
    setPageData(curPage, pd => ({ ...pd, paths: [...pd.paths, { id:uid(), ...path }] }));
  }
  function updateAnn(id, changes) {
    histStack.current.push(snapshot());
    redoStack.current = [];
    setPages(prev => {
      const pd = prev[curPage] || { objects:[], paths:[] };
      return { ...prev, [curPage]: { ...pd, objects: pd.objects.map(o => o.id===id ? {...o,...changes} : o) }};
    });
  }
  function deleteAnn(id) {
    setPageData(curPage, pd => ({
      ...pd,
      objects: pd.objects.filter(o => o.id !== id),
      paths:   pd.paths.filter(p => p.id !== id),
    }));
    setSelectedId(null);
  }

  /* ── canvas coords ── */
  function getPos(e) {
    const c    = liveCanvasRef.current;
    const rect = c.getBoundingClientRect();
    const sx   = c.width / rect.width;
    const sy   = c.height / rect.height;
    const t    = e.touches ? e.touches[0] : e;
    return { x: (t.clientX-rect.left)*sx, y: (t.clientY-rect.top)*sy };
  }

  /* ── overlay click for text placement ── */
  function handleOverlayClick(e) {
    if (e.target !== overlayRef.current && e.target !== pdfCanvasRef.current && e.target !== liveCanvasRef.current) return;
    setSelectedId(null);
    if (tool === 'text') {
      const rect = liveCanvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / zoom;
      const y = (e.clientY - rect.top)  / zoom;
      addObject({ type:'text', x, y, text:'Double-click to edit', color, font, fontSize, bold, italic });
    }
    if (tool === 'sign') {
      const rect = liveCanvasRef.current.getBoundingClientRect();
      signPos.current = { x:(e.clientX-rect.left)/zoom, y:(e.clientY-rect.top)/zoom };
      setShowSign(true);
    }
    if (tool === 'image') {
      document.getElementById('img-input').click();
      const rect = liveCanvasRef.current.getBoundingClientRect();
      signPos.current = { x:(e.clientX-rect.left)/zoom, y:(e.clientY-rect.top)/zoom };
    }
  }

  /* ── draw / shape ── */
  function onPointerDown(e) {
    if (['text','sign','image','select'].includes(tool)) return;
    e.preventDefault();
    isDrawing.current = true;
    livePoints.current = [getPos(e)];
    shapeStart.current = getPos(e);
  }
  function onPointerMove(e) {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    livePoints.current.push(pos);
    const c   = liveCanvasRef.current;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    ctx.save();
    if (tool==='draw') {
      const pts = livePoints.current;
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (let i=1;i<pts.length-1;i++) ctx.quadraticCurveTo(pts[i].x,pts[i].y,(pts[i].x+pts[i+1].x)/2,(pts[i].y+pts[i+1].y)/2);
      if (pts.length>1) ctx.lineTo(pts[pts.length-1].x, pts[pts.length-1].y);
      ctx.stroke();
    } else if (tool==='highlight') {
      const s=shapeStart.current;
      ctx.globalAlpha=.35; ctx.fillStyle=color; ctx.fillRect(s.x,s.y,pos.x-s.x,pos.y-s.y);
    } else if (tool==='rect') {
      const s=shapeStart.current;
      ctx.strokeStyle=color; ctx.lineWidth=lineWidth; ctx.strokeRect(s.x,s.y,pos.x-s.x,pos.y-s.y);
    } else if (tool==='eraser') {
      const pts=livePoints.current;
      ctx.globalCompositeOperation='destination-out'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
    }
    ctx.restore();
  }
  function onPointerUp(e) {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const pos = getPos(e);
    const c   = liveCanvasRef.current;
    c.getContext('2d').clearRect(0,0,c.width,c.height);

    if (tool==='draw') {
      if (livePoints.current.length < 2) return;
      addPath({ type:'path', points:[...livePoints.current,pos], color, lineWidth, opacity:1 });
    } else if (tool==='highlight') {
      const s=shapeStart.current; const w=pos.x-s.x, h=pos.y-s.y;
      if (Math.abs(w)<5||Math.abs(h)<5) return;
      addObject({ type:'highlight', x:s.x/zoom, y:s.y/zoom, w:w/zoom, h:h/zoom, color });
    } else if (tool==='rect') {
      const s=shapeStart.current; const w=pos.x-s.x, h=pos.y-s.y;
      if (Math.abs(w)<5||Math.abs(h)<5) return;
      addObject({ type:'rect', x:s.x/zoom, y:s.y/zoom, w:w/zoom, h:h/zoom, color, lineWidth });
    } else if (tool==='eraser') {
      // eraser: delete any path that touches the eraser path
      const pts = [...livePoints.current, pos];
      setPageData(curPage, pd => ({
        ...pd,
        paths: pd.paths.filter(path => {
          // check if any eraser point is near any path point
          return !path.points?.some(pp => pts.some(ep => Math.hypot(ep.x-pp.x,ep.y-pp.y) < 20));
        }),
      }));
    }
    livePoints.current = [];
  }

  /* ── apply signature ── */
  function applySign(sig) {
    addObject({ ...sig, x:signPos.current.x, y:signPos.current.y, w:sig.w||220, h:sig.h||80 });
    setTool('select');
  }

  /* ── add image ── */
  function addImage(f) {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => addObject({ type:'image', x:signPos.current.x, y:signPos.current.y, w:200, h:150, dataUrl:ev.target.result });
    reader.readAsDataURL(f);
  }

  /* ── save PDF ── */
  async function savePdf() {
    if (!file) return;
    setSaving(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const buf  = await file.arrayBuffer();
      const pdfd = await PDFDocument.load(buf);
      const hf   = await pdfd.embedFont(StandardFonts.Helvetica);
      const hfb  = await pdfd.embedFont(StandardFonts.HelveticaBold);

      function h2rgb(h) {
        if (!h||h.length<7) return rgb(0,0,0);
        return rgb(parseInt(h.slice(1,3),16)/255, parseInt(h.slice(3,5),16)/255, parseInt(h.slice(5,7),16)/255);
      }

      for (const [pnStr, pd] of Object.entries(pages)) {
        const pn   = parseInt(pnStr);
        const page = pdfd.getPage(pn-1);
        const { width:pgW, height:pgH } = page.getSize();

        // The unscaled PDF coords
        const baseW = canvasW / zoom;
        const baseH = canvasH / zoom;
        const sx = pgW / baseW;
        const sy = pgH / baseH;

        // Draw paths
        for (const path of (pd.paths||[])) {
          if (!path.points?.length) continue;
          const c = h2rgb(path.color);
          for (let i=0;i<path.points.length-1;i++) {
            page.drawLine({
              start: { x:path.points[i].x*sx,   y:pgH-path.points[i].y*sy },
              end:   { x:path.points[i+1].x*sx, y:pgH-path.points[i+1].y*sy },
              thickness: (path.lineWidth||2.5)*Math.min(sx,sy),
              color: c,
            });
          }
        }

        // Draw objects
        for (const o of (pd.objects||[])) {
          if (o.type==='text') {
            const lines = (o.text||'').split('\n');
            const sz = (o.fontSize||18)*Math.min(sx,sy);
            lines.forEach((line,i) => {
              try {
                page.drawText(line, {
                  x:    o.x*sx, y: pgH-(o.y+(i*(o.fontSize||18)*1.35))*sy,
                  size: sz, font: o.bold ? hfb : hf, color: h2rgb(o.color||'#000'),
                });
              } catch {}
            });
          } else if (o.type==='highlight') {
            const c = h2rgb(o.color);
            page.drawRectangle({ x:o.x*sx, y:pgH-(o.y+Math.abs(o.h))*sy, width:Math.abs(o.w)*sx, height:Math.abs(o.h)*sy, color:c, opacity:.35 });
          } else if (o.type==='rect') {
            page.drawRectangle({ x:o.x*sx, y:pgH-(o.y+Math.abs(o.h))*sy, width:Math.abs(o.w)*sx, height:Math.abs(o.h)*sy, borderColor:h2rgb(o.color), borderWidth:(o.lineWidth||2)*Math.min(sx,sy), opacity:1 });
          } else if (o.type==='sign-img'||o.type==='image') {
            try {
              const resp = await fetch(o.dataUrl);
              const ib   = await resp.arrayBuffer();
              const isPng = o.dataUrl.startsWith('data:image/png');
              const img  = isPng ? await pdfd.embedPng(ib) : await pdfd.embedJpg(ib);
              page.drawImage(img, { x:o.x*sx, y:pgH-(o.y+Math.abs(o.h||80))*sy, width:Math.abs(o.w||220)*sx, height:Math.abs(o.h||80)*sy });
            } catch {}
          } else if (o.type==='sign-text') {
            try { page.drawText(o.text||'', { x:o.x*sx, y:pgH-o.y*sy, size:28*Math.min(sx,sy), font:hf, color:rgb(.11,.3,.87) }); } catch {}
          }
        }
      }

      const bytes = await pdfd.save();
      const blob  = new Blob([bytes],{type:'application/pdf'});
      const url   = URL.createObjectURL(blob);
      const a     = document.createElement('a');
      a.href=url; a.download=file.name.replace('.pdf','-edited.pdf'); a.click();
      URL.revokeObjectURL(url);
    } catch(e) { console.error(e); alert('Save failed. See console.'); }
    setSaving(false);
  }

  const pd          = getPage(curPage);
  const activeTool  = TOOLS.find(t=>t.id===tool);
  const canUndo     = histStack.current.length > 0;
  const canRedo     = redoStack.current.length > 0;
  const selObj      = pd.objects.find(o=>o.id===selectedId);

  /* ─── UPLOAD SCREEN ─────────────────────────────────────── */
  if (!file) return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif",background:'#fff'}}>
      <style>{`@import url('${GF}')`}</style>
      <nav style={{height:56,borderBottom:'1px solid #e4e4e7',display:'flex',alignItems:'center',padding:'0 24px',justifyContent:'space-between'}}>
        <Link href="/" style={{fontWeight:700,fontSize:20,letterSpacing:'-.4px',color:'#0a0a0a',textDecoration:'none'}}>breklo<span style={{color:'#2563eb'}}>.</span></Link>
        <Link href="/" style={{fontSize:13,color:'#71717a',textDecoration:'none'}}>← All tools</Link>
      </nav>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 24px'}}>
        <div style={{textAlign:'center',maxWidth:560,width:'100%'}}>
          <div style={{width:68,height:68,background:'linear-gradient(135deg,#2563eb,#1d4ed8)',borderRadius:20,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',boxShadow:'0 12px 28px rgba(37,99,235,.3)'}}>
            <Ic d={[I.text[0],'M12 5v14','M9 19h6']} size={28} sw={2}/>
          </div>
          <h1 style={{fontSize:38,fontWeight:700,letterSpacing:'-.03em',color:'#0a0a0a',marginBottom:12}}>Edit PDF</h1>
          <p style={{fontSize:17,color:'#71717a',marginBottom:40,lineHeight:1.65,margin:'0 auto 40px',maxWidth:440}}>
            Add text, draw, highlight, sign and annotate your PDF. Drag, resize and edit everything freely.
          </p>
          <div
            onDragOver={e=>{e.preventDefault();setDragIn(true);}}
            onDragLeave={()=>setDragIn(false)}
            onDrop={e=>{e.preventDefault();setDragIn(false);loadPdf(e.dataTransfer.files[0]);}}
            onClick={()=>document.getElementById('fi').click()}
            style={{border:`2px dashed ${draggingIn?'#2563eb':'#d4d4d8'}`,borderRadius:20,padding:'52px 32px',textAlign:'center',background:draggingIn?'#eff4ff':'#fafafa',cursor:'pointer',transition:'all .15s',marginBottom:24}}
          >
            <div style={{width:52,height:52,background:draggingIn?'#2563eb':'#e4e4e7',borderRadius:14,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center',color:draggingIn?'#fff':'#71717a',transition:'all .15s'}}>
              <Ic d={I.up} size={22} sw={2}/>
            </div>
            <p style={{fontWeight:600,fontSize:17,color:'#0a0a0a',marginBottom:6}}>Drop your PDF here</p>
            <p style={{fontSize:14,color:'#a1a1aa',marginBottom:24}}>or click to browse — up to 100 MB</p>
            <button onClick={e=>e.stopPropagation()} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:11,padding:'13px 32px',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 8px 20px rgba(37,99,235,.3)'}}>Select PDF file</button>
            <p style={{fontSize:12,color:'#d4d4d8',marginTop:14}}>Files never leave your device · 100% free</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
            {['Drag & resize all objects','Inline text editing','Transparent signatures','20 fonts','Full undo / redo','Free forever'].map(f=>(
              <span key={f} style={{padding:'5px 12px',background:'#f4f4f5',borderRadius:20,fontSize:13,color:'#52525b',fontWeight:500}}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <input id="fi" type="file" accept=".pdf,application/pdf" style={{display:'none'}} onChange={e=>loadPdf(e.target.files[0])}/>
    </div>
  );

  /* ─── EDITOR ─────────────────────────────────────────────── */
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif",background:'#fff',overflow:'hidden'}}>
      <style>{`
        @import url('${GF}');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{overflow:hidden}
        .tbtn{background:none;border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;border-radius:10px;transition:all .1s;font-family:inherit}
        .tbtn:hover{background:#f4f4f5}
        .tbtn.on{background:#eff4ff;color:#2563eb}
        .tbtn .tl{font-size:9px;font-weight:500;letter-spacing:.2px;line-height:1}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#d4d4d8;border-radius:3px}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{height:52,borderBottom:'1px solid #e4e4e7',display:'flex',alignItems:'center',padding:'0 12px',gap:8,flexShrink:0,background:'#fff',zIndex:50}}>
        <Link href="/" style={{fontWeight:700,fontSize:18,letterSpacing:'-.4px',color:'#0a0a0a',textDecoration:'none',flexShrink:0}}>breklo<span style={{color:'#2563eb'}}>.</span></Link>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        {/* filename */}
        <div style={{display:'flex',alignItems:'center',gap:6,flex:1,minWidth:0}}>
          <span style={{width:22,height:26,background:'#fee2e2',borderRadius:4,display:'grid',placeItems:'center',flexShrink:0}}><span style={{fontSize:7,fontWeight:800,color:'#b91c1c'}}>PDF</span></span>
          <span style={{fontSize:13,fontWeight:500,color:'#18181b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{file.name}</span>
        </div>
        {/* undo/redo */}
        {[[undo,!canUndo,I.undo,'Undo (⌘Z)'],[redo,!canRedo,I.redo,'Redo (⌘Y)']].map(([fn,dis,ic,title],i)=>(
          <button key={i} onClick={fn} disabled={dis} title={title} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:dis?'default':'pointer',color:dis?'#d4d4d8':'#52525b',flexShrink:0}}>
            <Ic d={ic} size={13}/>
          </button>
        ))}
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        {/* zoom */}
        <div style={{display:'flex',alignItems:'center',gap:3,flexShrink:0}}>
          <button onClick={()=>setZoom(z=>Math.max(0.4,+(z-.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
          <span style={{fontSize:12,color:'#52525b',minWidth:36,textAlign:'center',fontWeight:500}}>{Math.round(zoom*100)}%</span>
          <button onClick={()=>setZoom(z=>Math.min(3,+(z+.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
        </div>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        {/* page nav */}
        <div style={{display:'flex',alignItems:'center',gap:5,flexShrink:0,fontSize:12.5,color:'#52525b',fontWeight:500}}>
          <button onClick={()=>setCurPage(p=>Math.max(1,p-1))} disabled={curPage===1} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:curPage===1?'default':'pointer',color:curPage===1?'#d4d4d8':'#52525b',fontSize:12}}>‹</button>
          <span>{curPage}/{numPages}</span>
          <button onClick={()=>setCurPage(p=>Math.min(numPages,p+1))} disabled={curPage===numPages} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:curPage===numPages?'default':'pointer',color:curPage===numPages?'#d4d4d8':'#52525b',fontSize:12}}>›</button>
        </div>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <button onClick={()=>{setFile(null);setPages({});pdfjsDoc.current=null;setNumPages(0);}} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,padding:'0 10px',height:30,fontSize:12,fontWeight:500,cursor:'pointer',color:'#52525b',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4,flexShrink:0}}>
          <Ic d={I.close} size={11}/> New
        </button>
        <button onClick={savePdf} disabled={saving} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0 16px',height:34,display:'flex',alignItems:'center',gap:6,cursor:saving?'wait':'pointer',fontSize:13.5,fontWeight:600,fontFamily:'inherit',boxShadow:'0 2px 8px rgba(37,99,235,.3)',flexShrink:0}}>
          <Ic d={I.dl} size={13} sw={2.2}/>{saving?'Saving…':'Download'}
        </button>
      </header>

      <div style={{flex:1,display:'flex',overflow:'hidden'}}>

        {/* ── TOOLS ── */}
        <div style={{width:56,borderRight:'1px solid #e4e4e7',display:'flex',flexDirection:'column',alignItems:'center',padding:'8px 0',gap:1,flexShrink:0,background:'#fff',overflowY:'auto'}}>
          {TOOLS.map(t=>(
            <button key={t.id} className={`tbtn${tool===t.id?' on':''}`} onClick={()=>setTool(t.id)} title={t.label}
              style={{width:46,height:46,color:tool===t.id?'#2563eb':'#71717a'}}>
              <Ic d={t.icon} size={16}/>
              <span className="tl">{t.label.split(' ')[0]}</span>
            </button>
          ))}
          <div style={{width:32,height:1,background:'#e4e4e7',margin:'6px 0'}}/>
          {COLORS.slice(0,6).map(c=>(
            <button key={c} onClick={()=>setColor(c)} title={c} style={{width:18,height:18,borderRadius:'50%',background:c,border:'none',cursor:'pointer',outline:color===c?`3px solid ${c}`:'none',outlineOffset:2,boxShadow:color===c?`0 0 0 2px #fff,0 0 0 4px ${c}`:'none',margin:'2px 0',transform:color===c?'scale(1.2)':'scale(1)',transition:'all .12s'}}/>
          ))}
        </div>

        {/* ── THUMBNAILS ── */}
        <div style={{width:82,borderRight:'1px solid #e4e4e7',overflowY:'auto',padding:'8px 5px',display:'flex',flexDirection:'column',gap:5,flexShrink:0,background:'#fafafa'}}>
          {Array.from({length:numPages},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setCurPage(n)} style={{background:'none',border:`2px solid ${curPage===n?'#2563eb':'#e4e4e7'}`,borderRadius:7,padding:3,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'border-color .12s'}}>
              <canvas ref={el=>{thumbRefs.current[n]=el;}} style={{borderRadius:3,display:'block',maxWidth:'100%'}}/>
              <span style={{fontSize:9,color:curPage===n?'#2563eb':'#a1a1aa',fontWeight:curPage===n?600:400}}>{n}</span>
            </button>
          ))}
        </div>

        {/* ── MAIN AREA ── */}
        <div style={{flex:1,overflow:'auto',background:'#525252',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:24,position:'relative'}}
          onClick={handleOverlayClick}
        >
          {loading && (
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(82,82,82,.7)',zIndex:100}}>
              <div style={{background:'#fff',borderRadius:14,padding:'20px 28px',fontSize:14,fontWeight:600,color:'#0a0a0a'}}>Loading PDF…</div>
            </div>
          )}

          {/* PDF + overlay wrapper */}
          <div style={{position:'relative',boxShadow:'0 8px 48px rgba(0,0,0,.5)',borderRadius:2,flexShrink:0,userSelect:'none'}} ref={overlayRef}>
            {/* Layer 1: PDF */}
            <canvas ref={pdfCanvasRef} style={{display:'block',position:'relative',zIndex:1}}/>

            {/* Layer 2: Draw paths (SVG) */}
            {canvasW > 0 && <div style={{position:'absolute',inset:0,zIndex:2,pointerEvents:'none'}}>
              <DrawLayer paths={pd.paths||[]} scale={zoom}/>
            </div>}

            {/* Layer 3: Interactive objects (DOM) */}
            {canvasW > 0 && <div style={{position:'absolute',inset:0,zIndex:3,pointerEvents:['text','sign','image'].includes(tool)?'none':'auto'}}>
              {(pd.objects||[]).map(o=>(
                <AnnObject key={o.id} ann={o} selected={selectedId===o.id} scale={zoom}
                  onSelect={id=>{setSelectedId(id);if(tool!=='select'){}}}
                  onUpdate={updateAnn}
                  onDelete={deleteAnn}
                />
              ))}
            </div>}

            {/* Layer 4: Live drawing canvas */}
            <canvas ref={liveCanvasRef}
              style={{position:'absolute',inset:0,zIndex:4,cursor:activeTool?.cursor||'default',pointerEvents:['text','sign','image','select'].includes(tool)?'none':'auto'}}
              onMouseDown={onPointerDown} onMouseMove={onPointerMove} onMouseUp={onPointerUp} onMouseLeave={onPointerUp}
              onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}
            />
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{width:216,borderLeft:'1px solid #e4e4e7',background:'#fff',padding:'14px 12px',flexShrink:0,overflowY:'auto',display:'flex',flexDirection:'column',gap:16}}>
          {/* Active tool */}
          <div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>Active tool</div>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 11px',background:'#eff4ff',borderRadius:8,border:'1px solid #bfdbfe'}}>
              <span style={{color:'#2563eb'}}><Ic d={activeTool?.icon} size={14}/></span>
              <span style={{fontSize:13,fontWeight:600,color:'#1d4ed8'}}>{activeTool?.label}</span>
            </div>
            {tool==='select' && <p style={{fontSize:11,color:'#9ca3af',marginTop:6,lineHeight:1.4}}>Click to select · Drag to move · Double-click text to edit</p>}
          </div>

          {/* Color */}
          <div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>Color</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:8}}>
              {COLORS.map(c=>(
                <button key={c} onClick={()=>{setColor(c);if(selectedId)updateAnn(selectedId,{color:c});}} style={{width:22,height:22,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:color===c?`0 0 0 2px #fff,0 0 0 4px ${c}`:'none',transform:color===c?'scale(1.15)':'scale(1)',transition:'all .12s'}}/>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',gap:7}}>
              <input type="color" value={color} onChange={e=>{setColor(e.target.value);if(selectedId)updateAnn(selectedId,{color:e.target.value});}} style={{width:26,height:26,border:'1px solid #e4e4e7',borderRadius:5,cursor:'pointer',padding:2}}/>
              <span style={{fontSize:11,color:'#71717a',fontFamily:'monospace'}}>{color}</span>
            </div>
          </div>

          {/* Line width */}
          {['draw','rect','eraser'].includes(tool) && (
            <div>
              <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>
                {tool==='eraser'?'Eraser size':'Line: '+lineWidth+'px'}
              </div>
              {tool!=='eraser'&&<input type="range" min="0.5" max="20" step=".5" value={lineWidth} onChange={e=>setLineWidth(parseFloat(e.target.value))} style={{width:'100%',accentColor:'#2563eb'}}/>}
            </div>
          )}

          {/* Font settings */}
          {(tool==='text'||(selObj?.type==='text')) && (
            <>
              <div>
                <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>Font size: {selObj?.fontSize||fontSize}px</div>
                <input type="range" min="8" max="96" value={selObj?.fontSize||fontSize} onChange={e=>{const v=parseInt(e.target.value);setFontSize(v);if(selectedId)updateAnn(selectedId,{fontSize:v});}} style={{width:'100%',accentColor:'#2563eb'}}/>
              </div>
              <div>
                <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>Font family</div>
                <select value={selObj?.font||font} onChange={e=>{setFont(e.target.value);if(selectedId)updateAnn(selectedId,{font:e.target.value});}}
                  style={{width:'100%',padding:'6px 9px',border:'1px solid #e4e4e7',borderRadius:7,fontSize:12.5,fontFamily:'inherit',outline:'none',background:'#fff',cursor:'pointer'}}>
                  {FONTS.map(f=><option key={f.l} value={f.v}>{f.l}</option>)}
                </select>
              </div>
              <div style={{display:'flex',gap:6}}>
                {[['B','Bold',bold,setBold],['I','Italic',italic,setItalic]].map(([lbl,title,val,set])=>(
                  <button key={lbl} onClick={()=>{set(!val);if(selectedId)updateAnn(selectedId,{[title.toLowerCase()]:!val});}} style={{flex:1,padding:'6px',borderRadius:7,border:`1.5px solid ${val?'#2563eb':'#e4e4e7'}`,background:val?'#eff4ff':'#fff',color:val?'#1d4ed8':'#71717a',fontWeight:lbl==='B'?700:400,fontStyle:lbl==='I'?'italic':'normal',cursor:'pointer',fontFamily:'serif',fontSize:15}}>{lbl}</button>
                ))}
              </div>
            </>
          )}

          {/* Selected object info */}
          {selObj && (
            <div style={{background:'#fafafa',borderRadius:9,padding:'10px 12px',border:'1px solid #e4e4e7'}}>
              <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:8}}>Selected</div>
              <div style={{fontSize:12,color:'#52525b',marginBottom:8}}>
                <span style={{textTransform:'capitalize',fontWeight:500,color:'#0a0a0a'}}>{selObj.type.replace('-',' ')}</span>
                {selObj.w && <div style={{marginTop:3,color:'#9ca3af'}}>{Math.round(selObj.w)}×{Math.round(selObj.h||0)}px</div>}
              </div>
              <div style={{display:'flex',gap:5}}>
                {selObj.type==='text'&&<button onClick={()=>{/* focus edit via doubleclick */}} style={{flex:1,padding:'6px',borderRadius:7,border:'1px solid #bfdbfe',background:'#eff4ff',color:'#1d4ed8',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>✏ Edit text</button>}
                <button onClick={()=>deleteAnn(selObj.id)} style={{flex:1,padding:'6px',borderRadius:7,border:'1px solid #fecaca',background:'#fff1f2',color:'#b91c1c',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}><Ic d={I.trash} size={11}/> Delete</button>
              </div>
            </div>
          )}

          {/* Undo/redo */}
          <div style={{display:'flex',gap:6}}>
            {[[undo,!canUndo,'↩ Undo'],[redo,!canRedo,'↪ Redo']].map(([fn,dis,lbl])=>(
              <button key={lbl} onClick={fn} disabled={dis} style={{flex:1,padding:'7px',borderRadius:8,border:'1px solid #e4e4e7',background:'#fff',fontSize:12,fontWeight:500,cursor:dis?'default':'pointer',color:dis?'#d4d4d8':'#52525b',fontFamily:'inherit'}}>{lbl}</button>
            ))}
          </div>

          {/* Stats */}
          <div style={{fontSize:12,color:'#9ca3af',lineHeight:1.6}}>
            <div>Objects: <b style={{color:'#52525b'}}>{pd.objects?.length||0}</b></div>
            <div>Paths: <b style={{color:'#52525b'}}>{pd.paths?.length||0}</b></div>
            <div>History: <b style={{color:'#52525b'}}>{histStack.current.length}</b> steps</div>
          </div>

          {/* Clear */}
          {((pd.objects?.length||0)+(pd.paths?.length||0))>0&&(
            <button onClick={()=>{histStack.current.push(snapshot());redoStack.current=[];setPages(p=>({...p,[curPage]:{objects:[],paths:[]}}));setSelectedId(null);}}
              style={{padding:'8px',borderRadius:8,border:'1px solid #fecaca',background:'#fff1f2',color:'#b91c1c',fontSize:12.5,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>
              Clear this page
            </button>
          )}

          {/* Shortcuts */}
          <div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:7}}>Shortcuts</div>
            {[['⌘Z','Undo'],['⌘Y','Redo'],['⌘S','Download'],['Del','Delete selected'],['Esc','Deselect']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4,fontSize:11.5,color:'#71717a'}}>
                <kbd style={{background:'#f4f4f5',border:'1px solid #e4e4e7',borderRadius:4,padding:'1px 5px',fontFamily:'monospace',fontSize:10}}>{k}</kbd>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* hidden inputs */}
      <input id="img-input" type="file" accept="image/*" style={{display:'none'}} onChange={e=>addImage(e.target.files[0])}/>

      {/* sign modal */}
      {showSign && <SignModal onClose={()=>setShowSign(false)} onApply={applySign}/>}
    </div>
  );
}
