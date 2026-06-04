'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { t, localeFromPath } from '@/lib/i18n';

export default function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const isGerman = locale === 'de';
  return (
    <footer style={{ background: '#0a0a0a', color: '#52525b', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <img src="/logo-wide.png" alt="breklo" style={{ height: 22, width: 'auto', display: 'block' }} />
            </div>
            <p style={{ fontSize: 14, color: '#52525b', lineHeight: 1.7, maxWidth: 220, margin: '0 0 20px' }}>
              {t(locale, 'footer.tagline')}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: '#3f3f46' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', display: 'inline-block', boxShadow: '0 0 0 3px rgba(22,163,74,.2)' }} />
                {t(locale, 'footer.status')}
              </span>
              <span>v2025.5</span>
            </div>
          </div>

          {/* Popular tools */}
          <div>
            <h5 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 16px', letterSpacing: '-.01em' }}>{t(locale, 'footer.popular')}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Compress PDF', 'compress-pdf'],
                ['Merge PDF', 'merge-pdf'],
                ['Split PDF', 'split-pdf'],
                ['PDF to JPG', 'pdf-to-jpg'],
                ['HEIC to JPG', 'heic-to-jpg'],
                ['MP4 to MP3', 'mp4-to-mp3'],
                ['Resize Image', 'resize-image'],
              ].map(([name, slug]) => (
                <li key={slug}>
                  <Link href={isGerman ? `/de/${slug}` : `/${slug}`} style={{ fontSize: 13.5, color: '#52525b', transition: 'color .14s' }}
                    onMouseEnter={e => e.target.style.color = '#a1a1aa'}
                    onMouseLeave={e => e.target.style.color = '#52525b'}
                  >{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 16px', letterSpacing: '-.01em' }}>{t(locale, 'footer.company')}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                [t(locale, 'footer.about'),     '#'],
                ['Blog',                         '/blog'],
                [t(locale, 'footer.contact'),    '#'],
                [t(locale, 'footer.changelog'),  '#'],
              ].map(([l, href]) => (
                <li key={l}>
                  <Link href={href} style={{ fontSize: 13.5, color: '#52525b', transition: 'color .14s' }}
                    onMouseEnter={e => e.target.style.color = '#a1a1aa'}
                    onMouseLeave={e => e.target.style.color = '#52525b'}
                  >{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 16px', letterSpacing: '-.01em' }}>{t(locale, 'footer.legal')}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[t(locale, 'footer.privacy'), t(locale, 'footer.terms'), t(locale, 'footer.cookies'), t(locale, 'footer.dpa')].map(l => (
                <li key={l}>
                  <a href="#" style={{ fontSize: 13.5, color: '#52525b', transition: 'color .14s' }}
                    onMouseEnter={e => e.target.style.color = '#a1a1aa'}
                    onMouseLeave={e => e.target.style.color = '#52525b'}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #18181b', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 13, color: '#3f3f46' }}>{t(locale, 'footer.rights')}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.833L7.084 4.126H5.117z' },
              { label: 'LinkedIn', path: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.5 3.5 6.5 8.1V24h-5v-7.2c0-1.7 0-4-2.5-4s-2.9 1.9-2.9 3.9V24h-5V8z' },
              { label: 'GitHub', path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.99 0 1.98.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label} style={{ color: '#3f3f46', transition: 'color .14s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#a1a1aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#3f3f46'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
