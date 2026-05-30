// generate-de-pages.js
// Run this ONCE from the project root: `node generate-de-pages.js`
// It creates app/de/<slug>/page.js + layout.js for all 33 tools.
//
// HOW IT WORKS:
// Each German page re-exports the existing English tool component. The tool's
// ToolLayout and ToolContent are locale-aware (they detect the /de/ route via
// usePathname and switch to German strings automatically). So the German page
// gets the SAME working tool UI, just with German labels + German SEO content.
// The per-folder layout.js sets German <title>/<description> + hreflang for SEO.

const fs = require('fs');
const path = require('path');

// Pull German metadata for titles/descriptions
const metaPath = path.join(__dirname, 'lib', 'toolMetaDe.js');
const contentPath = path.join(__dirname, 'lib', 'toolContentDe.js');

// Lightweight parse: we only need the slug list + title + intro.
// Easiest is to import via a tiny require shim. Since these are ESM, we read
// the slugs from a hardcoded list (kept in sync with the lib files).

const TOOLS = [
  'compress-pdf','merge-pdf','split-pdf','rotate-pdf','organize-pdf',
  'extract-pdf-pages','delete-pdf-pages','password-protect-pdf','edit-pdf',
  'pdf-to-jpg','pdf-to-png','pdf-to-text','jpg-to-pdf','png-to-pdf','image-to-pdf',
  'compress-image','heic-to-jpg','jpg-to-png','png-to-jpg','jpg-to-webp',
  'png-to-webp','webp-to-jpg','gif-to-jpg','svg-to-jpg','merge-images','resize-image',
  'mp4-to-mp3','mp4-to-wav','wav-to-mp3','mp3-to-wav','m4a-to-mp3','flac-to-mp3','ogg-to-mp3',
];

const SITE = 'https://www.breklo.com';
let created = 0;

for (const slug of TOOLS) {
  const dir = path.join(__dirname, 'app', 'de', slug);
  fs.mkdirSync(dir, { recursive: true });

  // page.js — re-export the English tool component (locale-aware inside)
  const pageJs = `// Auto-generated German route for ${slug}
// Re-exports the English tool component, which is locale-aware and renders
// German labels + German SEO content when on a /de/ route.
export { default } from '@/app/${slug}/page';
`;
  fs.writeFileSync(path.join(dir, 'page.js'), pageJs);

  // layout.js — German metadata + hreflang alternates
  const layoutJs = `import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = '${slug}';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: '${SITE}/de/${slug}',
    languages: {
      en: '${SITE}/${slug}',
      de: '${SITE}/de/${slug}',
      'x-default': '${SITE}/${slug}',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: '${SITE}/de/${slug}',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
`;
  fs.writeFileSync(path.join(dir, 'layout.js'), layoutJs);
  created++;
  console.log('  ✓ app/de/' + slug + '/  (page.js + layout.js)');
}

console.log('\\nDone. Created German routes for ' + created + ' tools.');
console.log('Next: verify with `npm run dev` then visit http://localhost:3000/de/compress-pdf');
