'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { t, localeFromPath } from '@/lib/i18n';

export default function Navbar() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const isGerman = locale === 'de';
  return (
    <>
    <style>{`@media (max-width: 768px) { .nav-links { display: none !important; } }`}</style>
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,.9)',
      backdropFilter: 'blur(14px) saturate(140%)',
      WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      borderBottom: '1px solid #ededef',
    }}>
      <div style={{
        width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64, gap: 24,
      }}>
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
          <img src="/logo-wide.png" alt="breklo" style={{ height: 28, width: 'auto', display: 'block' }} />
        </Link>

        {/* NAV LINKS — centered */}
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'center' }}>
          {[
            [t(locale, 'nav.edit_sign'),   isGerman ? '/de' : '/#tools'],
            [t(locale, 'nav.convert'),     isGerman ? '/de' : '/#tools'],
            [t(locale, 'nav.image_tools'), isGerman ? '/de' : '/#tools'],
            [t(locale, 'nav.audio_video'), isGerman ? '/de' : '/#tools'],
            [t(locale, 'nav.blog'),        '/blog'],
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{
              padding: '8px 14px', borderRadius: 8, fontSize: 14.5, fontWeight: 500,
              color: '#3f3f46', textDecoration: 'none', transition: 'color .15s, background .15s',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.background = '#fafafa'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#3f3f46'; e.currentTarget.style.background = 'transparent'; }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher />

        {/* ALL TOOLS BUTTON */}
        <Link href={isGerman ? '/de' : '/#tools-index'} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 8,
          fontSize: 14.5, fontWeight: 600, color: '#0a0a0a',
          textDecoration: 'none', flexShrink: 0,
          transition: 'background .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {/* burger icon */}
          <span style={{ display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', gap: 3, width: 16, height: 16 }}>
            <i style={{ display: 'block', height: 1.5, background: 'currentColor', borderRadius: 2 }} />
            <i style={{ display: 'block', height: 1.5, background: 'currentColor', borderRadius: 2, width: '70%' }} />
            <i style={{ display: 'block', height: 1.5, background: 'currentColor', borderRadius: 2 }} />
          </span>
          <span>{t(locale, 'nav.all_tools')}</span>
        </Link>
      </div>
    </header>
    </>
  );
}
