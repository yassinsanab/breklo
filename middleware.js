// middleware.js — Next.js i18n routing for Breklo
// Detects locale from URL path (/de/*) or browser Accept-Language header
// Redirects accordingly without touching SEO

import { NextResponse } from 'next/server';

export const LOCALES = ['en', 'de'];
export const DEFAULT_LOCALE = 'en';

// Routes that should NEVER be locale-prefixed (sitemaps, robots, api, etc.)
const SKIP = [
  '/api', '/_next', '/static', '/favicon', '/logo',
  '/sitemap', '/robots', '/og-image', '/manifest',
];

function getLocaleFromPath(pathname) {
  const seg = pathname.split('/')[1];
  return LOCALES.includes(seg) ? seg : null;
}

function detectBrowserLocale(req) {
  const accept = req.headers.get('accept-language') || '';
  // Parse "de-DE,de;q=0.9,en;q=0.8" → ["de-DE", "de", "en"]
  const langs = accept.split(',').map(l => l.split(';')[0].trim().toLowerCase());
  for (const lang of langs) {
    const short = lang.split('-')[0];
    if (LOCALES.includes(short)) return short;
  }
  return DEFAULT_LOCALE;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Don't touch system routes
  if (SKIP.some(s => pathname.startsWith(s))) return NextResponse.next();

  const pathLocale = getLocaleFromPath(pathname);

  // If URL has a valid locale prefix, continue
  if (pathLocale) return NextResponse.next();

  // No locale in URL — figure out where to send the user
  const browserLocale = detectBrowserLocale(req);

  // English is the default — serve at root, no redirect needed
  if (browserLocale === DEFAULT_LOCALE) return NextResponse.next();

  // Non-English browser visiting a non-prefixed URL — redirect to localized version
  // BUT only on first visit (use a cookie to avoid infinite redirect loops)
  const hasCookie = req.cookies.get('breklo-locale')?.value;
  if (hasCookie) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${browserLocale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set('breklo-locale', browserLocale, { maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
