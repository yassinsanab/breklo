// lib/alternatives.js — data for /alternatives/<slug> comparison pages.
// Facts verified against 2026 sources. Kept honest: we state real limits and
// give competitors genuine credit where due — that reads as trustworthy AND
// ranks better. The consistent, true differentiator for Breklo is:
// browser-based (no upload) + no limits + no watermark + free.

export const alternatives = {

  'ilovepdf': {
    competitor: 'iLovePDF',
    slug: 'ilovepdf',
    title: 'The Best Free iLovePDF Alternative (No Upload) — Breklo',
    metaDescription: 'Looking for a free iLovePDF alternative that doesn\'t upload your files? Breklo runs entirely in your browser — no server upload, no limits, no watermark.',
    heroSub: 'iLovePDF is a solid tool — but it uploads your files to its servers and locks batch processing and desktop apps behind a paid plan. Breklo does the core PDF work right in your browser, so nothing is uploaded, with no daily limits and no watermarks.',
    // Honest credit — what the competitor genuinely does well
    theyDoWell: 'iLovePDF is fast, polished, and offers a wide toolkit including OCR and a desktop app on its paid tier. Its free tier has no daily task cap (the constraint is file size, around 100MB per file), and it doesn\'t watermark free output. For occasional use where uploading isn\'t a concern, it\'s a genuinely good tool.',
    // The honest case for Breklo
    whyBreklo: [
      { h: 'Your files never upload', p: 'This is the core difference. iLovePDF uploads your documents to its servers to process them, then deletes them (it states within about an hour). Breklo processes files locally in your browser — you can open your browser\'s Network tab and watch: there are zero file uploads. For contracts, IDs, medical or financial documents, that matters.' },
      { h: 'No paid tier at all', p: 'iLovePDF Premium runs about €3.99–€7/month for batch processing, larger files, and the apps. Breklo has no paid tier — every tool is free, including batch processing, because the work happens on your device instead of a server we\'d have to pay for.' },
      { h: 'No install, works everywhere', p: 'iLovePDF\'s offline use needs its desktop or mobile app. Breklo runs in any modern browser on Windows, Mac, Linux, iPhone and Android — nothing to install.' },
    ],
    // Comparison table rows: [feature, breklo, competitor]
    table: [
      ['Files uploaded to a server', 'No — browser only', 'Yes'],
      ['Price', 'Free', 'Free tier + €3.99–7/mo Premium'],
      ['Daily limits', 'None', 'No task cap; file-size caps on free'],
      ['Watermarks', 'Never', 'None on free output'],
      ['Account required', 'No', 'For some features'],
      ['Batch processing', 'Free', 'Premium only'],
      ['OCR (scanned text)', 'Not yet', 'Yes (server-side)'],
    ],
    // Which Breklo tools to funnel to
    tools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Edit & Sign PDF', slug: 'edit-pdf' },
    ],
    // Honest verdict
    verdict: 'If you need OCR or the widest server-side feature set and don\'t mind uploading, iLovePDF is a strong choice. If you want your files to stay on your device, with no limits or paywall for everyday PDF work, Breklo is the better free alternative.',
    faq: [
      { q: 'Is there a free iLovePDF alternative that doesn\'t upload files?', a: 'Yes. Breklo processes PDFs entirely in your browser, so files are never uploaded to a server. It covers compress, merge, split, edit, sign and convert — free, with no limits or watermarks.' },
      { q: 'Does iLovePDF upload my files?', a: 'Yes. iLovePDF uploads your documents to its servers to process them, then deletes them (it states within about an hour). If you\'d rather your files never leave your device, use a browser-based tool like Breklo.' },
      { q: 'Is Breklo really free with no limits?', a: 'Yes. Every tool is free with no daily task cap, no watermark and no account, because processing happens on your device rather than a paid server.' },
      { q: 'What can iLovePDF do that Breklo can\'t?', a: 'iLovePDF offers server-side OCR (reading text from scanned documents), which browser-based tools can\'t reliably do yet. For that specific need, iLovePDF or a dedicated OCR service is better.' },
    ],
  },

  'smallpdf': {
    competitor: 'Smallpdf',
    slug: 'smallpdf',
    title: 'The Best Free Smallpdf Alternative (No Daily Limit) — Breklo',
    metaDescription: 'A free Smallpdf alternative with no 2-per-day limit and no upload. Breklo runs in your browser — unlimited use, no watermark, no account.',
    heroSub: 'Smallpdf has the cleanest interface of any web PDF tool — but its free tier limits you to about 2 tasks per day and uploads your files to its servers. Breklo gives you unlimited use in your browser, with nothing uploaded.',
    theyDoWell: 'Smallpdf has arguably the best-designed interface of any online PDF tool — clean, modern and intuitive on desktop and mobile. If polished design is your top priority and you only need a task or two per day, it\'s excellent.',
    whyBreklo: [
      { h: 'No 2-per-day limit', p: 'Smallpdf\'s free tier caps you at roughly 2 tasks per day. If you compress a PDF and then merge it, you\'ve used your allowance — the next step waits until tomorrow or pushes you to Pro (~$12/month). Breklo has no task limit at all.' },
      { h: 'Your files never upload', p: 'Smallpdf uploads files to its servers to process them. Breklo works locally in your browser — files never leave your device, which is safer for anything sensitive.' },
      { h: 'No watermarks anywhere', p: 'Smallpdf adds a watermark on certain free operations (notably PDF to Word). Breklo never watermarks output, on any tool.' },
    ],
    table: [
      ['Files uploaded to a server', 'No — browser only', 'Yes'],
      ['Price', 'Free', 'Free tier + ~$12/mo Pro'],
      ['Daily limits', 'None', '~2 tasks/day on free'],
      ['Watermarks', 'Never', 'On some free operations'],
      ['Free file-size cap', 'Your device\'s RAM', 'Low on free tier'],
      ['Account required', 'No', 'Pushed on free tier'],
    ],
    tools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'PDF to Text', slug: 'pdf-to-text' },
    ],
    verdict: 'If interface polish matters most and you only need occasional use, Smallpdf is lovely. If you want unlimited free use with no watermarks and files that never upload, Breklo is the stronger free alternative.',
    faq: [
      { q: 'What is the best free Smallpdf alternative?', a: 'Breklo is a strong free alternative — it has no 2-per-day task limit, never watermarks output, and processes files in your browser so they\'re never uploaded.' },
      { q: 'Why does Smallpdf limit me to 2 tasks a day?', a: 'That\'s Smallpdf\'s free-tier restriction, designed to encourage upgrading to Pro (~$12/month). Browser-based tools like Breklo have no task limit because there\'s no server cost per task.' },
      { q: 'Does Smallpdf add watermarks?', a: 'On certain free operations, notably PDF to Word, yes. Breklo never adds watermarks on any tool.' },
      { q: 'Is Breklo free?', a: 'Yes, completely — no daily limits, no watermarks, no account. Everything runs in your browser.' },
    ],
  },

  'adobe-acrobat': {
    competitor: 'Adobe Acrobat',
    slug: 'adobe-acrobat',
    title: 'A Free Adobe Acrobat Alternative for Everyday PDF Work — Breklo',
    metaDescription: 'Don\'t need the full Adobe Acrobat subscription? Breklo handles compress, merge, edit and sign PDFs free in your browser — no upload, no account.',
    heroSub: 'Adobe Acrobat is the professional standard — and priced like it. For everyday tasks like compressing, merging, editing and signing PDFs, Breklo does the job free in your browser, with no subscription and nothing uploaded.',
    theyDoWell: 'Adobe Acrobat Pro is the most powerful PDF software available — advanced OCR, redaction, forms, accessibility tools, and the most trusted compression engine (it\'s the industry standard for a reason). For professionals who live in PDFs daily, it\'s worth the price.',
    whyBreklo: [
      { h: 'No subscription', p: 'Acrobat Pro runs around $239/year, and its free online tools are limited and require an Adobe sign-in. Breklo\'s tools are free with no account — ideal if you don\'t need Acrobat\'s professional depth for occasional tasks.' },
      { h: 'Your files never upload', p: 'Adobe\'s online tools upload your files to Adobe\'s servers and require signing in (which tracks usage). Breklo processes everything locally in your browser — no upload, no sign-in, no tracking.' },
      { h: 'Nothing to install', p: 'Acrobat\'s full power needs the desktop app. Breklo runs in any browser on any device, instantly.' },
    ],
    table: [
      ['Files uploaded to a server', 'No — browser only', 'Yes (online tools)'],
      ['Price', 'Free', '~$239/yr Pro; limited free online'],
      ['Account required', 'No', 'Yes (even for free online tools)'],
      ['Install required', 'No', 'For full features'],
      ['Everyday PDF tasks', 'Yes, free', 'Yes'],
      ['Advanced OCR / redaction / forms', 'No', 'Yes'],
    ],
    tools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Edit & Sign PDF', slug: 'edit-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    verdict: 'If you need professional features like advanced OCR, redaction or accessibility tooling, Adobe Acrobat is worth it. For everyday compress/merge/edit/sign work without a subscription, Breklo covers it free.',
    faq: [
      { q: 'Is there a free alternative to Adobe Acrobat?', a: 'Yes. For everyday tasks — compress, merge, split, edit, sign — Breklo does the job free in your browser with no account. Adobe Acrobat is only necessary for advanced professional features like OCR and redaction.' },
      { q: 'Do I need to pay for Adobe Acrobat to edit a PDF?', a: 'Not for basic editing. Breklo\'s free PDF editor lets you add text, draw, highlight and sign without a subscription or sign-in.' },
      { q: 'Are Adobe\'s free online PDF tools really free?', a: 'They\'re limited and require an Adobe or Google sign-in, which tracks usage. Breklo\'s tools need no account and process files locally.' },
      { q: 'What does Adobe Acrobat do that Breklo doesn\'t?', a: 'Advanced OCR, redaction, form creation, and accessibility tooling. For professional daily PDF work, Acrobat is more capable; for everyday tasks, Breklo is enough.' },
    ],
  },

  'pdf24': {
    competitor: 'PDF24',
    slug: 'pdf24',
    title: 'A Private PDF24 Alternative That Works in Your Browser — Breklo',
    metaDescription: 'PDF24 is free and full-featured, but its web tools upload your files. Breklo processes PDFs in your browser — nothing uploaded, no ads, free.',
    heroSub: 'PDF24 is genuinely free and packed with tools — but its web version uploads your files to its servers, and the interface is ad-heavy. Breklo does the core work in your browser with nothing uploaded and no ads.',
    theyDoWell: 'PDF24 deserves real credit: it\'s truly free with no task limits, no watermarks, and it offers a huge toolkit plus a desktop app that works offline. It\'s one of the most complete free PDF suites available, especially popular in Germany.',
    whyBreklo: [
      { h: 'Browser-based, no upload', p: 'PDF24\'s online tools upload your files to its servers to process them. (Its desktop app works locally, but needs installing.) Breklo processes files in your browser with no upload and no install — the privacy of local processing without downloading an app.' },
      { h: 'Cleaner, ad-free experience', p: 'PDF24\'s web interface is functional but ad-supported. Breklo\'s interface is minimal and ad-free.' },
      { h: 'Modern editor and signing', p: 'Breklo includes a modern in-browser PDF editor with text, drawing, highlighting and e-signatures built for touch and desktop alike.' },
    ],
    table: [
      ['Web tools upload files', 'No — browser only', 'Yes (desktop app is local)'],
      ['Price', 'Free', 'Free (ad-supported)'],
      ['Ads', 'None', 'Yes, on web'],
      ['Install required', 'No', 'For offline/local use'],
      ['Daily limits', 'None', 'None'],
      ['Watermarks', 'Never', 'Never'],
    ],
    tools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Edit & Sign PDF', slug: 'edit-pdf' },
    ],
    verdict: 'PDF24 is an excellent free suite, especially its offline desktop app. If you\'d rather not install anything and want your files to stay in the browser with no ads, Breklo is the cleaner web-based alternative.',
    faq: [
      { q: 'Is Breklo a good PDF24 alternative?', a: 'Yes, if you want a browser-based tool. PDF24\'s web version uploads files to its servers; Breklo processes them locally in your browser with no upload, no ads, and no install.' },
      { q: 'Does PDF24 upload my files?', a: 'Its online tools do. PDF24\'s desktop app processes files locally but requires installing. Breklo gives you local, in-browser processing without any download.' },
      { q: 'Is PDF24 really free?', a: 'Yes, PDF24 is genuinely free and ad-supported with no task limits — one of the better free suites. Breklo is also free, without ads.' },
      { q: 'Which is more private, PDF24 or Breklo?', a: 'For web use, Breklo — it never uploads files. PDF24\'s desktop app is also private but must be installed first.' },
    ],
  },

  'tinypng': {
    competitor: 'TinyPNG',
    slug: 'tinypng',
    title: 'A Free TinyPNG Alternative With No Upload or Limits — Breklo',
    metaDescription: 'TinyPNG is great but uploads your images and caps the free tier. Breklo compresses PNG, JPG and WebP in your browser — no upload, no limit.',
    heroSub: 'TinyPNG is a lovely image compressor — but it uploads your images to its servers and limits the free tier. Breklo compresses PNG, JPG and WebP right in your browser, with no upload and no cap.',
    theyDoWell: 'TinyPNG pioneered smart lossy compression and produces excellent results with a beautifully simple interface. Its compression quality is a benchmark, and for a handful of images it\'s effortless.',
    whyBreklo: [
      { h: 'No upload, no image cap', p: 'TinyPNG uploads your images to its servers and limits free use (by number of images and file size). Breklo compresses images locally in your browser — nothing is uploaded, and there\'s no cap on how many you process.' },
      { h: 'More than compression', p: 'Beyond compressing, Breklo also resizes, converts (JPG/PNG/WebP/HEIC), and merges images — a fuller image toolkit in one place.' },
      { h: 'Completely free', p: 'TinyPNG\'s heavier use and API sit behind paid plans. Breklo\'s image tools are entirely free.' },
    ],
    table: [
      ['Images uploaded to a server', 'No — browser only', 'Yes'],
      ['Price', 'Free', 'Free tier + paid plans'],
      ['Free usage cap', 'None', 'Limited images/size on free'],
      ['Formats', 'PNG, JPG, WebP, HEIC +', 'PNG, JPG, WebP'],
      ['Also resize / convert / merge', 'Yes', 'Compression focus'],
    ],
    tools: [
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'Resize Image', slug: 'resize-image' },
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
    ],
    verdict: 'TinyPNG\'s compression quality is superb for a few images. If you want unlimited compression with no upload, plus resizing and format conversion in one place, Breklo is the more flexible free alternative.',
    faq: [
      { q: 'Is there a free TinyPNG alternative with no limits?', a: 'Yes. Breklo compresses PNG, JPG and WebP images in your browser with no upload and no cap on the number of images, completely free.' },
      { q: 'Does TinyPNG upload my images?', a: 'Yes, TinyPNG uploads images to its servers to compress them. Breklo compresses locally in your browser, so images never leave your device.' },
      { q: 'Can Breklo compress as well as TinyPNG?', a: 'Breklo uses smart in-browser compression that significantly reduces file size while keeping quality high. TinyPNG\'s engine is a quality benchmark, but Breklo removes the upload and the usage cap.' },
      { q: 'Does Breklo do more than compress images?', a: 'Yes — it also resizes, converts between formats (JPG, PNG, WebP, HEIC), and merges images, all in the browser.' },
    ],
  },

};

export function getAlternative(slug) {
  return alternatives[slug] || null;
}

export function getAllAlternativeSlugs() {
  return Object.keys(alternatives);
}
