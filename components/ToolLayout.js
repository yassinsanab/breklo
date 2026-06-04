'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import ToolFAQ from './ToolFAQ';
import Link from 'next/link';
import { toolMetaDe } from '@/lib/toolMetaDe';
import { t, localeFromPath } from '@/lib/i18n';

/**
 * Upgraded ToolLayout — polished shell that applies to ALL tool pages.
 *
 * Props (mostly unchanged from your previous ToolLayout — backwards compatible):
 *   title          — tool name (h1)
 *   subtitle       — short tool description
 *   bullets        — array of bullet strings (rendered in the bullets strip)
 *   children       — actual tool UI (drop zone, file list, controls, primary button)
 *   relatedTools   — [{ name, slug }]
 *   slug           — used to look up FAQs + posts
 *
 *   NEW props (all optional):
 *   tagLabel       — small uppercase pill in the hero (default "Live · Free · No account")
 *   metaTrust      — 3 short trust items for the hero strip [{icon, label}, ...]
 *   howSteps       — array of 3 {title, body} for the "How to ..." section
 *                    (defaults provided)
 *   illust         — JSX for the hero illustration on the right (optional)
 */
export default function ToolLayout({
  title,
  subtitle,
  bullets,
  children,
  relatedTools = [],
  slug = '',
  tagLabel = 'Live · Free · No account',
  metaTrust = DEFAULT_TRUST,
  howSteps = DEFAULT_HOW,
  illust = null,
}) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const isGerman = locale === 'de';

  if (isGerman && slug && toolMetaDe[slug]) {
    title    = toolMetaDe[slug].title    || title;
    subtitle = toolMetaDe[slug].subtitle || subtitle;
    bullets  = toolMetaDe[slug].bullets  || bullets;
  }

  if (isGerman) {
    if (tagLabel === 'Live · Free · No account') tagLabel = 'Live · Kostenlos · Kein Konto';
    if (metaTrust === DEFAULT_TRUST) metaTrust = DEFAULT_TRUST_DE;
    if (howSteps === DEFAULT_HOW) howSteps = DEFAULT_HOW_DE;
  }

  const homeHref = isGerman ? '/de' : '/';
  const toolHref = (s) => isGerman ? `/de/${s}` : `/${s}`;

  const { toolFaqs } = require('@/lib/toolFaqs');
  const { toolToPosts } = require('@/lib/toolToPosts');
  const faqs = slug && toolFaqs[slug] ? toolFaqs[slug] : [];
  const relatedPosts = slug && toolToPosts[slug] ? toolToPosts[slug] : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Navbar />

      {/* BREADCRUMB */}
      <div className="bk-crumb">
        <div className="bk-crumb-inner bk-container">
          <Link href={homeHref}>{isGerman ? 'Start' : 'Home'}</Link>
          <span className="sep">›</span>
          <Link href={isGerman ? '/de' : '/#tools'}>{isGerman ? 'Alle Tools' : 'All tools'}</Link>
          <span className="sep">›</span>
          <span className="here">{title}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="bk-tp-hero">
        <div className="bk-tp-hero-glow" />
        <div className="bk-container bk-tp-hero-inner" data-has-illust={!!illust}>
          <div>
            <span className="bk-tp-tag">
              <span className="pill">Live</span>
              <span><span className="dot" /> {tagLabel}</span>
            </span>
            <h1 className="bk-tp-h1">{title}</h1>
            <p className="bk-tp-sub">{subtitle}</p>
            <div className="bk-tp-meta">
              {metaTrust.map((t, i) => (
                <div key={i} className="bk-tp-meta-item">
                  <span className="ic">{t.icon}</span>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
          {illust && <div className="bk-tp-illust">{illust}</div>}
        </div>
      </section>

      {/* WORKBENCH — wraps the actual tool UI */}
      <section className="bk-workbench">
        <div className="bk-container">
          <div className="bk-workbench-wrap">
            {children}
          </div>
        </div>
      </section>

      {/* BULLETS */}
      {bullets && bullets.length > 0 && (
        <section className="bk-tp-bullets">
          <div className="bk-container">
            <div className="bk-bullets-grid">
              {bullets.map(b => (
                <div key={b} className="bk-bullet">
                  <span className="check">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED TOOLS */}
      {relatedTools.length > 0 && (
        <section className="bk-tp-related">
          <div className="bk-container">
            <h2>{isGerman ? 'Passende Tools' : 'Tools that pair well'}</h2>
            <div className="bk-related-grid">
              {relatedTools.map((t, i) => (
                <Link key={t.slug} href={toolHref(t.slug)} className={`bk-related-card ${COLORS[i % COLORS.length]}`}>
                  <span className="ic">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>
                  </span>
                  <div>
                    <h5>{t.name}</h5>
                    <p>{t.desc || (isGerman ? 'Tool öffnen →' : 'Open tool →')}</p>
                  </div>
                  <span className="arr">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="bk-tp-how">
        <div className="bk-container">
          <div className="heading">
            <h2>{isGerman ? `So verwendest du ${title}` : `How to use ${title}`}</h2>
            <p>{isGerman ? 'Drei Schritte. Keine Installation, kein Konto, kein Wasserzeichen.' : 'Three steps. No installation, no account, no watermark.'}</p>
          </div>
          <div className="bk-how-grid">
            {howSteps.map((s, i) => (
              <div key={i} className="bk-how-card">
                <div className="num">{i + 1}</div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED GUIDES (kept from your original layout) */}
      {relatedPosts.length > 0 && (
        <section className="bk-tp-guides">
          <div className="bk-container">
            <h2>{isGerman ? 'Verwandte Anleitungen' : 'Related guides'}</h2>
            <div className="bk-guides">
              {relatedPosts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="bk-guide">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                  <span>{p.title}</span>
                  <span className="arr">{isGerman ? 'Lesen →' : 'Read →'}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ (uses your existing ToolFAQ component for schema.org markup) */}
      {faqs.length > 0 && <ToolFAQ faqs={faqs} toolName={title} />}

      <Footer />
    </div>
  );
}

/* ─── defaults ──────────────────────────────────────────────────────── */

const ICON = {
  shield: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12Z"/><path d="m9 12 2 2 4-4"/></svg>,
  zap: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>,
  globe: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>,
};

const DEFAULT_TRUST = [
  { icon: ICON.shield, label: 'Files never leave your browser' },
  { icon: ICON.zap, label: 'Instant results, no waiting' },
  { icon: ICON.globe, label: 'Works on any device' },
];

const DEFAULT_TRUST_DE = [
  { icon: ICON.shield, label: 'Dateien verlassen nie deinen Browser' },
  { icon: ICON.zap, label: 'Sofortige Ergebnisse, kein Warten' },
  { icon: ICON.globe, label: 'Funktioniert auf jedem Gerät' },
];

const DEFAULT_HOW = [
  { title: 'Upload your file', body: 'Drag and drop, or click to browse. We support files up to 100 MB.' },
  { title: 'Pick your options', body: 'Choose the settings that fit your task. Defaults work well for most cases.' },
  { title: 'Download the result', body: 'Your file is ready in seconds. Download directly — no email, no account.' },
];

const DEFAULT_HOW_DE = [
  { title: 'Datei hochladen', body: 'Per Drag & Drop oder klicken zum Auswählen. Unterstützt Dateien bis 100 MB.' },
  { title: 'Optionen wählen', body: 'Wähle die passenden Einstellungen. Die Standardwerte funktionieren für die meisten Fälle.' },
  { title: 'Ergebnis herunterladen', body: 'Deine Datei ist in Sekunden fertig. Direkt herunterladen — keine E-Mail, kein Konto.' },
];

const COLORS = ['blue', 'purple', 'teal', 'orange', 'pink'];
