// Renders a single /alternatives/<competitor> comparison page.

import { getAlternative } from '@/lib/alternatives';
import ToolCTA from '@/components/ToolCTA';
import { notFound } from 'next/navigation';

const FONT = "-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',Arial,sans-serif";

export default function AlternativePage({ params }) {
  const { slug } = params;
  const data = getAlternative(slug);
  if (!data) return notFound();

  return (
    <main style={{ fontFamily: FONT, maxWidth: 820, margin: '0 auto', padding: '48px 20px 80px', color: '#0a0a0a' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', color: '#0071e3', marginBottom: 12 }}>
          FREE ALTERNATIVE
        </div>
        <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1.15, marginBottom: 18 }}>
          The Free {data.competitor} Alternative That Keeps Your Files Private
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#4b5563', maxWidth: 640, margin: '0 auto' }}>
          {data.heroSub}
        </p>
      </div>

      {/* Primary CTA */}
      {data.tools?.[0] && <ToolCTA tool={data.tools[0]} />}

      {/* Comparison table */}
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', margin: '44px 0 18px' }}>
        Breklo vs {data.competitor}
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #eee', color: '#6b7280', fontWeight: 600 }}></th>
              <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #0071e3', color: '#0071e3', fontWeight: 700 }}>Breklo</th>
              <th style={{ textAlign: 'left', padding: '12px 14px', borderBottom: '2px solid #eee', color: '#6b7280', fontWeight: 600 }}>{data.competitor}</th>
            </tr>
          </thead>
          <tbody>
            {data.table.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0', fontWeight: 600 }}>{row[0]}</td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0', color: '#0a7d33' }}>{row[1]}</td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #f0f0f0', color: '#4b5563' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Why Breklo */}
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', margin: '44px 0 18px' }}>
        Why choose Breklo
      </h2>
      {data.whyBreklo.map((b, i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{b.h}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4b5563' }}>{b.p}</p>
        </div>
      ))}

      {/* Fair credit to competitor — builds trust + reads as honest */}
      <div style={{ background: '#f7f7f8', borderRadius: 14, padding: '22px 24px', margin: '32px 0' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>In fairness to {data.competitor}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4b5563', margin: 0 }}>{data.theyDoWell}</p>
      </div>

      {/* Verdict */}
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', margin: '32px 0 14px' }}>The honest verdict</h2>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#374151' }}>{data.verdict}</p>

      {/* Bottom CTA */}
      {data.tools?.[0] && <ToolCTA tool={data.tools[0]} />}

      {/* Related tools */}
      <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px', margin: '36px 0 14px' }}>
        Try these free tools
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {data.tools.map((t) => (
          <a key={t.slug} href={`/${t.slug}`} style={{
            display: 'inline-block', padding: '10px 18px', borderRadius: 980,
            border: '1px solid #e2e2e5', textDecoration: 'none', color: '#0a0a0a',
            fontSize: 15, fontWeight: 500,
          }}>
            {t.name}
          </a>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.5px', margin: '44px 0 18px' }}>
        Frequently asked questions
      </h2>
      {data.faq.map((f, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{f.q}</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#4b5563' }}>{f.a}</p>
        </div>
      ))}
    </main>
  );
}
