import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'mp4-to-mp3';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/mp4-to-mp3',
    languages: {
      en: 'https://www.breklo.com/mp4-to-mp3',
      de: 'https://www.breklo.com/de/mp4-to-mp3',
      'x-default': 'https://www.breklo.com/mp4-to-mp3',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/mp4-to-mp3',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
