import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'mp3-to-wav';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/mp3-to-wav',
    languages: {
      en: 'https://www.breklo.com/mp3-to-wav',
      de: 'https://www.breklo.com/de/mp3-to-wav',
      'x-default': 'https://www.breklo.com/mp3-to-wav',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/mp3-to-wav',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
