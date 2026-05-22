import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPostBySlug, getAllSlugs } from '@/lib/posts';

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://www.breklo.com/blog/${post.slug}`,
    },
  };
}

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

function renderContent(content) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: '#111', letterSpacing: '-0.4px', marginTop: 36, marginBottom: 12 }}>
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('| ')) {
      // Table
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter(l => !l.match(/^\|[-| ]+\|$/));
      elements.push(
        <div key={`table-${i}`} style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split('|').filter(c => c.trim());
                const isHeader = ri === 0;
                return (
                  <tr key={ri} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    {cells.map((cell, ci) => isHeader ? (
                      <th key={ci} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#111', background: '#f8fafc', fontSize: 13 }}>
                        {cell.trim()}
                      </th>
                    ) : (
                      <td key={ci} style={{ padding: '10px 14px', color: '#374151', fontSize: 13 }}>
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('- ')) {
      const listItems = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} style={{ marginBottom: 16, paddingLeft: 20 }}>
          {listItems.map((item, li) => (
            <li key={li} style={{ fontSize: 15, color: '#374151', lineHeight: 1.75, marginBottom: 4 }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 6, marginTop: 16 }}>
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (line.trim() === '') {
      // skip
    } else {
      elements.push(
        <p key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
          {renderInline(line)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function renderInline(text) {
  // Handle [text](/slug) links and **bold**
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    if (!linkMatch && !boldMatch) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity;
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity;

    if (linkIdx <= boldIdx) {
      if (linkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, linkIdx)}</span>);
      parts.push(
        <Link key={key++} href={linkMatch[2]} style={{ color: '#0071e3', textDecoration: 'underline', textDecorationColor: '#bfdbfe' }}>
          {linkMatch[1]}
        </Link>
      );
      remaining = remaining.slice(linkIdx + linkMatch[0].length);
    } else {
      if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>);
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldIdx + boldMatch[0].length);
    }
  }
  return parts;
}

export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: { '@type': 'Organization', name: 'Breklo', url: 'https://www.breklo.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.breklo.com/blog/${post.slug}` },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div style={{ fontFamily: 'inherit', background: '#fff', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ padding: '12px 2.5rem', fontSize: 13, color: '#9ca3af', borderBottom: '1px solid #f4f4f5' }}>
        <Link href="/" style={{ color: '#9ca3af' }}>Home</Link>
        <span style={{ margin: '0 6px' }}>â€º</span>
        <Link href="/blog" style={{ color: '#9ca3af' }}>Blog</Link>
        <span style={{ margin: '0 6px' }}>â€º</span>
        <span style={{ color: '#111' }}>{post.title}</span>
      </div>

      <article style={{ maxWidth: 720, margin: '0 auto', padding: '52px 2.5rem 80px' }}>

        {/* META */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#be123c', background: '#fff1f2', padding: '2px 9px', borderRadius: 4 }}>
            {post.category}
          </span>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.readTime} read</span>
        </div>

        {/* TITLE */}
        <h1 style={{ fontSize: 'clamp(24px,4vw,36px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111', lineHeight: 1.15, marginBottom: 16 }}>
          {post.title}
        </h1>
        <p style={{ fontSize: 17, color: '#6b7280', fontWeight: 300, lineHeight: 1.7, marginBottom: 40, paddingBottom: 32, borderBottom: '1px solid #f4f4f5' }}>
          {post.description}
        </p>

        {/* CONTENT */}
        <div>{renderContent(post.content)}</div>

        {/* RELATED TOOLS CTA */}
        <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 14, padding: '24px', margin: '40px 0' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Try these free tools
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {post.relatedTools.map(t => (
              <Link key={t.slug} href={`/${t.slug}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: '#0071e3', color: '#fff', borderRadius: 9,
                padding: '9px 16px', fontSize: 13, fontWeight: 600,
                textDecoration: 'none', transition: 'background .15s',
              }}>
                {t.name} â†’
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.8px', color: '#111', marginBottom: 24 }}>
            Frequently asked questions
          </h2>
          <div>
            {post.faq.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid #f4f4f5', paddingBottom: 20, marginBottom: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 8 }}>{f.q}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.75 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>

      </article>

      <Footer />
    </div>
  );
}
