import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.breklo.com'),
  title: {
    default: 'Breklo – Free Online File Tools',
    template: '%s | Breklo',
  },
  description: 'Free online PDF, image, audio and video tools. Convert, compress, merge, split and edit files instantly in your browser. No signup, no watermark.',
  keywords: ['pdf tools', 'image converter', 'compress pdf', 'merge pdf', 'heic to jpg', 'mp4 to mp3', 'file converter online free'],
  authors: [{ name: 'Breklo' }],
  creator: 'Breklo',
  publisher: 'Breklo',
  verification: {
    google: 'V17Ptw0Xb3fH15YuqTXr67_MgfSdUUAMTX3PSCwgsDU',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.breklo.com',
    siteName: 'Breklo',
    title: 'Breklo – Free Online File Tools',
    description: 'Free online PDF, image, audio and video tools. Convert, compress, merge and edit files in your browser. No signup required.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Breklo – Free Online File Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breklo – Free Online File Tools',
    description: 'Free online PDF, image, audio and video tools. No signup, no watermark.',
    images: ['/og-image.png'],
    creator: '@breklo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.breklo.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1ZS3VKK6GC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1ZS3VKK6GC');
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
