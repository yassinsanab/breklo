'use client';
import Navbar from './Navbar';
import Footer from './Footer';
import ToolFAQ from './ToolFAQ';
import Link from 'next/link';

export default function ToolLayout({ title, subtitle, bullets, children, relatedTools = [], slug = '' }) {
  const { toolFaqs } = require('@/lib/toolFaqs');
  const faqs = slug && toolFaqs[slug] ? toolFaqs[slug] : [];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ padding: '12px 2.5rem', fontSize: 13, color: '#9ca3af', borderBottom: '1px solid #f4f4f5' }}>
        <Link href="/" style={{ color: '#9ca3af' }}>Home</Link>
        <span style={{ margin: '0 6px' }}>›</span>
        <span style={{ color: '#111' }}>{title}</span>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, maxWidth: 1060, margin: '0 auto', width: '100%', padding: '56px 2.5rem', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'start' }}>
        {/* LEFT */}
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-1.2px', color: '#111', marginBottom: 10 }}>{title}</h1>
          <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>{subtitle}</p>
          {bullets && bullets.map(b => (
            <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.55 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* RIGHT — tool UI */}
        <div>{children}</div>
      </main>

      {/* RELATED TOOLS */}
      {relatedTools.length > 0 && (
        <section style={{ borderTop: '1px solid #f4f4f5', padding: '40px 2.5rem' }}>
          <div style={{ maxWidth: 1060, margin: '0 auto' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16 }}>Related tools</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {relatedTools.map(t => (
                <Link key={t.slug} href={`/${t.slug}`} style={{
                  border: '1px solid #e5e7eb', borderRadius: 9, padding: '9px 16px',
                  fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff',
                  textDecoration: 'none', transition: 'border-color .15s',
                }}>
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && <ToolFAQ faqs={faqs} toolName={title} />}

      <Footer />
    </div>
  );
}
