'use client';
import { ImageConverter } from '@/components/ImageConverter';
import ToolContent from '@/components/ToolContent';

export default function PngToWebp() {
  return (
  <>
    <ImageConverter
      slug="png-to-webp"
      title="PNG to WebP"
      subtitle="Convert PNG images to WebP format for significantly smaller files on the web."
      bullets={[
        'Much smaller than PNG for web use',
        'Preserves transparency in WebP output',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/png', '.png']}
      inputLabel="PNG"
      outputMime="image/webp"
      outputExt="webp"
      relatedTools={[
        { name: 'JPG to WebP', slug: 'jpg-to-webp' },
        { name: 'PNG to JPG', slug: 'png-to-jpg' },
        { name: 'Compress Image', slug: 'compress-image' },
      ]}
    />
    <ToolContent slug="png-to-webp" />
  </>
  );
}
