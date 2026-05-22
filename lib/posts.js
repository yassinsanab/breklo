export const posts = [
  {
    slug: 'how-to-compress-pdf-online',
    title: 'How to Compress a PDF Online for Free (Without Losing Quality)',
    description: 'Learn how to reduce PDF file size online in seconds. Step-by-step guide with free tools — no software installation needed.',
    date: '2025-06-01',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
    ],
    content: `
## Why PDF Files Get So Large

PDF files grow large for several reasons: embedded high-resolution images, embedded fonts, metadata, and annotations all add to the file size. A single scanned page at 300 DPI can easily be 1–2 MB on its own. A 20-page report with images can quickly reach 50 MB — too large to email or upload.

The good news: most of that size can be removed without any visible quality loss.

## How PDF Compression Works

PDF compression works in two main ways:

**Structure optimisation** removes unused objects, duplicate data, and redundant metadata from the file. This is fast and lossless — the document looks identical after compression.

**Image re-rendering** redraws each page at a lower resolution and re-encodes images at reduced quality. This achieves much higher compression ratios (often 50–80%) but is best used when the PDF is image-heavy or was originally scanned.

## How to Compress a PDF on Breklo

1. Go to [Breklo's Compress PDF tool](/compress-pdf)
2. Drag and drop your PDF file, or click **Browse files**
3. Choose a compression level:
   - **Basic** — fast structural optimisation, no quality change
   - **Medium** — re-renders pages at 72% quality, good for most documents
   - **High** — maximum compression, best for scanned PDFs
4. Click **Compress PDF**
5. Your compressed file downloads automatically

The tool shows you the exact reduction — original size, new size, and percentage saved.

## Tips for Best Results

- For **text-only PDFs** (contracts, reports), use Basic mode. It's lossless and still removes 10–30% of file size.
- For **scanned documents or image-heavy PDFs**, use High mode. Expect 50–80% reduction.
- If you need to **email a PDF**, Medium mode is the sweet spot — good quality, much smaller file.
- After compressing, you can also [merge multiple PDFs](/merge-pdf) into one compressed document.

## What About Password-Protected PDFs?

If your PDF is password-protected, you will need to unlock it before compressing. You can use a dedicated PDF unlocker tool first, then compress the result.

## Frequently Asked Questions

See the FAQ section on the [Compress PDF page](/compress-pdf) for answers to the most common questions.
    `.trim(),
    faq: [
      { q: 'Does compressing a PDF reduce image quality?', a: 'It depends on the mode. Basic compression is lossless — no quality change. Medium and High modes re-render pages as images, which reduces quality slightly in exchange for much smaller file sizes. For most use cases, Medium mode is unnoticeable.' },
      { q: 'How much can I reduce a PDF file size?', a: 'Typical results range from 20% reduction (Basic, text-only PDFs) to 80% reduction (High mode, scanned or image-heavy PDFs). Results vary by document type.' },
      { q: 'Is there a file size limit?', a: 'Breklo supports PDFs up to 100 MB. All processing happens in your browser, so there are no server-side limits.' },
      { q: 'Will the compressed PDF look different?', a: 'In Basic mode, the PDF is visually identical. In Medium and High modes, text-based pages may show slight softening, but for screen reading it is generally unnoticeable.' },
      { q: 'Can I compress a scanned PDF?', a: 'Yes. High compression mode is specifically effective for scanned PDFs, as it re-renders each page at a lower DPI.' },
      { q: 'Is my PDF uploaded to a server?', a: 'No. All processing happens entirely in your browser using WebAssembly. Your file never leaves your device.' },
    ],
  },
  {
    slug: 'how-to-convert-heic-to-jpg',
    title: 'How to Convert HEIC to JPG on Windows, Mac and Online (Free)',
    description: 'iPhone photos saved as HEIC won\'t open everywhere. Here\'s how to convert HEIC to JPG instantly — no app download needed.',
    date: '2025-06-03',
    category: 'Image Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'HEIC to JPG', slug: 'heic-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'JPG to PNG', slug: 'jpg-to-png' },
    ],
    content: `
## What Is HEIC and Why Is It a Problem?

HEIC (High Efficiency Image Container) is Apple's default photo format since iOS 11. It produces excellent quality at roughly half the file size of JPG. The problem: Windows, most websites, and many apps don't support it natively.

If you've ever emailed an iPhone photo and had someone reply "I can't open it," HEIC is the reason.

## How to Convert HEIC to JPG Online (No Download)

The fastest way requires no software at all:

1. Go to [Breklo's HEIC to JPG converter](/heic-to-jpg)
2. Drop your HEIC or HEIF files onto the upload area
3. Adjust the output quality if needed (90% is a good default)
4. Click **Convert to JPG**
5. Your JPG files download immediately

You can convert multiple HEIC files at once. Each becomes a separate JPG file.

## How to Convert HEIC to JPG on Windows

Windows 10 and 11 don't open HEIC files by default unless you install the HEIF Image Extensions from the Microsoft Store (it's free). But if you just need to share the file, converting online is faster.

Alternatively, the **Photos** app in Windows 11 can open HEIC files if the extension is installed, and you can then export as JPG from there.

## How to Convert HEIC to JPG on Mac

On Mac, it's easier. Open the HEIC file in **Preview**, then go to **File → Export** and choose JPEG as the format. You can set the quality level before saving.

For bulk conversion on Mac, open multiple HEIC files in Preview, select all, then export them all at once.

## How to Stop iPhone Saving Photos as HEIC

If you'd rather your iPhone saves photos as JPG by default:

1. Open **Settings** on your iPhone
2. Go to **Camera → Formats**
3. Select **Most Compatible**

Your camera will now save photos as JPG instead of HEIC.

## HEIC vs JPG: Which Is Better?

| | HEIC | JPG |
|---|---|---|
| File size | ~50% smaller | Larger |
| Quality | Excellent | Very good |
| Compatibility | Apple only | Universal |
| Web support | Limited | Full |

For sharing and web use, JPG is the better choice. For storing photos on your iPhone, HEIC saves space.
    `.trim(),
    faq: [
      { q: 'Why can\'t I open HEIC files on Windows?', a: 'Windows does not support HEIC natively. You either need to install the HEIF Image Extensions from the Microsoft Store, or convert the file to JPG first.' },
      { q: 'Does converting HEIC to JPG reduce quality?', a: 'There is a small quality reduction since JPG uses lossy compression, but at 90% quality the difference is invisible in normal viewing. HEIC images are already high quality, so the converted JPG looks excellent.' },
      { q: 'Can I convert multiple HEIC files at once?', a: 'Yes. Breklo\'s HEIC to JPG tool accepts multiple files at once and converts them all in one go.' },
      { q: 'What is the difference between HEIC and HEIF?', a: 'HEIF is the container format standard, and HEIC is Apple\'s implementation of it. They are effectively the same thing — both use the .heic or .heif file extension.' },
      { q: 'Is HEIC conversion free on Breklo?', a: 'Yes, completely free with no file limits and no signup required. All processing happens in your browser.' },
      { q: 'Will the converted JPG have the same dimensions as the original?', a: 'Yes. The image dimensions are preserved exactly. Only the format and file size change.' },
    ],
  },
  {
    slug: 'how-to-merge-pdf-files-free',
    title: 'How to Merge PDF Files Into One Document (Free, No Signup)',
    description: 'Combine multiple PDF files into a single document online. Works on any device, no software needed, completely free.',
    date: '2025-06-05',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    content: `
## When Do You Need to Merge PDFs?

Merging PDF files is one of the most common document tasks. You might need to:

- Combine a cover letter and CV into one PDF for a job application
- Merge several invoices into one monthly report
- Combine multiple scanned pages into a single document
- Join chapters of a book or presentation into one file

Whatever the reason, the process takes seconds online.

## How to Merge PDFs on Breklo

1. Go to [Breklo's Merge PDF tool](/merge-pdf)
2. Click **Browse files** or drag and drop multiple PDF files
3. Reorder files using the ↑ ↓ arrows if needed
4. Click **Merge PDFs**
5. Your combined PDF downloads automatically

There is no limit on the number of files you can merge.

## How to Reorder Pages Before Merging

Order matters when merging. On Breklo, each file appears in the list with up and down arrows. Click the arrows to move files into the correct order before merging.

If you need to reorder individual pages (not just whole files), use the [Organize PDF tool](/organize-pdf) after merging.

## Merging PDFs on Desktop (Without a Browser)

On **Mac**, you can merge PDFs using Preview for free:
1. Open the first PDF in Preview
2. Go to **View → Thumbnails**
3. Drag the second PDF into the thumbnail sidebar
4. Save the file

On **Windows**, there's no built-in PDF merge tool. Using an online tool like Breklo is the simplest option.

## After Merging: Compress the Result

Merged PDFs are often larger than necessary because they combine all the content from the source files. After merging, run the result through [Compress PDF](/compress-pdf) to reduce the final file size significantly.

## Keep Pages Organised

If the merged document has pages in the wrong order, use [Organize PDF](/organize-pdf) to drag pages into the right sequence. You can also [delete unwanted pages](/delete-pdf-pages) or [extract specific pages](/extract-pdf-pages) from the merged document.
    `.trim(),
    faq: [
      { q: 'Is there a limit on how many PDFs I can merge?', a: 'No. You can merge as many PDF files as you need in one go. There is also no file size limit per file (up to 100 MB each).' },
      { q: 'Can I merge PDFs on my phone?', a: 'Yes. Breklo works on any modern browser including Safari on iPhone and Chrome on Android. No app download needed.' },
      { q: 'Will merging PDFs reduce quality?', a: 'No. Merging only combines the existing pages — it does not re-render or recompress any content. The quality of each page is preserved exactly.' },
      { q: 'Can I merge password-protected PDFs?', a: 'Password-protected PDFs need to be unlocked before merging. Remove the password first, then merge.' },
      { q: 'How do I merge PDFs in a specific order?', a: 'Use the up and down arrows next to each file in the Breklo merge tool to arrange them in the correct order before clicking Merge.' },
      { q: 'Is my data safe when merging PDFs online?', a: 'Yes. Breklo processes everything in your browser. Your files are never uploaded to any server.' },
    ],
  },
  {
    slug: 'how-to-convert-pdf-to-jpg',
    title: 'How to Convert PDF to JPG Online Free (Every Page, High Quality)',
    description: 'Convert every page of a PDF to a separate JPG image online. High resolution output, free, no signup, works on any device.',
    date: '2025-06-07',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
      { name: 'PDF to PNG', slug: 'pdf-to-png' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Convert PDF to JPG?

There are many reasons to convert a PDF page into an image:

- You need to share a single page on social media or in a message
- A website or form only accepts image uploads, not PDFs
- You want to embed a PDF page into a Word document or presentation
- You need a thumbnail or preview of a PDF document

Converting to JPG gives you a universal image format that opens on any device.

## How to Convert PDF to JPG on Breklo

1. Go to [Breklo's PDF to JPG converter](/pdf-to-jpg)
2. Upload your PDF file
3. Adjust the quality slider (default is 92% — excellent quality)
4. Click **Convert to JPG**
5. Each page downloads as a separate JPG file

A 5-page PDF produces 5 JPG files, one per page. For a single-page PDF you get one JPG.

## Choosing the Right Quality Setting

The quality slider controls the JPEG compression of the output images:

- **92% (default)** — excellent quality, suitable for printing and sharing
- **70–80%** — smaller file size, good for web use and emails
- **50–60%** — smallest file size, good for thumbnails and previews

The output resolution is 2x the original page size, so even at lower quality settings the images remain sharp.

## PDF to JPG vs PDF to PNG

Both formats work well for PDF conversion. The main difference:

| | JPG | PNG |
|---|---|---|
| File size | Smaller | Larger |
| Transparency | No | Yes |
| Best for | Photos, presentations | Graphics, diagrams |

For most PDFs, JPG is the better choice due to smaller file sizes. If your PDF has transparent elements or sharp graphics, use [PDF to PNG](/pdf-to-png) instead.

## What to Do With Your JPG Files

Once you have the JPG images, you can:

- [Compress the images](/compress-image) if you need even smaller file sizes
- [Convert them back to PDF](/jpg-to-pdf) after editing
- [Merge multiple images into one](/merge-images)
    `.trim(),
    faq: [
      { q: 'Does the PDF to JPG converter work on all PDFs?', a: 'Yes, including text PDFs, scanned PDFs, and image-heavy PDFs. Each page is rendered as a high-resolution JPG regardless of content.' },
      { q: 'What resolution are the output JPG files?', a: 'Pages are rendered at 2x scale, which typically produces images around 1700×2200 pixels for an A4 page — suitable for printing and high-quality sharing.' },
      { q: 'Can I convert just one page of a PDF to JPG?', a: 'Currently the tool converts all pages. To convert a single page, first use the Extract PDF Pages tool to pull out that page, then convert the single-page PDF to JPG.' },
      { q: 'How many pages can I convert at once?', a: 'There is no limit on the number of pages. Each page becomes a separate JPG file that downloads automatically.' },
      { q: 'Will text be sharp in the JPG output?', a: 'Yes. The 2x render scale ensures text remains crisp and readable in the output images.' },
      { q: 'Is PDF to JPG conversion free on Breklo?', a: 'Yes, completely free with no page limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-extract-audio-from-mp4',
    title: 'How to Extract Audio from MP4 Video (Convert MP4 to MP3 Free)',
    description: 'Extract the audio track from any MP4 video and save it as an MP3 file. Works in your browser, free, no software needed.',
    date: '2025-06-09',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
      { name: 'MP3 to WAV', slug: 'mp3-to-wav' },
    ],
    content: `
## Why Extract Audio from a Video?

There are many practical reasons to pull the audio from an MP4 file:

- Save a podcast, interview, or lecture as an MP3 to listen offline
- Extract the soundtrack from a music video
- Pull a voice recording from a video call
- Create an audio-only version of a tutorial for commuting
- Reduce file size — an MP3 is typically 10x smaller than the equivalent MP4

## How to Convert MP4 to MP3 on Breklo

1. Go to [Breklo's MP4 to MP3 converter](/mp4-to-mp3)
2. Upload your MP4 file (or drop it onto the page)
3. Choose your output bitrate (128kbps is standard, 320kbps is best quality)
4. Click **Convert to MP3**
5. Your MP3 file downloads in seconds

The tool also works with MOV, WebM and other video formats — not just MP4.

## Choosing the Right Bitrate

Bitrate controls the quality and file size of the output MP3:

| Bitrate | Quality | Best for |
|---|---|---|
| 96 kbps | Acceptable | Voice recordings, podcasts |
| 128 kbps | Good | General use, music |
| 192 kbps | Very good | Music, high-quality audio |
| 320 kbps | Excellent | Archiving, professional use |

For most purposes, 128kbps is the standard choice. If the source video has high-quality audio (like a music video), use 192 or 320kbps.

## MP3 vs WAV: Which Should You Use?

After extracting audio, you'll have an MP3 file. If you need to edit the audio in software like Audacity or Adobe Audition, consider converting to [WAV format](/mp3-to-wav) — WAV is uncompressed and gives editing software more to work with.

For just listening or sharing, MP3 is the better choice due to its small file size.

## What About Long Videos?

The browser-based converter works well for videos up to around 500 MB. For very large files (full movies, long recordings), it may take a minute or two to decode. The progress indicator will keep you updated.

## Other Ways to Use Your MP3

Once you have your MP3 file, you can:

- [Convert WAV files to MP3](/wav-to-mp3) to compress existing audio
- [Convert MP3 back to WAV](/mp3-to-wav) for editing
- Upload to podcast platforms, music services or cloud storage
    `.trim(),
    faq: [
      { q: 'Does MP4 to MP3 conversion work on any video file?', a: 'It works on any video format your browser can decode, which includes MP4, MOV, WebM, MKV and AVI in most modern browsers.' },
      { q: 'How long does MP4 to MP3 conversion take?', a: 'It depends on the file size and your device. A typical 100 MB MP4 takes 10–30 seconds. The browser decodes the audio track and re-encodes it as MP3 locally.' },
      { q: 'Will the audio quality be the same as the original?', a: 'The output quality is limited by the source audio. If the original MP4 had high-quality audio, choosing 192kbps or 320kbps will preserve it well.' },
      { q: 'Can I extract audio from a YouTube video?', a: 'Breklo only works with files you upload from your device. For YouTube audio, you would need to download the video first.' },
      { q: 'What bitrate should I use for music?', a: '192kbps or 320kbps is recommended for music. 128kbps is fine for voice recordings and podcasts.' },
      { q: 'Is there a file size limit for MP4 to MP3 conversion?', a: 'Breklo supports files up to 100 MB. For larger files, processing may be slower depending on your device.' },
    ],
  },
  {
    slug: 'how-to-compress-images-for-web',
    title: 'How to Compress Images for Web Without Losing Quality',
    description: 'Large images slow down websites. Learn how to compress JPG, PNG and WebP images for the web — free, online, no software needed.',
    date: '2025-06-11',
    category: 'Image Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
      { name: 'PNG to WebP', slug: 'png-to-webp' },
    ],
    content: `
## Why Image Compression Matters

Page speed is one of the most important factors in web performance. A single unoptimised image can add megabytes to a page load and significantly slow down your site.

Google uses page speed as a ranking factor. Faster pages rank higher, convert better, and provide a better experience on mobile.

The average image taken on a modern phone is 3–6 MB. For a web page, you want images under 200 KB — ideally under 100 KB for hero images.

## How Much Can You Compress an Image?

Here are typical results from canvas-based compression:

| Preset | Quality | Size reduction |
|---|---|---|
| Web | 70% | 60–75% smaller |
| Email | 60% | 70–80% smaller |
| Maximum | 45% | 80–90% smaller |

A 4 MB phone photo compressed on Web preset typically becomes 400–600 KB — still looks great on screen.

## How to Compress Images on Breklo

1. Go to [Breklo's Compress Image tool](/compress-image)
2. Drop your images onto the upload area (JPG, PNG, WebP, GIF)
3. Choose a preset: Web, Email, Maximum, or Custom
4. Click **Compress images**
5. Each compressed file downloads with a summary showing how much was saved

You can compress multiple images at once and see the total space saved.

## Which Format Is Best for Web?

| Format | Best for | Notes |
|---|---|---|
| JPG | Photos, hero images | Smallest size for photos |
| PNG | Logos, graphics with text | Supports transparency |
| WebP | Everything | 25–35% smaller than JPG/PNG |

WebP is the modern choice. Convert your JPGs to WebP with [JPG to WebP](/jpg-to-webp) and your PNGs with [PNG to WebP](/png-to-webp) for the best results.

## Tips for Web Image Optimisation

- **Resize before compressing** — if your image is 4000px wide and only displays at 800px, resize it first. Compression can't fix oversized dimensions.
- **Use WebP** — it's supported by all modern browsers and is significantly smaller than JPG or PNG.
- **Lazy load images** — this is a code-level change, but combined with compression it dramatically speeds up page loads.
- **Compress in bulk** — Breklo lets you drop multiple images at once, so you can compress an entire folder of images in one go.

## After Compression: Check the Result

Always compare the compressed image to the original before publishing. Open both side by side. For most web images at 70% quality, the difference is invisible at normal viewing distances.
    `.trim(),
    faq: [
      { q: 'What image formats can I compress on Breklo?', a: 'JPG, PNG, WebP and GIF are all supported. All formats are output as JPG after compression for maximum size reduction.' },
      { q: 'What is the difference between the compression presets?', a: 'Web (70% quality) is ideal for website use. Email (60%) produces smaller files for attachments. Maximum (45%) gives the smallest possible file for thumbnails or previews. Custom lets you set exact quality and maximum dimensions.' },
      { q: 'Does compressing an image reduce its dimensions?', a: 'Yes, if the image exceeds the maximum pixel size for the preset. Web preset limits images to 1200px on the longest side. You can also set a custom dimension in Custom mode.' },
      { q: 'Can I compress multiple images at once?', a: 'Yes. Drop as many images as you need onto the upload area. They all compress together and download with a summary of space saved.' },
      { q: 'What is WebP and should I use it?', a: 'WebP is a modern image format developed by Google. It produces images 25–35% smaller than JPG or PNG at the same quality. All modern browsers support it, making it the best choice for web images.' },
      { q: 'Will compressed images look different on a website?', a: 'At 70% quality, the difference from the original is generally invisible at screen resolution. Printed images may show slight softening at lower quality settings.' },
    ],
  },
  {
    slug: 'how-to-split-pdf-free',
    title: 'How to Split a PDF File Into Multiple Documents (Free Online)',
    description: 'Split a PDF into individual pages or extract a range of pages online for free. No software needed, works on any device.',
    date: '2025-06-13',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## When Do You Need to Split a PDF?

Splitting a PDF is useful in many situations:

- A large report needs to be split into chapters for distribution
- You received a combined document and need just one section
- You want to separate a multi-page scanned document into individual files
- You need to share only certain pages, not the entire document

There are two common split approaches: splitting every page into its own file, or extracting a specific range of pages.

## Split vs Extract: What's the Difference?

**Split all pages** — every page of the PDF becomes its own separate PDF file. A 10-page document becomes 10 individual PDFs.

**Extract page range** — you specify which pages you want (e.g. pages 3–7) and get back a single PDF containing just those pages. This is the most common use case.

For extracting specific pages, you can also use the dedicated [Extract PDF Pages tool](/extract-pdf-pages).

## How to Split a PDF on Breklo

1. Go to [Breklo's Split PDF tool](/split-pdf)
2. Upload your PDF file
3. Choose the split mode:
   - **Split all pages** — every page becomes a separate file
   - **Extract page range** — enter the pages you want (e.g. \`1,3,5-8\`)
4. Click **Split PDF**
5. Your files download automatically

For page ranges, use commas to separate individual pages and dashes for ranges. For example, \`1,3,5-8\` extracts pages 1, 3, 5, 6, 7 and 8.

## Splitting a Large PDF into Equal Parts

If you want to split a 100-page document into four 25-page sections, use the Extract page range option four times:
- Extract pages 1–25
- Extract pages 26–50
- Extract pages 51–75
- Extract pages 76–100

## What to Do After Splitting

After splitting, you may want to:

- [Compress the resulting PDFs](/compress-pdf) to reduce file sizes
- [Merge specific sections back together](/merge-pdf) in a different order
- [Delete unwanted pages](/delete-pdf-pages) from individual sections
    `.trim(),
    faq: [
      { q: 'How do I split a PDF into individual pages?', a: 'Use the Split all pages mode on Breklo\'s Split PDF tool. Each page of your PDF becomes a separate PDF file that downloads automatically.' },
      { q: 'Can I extract specific pages from a PDF?', a: 'Yes. Use the Extract page range mode and enter the pages you want, for example 2,4,6-10. You can also use the dedicated Extract PDF Pages tool for this.' },
      { q: 'Is there a page limit for splitting?', a: 'No. You can split PDFs of any length. There is no page limit.' },
      { q: 'Will splitting affect the quality of the PDF?', a: 'No. Splitting only separates pages — it does not re-render or recompress any content. Quality is preserved exactly.' },
      { q: 'Can I split a password-protected PDF?', a: 'Password-protected PDFs need to be unlocked before splitting.' },
      { q: 'How do I split a PDF on my phone?', a: 'Breklo works on any mobile browser. Open the Split PDF tool in Safari or Chrome on your phone, upload the PDF from your files app, and download the result.' },
    ],
  },
  {
    slug: 'how-to-convert-jpg-to-pdf',
    title: 'How to Convert JPG to PDF Online Free (Multiple Images to One PDF)',
    description: 'Convert one or multiple JPG images into a PDF document online. Combine photos into a single PDF, free, no signup required.',
    date: '2025-06-15',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
      { name: 'PNG to PDF', slug: 'png-to-pdf' },
      { name: 'Image to PDF', slug: 'image-to-pdf' },
    ],
    content: `
## Why Convert JPG to PDF?

Converting images to PDF has several practical advantages:

- **Single file** — combine multiple photos into one document instead of sending many image files
- **Print-ready** — PDFs preserve layout and print correctly on any printer
- **Universally accepted** — forms, applications, and professional documents typically require PDF
- **Smaller sharing burden** — one PDF attachment instead of 10 image files

## How to Convert JPG to PDF on Breklo

1. Go to [Breklo's JPG to PDF converter](/jpg-to-pdf)
2. Upload one or multiple JPG files
3. Reorder the images using the ↑ ↓ arrows if needed
4. Click **Convert to PDF**
5. Your PDF downloads immediately

Each JPG becomes one page in the PDF. The page dimensions match the image dimensions exactly.

## Converting Multiple JPGs to One PDF

Simply add all your JPG files to the upload area. Breklo will combine them into a single PDF in the order you arrange them. Use the arrows to reorder images before converting.

This is useful for:
- Scanned documents that were saved as separate image files
- A series of photos you want to share as a document
- Screenshots or diagrams for a report

## JPG to PDF vs Image to PDF

The [JPG to PDF tool](/jpg-to-pdf) accepts only JPEG files. If you have a mix of image formats (JPG + PNG + WebP), use the [Image to PDF tool](/image-to-pdf) instead, which accepts all common image formats.

## After Converting: Polish Your PDF

Once you have your PDF, you can:

- [Compress it](/compress-pdf) to reduce the file size
- [Rotate pages](/rotate-pdf) if any images are sideways
- [Reorder pages](/organize-pdf) if you want to rearrange the images
- [Merge it with another PDF](/merge-pdf) to combine with an existing document
    `.trim(),
    faq: [
      { q: 'Can I convert multiple JPG files to one PDF?', a: 'Yes. Add as many JPG files as you need. They will all be combined into a single PDF, one image per page, in the order you arrange them.' },
      { q: 'What size will the PDF pages be?', a: 'Each page matches the dimensions of the original image. A landscape photo becomes a landscape page; a portrait photo becomes a portrait page.' },
      { q: 'Can I combine JPG and PNG files into one PDF?', a: 'For mixed formats, use the Image to PDF tool, which accepts JPG, PNG, WebP and GIF all at once.' },
      { q: 'Will the image quality be preserved in the PDF?', a: 'Yes. The images are embedded directly into the PDF without re-compression. Quality is preserved exactly.' },
      { q: 'How do I make the pages A4 size?', a: 'Use the Image to PDF tool, which has an option to fit images to A4 pages rather than using the original image dimensions.' },
      { q: 'Can I convert a JPG to PDF on my phone?', a: 'Yes. Breklo works in any mobile browser. Open the tool, upload from your photos app, and download the PDF.' },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) || null;
}

export function getAllSlugs() {
  return posts.map(p => p.slug);
}
