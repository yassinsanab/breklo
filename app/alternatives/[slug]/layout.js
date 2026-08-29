import { getAlternative, getAllAlternativeSlugs } from '@/lib/alternatives';

const SITE = 'https://www.breklo.com';

export function generateStaticParams() {
  return getAllAlternativeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = getAlternative(slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.metaDescription,
    alternates: { canonical: `${SITE}/alternatives/${slug}` },
    openGraph: {
      title: data.title,
      description: data.metaDescription,
      url: `${SITE}/alternatives/${slug}`,
    },
  };
}

export default async function Layout({ children, params }) {
  const { slug } = await params;
  const data = getAlternative(slug);

  // FAQ schema for rich snippets
  const faqSchema = data && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {children}
    </>
  );
}
