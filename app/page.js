'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Ico = ({ d, size = 16, color = 'currentColor', sw = 1.7 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {[].concat(d).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const I = {
  upload: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12',
  arrow:  'M5 12h14M12 5l7 7-7 7',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  zap:    'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  globe:  ['M12 22a10 10 0 100-20 10 10 0 000 20z','M2 12h20','M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'],
};

function TIcon({ abbr, cat }) {
  const p = { edit:{bg:'#eff6ff',color:'#1d4ed8'}, from:{bg:'#fff1f2',color:'#be123c'}, to:{bg:'#f0fdf4',color:'#15803d'}, image:{bg:'#fefce8',color:'#a16207'}, av:{bg:'#f5f3ff',color:'#6d28d9'} };
  const { bg, color } = p[cat];
  return (
    <div style={{ width:38,height:38,borderRadius:9,background:bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
      <span style={{ fontSize:11,fontWeight:800,color }}>{abbr}</span>
    </div>
  );
}

const categories = [
  { id:'edit', label:'Edit & Sign', tools:[
    { name:'Compress PDF',     abbr:'CMP', live:true,  slug:'compress-pdf' },
    { name:'Merge PDF',        abbr:'MRG', live:true,  slug:'merge-pdf' },
    { name:'Split PDF',        abbr:'SPL', live:true,  slug:'split-pdf' },
    { name:'Rotate PDF',       abbr:'ROT', live:true,  slug:'rotate-pdf' },
    { name:'Organize PDF',     abbr:'ORG', live:true,  slug:'organize-pdf' },
    { name:'Extract Pages',    abbr:'EXT', live:true,  slug:'extract-pdf-pages' },
    { name:'Delete Pages',     abbr:'DEL', live:true,  slug:'delete-pdf-pages' },
    { name:'Password Protect', abbr:'PWD', live:true,  slug:'password-protect-pdf' },
    { name:'Edit PDF',         abbr:'EDT', live:false, slug:null },
    { name:'Fill PDF',         abbr:'FLL', live:false, slug:null },
    { name:'Sign PDF',         abbr:'SGN', live:false, slug:null },
    { name:'Annotate PDF',     abbr:'ANN', live:false, slug:null },
    { name:'OCR PDF',          abbr:'OCR', live:false, slug:null },
    { name:'Translate PDF',    abbr:'TRL', live:false, slug:null },
    { name:'PDF Summarizer',   abbr:'SUM', live:false, slug:null },
    { name:'Remove Watermark', abbr:'RMW', live:false, slug:null },
  ]},
  { id:'from', label:'Convert from PDF', tools:[
    { name:'PDF to JPG',   abbr:'JPG', live:true,  slug:'pdf-to-jpg' },
    { name:'PDF to PNG',   abbr:'PNG', live:true,  slug:'pdf-to-png' },
    { name:'PDF to Text',  abbr:'TXT', live:true,  slug:'pdf-to-text' },
    { name:'PDF to Word',  abbr:'W',   live:false, slug:null },
    { name:'PDF to Excel', abbr:'XLS', live:false, slug:null },
    { name:'PDF to PPTX',  abbr:'PPT', live:false, slug:null },
    { name:'PDF to DOCX',  abbr:'DOC', live:false, slug:null },
    { name:'PDF to HTML',  abbr:'HTM', live:false, slug:null },
  ]},
  { id:'to', label:'Convert to PDF', tools:[
    { name:'JPG to PDF',   abbr:'PDF', live:true,  slug:'jpg-to-pdf' },
    { name:'PNG to PDF',   abbr:'PDF', live:true,  slug:'png-to-pdf' },
    { name:'Image to PDF', abbr:'PDF', live:true,  slug:'image-to-pdf' },
    { name:'Word to PDF',  abbr:'W',   live:false, slug:null },
    { name:'Excel to PDF', abbr:'XLS', live:false, slug:null },
    { name:'PPTX to PDF',  abbr:'PPT', live:false, slug:null },
  ]},
  { id:'image', label:'Image Tools', tools:[
    { name:'Compress Image',     abbr:'IMG', live:true,  slug:'compress-image' },
    { name:'HEIC to JPG',        abbr:'HIC', live:true,  slug:'heic-to-jpg' },
    { name:'JPG to PNG',         abbr:'PNG', live:true,  slug:'jpg-to-png' },
    { name:'PNG to JPG',         abbr:'JPG', live:true,  slug:'png-to-jpg' },
    { name:'JPG to WebP',        abbr:'WBP', live:true,  slug:'jpg-to-webp' },
    { name:'GIF to JPG',         abbr:'GIF', live:false, slug:null },
    { name:'Merge Images',       abbr:'MRG', live:true,  slug:'merge-images' },
    { name:'PNG to WebP',        abbr:'WBP', live:true,  slug:'png-to-webp' },
    { name:'Enhance Image',      abbr:'ENH', live:false, slug:null },
  ]},
  { id:'av', label:'Audio & Video', tools:[
    { name:'MP4 to MP3',  abbr:'MP3', live:false, slug:null },
    { name:'WAV to MP3',  abbr:'MP3', live:false, slug:null },
    { name:'MP3 to WAV',  abbr:'WAV', live:false, slug:null },
    { name:'MOV to MP4',  abbr:'MP4', live:false, slug:null },
    { name:'MKV to MP4',  abbr:'MP4', live:false, slug:null },
    { name:'MKV to MP3',  abbr:'MP3', live:false, slug:null },
    { name:'M4A to MP3',  abbr:'MP3', live:false, slug:null },
  ]},
];

const steps = [
  { n:'1', title:'Upload your file',      desc:'Drag and drop, or browse from your device. Supports PDF, Word, JPG, PNG, MP4, MP3 and more.' },
  { n:'2', title:'Choose a tool',         desc:'Select what you want to do — compress, convert, merge, split. It runs instantly in your browser.' },
  { n:'3', title:'Download the result',   desc:'Your file is ready in seconds. Download it directly — no email, no account, no waiting.' },
];

const faqs = [
  { q:'Is Breklo free?',                    a:'Yes. All live tools are free with no hidden limits. A Pro plan is coming for advanced features.' },
  { q:'Are my files safe?',                  a:'All processing runs in your browser. Files never reach our servers.' },
  { q:'Do I need an account?',               a:'No. Just upload your file and go.' },
  { q:"What file size is supported?",        a:'Up to 100 MB for PDF tools, 50 MB for image, audio and video.' },
  { q:"Why are some tools 'Coming soon'?",   a:'Those tools need server-side processing and are actively being built.' },
];

export default function Home() {
  const [activeCat, setActive] = useState('edit');
  const [dragging,  setDrag]   = useState(false);
  const [openFaq,   setFaq]    = useState(null);
  const cat = categories.find(c => c.id === activeCat);

  return (
    <div style={{ fontFamily:'inherit',background:'#fff',color:'#111',minHeight:'100vh' }}>
      <style>{`
        .nav-cat{font-size:14px;color:#555;cursor:pointer;transition:color .15s}
        .nav-cat:hover{color:#0071e3}
        .upload-zone{border:1.5px dashed #e2e8f0;border-radius:16px;padding:46px 28px;text-align:center;transition:all .15s;cursor:pointer;background:#fafafa}
        .upload-zone:hover,.upload-zone.drag{border-color:#0071e3;background:#f0f6ff}
        .cat-bar{background:#18181b;border-radius:12px;padding:5px;display:flex;gap:3px;overflow-x:auto;scrollbar-width:none}
        .cat-tab{border:none;border-radius:8px;padding:9px 18px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;color:#71717a;background:transparent;white-space:nowrap;transition:all .15s}
        .cat-tab:hover{color:#e4e4e7}
        .cat-tab.active{background:#fff;color:#18181b}
        .tool-card{background:#fff;border:1px solid #f0f0f0;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:10px;transition:all .14s;text-decoration:none;color:inherit}
        .tool-card.live{cursor:pointer}
        .tool-card.live:hover{border-color:#bfdbfe;box-shadow:0 2px 16px rgba(0,113,227,.07);transform:translateY(-1px)}
        .tool-card.live:hover .cname{color:#0071e3}
        .tool-card.soon{opacity:.38;cursor:default}
        .cname{font-size:13px;font-weight:500;color:#1a1a1a;line-height:1.35;transition:color .14s}
        .lbadge{font-size:10px;font-weight:600;color:#15803d;background:#dcfce7;padding:2px 7px;border-radius:4px;width:fit-content}
        .sbadge{font-size:10px;font-weight:600;color:#92400e;background:#fef3c7;padding:2px 7px;border-radius:4px;width:fit-content}
        .step-card{padding:28px 24px;border-radius:14px;border:1px solid #f0f0f0;background:#fff;transition:box-shadow .2s}
        .step-card:hover{box-shadow:0 6px 28px rgba(0,0,0,.06)}
        .faq-item{border-bottom:1px solid #f4f4f5}
        .faq-q{display:flex;justify-content:space-between;align-items:center;padding:18px 0;cursor:pointer;font-weight:500;font-size:15px;color:#111;gap:12px;transition:color .14s}
        .faq-q:hover{color:#0071e3}
        .faq-a{font-size:14px;color:#6b7280;line-height:1.75;padding-bottom:18px}
        .btn-primary{background:#0071e3;color:#fff;border:none;border-radius:10px;padding:12px 26px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background .15s;display:inline-flex;align-items:center;gap:8px}
        .btn-primary:hover{background:#005bbf}
        .btn-white{background:#fff;color:#0071e3;border:none;border-radius:10px;padding:12px 26px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px;transition:opacity .15s}
        .btn-white:hover{opacity:.88}
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ padding:'80px 2rem 68px',textAlign:'center',borderBottom:'1px solid #f4f4f5' }}>
        <p style={{ fontSize:12,fontWeight:600,letterSpacing:'1.2px',textTransform:'uppercase',color:'#0071e3',marginBottom:20 }}>PDF · Image · Audio · Video</p>
        <h1 style={{ fontSize:'clamp(36px,5.5vw,62px)',fontWeight:800,lineHeight:1.06,letterSpacing:'-2.5px',color:'#0a0a0a',marginBottom:20,maxWidth:660,margin:'0 auto 20px' }}>
          Online file tools for<br />all your needs
        </h1>
        <p style={{ fontSize:17,color:'#6b7280',fontWeight:300,lineHeight:1.7,maxWidth:440,margin:'0 auto 40px' }}>
          Convert, compress, and edit files — fast, free, and private. No installation needed.
        </p>
        <div className={`upload-zone${dragging?' drag':''}`} style={{ maxWidth:520,margin:'0 auto' }}
          onDragOver={e=>{e.preventDefault();setDrag(true)}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false)}}
        >
          <div style={{ width:50,height:50,background:'#0071e3',borderRadius:13,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Ico d={I.upload} size={22} color="#fff" sw={2.2}/>
          </div>
          <p style={{ fontWeight:700,fontSize:16,color:'#111',marginBottom:5 }}>Drop your file here</p>
          <p style={{ fontSize:13,color:'#9ca3af',marginBottom:24 }}>PDF, Word, JPG, PNG, MP4, MP3 — up to 100 MB</p>
          <button className="btn-primary" style={{ fontSize:15,padding:'13px 34px',margin:'0 auto' }}>
            Browse files <Ico d={I.arrow} size={14} color="#fff" sw={2.2}/>
          </button>
          <p style={{ fontSize:12,color:'#d1d5db',marginTop:14 }}>No account required</p>
        </div>
        <div style={{ display:'flex',gap:'2rem',justifyContent:'center',marginTop:28,flexWrap:'wrap' }}>
          {[[I.shield,'Secure & private'],[I.zap,'Instant results'],[I.globe,'No install needed']].map(([ic,l])=>(
            <span key={l} style={{ fontSize:13,color:'#9ca3af',display:'flex',alignItems:'center',gap:6 }}>
              <Ico d={ic} size={13} color="#c0c0c0" sw={1.8}/>{l}
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding:'32px 2rem',borderBottom:'1px solid #f4f4f5' }}>
        <div style={{ maxWidth:820,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)' }}>
          {[['27M','Files processed'],['50+','Tools available'],['100%','Browser-based'],['Free','No hidden costs']].map(([v,l],i)=>(
            <div key={l} style={{ textAlign:'center',padding:'0 16px',borderRight:i<3?'1px solid #f4f4f5':'none' }}>
              <div style={{ fontWeight:800,fontSize:28,color:'#111',letterSpacing:'-1.5px',lineHeight:1 }}>{v}</div>
              <div style={{ fontSize:12.5,color:'#9ca3af',marginTop:5 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ padding:'64px 2rem 72px',maxWidth:1140,margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <h2 style={{ fontSize:24,fontWeight:800,letterSpacing:'-0.8px',color:'#111',marginBottom:4 }}>All tools, one place</h2>
          <p style={{ fontSize:14,color:'#9ca3af' }}>Live tools are ready. More arriving soon.</p>
        </div>
        <div className="cat-bar" style={{ marginBottom:18 }}>
          {categories.map(c=>(
            <button key={c.id} className={`cat-tab${activeCat===c.id?' active':''}`} onClick={()=>setActive(c.id)}>{c.label}</button>
          ))}
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:9 }}>
          {cat.tools.map(t => t.live ? (
            <Link key={t.name} href={`/${t.slug}`} className="tool-card live">
              <TIcon abbr={t.abbr} cat={activeCat}/>
              <span className="cname">{t.name}</span>
              <span className="lbadge">Live</span>
            </Link>
          ) : (
            <div key={t.name} className="tool-card soon">
              <TIcon abbr={t.abbr} cat={activeCat}/>
              <span className="cname">{t.name}</span>
              <span className="sbadge">Soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:'#fafafa',borderTop:'1px solid #f4f4f5',borderBottom:'1px solid #f4f4f5',padding:'72px 2rem' }}>
        <div style={{ maxWidth:960,margin:'0 auto' }}>
          <div style={{ marginBottom:44 }}>
            <h2 style={{ fontSize:24,fontWeight:800,letterSpacing:'-0.8px',color:'#111',marginBottom:4 }}>How it works</h2>
            <p style={{ fontSize:14,color:'#9ca3af' }}>Three steps and you're done.</p>
          </div>
          <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14 }}>
            {steps.map(s=>(
              <div key={s.n} className="step-card">
                <div style={{ fontWeight:800,fontSize:32,color:'#e5e7eb',letterSpacing:'-2px',lineHeight:1,marginBottom:18 }}>{s.n}</div>
                <div style={{ fontWeight:700,fontSize:15,color:'#111',marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:13.5,color:'#6b7280',lineHeight:1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'#0a0a0a',padding:'72px 2rem',textAlign:'center' }}>
        <p style={{ fontSize:11,fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'#0071e3',marginBottom:16 }}>Get started</p>
        <h2 style={{ fontSize:30,fontWeight:800,letterSpacing:'-1.5px',color:'#fff',marginBottom:12 }}>
          All the file tools you need,<br/>in a single platform
        </h2>
        <p style={{ fontSize:15,color:'rgba(255,255,255,.4)',marginBottom:32 }}>No account. No credit card. Just upload and go.</p>
        <button className="btn-white">Upload a file <Ico d={I.arrow} size={14} color="#0071e3" sw={2.2}/></button>
      </section>

      {/* FAQ */}
      <section style={{ padding:'72px 2rem',maxWidth:660,margin:'0 auto' }}>
        <h2 style={{ fontSize:24,fontWeight:800,letterSpacing:'-0.8px',color:'#111',marginBottom:32 }}>Frequently asked questions</h2>
        {faqs.map((f,i)=>(
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={()=>setFaq(openFaq===i?null:i)}>
              <span>{f.q}</span>
              <span style={{ fontSize:18,color:openFaq===i?'#0071e3':'#d1d5db',flexShrink:0 }}>{openFaq===i?'−':'+'}</span>
            </div>
            {openFaq===i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </section>

      {/* BOTTOM TOOLS LIST */}
      <section style={{ borderTop:'1px solid #f4f4f5',background:'#fafafa',padding:'48px 2rem 36px' }}>
        <div style={{ maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:28 }}>
          {categories.map(c=>(
            <div key={c.id}>
              <div style={{ fontWeight:700,fontSize:12.5,color:'#111',marginBottom:12 }}>{c.label}</div>
              {c.tools.slice(0,6).map(t=>(
                t.live ? (
                  <Link key={t.name} href={`/${t.slug}`} style={{ fontSize:12.5,color:'#52525b',marginBottom:7,display:'block',transition:'color .14s' }}
                    onMouseEnter={e=>e.target.style.color='#0071e3'}
                    onMouseLeave={e=>e.target.style.color='#52525b'}
                  >{t.name}</Link>
                ) : (
                  <div key={t.name} style={{ fontSize:12.5,color:'#d1d5db',marginBottom:7 }}>{t.name}</div>
                )
              ))}
              <div style={{ fontSize:12,color:'#0071e3',cursor:'pointer',marginTop:6,fontWeight:600 }}>View all →</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
