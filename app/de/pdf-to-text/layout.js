import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'pdf-to-text';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/pdf-to-text',
    languages: {
      en: 'https://www.breklo.com/pdf-to-text',
      de: 'https://www.breklo.com/de/pdf-to-text',
      'x-default': 'https://www.breklo.com/pdf-to-text',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/pdf-to-text',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
