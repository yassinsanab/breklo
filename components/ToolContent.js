'use client';
// Renders SEO content below the tool UI.
// Locale-aware: on /de/* routes it shows German content, otherwise English.

import { usePathname } from 'next/navigation';
import { getToolContent } from '@/lib/toolContent';
import { toolContentDe } from '@/lib/toolContentDe';

export default function ToolContent({ slug }) {
  const pathname = usePathname();
  const isGerman = pathname?.startsWith('/de');

  const content = isGerman
    ? (toolContentDe[slug] || getToolContent(slug))
    : getToolContent(slug);

  if (!content) return null;

  return (
    <section style={{
      maxWidth: 760, margin: '64px auto 0', padding: '0 20px',
      fontFamily: "-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',Arial,sans-serif",
    }}>
      <h1 style={{
        fontSize: 'clamp(26px, 3.5vw, 36px)',
        fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.2,
        color: '#0a0a0a', marginBottom: 20,
      }}>
        {content.h1}
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#374151', marginBottom: 36 }}>
        {content.intro}
      </p>

      {content.sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px',
            color: '#0a0a0a', marginBottom: 10,
          }}>
            {s.h}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4b5563' }}>
            {s.p}
          </p>
        </div>
      ))}
    </section>
  );
}
