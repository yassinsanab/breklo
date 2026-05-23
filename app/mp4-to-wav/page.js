'use client';
import { useState } from 'react';
import ToolLayout from '@/components/ToolLayout';
import { decodeAudioFile, encodeToWav, downloadBlob, formatSize, formatDuration } from '@/lib/audioUtils';

const related = [
  { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
  { name: 'WAV to MP3', slug: 'wav-to-mp3' },
  { name: 'MP3 to WAV', slug: 'mp3-to-wav' },
];

export default function Mp4ToWav() {
  const [file, setFile]         = useState(null);
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
      setProgress('Decoding audio from video...');
      const audioBuffer = await decodeAudioFile(file);
      setInfo({ duration: audioBuffer.duration, channels: audioBuffer.numberOfChannels, sampleRate: audioBuffer.sampleRate });

      setProgress('Encoding to WAV (PCM 16-bit)...');
      const wavBlob = encodeToWav(audioBuffer);

      const outName = file.name.replace(/\.[^/.]+$/, '') + '.wav';
      downloadBlob(wavBlob, outName);
      setProgress(`Done — ${formatSize(file.size)} → ${formatSize(wavBlob.size)}`);
      setDone(true);
    } catch (e) {
      console.error(e);
      alert('Error converting file. Make sure it is a valid video file with an audio track.');
      setProgress('');
    }
    setLoading(false);
  }

  return (
    <ToolLayout
      title="MP4 to WAV"
      subtitle="Extract the audio from an MP4 video and save it as an uncompressed WAV file for editing."
      bullets={[
        'Extracts audio as uncompressed PCM 16-bit WAV',
        'Perfect for audio editing in Audacity, Logic Pro, etc.',
        'Works with MP4, MOV, WebM and other video formats',
        'Runs entirely in your browser — no uploads',
      ]}
      relatedTools={related}
      slug="mp4-to-wav"
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
            <div style={{ width: 40, height: 40, background: '#f5f3ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: '#6d28d9' }}>MP4</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>
                {formatSize(file.size)}
                {info && ` · ${formatDuration(info.duration)} · ${info.sampleRate / 1000}kHz · ${info.channels === 1 ? 'Mono' : 'Stereo'}`}
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
            <p style={{ fontWeight: 700, fontSize: 15, color: '#111', marginBottom: 4 }}>Drop your MP4 file here</p>
            <p style={{ fontSize: 13, color: '#9ca3af' }}>MP4, MOV, WebM — or click to browse</p>
          </>
        )}
        <input id="fi" type="file" accept="video/*,audio/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      </div>

      {info && (
        <div style={{ background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: 9, padding: '12px 16px', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{formatDuration(info.duration)}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Duration</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{info.sampleRate / 1000}kHz</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Sample rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{info.channels === 1 ? 'Mono' : 'Stereo'}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>Channels</div>
            </div>
          </div>
        </div>
      )}

      {!done && file && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 9, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: '#92400e' }}>
          Note: WAV files are much larger than MP4. The output file may be 10–20× the size of the source video.
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
        {loading ? 'Converting...' : done ? 'Convert again' : 'Convert to WAV'}
      </button>
    </ToolLayout>
  );
}
