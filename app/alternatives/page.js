import Link from 'next/link';
import { alternatives } from '@/lib/alternatives';

const SITE = 'https://www.breklo.com';
const FONT = "-apple-system,BlinkMacSystemFont,'Inter','Helvetica Neue',Arial,sans-serif";

export const metadata = {
  title: 'Free Alternatives to Popular File Tools — Breklo',
  description: 'Free, browser-based alternatives to iLovePDF, Smallpdf, Adobe Acrobat, PDF24 and TinyPNG. No upload, no limits, no watermark.',
  alternates: { canonical: `${SITE}/alternatives` },
};

export default function AlternativesHub() {
  const items = Object.values(alternatives);
  return (
    <main style={{ fontFamily: FONT, maxWidth: 820, margin: '0 auto', padding: '48px 20px 80px', color: '#0a0a0a' }}>
      <h1 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, letterSpacing: '-1px', marginBottom: 16 }}>
        Free alternatives to popular file tools
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: '#4b5563', marginBottom: 40 }}>
        Breklo does what these tools do — but free, with no daily limits, no watermarks, and no upload. Everything runs in your browser, so your files never leave your device. See how Breklo compares:
      </p>

      <div style={{ display: 'grid', gap: 14 }}>
        {items.map((a) => (
          <Link key={a.slug} href={`/alternatives/${a.slug}`} style={{
            display: 'block', padding: '22px 24px', borderRadius: 14,
            border: '1px solid #e2e2e5', textDecoration: 'none', color: '#0a0a0a',
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
              Breklo vs {a.competitor} →
            </div>
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.5 }}>
              {a.metaDescription}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
