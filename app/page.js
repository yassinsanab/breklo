'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { t, localeFromPath } from '@/lib/i18n';

/* ─── ICONS ──────────────────────────────────────────────── */
const I = {
  up:      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>,
  arr:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  shield:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12Z"/></svg>,
  zap:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>,
  globe:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
  lockBig: <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  dl:      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>,
  search:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>,
};

/* ─── TOOL SVG ICONS ─────────────────────────────────────── */
const TI = {
  edit:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>,
  sign:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c2.5-3 4-5 6-5s2 4 4 4 4-9 6-9"/><path d="M3 21h18"/></svg>,
  fill:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h8M7 13h10M7 17h4"/></svg>,
  annotate:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-3.1 6.6L18 22l-4.1-1.2A9 9 0 1 1 21 11.5Z"/></svg>,
  lock:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  translate: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h7M9 4v4c0 5-4 7-4 7M5 12s3 5 8 5"/><path d="M14 19l4-10 4 10M16 16h4"/></svg>,
  sparkle:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>,
  merge:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v4a4 4 0 0 0 4 4 4 4 0 0 1 4 4v4M8 18l4 4 4-4"/></svg>,
  split:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18M5 8l-3 4 3 4M19 8l3 4-3 4"/></svg>,
  rotate:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.5 15A9 9 0 1 1 19 6.4L23 10"/></svg>,
  organize:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  extract:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M12 12v6M9 15l3-3 3 3"/></svg>,
  trash:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>,
  compress:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9l4-4 4 4M4 15l4 4 4-4M20 9l-4-4-4 4M20 15l-4 4-4-4"/></svg>,
  doc:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/></svg>,
  docArr:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M8 14h6m0 0-2-2m2 2-2 2"/></svg>,
  docDown:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M11 12v6m0 0-2-2m2 2 2-2"/></svg>,
  image:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>,
  imgComp:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8l-3 3 3 3M16 8l3 3-3 3"/></svg>,
  resize:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>,
  audio:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  video:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-4v12l-6-4z"/></svg>,
  ocr:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 9h10M7 13h10M7 17h6"/></svg>,
};

/* ─── ALL TOOLS DATA ─────────────────────────────────────── */
const ALL_TOOLS = [
  // Edit & Sign
  { name:'Edit PDF',           cat:'Edit & Sign',       icon:TI.edit,      color:'blue',   live:true,  slug:'edit-pdf' },
  { name:'Add Text',           cat:'Edit & Sign',       icon:TI.edit,      color:'blue',   live:false, slug:null },
  { name:'Fill PDF',           cat:'Edit & Sign',       icon:TI.fill,      color:'blue',   live:false, slug:null },
  { name:'Sign PDF',           cat:'Edit & Sign',       icon:TI.sign,      color:'purple', live:false, slug:null },
  { name:'Annotate PDF',       cat:'Edit & Sign',       icon:TI.annotate,  color:'cyan',   live:false, slug:null },
  { name:'Highlight',          cat:'Edit & Sign',       icon:TI.edit,      color:'amber',  live:false, slug:null },
  { name:'Password Protect',   cat:'Edit & Sign',       icon:TI.lock,      color:'slate',  live:true,  slug:'password-protect-pdf' },
  { name:'Remove Watermark',   cat:'Edit & Sign',       icon:TI.sparkle,   color:'pink',   live:false, slug:null },
  { name:'Translate PDF',      cat:'Edit & Sign',       icon:TI.translate, color:'teal',   live:false, slug:null },
  { name:'PDF Summarizer',     cat:'Edit & Sign',       icon:TI.sparkle,   color:'purple', live:false, slug:null },
  // Convert
  { name:'PDF to Word',        cat:'Convert',           icon:TI.docArr,    color:'blue',   live:false, slug:null },
  { name:'PDF to JPG',         cat:'Convert',           icon:TI.docArr,    color:'orange', live:true,  slug:'pdf-to-jpg' },
  { name:'PDF to PNG',         cat:'Convert',           icon:TI.docArr,    color:'purple', live:true,  slug:'pdf-to-png' },
  { name:'PDF to Text',        cat:'Convert',           icon:TI.docArr,    color:'cyan',   live:true,  slug:'pdf-to-text' },
  { name:'PDF to Excel',       cat:'Convert',           icon:TI.docArr,    color:'green',  live:false, slug:null },
  { name:'PDF to PPTX',        cat:'Convert',           icon:TI.docArr,    color:'red',    live:false, slug:null },
  { name:'Word to PDF',        cat:'Convert',           icon:TI.docDown,   color:'blue',   live:false, slug:null },
  { name:'JPG to PDF',         cat:'Convert',           icon:TI.docDown,   color:'orange', live:true,  slug:'jpg-to-pdf' },
  { name:'PNG to PDF',         cat:'Convert',           icon:TI.docDown,   color:'purple', live:true,  slug:'png-to-pdf' },
  { name:'Image to PDF',       cat:'Convert',           icon:TI.docDown,   color:'teal',   live:true,  slug:'image-to-pdf' },
  { name:'Excel to PDF',       cat:'Convert',           icon:TI.docDown,   color:'green',  live:false, slug:null },
  { name:'PPTX to PDF',        cat:'Convert',           icon:TI.docDown,   color:'red',    live:false, slug:null },
  // Organize
  { name:'Merge PDF',          cat:'Organize pages',    icon:TI.merge,     color:'blue',   live:true,  slug:'merge-pdf' },
  { name:'Split PDF',          cat:'Organize pages',    icon:TI.split,     color:'purple', live:true,  slug:'split-pdf' },
  { name:'Rotate PDF',         cat:'Organize pages',    icon:TI.rotate,    color:'amber',  live:true,  slug:'rotate-pdf' },
  { name:'Organize PDF',       cat:'Organize pages',    icon:TI.organize,  color:'teal',   live:true,  slug:'organize-pdf' },
  { name:'Extract Pages',      cat:'Organize pages',    icon:TI.extract,   color:'cyan',   live:true,  slug:'extract-pdf-pages' },
  { name:'Delete Pages',       cat:'Organize pages',    icon:TI.trash,     color:'red',    live:true,  slug:'delete-pdf-pages' },
  // Compress
  { name:'Compress PDF',       cat:'Compress',          icon:TI.compress,  color:'blue',   live:true,  slug:'compress-pdf' },
  { name:'Compress Image',     cat:'Compress',          icon:TI.imgComp,   color:'amber',  live:true,  slug:'compress-image' },
  // Image Tools
  { name:'HEIC to JPG',        cat:'Image Tools',       icon:TI.image,     color:'green',  live:true,  slug:'heic-to-jpg' },
  { name:'JPG to PNG',         cat:'Image Tools',       icon:TI.image,     color:'blue',   live:true,  slug:'jpg-to-png' },
  { name:'PNG to JPG',         cat:'Image Tools',       icon:TI.image,     color:'orange', live:true,  slug:'png-to-jpg' },
  { name:'JPG to WebP',        cat:'Image Tools',       icon:TI.image,     color:'cyan',   live:true,  slug:'jpg-to-webp' },
  { name:'PNG to WebP',        cat:'Image Tools',       icon:TI.image,     color:'teal',   live:true,  slug:'png-to-webp' },
  { name:'WebP to JPG',        cat:'Image Tools',       icon:TI.image,     color:'purple', live:true,  slug:'webp-to-jpg' },
  { name:'GIF to JPG',         cat:'Image Tools',       icon:TI.image,     color:'pink',   live:true,  slug:'gif-to-jpg' },
  { name:'SVG to JPG',         cat:'Image Tools',       icon:TI.image,     color:'amber',  live:true,  slug:'svg-to-jpg' },
  { name:'Merge Images',       cat:'Image Tools',       icon:TI.merge,     color:'blue',   live:true,  slug:'merge-images' },
  { name:'Resize Image',       cat:'Image Tools',       icon:TI.resize,    color:'purple', live:true,  slug:'resize-image' },
  { name:'Enhance Image',      cat:'Image Tools',       icon:TI.sparkle,   color:'amber',  live:false, slug:null },
  { name:'Background Remover', cat:'Image Tools',       icon:TI.sparkle,   color:'pink',   live:false, slug:null },
  // Audio & Video
  { name:'MP4 to MP3',         cat:'Audio & Video',     icon:TI.video,     color:'purple', live:true,  slug:'mp4-to-mp3' },
  { name:'MP4 to WAV',         cat:'Audio & Video',     icon:TI.video,     color:'blue',   live:true,  slug:'mp4-to-wav' },
  { name:'WAV to MP3',         cat:'Audio & Video',     icon:TI.audio,     color:'green',  live:true,  slug:'wav-to-mp3' },
  { name:'MP3 to WAV',         cat:'Audio & Video',     icon:TI.audio,     color:'cyan',   live:true,  slug:'mp3-to-wav' },
  { name:'M4A to MP3',         cat:'Audio & Video',     icon:TI.audio,     color:'teal',   live:true,  slug:'m4a-to-mp3' },
  { name:'FLAC to MP3',        cat:'Audio & Video',     icon:TI.audio,     color:'amber',  live:true,  slug:'flac-to-mp3' },
  { name:'OGG to MP3',         cat:'Audio & Video',     icon:TI.audio,     color:'orange', live:true,  slug:'ogg-to-mp3' },
  { name:'MOV to MP4',         cat:'Audio & Video',     icon:TI.video,     color:'slate',  live:false, slug:null },
  { name:'MKV to MP4',         cat:'Audio & Video',     icon:TI.video,     color:'slate',  live:false, slug:null },
  // OCR & AI
  { name:'OCR PDF',            cat:'OCR & AI',          icon:TI.ocr,       color:'blue',   live:false, slug:null },
  { name:'Image to Text',      cat:'OCR & AI',          icon:TI.ocr,       color:'cyan',   live:false, slug:null },
];

const CATEGORIES = [...new Set(ALL_TOOLS.map(t => t.cat))];

const STATS_EN = [
  { n: '27M',  l: 'Files processed' },
  { n: '50+',  l: 'Tools available' },
  { n: '100%', l: 'Browser-based' },
  { n: 'Free', l: 'Forever' },
];
const STATS_DE = [
  { n: '27M',       l: 'Verarbeitete Dateien' },
  { n: '50+',       l: 'Verfügbare Tools' },
  { n: '100%',      l: 'Browser-basiert' },
  { n: 'Kostenlos', l: 'Für immer' },
];

const FAQS = [
  { q: 'Is Breklo free?',                  a: 'Yes. Every tool on Breklo is completely free. No daily limits, no watermarks, no upsells, no credit card required.' },
  { q: 'Do I need an account?',            a: 'No. Breklo works without any login, sign-up or email. Just open the page, drop a file, and download the result.' },
  { q: 'Are my files safe?',               a: 'Files processed by browser-based tools (PDF, image) never leave your device — they are handled locally using WebAssembly. Audio tools process locally too.' },
  { q: 'Do I need to install software?',   a: 'No. Everything runs in your browser. Any modern browser on any device works — nothing to download or update.' },
  { q: 'What file size is supported?',     a: 'Up to 100 MB for PDF tools, up to 50 MB for image and audio tools.' },
  { q: 'Why are some tools marked "soon"?',a: 'Those tools require server-side processing and are actively being built. They\'ll release gradually over the coming months.' },
];

const FAQS_DE = [
  { q: 'Ist Breklo kostenlos?',                     a: 'Ja. Jedes Tool auf Breklo ist komplett kostenlos. Keine Tageslimits, keine Wasserzeichen, kein Upselling, keine Kreditkarte erforderlich.' },
  { q: 'Brauche ich ein Konto?',                    a: 'Nein. Breklo funktioniert ohne Login, Anmeldung oder E-Mail. Einfach Seite öffnen, Datei ablegen und Ergebnis herunterladen.' },
  { q: 'Sind meine Dateien sicher?',                a: 'Dateien, die von browserbasierten Tools (PDF, Bild) verarbeitet werden, verlassen dein Gerät nie — sie werden lokal mit WebAssembly bearbeitet. Auch Audio-Tools laufen lokal.' },
  { q: 'Muss ich Software installieren?',           a: 'Nein. Alles läuft im Browser. Jeder moderne Browser auf jedem Gerät funktioniert — nichts herunterzuladen oder zu aktualisieren.' },
  { q: 'Welche Dateigröße wird unterstützt?',       a: 'Bis 100 MB für PDF-Tools, bis 50 MB für Bild- und Audio-Tools.' },
  { q: 'Warum sind manche Tools mit „bald" markiert?', a: 'Diese Tools benötigen serverseitige Verarbeitung und werden gerade entwickelt. Sie werden in den nächsten Monaten schrittweise veröffentlicht.' },
];

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  const [q, setQ]           = useState('');
  const [dragging, setDrag] = useState(false);
  const [openFaq, setFaq]   = useState(0);

  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const isGerman = locale === 'de';
  const faqs = isGerman ? FAQS_DE : FAQS;

  const query = q.trim().toLowerCase();
  const grouped = CATEGORIES.map(cat => ({
    cat,
    tools: ALL_TOOLS.filter(t => t.cat === cat && (!query || t.name.toLowerCase().includes(query))),
  })).filter(g => g.tools.length > 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        :root{
          --brand:#2563eb;--brand-ink:#1d4ed8;--brand-soft:#eff4ff;--brand-soft-2:#dbeafe;
          --brand-glow:rgba(37,99,235,.22);
          --live:#16a34a;--live-soft:#ecfdf5;--soon:#d97706;--soon-soft:#fffbeb;
          --ink:#0a0a0a;--ink-2:#18181b;--ink-3:#3f3f46;--ink-4:#71717a;--ink-5:#a1a1aa;--ink-6:#d4d4d8;
          --paper:#fff;--paper-2:#fafafa;--paper-3:#f4f4f5;--line:#e4e4e7;--line-2:#ededef;
          --container:1180px;--section-py:96px;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',ui-sans-serif,system-ui,sans-serif;background:#fff;color:var(--ink);-webkit-font-smoothing:antialiased}
        a{color:inherit;text-decoration:none}

        /* HERO */
        .hero{position:relative;padding:clamp(40px,8vw,88px) 16px clamp(40px,6vw,80px);overflow:hidden}
        .hero-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(50% 50% at 50% -10%,var(--brand-soft) 0%,transparent 65%);mask-image:linear-gradient(180deg,#000,transparent)}
        .eyebrow{display:inline-flex;gap:8px;font-size:11.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--brand-ink);font-weight:500;margin-bottom:20px;font-variant-numeric:tabular-nums}
        .eyebrow .sep{color:var(--ink-6)}
        .h1{font-size:clamp(44px,6.6vw,80px);line-height:1.02;font-weight:700;letter-spacing:-.04em;color:var(--ink);margin:0 0 18px}
        .h1 .soft{color:var(--ink-3);font-weight:400}
        .hero-sub{font-size:19px;color:var(--ink-4);max-width:560px;margin:0 auto;font-weight:400}
        .drop{background:#fff;border:2px dashed var(--ink-6);border-radius:20px;padding:42px 32px 32px;text-align:center;transition:border-color .15s,background .15s;cursor:pointer;margin-top:40px;max-width:560px;margin-left:auto;margin-right:auto}
        .drop:hover,.drop.drag{border-color:var(--brand);background:var(--brand-soft)}
        .drop-ic{width:64px;height:64px;border-radius:18px;margin:0 auto 16px;background:var(--brand);color:#fff;display:grid;place-items:center;box-shadow:0 10px 22px var(--brand-glow)}
        .drop-title{font-size:20px;font-weight:600;color:var(--ink);letter-spacing:-.015em}
        .drop-fmts{margin-top:6px;color:var(--ink-4);font-size:14px}
        .drop-or{display:flex;align-items:center;gap:14px;margin:18px auto;max-width:200px;color:var(--ink-5);font-size:13px;font-weight:500}
        .drop-or::before,.drop-or::after{content:"";flex:1;height:1px;background:var(--line)}
        .drop-foot{margin-top:14px;font-size:13px;color:var(--ink-5)}
        .trust-row{margin:22px auto 0;display:flex;gap:18px;justify-content:center;flex-wrap:wrap;color:var(--ink-4);font-size:13.5px}
        .trust-row span{display:inline-flex;align-items:center;gap:6px}
        .trust-row svg{color:var(--brand)}
        .stats-row{margin:64px auto 0;max-width:980px;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
        .stat{padding:28px 16px;text-align:center;border-right:1px solid var(--line);display:flex;flex-direction:column;gap:6px;align-items:center}
        .stat:last-child{border-right:0}
        .stat .n{font-size:36px;letter-spacing:-.035em;font-weight:700;color:var(--ink);line-height:1}
        .stat .l{font-size:13.5px;color:var(--ink-4)}

        /* TOOLS SECTION */
        .section{padding:var(--section-py) 0}
        .section-alt{background:var(--paper-2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
        .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 24px}
        .section-head{text-align:center;max-width:680px;margin:0 auto 48px}
        .h2{font-size:clamp(32px,4vw,48px);font-weight:700;letter-spacing:-.035em;line-height:1.05;margin:0 0 12px;color:var(--ink)}
        .section-sub{margin:0;color:var(--ink-4);font-size:17px}
        .tools-search{max-width:480px;margin:0 auto 36px;position:relative}
        .tools-search input{width:100%;height:48px;padding:0 18px 0 46px;background:#fff;border:1px solid var(--line);border-radius:12px;font:15px/1 'Inter',sans-serif;color:var(--ink);outline:0;transition:border-color .15s,box-shadow .15s}
        .tools-search input:focus{border-color:var(--brand);box-shadow:0 0 0 3px rgba(37,99,235,.14)}
        .tools-search input::placeholder{color:var(--ink-5)}
        .sic{position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--ink-5);pointer-events:none}
        .tools-flow{column-count:4;column-gap:24px}
        .tools-flow>*{break-inside:avoid;margin-bottom:18px;display:block}
        .cat-head{font-size:15px;font-weight:600;color:var(--ink);letter-spacing:-.01em;margin:18px 0 14px;padding:0;display:flex;align-items:center;gap:8px}
        .cat-head:first-child{margin-top:0}
        .cat-cnt{font-size:11px;color:var(--ink-5);font-weight:400}
        .tile{display:flex;align-items:center;gap:14px;padding:14px 18px 14px 14px;background:#fff;border:1px solid var(--line);border-radius:12px;transition:transform .12s,border-color .15s,box-shadow .15s;position:relative;text-decoration:none;color:inherit}
        .tile:hover{border-color:var(--ink-6);transform:translateY(-1px);box-shadow:0 1px 2px rgba(0,0,0,.04),0 10px 22px -10px rgba(0,0,0,.10)}
        .tile-ic{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;flex-shrink:0}
        .tile-ic svg{width:18px;height:18px;display:block}
        .tile-name{font-size:14.5px;font-weight:500;color:var(--ink-2);letter-spacing:-.005em;line-height:1.25}
        .tile-soon{margin-left:auto;font-size:10px;color:var(--ink-5);background:var(--paper-2);border:1px solid var(--line);padding:2px 6px;border-radius:5px;letter-spacing:.04em}
        .tile-live{margin-left:auto;width:7px;height:7px;border-radius:50%;background:var(--live);box-shadow:0 0 0 3px var(--live-soft)}
        .tile[data-soon="true"] .tile-ic{filter:saturate(.75);opacity:.85}
        .tile[data-soon="true"] .tile-name{color:var(--ink-3)}
        .tile.blue .tile-ic{background:#dbeafe;color:#1d4ed8}
        .tile.cyan .tile-ic{background:#cffafe;color:#0891b2}
        .tile.teal .tile-ic{background:#ccfbf1;color:#0d9488}
        .tile.green .tile-ic{background:#dcfce7;color:#15803d}
        .tile.amber .tile-ic{background:#fef3c7;color:#b45309}
        .tile.orange .tile-ic{background:#ffedd5;color:#c2410c}
        .tile.red .tile-ic{background:#fee2e2;color:#b91c1c}
        .tile.pink .tile-ic{background:#fce7f3;color:#be185d}
        .tile.purple .tile-ic{background:#ede9fe;color:#6d28d9}
        .tile.slate .tile-ic{background:#e2e8f0;color:#334155}

        /* STEPS */
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
        .step{background:#fff;border:1px solid var(--line);border-radius:20px;padding:24px;display:flex;flex-direction:column;gap:20px;transition:border-color .2s,transform .15s}
        .step:hover{border-color:var(--ink-6);transform:translateY(-2px)}
        .step-illust{background:linear-gradient(180deg,var(--paper-2),var(--paper-3));border-radius:14px;height:200px;padding:18px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
        .step-n{display:inline-grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--brand);color:#fff;font-weight:600;font-size:14px}
        .step-meta{display:flex;align-items:center;gap:12px}
        .step h4{margin:0;font-size:20px;font-weight:600;letter-spacing:-.02em;color:var(--ink)}
        .step p{margin:0;color:var(--ink-4);font-size:14.5px;line-height:1.6}
        /* step illustrations */
        .illu-1{width:100%;height:100%;border:2px dashed var(--ink-6);border-radius:12px;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;position:relative}
        .illu-1 .ic{width:38px;height:38px;border-radius:11px;background:var(--brand);color:#fff;display:grid;place-items:center}
        .illu-1 .lbl{font-size:13px;color:var(--ink-3);font-weight:500}
        .illu-1 .fc{position:absolute;bottom:14px;left:14px;background:#fff;border:1px solid var(--line);border-radius:8px;padding:7px 10px;display:flex;align-items:center;gap:8px;font-size:11.5px;color:var(--ink-2);font-weight:500;box-shadow:0 8px 18px rgba(0,0,0,.08);transform:rotate(-4deg)}
        .illu-1 .fc .red{width:18px;height:22px;border-radius:3px;background:#dc2626;color:#fff;display:grid;place-items:center;font-size:8px;font-weight:700;letter-spacing:.04em}
        .illu-2{width:100%;height:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;align-content:center;padding:6px}
        .illu-2 .chip{background:#fff;border:1px solid var(--line);border-radius:8px;padding:8px 6px;display:flex;flex-direction:column;align-items:center;gap:3px;font-size:9.5px;color:var(--ink-4)}
        .illu-2 .chip .code{padding:1px 5px;border-radius:4px;background:var(--paper-3);color:var(--ink-3);font-weight:500;font-size:9px}
        .illu-2 .chip.active{background:var(--brand-soft);border-color:var(--brand);color:var(--brand-ink);box-shadow:0 0 0 3px rgba(37,99,235,.14)}
        .illu-2 .chip.active .code{background:var(--brand);color:#fff}
        .illu-3{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
        .illu-3 .fc{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;min-width:210px;box-shadow:0 6px 18px rgba(0,0,0,.06)}
        .illu-3 .fc .red{width:30px;height:38px;border-radius:5px;background:#dc2626;color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700;letter-spacing:.04em}
        .illu-3 .fc .meta{flex:1;display:flex;flex-direction:column;gap:2px}
        .illu-3 .fc .nm{font-size:13px;font-weight:600;color:var(--ink)}
        .illu-3 .fc .sz{font-size:11px;color:var(--ink-5)}
        .illu-3 .acts{display:flex;gap:6px}
        .illu-3 .pill{display:inline-flex;align-items:center;gap:5px;padding:6px 10px;border-radius:7px;font-size:11.5px;font-weight:500;background:#fff;border:1px solid var(--line);color:var(--ink-3)}
        .illu-3 .pill.p{background:var(--brand);color:#fff;border-color:var(--brand)}

        /* FEATURES */
        .feat-stack{display:flex;flex-direction:column;gap:80px}
        .feat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:64px;align-items:center}
        .feat-row.flip .feat-text{order:2}
        .feat-text h3{font-size:clamp(26px,2.8vw,36px);font-weight:700;letter-spacing:-.03em;line-height:1.1;margin:0 0 14px;color:var(--ink);max-width:440px}
        .feat-text p{font-size:17px;color:var(--ink-4);margin:0;line-height:1.6;max-width:480px}
        .feat-tag{display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:999px;background:var(--brand-soft);color:var(--brand-ink);font-size:13px;font-weight:600;margin-bottom:16px}
        .feat-tag .num{width:22px;height:22px;border-radius:50%;background:var(--brand);color:#fff;display:grid;place-items:center;font-size:11px}
        .feat-art{background:#fff;border:1px solid var(--line);border-radius:24px;height:360px;padding:28px;position:relative;overflow:hidden;box-shadow:0 30px 60px -30px rgba(0,0,0,.10)}
        /* feature art: formats fan */
        .fan{position:absolute;top:50%;left:50%;width:100px;height:130px}
        .fan .card{position:absolute;top:0;left:0;width:90px;height:120px;border-radius:12px;background:linear-gradient(135deg,var(--c1),var(--c2));display:grid;place-items:center;color:#fff;font-weight:700;font-size:18px;box-shadow:0 8px 24px rgba(0,0,0,.18)}
        /* feature art: privacy */
        .feat-art.privacy{background:linear-gradient(180deg,var(--brand-soft),#fff);display:flex;align-items:center;justify-content:center}
        .priv-lock{width:120px;height:120px;border-radius:32px;background:#fff;border:1px solid var(--line);display:grid;place-items:center;color:var(--brand);box-shadow:0 20px 40px var(--brand-glow);position:relative;z-index:1}
        .priv-ring{position:absolute;border-radius:50%;border:1px solid var(--brand)}
        .priv-badge{position:absolute;background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px 12px;font-size:11.5px;font-weight:500;color:var(--ink-2);display:flex;align-items:center;gap:7px;box-shadow:0 8px 18px rgba(0,0,0,.06)}
        .priv-badge .dot{width:7px;height:7px;border-radius:50%;background:var(--live);animation:pulse 1.8s ease-in-out infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        /* feature art: speed */
        .feat-art.speed{display:flex;align-items:center;justify-content:center}
        .pw{display:flex;flex-direction:column;gap:10px;width:100%}
        .timer-badge{font-size:28px;font-weight:700;color:var(--ink);letter-spacing:-.04em;margin-bottom:4px}
        .prog{display:flex;align-items:center;gap:10px;font-size:12.5px}
        .prog .nm{width:72px;color:var(--ink-3);font-weight:500;flex-shrink:0}
        .prog .bar{flex:1;height:6px;background:var(--paper-3);border-radius:3px;overflow:hidden}
        .prog .fill{height:100%;background:var(--brand);border-radius:3px;transition:width .3s}
        .prog .pct{width:32px;text-align:right;color:var(--ink-4);font-size:11px}
        /* feature art: browser */
        .feat-art.browser{display:flex;align-items:center;justify-content:center}
        .bwin{background:#fff;border:1px solid var(--line);border-radius:16px;overflow:hidden;width:100%;max-width:320px;box-shadow:0 16px 40px rgba(0,0,0,.08)}
        .bwin-bar{background:var(--paper-2);border-bottom:1px solid var(--line);padding:10px 14px;display:flex;align-items:center;gap:10px}
        .bdots{display:flex;gap:5px}
        .bdots i{width:10px;height:10px;border-radius:50%;display:block}
        .burl{flex:1;background:#fff;border:1px solid var(--line);border-radius:6px;height:24px;display:flex;align-items:center;justify-content:center;font-size:11.5px;color:var(--ink-4)}
        .bwin-body{padding:28px 24px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center}
        .bwin-body .ic{width:52px;height:52px;border-radius:14px;background:var(--brand);color:#fff;display:grid;place-items:center}
        .bwin-body .ttl{font-size:15px;font-weight:600;color:var(--ink)}
        .bwin-body .sub{font-size:12.5px;color:var(--ink-4)}

        /* FAQ */
        .faq-list{max-width:680px;margin:0 auto}
        .faq-item{border-bottom:1px solid var(--line-2);cursor:pointer}
        .faq-q{display:flex;justify-content:space-between;align-items:center;padding:20px 0;font-weight:500;font-size:15.5px;color:var(--ink);gap:16px;transition:color .14s}
        .faq-q:hover{color:var(--brand)}
        .faq-plus{font-size:22px;color:var(--ink-5);flex-shrink:0;line-height:1;transition:transform .2s,color .14s}
        .faq-item.open .faq-plus{transform:rotate(45deg);color:var(--brand)}
        .faq-a{font-size:15px;color:var(--ink-4);line-height:1.75;padding-bottom:20px}

        /* CTA */
        .cta-banner{background:var(--brand);border-radius:24px;padding:clamp(40px,6vw,72px) clamp(20px,4vw,48px);text-align:center;position:relative;overflow:hidden}
        .cta-banner::before{content:"";position:absolute;inset:0;background:radial-gradient(60% 80% at 50% 120%,rgba(255,255,255,.08) 0%,transparent 70%)}
        .cta-banner h3{font-size:clamp(28px,3.5vw,44px);font-weight:700;letter-spacing:-.035em;color:#fff;margin:0 0 12px;position:relative}
        .cta-banner p{font-size:18px;color:rgba(255,255,255,.7);margin:0 0 36px;position:relative}

        /* TOOLS INDEX / FOOTER TOOLS */
        .tools-index{background:var(--paper-2);border-top:1px solid var(--line);padding:80px 0}
        .tools-cats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:32px;margin-top:36px}
        .tools-cat h5{font-size:13px;font-weight:600;color:var(--ink);margin:0 0 14px;display:flex;align-items:center;gap:6px}
        .tools-cat h5 .cnt{font-size:11px;color:var(--ink-5);font-weight:400}
        .tools-cat ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}
        .tools-cat li a{font-size:13px;color:var(--ink-4);display:flex;align-items:center;gap:6px;transition:color .14s}
        .tools-cat li a:hover{color:var(--brand)}
        .tools-cat li a .dot{width:5px;height:5px;border-radius:50%;background:var(--live);flex-shrink:0}
        .tools-cat li a.soon{color:var(--ink-6)}
        .tools-cat li a.soon .dot{background:var(--ink-6)}
        .soon-tag{font-size:10px;color:var(--ink-5);border:1px solid var(--line);padding:1px 5px;border-radius:4px;margin-left:auto}

        /* BUTTONS */
        .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:44px;padding:0 20px;border-radius:10px;font-size:14.5px;font-weight:600;letter-spacing:-.005em;border:1px solid transparent;color:var(--ink);transition:transform .08s,background .15s,border-color .15s;white-space:nowrap;cursor:pointer;font-family:inherit}
        .btn:active{transform:translateY(.5px)}
        .btn-brand{background:var(--brand);color:#fff;border-color:var(--brand);box-shadow:0 1px 0 rgba(255,255,255,.18) inset,0 8px 18px var(--brand-glow)}
        .btn-brand:hover{background:var(--brand-ink)}
        .btn-ink{background:var(--ink);color:#fff;border-color:var(--ink)}
        .btn-ink:hover{background:var(--ink-2)}
        .btn-white{background:#fff;color:var(--brand);border-color:rgba(255,255,255,.3)}
        .btn-white:hover{background:rgba(255,255,255,.9)}
        .btn-lg{height:52px;padding:0 24px;font-size:15.5px;border-radius:12px}

        @media(max-width:1080px){.tools-flow{column-count:3}.feat-row{gap:40px}.tools-cats{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:800px){.tools-flow{column-count:2}.steps{grid-template-columns:1fr}.feat-row,.feat-row.flip .feat-text{grid-template-columns:1fr;order:unset}.feat-art{height:240px}.stats-row{grid-template-columns:repeat(2,1fr)}.tools-cats{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:520px){.tools-flow{column-count:1}.stats-row{grid-template-columns:1fr}}
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow">
            {isGerman ? (
              <>
                <span>PDF</span><span className="sep">·</span>
                <span>BILD</span><span className="sep">·</span>
                <span>AUDIO</span><span className="sep">·</span>
                <span>VIDEO</span>
              </>
            ) : (
              <>
                <span>PDF</span><span className="sep">·</span>
                <span>IMAGE</span><span className="sep">·</span>
                <span>AUDIO</span><span className="sep">·</span>
                <span>VIDEO</span>
              </>
            )}
          </div>
          <h1 className="h1">
            {isGerman ? 'Online-Datei-Tools für' : 'Online file tools for'}<br />
            <span className="soft">{isGerman ? 'alle deine Bedürfnisse.' : 'all your needs.'}</span>
          </h1>
          <p className="hero-sub">
            {isGerman
              ? 'Konvertieren, komprimieren und bearbeiten — schnell, kostenlos und privat. Keine Installation, kein Konto, kein Wasserzeichen.'
              : 'Convert, compress, and edit files — fast, free, and private. No installation needed, no account, no watermark.'
            }
          </p>

          <div
            className={`drop${dragging ? ' drag' : ''}`}
            onDragOver={e => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={e => { e.preventDefault(); setDrag(false); window.location.href = isGerman ? '/de/edit-pdf' : '/edit-pdf'; }}
            onClick={() => window.location.href = isGerman ? '/de/edit-pdf' : '/edit-pdf'}
          >
            <div className="drop-ic">{I.up}</div>
            <div className="drop-title">{isGerman ? 'Datei hier ablegen' : 'Drop your file here'}</div>
            <div className="drop-fmts">{isGerman ? 'PDF, Word, JPG, PNG, MP4, MP3 — bis zu 100 MB' : 'PDF, Word, JPG, PNG, MP4, MP3 — up to 100 MB'}</div>
            <div className="drop-or"><span>{isGerman ? 'oder' : 'or'}</span></div>
            <button className="btn btn-brand btn-lg" onClick={e => { e.stopPropagation(); window.location.href = isGerman ? '/de/edit-pdf' : '/edit-pdf'; }}>{isGerman ? 'Datei auswählen' : 'Browse files'}</button>
            <div className="drop-foot">{isGerman ? '100 % kostenlos · Kein Konto erforderlich' : '100% free · No account required'}</div>
          </div>

          <div className="trust-row">
            <span>{I.shield} {isGerman ? 'Sicher & privat' : 'Secure & private'}</span>
            <span>{I.zap} {isGerman ? 'Sofortige Ergebnisse' : 'Instant results'}</span>
            <span>{I.globe} {isGerman ? 'Keine Installation' : 'No install needed'}</span>
          </div>

          <div className="stats-row">
            {(isGerman ? STATS_DE : STATS_EN).map((s, i) => (
              <div key={i} className="stat">
                <div className="n">{s.n}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL TOOLS ── */}
      <section className="section" id="tools">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{isGerman ? 'Alle Tools an einem Ort.' : 'All tools, one place.'}</h2>
            <p className="section-sub">{isGerman ? `${ALL_TOOLS.length} Tools für PDF, Bild, Audio und Video. Live-Tools funktionieren jetzt — weitere sind in Arbeit.` : `${ALL_TOOLS.length} tools across PDF, image, audio and video. Live tools work right now — soon ones are on the way.`}</p>
          </div>

          <div className="tools-search">
            <span className="sic">{I.search}</span>
            <input
              placeholder={isGerman ? `${ALL_TOOLS.length}+ Tools durchsuchen…` : `Search ${ALL_TOOLS.length}+ tools…`}
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>

          {grouped.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--ink-4)', padding: '32px 0' }}>{isGerman ? `Keine Tools gefunden für „${q}".` : `No tools match "${q}".`}</div>
          ) : (
            <div className="tools-flow">
              {grouped.flatMap(({ cat, tools }) => [
                <h3 key={`h-${cat}`} className="cat-head">
                  {cat} <span className="cat-cnt">{tools.length}</span>
                </h3>,
                ...tools.map(t => {
                  const El = t.live ? Link : 'div';
                  const props = t.live ? { href: isGerman ? `/de/${t.slug}` : `/${t.slug}` } : {};
                  return (
                    <El
                      key={t.name}
                      {...props}
                      className={`tile ${t.color}`}
                      data-soon={!t.live}
                      title={!t.live ? (isGerman ? 'Bald verfügbar' : 'Coming soon') : t.name}
                    >
                      <span className="tile-ic">{t.icon}</span>
                      <span className="tile-name">{t.name}</span>
                      {t.live
                        ? <span className="tile-live" aria-label="Live" />
                        : <span className="tile-soon">{isGerman ? 'bald' : 'soon'}</span>
                      }
                    </El>
                  );
                }),
              ])}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{isGerman ? 'So funktioniert\'s.' : 'How it works.'}</h2>
            <p className="section-sub">{isGerman ? 'Drei Schritte und du bist fertig. Keine Konten, keine Installation, keine Überraschungen.' : 'Three steps and you\'re done. No accounts, no installs, no surprises.'}</p>
          </div>
          <div className="steps">
            {/* Step 1 */}
            <div className="step">
              <div className="step-illust">
                <div className="illu-1">
                  <div className="ic">{I.up}</div>
                  <div className="lbl">Drag & drop or browse</div>
                  <div className="fc"><span className="red">PDF</span><span>report.pdf</span></div>
                </div>
              </div>
              <div className="step-meta"><span className="step-n">1</span><h4>{isGerman ? 'Datei hochladen' : 'Upload your file'}</h4></div>
              <p>{isGerman ? 'Per Drag & Drop oder über den Auswahl-Button. Unterstützt PDF, Word, JPG, PNG, MP4, MP3 und mehr — bis 100 MB.' : 'Drag and drop, or browse from your device. Supports PDF, Word, JPG, PNG, MP4, MP3 and more — up to 100 MB.'}</p>
            </div>

            {/* Step 2 */}
            <div className="step">
              <div className="step-illust">
                <div className="illu-2">
                  {[['CMP','Compress',true],['MRG','Merge',false],['SPL','Split',false],['ROT','Rotate',false],['P2J','To JPG',false],['PWD','Lock',false]].map(([code,label,active]) => (
                    <div key={code} className={`chip${active ? ' active' : ''}`}>
                      <span className="code">{code}</span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="step-meta"><span className="step-n">2</span><h4>{isGerman ? 'Tool auswählen' : 'Choose a tool'}</h4></div>
              <p>{isGerman ? 'Wähle, was du tun möchtest — komprimieren, konvertieren, zusammenführen, teilen. Läuft sofort in deinem Browser.' : 'Select what you want to do — compress, convert, merge, split. It runs instantly in your browser.'}</p>
            </div>

            {/* Step 3 */}
            <div className="step">
              <div className="step-illust">
                <div className="illu-3">
                  <div className="fc">
                    <span className="red">PDF</span>
                    <div className="meta">
                      <span className="nm">report.pdf</span>
                      <span className="sz">412 KB · –84%</span>
                    </div>
                  </div>
                  <div className="acts">
                    <span className="pill p">{I.dl} Download</span>
                    <span className="pill">Share</span>
                  </div>
                </div>
              </div>
              <div className="step-meta"><span className="step-n">3</span><h4>{isGerman ? 'Ergebnis herunterladen' : 'Download the result'}</h4></div>
              <p>{isGerman ? 'Deine Datei ist in Sekunden fertig. Lade sie direkt herunter — keine E-Mail, kein Konto, kein Warten.' : 'Your file is ready in seconds. Download it directly — no email, no account, no waiting.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{isGerman ? 'Gebaut für das, was du wirklich mit Dateien machst.' : <>Built around the things you<br />actually do with files.</>}</h2>
            <p className="section-sub">{isGerman ? 'Kostenlos, privat und schnell — drei Prinzipien, die jedes Tool auf Breklo prägen.' : 'Free, private, and fast — three principles that drive every tool on Breklo.'}</p>
          </div>
          <div className="feat-stack">

            {/* 1 — Free */}
            <div className="feat-row">
              <div className="feat-text">
                <div className="feat-tag"><span className="num">1</span> {isGerman ? 'Kostenlos' : 'Free'}</div>
                <h3>{isGerman ? 'Komplett kostenlos, für immer.' : 'Completely free, forever.'}</h3>
                <p>{isGerman ? 'Jedes Tool auf Breklo ist gratis. Keine Tageslimits, keine Wasserzeichen, kein Upselling, keine Kreditkarte. Wir zahlen für die Server, damit du dich nicht darum kümmern musst.' : 'Every tool on Breklo is free. No daily limits, no watermarks, no upsells, no credit card. We pay for the servers so you don\'t have to think about it.'}</p>
              </div>
              <div className="feat-art" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="fan">
                  {[
                    { label: 'PDF',  c1: '#dc2626', c2: '#991b1b', rot: -22 },
                    { label: 'DOCX', c1: '#7c3aed', c2: '#5b21b6', rot: -11 },
                    { label: 'JPG',  c1: '#2563eb', c2: '#1d4ed8', rot: 0 },
                    { label: 'PNG',  c1: '#16a34a', c2: '#15803d', rot: 11 },
                    { label: 'MP4',  c1: '#ea580c', c2: '#c2410c', rot: 22 },
                  ].map(({ label, c1, c2, rot }) => (
                    <div key={label} className="card" style={{ transform: `translate(-50%,-50%) rotate(${rot}deg)`, '--c1': c1, '--c2': c2 }}>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2 — Private */}
            <div className="feat-row flip">
              <div className="feat-text">
                <div className="feat-tag"><span className="num">2</span> {isGerman ? 'Privat' : 'Private'}</div>
                <h3>{isGerman ? 'Deine Dateien bleiben deine Dateien.' : 'Your files stay your files.'}</h3>
                <p>{isGerman ? 'Die Verarbeitung passiert wenn möglich direkt in deinem Browser. Alles, was wir berühren, ist verschlüsselt und wird innerhalb einer Stunde gelöscht — oder sofort beim Schließen des Tabs.' : 'Processing happens in your browser whenever possible. Anything we touch is encrypted in transit and deleted within an hour — or instantly when you close the tab.'}</p>
              </div>
              <div className="feat-art privacy">
                <div className="priv-ring" style={{ width: 280, height: 280, opacity: .10 }} />
                <div className="priv-ring" style={{ width: 200, height: 200, opacity: .18 }} />
                <div className="priv-lock">{I.lockBig}</div>
                <div className="priv-badge" style={{ bottom: 36, left: 28 }}><span className="dot" />Encrypted</div>
                <div className="priv-badge" style={{ top: 40, right: 28 }}><span className="dot" />Auto-delete · 1h</div>
              </div>
            </div>

            {/* 3 — Fast */}
            <div className="feat-row">
              <div className="feat-text">
                <div className="feat-tag"><span className="num">3</span> {isGerman ? 'Schnell' : 'Fast'}</div>
                <h3>{isGerman ? 'Sofortige Ergebnisse, keine Wartebildschirme.' : 'Instant results, no waiting screens.'}</h3>
                <p>{isGerman ? 'Unsere Engine kompiliert zu WebAssembly und läuft lokal — ein 200-seitiges PDF ist in unter zwei Sekunden komprimiert. Kein Upload-Balken, keine Warteschlange, keine „E-Mail wenn fertig".' : 'Our document engine compiles to WebAssembly and runs locally — so a 200-page PDF compresses in under two seconds. No upload bars, no queue, no email-when-it\'s-ready.'}</p>
              </div>
              <div className="feat-art speed">
                <div className="pw">
                  <div className="timer-badge">1.8s</div>
                  {[['Parse',100],['Compress',100],['Optimize',72],['Encode',24]].map(([nm, pct]) => (
                    <div key={nm} className="prog">
                      <span className="nm">{nm}</span>
                      <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
                      <span className="pct">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 — Browser-first */}
            <div className="feat-row flip">
              <div className="feat-text">
                <div className="feat-tag"><span className="num">4</span> Browser-first</div>
                <h3>{isGerman ? 'Keine Software zum Herunterladen.' : 'No software to download.'}</h3>
                <p>{isGerman ? 'Seite öffnen, Datei ablegen, Ergebnis bekommen. Funktioniert auf jedem modernen Browser, auf jedem Gerät — Desktop, Tablet, Handy. Nichts zu installieren, nichts zu aktualisieren, nichts zu deinstallieren.' : 'Open the page, drop a file, get a result. Works on any modern browser, on any device — desktop, tablet, phone. Nothing to install, nothing to update, nothing to uninstall.'}</p>
              </div>
              <div className="feat-art browser">
                <div className="bwin">
                  <div className="bwin-bar">
                    <div className="bdots">
                      <i style={{ background: '#fca5a5' }} />
                      <i style={{ background: '#fde68a' }} />
                      <i style={{ background: '#86efac' }} />
                    </div>
                    <div className="burl">breklo.com</div>
                    <div style={{ width: 48 }} />
                  </div>
                  <div className="bwin-body">
                    <div className="ic">{I.up}</div>
                    <div className="ttl">Ready in your browser</div>
                    <div className="sub">No installer · No plug-ins · No account</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2 className="h2">{isGerman ? 'Häufig gestellte Fragen.' : 'Frequently asked questions.'}</h2>
            <p className="section-sub">
              {isGerman ? 'Nicht das gefunden, was du suchst? Schreib uns an ' : 'Can\'t find what you\'re looking for? Email '}
              <a href="mailto:hello@breklo.com" style={{ color: 'var(--brand-ink)', fontWeight: 600 }}>hello@breklo.com</a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`} onClick={() => setFaq(openFaq === i ? -1 : i)}>
                <div className="faq-q">
                  <span>{f.q}</span>
                  <span className="faq-plus">+</span>
                </div>
                {openFaq === i && <div className="faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h3>{isGerman ? <>Alle Datei-Tools, die du brauchst,<br />auf einer Plattform.</> : <>All the file tools you need,<br />in a single platform.</>}</h3>
            <p>{isGerman ? 'Kein Konto. Keine Kreditkarte. Einfach hochladen und loslegen.' : 'No account. No credit card. Just upload and go.'}</p>
            <button className="btn btn-white btn-lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {isGerman ? 'Datei hochladen' : 'Upload a file'} {I.arr}
            </button>
          </div>
        </div>
      </section>

      {/* ── TOOLS INDEX ── */}
      <div className="tools-index" id="tools-index">
        <div className="container">
          <div style={{ marginBottom: 8 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.03em', color: 'var(--ink)', margin: '0 0 8px' }}>{isGerman ? 'Alle Tools durchstöbern.' : 'Browse every tool.'}</h2>
            <p style={{ color: 'var(--ink-4)', fontSize: 15 }}>{isGerman ? `${ALL_TOOLS.length} Tools für PDF, Bild, Audio und Video. Live-Tools funktionieren jetzt.` : `${ALL_TOOLS.length} tools across PDF, image, audio and video. Live ones work right now.`}</p>
          </div>
          <div className="tools-cats">
            {CATEGORIES.map(cat => {
              const tools = ALL_TOOLS.filter(t => t.cat === cat);
              return (
                <div key={cat} className="tools-cat">
                  <h5>{cat} <span className="cnt">{tools.length}</span></h5>
                  <ul>
                    {tools.map(t => (
                      <li key={t.name}>
                        {t.live ? (
                          <Link href={isGerman ? `/de/${t.slug}` : `/${t.slug}`} className="live">
                            <span className="dot" /><span>{t.name}</span>
                          </Link>
                        ) : (
                          <a href="#" className="soon" onClick={e => e.preventDefault()}>
                            <span className="dot" /><span>{t.name}</span>
                            <span className="soon-tag">{isGerman ? 'bald' : 'soon'}</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
