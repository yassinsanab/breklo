'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid #f4f4f5', height: 58,
      display: 'flex', alignItems: 'center',
      padding: '0 2.5rem', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.6px', color: '#111' }}>
          breklo<span style={{ color: '#0071e3' }}>.</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.6rem' }}>
          {[['Edit & Sign', '/'], ['Convert', '/'], ['Image Tools', '/'], ['Pricing', '/']].map(([l, h]) => (
            <Link key={l} href={h} style={{ fontSize: 14, color: '#555', fontWeight: 400, transition: 'color .15s' }}
              onMouseEnter={e => e.target.style.color = '#0071e3'}
              onMouseLeave={e => e.target.style.color = '#555'}
            >{l}</Link>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', fontSize: 14, color: '#555', cursor: 'pointer', padding: '8px 14px', fontWeight: 500 }}>
          Log in
        </button>
        <button style={{ background: '#0071e3', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Sign up free
        </button>
      </div>
    </nav>
  );
}
