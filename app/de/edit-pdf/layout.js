import { toolMetaDe } from '@/lib/toolMetaDe';
import { toolContentDe } from '@/lib/toolContentDe';

const slug = 'edit-pdf';
const meta = toolMetaDe[slug] || {};
const content = toolContentDe[slug] || {};

export const metadata = {
  title: (content.h1 || meta.title || 'Breklo') + ' | Breklo',
  description: (content.intro || meta.subtitle || '').slice(0, 160),
  alternates: {
    canonical: 'https://www.breklo.com/de/edit-pdf',
    languages: {
      en: 'https://www.breklo.com/edit-pdf',
      de: 'https://www.breklo.com/de/edit-pdf',
      'x-default': 'https://www.breklo.com/edit-pdf',
    },
  },
  openGraph: {
    title: (content.h1 || meta.title || 'Breklo'),
    description: (content.intro || meta.subtitle || '').slice(0, 160),
    url: 'https://www.breklo.com/de/edit-pdf',
    locale: 'de_DE',
  },
};

export default function Layout({ children }) {
  return children;
}
