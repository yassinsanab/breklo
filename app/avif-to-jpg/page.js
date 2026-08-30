'use client';
import { ImageConverter } from '@/components/ImageConverter';
import ToolContent from '@/components/ToolContent';

export default function AvifToJpg() {
  return (
  <>
    <ImageConverter
      slug="avif-to-jpg"
      title="AVIF to JPG"
      subtitle="Convert AVIF images to universally compatible JPG format. Works with any app, device or website."
      bullets={[
        'Open AVIF images in any app or editor',
        'Adjustable output quality',
        'Convert multiple files at once',
        'Runs entirely in your browser — no uploads',
      ]}
      accept={['image/avif', '.avif']}
      inputLabel="AVIF"
      outputMime="image/jpeg"
      outputExt="jpg"
      relatedTools={[
        { name: 'AVIF to PNG', slug: 'avif-to-png' },
        { name: 'JPG to AVIF', slug: 'jpg-to-avif' },
        { name: 'WebP to JPG', slug: 'webp-to-jpg' },
      ]}
    />
    <ToolContent slug="avif-to-jpg" />
  </>
  );
}
