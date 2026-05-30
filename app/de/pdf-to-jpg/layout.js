import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'pdf-to-jpg';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/pdf-to-jpg',
    languages: {
      en: 'https://www.breklo.com/pdf-to-jpg',
      de: 'https://www.breklo.com/de/pdf-to-jpg',
      'x-default': 'https://www.breklo.com/pdf-to-jpg',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/pdf-to-jpg',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
