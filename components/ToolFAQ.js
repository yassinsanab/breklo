'use client';
import { useState } from 'react';

export default function ToolFAQ({ faqs, toolName }) {
  const [open, setOpen] = useState(null);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section style={{ maxWidth: 1060, margin: '0 auto', padding: '0 2.5rem 72px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div style={{ borderTop: '1px solid #f4f4f5', paddingTop: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', letterSpacing: '-0.5px', marginBottom: 24 }}>
          Frequently asked questions
        </h2>
        <div style={{ maxWidth: 680 }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #f4f4f5' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '16px 0', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left', gap: 12, fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{f.q}</span>
                <span style={{ fontSize: 18, color: open === i ? '#0071e3' : '#d1d5db', flexShrink: 0 }}>
                  {open === i ? '−' : '+'}
                </span>
              </button>
              {open === i && (
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75, paddingBottom: 16 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
