'use client';
import { ImageConverter } from '@/components/ImageConverter';
import ToolContent from '@/components/ToolContent';

export default function JpgToWebp() {
  return (
  <>
    <ImageConverter
      slug="jpg-to-webp"
      title="JPG to WebP"
      subtitle="Convert JPG images to modern WebP format for up to 30% smaller file sizes."
      bullets={[
        'Up to 30% smaller than equivalent JPG',
        'Ideal for web and app performance',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/jpeg', 'image/jpg', '.jpg', '.jpeg']}
      inputLabel="JPG"
      outputMime="image/webp"
      outputExt="webp"
      relatedTools={[
        { name: 'PNG to WebP', slug: 'png-to-webp' },
        { name: 'JPG to PNG', slug: 'jpg-to-png' },
        { name: 'Compress Image', slug: 'compress-image' },
      ]}
    />
    <ToolContent slug="jpg-to-webp" />
  </>
  );
}
