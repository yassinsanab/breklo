import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700','800'] });

export const metadata = {
  title: { default: 'Breklo – Online File Tools', template: '%s | Breklo' },
  description: 'Free online PDF, image, audio and video tools. Convert, compress, merge, split and edit files instantly in your browser.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
