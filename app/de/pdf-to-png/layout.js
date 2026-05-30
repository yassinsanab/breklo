import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'pdf-to-png';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/pdf-to-png',
    languages: {
      en: 'https://www.breklo.com/pdf-to-png',
      de: 'https://www.breklo.com/de/pdf-to-png',
      'x-default': 'https://www.breklo.com/pdf-to-png',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/pdf-to-png',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
