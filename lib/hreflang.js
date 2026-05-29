// lib/hreflang.js — Generates hreflang metadata for any tool/page
// Tells Google "this page has an English version AND a German version"

import { LOCALES, DEFAULT_LOCALE } from './i18n';

const SITE = 'https://www.breklo.com';

/**
 * Generate alternates object for Next.js metadata.
 * @param {string} basePath - canonical path WITHOUT locale prefix, e.g. '/compress-pdf'
 * @returns {object} alternates object compatible with Next.js metadata
 */
export function buildAlternates(basePath) {
  const path = basePath.startsWith('/') ? basePath : `/${basePath}`;

  const languages = {};
  for (const loc of LOCALES) {
    if (loc === DEFAULT_LOCALE) {
      languages[loc] = `${SITE}${path}`;
    } else {
      languages[loc] = `${SITE}/${loc}${path}`;
    }
  }
  // x-default tells Google which version to show when no language match
  languages['x-default'] = `${SITE}${path}`;

  return {
    canonical: `${SITE}${path}`,
    languages,
  };
}
