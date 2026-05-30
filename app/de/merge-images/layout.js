import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'merge-images';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/merge-images',
    languages: {
      en: 'https://www.breklo.com/merge-images',
      de: 'https://www.breklo.com/de/merge-images',
      'x-default': 'https://www.breklo.com/merge-images',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/merge-images',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
