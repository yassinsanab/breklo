import { getAllSlugs } from '@/lib/posts';

export default function sitemap() {
  const base = 'https://www.breklo.com';

  const tools = [
    'merge-pdf','split-pdf','compress-pdf','rotate-pdf','organize-pdf',
    'extract-pdf-pages','delete-pdf-pages','password-protect-pdf',
    'pdf-to-jpg','pdf-to-png','pdf-to-text',
    'jpg-to-pdf','png-to-pdf','image-to-pdf',
    'compress-image','heic-to-jpg','jpg-to-png','png-to-jpg',
    'jpg-to-webp','png-to-webp','merge-images',
    'gif-to-jpg','svg-to-jpg','webp-to-jpg','resize-image',
    'mp4-to-mp3','wav-to-mp3','mp3-to-wav','m4a-to-mp3','mp4-to-wav',
    'flac-to-mp3','ogg-to-mp3',
  ];

  const blogSlugs = getAllSlugs();

  return [
    { url: base,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    ...tools.map(slug => ({
      url: `${base}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
    ...blogSlugs.map(slug => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
