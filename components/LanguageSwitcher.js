'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, LOCALE_FLAGS, localeFromPath, stripLocale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const currentLocale = localeFromPath(pathname);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function switchTo(locale) {
    const basePath = stripLocale(pathname);
    const newPath = locale === 'en' ? basePath : `/${locale}${basePath === '/' ? '' : basePath}`;
    // Remember choice so middleware doesn't override it
    document.cookie = `breklo-locale=${locale}; max-age=${60 * 60 * 24 * 365}; path=/`;
    router.push(newPath);
    setOpen(false);
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 10px', borderRadius: 8,
          background: 'transparent', border: '1px solid #e4e4e7',
          fontSize: 13, fontWeight: 500, color: '#3f3f46',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'background .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        aria-label="Change language"
      >
        <span style={{ fontSize: 14 }}>{LOCALE_FLAGS[currentLocale]}</span>
        <span>{currentLocale.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: '#fff', border: '1px solid #e4e4e7', borderRadius: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,.08)',
          padding: 4, minWidth: 150, zIndex: 100,
        }}>
          {LOCALES.map(loc => (
            <button
              key={loc}
              onClick={() => switchTo(loc)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '8px 12px', borderRadius: 6,
                background: currentLocale === loc ? '#f4f4f5' : 'transparent',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: '#3f3f46',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f4f4f5')}
              onMouseLeave={e => (e.currentTarget.style.background = currentLocale === loc ? '#f4f4f5' : 'transparent')}
            >
              <span style={{ fontSize: 16 }}>{LOCALE_FLAGS[loc]}</span>
              <span style={{ flex: 1 }}>{LOCALE_NAMES[loc]}</span>
              {currentLocale === loc && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0071e3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
