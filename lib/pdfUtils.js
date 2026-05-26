import { downloadBlob } from '@/lib/download';

export function downloadFile(bytes, originalName, suffix = '', mimeType = 'application/pdf') {
  downloadBlob(new Blob([bytes], { type: mimeType }), originalName, suffix);
}

// Format file size
export function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Read file as ArrayBuffer
export function readFileAsBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
