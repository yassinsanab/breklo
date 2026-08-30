// lib/avifToolContent.js — SEO content for the 3 AVIF tools.
// Merge these into lib/toolContent.js (same {h1, intro, sections:[{h,p}]} shape).

export const avifToolContent = {

  'avif-to-jpg': {
    h1: 'AVIF to JPG Converter — Convert AVIF Images to JPG Free',
    intro: 'Convert AVIF images to JPG free online with Breklo. AVIF is a modern, highly efficient image format, but many apps, editors and older devices can\'t open it yet. Our free AVIF to JPG converter turns AVIF files into universally compatible JPG images in seconds — right in your browser, with nothing uploaded to a server.',
    sections: [
      { h: 'Why convert AVIF to JPG?', p: 'AVIF (AV1 Image File Format) produces beautifully small files, which is why more websites now serve images in AVIF. The problem comes when you save one: many photo editors, older phones, some social platforms and plenty of desktop apps still can\'t open AVIF. Converting to JPG solves this instantly — JPG opens on literally everything, from a 10-year-old laptop to any photo app or web upload form.' },
      { h: 'How to convert AVIF to JPG', p: 'Drop your AVIF files onto Breklo (one or many at once), choose an output quality, and click convert. Each AVIF becomes a standard JPG that opens everywhere. The conversion happens locally in your browser, so your images are never uploaded — fast, private and free.' },
      { h: 'High-quality AVIF conversion', p: 'Breklo decodes each AVIF at full resolution and re-encodes it as a JPG, preserving the visible detail and colour. You control the output quality to balance file size against fidelity. Convert product photos, screenshots, downloaded web images and more.' },
      { h: 'Private and secure', p: 'All conversion runs in your browser. Your AVIF files and the resulting JPGs never touch a server, are never logged, and aren\'t stored after you close the tab — ideal for personal photos and confidential images.' },
      { h: 'Works on any device', p: 'Breklo runs on Windows, Mac, Linux, ChromeOS, iPhone, iPad and Android. No app to install, no account to create. Convert AVIF to JPG from any modern browser, free and without limits.' },
    ],
  },

  'avif-to-png': {
    h1: 'AVIF to PNG Converter — Convert AVIF to Lossless PNG Free',
    intro: 'Convert AVIF images to PNG free online with Breklo. When you need lossless quality, sharp edges or transparency, PNG is the right target. Our free AVIF to PNG converter turns AVIF files into high-quality PNG images in your browser — nothing uploaded, no watermarks, no limits.',
    sections: [
      { h: 'Why convert AVIF to PNG?', p: 'AVIF is efficient but not universally supported, and when you need to edit an image or preserve transparency, PNG is the format most tools expect. Converting AVIF to PNG gives you a lossless working copy with a transparent background intact — ideal for graphics, logos, screenshots and anything headed into a design tool.' },
      { h: 'How to convert AVIF to PNG', p: 'Drop your AVIF files onto Breklo, and click convert. Each file is decoded and saved as a lossless PNG with transparency preserved. Convert a single image or a whole batch at once, then download. Everything happens in your browser.' },
      { h: 'Lossless, transparency-preserving output', p: 'PNG uses lossless compression, so the converted image matches the decoded AVIF exactly — no added artefacts. If the AVIF has an alpha channel, the PNG keeps it, so transparent areas stay transparent. Perfect for design work and graphics.' },
      { h: 'Private by design', p: 'Breklo converts AVIF to PNG locally in your browser. Your files are never uploaded, never logged and never stored after your session. Safe for proprietary graphics and personal images alike.' },
      { h: 'Free on every device', p: 'Use Breklo on Windows, Mac, Linux, ChromeOS, iOS and Android. No installation, no account, no usage caps. The simplest way to turn AVIF into a universally editable PNG.' },
    ],
  },

  'jpg-to-avif': {
    h1: 'JPG to AVIF Converter — Convert Images to AVIF Free',
    intro: 'Convert JPG and PNG images to AVIF free online with Breklo. AVIF is the newest mainstream image format — typically 30–50% smaller than WebP and 50–70% smaller than JPG at the same visual quality. Our free converter creates AVIF files right in your browser, perfect for faster, more modern websites.',
    sections: [
      { h: 'Why convert to AVIF?', p: 'AVIF delivers the biggest compression improvement mainstream image formats have seen in over a decade. At the same visual quality, an AVIF is dramatically smaller than the equivalent JPG or WebP — which means faster page loads, lower bandwidth costs, better Core Web Vitals and improved search rankings. Every major browser now supports displaying AVIF, so it\'s ready for production use.' },
      { h: 'How to convert JPG to AVIF', p: 'Drop your JPG or PNG files onto Breklo, choose a quality level, and click convert. Each image is encoded as AVIF and downloaded. Compare the size reduction — it\'s often substantial. The conversion runs in your browser, so your images stay on your device.' },
      { h: 'AVIF for web performance', p: 'If you run a website, converting images to AVIF is one of the highest-impact speed optimisations available. Smaller images mean a faster Largest Contentful Paint, which Google rewards with better rankings. Serve AVIF with a JPG fallback for the best of both worlds.' },
      { h: 'Browser support note', p: 'Creating AVIF files (encoding) currently works in Chrome and Edge. Viewing AVIF works in all modern browsers. If your browser can\'t encode AVIF, Breklo will let you know — and our AVIF to JPG and AVIF to PNG converters work everywhere.' },
      { h: 'Private and free', p: 'Breklo encodes AVIF locally in your browser — your images are never uploaded. No account, no watermarks, no limits, on any device with a supported browser.' },
    ],
  },

};

// Meta for ToolLayout (title/subtitle/bullets already live in each page.js,
// so this is only needed if you drive metadata from a central place).
