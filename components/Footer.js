import Link from 'next/link';

const tools = ['Merge PDF','Compress PDF','Split PDF','PDF to JPG','HEIC to JPG','MP4 to MP3'];
const slugs = ['merge-pdf','compress-pdf','split-pdf','pdf-to-jpg','heic-to-jpg','mp4-to-mp3'];

export default function Footer() {
  return (
    <footer style={{ background: '#09090b', color: '#52525b', padding: '48px 2.5rem 24px' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 36, marginBottom: 44 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 19, color: '#fff', marginBottom: 10 }}>
              breklo<span style={{ color: '#0071e3' }}>.</span>
            </div>
            <p style={{ fontSize: 13, color: '#52525b', lineHeight: 1.75, maxWidth: 200 }}>
              All-in-one file tools. PDF, image, audio and video — free and browser-based.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#3f3f46', letterSpacing: '.8px', textTransform: 'uppercase', marginBottom: 14 }}>Tools</div>
            {tools.map((t, i) => (
              <Link key={t} href={`/${slugs[i]}`} style={{ fontSize: 13, color: '#52525b', marginBottom: 8, display: 'block' }}>{t}</Link>
            ))}
          </div>
          {[
            ['Company', ['About us','Blog','Pricing','Contact']],
            ['Legal',   ['Privacy Policy','Terms of Service','Cookie Policy']],
            ['Follow',  ['Twitter / X','LinkedIn','GitHub']],
          ].map(([h, links]) => (
            <div key={h}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#3f3f46', letterSpacing: '.8px', textTransform: 'uppercase', marginBottom: 14 }}>{h}</div>
              {links.map(l => <div key={l} style={{ fontSize: 13, color: '#52525b', marginBottom: 8, cursor: 'pointer' }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #18181b', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#3f3f46' }}>© 2025 Breklo · All rights reserved</span>
          <span style={{ fontSize: 12, color: '#3f3f46' }}>breklo.com</span>
        </div>
      </div>
    </footer>
  );
}
