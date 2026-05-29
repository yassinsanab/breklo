// lib/i18n.js — Translation system for Breklo
// Each language has a flat key→string map for easy editing

import { en } from './translations/en';
import { de } from './translations/de';

export const LOCALES = ['en', 'de'];
export const DEFAULT_LOCALE = 'en';

export const LOCALE_NAMES = {
  en: 'English',
  de: 'Deutsch',
};

export const LOCALE_FLAGS = {
  en: '🇬🇧',
  de: '🇩🇪',
};

const dictionaries = { en, de };

/**
 * Get a translation by key.
 * @param {string} locale - 'en' or 'de'
 * @param {string} key - dot-separated path like 'nav.tools'
 * @param {object} [vars] - variables to interpolate, e.g. {count: 5}
 * @returns {string}
 */
export function t(locale, key, vars = {}) {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  const value = key.split('.').reduce((acc, k) => acc?.[k], dict);
  if (typeof value !== 'string') {
    // Fallback to English if missing in target locale
    if (locale !== DEFAULT_LOCALE) return t(DEFAULT_LOCALE, key, vars);
    return key;
  }
  // Simple {{var}} interpolation
  return value.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
}

/**
 * Generate a localized URL.
 * @param {string} locale
 * @param {string} path - e.g. '/compress-pdf' or 'compress-pdf'
 */
export function localizedPath(locale, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return p;
  return `/${locale}${p}`;
}

/**
 * Strip locale prefix from a path.
 * '/de/compress-pdf' → '/compress-pdf'
 */
export function stripLocale(path) {
  for (const loc of LOCALES) {
    if (path.startsWith(`/${loc}/`)) return path.slice(loc.length + 1);
    if (path === `/${loc}`) return '/';
  }
  return path;
}

/**
 * Extract locale from URL path. Returns DEFAULT_LOCALE if not found.
 */
export function localeFromPath(path) {
  const seg = path.split('/')[1];
  return LOCALES.includes(seg) ? seg : DEFAULT_LOCALE;
}
