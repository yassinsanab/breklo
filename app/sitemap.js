export default function sitemap() {
  const base = 'https://breklo.com';
  const tools = [
    'merge-pdf','split-pdf','compress-pdf','rotate-pdf','organize-pdf',
    'extract-pdf-pages','delete-pdf-pages','password-protect-pdf',
    'pdf-to-jpg','pdf-to-png','pdf-to-text',
    'jpg-to-pdf','png-to-pdf','image-to-pdf',
    'compress-image','heic-to-jpg','jpg-to-png','png-to-jpg',
    'jpg-to-webp','png-to-webp','merge-images',
    'mp4-to-mp3','wav-to-mp3','mp3-to-wav',
  ];
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...tools.map(slug => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
