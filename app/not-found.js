import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '404 – Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const suggestedTools = [
  { name: 'Compress PDF', slug: 'compress-pdf' },
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
  { name: 'Compress Image', slug: 'compress-image' },
  { name: 'HEIC to JPG', slug: 'heic-to-jpg' },
  { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
];

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter','Helvetica Neue',Arial,sans-serif" }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 2rem', textAlign: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: 96, color: '#f0f0f0', letterSpacing: '-4px', lineHeight: 1, marginBottom: 8 }}>
          404
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', letterSpacing: '-0.8px', marginBottom: 12 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 15, color: '#6b7280', marginBottom: 36, maxWidth: 380, lineHeight: 1.7 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 56, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: '#0071e3', color: '#fff', borderRadius: 10,
            padding: '11px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>
            Go to homepage
          </Link>
          <Link href="/blog" style={{
            background: '#fff', color: '#374151', border: '1px solid #e5e7eb',
            borderRadius: 10, padding: '11px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none',
          }}>
            Browse guides
          </Link>
        </div>

        <div style={{ maxWidth: 560, width: '100%' }}>
          <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Popular tools
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {suggestedTools.map(t => (
              <Link key={t.slug} href={`/${t.slug}`} style={{
                border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 14px',
                fontSize: 13, fontWeight: 500, color: '#374151', textDecoration: 'none',
                background: '#fff', transition: 'border-color .15s',
              }}>
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
