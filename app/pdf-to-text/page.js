'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { formatSize } from '@/lib/pdfUtils';
import { downloadBlob } from '@/lib/download';

const related = [
  { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
  { name: 'PDF to PNG', slug: 'pdf-to-png' },
  { name: 'Compress PDF', slug: 'compress-pdf' },
];

export default function PdfToText() {
  const [file, setFile]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText]       = useState('');
  const [pageCount, setCount] = useState(0);
  const [dragging, setDrag]   = useState(false);
  const [copied, setCopied]   = useState(false);

  async function handleFile(f) {
    if (!f || f.type !== 'application/pdf') return;
    setFile(f); setText(''); setCount(0);
  }

  async function convert() {
    if (!file) return;
    setLoading(true); setText('');
    try {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;
      setCount(total);

      let fullText = '';
      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      setText(fullText.trim());
    } catch (e) {
      console.error(e);
      alert('Error extracting text. The PDF may be scanned or image-based.');
    }
    setLoading(false);
  }

  function downloadTxt() {
    downloadBlob(new Blob([text], { type: 'text/plain' }), file.name.replace(/\.pdf$/i, '.txt'));
  }

  function copyText() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolLayout
      slug="pdf-to-text"
      title="PDF to Text"
      subtitle="Extract all text content from your PDF document instantly."
      bullets={[
        'Extract text from every page',
        'Copy to clipboard or download as .txt',
        'Works with text-based PDFs',
        'Runs entirely in your browser — no uploads',
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
            <button onClick={e => { e.stopPropagation(); setFile(null); setText(''); }} style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
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

      <button onClick={convert} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
        marginBottom: 16,
      }}>
        {loading ? 'Extracting text...' : text ? 'Extract again' : 'Extract Text'}
      </button>

      {text && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>{pageCount} pages · {text.length.toLocaleString()} characters</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={copyText} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 7, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: copied ? '#15803d' : '#374151' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={downloadTxt} style={{ background: '#0071e3', border: 'none', borderRadius: 7, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: '#fff' }}>
                Download .txt
              </button>
            </div>
          </div>
          <textarea
            readOnly value={text}
            style={{ width: '100%', height: 220, padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 13, lineHeight: 1.65, color: '#374151', fontFamily: 'inherit', resize: 'vertical', outline: 'none', background: '#fafafa' }}
          />
        </div>
      )}
    </ToolLayout>
  );
}
