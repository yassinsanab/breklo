import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'merge-pdf';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/merge-pdf',
    languages: {
      en: 'https://www.breklo.com/merge-pdf',
      de: 'https://www.breklo.com/de/merge-pdf',
      'x-default': 'https://www.breklo.com/merge-pdf',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/merge-pdf',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
