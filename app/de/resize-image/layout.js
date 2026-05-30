import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'resize-image';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/resize-image',
    languages: {
      en: 'https://www.breklo.com/resize-image',
      de: 'https://www.breklo.com/de/resize-image',
      'x-default': 'https://www.breklo.com/resize-image',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/resize-image',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
