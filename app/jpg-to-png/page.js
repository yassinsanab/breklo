'use client';
import { ImageConverter } from '@/components/ImageConverter';

export default function JpgToPng() {
  return (
    <ImageConverter
      slug="jpg-to-png"
      title="JPG to PNG"
      subtitle="Convert JPG images to lossless PNG format. Ideal for graphics, logos and screenshots."
      bullets={[
        'Lossless PNG output — no quality loss',
        'Supports transparency in output',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/jpeg', 'image/jpg', '.jpg', '.jpeg']}
      inputLabel="JPG"
      outputMime="image/png"
      outputExt="png"
      relatedTools={[
        { name: 'PNG to JPG', slug: 'png-to-jpg' },
        { name: 'JPG to WebP', slug: 'jpg-to-webp' },
        { name: 'Compress Image', slug: 'compress-image' },
      ]}
    />
  );
}
