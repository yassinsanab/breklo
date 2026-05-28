'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { decodeAudioFile, encodeToMp3, downloadBlob, formatSize, formatDuration } from '@/lib/audioUtils';

const related = [
  { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
  { name: 'WAV to MP3', slug: 'wav-to-mp3' },
  { name: 'MP3 to WAV', slug: 'mp3-to-wav' },
];

const BITRATES = [96, 128, 192, 320];

export default function M4aToMp3() {
  const [file, setFile]         = useState(null);
  const [bitrate, setBitrate]   = useState(192);
  const [loading, setLoading]   = useState(false);
  const [progress, setProgress] = useState('');
  const [done, setDone]         = useState(false);
  const [info, setInfo]         = useState(null);
  const [dragging, setDrag]     = useState(false);

  async function handleFile(f) {
    if (!f) return;
    setFile(f); setDone(false); setProgress(''); setInfo(null);
  }

  async function convert() {
    if (!file) return;
    setLoading(true); setDone(false);
    try {
      setProgress('Decoding M4A audio...');
      const audioBuffer = await decodeAudioFile(file);
      setInfo({ duration: audioBuffer.duration, channels: audioBuffer.numberOfChannels, sampleRate: audioBuffer.sampleRate });

      setProgress(`Encoding to MP3 at ${bitrate}kbps...`);
      const mp3Blob = await encodeToMp3(audioBuffer, bitrate);

      const outName = file.name.replace(/\.(m4a|aac)$/i, '.mp3');
      downloadBlob(mp3Blob, outName);
      setProgress(`Done — ${formatSize(file.size)} → ${formatSize(mp3Blob.size)}`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting file. Make sure it is a valid M4A or AAC file.');
      setProgress('');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="M4A to MP3"
      subtitle="Convert M4A and AAC audio files to universally compatible MP3 format."
      bullets={[
        'Supports M4A and AAC audio files',
        'Choose output bitrate (96–320 kbps)',
        'Ideal for Apple Music downloads and voice memos',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
      slug="m4a-to-mp3"
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
            <div style={{ width: 40, height: 40, background: '#f0fdf4', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#15803d' }}>M4A</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                {formatSize(file.size)}
                {info && ` · ${formatDuration(info.duration)} · ${info.channels === 1 ? 'Mono' : 'Stereo'}`}
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); setFile(null); setDone(false); setProgress(''); setInfo(null); }}
              style={{ background: 'none', border: '1px solid #fecaca', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#ef4444', fontSize: 12 }}>✕</button>
          </div>
        ) : (
          <>
            <div style={{ width: 44, height: 44, background: '#0071e3', borderRadius: 11, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            </div>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your M4A file here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>M4A, AAC — or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept=".m4a,.aac,audio/mp4,audio/aac,audio/x-m4a" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {file && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Output bitrate</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {BITRATES.map(b => (
              <button key={b} onClick={() => setBitrate(b)} style={{
                flex: 1, padding: '9px 0', borderRadius: 8,
                border: `1.5px solid ${bitrate === b ? '#0071e3' : '#e5e7eb'}`,
                background: bitrate === b ? '#eff6ff' : '#fff',
                color: bitrate === b ? '#0071e3' : '#555',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}>{b}</button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>kbps — 192 recommended for M4A source material</p>
        </div>
      )}

      {progress && (
        <div style={{ background: done ? '#f0fdf4' : '#eff6ff', border: `1px solid ${done ? '#bbf7d0' : '#bfdbfe'}`, borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: done ? '#15803d' : '#1d4ed8', fontWeight: 500 }}>
          {progress}
        </div>
      )}

      <button onClick={convert} disabled={!file || loading} style={{
        width: '100%', padding: '13px', borderRadius: 10, border: 'none',
        background: !file ? '#e5e7eb' : '#0071e3',
        color: !file ? '#9ca3af' : '#fff',
        fontWeight: 700, fontSize: 15, cursor: !file ? 'not-allowed' : 'pointer',
      }}>
        {loading ? 'Converting...' : done ? 'Convert again' : 'Convert to MP3'}
      </button>
      <ToolContent slug="m4a-to-mp3" />
    </ToolLayout>
  );
}
