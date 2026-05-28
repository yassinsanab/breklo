'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import ToolContent from '@/components/ToolContent';
import { decodeAudioFile, encodeToMp3, downloadBlob, formatSize, formatDuration } from '@/lib/audioUtils';

const related = [
  { name: 'WAV to MP3', slug: 'wav-to-mp3' },
  { name: 'FLAC to MP3', slug: 'flac-to-mp3' },
  { name: 'M4A to MP3', slug: 'm4a-to-mp3' },
];

const BITRATES = [96, 128, 192, 320];

export default function OggToMp3() {
  const [file, setFile]         = useState(null);
  const [bitrate, setBitrate]   = useState(128);
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
      setProgress('Decoding OGG audio...');
      const audioBuffer = await decodeAudioFile(file);
      setInfo({ duration: audioBuffer.duration, channels: audioBuffer.numberOfChannels, sampleRate: audioBuffer.sampleRate });
      setProgress(`Encoding to MP3 at ${bitrate}kbps...`);
      const mp3Blob = await encodeToMp3(audioBuffer, bitrate);
      downloadBlob(mp3Blob, file.name.replace(/\.(ogg|oga)$/i, '.mp3'));
      setProgress(`Done — ${formatSize(file.size)} → ${formatSize(mp3Blob.size)}`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting OGG. Make sure the file is a valid OGG Vorbis audio file.');
      setProgress('');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="OGG to MP3"
      subtitle="Convert OGG Vorbis audio files to universally compatible MP3 format."
      bullets={[
        'Converts OGG Vorbis and OGA files to MP3',
        'Choose output bitrate (96–320 kbps)',
        'Works with game audio, podcast and music files',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
      slug="ogg-to-mp3"
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
            <div style={{ width: 40, height: 40, background: '#fff3e0', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#e65100' }}>OGG</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                {formatSize(file.size)}{info && ` · ${formatDuration(info.duration)} · ${info.channels === 1 ? 'Mono' : 'Stereo'}`}
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
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your OGG file here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>OGG, OGA — or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept=".ogg,.oga,audio/ogg" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
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
          <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>kbps — 128 is standard quality for OGG source material</p>
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
      <ToolContent slug="ogg-to-mp3" />
    </ToolLayout>
  );
}
