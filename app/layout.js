import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800'] });

export const metadata = {
  title: { default: 'Breklo – Online File Tools', template: '%s | Breklo' },
  description: 'Free online PDF, image, audio and video tools. Convert, compress, merge, split and edit files instantly in your browser.',
  verification: {
    google: 'V17Ptw0Xb3fH15YuqTXr67_MgfSdUUAMTX3PSCwgsDU',
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
