'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { downloadBlob } from '@/lib/download';

/* ─── GOOGLE FONTS ──────────────────────────────────────────── */
const GF = 'https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Lobster&family=Sacramento&family=Great+Vibes&family=Montserrat:wght@400;600;700&family=Oswald&family=Raleway:wght@400;600&family=Playfair+Display&family=Roboto+Slab&display=swap';

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

const COLORS = ['#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#db2777','#0891b2','#0a0a0a','#64748b','#f59e0b','#ea580c','#ec4899'];
const HIGHLIGHT_COLORS = ['#fde047','#86efac','#fda4af','#93c5fd','#c4b5fd','#fdba74','#fcd34d','#a7f3d0'];

/* ─── SHAPES ────────────────────────────────────────────────── */
const SHAPES = [
  { id:'rectangle',  label:'Rectangle',  icon:['M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'] },
  { id:'circle',     label:'Circle',     icon:['M12 22a10 10 0 100-20 10 10 0 000 20z'] },
  { id:'ellipse',    label:'Ellipse',    icon:['M12 19c-5 0-9-3-9-7s4-7 9-7 9 3 9 7-4 7-9 7z'] },
  { id:'triangle',   label:'Triangle',   icon:['M12 3l10 17H2z'] },
  { id:'line',       label:'Line',       icon:['M4 20L20 4'] },
  { id:'arrow',      label:'Arrow',      icon:['M4 20L20 4','M14 4h6v6'] },
  { id:'diamond',    label:'Diamond',    icon:['M12 3l9 9-9 9-9-9z'] },
  { id:'star',       label:'Star',       icon:['M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z'] },
];

/* ─── ICONS ─────────────────────────────────────────────────── */
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
  shape:     ['M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'],
  image:     ['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z','M12 13m-3 0a3 3 0 106 0 3 3 0 00-6 0'],
  eraser:    ['M20 20H7L3 16l9.5-9.5','M13 5l4 4'],
  undo:      'M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13',
  redo:      'M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13',
  dl:        'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  close:     'M18 6L6 18M6 6l12 12',
  trash:     ['M3 6h18','M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2','M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6'],
  up:        'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  copy:      ['M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2','M8 4a2 2 0 012-2h4a2 2 0 012 2v2H8V4z'],
  layers:    ['M12 2L2 7l10 5 10-5z','M2 17l10 5 10-5','M2 12l10 5 10-5'],
  align:     ['M12 4v16','M3 8h6','M3 16h6','M15 8h6','M15 16h6'],
  bold:      ['M6 4h7a4 4 0 014 4 4 4 0 01-4 4H6V4z','M6 12h8a4 4 0 014 4 4 4 0 01-4 4H6v-8z'],
  italic:    ['M19 4h-9M14 20H5M15 4L9 20'],
  pen:       ['M12 19l7-7 3 3-7 7-3-3z','M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z','M2 2l7.586 7.586','M11 11l2 2'],
};

const TOOLS = [
  { id:'select',    label:'Select',    icon:I.select,    cursor:'default',   short:'V' },
  { id:'text',      label:'Text',      icon:I.text,      cursor:'text',      short:'T' },
  { id:'draw',      label:'Draw',      icon:I.draw,      cursor:'crosshair', short:'D' },
  { id:'highlight', label:'Highlight', icon:I.highlight, cursor:'crosshair', short:'H' },
  { id:'sign',      label:'Sign',      icon:I.sign,      cursor:'crosshair', short:'S' },
  { id:'shape',     label:'Shape',     icon:I.shape,     cursor:'crosshair', short:'R' },
  { id:'image',     label:'Image',     icon:I.image,     cursor:'pointer',   short:'I' },
  { id:'eraser',    label:'Eraser',    icon:I.eraser,    cursor:'cell',      short:'E' },
];

let _id = 0;
const uid = () => `a_${++_id}_${Date.now()}`;

/* ─── SIGN MODAL — transparent canvas + full font picker ────── */
function SignModal({ onClose, onApply }) {
  const cvRef    = useRef(null);
  const drawing  = useRef(false);
  const [mode,setMode]     = useState('draw');
  const [text,setText]     = useState('');
  const [font,setFont]     = useState(FONTS[16].v);
  const [color,setColor]   = useState('#1d4ed8');
  const [thickness,setT]   = useState(3);

  function initCanvas() {
    const c = cvRef.current; if (!c) return;
    c.width = 480; c.height = 160;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,480,160); // transparent
    ctx.strokeStyle = color;
    ctx.lineWidth   = thickness;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
  }
  useEffect(initCanvas, []);
  useEffect(() => {
    const c = cvRef.current; if (!c) return;
    const ctx = c.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
  }, [color, thickness]);

  function pos(e) {
    const r = cvRef.current.getBoundingClientRect();
    const sx = cvRef.current.width / r.width, sy = cvRef.current.height / r.height;
    const t = e.touches ? e.touches[0] : e;
    return { x:(t.clientX-r.left)*sx, y:(t.clientY-r.top)*sy };
  }
  function down(e) { e.preventDefault(); drawing.current = true; const p = pos(e); const ctx = cvRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(p.x,p.y); }
  function move(e) { if (!drawing.current) return; e.preventDefault(); const p = pos(e); const ctx = cvRef.current.getContext('2d'); ctx.lineTo(p.x,p.y); ctx.stroke(); }
  function up(e)   { e.preventDefault(); drawing.current = false; }

  function apply() {
    if (mode === 'draw') {
      onApply({ type:'sign-img', dataUrl: cvRef.current.toDataURL('image/png'), w:240, h:80 });
    } else if (text.trim()) {
      onApply({ type:'sign-text', text:text.trim(), font, color });
    }
    onClose();
  }

  const signFonts = [FONTS[16],FONTS[17],FONTS[18],FONTS[19],FONTS[15],FONTS[13]];

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:560,boxShadow:'0 32px 80px rgba(0,0,0,.3)',overflow:'hidden'}}>
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
            <>
              <div style={{position:'relative',marginBottom:12}}>
                <div style={{position:'absolute',inset:0,borderRadius:12,backgroundImage:'linear-gradient(45deg,#f0f0f0 25%,transparent 25%),linear-gradient(-45deg,#f0f0f0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#f0f0f0 75%),linear-gradient(-45deg,transparent 75%,#f0f0f0 75%)',backgroundSize:'16px 16px',backgroundPosition:'0 0,0 8px,8px -8px,-8px 0',opacity:.5}}/>
                <canvas ref={cvRef}
                  style={{width:'100%',height:160,border:'1.5px dashed #d4d4d8',borderRadius:12,cursor:'crosshair',display:'block',touchAction:'none',position:'relative'}}
                  onMouseDown={down} onMouseMove={move} onMouseUp={up} onMouseLeave={up}
                  onTouchStart={down} onTouchMove={move} onTouchEnd={up}
                />
                <p style={{position:'absolute',bottom:10,left:'50%',transform:'translateX(-50%)',fontSize:11,color:'#a1a1aa',pointerEvents:'none',whiteSpace:'nowrap'}}>Transparent background</p>
              </div>
              <div style={{display:'flex',gap:14,alignItems:'center'}}>
                <div style={{display:'flex',gap:5}}>
                  {['#0a0a0a','#1d4ed8','#dc2626'].map(c=>(
                    <button key={c} onClick={()=>setColor(c)} style={{width:24,height:24,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:color===c?`0 0 0 2px #fff,0 0 0 3px ${c}`:'none'}}/>
                  ))}
                </div>
                <div style={{flex:1,display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:12,color:'#71717a'}}>Thickness</span>
                  <input type="range" min="1" max="6" step=".5" value={thickness} onChange={e=>setT(parseFloat(e.target.value))} style={{flex:1,accentColor:'#2563eb'}}/>
                </div>
                <button onClick={initCanvas} style={{fontSize:13,color:'#71717a',background:'none',border:'1px solid #e4e4e7',borderRadius:7,padding:'5px 11px',cursor:'pointer',fontFamily:'inherit'}}>Clear</button>
              </div>
            </>
          ) : (
            <>
              <div style={{border:'1.5px solid #e4e4e7',borderRadius:12,padding:'12px 16px',marginBottom:12,minHeight:72,display:'flex',alignItems:'center',justifyContent:'center',backgroundImage:'linear-gradient(45deg,#f8f8f8 25%,transparent 25%),linear-gradient(-45deg,#f8f8f8 25%,transparent 25%)',backgroundSize:'12px 12px'}}>
                <span style={{fontFamily:font,fontSize:36,color}}>{text||'Your Signature'}</span>
              </div>
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your name…"
                style={{width:'100%',padding:'10px 14px',border:'1.5px solid #e4e4e7',borderRadius:9,fontSize:15,fontFamily:'inherit',outline:'none',marginBottom:10}}/>
              <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:10}}>
                {signFonts.map(f=>(
                  <button key={f.l} onClick={()=>setFont(f.v)} style={{padding:'5px 12px',borderRadius:7,border:`1.5px solid ${font===f.v?'#2563eb':'#e4e4e7'}`,background:font===f.v?'#eff4ff':'#fff',fontFamily:f.v,fontSize:14,cursor:'pointer',color:font===f.v?'#1d4ed8':'#52525b'}}>{f.l}</button>
                ))}
              </div>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <span style={{fontSize:12,color:'#71717a',marginRight:4}}>Color:</span>
                {['#1d4ed8','#0a0a0a','#dc2626','#15803d','#7c3aed'].map(c=>(
                  <button key={c} onClick={()=>setColor(c)} style={{width:24,height:24,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:color===c?`0 0 0 2px #fff,0 0 0 3px ${c}`:'none'}}/>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{padding:'0 24px 22px',display:'flex',justifyContent:'flex-end',gap:8}}>
          <button onClick={onClose} style={{padding:'9px 20px',borderRadius:9,border:'1px solid #e4e4e7',background:'#fff',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit',color:'#3f3f46'}}>Cancel</button>
          <button onClick={apply} style={{padding:'9px 22px',borderRadius:9,border:'none',background:'#2563eb',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 12px rgba(37,99,235,.3)'}}>Apply →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── INTERACTIVE OBJECT (drag, resize from all corners) ─── */
function AnnObject({ ann, selected, onSelect, onUpdate, onDelete, onDuplicate, scale }) {
  const editRef = useRef(null);
  const [editing,setEditing] = useState(false);
  const [editVal,setEditVal] = useState(ann.text || '');

  function startDrag(e) {
    if (e.target.dataset?.handle) return;
    if (editing) return;
    e.stopPropagation();
    onSelect(ann.id);
    const startX = e.clientX - ann.x * scale;
    const startY = e.clientY - ann.y * scale;
    function onMove(ev) { onUpdate(ann.id, { x: (ev.clientX - startX)/scale, y: (ev.clientY - startY)/scale }); }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startResize(corner, e) {
    e.stopPropagation(); e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const origW = ann.w || 200, origH = ann.h || 80;
    const origX = ann.x, origY = ann.y;
    function onMove(ev) {
      const dx = (ev.clientX - startX)/scale;
      const dy = (ev.clientY - startY)/scale;
      let updates = {};
      if (corner.includes('e')) updates.w = Math.max(20, origW + dx);
      if (corner.includes('s')) updates.h = Math.max(20, origH + dy);
      if (corner.includes('w')) { updates.x = origX + dx; updates.w = Math.max(20, origW - dx); }
      if (corner.includes('n')) { updates.y = origY + dy; updates.h = Math.max(20, origH - dy); }
      onUpdate(ann.id, updates);
    }
    function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function startFontResize(e) {
    e.stopPropagation(); e.preventDefault();
    const startY = e.clientY;
    const orig = ann.fontSize || 18;
    function onMove(ev) { onUpdate(ann.id, { fontSize: Math.max(8, Math.min(120, orig + (ev.clientY - startY)/3)) }); }
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

  // Resize handles for objects with w/h
  function ResizeHandles() {
    if (!selected) return null;
    const corners = ann.type === 'line' || ann.type === 'arrow'
      ? [['e','e-resize',{right:-5,top:'50%',marginTop:-5}],['w','w-resize',{left:-5,top:'50%',marginTop:-5}]]
      : [
          ['nw','nw-resize',{left:-5,top:-5}],['ne','ne-resize',{right:-5,top:-5}],
          ['sw','sw-resize',{left:-5,bottom:-5}],['se','se-resize',{right:-5,bottom:-5}],
          ['n','n-resize',{left:'50%',top:-5,marginLeft:-5}],['s','s-resize',{left:'50%',bottom:-5,marginLeft:-5}],
          ['w','w-resize',{left:-5,top:'50%',marginTop:-5}],['e','e-resize',{right:-5,top:'50%',marginTop:-5}],
        ];
    return corners.map(([c,cur,style]) => (
      <div key={c} data-handle="1" onMouseDown={e=>startResize(c,e)}
        style={{position:'absolute',width:10,height:10,background:'#2563eb',border:'2px solid #fff',borderRadius:2,boxShadow:'0 1px 4px rgba(0,0,0,.3)',cursor:cur,zIndex:10,...style}}/>
    ));
  }

  function Toolbar() {
    if (!selected) return null;
    return (
      <div style={{position:'absolute',top:-36,left:0,display:'flex',gap:2,background:'#0a0a0a',borderRadius:7,padding:3,boxShadow:'0 6px 16px rgba(0,0,0,.3)',zIndex:50}} onMouseDown={e=>e.stopPropagation()}>
        <button data-handle="1" onClick={()=>onDuplicate(ann.id)} title="Duplicate" style={{background:'none',border:'none',color:'#fff',padding:'4px 6px',cursor:'pointer',borderRadius:4,display:'flex'}}><Ic d={I.copy} size={13}/></button>
        {ann.type==='text' && <button data-handle="1" onClick={()=>{setEditing(true);setTimeout(()=>editRef.current?.select(),50);}} title="Edit text" style={{background:'none',border:'none',color:'#fff',padding:'4px 6px',cursor:'pointer',borderRadius:4,fontSize:13,fontFamily:'inherit'}}>✏</button>}
        <div style={{width:1,background:'#3f3f46',margin:'2px 1px'}}/>
        <button data-handle="1" onClick={()=>onDelete(ann.id)} title="Delete" style={{background:'none',border:'none',color:'#fca5a5',padding:'4px 6px',cursor:'pointer',borderRadius:4,display:'flex'}}><Ic d={I.trash} size={13}/></button>
      </div>
    );
  }

  /* ── TEXT ── */
  if (ann.type === 'text') {
    return (
      <div onMouseDown={startDrag}
        onDoubleClick={e=>{e.stopPropagation();setEditing(true);setTimeout(()=>editRef.current?.select(),50);}}
        style={{position:'absolute',left:ann.x*scale,top:ann.y*scale,cursor:editing?'text':'move',outline:selected?'2px solid #2563eb':editing?'1.5px dashed #2563eb':'1.5px dashed transparent',outlineOffset:3,borderRadius:4,padding:'2px 4px',minWidth:40,minHeight:20,userSelect:editing?'text':'none',zIndex:selected?40:20}}>
        <Toolbar/>
        {editing ? (
          <textarea ref={editRef} value={editVal} onChange={e=>setEditVal(e.target.value)}
            onKeyDown={e=>{if(e.key==='Escape')commitEdit();if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();commitEdit();}}}
            onBlur={commitEdit}
            style={{background:'rgba(255,255,255,.97)',border:'1.5px solid #2563eb',borderRadius:5,padding:'3px 6px',fontSize:(ann.fontSize||18)*scale,fontFamily:ann.font,color:ann.color,outline:'none',resize:'none',minWidth:120,lineHeight:1.4,fontWeight:ann.bold?700:400,fontStyle:ann.italic?'italic':'normal',textDecoration:ann.underline?'underline':'none'}} rows={2}/>
        ) : (
          <span style={{fontSize:(ann.fontSize||18)*scale,fontFamily:ann.font,color:ann.color,whiteSpace:'pre-wrap',lineHeight:1.4,fontWeight:ann.bold?700:400,fontStyle:ann.italic?'italic':'normal',textDecoration:ann.underline?'underline':'none',pointerEvents:'none'}}>{ann.text}</span>
        )}
        {selected && !editing && <div data-handle="1" onMouseDown={startFontResize} style={{position:'absolute',right:-5,bottom:-5,width:10,height:10,background:'#2563eb',border:'2px solid #fff',borderRadius:2,boxShadow:'0 1px 4px rgba(0,0,0,.3)',cursor:'se-resize',zIndex:10}}/>}
      </div>
    );
  }

  /* ── SIGNATURE IMG ── */
  if (ann.type === 'sign-img' || ann.type === 'image') {
    return (
      <div onMouseDown={startDrag}
        style={{position:'absolute',left:ann.x*scale,top:ann.y*scale,width:W,height:H,cursor:'move',outline:selected?'2px solid #2563eb':'1.5px dashed transparent',outlineOffset:2,borderRadius:4,userSelect:'none',zIndex:selected?40:20}}>
        <Toolbar/>
        <img src={ann.dataUrl} style={{width:'100%',height:'100%',objectFit:'contain',pointerEvents:'none',display:'block'}} alt="" draggable={false}/>
        <ResizeHandles/>
      </div>
    );
  }

  /* ── SIGNATURE TEXT ── */
  if (ann.type === 'sign-text') {
    return (
      <div onMouseDown={startDrag}
        style={{position:'absolute',left:ann.x*scale,top:ann.y*scale,width:W,height:H,cursor:'move',outline:selected?'2px solid #2563eb':'1.5px dashed transparent',outlineOffset:2,userSelect:'none',zIndex:selected?40:20,display:'flex',alignItems:'center'}}>
        <Toolbar/>
        <span style={{fontFamily:ann.font,fontSize:Math.min(W/4,H*.7),color:ann.color||'#1d4ed8',pointerEvents:'none',whiteSpace:'nowrap'}}>{ann.text}</span>
        <ResizeHandles/>
      </div>
    );
  }

  /* ── HIGHLIGHT (with opacity!) ── */
  if (ann.type === 'highlight') {
    const opacityHex = Math.round((ann.opacity ?? 0.35) * 255).toString(16).padStart(2,'0');
    return (
      <div onMouseDown={startDrag}
        style={{position:'absolute',left:ann.x*scale,top:ann.y*scale,width:W,height:H,cursor:'move',background:ann.color+opacityHex,borderRadius:2,outline:selected?'2px solid #2563eb':'none',outlineOffset:2,userSelect:'none',zIndex:selected?40:20}}>
        <Toolbar/>
        <ResizeHandles/>
      </div>
    );
  }

  /* ── SHAPES ── */
  if (ann.type === 'shape') {
    const sw = (ann.lineWidth||2) * scale;
    const fillOpacity = ann.fill ? (ann.fillOpacity ?? 0.2) : 0;
    return (
      <div onMouseDown={startDrag}
        style={{position:'absolute',left:ann.x*scale,top:ann.y*scale,width:W,height:H,cursor:'move',outline:selected?'2px solid #2563eb':'none',outlineOffset:2,userSelect:'none',zIndex:selected?40:20}}>
        <Toolbar/>
        <svg width={W} height={H} style={{display:'block',pointerEvents:'none',overflow:'visible'}}>
          {ann.shape === 'rectangle' && <rect x={sw/2} y={sw/2} width={W-sw} height={H-sw} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity}/>}
          {ann.shape === 'circle'    && <circle cx={W/2} cy={H/2} r={Math.min(W,H)/2-sw/2} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity}/>}
          {ann.shape === 'ellipse'   && <ellipse cx={W/2} cy={H/2} rx={W/2-sw/2} ry={H/2-sw/2} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity}/>}
          {ann.shape === 'triangle'  && <polygon points={`${W/2},${sw/2} ${W-sw/2},${H-sw/2} ${sw/2},${H-sw/2}`} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity} strokeLinejoin="round"/>}
          {ann.shape === 'diamond'   && <polygon points={`${W/2},${sw/2} ${W-sw/2},${H/2} ${W/2},${H-sw/2} ${sw/2},${H/2}`} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity} strokeLinejoin="round"/>}
          {ann.shape === 'star'      && (() => {
            const cx=W/2, cy=H/2, r1=Math.min(W,H)/2-sw/2, r2=r1*0.45;
            const pts = [];
            for (let i=0;i<10;i++) { const r = i%2===0?r1:r2; const a = i*Math.PI/5 - Math.PI/2; pts.push(`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`); }
            return <polygon points={pts.join(' ')} stroke={ann.color} strokeWidth={sw} fill={ann.color} fillOpacity={fillOpacity} strokeLinejoin="round"/>;
          })()}
          {ann.shape === 'line'      && <line x1={0} y1={H/2} x2={W} y2={H/2} stroke={ann.color} strokeWidth={sw} strokeLinecap="round"/>}
          {ann.shape === 'arrow'     && <g><line x1={0} y1={H/2} x2={W-sw*2} y2={H/2} stroke={ann.color} strokeWidth={sw} strokeLinecap="round"/><polygon points={`${W},${H/2} ${W-sw*3},${H/2-sw*1.5} ${W-sw*3},${H/2+sw*1.5}`} fill={ann.color}/></g>}
        </svg>
        <ResizeHandles/>
      </div>
    );
  }

  return null;
}

/* ─── PATH (freehand draw) RENDERED AS SVG ─── */
function DrawLayer({ paths, scale, onDeletePath, selectedId, onSelectPath }) {
  return (
    <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'auto',zIndex:15}} overflow="visible">
      {paths.map(path => {
        const isSel = selectedId === path.id;
        return (
          <g key={path.id} onClick={e=>{e.stopPropagation();onSelectPath(path.id);}}>
            <polyline
              points={path.points.map(p=>`${p.x*scale},${p.y*scale}`).join(' ')}
              fill="none" stroke={path.color} strokeWidth={(path.lineWidth||2.5)*scale}
              strokeLinecap="round" strokeLinejoin="round" opacity={path.opacity||1}
              style={{cursor:'move'}}
            />
            {isSel && path.points.length > 0 && (() => {
              const xs = path.points.map(p=>p.x*scale);
              const ys = path.points.map(p=>p.y*scale);
              const minX = Math.min(...xs)-4, maxX = Math.max(...xs)+4;
              const minY = Math.min(...ys)-4, maxY = Math.max(...ys)+4;
              return <rect x={minX} y={minY} width={maxX-minX} height={maxY-minY} fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 3"/>;
            })()}
          </g>
        );
      })}
    </svg>
  );
}

/* ════════════════════ MAIN ════════════════════════ */
export default function EditPDF() {
  const [file,setFile]         = useState(null);
  const [numPages,setNumPages] = useState(0);
  const [curPage,setCurPage]   = useState(1);
  const [zoom,setZoom]         = useState(1.4);
  const [loading,setLoading]   = useState(false);
  const [saving,setSaving]     = useState(false);
  const [dragIn,setDragIn]     = useState(false);

  // tool state
  const [tool,setTool]         = useState('select');
  const [color,setColor]       = useState('#2563eb');
  const [hlColor,setHlColor]   = useState('#fde047');
  const [hlOpacity,setHlOpacity] = useState(0.4);
  const [lineWidth,setLW]      = useState(2.5);
  const [font,setFont]         = useState(FONTS[0].v);
  const [fontSize,setFontSize] = useState(18);
  const [bold,setBold]         = useState(false);
  const [italic,setItalic]     = useState(false);
  const [underline,setUL]      = useState(false);
  const [shape,setShape]       = useState('rectangle');
  const [shapeFill,setShapeFill] = useState(true);
  const [shapeFillOpacity,setSFO] = useState(0.2);
  const [selectedId,setSelectedId] = useState(null);
  const [showSign,setShowSign] = useState(false);

  // pages: { [n]: { objects: [], paths: [] } }
  const [pages,setPages]   = useState({});
  const histRef            = useRef([]);
  const redoRef            = useRef([]);

  // refs
  const pdfCanvasRef  = useRef(null);
  const liveCanvasRef = useRef(null);
  const overlayWrapRef= useRef(null);
  const pdfjsDoc      = useRef(null);
  const thumbRefs     = useRef({});
  const [canvasW,setCW] = useState(0);
  const [canvasH,setCH] = useState(0);

  const isDrawing  = useRef(false);
  const livePoints = useRef([]);
  const shapeStart = useRef(null);
  const signPos    = useRef({ x:60, y:60 });

  /* ── Load fonts ── */
  useEffect(()=>{
    const l = document.createElement('link');
    l.rel='stylesheet'; l.href=GF;
    document.head.appendChild(l);
    return ()=>{ try{ document.head.removeChild(l); }catch{} };
  },[]);

  /* ── Keyboard ── */
  useEffect(()=>{
    function onKey(e) {
      const tag = document.activeElement?.tagName;
      if (tag==='INPUT'||tag==='TEXTAREA') return;
      if ((e.metaKey||e.ctrlKey)&&!e.shiftKey&&e.key==='z'){e.preventDefault();undo();}
      if ((e.metaKey||e.ctrlKey)&&(e.key==='y'||(e.shiftKey&&e.key==='z'))){e.preventDefault();redo();}
      if ((e.metaKey||e.ctrlKey)&&e.key==='s'){e.preventDefault();savePdf();}
      if ((e.metaKey||e.ctrlKey)&&e.key==='d'&&selectedId){e.preventDefault();duplicateAnn(selectedId);}
      if (e.key==='Delete'||e.key==='Backspace'){if(selectedId)deleteAnn(selectedId);}
      if (e.key==='Escape')setSelectedId(null);
      // tool shortcuts
      const sc = TOOLS.find(t=>t.short===e.key.toUpperCase());
      if (sc && !e.metaKey && !e.ctrlKey) setTool(sc.id);
    }
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[selectedId,pages]);

  /* ── Page data ── */
  function getPage(p) { return pages[p] || { objects:[], paths:[] }; }
  function snapshot() { return JSON.parse(JSON.stringify(pages)); }
  function setPageData(p,updater) {
    histRef.current.push(snapshot());
    redoRef.current = [];
    setPages(prev=>{
      const cur = prev[p]||{objects:[],paths:[]};
      return {...prev,[p]:updater(cur)};
    });
  }
  function undo(){ if(!histRef.current.length)return; redoRef.current.push(snapshot()); setPages(histRef.current.pop()); setSelectedId(null); }
  function redo(){ if(!redoRef.current.length)return; histRef.current.push(snapshot()); setPages(redoRef.current.pop()); setSelectedId(null); }

  /* ── Load PDF ── */
  async function loadPdf(f) {
    if (!f||f.type!=='application/pdf') return;
    setLoading(true);
    setFile(f); setPages({}); setSelectedId(null);
    histRef.current=[]; redoRef.current=[];
    setCurPage(1);
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      const buf = await f.arrayBuffer();
      pdfjsDoc.current = await pdfjs.getDocument({data:buf}).promise;
      setNumPages(pdfjsDoc.current.numPages);
    } catch(e){ console.error(e); alert('Could not open PDF.'); }
    setLoading(false);
  }

  /* ── Render PDF canvas ── */
  useEffect(()=>{
    if (!pdfjsDoc.current) return;
    pdfjsDoc.current.getPage(curPage).then(page=>{
      const vp = page.getViewport({scale:zoom});
      const c = pdfCanvasRef.current; if (!c) return;
      c.width = vp.width; c.height = vp.height;
      setCW(vp.width); setCH(vp.height);
      page.render({canvasContext:c.getContext('2d'),viewport:vp});
      const lc = liveCanvasRef.current; if(lc){ lc.width=vp.width; lc.height=vp.height; }
    });
  },[curPage,zoom,numPages]);

  /* ── Thumbnails ── */
  useEffect(()=>{
    if (!pdfjsDoc.current) return;
    for (let i=1;i<=numPages;i++) {
      const c = thumbRefs.current[i]; if (!c) continue;
      pdfjsDoc.current.getPage(i).then(page=>{
        const vp = page.getViewport({scale:.13});
        c.width=vp.width; c.height=vp.height;
        page.render({canvasContext:c.getContext('2d'),viewport:vp});
      });
    }
  },[numPages]);

  /* ── Annotation CRUD ── */
  function addObject(obj){ setPageData(curPage,pd=>({...pd,objects:[...pd.objects,{id:uid(),...obj}]})); }
  function addPath(path){ setPageData(curPage,pd=>({...pd,paths:[...pd.paths,{id:uid(),...path}]})); }
  function updateAnn(id,changes){
    histRef.current.push(snapshot()); redoRef.current=[];
    setPages(prev=>{
      const pd = prev[curPage]||{objects:[],paths:[]};
      return {...prev,[curPage]:{
        ...pd,
        objects:pd.objects.map(o=>o.id===id?{...o,...changes}:o),
        paths:pd.paths.map(p=>p.id===id?{...p,...changes}:p),
      }};
    });
  }
  function deleteAnn(id){
    setPageData(curPage,pd=>({...pd,objects:pd.objects.filter(o=>o.id!==id),paths:pd.paths.filter(p=>p.id!==id)}));
    setSelectedId(null);
  }
  function duplicateAnn(id){
    const pd = getPage(curPage);
    const obj = pd.objects.find(o=>o.id===id) || pd.paths.find(p=>p.id===id);
    if (!obj) return;
    const copy = {...obj,id:uid(),x:(obj.x||0)+20,y:(obj.y||0)+20};
    if (obj.points) copy.points = obj.points.map(p=>({x:p.x+20,y:p.y+20}));
    if (pd.objects.find(o=>o.id===id)) addObject(copy);
    else addPath(copy);
    setSelectedId(copy.id);
  }

  /* ── Canvas pos ── */
  function getPos(e){
    const c = liveCanvasRef.current;
    const r = c.getBoundingClientRect();
    const sx = c.width/r.width, sy = c.height/r.height;
    const t = e.touches?e.touches[0]:e;
    return {x:(t.clientX-r.left)*sx, y:(t.clientY-r.top)*sy};
  }

  /* ── Click on overlay (for text/sign/image placement) ── */
  function handleOverlayClick(e) {
    if (e.target !== overlayWrapRef.current && e.target !== pdfCanvasRef.current && e.target !== liveCanvasRef.current) return;
    setSelectedId(null);
    const rect = liveCanvasRef.current.getBoundingClientRect();
    const x = (e.clientX-rect.left)/zoom;
    const y = (e.clientY-rect.top)/zoom;
    if (tool==='text') {
      addObject({type:'text',x,y:y-fontSize/2,text:'New text',color,font,fontSize,bold,italic,underline});
      setTool('select'); setTimeout(()=>setSelectedId(null),50);
    }
    if (tool==='sign') { signPos.current={x,y}; setShowSign(true); }
    if (tool==='image') { signPos.current={x,y}; document.getElementById('img-input').click(); }
  }

  /* ── Draw / shape on canvas ── */
  function onDown(e){
    if (['text','sign','image','select'].includes(tool)) return;
    e.preventDefault();
    isDrawing.current = true;
    livePoints.current = [getPos(e)];
    shapeStart.current = getPos(e);
  }
  function onMove(e){
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    livePoints.current.push(pos);
    const c = liveCanvasRef.current;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    ctx.save();
    if (tool==='draw') {
      const pts = livePoints.current;
      ctx.strokeStyle=color; ctx.lineWidth=lineWidth; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      for (let i=1;i<pts.length-1;i++) ctx.quadraticCurveTo(pts[i].x,pts[i].y,(pts[i].x+pts[i+1].x)/2,(pts[i].y+pts[i+1].y)/2);
      if (pts.length>1) ctx.lineTo(pts[pts.length-1].x,pts[pts.length-1].y);
      ctx.stroke();
    } else if (tool==='highlight') {
      const s = shapeStart.current;
      ctx.globalAlpha = hlOpacity; ctx.fillStyle=hlColor;
      ctx.fillRect(s.x,s.y,pos.x-s.x,pos.y-s.y);
    } else if (tool==='shape') {
      const s = shapeStart.current;
      const x = Math.min(s.x,pos.x), y = Math.min(s.y,pos.y);
      const w = Math.abs(pos.x-s.x), h = Math.abs(pos.y-s.y);
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
      if (shape==='rectangle') ctx.strokeRect(x,y,w,h);
      else if (shape==='circle') { ctx.beginPath(); ctx.arc(x+w/2,y+h/2,Math.min(w,h)/2,0,Math.PI*2); ctx.stroke(); }
      else if (shape==='ellipse') { ctx.beginPath(); ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2); ctx.stroke(); }
      else if (shape==='line' || shape==='arrow') { ctx.beginPath(); ctx.moveTo(s.x,s.y); ctx.lineTo(pos.x,pos.y); ctx.stroke(); }
      else { ctx.strokeRect(x,y,w,h); }
    } else if (tool==='eraser') {
      const pts = livePoints.current;
      ctx.globalCompositeOperation='destination-out'; ctx.lineWidth=20; ctx.lineCap='round'; ctx.lineJoin='round';
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y); pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
    }
    ctx.restore();
  }
  function onUp(e){
    if (!isDrawing.current) return;
    isDrawing.current = false;
    const pos = getPos(e);
    const c = liveCanvasRef.current;
    c.getContext('2d').clearRect(0,0,c.width,c.height);

    if (tool==='draw' && livePoints.current.length >= 2) {
      addPath({points:[...livePoints.current,pos], color, lineWidth, opacity:1});
    } else if (tool==='highlight') {
      const s = shapeStart.current;
      const w = pos.x-s.x, h = pos.y-s.y;
      if (Math.abs(w)<5||Math.abs(h)<5) return;
      const x = Math.min(s.x,pos.x), y = Math.min(s.y,pos.y);
      addObject({type:'highlight', x:x/zoom, y:y/zoom, w:Math.abs(w)/zoom, h:Math.abs(h)/zoom, color:hlColor, opacity:hlOpacity});
    } else if (tool==='shape') {
      const s = shapeStart.current;
      const w = pos.x-s.x, h = pos.y-s.y;
      if (Math.abs(w)<5||Math.abs(h)<5) return;
      const x = Math.min(s.x,pos.x), y = Math.min(s.y,pos.y);
      addObject({type:'shape', shape, x:x/zoom, y:y/zoom, w:Math.abs(w)/zoom, h:Math.abs(h)/zoom, color, lineWidth, fill:shapeFill, fillOpacity:shapeFillOpacity});
    } else if (tool==='eraser') {
      const pts = [...livePoints.current, pos];
      setPageData(curPage,pd=>({
        ...pd,
        paths: pd.paths.filter(p=>!p.points?.some(pp=>pts.some(ep=>Math.hypot(ep.x-pp.x,ep.y-pp.y)<25))),
      }));
    }
    livePoints.current = [];
  }

  /* ── Sign apply ── */
  function applySign(sig) {
    if (sig.type==='sign-img') {
      addObject({...sig,x:signPos.current.x,y:signPos.current.y,w:sig.w||220,h:sig.h||80});
    } else {
      addObject({type:'sign-text',text:sig.text,font:sig.font,color:sig.color,x:signPos.current.x,y:signPos.current.y,w:200,h:50});
    }
    setTool('select');
  }

  /* ── Add image ── */
  function addImage(f) {
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => addObject({type:'image',x:signPos.current.x,y:signPos.current.y,w:200,h:150,dataUrl:ev.target.result});
    r.readAsDataURL(f);
    setTool('select');
  }

  /* ── Save PDF (with breklo-branded filename!) ── */
  async function savePdf() {
    if (!file) return;
    setSaving(true);
    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const buf = await file.arrayBuffer();
      const pdfd = await PDFDocument.load(buf);
      const hf = await pdfd.embedFont(StandardFonts.Helvetica);
      const hfb = await pdfd.embedFont(StandardFonts.HelveticaBold);
      const hfi = await pdfd.embedFont(StandardFonts.HelveticaOblique);
      const hfbi = await pdfd.embedFont(StandardFonts.HelveticaBoldOblique);

      function h2rgb(h) {
        if (!h||h.length<7) return rgb(0,0,0);
        return rgb(parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255);
      }

      for (const [pnStr,pd] of Object.entries(pages)) {
        const pn = parseInt(pnStr);
        const page = pdfd.getPage(pn-1);
        const { width:pgW, height:pgH } = page.getSize();
        const baseW = canvasW/zoom, baseH = canvasH/zoom;
        const sx = pgW/baseW, sy = pgH/baseH;

        // Paths
        for (const path of (pd.paths||[])) {
          if (!path.points?.length) continue;
          const c = h2rgb(path.color);
          for (let i=0;i<path.points.length-1;i++) {
            page.drawLine({
              start:{x:path.points[i].x*sx,y:pgH-path.points[i].y*sy},
              end:{x:path.points[i+1].x*sx,y:pgH-path.points[i+1].y*sy},
              thickness:(path.lineWidth||2.5)*Math.min(sx,sy),
              color:c,
            });
          }
        }

        // Objects
        for (const o of (pd.objects||[])) {
          if (o.type==='text') {
            const lines = (o.text||'').split('\n');
            const sz = (o.fontSize||18)*Math.min(sx,sy);
            const fontUse = o.bold && o.italic ? hfbi : o.bold ? hfb : o.italic ? hfi : hf;
            lines.forEach((line,i)=>{
              try{
                page.drawText(line,{
                  x:o.x*sx, y:pgH-(o.y+(i*(o.fontSize||18)*1.35)+(o.fontSize||18))*sy,
                  size:sz, font:fontUse, color:h2rgb(o.color||'#000'),
                });
              }catch{}
            });
          } else if (o.type==='highlight') {
            page.drawRectangle({
              x:o.x*sx, y:pgH-(o.y+Math.abs(o.h))*sy,
              width:Math.abs(o.w)*sx, height:Math.abs(o.h)*sy,
              color:h2rgb(o.color), opacity:o.opacity ?? 0.35,
            });
          } else if (o.type==='shape') {
            const fillOp = o.fill ? (o.fillOpacity ?? 0.2) : 0;
            const c = h2rgb(o.color);
            const x = o.x*sx, y = pgH-(o.y+Math.abs(o.h))*sy;
            const w = Math.abs(o.w)*sx, h = Math.abs(o.h)*sy;
            const lw = (o.lineWidth||2)*Math.min(sx,sy);
            if (o.shape==='rectangle') {
              page.drawRectangle({x,y,width:w,height:h,borderColor:c,borderWidth:lw,color: o.fill?c:undefined, opacity:fillOp || undefined});
            } else if (o.shape==='circle' || o.shape==='ellipse') {
              const rx = w/2, ry = h/2;
              page.drawEllipse({x:x+rx, y:y+ry, xScale:rx, yScale:ry, borderColor:c, borderWidth:lw, color: o.fill?c:undefined, opacity:fillOp || undefined});
            } else if (o.shape==='line') {
              page.drawLine({start:{x,y:y+h},end:{x:x+w,y},thickness:lw,color:c});
            } else if (o.shape==='arrow') {
              page.drawLine({start:{x,y:y+h},end:{x:x+w-lw*2,y},thickness:lw,color:c});
              // arrowhead
              const head = lw*3;
              page.drawSvgPath(`M ${x+w} ${y} L ${x+w-head} ${y+head/2} L ${x+w-head} ${y-head/2} Z`,{color:c,borderColor:c});
            }
            // (triangle/diamond/star skipped — would need drawSvgPath)
          } else if (o.type==='sign-img'||o.type==='image') {
            try {
              const resp = await fetch(o.dataUrl);
              const ib = await resp.arrayBuffer();
              const isPng = o.dataUrl.startsWith('data:image/png');
              const img = isPng ? await pdfd.embedPng(ib) : await pdfd.embedJpg(ib);
              page.drawImage(img,{
                x:o.x*sx, y:pgH-(o.y+Math.abs(o.h||80))*sy,
                width:Math.abs(o.w||220)*sx, height:Math.abs(o.h||80)*sy,
              });
            } catch{}
          } else if (o.type==='sign-text') {
            try {
              page.drawText(o.text||'',{x:o.x*sx, y:pgH-(o.y+(o.h||50)*.6)*sy, size:28*Math.min(sx,sy), font:hf, color:h2rgb(o.color||'#1d4ed8')});
            } catch{}
          }
        }
      }

      const bytes = await pdfd.save();
      const blob = new Blob([bytes],{type:'application/pdf'});
      downloadBlob(blob, file.name);
    } catch(e){ console.error(e); alert('Save failed. Check console for details.'); }
    setSaving(false);
  }

  const pd = getPage(curPage);
  const activeTool = TOOLS.find(t=>t.id===tool);
  const canUndo = histRef.current.length > 0;
  const canRedo = redoRef.current.length > 0;
  const selObj = pd.objects.find(o=>o.id===selectedId) || pd.paths.find(p=>p.id===selectedId);

  /* ── UPLOAD SCREEN ── */
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
            <Ic d={I.pen} size={28} sw={1.8}/>
          </div>
          <h1 style={{fontSize:38,fontWeight:700,letterSpacing:'-.03em',color:'#0a0a0a',marginBottom:12}}>Edit PDF</h1>
          <p style={{fontSize:17,color:'#71717a',marginBottom:40,lineHeight:1.65,margin:'0 auto 40px',maxWidth:480}}>
            Add text, draw, sign, highlight, add shapes and edit everything freely. Drag, resize, recolor — full control in your browser.
          </p>
          <div
            onDragOver={e=>{e.preventDefault();setDragIn(true);}}
            onDragLeave={()=>setDragIn(false)}
            onDrop={e=>{e.preventDefault();setDragIn(false);loadPdf(e.dataTransfer.files[0]);}}
            onClick={()=>document.getElementById('fi').click()}
            style={{border:`2px dashed ${dragIn?'#2563eb':'#d4d4d8'}`,borderRadius:20,padding:'52px 32px',textAlign:'center',background:dragIn?'#eff4ff':'#fafafa',cursor:'pointer',transition:'all .15s',marginBottom:24}}
          >
            <div style={{width:52,height:52,background:dragIn?'#2563eb':'#e4e4e7',borderRadius:14,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center',color:dragIn?'#fff':'#71717a',transition:'all .15s'}}>
              <Ic d={I.up} size={22} sw={2}/>
            </div>
            <p style={{fontWeight:600,fontSize:17,color:'#0a0a0a',marginBottom:6}}>Drop your PDF here</p>
            <p style={{fontSize:14,color:'#a1a1aa',marginBottom:24}}>or click to browse — up to 100 MB</p>
            <button onClick={e=>e.stopPropagation()} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:11,padding:'13px 32px',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 8px 20px rgba(37,99,235,.3)'}}>Select PDF file</button>
            <p style={{fontSize:12,color:'#d4d4d8',marginTop:14}}>Files never leave your device · 100% free</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
            {['Drag & resize all objects','Inline text editing','Transparent signatures','8 shape types','Adjustable highlight opacity','20 fonts','Bold / Italic / Underline','Full undo / redo','Keyboard shortcuts','Free forever'].map(f=>(
              <span key={f} style={{padding:'5px 12px',background:'#f4f4f5',borderRadius:20,fontSize:13,color:'#52525b',fontWeight:500}}>{f}</span>
            ))}
          </div>
        </div>
      </div>
      <input id="fi" type="file" accept=".pdf,application/pdf" style={{display:'none'}} onChange={e=>loadPdf(e.target.files[0])}/>
    </div>
  );

  /* ─── EDITOR ─── */
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif",background:'#fff',overflow:'hidden'}}>
      <style>{`
        @import url('${GF}');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{overflow:hidden}
        .tbtn{background:none;border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;border-radius:10px;transition:all .1s;font-family:inherit;position:relative}
        .tbtn:hover{background:#f4f4f5}
        .tbtn.on{background:#eff4ff;color:#2563eb}
        .tbtn .tl{font-size:9px;font-weight:500;letter-spacing:.2px;line-height:1}
        .tbtn .sc{position:absolute;top:3px;right:4px;font-size:8px;color:#a1a1aa;background:#f4f4f5;border-radius:3px;padding:0 3px;line-height:1.3}
        .tbtn.on .sc{background:#bfdbfe;color:#1d4ed8}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#d4d4d8;border-radius:3px}
        .panel-section{padding-bottom:14px;margin-bottom:14px;border-bottom:1px solid #f4f4f5}
        .panel-section:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
        .panel-label{font-size:10.5px;font-weight:600;color:#a1a1aa;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{height:52,borderBottom:'1px solid #e4e4e7',display:'flex',alignItems:'center',padding:'0 12px',gap:8,flexShrink:0,background:'#fff',zIndex:50}}>
        <Link href="/" style={{fontWeight:700,fontSize:18,letterSpacing:'-.4px',color:'#0a0a0a',textDecoration:'none',flexShrink:0}}>breklo<span style={{color:'#2563eb'}}>.</span></Link>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <div style={{display:'flex',alignItems:'center',gap:6,flex:1,minWidth:0}}>
          <span style={{width:22,height:26,background:'#fee2e2',borderRadius:4,display:'grid',placeItems:'center',flexShrink:0}}><span style={{fontSize:7,fontWeight:800,color:'#b91c1c'}}>PDF</span></span>
          <span style={{fontSize:13,fontWeight:500,color:'#18181b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{file.name}</span>
        </div>
        {[[undo,!canUndo,I.undo,'Undo'],[redo,!canRedo,I.redo,'Redo']].map(([fn,dis,ic,t],i)=>(
          <button key={i} onClick={fn} disabled={dis} title={t} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:dis?'default':'pointer',color:dis?'#d4d4d8':'#52525b',flexShrink:0}}>
            <Ic d={ic} size={13}/>
          </button>
        ))}
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <div style={{display:'flex',alignItems:'center',gap:3,flexShrink:0}}>
          <button onClick={()=>setZoom(z=>Math.max(0.4,+(z-.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
          <span style={{fontSize:12,color:'#52525b',minWidth:36,textAlign:'center',fontWeight:500}}>{Math.round(zoom*100)}%</span>
          <button onClick={()=>setZoom(z=>Math.min(3,+(z+.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
        </div>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <div style={{display:'flex',alignItems:'center',gap:5,flexShrink:0,fontSize:12.5,color:'#52525b',fontWeight:500}}>
          <button onClick={()=>setCurPage(p=>Math.max(1,p-1))} disabled={curPage===1} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:curPage===1?'default':'pointer',color:curPage===1?'#d4d4d8':'#52525b',fontSize:12}}>‹</button>
          <span>{curPage}/{numPages}</span>
          <button onClick={()=>setCurPage(p=>Math.min(numPages,p+1))} disabled={curPage===numPages} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:curPage===numPages?'default':'pointer',color:curPage===numPages?'#d4d4d8':'#52525b',fontSize:12}}>›</button>
        </div>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <button onClick={()=>{if(confirm('Discard changes and open a new file?')){setFile(null);setPages({});pdfjsDoc.current=null;setNumPages(0);}}} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,padding:'0 10px',height:30,fontSize:12,fontWeight:500,cursor:'pointer',color:'#52525b',fontFamily:'inherit',display:'flex',alignItems:'center',gap:4,flexShrink:0}}>
          <Ic d={I.close} size={11}/> New
        </button>
        <button onClick={savePdf} disabled={saving} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0 16px',height:34,display:'flex',alignItems:'center',gap:6,cursor:saving?'wait':'pointer',fontSize:13.5,fontWeight:600,fontFamily:'inherit',boxShadow:'0 2px 8px rgba(37,99,235,.3)',flexShrink:0}}>
          <Ic d={I.dl} size={13} sw={2.2}/>{saving?'Saving…':'Download'}
        </button>
      </header>

      <div style={{flex:1,display:'flex',overflow:'hidden'}}>

        {/* TOOLS */}
        <div style={{width:60,borderRight:'1px solid #e4e4e7',display:'flex',flexDirection:'column',alignItems:'center',padding:'8px 0',gap:1,flexShrink:0,background:'#fff',overflowY:'auto'}}>
          {TOOLS.map(t=>(
            <button key={t.id} className={`tbtn${tool===t.id?' on':''}`} onClick={()=>setTool(t.id)} title={`${t.label} (${t.short})`}
              style={{width:50,height:50,color:tool===t.id?'#2563eb':'#71717a'}}>
              <Ic d={t.icon} size={17}/>
              <span className="tl">{t.label}</span>
              <span className="sc">{t.short}</span>
            </button>
          ))}
        </div>

        {/* THUMBNAILS */}
        <div style={{width:82,borderRight:'1px solid #e4e4e7',overflowY:'auto',padding:'8px 5px',display:'flex',flexDirection:'column',gap:5,flexShrink:0,background:'#fafafa'}}>
          {Array.from({length:numPages},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setCurPage(n)} style={{background:'none',border:`2px solid ${curPage===n?'#2563eb':'#e4e4e7'}`,borderRadius:7,padding:3,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'border-color .12s'}}>
              <canvas ref={el=>{thumbRefs.current[n]=el;}} style={{borderRadius:3,display:'block',maxWidth:'100%'}}/>
              <span style={{fontSize:9,color:curPage===n?'#2563eb':'#a1a1aa',fontWeight:curPage===n?600:400}}>{n}</span>
            </button>
          ))}
        </div>

        {/* MAIN AREA */}
        <div style={{flex:1,overflow:'auto',background:'#525252',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:24,position:'relative'}}
          onClick={handleOverlayClick}>
          {loading && (
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(82,82,82,.7)',zIndex:100}}>
              <div style={{background:'#fff',borderRadius:14,padding:'20px 28px',fontSize:14,fontWeight:600,color:'#0a0a0a'}}>Loading PDF…</div>
            </div>
          )}
          <div ref={overlayWrapRef} style={{position:'relative',boxShadow:'0 8px 48px rgba(0,0,0,.5)',borderRadius:2,flexShrink:0,userSelect:'none'}}>
            <canvas ref={pdfCanvasRef} style={{display:'block',position:'relative',zIndex:1}}/>
            {canvasW>0 && (
              <DrawLayer paths={pd.paths||[]} scale={zoom} selectedId={selectedId} onSelectPath={setSelectedId} onDeletePath={deleteAnn}/>
            )}
            {canvasW>0 && <div style={{position:'absolute',inset:0,zIndex:25,pointerEvents:['text','sign','image','draw','highlight','shape','eraser'].includes(tool)?'none':'auto'}}>
              {(pd.objects||[]).map(o=>(
                <AnnObject key={o.id} ann={o} selected={selectedId===o.id} scale={zoom}
                  onSelect={setSelectedId} onUpdate={updateAnn} onDelete={deleteAnn} onDuplicate={duplicateAnn}/>
              ))}
            </div>}
            <canvas ref={liveCanvasRef}
              style={{position:'absolute',inset:0,zIndex:30,cursor:activeTool?.cursor||'default',pointerEvents:['text','sign','image','select'].includes(tool)?'none':'auto'}}
              onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
              onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{width:230,borderLeft:'1px solid #e4e4e7',background:'#fff',padding:'14px 12px',flexShrink:0,overflowY:'auto',display:'flex',flexDirection:'column'}}>

          {/* Active tool */}
          <div className="panel-section">
            <div className="panel-label">Active tool</div>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 11px',background:'#eff4ff',borderRadius:8,border:'1px solid #bfdbfe'}}>
              <span style={{color:'#2563eb'}}><Ic d={activeTool?.icon} size={14}/></span>
              <span style={{fontSize:13,fontWeight:600,color:'#1d4ed8'}}>{activeTool?.label}</span>
              <span style={{marginLeft:'auto',fontSize:10,background:'#bfdbfe',color:'#1d4ed8',padding:'2px 6px',borderRadius:4,fontWeight:600,fontFamily:'monospace'}}>{activeTool?.short}</span>
            </div>
          </div>

          {/* HIGHLIGHT settings */}
          {tool==='highlight' && (
            <div className="panel-section">
              <div className="panel-label">Highlight color</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>
                {HIGHLIGHT_COLORS.map(c=>(
                  <button key={c} onClick={()=>setHlColor(c)} style={{width:24,height:24,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:hlColor===c?`0 0 0 2px #fff,0 0 0 4px ${c}`:'inset 0 0 0 1px rgba(0,0,0,.1)',transform:hlColor===c?'scale(1.15)':'scale(1)',transition:'all .12s'}}/>
                ))}
              </div>
              <div className="panel-label" style={{marginTop:6}}>Opacity: {Math.round(hlOpacity*100)}%</div>
              <input type="range" min="0.1" max="1" step="0.05" value={hlOpacity} onChange={e=>setHlOpacity(parseFloat(e.target.value))} style={{width:'100%',accentColor:'#2563eb'}}/>
              <div style={{marginTop:8,padding:'10px 12px',borderRadius:7,background:hlColor + Math.round(hlOpacity*255).toString(16).padStart(2,'0'),fontSize:12,color:'#0a0a0a',fontWeight:500,textAlign:'center'}}>Sample highlight</div>
            </div>
          )}

          {/* SHAPE settings */}
          {tool==='shape' && (
            <div className="panel-section">
              <div className="panel-label">Shape</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:5,marginBottom:10}}>
                {SHAPES.map(s=>(
                  <button key={s.id} onClick={()=>setShape(s.id)} title={s.label}
                    style={{aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:7,border:`1.5px solid ${shape===s.id?'#2563eb':'#e4e4e7'}`,background:shape===s.id?'#eff4ff':'#fff',color:shape===s.id?'#2563eb':'#71717a',cursor:'pointer'}}>
                    <Ic d={s.icon} size={16}/>
                  </button>
                ))}
              </div>
              <label style={{display:'flex',alignItems:'center',gap:8,fontSize:12.5,color:'#52525b',cursor:'pointer',marginBottom:8}}>
                <input type="checkbox" checked={shapeFill} onChange={e=>setShapeFill(e.target.checked)}/>
                Fill shape
              </label>
              {shapeFill && (
                <>
                  <div className="panel-label" style={{marginTop:6}}>Fill opacity: {Math.round(shapeFillOpacity*100)}%</div>
                  <input type="range" min="0.05" max="1" step="0.05" value={shapeFillOpacity} onChange={e=>setSFO(parseFloat(e.target.value))} style={{width:'100%',accentColor:'#2563eb'}}/>
                </>
              )}
            </div>
          )}

          {/* Color (for other tools) */}
          {(['draw','shape','text'].includes(tool) || (selObj && selObj.type!=='highlight')) && (
            <div className="panel-section">
              <div className="panel-label">Color</div>
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
          )}

          {/* Line width */}
          {['draw','shape','eraser'].includes(tool) && (
            <div className="panel-section">
              <div className="panel-label">{tool==='eraser'?'Eraser size':'Line: '+lineWidth+'px'}</div>
              {tool!=='eraser' && <input type="range" min="0.5" max="20" step=".5" value={lineWidth} onChange={e=>{const v=parseFloat(e.target.value);setLW(v);if(selectedId)updateAnn(selectedId,{lineWidth:v});}} style={{width:'100%',accentColor:'#2563eb'}}/>}
            </div>
          )}

          {/* Text settings */}
          {(tool==='text' || selObj?.type==='text') && (
            <div className="panel-section">
              <div className="panel-label">Font size: {selObj?.fontSize||fontSize}px</div>
              <input type="range" min="8" max="120" value={selObj?.fontSize||fontSize} onChange={e=>{const v=parseInt(e.target.value);setFontSize(v);if(selectedId)updateAnn(selectedId,{fontSize:v});}} style={{width:'100%',accentColor:'#2563eb',marginBottom:10}}/>
              <div className="panel-label">Font family</div>
              <select value={selObj?.font||font} onChange={e=>{setFont(e.target.value);if(selectedId)updateAnn(selectedId,{font:e.target.value});}}
                style={{width:'100%',padding:'7px 9px',border:'1px solid #e4e4e7',borderRadius:7,fontSize:13,fontFamily:'inherit',outline:'none',background:'#fff',cursor:'pointer',marginBottom:10}}>
                {FONTS.map(f=><option key={f.l} value={f.v}>{f.l}</option>)}
              </select>
              <div style={{display:'flex',gap:5}}>
                {[
                  ['B',bold,setBold,'bold',{fontWeight:700,fontFamily:'serif'}],
                  ['I',italic,setItalic,'italic',{fontStyle:'italic',fontFamily:'serif'}],
                  ['U',underline,setUL,'underline',{textDecoration:'underline',fontFamily:'serif'}],
                ].map(([lbl,val,set,prop,style])=>(
                  <button key={lbl} onClick={()=>{const v=!val;set(v);if(selectedId)updateAnn(selectedId,{[prop]:v});}}
                    style={{flex:1,padding:'7px',borderRadius:7,border:`1.5px solid ${val?'#2563eb':'#e4e4e7'}`,background:val?'#eff4ff':'#fff',color:val?'#1d4ed8':'#71717a',cursor:'pointer',fontSize:15,...style}}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selected object info */}
          {selObj && (
            <div className="panel-section">
              <div className="panel-label">Selected</div>
              <div style={{background:'#fafafa',borderRadius:8,padding:'10px 12px',border:'1px solid #e4e4e7',marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <span style={{fontSize:12.5,fontWeight:600,color:'#0a0a0a',textTransform:'capitalize'}}>{(selObj.shape||selObj.type||'object').replace('-',' ')}</span>
                  {selObj.w && <span style={{fontSize:11,color:'#9ca3af',fontFamily:'monospace'}}>{Math.round(selObj.w)}×{Math.round(selObj.h||0)}</span>}
                </div>
                {/* Opacity for highlight */}
                {selObj.type==='highlight' && (
                  <>
                    <div style={{fontSize:11,color:'#71717a',marginTop:8}}>Opacity: {Math.round((selObj.opacity??0.35)*100)}%</div>
                    <input type="range" min="0.05" max="1" step="0.05" value={selObj.opacity??0.35} onChange={e=>updateAnn(selObj.id,{opacity:parseFloat(e.target.value)})} style={{width:'100%',accentColor:'#2563eb',marginTop:3}}/>
                  </>
                )}
                {/* Fill opacity for shapes */}
                {selObj.type==='shape' && selObj.fill && (
                  <>
                    <div style={{fontSize:11,color:'#71717a',marginTop:8}}>Fill opacity: {Math.round((selObj.fillOpacity??0.2)*100)}%</div>
                    <input type="range" min="0.05" max="1" step="0.05" value={selObj.fillOpacity??0.2} onChange={e=>updateAnn(selObj.id,{fillOpacity:parseFloat(e.target.value)})} style={{width:'100%',accentColor:'#2563eb',marginTop:3}}/>
                  </>
                )}
                {/* Fill toggle for shapes */}
                {selObj.type==='shape' && (
                  <label style={{display:'flex',alignItems:'center',gap:7,fontSize:12,color:'#52525b',cursor:'pointer',marginTop:8}}>
                    <input type="checkbox" checked={!!selObj.fill} onChange={e=>updateAnn(selObj.id,{fill:e.target.checked})}/>
                    Filled
                  </label>
                )}
              </div>
              <div style={{display:'flex',gap:5}}>
                <button onClick={()=>duplicateAnn(selObj.id)} style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid #e4e4e7',background:'#fff',color:'#52525b',fontSize:11.5,fontWeight:500,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:3}}><Ic d={I.copy} size={11}/> Duplicate</button>
                <button onClick={()=>deleteAnn(selObj.id)} style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid #fecaca',background:'#fff1f2',color:'#b91c1c',fontSize:11.5,fontWeight:500,cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:3}}><Ic d={I.trash} size={11}/> Delete</button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="panel-section">
            <div className="panel-label">Page {curPage}</div>
            <div style={{fontSize:12,color:'#71717a',lineHeight:1.6}}>
              Objects: <b style={{color:'#0a0a0a'}}>{pd.objects?.length||0}</b><br/>
              Paths: <b style={{color:'#0a0a0a'}}>{pd.paths?.length||0}</b><br/>
              History: <b style={{color:'#0a0a0a'}}>{histRef.current.length}</b> steps
            </div>
          </div>

          {/* Clear */}
          {((pd.objects?.length||0)+(pd.paths?.length||0))>0 && (
            <button onClick={()=>{if(confirm('Clear all annotations on this page?')){histRef.current.push(snapshot());redoRef.current=[];setPages(p=>({...p,[curPage]:{objects:[],paths:[]}}));setSelectedId(null);}}}
              style={{padding:'8px',borderRadius:8,border:'1px solid #fecaca',background:'#fff1f2',color:'#b91c1c',fontSize:12.5,fontWeight:500,cursor:'pointer',fontFamily:'inherit',marginBottom:14}}>
              Clear this page
            </button>
          )}

          {/* Shortcuts */}
          <div className="panel-section">
            <div className="panel-label">Shortcuts</div>
            {[['⌘Z','Undo'],['⌘Y','Redo'],['⌘S','Download'],['⌘D','Duplicate'],['Del','Delete'],['Esc','Deselect'],['V/T/D/H/S','Tools']].map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4,fontSize:11.5,color:'#71717a'}}>
                <kbd style={{background:'#f4f4f5',border:'1px solid #e4e4e7',borderRadius:4,padding:'1px 5px',fontFamily:'monospace',fontSize:10}}>{k}</kbd>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <input id="img-input" type="file" accept="image/*" style={{display:'none'}} onChange={e=>addImage(e.target.files[0])}/>
      {showSign && <SignModal onClose={()=>setShowSign(false)} onApply={applySign}/>}
    </div>
  );
}
