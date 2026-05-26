// Global download helper for ALL Breklo tools
// Brands every downloaded file with "breklo" in the filename

/**
 * Adds "breklo" to a filename, preserving the extension.
 * Examples:
 *   "report.pdf"           → "report-by-breklo.pdf"
 *   "photo.jpg"            → "photo-by-breklo.jpg"
 *   "compressed.png"       → "compressed-by-breklo.png"
 *   "audio"                → "audio-by-breklo"
 */
export function brandFilename(originalName, suffix = '') {
  if (!originalName) return 'breklo-file' + (suffix ? '-' + suffix : '');
  // Split filename and extension
  const lastDot = originalName.lastIndexOf('.');
  if (lastDot === -1 || lastDot === 0) {
    return originalName + (suffix ? '-' + suffix : '') + '-by-breklo';
  }
  const name = originalName.substring(0, lastDot);
  const ext  = originalName.substring(lastDot); // includes the dot
  const suffixPart = suffix ? '-' + suffix : '';
  return `${name}${suffixPart}-by-breklo${ext}`;
}

/**
 * Download a Blob with branded filename.
 */
export function downloadBlob(blob, originalName, suffix = '') {
  const filename = brandFilename(originalName, suffix);
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Download a data URL as a file with branded filename.
 */
export function downloadDataUrl(dataUrl, originalName, suffix = '') {
  const filename = brandFilename(originalName, suffix);
  const a   = document.createElement('a');
  a.href     = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Download bytes (Uint8Array) as a file with branded filename.
 */
export function downloadBytes(bytes, originalName, mimeType = 'application/octet-stream', suffix = '') {
  const blob = new Blob([bytes], { type: mimeType });
  downloadBlob(blob, originalName, suffix);
}
