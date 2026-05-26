'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

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
const COLORS=['#ffffff','#0a0a0a','#2563eb','#dc2626','#16a34a','#d97706','#7c3aed','#db2777','#0891b2','#64748b','#f59e0b','#ea580c'];
const HL_COLORS=['#fde047','#86efac','#fda4af','#93c5fd','#c4b5fd','#fdba74'];
const SHAPES=[{id:'rectangle',l:'Rect'},{id:'circle',l:'Circle'},{id:'ellipse',l:'Ellipse'},{id:'triangle',l:'Tri'},{id:'line',l:'Line'},{id:'arrow',l:'Arrow'}];

const Ic=({d,size=17,sw=1.5})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{[].concat(d).map((p,i)=><path key={i} d={p}/>)}</svg>;
let _uid=0;const uid=()=>`a${++_uid}_${Date.now()}`;

/* ─── SIGN MODAL — 2x canvas, clean Apple style ──────────── */
function SignModal({onClose,onApply}){
  const cv=useRef(null);const dr=useRef(false);
  const [mode,setMode]=useState('draw');
  const [text,setText]=useState('');
  const [font,setFont]=useState(FONTS[16].v);
  const [col,setCol]=useState('#0a0a0a');
  const [thick,setThick]=useState(3);

  function init(){const c=cv.current;if(!c)return;
    c.width=960;c.height=320; // 2x resolution for crisp signatures
    const x=c.getContext('2d');x.clearRect(0,0,960,320);
    x.strokeStyle=col;x.lineWidth=thick*2;x.lineCap='round';x.lineJoin='round';}
  useEffect(init,[]);
  useEffect(()=>{const c=cv.current;if(!c)return;const x=c.getContext('2d');x.strokeStyle=col;x.lineWidth=thick*2;},[col,thick]);

  function pos(e){const r=cv.current.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)*(960/r.width),y:(t.clientY-r.top)*(320/r.height)};}
  function dn(e){e.preventDefault();dr.current=true;const p=pos(e);const x=cv.current.getContext('2d');x.beginPath();x.moveTo(p.x,p.y);}
  function mv(e){if(!dr.current)return;e.preventDefault();const p=pos(e);const x=cv.current.getContext('2d');x.lineTo(p.x,p.y);x.stroke();}
  function up(){dr.current=false;}

  function apply(){
    if(mode==='draw')onApply({type:'sign-img',dataUrl:cv.current.toDataURL('image/png')});
    else if(text.trim())onApply({type:'sign-text',text:text.trim(),font,color:col});
    onClose();
  }

  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:500,display:'flex',alignItems:'center',justifyContent:'center',padding:24,backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)'}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:520,boxShadow:'0 24px 64px rgba(0,0,0,.15)'}}>
        <div style={{padding:'20px 24px 16px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #f0f0f0'}}>
          <span style={{fontSize:16,fontWeight:600,color:'#1d1d1f',letterSpacing:'-.02em'}}>Signature</span>
          <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:'#86868b',display:'flex',padding:4,borderRadius:6}} onMouseEnter={e=>e.currentTarget.style.background='#f5f5f7'} onMouseLeave={e=>e.currentTarget.style.background='none'}><Ic d="M18 6L6 18M6 6l12 12" size={18}/></button>
        </div>

        <div style={{display:'flex',gap:0,padding:'0',borderBottom:'1px solid #f0f0f0'}}>
          {[['draw','Draw'],['type','Type']].map(([id,lb])=>(
            <button key={id} onClick={()=>setMode(id)} style={{flex:1,padding:'12px 0',fontSize:13,fontWeight:500,cursor:'pointer',border:'none',borderBottom:`2px solid ${mode===id?'#0071e3':'transparent'}`,background:'none',color:mode===id?'#0071e3':'#86868b',fontFamily:'inherit',transition:'all .15s'}}>{lb}</button>
          ))}
        </div>

        <div style={{padding:'20px 24px'}}>
          {mode==='draw'?(
            <>
              <div style={{position:'relative',marginBottom:14}}>
                <div style={{position:'absolute',inset:0,borderRadius:10,background:'repeating-conic-gradient(#f5f5f7 0% 25%,#fff 0% 50%) 0 0/14px 14px'}}/>
                <canvas ref={cv} style={{width:'100%',height:160,border:'1px solid #d2d2d7',borderRadius:10,cursor:'crosshair',display:'block',touchAction:'none',position:'relative'}}
                  onMouseDown={dn} onMouseMove={mv} onMouseUp={up} onMouseLeave={up}
                  onTouchStart={dn} onTouchMove={mv} onTouchEnd={up}/>
              </div>
              <div style={{display:'flex',gap:12,alignItems:'center'}}>
                <div style={{display:'flex',gap:5}}>{['#0a0a0a','#0071e3','#dc2626','#16a34a'].map(c=><button key={c} onClick={()=>setCol(c)} style={{width:22,height:22,borderRadius:'50%',background:c,border:col===c?'2px solid #0071e3':'2px solid #d2d2d7',cursor:'pointer',transition:'all .15s'}}/>)}</div>
                <div style={{display:'flex',alignItems:'center',gap:6,flex:1}}>
                  <span style={{fontSize:12,color:'#86868b'}}>Size</span>
                  <input type="range" min="1" max="8" step=".5" value={thick} onChange={e=>setThick(parseFloat(e.target.value))} style={{flex:1,accentColor:'#0071e3',height:2}}/>
                </div>
                <button onClick={init} style={{fontSize:12,color:'#86868b',background:'#f5f5f7',border:'none',borderRadius:6,padding:'5px 12px',cursor:'pointer',fontFamily:'inherit'}}>Clear</button>
              </div>
            </>
          ):(
            <>
              <div style={{border:'1px solid #d2d2d7',borderRadius:10,padding:'16px',marginBottom:12,minHeight:72,display:'flex',alignItems:'center',justifyContent:'center',background:'repeating-conic-gradient(#fafafa 0% 25%,#fff 0% 50%) 0 0/10px 10px'}}>
                <span style={{fontFamily:font,fontSize:36,color:col,transition:'all .2s'}}>{text||'Your Name'}</span>
              </div>
              <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type your name" style={{width:'100%',padding:'10px 14px',border:'1px solid #d2d2d7',borderRadius:10,fontSize:15,fontFamily:'inherit',outline:'none',marginBottom:12,transition:'border-color .15s'}} onFocus={e=>e.target.style.borderColor='#0071e3'} onBlur={e=>e.target.style.borderColor='#d2d2d7'}/>
              <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:10}}>{[FONTS[16],FONTS[17],FONTS[18],FONTS[19],FONTS[15]].map(f=>(
                <button key={f.l} onClick={()=>setFont(f.v)} style={{padding:'5px 12px',borderRadius:20,border:`1px solid ${font===f.v?'#0071e3':'#d2d2d7'}`,background:font===f.v?'#e8f0fe':'#fff',fontFamily:f.v,fontSize:14,cursor:'pointer',color:font===f.v?'#0071e3':'#3c3c43',transition:'all .15s'}}>{f.l}</button>
              ))}</div>
              <div style={{display:'flex',gap:5}}>{['#0a0a0a','#0071e3','#dc2626','#7c3aed'].map(c=><button key={c} onClick={()=>setCol(c)} style={{width:22,height:22,borderRadius:'50%',background:c,border:col===c?'2px solid #0071e3':'2px solid #d2d2d7',cursor:'pointer'}}/>)}</div>
            </>
          )}
        </div>
        <div style={{padding:'14px 24px 20px',display:'flex',justifyContent:'flex-end',gap:8,borderTop:'1px solid #f0f0f0'}}>
          <button onClick={onClose} style={{padding:'8px 20px',borderRadius:20,border:'1px solid #d2d2d7',background:'#fff',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit',color:'#3c3c43'}}>Cancel</button>
          <button onClick={apply} style={{padding:'8px 22px',borderRadius:20,border:'none',background:'#0071e3',color:'#fff',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Done</button>
        </div>
      </div>
    </div>
  );
}

/* ─── TEXT COMPONENT (proper hooks) ──────────────────────── */
function TextAnn({o,sel,zoom,rotStyle,onDrag,onHandles,upd,del}){
  const [editing,setEditing]=useState(false);
  const [val,setVal]=useState(o.text);
  const ref=useRef(null);
  useEffect(()=>{if(!editing)setVal(o.text);},[o.text,editing]);
  function commit(){setEditing(false);if(val.trim())upd(o.id,{text:val});else del(o.id);}
  return(
    <div data-ann="1" onMouseDown={e=>{if(editing)return;onDrag(e,o);}}
      onDoubleClick={e=>{e.stopPropagation();setEditing(true);setTimeout(()=>ref.current?.select(),50);}}
      style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,cursor:editing?'text':'move',outline:sel?'2px solid #0071e3':'none',outlineOffset:2,borderRadius:6,padding:'2px 4px',minWidth:30,userSelect:editing?'text':'none',zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
      {editing?<textarea ref={ref} value={val} onChange={e=>setVal(e.target.value)}
        onKeyDown={e=>{if(e.key==='Escape')commit();if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();commit();}}}
        onBlur={commit} autoFocus
        style={{background:'rgba(255,255,255,.97)',border:'2px solid #0071e3',borderRadius:8,padding:'6px 10px',fontSize:(o.fontSize||18)*zoom,fontFamily:o.font,color:o.color,outline:'none',resize:'both',minWidth:100,lineHeight:1.4,fontWeight:o.bold?700:400,fontStyle:o.italic?'italic':'normal'}} rows={2}/>
      :<span style={{fontSize:(o.fontSize||18)*zoom,fontFamily:o.font,color:o.color,whiteSpace:'pre-wrap',lineHeight:1.4,fontWeight:o.bold?700:400,fontStyle:o.italic?'italic':'normal',pointerEvents:'none'}}>{o.text}</span>}
      {onHandles(o,sel)}
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
  const [color,setColor]=useState('#0a0a0a');
  const [hlColor,setHlColor]=useState('#fde047');
  const [hlOpacity,setHlOp]=useState(0.4);
  const [hlBorder,setHlBorder]=useState(false);
  const [hlBorderColor,setHlBorderColor]=useState('#d97706');
  const [hlBorderW,setHlBorderW]=useState(1.5);
  const [lineW,setLineW]=useState(2);
  const [font,setFont]=useState(FONTS[0].v);
  const [fontSize,setFS]=useState(18);
  const [bold,setBold]=useState(false);
  const [italic,setItalic]=useState(false);
  const [shape,setShape]=useState('rectangle');
  const [selId,setSelId]=useState(null);
  const [showSign,setShowSign]=useState(false);

  const [data,setData]=useState({});
  const hist=useRef([]);const rdo=useRef([]);

  const pdfCv=useRef(null);const liveCv=useRef(null);
  const pdfjsDoc=useRef(null);const thumbs=useRef({});
  const [baseW,setBaseW]=useState(0);const [baseH,setBaseH]=useState(0);

  const isDrawing=useRef(false);const livePts=useRef([]);const shapeOrig=useRef(null);

  useEffect(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href=GF;document.head.appendChild(l);return()=>{try{document.head.removeChild(l);}catch{}};},[]);

  useEffect(()=>{
    function k(e){const t=document.activeElement?.tagName;if(t==='INPUT'||t==='TEXTAREA')return;
      if((e.metaKey||e.ctrlKey)&&e.key==='z'){e.preventDefault();undo();}
      if((e.metaKey||e.ctrlKey)&&(e.key==='y'||(e.shiftKey&&e.key==='z'))){e.preventDefault();redo();}
      if((e.metaKey||e.ctrlKey)&&e.key==='s'){e.preventDefault();savePdf();}
      if(e.key==='Delete'||e.key==='Backspace'){if(selId)del(selId);}
      if(e.key==='Escape')setSelId(null);}
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k);
  },[selId,data]);

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

  async function loadPdf(f){
    if(!f||f.type!=='application/pdf')return;setLoading(true);setFile(f);setData({});setSelId(null);hist.current=[];rdo.current=[];setPg(1);
    try{const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc=`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
      pdfjsDoc.current=await pdfjs.getDocument({data:await f.arrayBuffer()}).promise;setNumPg(pdfjsDoc.current.numPages);
    }catch{alert('Could not open PDF.');}setLoading(false);}

  useEffect(()=>{if(!pdfjsDoc.current)return;
    pdfjsDoc.current.getPage(pg).then(page=>{const vp=page.getViewport({scale:zoom});const c=pdfCv.current;if(!c)return;
      c.width=vp.width;c.height=vp.height;const vpB=page.getViewport({scale:1});setBaseW(vpB.width);setBaseH(vpB.height);
      page.render({canvasContext:c.getContext('2d'),viewport:vp});
      const lc=liveCv.current;if(lc){lc.width=vp.width;lc.height=vp.height;}});
  },[pg,zoom,numPg]);

  useEffect(()=>{if(!pdfjsDoc.current)return;for(let i=1;i<=numPg;i++){const c=thumbs.current[i];if(!c)continue;
    pdfjsDoc.current.getPage(i).then(p=>{const v=p.getViewport({scale:.12});c.width=v.width;c.height=v.height;p.render({canvasContext:c.getContext('2d'),viewport:v});});}
  },[numPg]);

  function getPos(e){const c=pdfCv.current;if(!c)return{x:0,y:0};const r=c.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:(t.clientX-r.left)/zoom,y:(t.clientY-r.top)/zoom};}
  function getSP(e){const c=pdfCv.current;if(!c)return{x:0,y:0};const r=c.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top};}

  function handleClick(e){
    if(e.target.closest('[data-ann]'))return;
    setSelId(null);
    const pos=getPos(e);
    if(tool==='text'){addObj({type:'text',x:pos.x,y:pos.y,text:'Text',color,font,fontSize,bold,italic,rotate:0});return;}
    if(tool==='sign'){window.__signPos=pos;setShowSign(true);return;}
    if(tool==='image'){window.__imgPos=pos;document.getElementById('img-input').click();return;}
  }

  function drawDown(e){if(['select','text','sign','image'].includes(tool))return;e.preventDefault();e.stopPropagation();isDrawing.current=true;livePts.current=[getSP(e)];shapeOrig.current=getSP(e);}
  function drawMove(e){if(!isDrawing.current)return;e.preventDefault();const sp=getSP(e);livePts.current.push(sp);
    const c=liveCv.current;if(!c)return;const ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.save();
    if(tool==='draw'){const pts=livePts.current;ctx.strokeStyle=color;ctx.lineWidth=lineW*zoom;ctx.lineCap='round';ctx.lineJoin='round';
      ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length-1;i++)ctx.quadraticCurveTo(pts[i].x,pts[i].y,(pts[i].x+pts[i+1].x)/2,(pts[i].y+pts[i+1].y)/2);
      if(pts.length>1)ctx.lineTo(pts[pts.length-1].x,pts[pts.length-1].y);ctx.stroke();
    }else if(tool==='highlight'){const s=shapeOrig.current;ctx.globalAlpha=hlOpacity;ctx.fillStyle=hlColor;ctx.fillRect(s.x,s.y,sp.x-s.x,sp.y-s.y);
      if(hlBorder){ctx.globalAlpha=1;ctx.strokeStyle=hlBorderColor;ctx.lineWidth=hlBorderW*zoom;ctx.strokeRect(s.x,s.y,sp.x-s.x,sp.y-s.y);}
    }else if(tool==='shape'){const s=shapeOrig.current;const x=Math.min(s.x,sp.x),y=Math.min(s.y,sp.y),w=Math.abs(sp.x-s.x),h=Math.abs(sp.y-s.y);
      ctx.strokeStyle=color;ctx.lineWidth=lineW*zoom;ctx.lineCap='round';ctx.lineJoin='round';
      if(shape==='rectangle')ctx.strokeRect(x,y,w,h);
      else if(shape==='circle'){ctx.beginPath();ctx.arc(x+w/2,y+h/2,Math.min(w,h)/2,0,Math.PI*2);ctx.stroke();}
      else if(shape==='ellipse'){ctx.beginPath();ctx.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,Math.PI*2);ctx.stroke();}
      else if(shape==='triangle'){ctx.beginPath();ctx.moveTo(x+w/2,y);ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.stroke();}
      else if(shape==='line'){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(sp.x,sp.y);ctx.stroke();}
      else if(shape==='arrow'){ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(sp.x,sp.y);ctx.stroke();const a=Math.atan2(sp.y-s.y,sp.x-s.x);const hl=12*zoom;
        ctx.beginPath();ctx.moveTo(sp.x,sp.y);ctx.lineTo(sp.x-hl*Math.cos(a-Math.PI/6),sp.y-hl*Math.sin(a-Math.PI/6));ctx.moveTo(sp.x,sp.y);ctx.lineTo(sp.x-hl*Math.cos(a+Math.PI/6),sp.y-hl*Math.sin(a+Math.PI/6));ctx.stroke();}
    }else if(tool==='eraser'){const pts=livePts.current;ctx.globalCompositeOperation='destination-out';ctx.lineWidth=20*zoom;ctx.lineCap='round';
      ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();}
    ctx.restore();}

  function drawUp(e){if(!isDrawing.current)return;isDrawing.current=false;const sp=getSP(e);
    const c=liveCv.current;if(c)c.getContext('2d').clearRect(0,0,c.width,c.height);
    if(tool==='draw'&&livePts.current.length>=2){addPath({points:livePts.current.map(p=>({x:p.x/zoom,y:p.y/zoom})),color,lineWidth:lineW,opacity:1});}
    else if(tool==='highlight'){const s=shapeOrig.current;const w=(sp.x-s.x)/zoom,h=(sp.y-s.y)/zoom;if(Math.abs(w)<3||Math.abs(h)<3)return;
      addObj({type:'highlight',x:Math.min(s.x,sp.x)/zoom,y:Math.min(s.y,sp.y)/zoom,w:Math.abs(w),h:Math.abs(h),color:hlColor,opacity:hlOpacity,border:hlBorder,borderColor:hlBorderColor,borderWidth:hlBorderW,rotate:0});}
    else if(tool==='shape'){const s=shapeOrig.current;const w=(sp.x-s.x)/zoom,h=(sp.y-s.y)/zoom;if(Math.abs(w)<3||Math.abs(h)<3)return;
      addObj({type:'shape',shape,x:Math.min(s.x,sp.x)/zoom,y:Math.min(s.y,sp.y)/zoom,w:Math.abs(w),h:Math.abs(h),color,lineWidth:lineW,rotate:0});}
    else if(tool==='eraser'){const pts=livePts.current.map(p=>({x:p.x/zoom,y:p.y/zoom}));
      setpd(pg,d=>({...d,paths:d.paths.filter(p=>!p.points?.some(pp=>pts.some(ep=>Math.hypot(ep.x-pp.x,ep.y-pp.y)<20)))}));}
    livePts.current=[];}

  function applySign(sig){const pos=window.__signPos||{x:60,y:60};
    if(sig.type==='sign-img')addObj({type:'sign-img',x:pos.x,y:pos.y,w:220,h:80,dataUrl:sig.dataUrl,rotate:0});
    else addObj({type:'sign-text',x:pos.x,y:pos.y,w:200,h:50,text:sig.text,font:sig.font,color:sig.color,rotate:0});setTool('select');}
  function addImage(f){if(!f)return;const pos=window.__imgPos||{x:60,y:60};const r=new FileReader();
    r.onload=ev=>addObj({type:'image',x:pos.x,y:pos.y,w:200,h:150,dataUrl:ev.target.result,rotate:0});r.readAsDataURL(f);setTool('select');}

  async function savePdf(){if(!file)return;setSaving(true);
    try{const{PDFDocument,rgb,StandardFonts}=await import('pdf-lib');const buf=await file.arrayBuffer();const pdfd=await PDFDocument.load(buf);
      const hf=await pdfd.embedFont(StandardFonts.Helvetica);const hfb=await pdfd.embedFont(StandardFonts.HelveticaBold);
      function h2r(h){if(!h||h.length<7)return rgb(0,0,0);return rgb(parseInt(h.slice(1,3),16)/255,parseInt(h.slice(3,5),16)/255,parseInt(h.slice(5,7),16)/255);}
      for(const[pnS,pd]of Object.entries(data)){const pn=parseInt(pnS);const page=pdfd.getPage(pn-1);const{width:pgW,height:pgH}=page.getSize();const sx=pgW/baseW,sy=pgH/baseH;
        for(const path of(pd.paths||[])){if(!path.points?.length)continue;const c=h2r(path.color);
          for(let i=0;i<path.points.length-1;i++)page.drawLine({start:{x:path.points[i].x*sx,y:pgH-path.points[i].y*sy},end:{x:path.points[i+1].x*sx,y:pgH-path.points[i+1].y*sy},thickness:(path.lineWidth||2)*Math.min(sx,sy),color:c});}
        for(const o of(pd.objs||[])){
          if(o.type==='text'){const sz=(o.fontSize||18)*Math.min(sx,sy);(o.text||'').split('\n').forEach((line,i)=>{try{page.drawText(line,{x:o.x*sx,y:pgH-(o.y+i*(o.fontSize||18)*1.35+(o.fontSize||18))*sy,size:sz,font:o.bold?hfb:hf,color:h2r(o.color)});}catch{}});}
          else if(o.type==='highlight'){page.drawRectangle({x:o.x*sx,y:pgH-(o.y+o.h)*sy,width:o.w*sx,height:o.h*sy,color:h2r(o.color),opacity:o.opacity??0.35});
            if(o.border)page.drawRectangle({x:o.x*sx,y:pgH-(o.y+o.h)*sy,width:o.w*sx,height:o.h*sy,borderColor:h2r(o.borderColor||'#d97706'),borderWidth:(o.borderWidth||1.5)*Math.min(sx,sy)});}
          else if(o.type==='shape'){const c=h2r(o.color),lw=(o.lineWidth||2)*Math.min(sx,sy);const x=o.x*sx,y=pgH-(o.y+o.h)*sy,w=o.w*sx,h=o.h*sy;
            if(o.shape==='circle'||o.shape==='ellipse')page.drawEllipse({x:x+w/2,y:y+h/2,xScale:w/2,yScale:h/2,borderColor:c,borderWidth:lw});
            else if(o.shape==='line'||o.shape==='arrow')page.drawLine({start:{x,y:y+h},end:{x:x+w,y},thickness:lw,color:c});
            else page.drawRectangle({x,y,width:w,height:h,borderColor:c,borderWidth:lw});}
          else if(o.type==='sign-img'||o.type==='image'){try{const resp=await fetch(o.dataUrl);const ib=await resp.arrayBuffer();
            const img=o.dataUrl.startsWith('data:image/png')?await pdfd.embedPng(ib):await pdfd.embedJpg(ib);
            page.drawImage(img,{x:o.x*sx,y:pgH-(o.y+o.h)*sy,width:o.w*sx,height:o.h*sy});}catch{}}
          else if(o.type==='sign-text'){try{page.drawText(o.text||'',{x:o.x*sx,y:pgH-(o.y+o.h*.7)*sy,size:28*Math.min(sx,sy),font:hf,color:h2r(o.color||'#0a0a0a')});}catch{}}}}
      const bytes=await pdfd.save();const blob=new Blob([bytes],{type:'application/pdf'});
      const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=file.name.replace(/\.pdf$/i,'')+'-by-breklo.pdf';a.click();URL.revokeObjectURL(url);
    }catch(e){console.error(e);alert('Save failed.');}setSaving(false);}

  const pd=gp(pg);const selObj=[...pd.objs,...pd.paths].find(o=>o.id===selId);

  /* ── Drag helper ── */
  function startDrag(e,o){if(e.target.dataset?.handle)return;e.stopPropagation();setSelId(o.id);
    const sx=e.clientX-o.x*zoom,sy=e.clientY-o.y*zoom;
    function mv(ev){upd(o.id,{x:(ev.clientX-sx)/zoom,y:(ev.clientY-sy)/zoom});}
    function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
    window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);}

  /* ── Handles (resize + rotate + delete) ── */
  function renderHandles(o,sel){
    if(!sel)return null;
    function resize(corner,e){e.stopPropagation();e.preventDefault();const sx=e.clientX,sy=e.clientY;const ow=o.w||200,oh=o.h||60,ox=o.x,oy=o.y;
      function mv(ev){const dx=(ev.clientX-sx)/zoom,dy=(ev.clientY-sy)/zoom;let u={};
        if(corner.includes('e'))u.w=Math.max(20,ow+dx);if(corner.includes('s'))u.h=Math.max(20,oh+dy);
        if(corner.includes('w')){u.x=ox+dx;u.w=Math.max(20,ow-dx);}if(corner.includes('n')){u.y=oy+dy;u.h=Math.max(20,oh-dy);}upd(o.id,u);}
      function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
      window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);}
    function rotate(e){e.stopPropagation();e.preventDefault();const rect=pdfCv.current.getBoundingClientRect();
      const cx=(o.x+(o.w||200)/2)*zoom,cy=(o.y+(o.h||60)/2)*zoom;
      function mv(ev){const mx=ev.clientX-rect.left-cx,my=ev.clientY-rect.top-cy;upd(o.id,{rotate:Math.round(Math.atan2(my,mx)*180/Math.PI+90)});}
      function up(){window.removeEventListener('mousemove',mv);window.removeEventListener('mouseup',up);}
      window.addEventListener('mousemove',mv);window.addEventListener('mouseup',up);}

    const hs={position:'absolute',width:8,height:8,background:'#fff',border:'1.5px solid #0071e3',borderRadius:8,zIndex:10};
    return<>
      {[['nw',{left:-4,top:-4},'nwse-resize'],['ne',{right:-4,top:-4},'nesw-resize'],['sw',{left:-4,bottom:-4},'nesw-resize'],['se',{right:-4,bottom:-4},'nwse-resize']].map(([c,s,cur])=>
        <div key={c} data-handle="1" onMouseDown={e=>resize(c,e)} style={{...hs,...s,cursor:cur}}/>)}
      <div style={{position:'absolute',top:-30,left:'50%',marginLeft:-7,display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div data-handle="1" onMouseDown={rotate} style={{width:14,height:14,borderRadius:14,background:'#fff',border:'1.5px solid #0071e3',cursor:'grab',boxShadow:'0 1px 4px rgba(0,0,0,.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Ic d="M23 4v6h-6M23 10A10 10 0 0 0 4 6" size={7} sw={2.5}/>
        </div>
        <div style={{width:1,height:10,background:'#0071e3'}}/>
      </div>
      <button data-handle="1" onMouseDown={e=>{e.stopPropagation();del(o.id);}} style={{position:'absolute',top:-8,right:-8,width:16,height:16,borderRadius:16,background:'#ff3b30',border:'1.5px solid #fff',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',boxShadow:'0 1px 4px rgba(0,0,0,.2)',padding:0}}>
        <Ic d="M18 6L6 18M6 6l12 12" size={7} sw={3}/>
      </button>
    </>;
  }

  /* ── Apple-style CSS ── */
  const css=`
    @import url('${GF}');
    *{box-sizing:border-box;margin:0;padding:0}body{overflow:hidden}
    .tb{background:none;border:none;display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;border-radius:8px;transition:all .15s;font-family:inherit;height:36px;padding:0 10px;width:100%;color:#3c3c43}
    .tb:hover{background:#f5f5f7}.tb.on{background:#e8f0fe;color:#0071e3}
    .tb .tl{font-size:12px;font-weight:400;letter-spacing:-.01em;flex:1;text-align:left}
    .tb.on .tl{font-weight:500}
    ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:#d2d2d7;border-radius:4px}
    .panel-lbl{font-size:11px;font-weight:500;color:#86868b;letter-spacing:.01em;margin-bottom:6px}
    input[type=range]{-webkit-appearance:none;height:3px;background:#d2d2d7;border-radius:3px;outline:none}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:16px;background:#fff;border:1px solid #d2d2d7;box-shadow:0 1px 3px rgba(0,0,0,.15);cursor:pointer}
    select{-webkit-appearance:none;background:#fff url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2386868b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 10px center;padding-right:28px}
  `;

  /* ═══ UPLOAD ═══ */
  if(!file)return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',fontFamily:"-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',sans-serif",background:'#fff'}}>
      <style>{css}</style>
      <nav style={{height:52,borderBottom:'1px solid #e5e5e5',display:'flex',alignItems:'center',padding:'0 20px',justifyContent:'space-between'}}>
        <Link href="/" style={{textDecoration:'none',display:'inline-flex',alignItems:'center'}}><img src="/logo-wide.png" alt="breklo" style={{ height: 20, width: 'auto', display: 'block' }} /></Link>
        <Link href="/" style={{fontSize:13,color:'#86868b',textDecoration:'none'}}>← Tools</Link>
      </nav>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 24px'}}>
        <div style={{textAlign:'center',maxWidth:480,width:'100%'}}>
          <div style={{width:56,height:56,background:'#0071e3',borderRadius:16,margin:'0 auto 20px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
            <Ic d={['M4 7V5h16v2','M12 5v14','M9 19h6']} size={24} sw={1.8}/>
          </div>
          <h1 style={{fontSize:32,fontWeight:600,letterSpacing:'-.04em',color:'#1d1d1f',marginBottom:8}}>Edit PDF</h1>
          <p style={{fontSize:15,color:'#86868b',marginBottom:36,lineHeight:1.6}}>Add text, draw, sign, highlight and shapes. Everything is draggable, resizable and rotatable.</p>
          <div onDragOver={e=>{e.preventDefault();setDragIn(true);}} onDragLeave={()=>setDragIn(false)} onDrop={e=>{e.preventDefault();setDragIn(false);loadPdf(e.dataTransfer.files[0]);}} onClick={()=>document.getElementById('fi').click()}
            style={{border:`1.5px dashed ${dragIn?'#0071e3':'#d2d2d7'}`,borderRadius:16,padding:'48px 32px',textAlign:'center',background:dragIn?'#f0f5ff':'#fafafa',cursor:'pointer',transition:'all .2s'}}>
            <div style={{width:44,height:44,background:dragIn?'#0071e3':'#e5e5ea',borderRadius:12,margin:'0 auto 14px',display:'flex',alignItems:'center',justifyContent:'center',color:dragIn?'#fff':'#86868b',transition:'all .2s'}}>
              <Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" size={20} sw={1.8}/>
            </div>
            <p style={{fontWeight:500,fontSize:16,color:'#1d1d1f',marginBottom:4}}>Drop PDF here</p>
            <p style={{fontSize:13,color:'#86868b',marginBottom:20}}>or click to browse</p>
            <button onClick={e=>e.stopPropagation()} style={{background:'#0071e3',color:'#fff',border:'none',borderRadius:20,padding:'10px 28px',fontSize:14,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Choose File</button>
          </div>
        </div>
      </div>
      <input id="fi" type="file" accept=".pdf" style={{display:'none'}} onChange={e=>loadPdf(e.target.files[0])}/>
    </div>
  );

  /* ═══ EDITOR ═══ */
  return(
    <div style={{height:'100vh',display:'flex',flexDirection:'column',fontFamily:"-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',sans-serif",background:'#fff',overflow:'hidden'}}>
      <style>{css}</style>

      {/* TOP BAR */}
      <header style={{height:48,borderBottom:'1px solid #e5e5e5',display:'flex',alignItems:'center',padding:'0 12px',gap:6,flexShrink:0,background:'#fbfbfd'}}>
        <Link href="/" style={{textDecoration:'none',flexShrink:0,display:'inline-flex',alignItems:'center'}}><img src="/logo-wide.png" alt="breklo" style={{ height: 20, width: 'auto', display: 'block' }} /></Link>
        <div style={{width:1,height:18,background:'#e5e5e5',margin:'0 4px'}}/>
        <span style={{fontSize:12,fontWeight:500,color:'#3c3c43',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}>{file.name}</span>
        <div style={{display:'flex',gap:4,alignItems:'center',flexShrink:0}}>
          <button onClick={undo} disabled={!hist.current.length} style={{background:'none',border:'none',borderRadius:6,width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',cursor:hist.current.length?'pointer':'default',color:hist.current.length?'#3c3c43':'#d2d2d7'}}><Ic d="M3 7v6h6M3 13A9 9 0 1 0 6 6.7L3 13" size={14}/></button>
          <button onClick={redo} disabled={!rdo.current.length} style={{background:'none',border:'none',borderRadius:6,width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',cursor:rdo.current.length?'pointer':'default',color:rdo.current.length?'#3c3c43':'#d2d2d7'}}><Ic d="M21 7v6h-6M21 13A9 9 0 1 1 18 6.7L21 13" size={14}/></button>
          <div style={{width:1,height:18,background:'#e5e5e5',margin:'0 2px'}}/>
          <button onClick={()=>setZoom(z=>Math.max(.4,+(z-.2).toFixed(1)))} style={{background:'none',border:'none',borderRadius:6,width:28,height:28,cursor:'pointer',color:'#3c3c43',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
          <span style={{fontSize:12,color:'#3c3c43',minWidth:36,textAlign:'center',fontWeight:500,fontVariantNumeric:'tabular-nums'}}>{Math.round(zoom*100)}%</span>
          <button onClick={()=>setZoom(z=>Math.min(3,+(z+.2).toFixed(1)))} style={{background:'none',border:'none',borderRadius:6,width:28,height:28,cursor:'pointer',color:'#3c3c43',fontSize:15,display:'flex',alignItems:'center',justifyContent:'center'}}>+</button>
          <div style={{width:1,height:18,background:'#e5e5e5',margin:'0 2px'}}/>
          <button onClick={()=>setPg(p=>Math.max(1,p-1))} disabled={pg===1} style={{background:'none',border:'none',width:24,height:24,cursor:pg===1?'default':'pointer',color:pg===1?'#d2d2d7':'#3c3c43',fontSize:13}}>‹</button>
          <span style={{fontSize:12,color:'#3c3c43',fontWeight:500,fontVariantNumeric:'tabular-nums'}}>{pg}/{numPg}</span>
          <button onClick={()=>setPg(p=>Math.min(numPg,p+1))} disabled={pg===numPg} style={{background:'none',border:'none',width:24,height:24,cursor:pg===numPg?'default':'pointer',color:pg===numPg?'#d2d2d7':'#3c3c43',fontSize:13}}>›</button>
        </div>
        <div style={{width:1,height:18,background:'#e5e5e5',margin:'0 2px'}}/>
        <button onClick={savePdf} disabled={saving} style={{background:'#0071e3',color:'#fff',border:'none',borderRadius:20,padding:'0 16px',height:30,display:'flex',alignItems:'center',gap:5,cursor:saving?'wait':'pointer',fontSize:13,fontWeight:500,fontFamily:'inherit',flexShrink:0}}>
          <Ic d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={12} sw={2}/>{saving?'Saving…':'Download'}
        </button>
      </header>

      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        {/* TOOLS */}
        <div style={{width:110,borderRight:'1px solid #e5e5e5',display:'flex',flexDirection:'column',padding:'8px 6px',gap:1,flexShrink:0,overflowY:'auto',background:'#fbfbfd'}}>
          {[
            {id:'select',l:'Select',ic:'M4 4l7 18 3-7 7-3z'},
            {id:'text',l:'Text',ic:['M4 7V5h16v2','M12 5v14','M9 19h6']},
            {id:'draw',l:'Draw',ic:'M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9'},
            {id:'highlight',l:'Highlight',ic:['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2']},
            {id:'sign',l:'Signature',ic:['M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9','M3 21h18']},
            {id:'shape',l:'Shape',ic:'M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2z'},
            {id:'image',l:'Image',ic:['M21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h3l2-3h4l2 3h3a2 2 0 012 2z']},
            {id:'eraser',l:'Eraser',ic:['M20 20H7L3 16l9.5-9.5','M13 5l4 4']},
          ].map(t=>(
            <button key={t.id} className={`tb${tool===t.id?' on':''}`} onClick={()=>setTool(t.id)}>
              <Ic d={t.ic} size={16}/><span className="tl">{t.l}</span>
            </button>
          ))}
        </div>

        {/* THUMBS */}
        <div style={{width:72,borderRight:'1px solid #e5e5e5',overflowY:'auto',padding:'8px 4px',display:'flex',flexDirection:'column',gap:4,flexShrink:0,background:'#f5f5f7'}}>
          {Array.from({length:numPg},(_,i)=>i+1).map(n=>(
            <button key={n} onClick={()=>setPg(n)} style={{background:pg===n?'#e8f0fe':'#fff',border:`1.5px solid ${pg===n?'#0071e3':'#d2d2d7'}`,borderRadius:6,padding:2,cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:2,transition:'all .15s'}}>
              <canvas ref={el=>{thumbs.current[n]=el;}} style={{borderRadius:3,display:'block',maxWidth:'100%'}}/>
              <span style={{fontSize:9,color:pg===n?'#0071e3':'#86868b',fontWeight:pg===n?600:400}}>{n}</span>
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div style={{flex:1,overflow:'auto',background:'#e5e5ea',display:'flex',alignItems:'flex-start',justifyContent:'center',padding:20}} onClick={handleClick}>
          {loading&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(245,245,247,.8)',zIndex:100,backdropFilter:'blur(6px)'}}><div style={{background:'#fff',borderRadius:14,padding:'16px 24px',fontSize:14,fontWeight:500,color:'#1d1d1f',boxShadow:'0 4px 16px rgba(0,0,0,.08)'}}>Loading…</div></div>}

          <div style={{position:'relative',boxShadow:'0 2px 20px rgba(0,0,0,.15)',borderRadius:2,flexShrink:0,userSelect:'none'}}>
            <canvas ref={pdfCv} style={{display:'block',zIndex:1}}/>

            {/* SVG paths */}
            {baseW>0&&<svg style={{position:'absolute',inset:0,width:baseW*zoom,height:baseH*zoom,zIndex:10,pointerEvents:'none'}} overflow="visible">
              {(pd.paths||[]).map(p=><g key={p.id}>
                <polyline points={p.points.map(pt=>`${pt.x*zoom},${pt.y*zoom}`).join(' ')} fill="none" stroke="transparent" strokeWidth={Math.max(20,p.lineWidth*zoom+10)} style={{pointerEvents:'stroke',cursor:'pointer'}} onClick={e=>{e.stopPropagation();setSelId(p.id);}}/>
                <polyline points={p.points.map(pt=>`${pt.x*zoom},${pt.y*zoom}`).join(' ')} fill="none" stroke={p.color} strokeWidth={(p.lineWidth||2)*zoom} strokeLinecap="round" strokeLinejoin="round" opacity={p.opacity||1} style={{pointerEvents:'none'}}/>
                {selId===p.id&&(()=>{const xs=p.points.map(pt=>pt.x*zoom),ys=p.points.map(pt=>pt.y*zoom);return<rect x={Math.min(...xs)-4} y={Math.min(...ys)-4} width={Math.max(...xs)-Math.min(...xs)+8} height={Math.max(...ys)-Math.min(...ys)+8} fill="none" stroke="#0071e3" strokeWidth="1" strokeDasharray="3 3"/>;})()}
              </g>)}
            </svg>}

            {/* DOM objects */}
            {baseW>0&&<div style={{position:'absolute',inset:0,width:baseW*zoom,height:baseH*zoom,zIndex:20,pointerEvents:'none'}}>
              {(pd.objs||[]).map(o=>{
                const sel=selId===o.id;const W=(o.w||200)*zoom;const H=(o.h||60)*zoom;
                const rotStyle=o.rotate?{transform:`rotate(${o.rotate}deg)`,transformOrigin:'center center'}:{};

                if(o.type==='text')return<TextAnn key={o.id} o={o} sel={sel} zoom={zoom} rotStyle={rotStyle} onDrag={startDrag} onHandles={renderHandles} upd={upd} del={del}/>;

                if(o.type==='highlight'){
                  const opHex=Math.round((o.opacity??0.35)*255).toString(16).padStart(2,'0');
                  return<div key={o.id} data-ann="1" onMouseDown={e=>startDrag(e,o)}
                    style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',background:o.color+opHex,
                      border:o.border?`${(o.borderWidth||1.5)*zoom}px solid ${o.borderColor||'#d97706'}`:'none',
                      borderRadius:3,outline:sel?'2px solid #0071e3':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                    {renderHandles(o,sel)}
                  </div>;
                }

                if(o.type==='shape'){const sw=(o.lineWidth||2)*zoom;
                  return<div key={o.id} data-ann="1" onMouseDown={e=>startDrag(e,o)}
                    style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #0071e3':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                    <svg width={W} height={H} style={{display:'block',overflow:'visible',pointerEvents:'none'}}>
                      {o.shape==='rectangle'&&<rect x={sw/2} y={sw/2} width={W-sw} height={H-sw} stroke={o.color} strokeWidth={sw} fill="none"/>}
                      {o.shape==='circle'&&<circle cx={W/2} cy={H/2} r={Math.min(W,H)/2-sw/2} stroke={o.color} strokeWidth={sw} fill="none"/>}
                      {o.shape==='ellipse'&&<ellipse cx={W/2} cy={H/2} rx={W/2-sw/2} ry={H/2-sw/2} stroke={o.color} strokeWidth={sw} fill="none"/>}
                      {o.shape==='triangle'&&<polygon points={`${W/2},${sw/2} ${W-sw/2},${H-sw/2} ${sw/2},${H-sw/2}`} stroke={o.color} strokeWidth={sw} fill="none" strokeLinejoin="round"/>}
                      {o.shape==='line'&&<line x1={0} y1={H} x2={W} y2={0} stroke={o.color} strokeWidth={sw} strokeLinecap="round"/>}
                      {o.shape==='arrow'&&<g><line x1={0} y1={H} x2={W} y2={0} stroke={o.color} strokeWidth={sw} strokeLinecap="round"/><polygon points={`${W},0 ${W-12*zoom},${6*zoom} ${W-6*zoom},${12*zoom}`} fill={o.color}/></g>}
                    </svg>
                    {renderHandles(o,sel)}
                  </div>;
                }

                if(o.type==='sign-img'||o.type==='image')return<div key={o.id} data-ann="1" onMouseDown={e=>startDrag(e,o)}
                  style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #0071e3':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',...rotStyle}}>
                  <img src={o.dataUrl} style={{width:'100%',height:'100%',objectFit:'contain',pointerEvents:'none'}} alt="" draggable={false}/>
                  {renderHandles(o,sel)}
                </div>;

                if(o.type==='sign-text')return<div key={o.id} data-ann="1" onMouseDown={e=>startDrag(e,o)}
                  style={{position:'absolute',left:o.x*zoom,top:o.y*zoom,width:W,height:H,cursor:'move',outline:sel?'2px solid #0071e3':'none',outlineOffset:2,zIndex:sel?40:25,pointerEvents:'auto',display:'flex',alignItems:'center',...rotStyle}}>
                  <span style={{fontFamily:o.font,fontSize:Math.min(W/4,H*.7),color:o.color||'#0a0a0a',pointerEvents:'none',whiteSpace:'nowrap'}}>{o.text}</span>
                  {renderHandles(o,sel)}
                </div>;

                return null;
              })}
            </div>}

            <canvas ref={liveCv} style={{position:'absolute',inset:0,zIndex:30,cursor:['draw','highlight','shape','eraser'].includes(tool)?'crosshair':'default',pointerEvents:['draw','highlight','shape','eraser'].includes(tool)?'auto':'none'}}
              onMouseDown={drawDown} onMouseMove={drawMove} onMouseUp={drawUp} onMouseLeave={drawUp}
              onTouchStart={drawDown} onTouchMove={drawMove} onTouchEnd={drawUp}/>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{width:200,borderLeft:'1px solid #e5e5e5',background:'#fbfbfd',padding:'12px 10px',flexShrink:0,overflowY:'auto',display:'flex',flexDirection:'column',gap:16}}>

          {tool==='highlight'&&<div>
            <div className="panel-lbl">Highlight</div>
            <div style={{display:'flex',gap:4,marginBottom:8,flexWrap:'wrap'}}>{HL_COLORS.map(c=><button key={c} onClick={()=>setHlColor(c)} style={{width:24,height:24,borderRadius:24,background:c,border:hlColor===c?'2px solid #0071e3':'1.5px solid #d2d2d7',cursor:'pointer'}}/>)}</div>
            <div className="panel-lbl">Opacity {Math.round(hlOpacity*100)}%</div>
            <input type="range" min="0.1" max="1" step="0.05" value={hlOpacity} onChange={e=>setHlOp(parseFloat(e.target.value))} style={{width:'100%'}}/>
            <label style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#3c3c43',cursor:'pointer',marginTop:10}}>
              <input type="checkbox" checked={hlBorder} onChange={e=>setHlBorder(e.target.checked)} style={{accentColor:'#0071e3'}}/> Add border
            </label>
            {hlBorder&&<div style={{marginTop:8}}>
              <div style={{display:'flex',gap:4,marginBottom:6}}>{['#d97706','#dc2626','#0a0a0a','#2563eb','#16a34a'].map(c=><button key={c} onClick={()=>setHlBorderColor(c)} style={{width:18,height:18,borderRadius:18,background:c,border:hlBorderColor===c?'2px solid #0071e3':'1.5px solid #d2d2d7',cursor:'pointer'}}/>)}</div>
              <div className="panel-lbl">Border width {hlBorderW}px</div>
              <input type="range" min="0.5" max="5" step="0.5" value={hlBorderW} onChange={e=>setHlBorderW(parseFloat(e.target.value))} style={{width:'100%'}}/>
            </div>}
          </div>}

          {tool==='shape'&&<div>
            <div className="panel-lbl">Shape</div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3}}>{SHAPES.map(s=><button key={s.id} onClick={()=>setShape(s.id)} style={{padding:'7px 0',borderRadius:8,border:`1px solid ${shape===s.id?'#0071e3':'#d2d2d7'}`,background:shape===s.id?'#e8f0fe':'#fff',color:shape===s.id?'#0071e3':'#3c3c43',cursor:'pointer',fontSize:11,fontWeight:shape===s.id?500:400}}>{s.l}</button>)}</div>
          </div>}

          <div>
            <div className="panel-lbl">Color</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:6}}>{COLORS.map(c=><button key={c} onClick={()=>{setColor(c);if(selId)upd(selId,{color:c});}} style={{width:22,height:22,borderRadius:22,background:c,border:color===c?'2px solid #0071e3':c==='#ffffff'?'1.5px solid #d2d2d7':'1.5px solid transparent',cursor:'pointer',boxShadow:c==='#ffffff'?'inset 0 0 0 1px #e5e5e5':'none',transform:color===c?'scale(1.15)':'scale(1)',transition:'all .15s'}}/>)}</div>
            <div style={{display:'flex',alignItems:'center',gap:6}}><input type="color" value={color} onChange={e=>{setColor(e.target.value);if(selId)upd(selId,{color:e.target.value});}} style={{width:22,height:22,border:'1px solid #d2d2d7',borderRadius:6,cursor:'pointer',padding:1}}/><span style={{fontSize:11,color:'#86868b',fontFamily:'monospace'}}>{color}</span></div>
          </div>

          {['draw','shape'].includes(tool)&&<div>
            <div className="panel-lbl">Stroke {lineW}px</div>
            <input type="range" min="0.5" max="16" step=".5" value={lineW} onChange={e=>setLineW(parseFloat(e.target.value))} style={{width:'100%'}}/>
          </div>}

          {(tool==='text'||selObj?.type==='text')&&<div>
            <div className="panel-lbl">Size {selObj?.fontSize||fontSize}px</div>
            <input type="range" min="8" max="96" value={selObj?.fontSize||fontSize} onChange={e=>{const v=parseInt(e.target.value);setFS(v);if(selId)upd(selId,{fontSize:v});}} style={{width:'100%',marginBottom:8}}/>
            <div className="panel-lbl">Font</div>
            <select value={selObj?.font||font} onChange={e=>{setFont(e.target.value);if(selId)upd(selId,{font:e.target.value});}} style={{width:'100%',padding:'7px 9px',border:'1px solid #d2d2d7',borderRadius:8,fontSize:12.5,fontFamily:'inherit',outline:'none',cursor:'pointer',marginBottom:6}}>{FONTS.map(f=><option key={f.l} value={f.v}>{f.l}</option>)}</select>
            <div style={{display:'flex',gap:4}}>{[['B','bold',bold,setBold,{fontWeight:700}],['I','italic',italic,setItalic,{fontStyle:'italic'}]].map(([l,p,v,s,st])=><button key={l} onClick={()=>{s(!v);if(selId)upd(selId,{[p]:!v});}} style={{flex:1,padding:'6px',borderRadius:8,border:`1px solid ${v?'#0071e3':'#d2d2d7'}`,background:v?'#e8f0fe':'#fff',color:v?'#0071e3':'#3c3c43',cursor:'pointer',fontSize:14,...st}}>{l}</button>)}</div>
          </div>}

          {selObj?.type==='highlight'&&<div>
            <div className="panel-lbl">Opacity {Math.round((selObj.opacity??0.35)*100)}%</div>
            <input type="range" min="0.05" max="1" step="0.05" value={selObj.opacity??0.35} onChange={e=>upd(selId,{opacity:parseFloat(e.target.value)})} style={{width:'100%'}}/>
            <label style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#3c3c43',cursor:'pointer',marginTop:8}}>
              <input type="checkbox" checked={!!selObj.border} onChange={e=>upd(selId,{border:e.target.checked})} style={{accentColor:'#0071e3'}}/> Border
            </label>
            {selObj.border&&<div style={{marginTop:6}}>
              <div style={{display:'flex',gap:3,marginBottom:4}}>{['#d97706','#dc2626','#0a0a0a','#2563eb'].map(c=><button key={c} onClick={()=>upd(selId,{borderColor:c})} style={{width:16,height:16,borderRadius:16,background:c,border:selObj.borderColor===c?'2px solid #0071e3':'1px solid #d2d2d7',cursor:'pointer'}}/>)}</div>
              <input type="range" min="0.5" max="5" step="0.5" value={selObj.borderWidth||1.5} onChange={e=>upd(selId,{borderWidth:parseFloat(e.target.value)})} style={{width:'100%'}}/>
            </div>}
          </div>}

          {selObj&&selObj.rotate!==undefined&&<div>
            <div className="panel-lbl">Rotate {selObj.rotate||0}°</div>
            <input type="range" min="-180" max="180" step="1" value={selObj.rotate||0} onChange={e=>upd(selId,{rotate:parseInt(e.target.value)})} style={{width:'100%'}}/>
            <button onClick={()=>upd(selId,{rotate:0})} style={{marginTop:4,fontSize:11,color:'#86868b',background:'#f5f5f7',border:'none',borderRadius:6,padding:'3px 10px',cursor:'pointer',fontFamily:'inherit'}}>Reset</button>
          </div>}

          {selObj&&<div style={{display:'flex',gap:4}}>
            <button onClick={()=>dup(selId)} style={{flex:1,padding:'6px',borderRadius:8,border:'1px solid #d2d2d7',background:'#fff',color:'#3c3c43',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Duplicate</button>
            <button onClick={()=>del(selId)} style={{flex:1,padding:'6px',borderRadius:8,border:'1px solid #fecaca',background:'#fff1f2',color:'#ff3b30',fontSize:11,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}>Delete</button>
          </div>}
        </div>
      </div>

      <input id="img-input" type="file" accept="image/*" style={{display:'none'}} onChange={e=>addImage(e.target.files[0])}/>
      {showSign&&<SignModal onClose={()=>setShowSign(false)} onApply={applySign}/>}
    </div>
  );
}
