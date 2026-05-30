// app/sitemap.js — Multi-language sitemap (EN + DE for all tools)
// Submit https://www.breklo.com/sitemap.xml to Google Search Console

import { posts } from '@/lib/posts';

const SITE = 'https://www.breklo.com';

const LIVE_TOOLS = [
  'compress-pdf', 'merge-pdf', 'split-pdf', 'rotate-pdf',
  'organize-pdf', 'extract-pdf-pages', 'delete-pdf-pages',
  'password-protect-pdf', 'edit-pdf',
  'pdf-to-jpg', 'pdf-to-png', 'pdf-to-text',
  'jpg-to-pdf', 'png-to-pdf', 'image-to-pdf',
  'compress-image', 'heic-to-jpg', 'jpg-to-png', 'png-to-jpg',
  'jpg-to-webp', 'png-to-webp', 'webp-to-jpg',
  'gif-to-jpg', 'svg-to-jpg', 'merge-images', 'resize-image',
  'mp4-to-mp3', 'mp4-to-wav', 'wav-to-mp3', 'mp3-to-wav',
  'm4a-to-mp3', 'flac-to-mp3', 'ogg-to-mp3',
];

// ALL live tools now have German versions
const TOOLS_WITH_DE = [...LIVE_TOOLS];

function entry(path, { hasGerman = false, priority = 0.7, changefreq = 'monthly' } = {}) {
  const languages = { en: `${SITE}${path}` };
  if (hasGerman) languages.de = `${SITE}/de${path}`;
  return {
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: changefreq,
    priority,
    alternates: { languages },
  };
}

export default function sitemap() {
  const entries = [];

  // English homepage
  entries.push(entry('/', { hasGerman: true, priority: 1.0, changefreq: 'weekly' }));
  // German homepage
  entries.push({
    url: `${SITE}/de`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
    alternates: { languages: { en: SITE, de: `${SITE}/de` } },
  });

  // Blog index
  entries.push(entry('/blog', { priority: 0.8, changefreq: 'weekly' }));

  // English tool pages (all flagged as having a German alternate)
  for (const slug of LIVE_TOOLS) {
    entries.push(entry(`/${slug}`, {
      hasGerman: TOOLS_WITH_DE.includes(slug),
      priority: 0.9,
      changefreq: 'monthly',
    }));
  }

  // German tool pages
  for (const slug of TOOLS_WITH_DE) {
    entries.push({
      url: `${SITE}/de/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${SITE}/${slug}`, de: `${SITE}/de/${slug}` } },
    });
  }

  // Blog posts (English only for now)
  for (const post of posts) {
    entries.push(entry(`/blog/${post.slug}`, { priority: 0.6, changefreq: 'monthly' }));
  }

  return entries;
}
