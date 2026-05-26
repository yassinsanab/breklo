'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

/* ─── FONTS ─────────────────────────────────────────────── */
const GF='https://fonts.googleapis.com/css2?family=Dancing+Script&family=Pacifico&family=Lobster&family=Sacramento&family=Great+Vibes&family=Montserrat:wght@400;600;700&family=Oswald&family=Raleway:wght@400;600&family=Playfair+Display&family=Roboto+Slab&display=swap';
const FONTS=[
  {l:'Inter',v:'Inter,sans-serif'},{l:'Georgia',v:'Georgia,serif'},{l:'Times New Roman',v:'"Times New Roman",serif'},
  {l:'Courier New',v:'"Courier New",monospace'},{l:'Verdana',v:'Verdana,sans-serif'},{l:'Impact',v:'Impact,sans-serif'},
  {l:'Trebuchet MS',v:'"Trebuchet MS",sans-serif'},{l:'Palatino',v:'"Palatino Linotype",serif'},
  {l:'Garamond',v:'Garamond,serif'},{l:'Comic Sans',v:'"Comic Sans MS",cursive'},
  {l:'Montserrat',v:'Montserrat,sans-serif'},{l:'Oswald',v:'Oswald,sans-serif'},{l:'Raleway',v:'Raleway,sans-serif'},
  {l:'Playfair',v:'"Playfair Display",serif'},{l:'Roboto Slab',v:'"Roboto Slab",serif'},
  {l:'Dancing Script',v:'"Dancing Script",cursive'},{l:'Pacifico',v:'Pacifico,cursive'},
  {l:'Lobster',v:'Lobster,cursive'},{l:'Sacramento',v:'Sacramento,cursive'},{l:'Great Vibes',v:'"Great Vibes",cursive'},
];
const COLORS=['#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#db2777','#0891b2','#0a0a0a','#64748b','#f59e0b','#ea580c','#ec4899'];
const HL_COLORS=['#fde047','#86efac','#fda4af','#93c5fd','#c4b5fd','#fdba74'];
const SHAPES=[
  {id:'rectangle',l:'Rect'},{id:'circle',l:'Circle'},{id:'ellipse',l:'Ellipse'},
  {id:'triangle',l:'Triangle'},{id:'line',l:'Line'},{id:'arrow',l:'Arrow'},
];

const Ic=({d,size=17,sw=1.8})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{[].concat(d).map((p,i)=><path key={i} d={p}/>)}</svg>;

let _uid=0; const uid=()=>`a${++_uid}_${Date.now()}`;

/* ════════════════════════════════════════════════════════════ */
/*  SIGN MODAL                                                 */
/* ════════════════════════════════════════════════════════════ */
function SignModal({onClose,onApply}){
  const cv=useRef(null); const dr=useRef(false);
  const [mode,setMode]=useState('draw');
  const [text,setText]=useState('');
  const [font,setFont]=useState(FONTS[16].v);
  const [col,setCol]=useState('#1d4ed8');

  function init(){const c=cv.current;if(!c)return;c.width=480;c.height=160;const x=c.getContext('2d');x.clearRect(0,0,480,160);x.strokeStyle=col;x.lineWidth=3;x.lineCap='round';x.lineJoin='round';}
  useEffect(init,[]);
  useEffect(()=>{const c=cv.current;if(!c)return;const x=c.getContext('2d');x.strokeStyle=col;},[col]);

  function pos(e){const r=cv.current.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)*(480/r.width),y:(t.clientY-r.top)*(160/r.height)};}
  function dn(e){e.preventDefault();dr.current=true;const p=pos(e);cv.current.getContext('2d').beginPath();cv.current.getContext('2d').moveTo(p.x,p.y);}
  function mv(e){if(!dr.current)return;e.preventDefault();const p=pos(e);const x=cv.current.getContext('2d');x.lineTo(p.x,p.y);x.stroke();}
  function up(){dr.current=false;}

  function apply(){
    if(mode==='draw'){onApply({type:'sign-img',dataUrl:cv.current.toDataURL('image/png')});}
    else if(text.trim()){onApply({type:'sign-text',text:text.trim(),font,color:col});}
    onClose();
  }

  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:24}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:540,boxShadow:'0 32px 80px rgba(0,0,0,.3)'}}>
        <div style={{padding:'20px 24px 0',display:'flex',justifyContent:'space-between'}}>
          <h3 style={{font:'700 18px/1 Inter,sans-serif',margin:0}}>Create signature</h3>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#71717a'}}><Ic d="M18 6L6 18M6 6l12 12" size={20}/></button>
        </div>
        <div style={{display:'flex',gap:4,padding:'12px 24px 0'}}>
          {[['draw','✍ Draw'],['type','T Type']].map(([id,lb])=>(
            <button key={id} onClick={()=>setMode(id)} style={{padding:'7px 16px',borderRadius:8,fontSize:14,fontWeight:500,cursor:'pointer',border:`1.5px solid ${mode===id?'#bfdbfe':'transparent'}`,background:mode===id?'#eff4ff':'transparent',color:mode===id?'#1d4ed8':'#71717a',fontFamily:'inherit'}}>{lb}</button>
          ))}
        </div>
        <div style={{padding:'12px 24px'}}>
          {mode==='draw'?(
            <div>
              <div style={{position:'relative',marginBottom:10}}>
                <div style={{position:'absolute',inset:0,borderRadius:12,background:'repeating-conic-gradient(#eee 0% 25%,#fff 0% 50%) 0 0/16px 16px',opacity:.6}}/>
                <canvas ref={cv} style={{width:'100%',height:160,border:'1.5px dashed #d4d4d8',borderRadius:12,cursor:'crosshair',display:'block',touchAction:'none',position:'relative'}}
                  onMouseDown={dn} onMouseMove={mv} onMouseUp={up} onMouseLeave={up}
                  onTouchStart={dn} onTouchMove={mv} onTouchEnd={up}/>
              </div>
              <div style={{display:'flex',gap:10,alignItems:'center'}}>
                <div style={{display:'flex',gap:4}}>{['#0a0a0a','#1d4ed8','#dc2626'].map(c=><button key={c} onClick={()=>setCol(c)} style={{width:22,height:22,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:col===c?`0 0 0 2px #fff,0 0 0 3px ${c}`:'none'}}/>)}</div>
                <button onClick={init} style={{fontSize:13,color:'#71717a',background:'none',border:'1px solid #e4e4e7',borderRadius:7,padding:'4px 10px',cursor:'pointer',fontFamily:'inherit'}}>Clear</button>
              </div>
            </div>
          ):(
            <div>
              <div style={{border:'1.5px solid #e4e4e7',borderRadius:12,padding:'12px',marginBottom:10,minHeight:64,display:'flex',alignItems:'center',justifyContent:'center',background:'repeating-conic-gradient(#f8f8f8 0% 25%,#fff 0% 50%) 0 0/12px 12px'}}>
                <span style={{fontFamily:font,fontSize:34,color:col}}>{text||'Your Signature'}</span>
              </div>
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your name…" style={{width:'100%',padding:'9px 14px',border:'1.5px solid #e4e4e7',borderRadius:9,fontSize:15,fontFamily:'inherit',outline:'none',marginBottom:10}}/>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>{[FONTS[16],FONTS[17],FONTS[18],FONTS[19],FONTS[15]].map(f=>(
                <button key={f.l} onClick={()=>setFont(f.v)} style={{padding:'5px 12px',borderRadius:7,border:`1.5px solid ${font===f.v?'#2563eb':'#e4e4e7'}`,background:font===f.v?'#eff4ff':'#fff',fontFamily:f.v,fontSize:14,cursor:'pointer',color:font===f.v?'#1d4ed8':'#52525b'}}>{f.l}</button>
              ))}</div>
            </div>
          )}
        </div>
        <div style={{padding:'0 24px 20px',display:'flex',justifyContent:'flex-end',gap:8}}>
          <button onClick={onClose} style={{padding:'9px 20px',borderRadius:9,border:'1px solid #e4e4e7',background:'#fff',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit',color:'#3f3f46'}}>Cancel</button>
          <button onClick={apply} style={{padding:'9px 22px',borderRadius:9,border:'none',background:'#2563eb',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Apply →</button>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*  TEXT ANNOTATION COMPONENT (uses hooks properly)            */
/* ════════════════════════════════════════════════════════════ */
function TextAnn({o,sel,zoom,rotStyle,startDrag,Handles,upd,del}){
  const [editing,setEditing]=useState(false);
  const [editVal,setEditVal]=useState(o.text);
  const editRef=useRef(null);

  useEffect(()=>{if(!editing)setEditVal(o.text);},[o.text,editing]);

  function commitEdit(){setEditing(false);if(editVal.trim())upd(o.id,{text:editVal});else del(o.id);}

  return(
    <div data-ann="1" onMouseDown={e=>{if(editing)return;startDrag(e);}}
      onDoubleClick={e=>{e.stopPropagation();setEditing(true);setTimeout(()=>editRef.current?.select(),50);}}
      style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,cursor:editing?'text':'move',outline:sel?'2px solid #2563eb':'none',outlineOffset:3,borderRadius:4,padding:'2px 4px',minWidth:40,userSelect:editing?'text':'none',zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
      {editing?(
        <textarea ref={editRef} value={editVal} onChange={e=>setEditVal(e.target.value)}
          onKeyDown={e=>{if(e.key==='Escape')commitEdit();if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();commitEdit();}}}
          onBlur={commitEdit} autoFocus
          style={{background:'rgba(255,255,255,.97)',border:'2px solid #2563eb',borderRadius:6,padding:'4px 8px',fontSize:(o.fontSize||18)*zoom,fontFamily:o.font,color:o.color,outline:'none',resize:'both',minWidth:100,lineHeight:1.4,fontWeight:o.bold?700:400,fontStyle:o.italic?'italic':'normal'}} rows={2}/>
      ):(
        <span style={{fontSize:(o.fontSize||18)*zoom,fontFamily:o.font,color:o.color,whiteSpace:'pre-wrap',lineHeight:1.4,fontWeight:o.bold?700:400,fontStyle:o.italic?'italic':'normal',pointerEvents:'none'}}>{o.text}</span>
      )}
      <Handles/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════ */
/*  MAIN EDITOR                                                */
/* ════════════════════════════════════════════════════════════ */
export default function EditPDF(){
  const [file,setFile]=useState(null);
  const [numPg,setNumPg]=useState(0);
  const [pg,setPg]=useState(1);
  const [zoom,setZoom]=useState(1.4);
  const [loading,setLoading]=useState(false);
  const [saving,setSaving]=useState(false);
  const [dragIn,setDragIn]=useState(false);

  const [tool,setTool]=useState('select');
  const [color,setColor]=useState('#2563eb');
  const [hlColor,setHlColor]=useState('#fde047');
  const [hlOpacity,setHlOp]=useState(0.4);
  const [lineW,setLineW]=useState(2.5);
  const [font,setFont]=useState(FONTS[0].v);
  const [fontSize,setFS]=useState(18);
  const [bold,setBold]=useState(false);
  const [italic,setItalic]=useState(false);
  const [shape,setShape]=useState('rectangle');
  const [selId,setSelId]=useState(null);
  const [showSign,setShowSign]=useState(false);

  // per-page: { [pgNum]: { objs: [], paths: [] } }
  const [data,setData]=useState({});
  const hist=useRef([]); const rdo=useRef([]);

  const pdfCv=useRef(null);
  const pdfjsDoc=useRef(null);
  const thumbs=useRef({});

  // PDF page dimensions (unscaled)
  const [baseW,setBaseW]=useState(0);
  const [baseH,setBaseH]=useState(0);

  // live drawing state
  const isDrawing=useRef(false);
  const livePts=useRef([]);
  const shapeOrig=useRef(null);
  const liveCv=useRef(null);

  useEffect(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href=GF;document.head.appendChild(l);return()=>{try{document.head.removeChild(l);}catch{}};},[]);

  /* ── Keyboard ── */
  useEffect(()=>{
    function k(e){
      const t=document.activeElement?.tagName;
      if(t==='INPUT'||t==='TEXTAREA')return;
      if((e.metaKey||e.ctrlKey)&&e.key==='z'){e.preventDefault();undo();}
      if((e.metaKey||e.ctrlKey)&&(e.key==='y'||(e.shiftKey&&e.key==='z'))){e.preventDefault();redo();}
      if((e.metaKey||e.ctrlKey)&&e.key==='s'){e.preventDefault();savePdf();}
      if(e.key==='Delete'||e.key==='Backspace'){if(selId)del(selId);}
      if(e.key==='Escape')setSelId(null);
    }
    window.addEventListener('keydown',k);
    return()=>window.removeEventListener('keydown',k);
  },[selId,data]);

  /* ── Data helpers ── */
  function gp(p){return data[p]||{objs:[],paths:[]};}
  function snap(){return JSON.parse(JSON.stringify(data));}
  function setpd(p,fn){hist.current.push(snap());rdo.current=[];setData(prev=>{const c=prev[p]||{objs:[],paths:[]};return{...prev,[p]:fn(c)};});}
  function undo(){if(!hist.current.length)return;rdo.current.push(snap());setData(hist.current.pop());setSelId(null);}
  function redo(){if(!rdo.current.length)return;hist.current.push(snap());setData(rdo.current.pop());setSelId(null);}

  function addObj(o){setpd(pg,d=>({...d,objs:[...d.objs,{id:uid(),...o}]}));}
  function addPath(p){setpd(pg,d=>({...d,paths:[...d.paths,{id:uid(),...p}]}));}
  function upd(id,ch){hist.current.push(snap());rdo.current=[];setData(prev=>{const d=prev[pg]||{objs:[],paths:[]};return{...prev,[pg]:{objs:d.objs.map(o=>o.id===id?{...o,...ch}:o),paths:d.paths.map(p=>p.id===id?{...p,...ch}:p)}};});}
  function del(id){setpd(pg,d=>({objs:d.objs.filter(o=>o.id!==id),paths:d.paths.filter(p=>p.id!==id)}));setSelId(null);}
  function dup(id){const d=gp(pg);const o=[...d.objs,...d.paths].find(x=>x.id===id);if(!o)return;const c={...o,id:uid(),x:(o.x||0)+15,y:(o.y||0)+15};if(c.points)c.points=c.points.map(p=>({x:p.x+15,y:p.y+15}));if(d.objs.find(x=>x.id===id))addObj(c);else addPath(c);setSelId(c.id);}

  /* ── Load PDF ── */
  async function loadPdf(f){
    if(!f||f.type!=='application/pdf')return;
    setLoading(true);setFile(f);setData({});setSelId(null);hist.current=[];rdo.current=[];setPg(1);
    try{
      const pdfjs=await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc=`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjsDoc.current=await pdfjs.getDocument({data:await f.arrayBuffer()}).promise;
      setNumPg(pdfjsDoc.current.numPages);
    }catch(e){alert('Could not open PDF.');}
    setLoading(false);
  }

  /* ── Render PDF ── */
  useEffect(()=>{
    if(!pdfjsDoc.current)return;
    pdfjsDoc.current.getPage(pg).then(page=>{
      const vp=page.getViewport({scale:zoom});
      const c=pdfCv.current;if(!c)return;
      c.width=vp.width;c.height=vp.height;
      // Store unscaled dimensions
      const vpBase=page.getViewport({scale:1});
      setBaseW(vpBase.width);setBaseH(vpBase.height);
      page.render({canvasContext:c.getContext('2d'),viewport:vp});
      // sync live canvas
      const lc=liveCv.current;if(lc){lc.width=vp.width;lc.height=vp.height;}
    });
  },[pg,zoom,numPg]);

  /* ── Thumbs ── */
  useEffect(()=>{
    if(!pdfjsDoc.current)return;
    for(let i=1;i<=numPg;i++){const c=thumbs.current[i];if(!c)continue;
      pdfjsDoc.current.getPage(i).then(p=>{const v=p.getViewport({scale:.13});c.width=v.width;c.height=v.height;p.render({canvasContext:c.getContext('2d'),viewport:v});});
    }
  },[numPg]);

  /* ── Get position in UNSCALED PDF coords ── */
  function getPos(e){
    const c=pdfCv.current;if(!c)return{x:0,y:0};
    const r=c.getBoundingClientRect();
    const t=e.touches?e.touches[0]:e;
    // Position relative to the displayed canvas, then convert to unscaled coords
    return{x:(t.clientX-r.left)/zoom, y:(t.clientY-r.top)/zoom};
  }

  /* ── Get position in SCALED canvas coords (for live drawing) ── */
  function getScaledPos(e){
    const c=pdfCv.current;if(!c)return{x:0,y:0};
    const r=c.getBoundingClientRect();
    const t=e.touches?e.touches[0]:e;
    return{x:t.clientX-r.left, y:t.clientY-r.top};
  }

  /* ═══ CLICK HANDLER — unified for all tools ═══ */
  function handleMainClick(e){
    // Only handle clicks on the background (not on objects)
    if(e.target.closest('[data-ann]'))return;

    const pos=getPos(e);

    // Deselect on any background click
    setSelId(null);

    if(tool==='text'){
      addObj({type:'text',x:pos.x,y:pos.y,text:'Text',color,font,fontSize,bold,italic,w:null,h:null});
      return;
    }
    if(tool==='sign'){
      setShowSign(true);
      window.__signPos=pos;
      return;
    }
    if(tool==='image'){
      window.__imgPos=pos;
      document.getElementById('img-input').click();
      return;
    }
  }

  /* ═══ DRAW on live canvas ═══ */
  function drawDown(e){
    if(['select','text','sign','image'].includes(tool))return;
    e.preventDefault();e.stopPropagation();
    isDrawing.current=true;
    const sp=getScaledPos(e);
    livePts.current=[sp];
    shapeOrig.current=sp;
  }
  function drawMove(e){
    if(!isDrawing.current)return;
    e.preventDefault();
    const sp=getScaledPos(e);
    livePts.current.push(sp);
    const c=liveCv.current;if(!c)return;
    const ctx=c.getContext('2d');
    ctx.clearRect(0,0,c.width,c.height);
    ctx.save();
    if(tool==='draw'){
      const pts=livePts.current;
      ctx.strokeStyle=color;ctx.lineWidth=lineW*zoom;ctx.lineCap='round';ctx.lineJoin='round';
      ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);
      for(let i=1;i<pts.length-1;i++) ctx.quadraticCurveTo(pts[i].x,pts[i].y,(pts[i].x+pts[i+1].x)/2,(pts[i].y+pts[i+1].y)/2);
      if(pts.length>1)ctx.lineTo(pts[pts.length-1].x,pts[pts.length-1].y);
      ctx.stroke();
    }else if(tool==='highlight'){
      const s=shapeOrig.current;
      ctx.globalAlpha=hlOpacity;ctx.fillStyle=hlColor;
      ctx.fillRect(s.x,s.y,sp.x-s.x,sp.y-s.y);
    }else if(tool==='shape'){
      const s=shapeOrig.current;
      const x=Math.min(s.x,sp.x),y=Math.min(s.y,sp.y),w=Math.abs(sp.x-s.x),h=Math.abs(sp.y-s.y);
      ctx.strokeStyle=color;ctx.lineWidth=lineW*zoom;ctx.lineCap='round';ctx.lineJoin='round';
      if(shape==='rectangle'){ctx.strokeRect(x,y,w,h);}
      else if(shape==='circle'){ctx.beginPath();ctx.arc(x+w/2,y+h/2,Math.min(w,h)/2,0,Math.PI*2);ctx.stroke();}
      else if(shape==='ellipse'){ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2);ctx.stroke();}
      else if(shape==='triangle'){ctx.beginPath();ctx.moveTo(x+w/2,y);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.stroke();}
      else if(shape==='line'){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(sp.x,sp.y);ctx.stroke();}
      else if(shape==='arrow'){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(sp.x,sp.y);ctx.stroke();
        const angle=Math.atan2(sp.y-s.y,sp.x-s.x);const hl=12*zoom;
        ctx.beginPath();ctx.moveTo(sp.x,sp.y);ctx.lineTo(sp.x-hl*Math.cos(angle-Math.PI/6),sp.y-hl*Math.sin(angle-Math.PI/6));ctx.moveTo(sp.x,sp.y);ctx.lineTo(sp.x-hl*Math.cos(angle+Math.PI/6),sp.y-hl*Math.sin(angle+Math.PI/6));ctx.stroke();
      }
    }else if(tool==='eraser'){
      const pts=livePts.current;
      ctx.globalCompositeOperation='destination-out';ctx.lineWidth=20*zoom;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();
    }
    ctx.restore();
  }
  function drawUp(e){
    if(!isDrawing.current)return;
    isDrawing.current=false;
    const sp=getScaledPos(e);
    const c=liveCv.current;if(c)c.getContext('2d').clearRect(0,0,c.width,c.height);

    if(tool==='draw'&&livePts.current.length>=2){
      // Convert scaled points to unscaled
      const pts=livePts.current.map(p=>({x:p.x/zoom,y:p.y/zoom}));
      addPath({points:pts,color,lineWidth:lineW,opacity:1});
    }else if(tool==='highlight'){
      const s=shapeOrig.current;
      const w=(sp.x-s.x)/zoom,h=(sp.y-s.y)/zoom;
      if(Math.abs(w)<3||Math.abs(h)<3)return;
      const x=Math.min(s.x,sp.x)/zoom,y=Math.min(s.y,sp.y)/zoom;
      addObj({type:'highlight',x,y,w:Math.abs(w),h:Math.abs(h),color:hlColor,opacity:hlOpacity});
    }else if(tool==='shape'){
      const s=shapeOrig.current;
      const w=(sp.x-s.x)/zoom,h=(sp.y-s.y)/zoom;
      if(Math.abs(w)<3||Math.abs(h)<3)return;
      const x=Math.min(s.x,sp.x)/zoom,y=Math.min(s.y,sp.y)/zoom;
      addObj({type:'shape',shape,x,y,w:Math.abs(w),h:Math.abs(h),color,lineWidth:lineW,rotate:0});
    }else if(tool==='eraser'){
      const pts=livePts.current.map(p=>({x:p.x/zoom,y:p.y/zoom}));
      setpd(pg,d=>({...d,paths:d.paths.filter(p=>!p.points?.some(pp=>pts.some(ep=>Math.hypot(ep.x-pp.x,ep.y-pp.y)<20)))}));
    }
    livePts.current=[];
  }

  /* ── Sign apply ── */
  function applySign(sig){
    const pos=window.__signPos||{x:60,y:60};
    if(sig.type==='sign-img') addObj({type:'sign-img',x:pos.x,y:pos.y,w:220,h:80,dataUrl:sig.dataUrl,rotate:0});
    else addObj({type:'sign-text',x:pos.x,y:pos.y,w:200,h:50,text:sig.text,font:sig.font,color:sig.color,rotate:0});
    setTool('select');
  }

  /* ── Image ── */
  function addImage(f){
    if(!f)return;
    const pos=window.__imgPos||{x:60,y:60};
    const r=new FileReader();
    r.onload=ev=>addObj({type:'image',x:pos.x,y:pos.y,w:200,h:150,dataUrl:ev.target.result,rotate:0});
    r.readAsDataURL(f);
    setTool('select');
  }

  /* ── Save PDF ── */
  async function savePdf(){
    if(!file)return;setSaving(true);
    try{
      const{PDFDocument,rgb,StandardFonts}=await import('pdf-lib');
      const buf=await file.arrayBuffer();const pdfd=await PDFDocument.load(buf);
      const hf=await pdfd.embedFont(StandardFonts.Helvetica);
      const hfb=await pdfd.embedFont(StandardFonts.HelveticaBold);
      function h2r(h){if(!h||h.length<7)return rgb(0,0,0);return rgb(parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255);}

      for(const[pnS,pd] of Object.entries(data)){
        const pn=parseInt(pnS);const page=pdfd.getPage(pn-1);
        const{width:pgW,height:pgH}=page.getSize();
        const sx=pgW/baseW,sy=pgH/baseH;
        // Paths
        for(const path of (pd.paths||[])){
          if(!path.points?.length)continue;const c=h2r(path.color);
          for(let i=0;i<path.points.length-1;i++){
            page.drawLine({start:{x:path.points[i].x*sx,y:pgH-path.points[i].y*sy},end:{x:path.points[i+1].x*sx,y:pgH-path.points[i+1].y*sy},thickness:(path.lineWidth||2.5)*Math.min(sx,sy),color:c});
          }
        }
        // Objects
        for(const o of(pd.objs||[])){
          if(o.type==='text'){
            const sz=(o.fontSize||18)*Math.min(sx,sy);
            (o.text||'').split('\n').forEach((line,i)=>{
              try{page.drawText(line,{x:o.x*sx,y:pgH-(o.y+i*(o.fontSize||18)*1.35+(o.fontSize||18))*sy,size:sz,font:o.bold?hfb:hf,color:h2r(o.color)});}catch{}
            });
          }else if(o.type==='highlight'){
            page.drawRectangle({x:o.x*sx,y:pgH-(o.y+o.h)*sy,width:o.w*sx,height:o.h*sy,color:h2r(o.color),opacity:o.opacity??0.35});
          }else if(o.type==='shape'){
            const c=h2r(o.color),lw=(o.lineWidth||2)*Math.min(sx,sy);
            const x=o.x*sx,y=pgH-(o.y+o.h)*sy,w=o.w*sx,h=o.h*sy;
            if(o.shape==='circle'||o.shape==='ellipse'){page.drawEllipse({x:x+w/2,y:y+h/2,xScale:w/2,yScale:h/2,borderColor:c,borderWidth:lw});}
            else if(o.shape==='line'||o.shape==='arrow'){page.drawLine({start:{x,y:y+h},end:{x:x+w,y},thickness:lw,color:c});}
            else{page.drawRectangle({x,y,width:w,height:h,borderColor:c,borderWidth:lw});}
          }else if(o.type==='sign-img'||o.type==='image'){
            try{const resp=await fetch(o.dataUrl);const ib=await resp.arrayBuffer();
              const img=o.dataUrl.startsWith('data:image/png')?await pdfd.embedPng(ib):await pdfd.embedJpg(ib);
              page.drawImage(img,{x:o.x*sx,y:pgH-(o.y+o.h)*sy,width:o.w*sx,height:o.h*sy});
            }catch{}
          }else if(o.type==='sign-text'){
            try{page.drawText(o.text||'',{x:o.x*sx,y:pgH-(o.y+o.h*.7)*sy,size:28*Math.min(sx,sy),font:hf,color:h2r(o.color||'#1d4ed8')});}catch{}
          }
        }
      }
      const bytes=await pdfd.save();
      const blob=new Blob([bytes],{type:'application/pdf'});
      const name=file.name.replace(/\.pdf$/i,'')+'-edited-by-breklo.pdf';
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
    }catch(e){console.error(e);alert('Save failed.');}
    setSaving(false);
  }

  const pd=gp(pg);
  const selObj=[...pd.objs,...pd.paths].find(o=>o.id===selId);

  /* ═══ UPLOAD SCREEN ═══ */
  if(!file)return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif",background:'#fff'}}>
      <style>{`@import url('${GF}')`}</style>
      <nav style={{height:56,borderBottom:'1px solid #e4e4e7',display:'flex',alignItems:'center',padding:'0 24px',justifyContent:'space-between'}}>
        <Link href="/" style={{fontWeight:700,fontSize:20,letterSpacing:'-.4px',color:'#0a0a0a',textDecoration:'none'}}>breklo<span style={{color:'#2563eb'}}>.</span></Link>
        <Link href="/" style={{fontSize:13,color:'#71717a',textDecoration:'none'}}>← All tools</Link>
      </nav>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 24px'}}>
        <div style={{textAlign:'center',maxWidth:560,width:'100%'}}>
          <div style={{width:68,height:68,background:'linear-gradient(135deg,#2563eb,#1d4ed8)',borderRadius:20,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',boxShadow:'0 12px 28px rgba(37,99,235,.3)'}}>
            <Ic d={['M4 7V5h16v2','M12 5v14','M9 19h6']} size={28} sw={2}/>
          </div>
          <h1 style={{fontSize:38,fontWeight:700,letterSpacing:'-.03em',color:'#0a0a0a',marginBottom:12}}>Edit PDF</h1>
          <p style={{fontSize:17,color:'#71717a',marginBottom:40,lineHeight:1.65,margin:'0 auto 40px',maxWidth:480}}>Add text, draw, sign, highlight, shapes and images. Drag and resize everything.</p>
          <div onDragOver={e=>{e.preventDefault();setDragIn(true);}} onDragLeave={()=>setDragIn(false)} onDrop={e=>{e.preventDefault();setDragIn(false);loadPdf(e.dataTransfer.files[0]);}} onClick={()=>document.getElementById('fi').click()}
            style={{border:`2px dashed ${dragIn?'#2563eb':'#d4d4d8'}`,borderRadius:20,padding:'52px 32px',textAlign:'center',background:dragIn?'#eff4ff':'#fafafa',cursor:'pointer',transition:'all .15s',marginBottom:24}}>
            <div style={{width:52,height:52,background:dragIn?'#2563eb':'#e4e4e7',borderRadius:14,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center',color:dragIn?'#fff':'#71717a',transition:'all .15s'}}><Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" size={22} sw={2}/></div>
            <p style={{fontWeight:600,fontSize:17,color:'#0a0a0a',marginBottom:6}}>Drop your PDF here</p>
            <p style={{fontSize:14,color:'#a1a1aa',marginBottom:24}}>or click to browse — up to 100 MB</p>
            <button onClick={e=>e.stopPropagation()} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:11,padding:'13px 32px',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 8px 20px rgba(37,99,235,.3)'}}>Select PDF file</button>
          </div>
        </div>
      </div>
      <input id="fi" type="file" accept=".pdf,application/pdf" style={{display:'none'}} onChange={e=>loadPdf(e.target.files[0])}/>
    </div>
  );

  /* ═══ EDITOR ═══ */
  return(
    <div style={{height:'100vh',display:'flex',flexDirection:'column',fontFamily:"'Inter','Helvetica Neue',Arial,sans-serif",background:'#fff',overflow:'hidden'}}>
      <style>{`@import url('${GF}');*{box-sizing:border-box;margin:0;padding:0}body{overflow:hidden}
        .tb{background:none;border:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;cursor:pointer;border-radius:10px;transition:all .1s;font-family:inherit;width:50px;height:48px}
        .tb:hover{background:#f4f4f5}.tb.on{background:#eff4ff;color:#2563eb}.tb .tl{font-size:9px;font-weight:500;letter-spacing:.2px}
        ::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:#d4d4d8;border-radius:3px}
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{height:50,borderBottom:'1px solid #e4e4e7',display:'flex',alignItems:'center',padding:'0 12px',gap:8,flexShrink:0,background:'#fff',zIndex:50}}>
        <Link href="/" style={{fontWeight:700,fontSize:18,letterSpacing:'-.4px',color:'#0a0a0a',textDecoration:'none',flexShrink:0}}>breklo<span style={{color:'#2563eb'}}>.</span></Link>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <div style={{display:'flex',alignItems:'center',gap:6,flex:1,minWidth:0}}>
          <span style={{width:22,height:26,background:'#fee2e2',borderRadius:4,display:'grid',placeItems:'center',flexShrink:0}}><span style={{fontSize:7,fontWeight:800,color:'#b91c1c'}}>PDF</span></span>
          <span style={{fontSize:13,fontWeight:500,color:'#18181b',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{file.name}</span>
        </div>
        <button onClick={undo} disabled={!hist.current.length} title="Undo" style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:hist.current.length?'pointer':'default',color:hist.current.length?'#52525b':'#d4d4d8'}}><Ic d="M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13" size={13}/></button>
        <button onClick={redo} disabled={!rdo.current.length} title="Redo" style={{background:'none',border:'1px solid #e4e4e7',borderRadius:7,width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',cursor:rdo.current.length?'pointer':'default',color:rdo.current.length?'#52525b':'#d4d4d8'}}><Ic d="M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13" size={13}/></button>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <button onClick={()=>setZoom(z=>Math.max(.4,+(z-.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
        <span style={{fontSize:12,color:'#52525b',minWidth:36,textAlign:'center',fontWeight:500}}>{Math.round(zoom*100)}%</span>
        <button onClick={()=>setZoom(z=>Math.min(3,+(z+.2).toFixed(1)))} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:6,width:26,height:26,cursor:'pointer',color:'#52525b',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <button onClick={()=>setPg(p=>Math.max(1,p-1))} disabled={pg===1} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:pg===1?'default':'pointer',color:pg===1?'#d4d4d8':'#52525b',fontSize:12}}>‹</button>
        <span style={{fontSize:12,color:'#52525b',fontWeight:500}}>{pg}/{numPg}</span>
        <button onClick={()=>setPg(p=>Math.min(numPg,p+1))} disabled={pg===numPg} style={{background:'none',border:'1px solid #e4e4e7',borderRadius:5,width:24,height:24,cursor:pg===numPg?'default':'pointer',color:pg===numPg?'#d4d4d8':'#52525b',fontSize:12}}>›</button>
        <div style={{width:1,height:20,background:'#e4e4e7'}}/>
        <button onClick={savePdf} disabled={saving} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'0 16px',height:34,display:'flex',alignItems:'center',gap:6,cursor:saving?'wait':'pointer',fontSize:13.5,fontWeight:600,fontFamily:'inherit',boxShadow:'0 2px 8px rgba(37,99,235,.3)',flexShrink:0}}>
          <Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={13} sw={2.2}/>{saving?'Saving…':'Download'}
        </button>
      </header>

      <div style={{flex:1,display:'flex',overflow:'hidden'}}>

        {/* ── TOOLS ── */}
        <div style={{width:58,borderRight:'1px solid #e4e4e7',display:'flex',flexDirection:'column',alignItems:'center',padding:'6px 0',gap:1,flexShrink:0,overflowY:'auto'}}>
          {[
            {id:'select',l:'Select',ic:'M4 4l7 18 3-7 7-3z'},
            {id:'text',l:'Text',ic:['M4 7V5h16v2','M12 5v14','M9 19h6']},
            {id:'draw',l:'Draw',ic:'M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9'},
            {id:'highlight',l:'Highlight',ic:['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2']},
            {id:'sign',l:'Sign',ic:['M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9','M3 21h18']},
            {id:'shape',l:'Shape',ic:'M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'},
            {id:'image',l:'Image',ic:['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z']},
            {id:'eraser',l:'Eraser',ic:['M20 20H7L3 16l9.5-9.5','M13 5l4 4']},
          ].map(t=>(
            <button key={t.id} className={`tb${tool===t.id?' on':''}`} onClick={()=>setTool(t.id)} title={t.l}
              style={{color:tool===t.id?'#2563eb':'#71717a'}}>
              <Ic d={t.ic} size={16}/><span className="tl">{t.l}</span>
            </button>
          ))}
          <div style={{width:32,height:1,background:'#e4e4e7',margin:'4px 0'}}/>
          {COLORS.slice(0,6).map(c=><button key={c} onClick={()=>setColor(c)} style={{width:18,height:18,borderRadius:'50%',background:c,border:'none',cursor:'pointer',outline:color===c?`3px solid ${c}`:'none',outlineOffset:2,margin:'2px 0',transform:color===c?'scale(1.2)':'scale(1)',transition:'all .12s'}}/>)}
        </div>

        {/* ── THUMBS ── */}
        <div style={{width:80,borderRight:'1px solid #e4e4e7',overflowY:'auto',padding:'6px 4px',display:'flex',flexDirection:'column',gap:4,flexShrink:0,background:'#fafafa'}}>
          {Array.from({length:numPg},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setPg(n)} style={{background:'none',border:`2px solid ${pg===n?'#2563eb':'#e4e4e7'}`,borderRadius:6,padding:2,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
              <canvas ref={el=>{thumbs.current[n]=el;}} style={{borderRadius:2,display:'block',maxWidth:'100%'}}/>
              <span style={{fontSize:9,color:pg===n?'#2563eb':'#a1a1aa',fontWeight:pg===n?600:400}}>{n}</span>
            </button>
          ))}
        </div>

        {/* ── MAIN ── */}
        <div style={{flex:1,overflow:'auto',background:'#525252',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:24,position:'relative'}}
          onClick={handleMainClick}>

          {loading&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(82,82,82,.7)',zIndex:100}}><div style={{background:'#fff',borderRadius:14,padding:'20px 28px',fontSize:14,fontWeight:600}}>Loading…</div></div>}

          <div style={{position:'relative',boxShadow:'0 8px 48px rgba(0,0,0,.5)',borderRadius:2,flexShrink:0,userSelect:'none'}}>
            {/* PDF canvas */}
            <canvas ref={pdfCv} style={{display:'block',zIndex:1}}/>

            {/* SVG paths */}
            {baseW>0&&(
              <svg style={{position:'absolute',inset:0,width:baseW*zoom,height:baseH*zoom,zIndex:10,pointerEvents:'none'}} overflow="visible">
                {(pd.paths||[]).map(p=>(
                  <g key={p.id}>
                    {/* Fat invisible hit area */}
                    <polyline points={p.points.map(pt=>`${pt.x*zoom},${pt.y*zoom}`).join(' ')}
                      fill="none" stroke="transparent" strokeWidth={Math.max(20,p.lineWidth*zoom+10)}
                      style={{pointerEvents:'stroke',cursor:'pointer'}}
                      onClick={e=>{e.stopPropagation();setSelId(p.id);}}/>
                    {/* Visible stroke */}
                    <polyline points={p.points.map(pt=>`${pt.x*zoom},${pt.y*zoom}`).join(' ')}
                      fill="none" stroke={p.color} strokeWidth={(p.lineWidth||2.5)*zoom}
                      strokeLinecap="round" strokeLinejoin="round" opacity={p.opacity||1} style={{pointerEvents:'none'}}/>
                    {selId===p.id&&(()=>{
                      const xs=p.points.map(pt=>pt.x*zoom),ys=p.points.map(pt=>pt.y*zoom);
                      return<rect x={Math.min(...xs)-4} y={Math.min(...ys)-4} width={Math.max(...xs)-Math.min(...xs)+8} height={Math.max(...ys)-Math.min(...ys)+8} fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3"/>;
                    })()}
                  </g>
                ))}
              </svg>
            )}

            {/* DOM objects */}
            {baseW>0&&(
              <div style={{position:'absolute',inset:0,width:baseW*zoom,height:baseH*zoom,zIndex:20,pointerEvents:'none'}}>
                {(pd.objs||[]).map(o=>{
                  const sel=selId===o.id;
                  const W=(o.w||200)*zoom;
                  const H=(o.h||60)*zoom;
                  const rotStyle=o.rotate?{transform:`rotate(${o.rotate}deg)`,transformOrigin:'center center'}:{};

                  /* ── Drag handler ── */
                  function startDrag(e){
                    if(e.target.dataset?.handle)return;
                    e.stopPropagation();
                    setSelId(o.id);
                    const sx=e.clientX-o.x*zoom,sy=e.clientY-o.y*zoom;
                    function mv(ev){upd(o.id,{x:(ev.clientX-sx)/zoom,y:(ev.clientY-sy)/zoom});}
                    function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
                    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);
                  }

                  /* ── Resize handler ── */
                  function startResize(corner,e){
                    e.stopPropagation();e.preventDefault();
                    const sx=e.clientX,sy=e.clientY;
                    const ow=o.w||200,oh=o.h||60,ox=o.x,oy=o.y;
                    function mv(ev){
                      const dx=(ev.clientX-sx)/zoom,dy=(ev.clientY-sy)/zoom;
                      let u={};
                      if(corner.includes('e'))u.w=Math.max(20,ow+dx);
                      if(corner.includes('s'))u.h=Math.max(20,oh+dy);
                      if(corner.includes('w')){u.x=ox+dx;u.w=Math.max(20,ow-dx);}
                      if(corner.includes('n')){u.y=oy+dy;u.h=Math.max(20,oh-dy);}
                      upd(o.id,u);
                    }
                    function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
                    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);
                  }

                  /* ── Rotate handler ── */
                  function startRotate(e){
                    e.stopPropagation();e.preventDefault();
                    const cx=(o.x+(o.w||200)/2)*zoom;
                    const rect=pdfCv.current.getBoundingClientRect();
                    const cy=(o.y+(o.h||60)/2)*zoom;
                    function mv(ev){
                      const mx=ev.clientX-rect.left-cx;
                      const my=ev.clientY-rect.top-cy;
                      const angle=Math.round(Math.atan2(my,mx)*180/Math.PI+90);
                      upd(o.id,{rotate:angle});
                    }
                    function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
                    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);
                  }

                  const handleS={position:'absolute',width:10,height:10,background:'#2563eb',border:'2px solid #fff',borderRadius:2,boxShadow:'0 1px 4px rgba(0,0,0,.3)',zIndex:10};

                  function Handles(){
                    if(!sel)return null;
                    return<>
                      {[['nw',{left:-5,top:-5},'nw-resize'],['ne',{right:-5,top:-5},'ne-resize'],['sw',{left:-5,bottom:-5},'sw-resize'],['se',{right:-5,bottom:-5},'se-resize']].map(([c,s,cur])=>
                        <div key={c} data-handle="1" onMouseDown={e=>startResize(c,e)} style={{...handleS,...s,cursor:cur}}/>
                      )}
                      {/* Rotate handle */}
                      <div style={{position:'absolute',top:-32,left:'50%',marginLeft:-6,display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <div data-handle="1" onMouseDown={startRotate} style={{width:14,height:14,borderRadius:'50%',background:'#2563eb',border:'2px solid #fff',cursor:'grab',boxShadow:'0 1px 4px rgba(0,0,0,.3)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <Ic d="M23 4v6h-6M23 10A10 10 0 0 0 4 6" size={8} sw={2.5}/>
                        </div>
                        <div style={{width:1,height:12,background:'#2563eb'}}/>
                      </div>
                      {/* Delete */}
                      <button data-handle="1" onMouseDown={e=>{e.stopPropagation();del(o.id);}} style={{position:'absolute',top:-8,right:-8,width:18,height:18,borderRadius:'50%',background:'#ef4444',border:'2px solid #fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.3)'}}>
                        <Ic d="M18 6L6 18M6 6l12 12" size={8} sw={3}/>
                      </button>
                    </>;
                  }

                  /* ── TEXT ── */
                  if(o.type==='text'){
                    return <TextAnn key={o.id} o={o} sel={sel} zoom={zoom} rotStyle={rotStyle} startDrag={startDrag} Handles={Handles} upd={upd} del={del}/>;
                  }

                  /* ── HIGHLIGHT ── */
                  if(o.type==='highlight'){
                    const opHex=Math.round((o.opacity??0.35)*255).toString(16).padStart(2,'0');
                    return(
                      <div key={o.id} data-ann="1" onMouseDown={startDrag}
                        style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',background:o.color+opHex,borderRadius:2,outline:sel?'2px solid #2563eb':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                        <Handles/>
                      </div>
                    );
                  }

                  /* ── SHAPE ── */
                  if(o.type==='shape'){
                    const sw=(o.lineWidth||2)*zoom;
                    return(
                      <div key={o.id} data-ann="1" onMouseDown={startDrag}
                        style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #2563eb':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                        <svg width={W} height={H} style={{display:'block',overflow:'visible',pointerEvents:'none'}}>
                          {o.shape==='rectangle'&&<rect x={sw/2} y={sw/2} width={W-sw} height={H-sw} stroke={o.color} strokeWidth={sw} fill="none"/>}
                          {o.shape==='circle'&&<circle cx={W/2} cy={H/2} r={Math.min(W,H)/2-sw/2} stroke={o.color} strokeWidth={sw} fill="none"/>}
                          {o.shape==='ellipse'&&<ellipse cx={W/2} cy={H/2} rx={W/2-sw/2} ry={H/2-sw/2} stroke={o.color} strokeWidth={sw} fill="none"/>}
                          {o.shape==='triangle'&&<polygon points={`${W/2},${sw/2} ${W-sw/2},${H-sw/2} ${sw/2},${H-sw/2}`} stroke={o.color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>}
                          {o.shape==='line'&&<line x1={0} y1={H/2} x2={W} y2={H/2} stroke={o.color} strokeWidth={sw} strokeLinecap="round"/>}
                          {o.shape==='arrow'&&<g><line x1={0} y1={H} x2={W} y2={0} stroke={o.color} strokeWidth={sw} strokeLinecap="round"/><polygon points={`${W},0 ${W-12*zoom},${6*zoom} ${W-6*zoom},${12*zoom}`} fill={o.color}/></g>}
                        </svg>
                        <Handles/>
                      </div>
                    );
                  }

                  /* ── SIGN-IMG / IMAGE ── */
                  if(o.type==='sign-img'||o.type==='image'){
                    return(
                      <div key={o.id} data-ann="1" onMouseDown={startDrag}
                        style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #2563eb':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                        <img src={o.dataUrl} style={{width:'100%',height:'100%',objectFit:'contain',pointerEvents:'none',display:'block'}} alt="" draggable={false}/>
                        <Handles/>
                      </div>
                    );
                  }

                  /* ── SIGN-TEXT ── */
                  if(o.type==='sign-text'){
                    return(
                      <div key={o.id} data-ann="1" onMouseDown={startDrag}
                        style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #2563eb':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',display:'flex',alignItems:'center',...rotStyle}}>
                        <span style={{fontFamily:o.font,fontSize:Math.min(W/4,H*.7),color:o.color||'#1d4ed8',pointerEvents:'none',whiteSpace:'nowrap'}}>{o.text}</span>
                        <Handles/>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}

            {/* Live drawing canvas — on TOP of everything */}
            <canvas ref={liveCv}
              style={{position:'absolute',inset:0,zIndex:30,cursor:['draw','highlight','shape','eraser'].includes(tool)?'crosshair':'default',pointerEvents:['draw','highlight','shape','eraser'].includes(tool)?'auto':'none'}}
              onMouseDown={drawDown} onMouseMove={drawMove} onMouseUp={drawUp} onMouseLeave={drawUp}
              onTouchStart={drawDown} onTouchMove={drawMove} onTouchEnd={drawUp}/>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={{width:220,borderLeft:'1px solid #e4e4e7',background:'#fff',padding:'12px 10px',flexShrink:0,overflowY:'auto',display:'flex',flexDirection:'column',gap:14}}>

          {/* Highlight settings */}
          {tool==='highlight'&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Highlight</div>
            <div style={{display:'flex',gap:5,marginBottom:8,flexWrap:'wrap'}}>{HL_COLORS.map(c=><button key={c} onClick={()=>setHlColor(c)} style={{width:24,height:24,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:hlColor===c?`0 0 0 2px #fff,0 0 0 3px ${c}`:'inset 0 0 0 1px rgba(0,0,0,.1)'}}/>)}</div>
            <div style={{fontSize:11,color:'#71717a',marginBottom:4}}>Opacity: {Math.round(hlOpacity*100)}%</div>
            <input type="range" min="0.1" max="1" step="0.05" value={hlOpacity} onChange={e=>setHlOp(parseFloat(e.target.value))} style={{width:'100%',accentColor:'#2563eb'}}/>
            <div style={{marginTop:8,padding:8,borderRadius:6,background:hlColor+Math.round(hlOpacity*255).toString(16).padStart(2,'0'),textAlign:'center',fontSize:12,color:'#333',fontWeight:500}}>Preview</div>
          </div>}

          {/* Shape settings */}
          {tool==='shape'&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Shape</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4}}>{SHAPES.map(s=><button key={s.id} onClick={()=>setShape(s.id)} style={{padding:'8px 4px',borderRadius:7,border:`1.5px solid ${shape===s.id?'#2563eb':'#e4e4e7'}`,background:shape===s.id?'#eff4ff':'#fff',color:shape===s.id?'#2563eb':'#71717a',cursor:'pointer',fontSize:11,fontWeight:500}}>{s.l}</button>)}</div>
          </div>}

          {/* Color */}
          <div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Color</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6}}>{COLORS.map(c=><button key={c} onClick={()=>{setColor(c);if(selId)upd(selId,{color:c});}} style={{width:22,height:22,borderRadius:'50%',background:c,border:'none',cursor:'pointer',boxShadow:color===c?`0 0 0 2px #fff,0 0 0 3px ${c}`:'none',transform:color===c?'scale(1.15)':'scale(1)',transition:'all .12s'}}/>)}</div>
            <div style={{display:'flex',alignItems:'center',gap:6}}><input type="color" value={color} onChange={e=>{setColor(e.target.value);if(selId)upd(selId,{color:e.target.value});}} style={{width:24,height:24,border:'1px solid #e4e4e7',borderRadius:5,cursor:'pointer',padding:2}}/><span style={{fontSize:11,color:'#71717a',fontFamily:'monospace'}}>{color}</span></div>
          </div>

          {/* Line width */}
          {['draw','shape'].includes(tool)&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Line: {lineW}px</div>
            <input type="range" min="0.5" max="20" step=".5" value={lineW} onChange={e=>setLineW(parseFloat(e.target.value))} style={{width:'100%',accentColor:'#2563eb'}}/>
          </div>}

          {/* Text settings */}
          {(tool==='text'||selObj?.type==='text')&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Font: {selObj?.fontSize||fontSize}px</div>
            <input type="range" min="8" max="96" value={selObj?.fontSize||fontSize} onChange={e=>{const v=parseInt(e.target.value);setFS(v);if(selId)upd(selId,{fontSize:v});}} style={{width:'100%',accentColor:'#2563eb',marginBottom:8}}/>
            <select value={selObj?.font||font} onChange={e=>{setFont(e.target.value);if(selId)upd(selId,{font:e.target.value});}} style={{width:'100%',padding:'6px 8px',border:'1px solid #e4e4e7',borderRadius:7,fontSize:12.5,fontFamily:'inherit',outline:'none',background:'#fff',cursor:'pointer',marginBottom:6}}>{FONTS.map(f=><option key={f.l} value={f.v}>{f.l}</option>)}</select>
            <div style={{display:'flex',gap:4}}>{[['B','bold',bold,setBold,{fontWeight:700}],['I','italic',italic,setItalic,{fontStyle:'italic'}]].map(([l,p,v,s,st])=><button key={l} onClick={()=>{s(!v);if(selId)upd(selId,{[p]:!v});}} style={{flex:1,padding:'6px',borderRadius:6,border:`1.5px solid ${v?'#2563eb':'#e4e4e7'}`,background:v?'#eff4ff':'#fff',color:v?'#1d4ed8':'#71717a',cursor:'pointer',fontSize:14,...st}}>{l}</button>)}</div>
          </div>}

          {/* Selected highlight opacity */}
          {selObj?.type==='highlight'&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Opacity: {Math.round((selObj.opacity??0.35)*100)}%</div>
            <input type="range" min="0.05" max="1" step="0.05" value={selObj.opacity??0.35} onChange={e=>upd(selId,{opacity:parseFloat(e.target.value)})} style={{width:'100%',accentColor:'#2563eb'}}/>
          </div>}

          {/* Selected rotation */}
          {selObj&&selObj.rotate!==undefined&&<div>
            <div style={{fontSize:10,fontWeight:600,color:'#a1a1aa',textTransform:'uppercase',letterSpacing:'.8px',marginBottom:6}}>Rotation: {selObj.rotate||0}°</div>
            <input type="range" min="-180" max="180" step="1" value={selObj.rotate||0} onChange={e=>upd(selId,{rotate:parseInt(e.target.value)})} style={{width:'100%',accentColor:'#2563eb'}}/>
            <button onClick={()=>upd(selId,{rotate:0})} style={{marginTop:4,fontSize:11,color:'#71717a',background:'none',border:'1px solid #e4e4e7',borderRadius:6,padding:'3px 10px',cursor:'pointer',fontFamily:'inherit'}}>Reset</button>
          </div>}

          {/* Selected actions */}
          {selObj&&<div style={{display:'flex',gap:5}}>
            <button onClick={()=>dup(selId)} style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid #e4e4e7',background:'#fff',color:'#52525b',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Duplicate</button>
            <button onClick={()=>del(selId)} style={{flex:1,padding:'7px',borderRadius:7,border:'1px solid #fecaca',background:'#fff1f2',color:'#b91c1c',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Delete</button>
          </div>}

          {/* Stats */}
          <div style={{fontSize:11.5,color:'#9ca3af',lineHeight:1.7}}>
            Objects: <b style={{color:'#0a0a0a'}}>{pd.objs?.length||0}</b> · Paths: <b style={{color:'#0a0a0a'}}>{pd.paths?.length||0}</b>
          </div>
        </div>
      </div>

      <input id="img-input" type="file" accept="image/*" style={{display:'none'}} onChange={e=>addImage(e.target.files[0])}/>
      {showSign&&<SignModal onClose={()=>setShowSign(false)} onApply={applySign}/>}
    </div>
  );
}
