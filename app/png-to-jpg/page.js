'use client';
import { ImageConverter } from '@/components/ImageConverter';
import ToolContent from '@/components/ToolContent';

export default function PngToJpg() {
  return (
  <>
    <ImageConverter
      slug="png-to-jpg"
      title="PNG to JPG"
      subtitle="Convert PNG images to JPG format for smaller file sizes and wider compatibility."
      bullets={[
        'Smaller file size than PNG',
        'Adjustable output quality',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/png', '.png']}
      inputLabel="PNG"
      outputMime="image/jpeg"
      outputExt="jpg"
      relatedTools={[
        { name: 'JPG to PNG', slug: 'jpg-to-png' },
        { name: 'PNG to WebP', slug: 'png-to-webp' },
        { name: 'Compress Image', slug: 'compress-image' },
      ]}
    />
    <ToolContent slug="png-to-jpg" />
  </>
  );
}
