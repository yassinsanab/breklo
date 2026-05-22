'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { posts } from '@/lib/posts';

const categoryColors = {
  'PDF Tools':     { bg: '#fff1f2', color: '#be123c' },
  'Image Tools':   { bg: '#fefce8', color: '#a16207' },
  'Audio & Video': { bg: '#f5f3ff', color: '#6d28d9' },
};

export default function Blog() {
  return (
    <div style={{ fontFamily: 'inherit', background: '#fff', minHeight: '100vh' }}>
      <Navbar />

      {/* HEADER */}
      <section style={{ borderBottom: '1px solid #f4f4f5', padding: '56px 2.5rem 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#0071e3', marginBottom: 14 }}>
            Blog
          </p>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', color: '#111', marginBottom: 12 }}>
            Guides & tutorials
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', fontWeight: 300, maxWidth: 480 }}>
            Step-by-step guides for working with PDFs, images, audio and video files.
          </p>
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ padding: '48px 2.5rem 80px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {posts.map((post, i) => {
            const cat = categoryColors[post.category] || { bg: '#f0f6ff', color: '#0071e3' };
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 24,
                  alignItems: 'start',
                  padding: '24px 0',
                  borderBottom: '1px solid #f4f4f5',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'opacity .15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '.75'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, background: cat.bg, padding: '2px 9px', borderRadius: 4 }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.readTime} read</span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: 8, letterSpacing: '-0.3px' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                    {post.description}
                  </p>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {post.relatedTools.map(t => (
                      <span key={t.slug} style={{ fontSize: 11, color: '#9ca3af', background: '#f4f4f5', padding: '2px 8px', borderRadius: 4 }}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', whiteSpace: 'nowrap', paddingTop: 2 }}>
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
