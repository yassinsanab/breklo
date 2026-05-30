import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'extract-pdf-pages';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/extract-pdf-pages',
    languages: {
      en: 'https://www.breklo.com/extract-pdf-pages',
      de: 'https://www.breklo.com/de/extract-pdf-pages',
      'x-default': 'https://www.breklo.com/extract-pdf-pages',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/extract-pdf-pages',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
