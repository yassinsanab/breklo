import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'png-to-webp';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/png-to-webp',
    languages: {
      en: 'https://www.breklo.com/png-to-webp',
      de: 'https://www.breklo.com/de/png-to-webp',
      'x-default': 'https://www.breklo.com/png-to-webp',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/png-to-webp',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
