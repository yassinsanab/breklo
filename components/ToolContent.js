// Renders SEO-optimized content below the tool UI
// Import this in every tool layout: <ToolContent slug="compress-pdf" />

import { getToolContent } from '@/lib/toolContent';

export default function ToolContent({ slug }) {
  const content = getToolContent(slug);
  if (!content) return null;

  return (
    <section style={{
      maxWidth: 760, margin: '64px auto 0', padding: '0 20px',
      fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif",
    }}>
      <h1 style={{
        fontSize: 'clamp(26px, 3.5vw, 36px)',
        fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.2,
        color: '#0a0a0a', marginBottom: 20,
      }}>
        {content.h1}
      </h1>

      <p style={{
        fontSize: 16, lineHeight: 1.7, color: '#374151',
        marginBottom: 36,
      }}>
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
          <p style={{
            fontSize: 15, lineHeight: 1.7, color: '#4b5563',
          }}>
            {s.p}
          </p>
        </div>
      ))}
    </section>
  );
}
