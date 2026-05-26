'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { downloadFile, formatSize } from '@/lib/pdfUtils';

const related = [
  { name: 'Compress PDF', slug: 'compress-pdf' },
  { name: 'Merge PDF', slug: 'merge-pdf' },
  { name: 'Split PDF', slug: 'split-pdf' },
];

export default function PasswordProtect() {
  const [file, setFile]       = useState(null);
  const [password, setPass]   = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [dragging, setDrag]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setDone(false);
  }

  const mismatch = password && confirm && password !== confirm;
  const ready = file && password.length >= 4 && password === confirm;

  async function protect() {
    if (!ready) return;
    setLoading(true);
    try {
      const { PDFDocument } = await import('pdf-lib');
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const bytes = await doc.save({
        userPassword: password,
        ownerPassword: password + '_owner',
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: false,
        },
      });
      downloadFile(bytes, file.name);
      setDone(true);
      setPass(''); setConfirm('');
    } catch (e) {
      alert('Error protecting PDF.');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      slug="password-protect-pdf"
      title="Password Protect PDF"
      subtitle="Add a password to your PDF so only authorised people can open it."
      bullets={[
        'Add a strong open password to any PDF',
        'Restrict copying and editing',
        'Runs entirely in your browser — no uploads',
        'Free with no file size limits',
      ]}
      relatedTools={related}
    >
      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
        style={{
          border: `1.5px dashed ${dragging ? '#0071e3' : '#e2e8f0'}`,
          borderRadius: 14, padding: '32px 24px', textAlign: 'center',
          background: dragging ? '#f0f6ff' : '#fafafa', transition: 'all .15s',
          marginBottom: 16, cursor: 'pointer',
        }}
        onClick={() => !file && document.getElementById('fi').click()}
      >
        {file ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left' }}>
            <div style={{ width: 40, height: 40, background: '#fff1f2', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#be123c' }}>PDF</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{formatSize(file.size)}</div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
          </div>
        ) : (
          <>
            <div style={{ width: 44, height: 44, background: '#0071e3', borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your PDF here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept=".pdf,application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {file && (
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'} value={password}
                onChange={e => { setPass(e.target.value); setDone(false); }}
                placeholder="Min. 4 characters"
                style={{ width: '100%', padding: '10px 40px 10px 14px', borderRadius: 9, border: `1.5px solid ${password && password.length < 4 ? '#fca5a5' : '#e5e7eb'}`, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              />
              <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', fontSize: 12 }}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Confirm password</label>
            <input
              type={show ? 'text' : 'password'} value={confirm}
              onChange={e => { setConfirm(e.target.value); setDone(false); }}
              placeholder="Re-enter password"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 9, border: `1.5px solid ${mismatch ? '#fca5a5' : '#e5e7eb'}`, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
            />
            {mismatch && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>Passwords do not match.</p>}
          </div>
        </div>
      )}

      <button onClick={protect} disabled={!ready || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !ready ? '#e5e7eb' : '#0071e3',
        color: !ready ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !ready ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Protecting...' : done ? 'Protected! Do another?' : 'Protect PDF'}
      </button>
      {done && <p style={{ fontSize: 12, color: '#15803d', textAlign: 'center', marginTop: 8 }}>Your PDF has been password-protected and downloaded.</p>}
    </ToolLayout>
  );
}
