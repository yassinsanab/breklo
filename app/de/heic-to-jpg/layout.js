import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'heic-to-jpg';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/heic-to-jpg',
    languages: {
      en: 'https://www.breklo.com/heic-to-jpg',
      de: 'https://www.breklo.com/de/heic-to-jpg',
      'x-default': 'https://www.breklo.com/heic-to-jpg',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/heic-to-jpg',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
