// Decode any browser-supported audio file to AudioBuffer
export async function decodeAudioFile(file) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const buf = await file.arrayBuffer();
  const audioBuffer = await ctx.decodeAudioData(buf);
  await ctx.close();
  return audioBuffer;
}

// Encode AudioBuffer to MP3 Blob using lamejs
export async function encodeToMp3(audioBuffer, bitrate = 128) {
  const lamejs = await import('lamejs');
  const Mp3Encoder = lamejs.default?.Mp3Encoder || lamejs.Mp3Encoder;

  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate  = audioBuffer.sampleRate;
  const encoder     = new Mp3Encoder(numChannels, sampleRate, bitrate);

  const blockSize = 1152;
  const mp3Chunks = [];

  if (numChannels === 1) {
    const pcm = float32ToInt16(audioBuffer.getChannelData(0));
    for (let i = 0; i < pcm.length; i += blockSize) {
      const chunk = pcm.subarray(i, i + blockSize);
      const encoded = encoder.encodeBuffer(chunk);
      if (encoded.length > 0) mp3Chunks.push(new Uint8Array(encoded));
    }
  } else {
    const left  = float32ToInt16(audioBuffer.getChannelData(0));
    const right = float32ToInt16(audioBuffer.getChannelData(1));
    for (let i = 0; i < left.length; i += blockSize) {
      const lChunk = left.subarray(i, i + blockSize);
      const rChunk = right.subarray(i, i + blockSize);
      const encoded = encoder.encodeBuffer(lChunk, rChunk);
      if (encoded.length > 0) mp3Chunks.push(new Uint8Array(encoded));
    }
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) mp3Chunks.push(new Uint8Array(flushed));

  return new Blob(mp3Chunks, { type: 'audio/mpeg' });
}

// Encode AudioBuffer to WAV Blob
export function encodeToWav(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate  = audioBuffer.sampleRate;
  const bitDepth    = 16;
  const numSamples  = audioBuffer.length;
  const dataLength  = numSamples * numChannels * (bitDepth / 8);
  const buffer      = new ArrayBuffer(44 + dataLength);
  const view        = new DataView(buffer);

  function writeStr(offset, str) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);                            // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
  view.setUint16(32, numChannels * (bitDepth / 8), true);
  view.setUint16(34, bitDepth, true);
  writeStr(36, 'data');
  view.setUint32(40, dataLength, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const s = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([buffer], { type: 'audio/wav' });
}

// Float32 PCM → Int16 PCM
function float32ToInt16(float32Array) {
  const int16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return int16;
}

export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
