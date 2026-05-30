import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'png-to-pdf';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/png-to-pdf',
    languages: {
      en: 'https://www.breklo.com/png-to-pdf',
      de: 'https://www.breklo.com/de/png-to-pdf',
      'x-default': 'https://www.breklo.com/png-to-pdf',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/png-to-pdf',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
