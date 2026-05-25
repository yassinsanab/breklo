export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.breklo.com/sitemap.xml',
    host: 'https://www.breklo.com',
  };
}
