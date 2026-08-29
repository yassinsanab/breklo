'use client';
// A prominent call-to-action card that funnels blog readers into the matching tool.
// Drop it into blog posts (top + bottom). Locale-aware: German copy on /de/ routes.
//
// Usage:  <ToolCTA tool={{ name: 'Merge Images', slug: 'merge-images' }} />
// Or with a custom line:  <ToolCTA tool={...} variant="compact" />

import { usePathname } from 'next/navigation';

export default function ToolCTA({ tool, variant = 'full' }) {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith('/de');

  if (!tool || !tool.slug) return null;

  const href = isGerman ? `/de/${tool.slug}` : `/${tool.slug}`;

  const copy = isGerman
    ? {
        eyebrow: 'KOSTENLOSES TOOL',
        heading: `${tool.name} — jetzt kostenlos`,
        sub: 'Keine Uploads · Sofort · Läuft in deinem Browser',
        button: `${tool.name} öffnen`,
        trust: ['Dateien verlassen nie deinen Browser', 'Kein Konto', 'Kein Wasserzeichen'],
      }
    : {
        eyebrow: 'FREE TOOL',
        heading: `${tool.name} — free, no signup`,
        sub: 'No uploads · Instant · Runs in your browser',
        button: `Open ${tool.name}`,
        trust: ['Files never leave your browser', 'No account', 'No watermark'],
      };

  const font = "-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',Arial,sans-serif";

  // Compact inline pill (for mid-article nudges)
  if (variant === 'compact') {
    return (
      <a href={href} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#0071e3', color: '#fff', textDecoration: 'none',
        padding: '10px 18px', borderRadius: 980, fontFamily: font,
        fontSize: 15, fontWeight: 600, margin: '8px 0',
      }}>
        {copy.button}
        <span aria-hidden style={{ fontSize: 17, lineHeight: 1 }}>→</span>
      </a>
    );
  }

  // Full card
  return (
    <div style={{
      fontFamily: font,
      background: 'linear-gradient(180deg,#f5f9ff 0%,#eef5ff 100%)',
      border: '1px solid #d8e6fb',
      borderRadius: 18,
      padding: '28px 26px',
      margin: '36px 0',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
        color: '#0071e3', marginBottom: 10,
      }}>
        {copy.eyebrow}
      </div>

      <div style={{
        fontSize: 'clamp(20px,3vw,24px)', fontWeight: 700,
        letterSpacing: '-0.4px', color: '#0a0a0a', marginBottom: 8,
      }}>
        {copy.heading}
      </div>

      <div style={{ fontSize: 15, color: '#4b5563', marginBottom: 20 }}>
        {copy.sub}
      </div>

      <a href={href} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: '#0071e3', color: '#fff', textDecoration: 'none',
        padding: '13px 28px', borderRadius: 980,
        fontSize: 16, fontWeight: 600,
        boxShadow: '0 4px 14px rgba(0,113,227,0.3)',
      }}>
        {copy.button}
        <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>→</span>
      </a>

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '8px 18px', marginTop: 18,
        fontSize: 13, color: '#6b7280',
      }}>
        {copy.trust.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <span aria-hidden style={{ color: '#0071e3', fontWeight: 700 }}>✓</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
