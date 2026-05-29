// app/sitemap.js — Multi-language sitemap
// Lists all URLs in EN and DE with proper hreflang alternates
// Submit https://www.breklo.com/sitemap.xml to Google Search Console

import { posts } from '@/lib/posts';

const SITE = 'https://www.breklo.com';

const LIVE_TOOLS = [
  // PDF tools
  'compress-pdf', 'merge-pdf', 'split-pdf', 'rotate-pdf',
  'organize-pdf', 'extract-pdf-pages', 'delete-pdf-pages',
  'password-protect-pdf', 'edit-pdf',
  // Convert from PDF
  'pdf-to-jpg', 'pdf-to-png', 'pdf-to-text',
  // Convert to PDF
  'jpg-to-pdf', 'png-to-pdf', 'image-to-pdf',
  // Image tools
  'compress-image', 'heic-to-jpg', 'jpg-to-png', 'png-to-jpg',
  'jpg-to-webp', 'png-to-webp', 'webp-to-jpg',
  'gif-to-jpg', 'svg-to-jpg', 'merge-images', 'resize-image',
  // Audio
  'mp4-to-mp3', 'mp4-to-wav', 'wav-to-mp3', 'mp3-to-wav',
  'm4a-to-mp3', 'flac-to-mp3', 'ogg-to-mp3',
];

// Tools that have German translation ready
// Add slugs here as you translate each tool page
const TOOLS_WITH_DE = [
  'compress-pdf', 'merge-pdf', 'heic-to-jpg', 'compress-image', 'edit-pdf',
];

function urlEntry(path, opts = {}) {
  const { hasGerman = false, priority = 0.7, changefreq = 'monthly' } = opts;
  const alternates = { languages: { en: `${SITE}${path}` } };
  if (hasGerman) {
    alternates.languages.de = `${SITE}/de${path}`;
  }
  return {
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
    alternates,
  };
}

export default function sitemap() {
  const entries = [];

  // Homepage (highest priority)
  entries.push(urlEntry('/', { hasGerman: true, priority: 1.0, changefreq: 'weekly' }));

  // Blog index
  entries.push(urlEntry('/blog', { priority: 0.8, changefreq: 'weekly' }));

  // Tool pages
  for (const slug of LIVE_TOOLS) {
    entries.push(urlEntry(`/${slug}`, {
      hasGerman: TOOLS_WITH_DE.includes(slug),
      priority: 0.9,
      changefreq: 'monthly',
    }));
  }

  // Blog posts
  for (const post of posts) {
    entries.push(urlEntry(`/blog/${post.slug}`, {
      priority: 0.6,
      changefreq: 'monthly',
    }));
  }

  // German equivalents for tools that have translation
  for (const slug of TOOLS_WITH_DE) {
    entries.push({
      url: `${SITE}/de/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE}/${slug}`, de: `${SITE}/de/${slug}` } },
    });
  }

  // German homepage
  entries.push({
    url: `${SITE}/de`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: { languages: { en: SITE, de: `${SITE}/de` } },
  });

  return entries;
}
