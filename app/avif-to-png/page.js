'use client';
import { ImageConverter } from '@/components/ImageConverter';
import ToolContent from '@/components/ToolContent';

export default function AvifToPng() {
  return (
  <>
    <ImageConverter
      slug="avif-to-png"
      title="AVIF to PNG"
      subtitle="Convert AVIF images to lossless PNG format. Preserves transparency and sharp detail."
      bullets={[
        'Lossless PNG output — no quality loss',
        'Preserves transparency',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/avif', '.avif']}
      inputLabel="AVIF"
      outputMime="image/png"
      outputExt="png"
      relatedTools={[
        { name: 'AVIF to JPG', slug: 'avif-to-jpg' },
        { name: 'JPG to AVIF', slug: 'jpg-to-avif' },
        { name: 'WebP to JPG', slug: 'webp-to-jpg' },
      ]}
    />
    <ToolContent slug="avif-to-png" />
  </>
  );
}
