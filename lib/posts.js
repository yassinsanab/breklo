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
  {
    slug: 'how-to-rotate-pdf',
    title: 'How to Rotate a PDF Online Free (Fix Sideways or Upside-Down Pages)',
    description: 'Fix sideways or upside-down pages in a PDF instantly. Rotate all pages 90, 180 or 270 degrees online for free — no software needed.',
    date: '2025-06-17',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Rotate PDF', slug: 'rotate-pdf' },
      { name: 'Organize PDF', slug: 'organize-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Why PDF Pages End Up Sideways

Rotated PDF pages are a common problem. They usually happen when:

- A document was scanned in the wrong orientation
- Pages were exported from a presentation or spreadsheet in landscape
- A mix of portrait and landscape pages ended up in the same PDF
- Someone created the PDF from a photo taken sideways

Whatever the cause, fixing it takes seconds online.

## How to Rotate a PDF on Breklo

1. Go to [Breklo's Rotate PDF tool](/rotate-pdf)
2. Upload your PDF file
3. Choose the rotation angle: 90°, 180° or 270°
4. Click **Rotate**
5. Your corrected PDF downloads automatically

All pages rotate together. If only some pages need rotating, use the [Organize PDF tool](/organize-pdf) for per-page control.

## Which Angle Do I Need?

- **90° clockwise** — for pages that are rotated 90° to the left
- **180°** — for pages that are completely upside down
- **270° (or 90° counter-clockwise)** — for pages rotated 90° to the right

If you are unsure, try 90° first. If it is still wrong, apply another 90° rotation.

## Rotating a PDF on Mac Without Software

On Mac, open the PDF in **Preview**, press **Cmd+A** to select all pages in the thumbnail view, then go to **Tools → Rotate Left** or **Rotate Right**. Save with **Cmd+S**.

## Rotating a PDF on Windows Without Software

Windows has no built-in PDF rotation tool. The easiest option is to use a free online tool like Breklo. No installation required.

## After Rotating: Check the Result

Open the downloaded PDF to confirm all pages are in the correct orientation before sharing or printing. If only some pages are correct, you may need to merge the rotated and original sections using [Merge PDF](/merge-pdf).
    `.trim(),
    faq: [
      { q: 'Can I rotate only some pages in a PDF?', a: 'The Rotate PDF tool rotates all pages at once. To rotate individual pages differently, use the Organize PDF tool which gives per-page control.' },
      { q: 'Will rotating a PDF affect the text or images?', a: 'No. Rotating is a non-destructive operation. All text, images and formatting are preserved exactly — only the orientation changes.' },
      { q: 'What rotation angles are available?', a: 'You can rotate by 90°, 180° or 270°. Applying 90° twice gives 180°, and three times gives 270°.' },
      { q: 'Can I rotate a scanned PDF?', a: 'Yes. Scanned PDFs are images embedded in PDF pages, and the rotation works the same way.' },
      { q: 'Is there a file size limit?', a: 'Up to 100 MB. All processing happens in your browser with no server upload.' },
      { q: 'How do I rotate a PDF on my iPhone?', a: 'Open Breklo in Safari on your iPhone, upload the PDF from Files, choose the rotation angle, and download the result.' },
    ],
  },
  {
    slug: 'how-to-password-protect-pdf',
    title: 'How to Password Protect a PDF File (Free, No Software)',
    description: 'Add a password to any PDF file to prevent unauthorized access. Free online tool — no software installation, no signup required.',
    date: '2025-06-19',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Password Protect PDF', slug: 'password-protect-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## When Should You Password Protect a PDF?

Not every PDF needs a password, but some situations call for it:

- Sending a contract, invoice or legal document by email
- Sharing a confidential report with limited recipients
- Protecting personal documents like tax returns or medical records
- Preventing clients from editing or copying the content

A password ensures only people you share the password with can open the file.

## How to Password Protect a PDF on Breklo

1. Go to [Breklo's Password Protect PDF tool](/password-protect-pdf)
2. Upload your PDF
3. Enter a password (minimum 4 characters — use a strong one)
4. Confirm the password
5. Click **Protect PDF**
6. Your protected PDF downloads immediately

The password is never sent to any server. All encryption happens in your browser.

## Choosing a Strong PDF Password

A strong password should:

- Be at least 8 characters long
- Include a mix of letters, numbers and symbols
- Not be a word found in a dictionary
- Be different from passwords you use elsewhere

Avoid obvious choices like "1234", "password" or the recipient's name.

## What Does PDF Password Protection Restrict?

When you add a password with Breklo, the PDF:

- Cannot be opened without the password
- Cannot be edited or modified
- Cannot have content copied from it
- Can still be printed (printing permissions remain enabled)

## How to Remove a PDF Password

If you need to remove a password you added, use a PDF password remover tool. You will need the original password to unlock it.

## Password Protecting a PDF on Mac

On Mac, open the PDF in **Preview**, go to **File → Export as PDF**, check **Encrypt**, and enter a password. This works the same way as Breklo but requires macOS.

## Password Protecting a PDF on Windows

Windows does not have a built-in PDF password tool. Use Breklo online — it is free and requires no installation.
    `.trim(),
    faq: [
      { q: 'How strong is the PDF encryption Breklo uses?', a: 'Breklo uses 128-bit AES encryption, the standard for PDF security and sufficient for most business and personal use cases.' },
      { q: 'Can I remove the password later?', a: 'Yes, using a PDF password remover tool — you will need the original password to unlock it.' },
      { q: 'Is my PDF uploaded to a server when I add a password?', a: 'No. All encryption happens entirely in your browser. Your file and password never leave your device.' },
      { q: 'What is the minimum password length?', a: 'A minimum of 4 characters is required. We strongly recommend using at least 8 characters with a mix of letters, numbers and symbols.' },
      { q: 'Can the recipient open the PDF on any device?', a: 'Yes. Any standard PDF reader (Adobe Acrobat, Preview on Mac, Chrome, etc.) will prompt for the password and open the file correctly.' },
      { q: 'Does password protection prevent printing?', a: 'No. Printing is allowed by default. The password prevents opening, editing and copying content.' },
    ],
  },
  {
    slug: 'how-to-convert-png-to-webp',
    title: 'How to Convert PNG to WebP Online Free (Smaller Files, Same Quality)',
    description: 'Convert PNG images to WebP format for up to 80% smaller file sizes. Free online converter — no signup, works on any device.',
    date: '2025-06-21',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'PNG to WebP', slug: 'png-to-webp' },
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Convert PNG to WebP?

PNG is excellent for quality but produces large files. WebP is a modern image format developed by Google that achieves:

- **50–80% smaller file sizes** than PNG at the same visual quality
- **Transparency support** — unlike JPG, WebP preserves transparent backgrounds
- **Universal browser support** — Chrome, Firefox, Safari, Edge and all modern mobile browsers

If your PNG images are used on a website, converting to WebP is one of the easiest ways to speed up your pages.

## How to Convert PNG to WebP on Breklo

1. Go to [Breklo's PNG to WebP converter](/png-to-webp)
2. Drop your PNG files onto the upload area
3. Adjust the quality slider if needed (default 92% is excellent)
4. Click **Convert**
5. Your WebP files download immediately

You can convert multiple PNG files at once.

## PNG vs WebP vs JPG: Which to Use?

| Format | Transparency | File size | Best for |
|---|---|---|---|
| PNG | Yes | Large | Logos, graphics, screenshots |
| JPG | No | Medium | Photos, hero images |
| WebP | Yes | Small | Everything — especially web |

For web images, WebP is the clear winner. It is smaller than both PNG and JPG while supporting transparency.

## Does WebP Work Everywhere?

Yes — for web use. All modern browsers have supported WebP since 2020 including Safari on iPhone. The only exception is very old browsers (IE11) and some older image editors.

For documents and print, PNG or JPG are safer choices since not all software supports WebP yet.

## How to Use WebP on Your Website

If you are using WordPress, the **WebP Express** or **Smush** plugins convert and serve WebP automatically. For custom sites, the HTML picture element lets you serve WebP with a JPG fallback:

\`\`\`html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`
    `.trim(),
    faq: [
      { q: 'Does WebP support transparency like PNG?', a: 'Yes. Unlike JPG, WebP supports transparency. Transparent areas in your PNG will be preserved in the WebP output.' },
      { q: 'How much smaller will my WebP files be?', a: 'Typically 50–80% smaller than equivalent PNGs at the same visual quality, making it ideal for web use.' },
      { q: 'Is WebP supported on iPhone and Safari?', a: 'Yes. Safari has supported WebP since version 14 (2020) on both iPhone and Mac. All modern iOS and macOS devices handle it natively.' },
      { q: 'Can I convert multiple PNG files to WebP at once?', a: 'Yes. Drop multiple PNG files onto the upload area and they all convert together.' },
      { q: 'Will the image dimensions change when converting to WebP?', a: 'No. The dimensions are preserved exactly. Only the format and file size change.' },
      { q: 'Is the conversion free?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-convert-wav-to-mp3',
    title: 'How to Convert WAV to MP3 Online Free (Reduce Audio File Size by 90%)',
    description: 'Convert large WAV audio files to compact MP3 format online for free. Choose your bitrate, no signup required, works in any browser.',
    date: '2025-06-23',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
      { name: 'MP3 to WAV', slug: 'mp3-to-wav' },
    ],
    content: `
## Why WAV Files Are So Large

WAV is an uncompressed audio format. A 3-minute stereo WAV file at 44.1kHz takes up around 30–50 MB. That is fine for professional audio editing but impractical for sharing, streaming or storing large libraries.

MP3 uses perceptual audio compression to remove frequencies the human ear barely detects. A 3-minute MP3 at 192kbps is roughly 4–5 MB — a 90% reduction with virtually no audible difference.

## How to Convert WAV to MP3 on Breklo

1. Go to [Breklo's WAV to MP3 converter](/wav-to-mp3)
2. Upload your WAV file
3. Choose the output bitrate (192kbps recommended for music)
4. Click **Convert to MP3**
5. Your MP3 downloads in seconds

The tool shows you the before and after file sizes so you can see exactly how much space you saved.

## Which Bitrate Should I Use?

| Bitrate | File size (3 min) | Best for |
|---|---|---|
| 96 kbps | ~2 MB | Voice recordings, podcasts |
| 128 kbps | ~3 MB | General use, casual listening |
| 192 kbps | ~4 MB | Music, good quality |
| 320 kbps | ~7 MB | Best quality, archiving |

For music converted from WAV, 192kbps is the sweet spot — good quality and much smaller than WAV. For voice recordings like podcasts or meetings, 128kbps is more than enough.

## WAV vs MP3: When to Use Each

**Use WAV when:**
- Recording or editing audio in professional software
- Archiving master recordings
- Working in a studio environment

**Use MP3 when:**
- Sharing audio by email or message
- Uploading to podcast platforms or streaming services
- Building a music library for everyday listening

## Converting WAV to MP3 on Mac

macOS has iTunes/Music app which can convert WAV to MP3. Go to **Preferences → Files → Import Settings**, choose MP3, then right-click any WAV file and select **Create MP3 Version**.

Alternatively, Breklo does this in your browser with no software needed.
    `.trim(),
    faq: [
      { q: 'How much smaller will my MP3 be compared to WAV?', a: 'Typically 80–90% smaller. A 50 MB WAV file at 3 minutes becomes roughly 4–5 MB at 192kbps MP3.' },
      { q: 'Will the audio sound different after conversion?', a: 'At 192kbps or 320kbps, the difference from WAV is inaudible to most listeners. MP3 removes only frequencies the human ear struggles to detect.' },
      { q: 'What bitrate is best for converting music from WAV?', a: '192kbps gives an excellent balance of quality and file size for music. Use 320kbps if you want maximum quality for archiving.' },
      { q: 'Is there a file size limit for WAV files?', a: 'Up to 100 MB. WAV files are large, so 100 MB is roughly 10 minutes of stereo audio at 44.1kHz.' },
      { q: 'Can I convert multiple WAV files at once?', a: 'Currently the tool converts one file at a time. Batch conversion is coming in a future update.' },
      { q: 'Is my audio file safe?', a: 'Yes. All conversion happens in your browser using the Web Audio API. Your file never leaves your device.' },
    ],
  },
  {
    slug: 'how-to-delete-pages-from-pdf',
    title: 'How to Delete Pages from a PDF Online Free',
    description: 'Remove unwanted pages from any PDF file online. Enter the page numbers to delete and download the cleaned-up PDF — free, no signup.',
    date: '2025-06-25',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Delete PDF Pages', slug: 'delete-pdf-pages' },
      { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
      { name: 'Organize PDF', slug: 'organize-pdf' },
    ],
    content: `
## Why Delete Pages from a PDF?

Removing pages from a PDF is one of the most common document tasks:

- Remove a cover page before forwarding a report
- Delete blank or filler pages from a scanned document
- Remove confidential appendices before sharing
- Clean up a merged PDF that has duplicate pages

It takes seconds online — no PDF editor needed.

## How to Delete PDF Pages on Breklo

1. Go to [Breklo's Delete PDF Pages tool](/delete-pdf-pages)
2. Upload your PDF
3. Enter the page numbers you want to delete (e.g. \`1, 3, 5-8\`)
4. Click **Delete Pages**
5. Your PDF with those pages removed downloads immediately

Use commas to separate individual pages and dashes for ranges. For example, \`2,4,6-10\` deletes pages 2, 4 and pages 6 through 10.

## Delete vs Extract: What Is the Difference?

Both tools let you work with specific pages:

- **Delete pages** — you specify which pages to remove. Everything else is kept.
- **Extract pages** — you specify which pages to keep. Everything else is removed.

For removing a few pages from a large document, Delete is faster. For keeping a few pages from a large document, [Extract](/extract-pdf-pages) is more convenient.

## Deleting Pages on Mac Without Software

On Mac, open the PDF in Preview. Go to **View → Thumbnails**, click on the page you want to delete, and press the **Delete** key. Save with **Cmd+S**.

## Deleting Pages on Windows Without Software

Windows has no built-in tool for deleting PDF pages. Use Breklo online — no installation needed.

## After Deleting: Compress the Result

If your original PDF was large, [compressing it](/compress-pdf) after deleting pages can reduce the file size further, since the removed pages may have left orphaned data in the file.
    `.trim(),
    faq: [
      { q: 'How do I delete a single page from a PDF?', a: 'Enter just the page number in the pages field. For example, entering "3" deletes only page 3 and keeps all other pages.' },
      { q: 'Can I delete multiple non-consecutive pages?', a: 'Yes. Enter comma-separated pages: "2,5,8" deletes pages 2, 5 and 8. Use dashes for ranges: "3-7" deletes pages 3 through 7.' },
      { q: 'Is the original PDF modified?', a: 'No. A new PDF is created and downloaded. Your original file is never changed.' },
      { q: 'What is the difference between deleting and extracting pages?', a: 'Delete removes the pages you specify and keeps everything else. Extract keeps the pages you specify and removes everything else.' },
      { q: 'Can I delete all pages?', a: 'No. The tool prevents deleting all pages since the result would be an empty, invalid PDF.' },
      { q: 'Is there a file size limit?', a: 'Up to 100 MB. All processing happens in your browser with no server upload.' },
    ],
  },
  {
    slug: 'how-to-convert-jpg-to-png',
    title: 'How to Convert JPG to PNG Online Free (Lossless, No Watermark)',
    description: 'Convert JPG images to lossless PNG format online for free. No watermark, no signup, instant download — works on any device.',
    date: '2025-06-27',
    category: 'Image Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'JPG to PNG', slug: 'jpg-to-png' },
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## When Should You Convert JPG to PNG?

JPG uses lossy compression — every time you save a JPG, it loses a tiny bit of quality. PNG is lossless, meaning no quality is lost when saving.

Convert JPG to PNG when:

- You need to edit the image and resave it multiple times (PNG prevents quality degradation)
- You need a transparent background (JPG does not support transparency)
- You are working with logos, icons or text-heavy images where sharpness matters
- You need to hand the image off for further design work

## How to Convert JPG to PNG on Breklo

1. Go to [Breklo's JPG to PNG converter](/jpg-to-png)
2. Drop your JPG files onto the upload area
3. Click **Convert**
4. Your PNG files download immediately

You can convert multiple JPG files at once.

## Will Converting JPG to PNG Improve Quality?

No — and this is a common misconception. The quality of the original JPG cannot be recovered. What PNG does is prevent further quality loss. Think of it like this:

- JPG → PNG = same quality, larger file, lossless going forward
- PNG → JPG = quality loss, smaller file

If you want to edit an image extensively and keep it sharp, convert to PNG first, do your editing, then convert to JPG only for final output.

## JPG to PNG File Size

PNG files are typically 3–5 times larger than the equivalent JPG. This is the trade-off for lossless compression. If file size matters, stick with JPG. If quality matters more, use PNG.

## Converting JPG to PNG on Windows

Right-click the JPG file → Open with → Paint → File → Save as → PNG. This works but uses the basic Windows image editor.

For better quality control and batch conversion, Breklo's online tool is faster and easier.
    `.trim(),
    faq: [
      { q: 'Does converting JPG to PNG improve image quality?', a: 'No. The quality of the original JPG is preserved but not improved. PNG prevents further quality loss in future edits, but cannot recover what JPG compression already removed.' },
      { q: 'Why are PNG files larger than JPG files?', a: 'PNG uses lossless compression which preserves every pixel exactly. JPG uses lossy compression which discards some data to achieve smaller files.' },
      { q: 'Can I add a transparent background when converting JPG to PNG?', a: 'No. The JPG background colour (usually white) will remain in the PNG. Removing backgrounds requires a background remover tool.' },
      { q: 'Can I convert multiple JPG files to PNG at once?', a: 'Yes. Drop multiple files and they all convert together with no quality loss.' },
      { q: 'Is there a file size limit?', a: 'Up to 100 MB per file. All processing happens in your browser.' },
      { q: 'Is the conversion completely free?', a: 'Yes. No signup, no watermark, no limits. Just upload and download.' },
    ],
  },
  {
    slug: 'best-free-pdf-tools-online',
    title: 'Best Free Online PDF Tools in 2025 (No Signup, No Watermark)',
    description: 'A roundup of the best free online PDF tools in 2025. Compress, merge, split, convert and edit PDFs without paying or signing up.',
    date: '2025-06-29',
    category: 'PDF Tools',
    readTime: '6 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
    ],
    content: `
## What to Look for in a Free PDF Tool

Not all free PDF tools are actually free. Many:

- Add watermarks to your documents
- Require you to create an account
- Limit you to a few files per day
- Upload your files to servers you cannot control

The best free PDF tools process your files in the browser (so nothing is uploaded), require no account, and add no watermarks. Here is what to look for:

- **Browser-based processing** — your files never leave your device
- **No daily limits** — use it as often as you need
- **No watermark** — especially important for professional documents
- **No signup required** — just upload and go

## The Most Useful Free PDF Tools

### Compress PDF

Compressing a PDF before sending it by email is one of the most common tasks. Look for a tool that offers multiple compression levels — basic structural optimisation for text PDFs, and image re-rendering for scanned documents.

[Try Compress PDF on Breklo →](/compress-pdf)

### Merge PDF

Combining multiple PDFs into one is essential for creating reports, proposals and application packs. The best merge tools let you reorder files before combining.

[Try Merge PDF on Breklo →](/merge-pdf)

### Split PDF

Whether you need to extract one page or split a 100-page document into chapters, a good split tool should support both page ranges and full splits.

[Try Split PDF on Breklo →](/split-pdf)

### PDF to JPG

Converting PDF pages to images is needed for social sharing, embedding in presentations, or creating previews. Look for high-resolution output (2x scale minimum).

[Try PDF to JPG on Breklo →](/pdf-to-jpg)

### Password Protect PDF

Adding a password to sensitive documents before sending them is good practice. Ensure the tool uses proper encryption (128-bit AES minimum) and does not upload your file.

[Try Password Protect PDF on Breklo →](/password-protect-pdf)

## What About Adobe Acrobat?

Adobe Acrobat is the gold standard for PDF editing but costs $19.99/month. For the most common tasks — compress, merge, split, convert — free browser-based tools do the job just as well at zero cost.

Acrobat is worth paying for if you need advanced features: filling forms, OCR on scanned documents, editing text directly in a PDF, or managing large document workflows.

## What About Smallpdf and ilovepdf?

Both are well-known and reliable. The main downsides: they upload your files to their servers, have daily free limits, and push you towards paid plans aggressively.

If privacy matters or you process files regularly, a browser-based tool that keeps everything local is a better choice.

## The Verdict

For everyday PDF tasks, free browser-based tools cover everything most people need. The key is finding one that does not watermark, does not require a signup, and does not upload your files.

[Breklo offers all 26 tools free](/), processes everything in your browser, and requires no account.
    `.trim(),
    faq: [
      { q: 'Are free online PDF tools safe to use?', a: 'It depends on the tool. Browser-based tools that process files locally (like Breklo) are safe since your files never leave your device. Tools that upload files to servers carry more risk — check their privacy policy.' },
      { q: 'Do free PDF tools add watermarks?', a: 'Some do, especially for large files or after a free usage limit. Breklo does not add watermarks on any tool.' },
      { q: 'What is the best free PDF compressor?', a: 'A good PDF compressor should offer multiple compression levels (lossless for text PDFs, re-render mode for scanned PDFs) and show you exactly how much space was saved.' },
      { q: 'Can I use free PDF tools for business documents?', a: 'Yes, provided the tool does not upload your files to external servers. Browser-based tools that process files locally are suitable for confidential business documents.' },
      { q: 'Is there a free alternative to Adobe Acrobat?', a: 'For common tasks like compressing, merging, splitting and converting PDFs, free browser-based tools are a complete alternative. Adobe Acrobat is only necessary for advanced editing, OCR or complex form workflows.' },
      { q: 'Do I need to install software to use online PDF tools?', a: 'No. Good online PDF tools run entirely in your browser with no download or installation required.' },
    ],
  },
  {
    slug: 'how-to-extract-pages-from-pdf',
    title: 'How to Extract Pages from a PDF (Free Online, Any Device)',
    description: 'Extract specific pages from a PDF and save them as a new document. Enter page numbers or ranges — free, no software, no signup.',
    date: '2025-07-01',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Delete PDF Pages', slug: 'delete-pdf-pages' },
    ],
    content: `
## Why Extract Specific Pages from a PDF?

Extracting pages is useful in many situations:

- You received a 50-page report and only need pages 12–18
- You want to share one chapter from a combined document
- You need to separate a signature page from a contract
- You want to pull specific slides from a PDF presentation

Instead of deleting everything you do not need, extract exactly what you want.

## How to Extract PDF Pages on Breklo

1. Go to [Breklo's Extract PDF Pages tool](/extract-pdf-pages)
2. Upload your PDF
3. Enter the pages you want to extract (e.g. \`1, 4, 7-12\`)
4. Click **Extract Pages**
5. A new PDF containing only those pages downloads immediately

**Page range syntax:**
- \`3\` — extracts just page 3
- \`1,5,9\` — extracts pages 1, 5 and 9
- \`3-8\` — extracts pages 3 through 8
- \`1,4,7-10\` — extracts pages 1, 4 and 7 through 10

## Extract vs Delete vs Split

All three tools work with specific pages, but differently:

| Tool | What it does |
|---|---|
| **Extract pages** | Keep specified pages, discard the rest |
| **Delete pages** | Remove specified pages, keep the rest |
| **Split PDF** | Split every page into its own file, or extract a range |

Extract is the most direct tool when you know exactly which pages you need.

## Extracting Pages on Mac Without Software

In Preview on Mac, open the PDF in thumbnail view (**View → Thumbnails**), hold **Cmd** and click the pages you want, then drag them to the desktop or use **File → Export as PDF** to save just the selected pages.

## Extracting Pages on Windows

Windows has no built-in page extraction tool. Use Breklo — it works in any browser with no installation.

## After Extracting: What to Do Next

Once you have your extracted pages, you can:

- [Compress the result](/compress-pdf) to reduce file size
- [Merge with other documents](/merge-pdf) to build a new combined PDF
- [Rotate pages](/rotate-pdf) if any are in the wrong orientation
    `.trim(),
    faq: [
      { q: 'How do I extract a single page from a PDF?', a: 'Enter just the page number in the pages field. For example, "5" extracts only page 5 as a new single-page PDF.' },
      { q: 'Can I extract non-consecutive pages?', a: 'Yes. Use comma-separated page numbers: "1,4,7" extracts pages 1, 4 and 7 into one new PDF.' },
      { q: 'Will the extracted pages keep their original quality?', a: 'Yes. Pages are copied directly without re-rendering. All text, images and formatting are preserved exactly.' },
      { q: 'What is the difference between extracting and splitting?', a: 'Extracting creates one new PDF with your chosen pages. Splitting can create individual files for every page, or also extract a range.' },
      { q: 'Is there a page limit?', a: 'No. You can extract pages from PDFs of any length.' },
      { q: 'Can I extract pages from a password-protected PDF?', a: 'The PDF needs to be unlocked first. Remove the password, then extract the pages you need.' },
    ],
  },
  {
    slug: 'how-to-merge-images-into-one',
    title: 'How to Merge Multiple Images into One (Free Online Tool)',
    description: 'Combine multiple images into one by stacking them vertically or side by side. Supports JPG, PNG and WebP — free, no signup.',
    date: '2025-07-03',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Merge Images', slug: 'merge-images' },
      { name: 'Image to PDF', slug: 'image-to-pdf' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Merge Multiple Images?

Combining images into one is a common need across many use cases:

- Create a before/after comparison image
- Combine product photos into a single catalogue image
- Stitch screenshots into one long image for documentation
- Combine charts or graphs into a single infographic
- Create a photo collage for social media

Instead of paying for photo editing software, you can do this for free in your browser.

## How to Merge Images on Breklo

1. Go to [Breklo's Merge Images tool](/merge-images)
2. Upload two or more images (JPG, PNG, WebP or GIF)
3. Reorder images using the ↑ ↓ arrows
4. Choose layout: **Vertical** (stacked top to bottom) or **Horizontal** (side by side)
5. Set the gap between images and background colour
6. Choose output format: JPG, PNG or WebP
7. Click **Merge images**
8. Your combined image downloads immediately

## Vertical vs Horizontal Layout

**Vertical stacking** — images are placed one on top of another. The canvas width matches the widest image. Narrower images are centred. Best for:
- Before/after comparisons
- Step-by-step sequences
- Long scrollable screenshots

**Horizontal layout** — images are placed side by side. The canvas height matches the tallest image. Shorter images are centred. Best for:
- Side-by-side comparisons
- Product colour variants
- Multi-panel graphics

## Choosing the Output Format

- **JPG** — smallest file size, good for photos
- **PNG** — larger files but lossless, preserves transparency
- **WebP** — smallest file size with transparency support, best for web

If any of your source images have transparent backgrounds and you want to keep that transparency, choose PNG or WebP output.

## Tips for Clean Results

- Use images with similar dimensions for the best-looking results
- Add a small gap (16–32px) between images for a cleaner look
- Use a white or neutral background colour unless you want a coloured border between images
- For social media, use the horizontal layout with two images for comparison posts
    `.trim(),
    faq: [
      { q: 'What image formats can I merge?', a: 'JPG, PNG, WebP and GIF are all supported. You can mix different formats in one merge operation.' },
      { q: 'Is there a limit on how many images I can merge?', a: 'No. You can merge as many images as needed. For very large or high-resolution images, processing may take a few seconds.' },
      { q: 'Can I control the spacing between images?', a: 'Yes. Use the gap slider to add spacing in pixels between images. The gap is filled with your chosen background colour.' },
      { q: 'What output formats are available?', a: 'JPG, PNG or WebP. Choose PNG or WebP if you need to preserve transparency in the merged image.' },
      { q: 'Can I merge images with different sizes?', a: 'Yes. Images of different sizes are automatically centred within the canvas. The canvas width (for vertical) or height (for horizontal) matches the largest image.' },
      { q: 'Is there a file size limit per image?', a: 'Up to 100 MB per image. All processing happens in your browser.' },
    ],
  },
  {
    slug: 'how-to-convert-pdf-to-word',
    title: 'How to Convert PDF to Word Online (Free Methods That Actually Work)',
    description: 'Convert PDF files to editable Word documents online. Free methods including browser tools, Google Docs and Microsoft Word — step by step.',
    date: '2025-07-05',
    category: 'PDF Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'PDF to Text', slug: 'pdf-to-text' },
      { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    content: `
## Why PDF to Word Is Tricky

Converting PDF to Word is one of the most requested document tasks — and one of the hardest to do well. The reason: PDF is a fixed-layout format. It stores a document as a precise arrangement of text, images and graphics on a page, not as a structured editable document.

Converting back to Word requires reverse-engineering that layout, which often results in formatting issues. The better the original PDF was structured, the better the conversion.

## Method 1: Google Docs (Free, No Signup Required)

Google Docs can open PDFs and convert them to editable documents automatically.

1. Go to **drive.google.com**
2. Click **New → File upload** and upload your PDF
3. Once uploaded, right-click the file → **Open with → Google Docs**
4. Google Docs converts it automatically
5. Go to **File → Download → Microsoft Word (.docx)**

Best for: text-heavy PDFs like reports, articles and contracts. Formatting may shift but the text is fully editable.

## Method 2: Microsoft Word (If You Have Office)

Word 2013 and later can open PDFs directly.

1. Open Word
2. Go to **File → Open** and select your PDF
3. Word will warn that it is converting the PDF
4. Click **OK** and the PDF opens as an editable document
5. Save as .docx

Best for: simple PDFs. Complex layouts often do not convert cleanly.

## Method 3: Extract the Text (Free, Always Works)

If you just need the text content — not the formatting — use [Breklo's PDF to Text tool](/pdf-to-text). It extracts all text from every page instantly, which you can then paste into a Word document and reformat.

1. Go to [PDF to Text](/pdf-to-text)
2. Upload your PDF
3. Copy the extracted text or download as .txt
4. Paste into a Word document and reformat

Best for: when you need the content but not the original layout.

## When None of These Work: Scanned PDFs

If your PDF was created by scanning a physical document, it is an image — not text. None of the above methods will extract editable text from it. You need OCR (Optical Character Recognition) software.

Free OCR options:
- **Google Drive** — upload the scanned PDF and open with Google Docs (it runs OCR automatically)
- **Adobe Acrobat online** — free OCR for one document per month

## Tips for Better Conversion Results

- Simple, single-column PDFs convert much better than complex multi-column layouts
- PDFs created from Word (not scanned) convert more cleanly
- After conversion, always check headings, bullet points and tables — these often need manual cleanup
    `.trim(),
    faq: [
      { q: 'Can I convert a scanned PDF to Word for free?', a: 'Yes, using Google Drive. Upload the scanned PDF, open it with Google Docs, and Google runs OCR automatically. The accuracy depends on the scan quality.' },
      { q: 'Why does my converted Word document look wrong?', a: 'PDF is a fixed-layout format not designed for conversion. Complex layouts with multiple columns, tables and images often lose formatting during conversion. Simple text-heavy PDFs convert much more cleanly.' },
      { q: 'Does Breklo have a PDF to Word converter?', a: 'PDF to Word conversion requires server-side processing (LibreOffice) which is coming in a future update. Currently, Breklo offers PDF to Text for extracting all text content instantly.' },
      { q: 'Is Google Docs PDF to Word conversion accurate?', a: 'For text content, accuracy is very high. Formatting — especially complex layouts, tables and special fonts — may not convert perfectly.' },
      { q: 'What is the difference between PDF to Word and PDF to Text?', a: 'PDF to Word attempts to recreate the document structure with formatting. PDF to Text extracts just the raw text content with no formatting — simpler but always reliable.' },
      { q: 'Can I convert a password-protected PDF to Word?', a: 'You need to remove the password first, then convert the unlocked PDF.' },
    ],
  },
  {
    slug: 'how-to-convert-gif-to-jpg',
    title: 'How to Convert GIF to JPG Online Free (Any Device)',
    description: 'Convert GIF images to JPG format online for free. Extract frames from animated GIFs as high-quality JPG images — no software needed.',
    date: '2025-07-07',
    category: 'Image Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'GIF to JPG', slug: 'gif-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'JPG to PNG', slug: 'jpg-to-png' },
    ],
    content: `
## Why Convert GIF to JPG?

GIF is an old format with serious limitations: it only supports 256 colours and creates large files for anything beyond simple animations. Converting a GIF frame to JPG gives you a full-colour image that is compatible with everything.

Common reasons to convert:

- Extract a still frame from an animated GIF to use as a photo
- Reduce file size — a JPG is typically much smaller than a GIF
- Share on platforms that display GIFs poorly or not at all
- Use the image in a document or presentation

## How to Convert GIF to JPG on Breklo

1. Go to [Breklo's GIF to JPG converter](/gif-to-jpg)
2. Drop your GIF files onto the upload area
3. Adjust the output quality if needed (92% is excellent)
4. Click **Convert to JPG**
5. Your JPG files download immediately

For animated GIFs, the tool extracts the first frame. You can convert multiple GIF files at once.

## GIF vs JPG: What Is the Difference?

| | GIF | JPG |
|---|---|---|
| Colours | 256 max | 16.7 million |
| Animation | Yes | No |
| File size | Large for photos | Small |
| Transparency | 1-bit (on/off) | No |
| Best for | Simple animations | Photos, realistic images |

For photos and complex images, JPG is far superior. GIF was designed for simple icons and animations, not photography.

## What About Animated GIFs?

When you convert an animated GIF to JPG, only the first frame is captured. If you need to extract a specific frame, you would need a dedicated GIF frame extractor first.

If you want a small, high-quality image from your GIF, extracting the first frame as JPG is the fastest approach.

## After Converting: Compress Your JPG

If the resulting JPG is still larger than you want, run it through [Compress Image](/compress-image) to reduce the file size further without significant quality loss.
    `.trim(),
    faq: [
      { q: 'Does the GIF to JPG converter work on animated GIFs?', a: 'Yes. The converter extracts the first frame of the animated GIF and saves it as a JPG image.' },
      { q: 'Why is my converted JPG larger than the GIF?', a: 'GIF uses lossless compression with a limited 256-colour palette, while JPG stores full 16 million colours. For complex images, JPG can be larger at maximum quality — reduce the quality slider to bring the size down.' },
      { q: 'Can I convert multiple GIF files at once?', a: 'Yes. Drop multiple GIF files onto the upload area and they all convert together.' },
      { q: 'Will the GIF background colour be preserved?', a: 'Yes. The background colour of the GIF frame is preserved in the JPG output. Transparent areas in the GIF are filled with white.' },
      { q: 'Is the conversion free?', a: 'Yes, completely free with no limits and no signup required.' },
      { q: 'Can I convert GIF to PNG instead of JPG?', a: 'Use the PNG to JPG or image converter tools for other format combinations. For GIF with transparency, PNG preserves the transparent areas better than JPG.' },
    ],
  },
  {
    slug: 'how-to-convert-svg-to-jpg',
    title: 'How to Convert SVG to JPG Online Free (High Resolution)',
    description: 'Convert SVG vector graphics to JPG images online. Choose output scale and background colour — free, no software needed.',
    date: '2025-07-09',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'SVG to JPG', slug: 'svg-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'PNG to WebP', slug: 'png-to-webp' },
    ],
    content: `
## What Is an SVG File?

SVG (Scalable Vector Graphics) is a vector image format. Unlike raster formats like JPG or PNG, SVG images are defined by mathematical paths — they scale perfectly to any size without becoming blurry.

SVGs are widely used for logos, icons, illustrations and diagrams. The problem: not all software and platforms support SVG. Emails, Word documents, social media posts and many apps require JPG or PNG.

## Why Convert SVG to JPG?

- Share a logo or icon on a platform that doesn't support SVG
- Embed a vector illustration in a Word document or PowerPoint
- Use a design asset in an email newsletter
- Create a high-resolution JPG for printing

## How to Convert SVG to JPG on Breklo

1. Go to [Breklo's SVG to JPG converter](/svg-to-jpg)
2. Upload your SVG file
3. Choose the output scale (2× recommended for sharp results)
4. Set the background colour (white by default — change for coloured backgrounds)
5. Adjust quality if needed
6. Click **Convert to JPG**
7. Your JPG downloads immediately

## Choosing the Right Output Scale

SVG is vector-based, so you can render it at any size:

| Scale | Use case |
|---|---|
| 1× | Small icons, web thumbnails |
| 2× | Standard use — website images, documents |
| 3× | High-resolution print, retina displays |

For most uses, 2× is the right choice. It produces a crisp, detailed image without creating an unnecessarily large file.

## Background Colour for Transparent SVGs

Many SVG files have transparent backgrounds — especially logos and icons. Since JPG does not support transparency, you need to fill the background with a colour.

- **White** — for documents, presentations and print
- **Black** — for dark-themed contexts
- **Custom colour** — match your brand or background

If you need to preserve transparency, convert to PNG instead — PNG supports transparent backgrounds.

## SVG to JPG vs SVG to PNG

| | JPG | PNG |
|---|---|---|
| Transparency | No (needs background fill) | Yes |
| File size | Smaller | Larger |
| Best for | Photos, complex artwork | Logos, icons with transparency |

For logos on websites, [PNG to WebP](/png-to-webp) after conversion gives you the smallest possible file with transparency intact.
    `.trim(),
    faq: [
      { q: 'Why does my SVG look blurry as a JPG?', a: 'This usually means the output scale is too low. Use 2× or 3× scale to render a high-resolution JPG from your SVG file.' },
      { q: 'How do I handle a transparent SVG background?', a: 'JPG does not support transparency. Choose a background colour in the converter — white is the standard choice for most uses. For transparent output, consider converting to PNG.' },
      { q: 'What resolution will the output JPG be?', a: 'At 2× scale, the JPG renders at twice the SVG\'s intrinsic dimensions. For a 400×400 SVG, you get an 800×800 JPG.' },
      { q: 'Can I convert multiple SVG files at once?', a: 'Yes. Drop multiple SVG files and they all convert together with the same settings.' },
      { q: 'Will the SVG text be sharp in the JPG?', a: 'Yes, provided you use a high enough scale (2× or 3×). SVG text renders as sharp pixels in the output image.' },
      { q: 'Is the conversion free?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-convert-m4a-to-mp3',
    title: 'How to Convert M4A to MP3 Online Free (iPhone Voice Memos & Music)',
    description: 'Convert M4A and AAC audio files to MP3 online for free. Works with iPhone voice memos, Apple Music downloads and any M4A file.',
    date: '2025-07-11',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'M4A to MP3', slug: 'm4a-to-mp3' },
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
    ],
    content: `
## What Is M4A?

M4A is Apple's audio format — the standard format for iPhone voice memos, iTunes purchases, Apple Music and GarageBand recordings. It uses AAC (Advanced Audio Coding) compression, which is actually more efficient than MP3.

The problem: not all devices and apps support M4A. Android phones, many car audio systems, older media players and some podcast platforms require MP3.

## When Do You Need to Convert M4A to MP3?

- Sharing an iPhone voice memo with someone on Android or Windows
- Uploading a recording to a podcast platform that only accepts MP3
- Playing the file in a car stereo that doesn't support M4A
- Sending an audio file to someone using a basic media player
- Editing in software that only supports MP3

## How to Convert M4A to MP3 on Breklo

1. Go to [Breklo's M4A to MP3 converter](/m4a-to-mp3)
2. Upload your M4A or AAC file
3. Choose the output bitrate (192kbps recommended)
4. Click **Convert to MP3**
5. Your MP3 file downloads in seconds

## Sending iPhone Voice Memos as MP3

iPhone voice memos are saved as M4A files. When you share them, not everyone can open them. Here is the fastest workflow:

1. Share the voice memo from your iPhone to your computer (AirDrop, email, or Files)
2. Go to [M4A to MP3](/m4a-to-mp3) in your browser
3. Upload the M4A file
4. Download the MP3
5. Share the MP3 — it opens on any device

## M4A vs MP3: Quality Comparison

M4A (AAC) is technically a better codec than MP3 — it produces better audio quality at the same bitrate. However, for everyday sharing and listening, the difference is imperceptible at 128kbps and above.

When converting M4A to MP3, use at least 192kbps to preserve the quality from the original AAC encoding.

## Does Converting M4A to MP3 Reduce Quality?

Yes, slightly. You are converting from one lossy format to another, which involves a second compression step. At 192kbps the degradation is minimal and inaudible to most listeners. At 128kbps it is acceptable for voice recordings and podcasts.
    `.trim(),
    faq: [
      { q: 'Can I convert iPhone voice memos to MP3?', a: 'Yes. iPhone voice memos are saved as M4A files. Upload the M4A file to Breklo\'s M4A to MP3 converter and download the resulting MP3.' },
      { q: 'Will converting M4A to MP3 reduce audio quality?', a: 'There is a slight quality reduction since you are converting between two lossy formats. At 192kbps the difference is inaudible for most content. Use 320kbps for music if quality is critical.' },
      { q: 'What bitrate should I use for voice recordings?', a: '128kbps is more than sufficient for voice recordings, interviews and podcasts. Use 192kbps or higher for music.' },
      { q: 'Does M4A to MP3 work with AAC files too?', a: 'Yes. M4A and AAC are essentially the same format with different file extensions. Both work with this converter.' },
      { q: 'Is there a file size limit?', a: 'Up to 100 MB. All conversion happens in your browser with no server upload.' },
      { q: 'Is the conversion free?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-convert-mp3-to-wav-free',
    title: 'How to Convert MP3 to WAV Online Free (For Audio Editing)',
    description: 'Convert MP3 audio files to uncompressed WAV format online for free. Perfect for importing into Audacity, Logic Pro or any DAW.',
    date: '2025-07-13',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'MP3 to WAV', slug: 'mp3-to-wav' },
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
    ],
    content: `
## Why Convert MP3 to WAV?

MP3 is compressed — it throws away audio data to achieve small file sizes. WAV is uncompressed — it stores every sample of audio exactly.

The main reason to convert MP3 to WAV is for **audio editing**. Most professional audio software (Audacity, Adobe Audition, Logic Pro, GarageBand, Pro Tools) works best with uncompressed audio. When you edit a compressed MP3 and re-export it, the compression compounds — every save adds more artefacts.

Converting to WAV first means:
- No additional quality loss during editing
- More accurate waveform display in audio editors
- Better compatibility with professional DAWs
- Required format for some audio processing workflows

## How to Convert MP3 to WAV on Breklo

1. Go to [Breklo's MP3 to WAV converter](/mp3-to-wav)
2. Upload your MP3 file
3. Click **Convert to WAV**
4. Your WAV file downloads in seconds

The tool shows you the audio details (duration, sample rate, channels) before downloading.

## How Much Larger Will the WAV File Be?

Significantly larger. WAV is uncompressed PCM audio, so the file size depends only on duration, sample rate and channels — not the original MP3 bitrate.

A rough guide:
- 1 minute stereo WAV at 44.1kHz = ~10 MB
- 1 minute MP3 at 128kbps = ~1 MB
- 3 minutes MP3 at 128kbps = ~3 MB → ~30 MB as WAV

Make sure you have enough storage before converting long files.

## Will the WAV Sound Better Than the MP3?

No — and this is a common misconception. WAV is a container format. The audio data inside comes directly from the MP3, which was already compressed. Converting to WAV does not recover the audio data that MP3 compression removed.

What WAV gives you is a lossless working copy — any edits you make will not introduce additional compression artefacts.

## Using the WAV in Audacity

1. Convert your MP3 to WAV using Breklo
2. Open Audacity
3. Go to **File → Import → Audio**
4. Select your WAV file
5. Edit as needed
6. Export in your preferred format

For the final export, you can convert back to MP3 using [WAV to MP3](/wav-to-mp3) when you are done editing.
    `.trim(),
    faq: [
      { q: 'Does converting MP3 to WAV improve sound quality?', a: 'No. The quality of the original MP3 cannot be recovered. Converting to WAV creates a lossless working copy, preventing additional quality loss during editing and re-exporting.' },
      { q: 'Why is the WAV file so much larger than the MP3?', a: 'WAV stores uncompressed PCM audio — every audio sample is stored in full. A 3-minute stereo WAV is around 30 MB regardless of the source MP3 bitrate.' },
      { q: 'Which sample rate does the output WAV use?', a: 'The WAV output preserves the original sample rate of the MP3, typically 44.1kHz or 48kHz.' },
      { q: 'Can I use the WAV file in Audacity?', a: 'Yes. WAV is one of the best formats for Audacity and all other audio editors. It imports cleanly with no additional quality loss.' },
      { q: 'Is there a file size limit?', a: 'Input MP3 files up to 100 MB are supported. Note the WAV output will be significantly larger.' },
      { q: 'Is the conversion free?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-reduce-pdf-file-size',
    title: 'How to Reduce PDF File Size Without Losing Quality',
    description: 'Reduce the size of large PDF files online for free. Tips and techniques for making PDFs smaller — for email, upload limits and storage.',
    date: '2025-07-15',
    category: 'PDF Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
    ],
    content: `
## Why Are Some PDFs So Large?

PDF file size depends on content type:

- **Text-only PDFs** — usually 100KB–1MB. Small and efficient.
- **PDFs with images** — size depends on image resolution. High-res photos can add MB per page.
- **Scanned PDFs** — often 2–5MB per page since each page is a full-resolution image.
- **PDFs with embedded fonts** — fonts can add 500KB–2MB each.
- **PDFs with metadata and bookmarks** — minor but adds up.

The most effective compression strategies target the biggest contributor to file size.

## Method 1: Online PDF Compressor (Fastest)

The quickest way to reduce PDF size is using [Breklo's Compress PDF tool](/compress-pdf):

1. Upload your PDF
2. Choose a compression level:
   - **Basic** — removes unused objects, lossless, 10–30% reduction
   - **Medium** — re-renders at 72% quality, 40–60% reduction
   - **High** — maximum compression, 60–80% reduction
3. Download the compressed PDF

For most use cases, Medium gives the best balance of size and quality.

## Method 2: Remove Unnecessary Pages

If your PDF has blank pages, cover pages you don't need to share, or appendices that aren't relevant, remove them first with [Delete PDF Pages](/delete-pdf-pages). Fewer pages = smaller file.

## Method 3: Split Large PDFs

If you only need to share part of a large document, [split it](/split-pdf) or [extract the relevant pages](/extract-pdf-pages) instead of compressing the whole thing.

## Method 4: Reduce Image Resolution Before Creating the PDF

If you control how the PDF is created (e.g. from Word or InDesign), reduce image resolution to 150 DPI for screen use or 300 DPI for print. This prevents large PDFs from being created in the first place.

## What Compression Level Should I Use?

| Situation | Recommended level |
|---|---|
| Text-heavy report or contract | Basic (lossless) |
| Presentation with images | Medium |
| Scanned document | High |
| Sending by email (under 10MB limit) | Medium or High |
| Uploading to a portal with size limit | High |

## Realistic Compression Results

- A 50MB scanned PDF → ~8–12MB on High compression
- A 10MB image-heavy presentation → ~3–5MB on Medium
- A 2MB text report → ~1.5MB on Basic (minor reduction)

Results vary by document type. Image-heavy and scanned documents compress the most.
    `.trim(),
    faq: [
      { q: 'What is the best way to reduce PDF file size for email?', a: 'Use Medium compression on Breklo\'s Compress PDF tool. It typically reduces file size by 40–60% while keeping the document readable. Most email limits are 10–25MB, and Medium compression easily gets most PDFs under that.' },
      { q: 'Does reducing PDF size affect print quality?', a: 'Basic compression is lossless — print quality is preserved exactly. Medium and High compression re-render pages as images which may show slight softening when printed at very large sizes, but is fine for standard A4 printing.' },
      { q: 'Why is my scanned PDF so large?', a: 'Scanned PDFs store each page as a high-resolution image. A single scanned A4 page at 300 DPI is 1–3MB. Use High compression mode to re-render at a lower resolution and dramatically reduce the file size.' },
      { q: 'Can I compress a PDF multiple times?', a: 'You can, but there are diminishing returns. After the first compression, subsequent compressions produce little additional reduction. For maximum compression, use High mode in one pass.' },
      { q: 'Is there a free way to reduce PDF size on Mac?', a: 'Yes. In Preview on Mac, go to File → Export as PDF, and in the Quartz Filter dropdown choose Reduce File Size. Results vary, but it is free and built in.' },
      { q: 'How do I reduce PDF size without losing quality?', a: 'Use Basic compression mode. It removes unused objects and optimises the PDF structure without re-rendering any content. Typical reduction is 10–30%.' },
    ],
  },
  {
    slug: 'how-to-convert-images-to-pdf-on-iphone',
    title: 'How to Convert Images to PDF on iPhone (Free, No App)',
    description: 'Convert photos from your iPhone camera roll to a PDF document. No app download needed — works directly in Safari for free.',
    date: '2025-07-17',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Image to PDF', slug: 'image-to-pdf' },
      { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    content: `
## Converting Photos to PDF on iPhone — Two Methods

### Method 1: Using Breklo in Safari (Fastest, No App)

This works entirely in your iPhone browser with no download:

1. Open **Safari** on your iPhone and go to [breklo.com/image-to-pdf](https://www.breklo.com/image-to-pdf)
2. Tap **Browse files**
3. Choose **Photo Library** and select one or more photos
4. Arrange them in the right order using the arrows
5. Choose **Original size** or **Fit to A4**
6. Tap **Convert to PDF**
7. The PDF downloads to your Files app

You can combine multiple iPhone photos into one PDF in one step.

### Method 2: Built-in iOS Feature (Single Image)

For a single photo, iOS has a built-in conversion:

1. Open the **Photos** app
2. Find the photo you want
3. Tap the **Share** button (box with arrow)
4. Scroll down and tap **Print**
5. On the print preview screen, pinch outward with two fingers
6. This opens the PDF preview
7. Tap the **Share** button again → **Save to Files**

This works for one photo at a time. For multiple photos, use Breklo.

### Method 3: Files App (Multiple Photos)

1. Open the **Files** app
2. Navigate to where your photos are saved
3. Long press a photo → **Select**
4. Select all photos you want
5. Tap the **Share** button → **Create PDF**

This works well but doesn't let you control the page layout.

## Tips for Better Results

- **Rotate photos before converting** — if any photos are sideways, rotate them in the Photos app first
- **Compress after converting** — use [Compress PDF](/compress-pdf) to reduce the file size if you need to share it
- **Choose A4 mode** if the PDF is for a formal document, Original mode if you want the exact photo dimensions

## Scanning Documents with Your iPhone Camera

If you need to scan a physical document (rather than convert an existing photo), use the **Notes** app:

1. Open **Notes** → create a new note
2. Tap the **Camera** icon → **Scan Documents**
3. Scan your document — iOS auto-detects the edges
4. Tap **Save** → tap the scan → **Share** → **Save to Files**

This creates a cleaner, more readable PDF than photographing a document manually.
    `.trim(),
    faq: [
      { q: 'Can I convert multiple iPhone photos to one PDF?', a: 'Yes. In Breklo\'s Image to PDF tool, tap Browse files, select multiple photos from your Photo Library, arrange them in order, and convert — all photos become one PDF.' },
      { q: 'Does the Breklo image to PDF tool work on iPhone?', a: 'Yes. It works in Safari on any iPhone running iOS 14 or later. No app download needed.' },
      { q: 'How do I convert a screenshot to PDF on iPhone?', a: 'Open Breklo in Safari, go to Image to PDF, tap Browse files, and select the screenshot from your Photo Library. It converts to PDF in seconds.' },
      { q: 'Can I scan a document with my iPhone and save as PDF?', a: 'Yes. Use the Notes app: create a new note, tap the camera icon, choose Scan Documents, and save. For existing photos of documents, use Breklo\'s Image to PDF tool.' },
      { q: 'Will iPhone photos be high quality in the PDF?', a: 'Yes. Images are embedded without re-compression in Original size mode. The quality matches the original photo.' },
      { q: 'Is the Image to PDF tool free on iPhone?', a: 'Yes, completely free with no signup required and no app to download.' },
    ],
  },
  {
    slug: 'how-to-compress-png-images',
    title: 'How to Compress PNG Images Without Losing Quality (Free Online)',
    description: 'Reduce PNG file sizes online for free. Compress PNG images for web use without noticeable quality loss — no software needed.',
    date: '2025-07-19',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'PNG to WebP', slug: 'png-to-webp' },
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
    ],
    content: `
## Why PNG Files Are Large

PNG uses lossless compression — every pixel is stored exactly. This is great for quality but terrible for file size, especially for photos. A full-resolution PNG screenshot from a modern Mac or Windows PC can easily be 3–10 MB.

For web use, large PNG files slow down page loads and consume unnecessary bandwidth.

## The Best Ways to Compress PNG Images

### Option 1: Convert to WebP

The most effective approach: convert your PNG to [WebP format](/png-to-webp). WebP produces files 50–80% smaller than PNG at the same visual quality, and supports transparency — so you lose nothing.

All modern browsers support WebP. If you are optimising images for a website, WebP is the clear winner.

### Option 2: Compress via Canvas (Breklo)

[Breklo's Compress Image tool](/compress-image) uses canvas-based compression:

1. Upload your PNG files
2. Choose a preset:
   - **Web** — 70% quality, max 1200px. Best for website images.
   - **Email** — 60% quality, max 900px. Best for attachments.
   - **Maximum** — 45% quality, max 800px. Smallest possible file.
3. Download the compressed images

Note: Breklo outputs JPG after compression for maximum size reduction. If you need to keep the PNG format with transparency, use a PNG-specific compressor or convert to WebP.

### Option 3: Convert PNG to JPG

For photos without transparency, [PNG to JPG](/png-to-jpg) significantly reduces file size (typically 70–80% smaller). Use this when transparency is not needed and file size matters most.

## PNG Compression for Websites

For website images, follow this priority order:

1. **Use WebP** — smallest file, full quality, transparency supported
2. **Use compressed JPG** — for photos where transparency isn't needed
3. **Use compressed PNG** — only when transparency is essential and WebP isn't an option

## When to Keep PNG Format

- Logos and icons with transparent backgrounds (for documents and print)
- Screenshots where text sharpness is critical
- Images that will be further edited and re-saved multiple times
    `.trim(),
    faq: [
      { q: 'What is the best way to compress a PNG without losing quality?', a: 'The most effective lossless method is converting to WebP, which is 50–80% smaller than PNG at the same visual quality. For PNG-specific compression, dedicated tools like TinyPNG use advanced lossless algorithms.' },
      { q: 'Does compressing a PNG reduce image dimensions?', a: 'It depends on the tool. Breklo\'s Web preset limits images to 1200px on the longest side. Use Custom mode to set your own maximum dimensions, or choose a preset that doesn\'t resize.' },
      { q: 'Should I use JPG or PNG for website images?', a: 'For photos, use JPG or WebP. For logos, icons and images with transparency, use PNG or WebP. WebP is the modern choice for both — it handles all use cases with smaller file sizes.' },
      { q: 'Can I compress PNG images in bulk?', a: 'Yes. Breklo\'s Compress Image tool accepts multiple files at once and shows the total space saved across all images.' },
      { q: 'Why does Breklo output JPG instead of PNG when compressing?', a: 'JPEG compression achieves much higher size reduction than PNG compression. For web images where the goal is the smallest possible file, JPG or WebP is preferable to compressed PNG.' },
      { q: 'Is there a free way to compress PNG on Mac?', a: 'Yes. Preview on Mac can export PNG files with reduced quality via File → Export. For more control and bulk compression, use Breklo online.' },
    ],
  },
  {
    slug: 'how-to-combine-pdf-files-windows',
    title: 'How to Combine PDF Files on Windows 10 and 11 (Free Methods)',
    description: 'Combine multiple PDF files into one on Windows — without Adobe Acrobat. Free methods using online tools, Microsoft Edge and more.',
    date: '2025-07-21',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
    ],
    content: `
## Does Windows Have a Built-In PDF Merger?

No. Unlike Mac (which has Preview), Windows 10 and 11 have no built-in tool for merging PDF files. Microsoft Print to PDF can create PDFs but cannot combine them.

Here are the best free options.

## Method 1: Online Tool (Easiest)

The fastest method requires no software:

1. Open [Breklo's Merge PDF tool](/merge-pdf) in any browser
2. Drag and drop your PDF files
3. Reorder them if needed
4. Click **Merge PDFs**
5. Download the combined PDF

Works in Chrome, Edge, Firefox or any modern browser. No signup, no install.

## Method 2: Microsoft Edge (Built into Windows)

Edge can print PDFs, which you can use to combine pages:

1. Open the first PDF in Edge
2. Press **Ctrl+P** to open print
3. Choose **Microsoft Print to PDF** as the printer
4. Print all pages — this creates a new PDF

This only works one file at a time, so you would need to merge manually. It is not practical for combining multiple PDFs.

## Method 3: PowerShell (For Advanced Users)

Windows PowerShell can merge PDFs if you install the PDFsharp library, but this requires coding knowledge and is not practical for most users.

## Method 4: Microsoft Word (If You Have Office)

If you have Microsoft Word:

1. Open Word
2. Insert → Object → Text from File
3. Select your PDF files one by one
4. Word converts each to a Word document
5. Save as PDF

Quality varies — formatting often breaks, especially for complex PDFs.

## The Recommended Method

For most Windows users, the online tool is the best option. It is free, requires no installation, works in any browser, and handles all file sizes without the formatting issues that Word introduces.

After merging, if the combined PDF is large, [compress it](/compress-pdf) to reduce the file size before sharing.
    `.trim(),
    faq: [
      { q: 'Can I merge PDFs on Windows without Adobe Acrobat?', a: 'Yes. The easiest free method is using an online tool like Breklo\'s Merge PDF — open it in any browser, upload your PDFs, and download the merged result. No software installation needed.' },
      { q: 'Does Windows 11 have a built-in PDF merger?', a: 'No. Neither Windows 10 nor Windows 11 includes a built-in PDF merge tool. Microsoft Edge can view and print PDFs but cannot combine multiple files.' },
      { q: 'Is it safe to use an online PDF merger for confidential documents?', a: 'With Breklo, yes — all processing happens in your browser. Your files are never uploaded to any server, so confidential documents stay on your device.' },
      { q: 'Can I combine PDFs on Windows for free?', a: 'Yes, using an online tool like Breklo. It is completely free with no limits and no signup required.' },
      { q: 'How do I merge PDFs in Windows Explorer?', a: 'Windows Explorer has no built-in PDF merge feature. Use an online tool in your browser for the fastest free solution.' },
      { q: 'Can I rearrange pages when merging PDFs on Windows?', a: 'Yes. Breklo\'s merge tool lets you reorder files using up and down arrows before combining them.' },
    ],
  },
  {
    slug: 'how-to-make-pdf-smaller-for-email',
    title: 'How to Make a PDF Smaller for Email (Under 10MB Fast)',
    description: 'Reduce PDF file size to send by email. Get large PDFs under Gmail and Outlook attachment limits — free, takes under 30 seconds.',
    date: '2025-07-23',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Email Attachment Size Limits

Every email provider has an attachment limit:

| Email service | Attachment limit |
|---|---|
| Gmail | 25 MB |
| Outlook / Hotmail | 20 MB |
| Yahoo Mail | 25 MB |
| iCloud Mail | 20 MB |
| Corporate email | Often 10 MB or less |

If your PDF is over these limits, it bounces back or fails to send. The fix is quick.

## The Fastest Way to Reduce PDF Size for Email

1. Go to [Breklo's Compress PDF tool](/compress-pdf)
2. Upload your PDF
3. Select **Medium** compression
4. Click **Compress PDF**
5. Download and send

Medium compression reduces most PDFs by 40–60% in about 10–30 seconds depending on file size. A 30 MB PDF typically becomes 10–15 MB.

## What If Medium Is Not Enough?

Try **High** compression. It re-renders each page at lower quality and typically achieves 60–80% reduction. A 30 MB PDF usually becomes 6–10 MB on High.

Note: High compression converts pages to images, so text will no longer be selectable in the resulting PDF.

## Alternative: Split the PDF

If compressing is not enough, [split the PDF](/split-pdf) into sections and send them as separate emails. A 60 MB PDF split into three 20 MB parts gets under most email limits.

## Alternative: Share via Cloud

For very large files, consider uploading to Google Drive or Dropbox and sharing a link instead of an attachment. This avoids size limits entirely.

## Checking File Size on Windows and Mac

**Windows:** Right-click the PDF → Properties → check Size.
**Mac:** Click the file once → press Cmd+I → check Size.

After compressing, check the new file size before sending to confirm it is under the limit.
    `.trim(),
    faq: [
      { q: 'What is the attachment limit for Gmail?', a: 'Gmail allows attachments up to 25 MB. For files larger than 25 MB, Gmail automatically converts them to a Google Drive link.' },
      { q: 'How do I compress a PDF to under 1MB?', a: 'Use High compression on Breklo. For most PDFs this achieves 60–80% reduction. A 5 MB PDF typically becomes 1–2 MB. For very large PDFs, you may also need to split them first.' },
      { q: 'How long does it take to compress a PDF online?', a: 'Basic compression is nearly instant. Medium compression takes 5–30 seconds depending on page count. High compression (which re-renders pages) takes 10–60 seconds for a typical document.' },
      { q: 'Will compressing a PDF affect the digital signature?', a: 'Yes. Compression modifies the file structure, which invalidates digital signatures. Remove any signatures before compressing, then re-sign after.' },
      { q: 'Why does my compressed PDF still look good?', a: 'Medium compression uses 72% quality rendering, which looks fine on screens and in standard print. The reduction in file size comes from lower image resolution and more efficient encoding.' },
      { q: 'Can I compress a PDF on my phone to send by email?', a: 'Yes. Open Breklo in any mobile browser, upload the PDF, compress it, and download. Then attach the compressed PDF to your email.' },
    ],
  },
  {
    slug: 'webp-vs-jpg-vs-png-which-format',
    title: 'WebP vs JPG vs PNG: Which Image Format Should You Use?',
    description: 'A clear comparison of WebP, JPG and PNG image formats. Learn which format is best for photos, logos, web images and more.',
    date: '2025-07-25',
    category: 'Image Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
      { name: 'PNG to WebP', slug: 'png-to-webp' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## The Three Main Web Image Formats

Understanding when to use each format is one of the most practical skills in web development and digital content creation. Here is a clear breakdown.

## JPG (JPEG)

**What it is:** The most widely used image format. Uses lossy compression — it permanently removes some image data to achieve small file sizes.

**Best for:**
- Photographs and realistic images
- Hero images and banners
- Any image where transparency is not needed

**Strengths:**
- Very small file sizes for photos
- Universal compatibility (every device, browser and app supports it)
- Good quality at 70–90% compression settings

**Weaknesses:**
- No transparency support
- Quality degrades with each save (generational loss)
- Not ideal for text, sharp edges or logos

## PNG

**What it is:** A lossless format — no quality loss when saving. Larger files than JPG but perfect quality.

**Best for:**
- Logos and icons with transparent backgrounds
- Screenshots where text must be sharp
- Images that will be further edited
- Graphics with flat colours and hard edges

**Strengths:**
- Supports transparency (alpha channel)
- No quality loss — pixel-perfect
- Sharp text and edges

**Weaknesses:**
- Large file sizes for photos
- No animation support (in standard PNG)

## WebP

**What it is:** A modern format by Google that combines the best of JPG and PNG. Supports both lossy and lossless compression, and supports transparency.

**Best for:**
- Web images of all types
- Replacing both JPG and PNG on modern websites

**Strengths:**
- 25–35% smaller than JPG at the same quality
- 50–80% smaller than PNG at the same quality
- Supports transparency (like PNG)
- Supported by all modern browsers

**Weaknesses:**
- Not universally supported in older software
- Some email clients don't display WebP correctly
- Not ideal for print

## Quick Decision Guide

| Use case | Recommended format |
|---|---|
| Photo on a website | WebP (fallback JPG) |
| Logo with transparent background | WebP or PNG |
| Screenshot with text | PNG |
| Email attachment | JPG |
| Photo for printing | JPG (300 DPI) |
| Icon on a website | WebP or SVG |
| Animated image | GIF or WebP (animated) |

## Converting Between Formats on Breklo

- [JPG → WebP](/jpg-to-webp) — for smaller web images
- [PNG → WebP](/png-to-webp) — for logos and transparent images
- [PNG → JPG](/png-to-jpg) — when transparency is not needed
- [JPG → PNG](/jpg-to-png) — for editing without quality loss
    `.trim(),
    faq: [
      { q: 'Is WebP better than JPG?', a: 'For web use, yes. WebP produces files 25–35% smaller than JPG at the same visual quality, and also supports transparency. All modern browsers support WebP. For email and print, JPG remains the safer choice due to universal compatibility.' },
      { q: 'Should I use PNG or JPG for a logo?', a: 'If your logo has a transparent background, use PNG or WebP. JPG does not support transparency. For web use, WebP is the best choice — smaller than PNG with transparency preserved.' },
      { q: 'Does converting JPG to WebP improve quality?', a: 'No — quality stays the same or may be very slightly reduced. The benefit is smaller file size. If you need better quality, you would need a higher-resolution source image.' },
      { q: 'Is WebP supported on all browsers?', a: 'Yes, on all modern browsers. Chrome, Firefox, Safari (since 2020), Edge and all modern mobile browsers support WebP. Only very old browsers (IE11) do not.' },
      { q: 'What is the difference between lossy and lossless compression?', a: 'Lossy compression permanently removes some image data to achieve smaller files. JPG and WebP (lossy mode) use this. Lossless compression reduces file size without losing any data. PNG and WebP (lossless mode) use this.' },
      { q: 'Which format is best for screenshots?', a: 'PNG is the best choice for screenshots containing text, as it preserves sharp edges and small text perfectly. JPG can make text look blurry at lower quality settings.' },
    ],
  },
  {
    slug: 'how-to-extract-audio-from-video-free',
    title: 'How to Extract Audio from Video Free (MP4, MOV, WebM)',
    description: 'Extract audio from any video file and save it as MP3 or WAV. Works with MP4, MOV, WebM and more — free, no software needed.',
    date: '2025-07-27',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
      { name: 'MP4 to WAV', slug: 'mp4-to-wav' },
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
    ],
    content: `
## Why Extract Audio from a Video?

Extracting the audio track from a video file is one of the most common media tasks. You might need to:

- Save the audio from a lecture, webinar or meeting recording
- Extract music from a music video
- Get the audio from a video call for transcription
- Create a podcast episode from a video recording
- Reduce file size — an MP3 is typically 10–20× smaller than the equivalent video

Whatever the reason, it takes seconds online with no software.

## Which Output Format Should I Choose?

**MP3** — best for listening, sharing, uploading to podcast platforms
**WAV** — best for editing in audio software (Audacity, Logic Pro, etc.)

For most use cases, MP3 is the right choice. Use [MP4 to WAV](/mp4-to-wav) if you need to edit the audio afterwards.

## How to Extract Audio from MP4 on Breklo

1. Go to [Breklo's MP4 to MP3 converter](/mp4-to-mp3)
2. Upload your video file (MP4, MOV, WebM, MKV, AVI)
3. Choose your bitrate:
   - 96kbps — voice recordings, meetings
   - 128kbps — general use
   - 192kbps — music, high quality
   - 320kbps — best quality
4. Click **Convert to MP3**
5. Your MP3 file downloads in seconds

## How to Extract Audio from MOV (iPhone Videos)

iPhone videos are saved as MOV files. The process is identical:

1. Transfer the MOV from your iPhone to your computer (AirDrop, USB or iCloud)
2. Go to [MP4 to MP3](/mp4-to-mp3) in your browser
3. Upload the MOV file
4. Download the MP3

The converter accepts MOV files the same as MP4.

## How to Extract Audio from a Zoom Recording

Zoom recordings are saved as MP4. The workflow:

1. Find your Zoom recording (usually in Documents/Zoom)
2. Go to [MP4 to MP3](/mp4-to-mp3)
3. Upload the MP4
4. Choose 128kbps for voice recordings
5. Download the MP3

You can then use the MP3 for transcription, sharing, or archiving.

## What About Very Long Videos?

The browser-based converter handles files up to 100 MB. For a typical video at 1080p, that is roughly 3–5 minutes. For longer recordings, the file size may exceed the limit.

For very large video files, splitting the video first or using desktop software like Audacity (free) with FFmpeg is a better approach.
    `.trim(),
    faq: [
      { q: 'What video formats can I extract audio from?', a: 'Any video format your browser can decode — which includes MP4, MOV, WebM, MKV and AVI in most modern browsers (Chrome, Firefox, Edge, Safari).' },
      { q: 'What is the best bitrate for extracting audio from a video call?', a: '128kbps is more than sufficient for voice recordings, meetings and video calls. Use 192kbps or higher for music videos.' },
      { q: 'Can I extract audio from an iPhone video?', a: 'Yes. iPhone videos are MOV files. Upload the MOV directly to Breklo\'s MP4 to MP3 converter — it accepts MOV just like MP4.' },
      { q: 'How do I extract audio from a Zoom recording?', a: 'Zoom recordings are saved as MP4 files in your Documents/Zoom folder. Upload the MP4 to Breklo\'s MP4 to MP3 tool and download the MP3.' },
      { q: 'Is the audio extraction free?', a: 'Yes, completely free with no limits and no signup required.' },
      { q: 'Can I extract audio from a video on my phone?', a: 'Yes. Open Breklo in your phone browser (Safari or Chrome), upload the video from your files, and download the MP3.' },
    ],
  },
  {
    slug: 'how-to-organize-reorder-pdf-pages',
    title: 'How to Reorder Pages in a PDF Online Free',
    description: 'Rearrange PDF pages in any order online for free. Move, reorganize and reorder pages without Adobe Acrobat — no signup needed.',
    date: '2025-07-29',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Organize PDF', slug: 'organize-pdf' },
      { name: 'Delete PDF Pages', slug: 'delete-pdf-pages' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Why Reorder PDF Pages?

Page order mistakes are common when creating PDFs from multiple sources:

- Pages got merged in the wrong order
- A document was scanned with some pages upside down or out of sequence
- You need to move a summary page to the front
- Appendices need to be reordered

Fixing page order takes seconds online — no PDF editor needed.

## How to Reorder PDF Pages on Breklo

1. Go to [Breklo's Organize PDF tool](/organize-pdf)
2. Upload your PDF
3. The tool loads all pages as a numbered list
4. Use the **↑** and **↓** arrows to move pages into the right order
5. Click **Save Organized PDF**
6. Your reordered PDF downloads immediately

The tool shows you the current order and the new position of each page. Pages can be moved one step at a time.

## Reordering Pages in Preview on Mac

Mac users can reorder pages for free in Preview:

1. Open the PDF in Preview
2. Go to **View → Thumbnails** to show the page sidebar
3. Drag and drop pages to reorder them
4. Save with **Cmd+S**

This is faster for small reorders but slower for complex reorganisations.

## Reordering Pages in Adobe Acrobat

In Acrobat, go to **View → Page Panel**, then drag and drop pages to rearrange them. This requires a paid Acrobat subscription.

## After Reordering: Common Follow-Up Tasks

After getting the pages in the right order, you might want to:

- [Delete any pages you no longer need](/delete-pdf-pages)
- [Compress the result](/compress-pdf) to reduce file size before sharing
- [Rotate any pages](/rotate-pdf) that are in the wrong orientation
- [Merge with another document](/merge-pdf) to add a cover page or appendix
    `.trim(),
    faq: [
      { q: 'Can I reorder PDF pages without Adobe Acrobat?', a: 'Yes. Breklo\'s Organize PDF tool is free and works in any browser. Mac users can also use Preview for free.' },
      { q: 'Is there a limit on how many pages I can reorder?', a: 'No. The tool works with PDFs of any length. For very large documents, the page list is scrollable.' },
      { q: 'Will reordering pages affect PDF quality?', a: 'No. Pages are copied in the new order without any re-rendering. All content is preserved exactly.' },
      { q: 'Can I drag and drop pages to reorder them?', a: 'Currently the tool uses up and down arrows for reordering. Drag and drop page thumbnails are coming in a future update.' },
      { q: 'Can I also delete pages while reordering?', a: 'The Organize tool is focused on reordering. Use the Delete PDF Pages tool first to remove unwanted pages, then use Organize to reorder the remaining ones.' },
      { q: 'Is reordering PDF pages free?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-convert-word-to-pdf-free',
    title: 'How to Convert Word to PDF Free (Windows, Mac, Online)',
    description: 'Convert Word documents to PDF for free. Three methods that work on Windows, Mac and any device — no Adobe Acrobat needed.',
    date: '2025-07-31',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'PDF to Text', slug: 'pdf-to-text' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Why Convert Word to PDF?

PDF is the universal document format. When you send a Word file, the layout can shift depending on which version of Word the recipient has — fonts may change, images may move, and formatting can break entirely.

Converting to PDF locks everything in place. The document looks identical on every device and every operating system. This is why job applications, contracts, invoices and official documents are always shared as PDF.

## Method 1: Save as PDF in Microsoft Word (Windows and Mac)

If you have Word installed, this is the easiest method:

1. Open your document in Word
2. Go to **File → Save As** (or **File → Export** on Mac)
3. Choose **PDF** as the file format
4. Click **Save**

On Windows you can also use **File → Print → Microsoft Print to PDF** as an alternative.

This produces a high-quality PDF that preserves all formatting, fonts and images exactly.

## Method 2: Google Docs (Free, No Software)

Google Docs is completely free and converts Word documents to PDF perfectly:

1. Go to **drive.google.com** and upload your Word file
2. Double-click to open it in Google Docs
3. Go to **File → Download → PDF Document (.pdf)**
4. The PDF downloads immediately

Works on any device with a browser. No Microsoft Office needed.

## Method 3: LibreOffice (Free Desktop Software)

LibreOffice is a free and open-source alternative to Microsoft Office that handles Word files and exports perfect PDFs:

1. Download LibreOffice from **libreoffice.org** (free)
2. Open your Word document
3. Go to **File → Export as PDF**
4. Click **Export**

## Tips for Best PDF Quality

- **Embed fonts** — if your document uses custom fonts, make sure they are embedded in the PDF so they display correctly on other devices
- **Check images** — high-resolution images in Word produce larger PDFs. Compress images in Word before exporting if file size matters
- **Review page breaks** — Word sometimes handles page breaks differently in PDF export. Check the result before sending
- **After converting** — if the PDF is large, run it through [Compress PDF](/compress-pdf) to reduce the file size before sharing

## Word to PDF on iPhone and iPad

On iOS, open the Word document in the **Files** app, long-press it, and choose **Create PDF**. Alternatively, open in Word for iOS → the three-dot menu → Print → then use the pinch gesture on the print preview to save as PDF.
    `.trim(),
    faq: [
      { q: 'Is there a free way to convert Word to PDF?', a: 'Yes — several. Microsoft Word itself has a built-in Save as PDF function. Google Docs converts for free in any browser. LibreOffice is a free desktop alternative that exports PDF.' },
      { q: 'Does converting Word to PDF preserve formatting?', a: 'Yes, when using Microsoft Word or Google Docs. The PDF locks in fonts, layout and images exactly as they appear in the document.' },
      { q: 'Can I convert a Word document to PDF on my phone?', a: 'Yes. On iPhone, open the file in the Files app, long-press and choose Create PDF. On Android, open in Google Docs and export as PDF.' },
      { q: 'Does Breklo have a Word to PDF converter?', a: 'Word to PDF conversion requires server-side processing and is coming in a future update. For now, Google Docs offers a free browser-based option that works perfectly.' },
      { q: 'How do I reduce the file size of a Word-converted PDF?', a: 'After converting, upload the PDF to Breklo\'s Compress PDF tool. Choose Medium compression to reduce size by 40–60% without visible quality loss.' },
      { q: 'Will the PDF look the same as the Word document?', a: 'When converting with Microsoft Word, yes — the PDF is a precise rendering of the document. Google Docs handles most formatting correctly but may show minor differences with complex layouts.' },
    ],
  },
  {
    slug: 'how-to-convert-png-to-jpg',
    title: 'How to Convert PNG to JPG Online Free (Faster, Smaller Files)',
    description: 'Convert PNG images to JPG format online for free. Reduce file size by up to 80% with no visible quality loss — no signup required.',
    date: '2025-08-02',
    category: 'Image Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
      { name: 'JPG to PNG', slug: 'jpg-to-png' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## When Should You Convert PNG to JPG?

PNG is a lossless format — excellent for quality but creates large files. JPG uses compression to achieve much smaller sizes, which matters for:

- Emailing photos — JPG attachments are 3–5× smaller
- Website performance — smaller images load faster
- Storage space — a folder of PNG photos takes far more space than JPG
- Uploading to platforms — many social media sites prefer or require JPG

The trade-off: JPG does not support transparency and uses lossy compression. If your PNG has a transparent background, converting to JPG fills that area with white.

## How to Convert PNG to JPG on Breklo

1. Go to [Breklo's PNG to JPG converter](/png-to-jpg)
2. Drop your PNG files onto the upload area
3. Adjust the quality slider (90% gives excellent results with significant size reduction)
4. Click **Convert**
5. Your JPG files download immediately

You can convert multiple PNG files at once.

## How Much Smaller Will the JPG Be?

Results depend on the image content:

| Image type | Typical reduction |
|---|---|
| Photo / realistic image | 70–85% smaller |
| Screenshot with text | 40–60% smaller |
| Logo / flat colours | 30–50% smaller |
| Illustration | 50–70% smaller |

At 90% quality, the size reduction is dramatic and the visual difference is usually invisible.

## PNG to JPG vs PNG to WebP

Both formats produce smaller files than PNG, but for web use WebP is even better:

- **JPG** — universal compatibility, good for email and documents
- **WebP** — 25–35% smaller than JPG, best for websites

Use [PNG to WebP](/png-to-webp) if you are optimising images specifically for a website.

## Converting PNG to JPG on Windows

Right-click any PNG file → **Open with → Paint** → **File → Save as → JPEG picture**. Simple but no quality control.

For batch conversion or quality control, use Breklo online.
    `.trim(),
    faq: [
      { q: 'What happens to transparent backgrounds when converting PNG to JPG?', a: 'Transparent areas are filled with a white background, since JPG does not support transparency. If you need to preserve transparency, convert to WebP instead.' },
      { q: 'What quality setting should I use for PNG to JPG?', a: '90% gives excellent results — visually indistinguishable from the original but significantly smaller. Use 70–80% for web images where file size is the priority.' },
      { q: 'Can I convert multiple PNG files to JPG at once?', a: 'Yes. Drop multiple PNG files onto the upload area and they all convert together.' },
      { q: 'Will the image dimensions change when converting to JPG?', a: 'No. The width and height are preserved exactly. Only the format and file size change.' },
      { q: 'Is PNG to JPG conversion free on Breklo?', a: 'Yes, completely free with no limits and no signup required.' },
      { q: 'When should I NOT convert PNG to JPG?', a: 'Keep PNG format if the image has a transparent background you need to preserve, or if you plan to edit and re-save the image multiple times (JPG loses quality with each re-save).' },
    ],
  },
  {
    slug: 'how-to-compress-jpeg-online',
    title: 'How to Compress JPEG Images Online Free (Without Losing Quality)',
    description: 'Compress JPEG images online for free. Reduce JPEG file size by 60–80% without noticeable quality loss — no software, no signup.',
    date: '2025-08-04',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
    ],
    content: `
## Why Compress JPEG Images?

JPEG compression is already built into the format — every JPEG is compressed to some degree. But photos straight from a camera or phone are often saved at maximum quality, producing files of 3–8 MB each.

For most uses — websites, emails, social media, documents — this is far more than needed. Compressing a JPEG from 5 MB to 500 KB with a quality setting of 70% is virtually indistinguishable at screen resolution.

## How JPEG Compression Works

JPEG uses a quality scale from 1 to 100 (or 0–1 as a decimal). Higher quality = larger file, lower quality = smaller file.

At 85–92% quality, JPEG images look nearly identical to the original. At 70–80%, images look excellent on screen but files are 3–5× smaller. Below 50%, compression artefacts become visible — blocky edges, colour banding.

## How to Compress JPEG on Breklo

1. Go to [Breklo's Compress Image tool](/compress-image)
2. Drop your JPEG files onto the upload area
3. Choose a preset:
   - **Web (70%)** — ideal for website images
   - **Email (60%)** — smaller files for attachments
   - **Maximum (45%)** — smallest possible file
   - **Custom** — set your own quality and maximum dimensions
4. Click **Compress images**
5. Files download with a summary showing how much was saved

## Batch JPEG Compression

Breklo processes multiple files at once. Drop an entire folder of JPEGs and they all compress together. The results panel shows the size reduction for each file and the total space saved.

## JPEG Compression for Specific Uses

**For websites:** Use the Web preset (70%) with a maximum dimension of 1200px. This produces sharp images at a fraction of the original size.

**For email:** Use the Email preset (60%). Most email attachments look fine at 60% quality when viewed on a screen.

**For printing:** Do not compress below 85% for anything that will be printed. Print reveals compression artefacts that are invisible on screen.

**For social media:** Most platforms recompress images anyway, so there is little point in uploading maximum quality. The Web preset is fine.

## After Compression: Convert to WebP

For even smaller files, convert your compressed JPEGs to [WebP format](/jpg-to-webp). WebP achieves 25–35% additional size reduction on top of JPEG compression.
    `.trim(),
    faq: [
      { q: 'What quality setting should I use for JPEG compression?', a: '70% is excellent for web and email use — typically 60–75% smaller than the original with virtually no visible difference on screen. Use 85–90% for anything that will be printed.' },
      { q: 'Can I compress JPEG images in bulk?', a: 'Yes. Breklo accepts multiple files at once and compresses them all together, showing a per-file breakdown and total space saved.' },
      { q: 'Does JPEG compression reduce image dimensions?', a: 'Only if you use a preset with a maximum pixel size. The Web preset limits images to 1200px on the longest side. Use Custom mode to compress without resizing.' },
      { q: 'How much can I compress a JPEG without it looking bad?', a: 'At 70% quality, the difference is invisible on screen for most photos. Below 50%, compression artefacts (blurry edges, colour banding) become visible, especially in areas of high contrast.' },
      { q: 'Will compressing a JPEG multiple times make it worse?', a: 'Yes. Each JPEG compression step adds more artefacts. Compress once to your target quality rather than compressing repeatedly.' },
      { q: 'Is JPEG compression free on Breklo?', a: 'Yes, completely free with no limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-add-password-to-pdf-mac',
    title: 'How to Add a Password to a PDF on Mac (Free, Built-In Method)',
    description: 'Protect a PDF with a password on Mac using Preview — no extra software needed. Step-by-step guide for macOS password protection.',
    date: '2025-08-06',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Password Protect PDF', slug: 'password-protect-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Two Free Ways to Password Protect a PDF on Mac

Mac users have two good options for adding a password to a PDF: the built-in Preview app and a free online tool.

## Method 1: Preview (Built into macOS)

Preview is macOS's built-in PDF viewer and it can add password protection for free:

1. Open your PDF in **Preview**
2. Go to **File → Export as PDF**
3. Click the **Permissions** button (bottom left of the export dialog)
4. Check **Require password to open document**
5. Enter your password and confirm it
6. Click **Apply** then **Save**

Your PDF is now password-protected. Anyone who tries to open it will be prompted for the password.

**Note:** Preview uses 128-bit RC4 encryption, which is older than the AES encryption used by newer tools. For sensitive documents, a more modern encryption method is recommended.

## Method 2: Breklo Online Tool (Stronger Encryption)

For better security (128-bit AES), use [Breklo's Password Protect PDF tool](/password-protect-pdf):

1. Go to [breklo.com/password-protect-pdf](https://www.breklo.com/password-protect-pdf)
2. Upload your PDF
3. Enter a password (minimum 4 characters)
4. Confirm the password
5. Click **Protect PDF**
6. Download the protected PDF

All processing happens in your browser — the file never leaves your Mac.

## Choosing a Strong Password

A strong PDF password should be:

- At least 8 characters
- A mix of letters, numbers and symbols
- Not based on a word or name
- Unique — not used for other accounts

## Removing a PDF Password on Mac

To remove a password you added:

1. Open the PDF in Preview (enter the password when prompted)
2. Go to **File → Export as PDF**
3. Click **Permissions**
4. Uncheck **Require password to open document**
5. Save

## What Preview Password Protection Does and Does Not Do

Preview's password protection prevents opening the document without the password. It does not prevent screenshots, printing or other actions once opened. For stricter document control, use a tool that supports permission restrictions.
    `.trim(),
    faq: [
      { q: 'Can I password protect a PDF on Mac for free?', a: 'Yes. Preview, which is built into every Mac, can add password protection via File → Export as PDF → Permissions. No additional software needed.' },
      { q: 'What encryption does Preview use for PDF passwords?', a: 'Preview uses 128-bit RC4 encryption, which is older. For stronger security, use Breklo\'s Password Protect PDF tool which uses 128-bit AES encryption.' },
      { q: 'How do I open a password-protected PDF on Mac?', a: 'Open the PDF in Preview or any PDF viewer. You will be prompted to enter the password. Enter it correctly and the document opens normally.' },
      { q: 'Can I remove a PDF password on Mac?', a: 'Yes, using Preview. Open the PDF (enter the password), go to File → Export as PDF → Permissions, uncheck the password requirement, and save.' },
      { q: 'Does adding a password change the PDF content?', a: 'No. The text, images and layout are unchanged. Only a password requirement is added to the file.' },
      { q: 'Can the recipient open my password-protected PDF on Windows?', a: 'Yes. PDF passwords are part of the PDF standard and work in any PDF reader on any platform — Windows, Android, iOS and web browsers.' },
    ],
  },
  {
    slug: 'best-way-to-compress-video-online',
    title: 'Best Free Ways to Compress Video Online (Without Quality Loss)',
    description: 'Reduce video file sizes online for free. Options for compressing MP4, MOV and WebM — plus how to extract audio instead of compressing.',
    date: '2025-08-08',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
      { name: 'MP4 to WAV', slug: 'mp4-to-wav' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Video Compression Is Hard in the Browser

True video compression — reducing file size while keeping the video — requires re-encoding the video stream. This is computationally intensive and traditionally requires software like HandBrake or Adobe Premiere.

Browser-based video compression tools exist but have significant limitations:

- They are slow (re-encoding video takes time even on powerful hardware)
- Results vary widely depending on the source video
- File size limits are often very restrictive

## When You Just Need the Audio

If you recorded a meeting, lecture, interview or podcast as video but only need the audio, extracting the audio track is a much better solution than compressing the video:

- [MP4 to MP3](/mp4-to-mp3) — extracts audio as a compressed MP3 (typically 10–20× smaller than the video)
- [MP4 to WAV](/mp4-to-wav) — extracts audio as uncompressed WAV for editing

A 500 MB video recording becomes a 50 MB MP3 in seconds.

## Free Desktop Options for Video Compression

For actual video compression, desktop tools produce far better results:

**HandBrake (free, Windows/Mac/Linux)**
The best free video compressor. Open your video, choose a preset (Web 1080p or Web 720p), and export. Typically reduces file size by 50–70% with excellent quality. Download at **handbrake.fr**.

**VLC Media Player (free)**
Can re-encode videos via Media → Convert/Save. Less intuitive than HandBrake but works for basic compression.

## Reducing Video Size for Email or Upload

If you need to share a video by email or upload it to a platform with a size limit:

1. **Try extracting audio first** — if only the audio matters, [MP4 to MP3](/mp4-to-mp3) solves the problem instantly
2. **Share via cloud** — upload to Google Drive or Dropbox and share a link instead of attaching the file
3. **Use HandBrake** — for genuine video compression without quality loss

## Tips for Smaller Video Files Going Forward

- Record at 1080p instead of 4K if 4K is not needed
- Use H.265 (HEVC) codec instead of H.264 — same quality, roughly half the file size
- Reduce frame rate to 30fps if the video does not contain fast motion
    `.trim(),
    faq: [
      { q: 'Can I compress video online for free?', a: 'Browser-based video compression tools exist but are slow and limited. For actual video compression, HandBrake (free desktop software) produces much better results. If you only need the audio, Breklo\'s MP4 to MP3 tool extracts it in seconds.' },
      { q: 'How do I reduce MP4 file size for free?', a: 'HandBrake is the best free option for genuine MP4 compression. For sharing purposes, uploading to Google Drive and sharing a link avoids the size problem entirely.' },
      { q: 'What is the easiest way to make a video file smaller?', a: 'If you only need the audio content, converting to MP3 using Breklo\'s MP4 to MP3 tool is the easiest approach — instant and free. For video compression, HandBrake is the best free desktop tool.' },
      { q: 'Does Breklo have a video compressor?', a: 'Not yet. Browser-based video compression is technically complex and produces variable results. It is on the roadmap. For now, Breklo offers MP4 to MP3 and MP4 to WAV for audio extraction.' },
      { q: 'How much can I compress a video without losing quality?', a: 'With HandBrake using the H.265 codec, you can typically achieve 40–60% file size reduction with no visible quality loss at the same resolution.' },
      { q: 'How do I send a large video by email?', a: 'The best approach is to upload to Google Drive, Dropbox or WeTransfer and share the download link. Most email providers limit attachments to 20–25 MB.' },
    ],
  },
  {
    slug: 'how-to-convert-pdf-to-image',
    title: 'How to Convert PDF Pages to Images Online Free (JPG or PNG)',
    description: 'Convert PDF pages to JPG or PNG images online for free. High resolution output, every page becomes a separate image — no signup needed.',
    date: '2025-08-10',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
      { name: 'PDF to PNG', slug: 'pdf-to-png' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Convert PDF to Image?

Converting a PDF page to an image is useful in many situations:

- Sharing a document page on social media (which doesn't accept PDFs)
- Creating a preview or thumbnail of a PDF
- Embedding a PDF page in a Word document or presentation
- Uploading a document to a website that only accepts images
- Extracting graphics or charts from a PDF for use elsewhere

## JPG or PNG: Which Should You Choose?

Both formats work well for PDF conversion. Here is how to decide:

**Choose JPG when:**
- File size matters (emails, web uploads)
- The PDF contains photos or colourful content
- You need universal compatibility

**Choose PNG when:**
- The PDF has sharp graphics, diagrams or text-heavy pages
- You need perfect quality with no compression artefacts
- You may edit the image further

For most everyday uses, JPG is the better choice. For technical diagrams, screenshots and text-heavy pages, PNG preserves quality better.

## How to Convert PDF to JPG on Breklo

1. Go to [Breklo's PDF to JPG converter](/pdf-to-jpg)
2. Upload your PDF
3. Adjust the quality slider (92% default is excellent)
4. Click **Convert to JPG**
5. Each page downloads as a separate JPG file

## How to Convert PDF to PNG on Breklo

1. Go to [Breklo's PDF to PNG converter](/pdf-to-png)
2. Upload your PDF
3. Click **Convert to PNG**
4. Each page downloads as a separate lossless PNG file

## What Resolution Are the Output Images?

Both tools render pages at 2× scale. A standard A4 PDF page (595×842 points) becomes a 1190×1684 pixel image — suitable for printing, sharing and embedding.

## Converting a Single Page

If you only need one page from a multi-page PDF, use [Extract PDF Pages](/extract-pdf-pages) first to pull out that single page, then convert the one-page PDF to an image.

## After Converting: Optimise for Web

If you are using the images on a website, [compress them](/compress-image) or [convert to WebP](/jpg-to-webp) for the smallest possible file size.
    `.trim(),
    faq: [
      { q: 'Does the PDF to image converter work on scanned PDFs?', a: 'Yes. Scanned PDFs are already image-based, so conversion works the same way — each page renders as a JPG or PNG.' },
      { q: 'How many pages can I convert at once?', a: 'There is no page limit. All pages are converted and download as separate image files.' },
      { q: 'What is the resolution of the output images?', a: 'Pages render at 2× scale. An A4 page becomes approximately 1190×1684 pixels, suitable for printing and high-quality sharing.' },
      { q: 'Can I convert just one specific page?', a: 'Use the Extract PDF Pages tool first to pull out the page you need, then convert the single-page PDF to an image.' },
      { q: 'Will the text be readable in the converted image?', a: 'Yes. The 2× render scale produces sharp, readable text in both JPG and PNG output.' },
      { q: 'Is PDF to image conversion free?', a: 'Yes, completely free with no page limits and no signup required.' },
    ],
  },
  {
    slug: 'how-to-convert-heic-to-jpg-windows',
    title: 'How to Convert HEIC to JPG on Windows 10 and 11 (Free)',
    description: 'Open and convert HEIC photos from iPhone on Windows 10 or 11. Free methods including online tools and the Microsoft Store extension.',
    date: '2025-08-12',
    category: 'Image Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'HEIC to JPG', slug: 'heic-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'JPG to PNG', slug: 'jpg-to-png' },
    ],
    content: `
## Why HEIC Files Won't Open on Windows

HEIC is Apple's photo format, introduced in iOS 11. Windows does not natively support HEIC — trying to open one shows an error or a blank image.

There are three free solutions, each with different trade-offs.

## Method 1: Online Converter (Fastest, No Install)

The quickest fix requires no downloads at all:

1. Open [Breklo's HEIC to JPG converter](/heic-to-jpg) in any browser
2. Drop your HEIC files onto the page
3. Adjust quality if needed (90% is excellent)
4. Click **Convert**
5. Your JPG files download immediately

Works on Windows 10 and 11, any browser. Process multiple HEIC files at once.

## Method 2: Microsoft HEIF Image Extensions (Free from Microsoft Store)

Microsoft offers a free extension that lets Windows open HEIC files natively:

1. Open the **Microsoft Store** on Windows
2. Search for **HEIF Image Extensions** (by Microsoft)
3. Click **Get** — it's free
4. After installing, Windows Photos and Paint can open HEIC files
5. Right-click any HEIC → **Open with Photos** → **Save a copy** (as JPG)

This is the best solution if you regularly receive HEIC files from iPhone users. Once installed, HEIC files open like any other image.

**Note:** Some users find they also need the **HEVC Video Extensions** (also in the Microsoft Store — may cost a small fee) for full compatibility.

## Method 3: Rename and Open in Paint (Sometimes Works)

A quick trick that sometimes works:

1. Make a copy of the HEIC file
2. Rename it from \`.heic\` to \`.jpg\`
3. Try opening in Paint or Photos

This only works for some HEIC files and is unreliable. The online converter or Microsoft extension are more dependable.

## Batch Converting HEIC to JPG on Windows

If you have dozens of HEIC photos from an iPhone backup:

1. Go to [Breklo's HEIC to JPG converter](/heic-to-jpg)
2. Drop all files at once
3. All files convert together and download individually

## How to Stop iPhone Saving Photos as HEIC

If you prefer your iPhone to save photos as JPG by default:

1. On iPhone: **Settings → Camera → Formats**
2. Select **Most Compatible**

Future photos will be saved as JPG instead of HEIC.
    `.trim(),
    faq: [
      { q: 'Why can\'t Windows open HEIC files?', a: 'HEIC is Apple\'s format and Windows does not support it natively. Install the free HEIF Image Extensions from the Microsoft Store, or convert the files to JPG using an online tool.' },
      { q: 'Is the HEIF Image Extensions free on Windows?', a: 'Yes, the HEIF Image Extensions from Microsoft are free in the Microsoft Store. They allow Windows Photos and Paint to open HEIC files directly.' },
      { q: 'Can I convert multiple HEIC files to JPG at once on Windows?', a: 'Yes. Use Breklo\'s HEIC to JPG converter — drop multiple files and they all convert together.' },
      { q: 'What is the best way to convert HEIC to JPG on Windows without software?', a: 'Use Breklo\'s online HEIC to JPG converter in any browser. No download, no installation, works immediately.' },
      { q: 'Will the converted JPG have the same quality as the HEIC?', a: 'At 90% quality, the JPG is visually identical to the HEIC original in normal viewing. There is a minimal quality difference that is invisible on screen.' },
      { q: 'How do I make my iPhone save photos as JPG instead of HEIC?', a: 'Go to Settings → Camera → Formats on your iPhone and select Most Compatible. This makes the camera save photos as JPG.' },
    ],
  },
  {
    slug: 'how-to-split-pdf-into-pages',
    title: 'How to Split a PDF into Individual Pages (Free, Online)',
    description: 'Split a PDF so each page becomes its own file. Free online tool — no software, no signup, works on any device.',
    date: '2025-08-14',
    category: 'PDF Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Extract PDF Pages', slug: 'extract-pdf-pages' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    content: `
## Why Split a PDF Into Individual Pages?

There are many practical reasons to separate a PDF into single-page files:

- You need to send specific pages to different people
- A form has individual pages that need to be filled and returned separately
- You want to rearrange pages by editing them individually first
- A client needs only their relevant pages from a combined report
- You are uploading pages to a system that accepts one page at a time

## How to Split a PDF Into Individual Pages on Breklo

1. Go to [Breklo's Split PDF tool](/split-pdf)
2. Upload your PDF
3. Select **Split all pages** mode
4. Click **Split PDF**
5. Each page downloads as a separate PDF file automatically

A 10-page PDF produces 10 individual PDF files, each named with its page number. Downloads happen one after another automatically.

## How to Extract Just Specific Pages

If you only need certain pages rather than all of them, use the **Extract page range** mode instead:

1. Select **Extract page range** in the Split PDF tool
2. Enter the pages you want: \`1,4,7\` or \`3-8\` or \`1,5,9-12\`
3. Click **Split PDF**
4. One PDF containing those pages downloads

Or use the dedicated [Extract PDF Pages](/extract-pdf-pages) tool which is designed specifically for this.

## Splitting PDFs on Mac Without Software

In Preview on Mac, you can save individual pages:

1. Open the PDF in Preview
2. Go to **View → Thumbnails**
3. Click a page in the thumbnail panel
4. Go to **File → Export as PDF**
5. Save the page

Repeat for each page you need. For many pages, the online tool is much faster.

## What to Do With Individual Pages

Once you have individual page PDFs, you might want to:

- [Rotate any sideways pages](/rotate-pdf)
- [Merge them back together in a different order](/merge-pdf)
- [Compress them](/compress-pdf) before sending by email
    `.trim(),
    faq: [
      { q: 'How do I split a PDF into separate pages?', a: 'Use Breklo\'s Split PDF tool, choose Split all pages mode, and click Split. Each page downloads as a separate PDF file.' },
      { q: 'Is there a page limit for splitting?', a: 'No. You can split PDFs of any length. Each page becomes its own PDF file.' },
      { q: 'Will splitting affect the quality of the pages?', a: 'No. Pages are copied directly without re-rendering. All content is preserved exactly.' },
      { q: 'How do I split a PDF on my phone?', a: 'Open Breklo in Safari or Chrome on your phone, upload the PDF from your Files app, and use the Split PDF tool. The files download to your phone.' },
      { q: 'What is the difference between Split PDF and Extract PDF Pages?', a: 'Split PDF with Split all pages creates one file per page. Extract PDF Pages creates one new PDF containing only the specific pages you choose.' },
      { q: 'Can I split a large PDF?', a: 'Yes. Breklo supports PDFs up to 100 MB. All processing happens in your browser.' },
    ],
  },
  {
    slug: 'how-to-convert-image-to-jpg',
    title: 'How to Convert Any Image to JPG Online Free (PNG, WebP, GIF, HEIC)',
    description: 'Convert PNG, WebP, GIF, HEIC and other image formats to JPG online for free. Batch convert multiple images at once — no signup needed.',
    date: '2025-08-16',
    category: 'Image Tools',
    readTime: '3 min',
    relatedTools: [
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
      { name: 'HEIC to JPG', slug: 'heic-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## Why Convert Images to JPG?

JPG is the most universally compatible image format. Every device, app, website and operating system supports it without any extensions or plugins.

Convert to JPG when:

- You need to attach an image to an email and want the smallest file size
- A website or form only accepts JPG uploads
- You want to share photos across different platforms and devices
- You have PNG, WebP or HEIC files that some recipients cannot open

## Converting Different Formats to JPG

### PNG to JPG

PNG files are lossless and typically larger than JPG. Converting to JPG significantly reduces file size (often 70–80% smaller) with minimal visible quality loss.

Go to [PNG to JPG](/png-to-jpg) — upload your PNG files and download JPGs instantly.

**Note:** Transparent areas in PNG files will be filled with a white background in the JPG.

### WebP to JPG

WebP is a modern format not supported by all email clients and older software. Converting to JPG ensures maximum compatibility.

Go to [Compress Image](/compress-image) — upload your WebP file and it will output as JPG.

### HEIC to JPG

iPhone photos saved as HEIC do not open on Windows or most non-Apple devices. Converting to JPG solves this instantly.

Go to [HEIC to JPG](/heic-to-jpg) — the dedicated converter handles HEIC and HEIF files.

### GIF to JPG

For static GIF images, converting to JPG gives you full colour (GIF is limited to 256 colours) and a more compact file for photos.

Go to [GIF to JPG](/gif-to-jpg) — converts the first frame to a full-colour JPG.

## Batch Converting Multiple Images to JPG

All Breklo image tools support multiple files at once. Drop all your files — even a mix of formats — and download the JPG results together.

## JPG Quality Settings

When converting to JPG, a quality setting of **85–92%** gives excellent results. The visual difference from the original is invisible at screen resolution, but file sizes are 50–70% smaller than at maximum quality.
    `.trim(),
    faq: [
      { q: 'Can I convert PNG, WebP and HEIC to JPG on the same tool?', a: 'Different source formats use different tools on Breklo. Use PNG to JPG for PNG files, HEIC to JPG for iPhone photos, and Compress Image for WebP files. Each tool is optimised for its input format.' },
      { q: 'What happens to transparent backgrounds when converting to JPG?', a: 'JPG does not support transparency. Transparent areas are filled with white. If you need to preserve transparency, use PNG or WebP format instead.' },
      { q: 'What quality setting is best for converting to JPG?', a: '90% quality gives excellent results — visually indistinguishable from the original with files typically 50–70% smaller than maximum quality.' },
      { q: 'Can I convert multiple images to JPG at once?', a: 'Yes. All Breklo image conversion tools accept multiple files at once and process them together.' },
      { q: 'Is converting images to JPG free?', a: 'Yes. All image conversion tools on Breklo are completely free with no limits and no signup required.' },
      { q: 'Will the image dimensions change when converting to JPG?', a: 'No. The width and height are preserved exactly. Only the format and file encoding change.' },
    ],
  },
  {
    slug: 'how-to-protect-pdf-from-editing',
    title: 'How to Protect a PDF From Editing and Copying (Free)',
    description: 'Prevent others from editing, copying or modifying your PDF. Free methods for adding permissions and passwords to PDF files.',
    date: '2025-08-18',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Password Protect PDF', slug: 'password-protect-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Types of PDF Protection

PDF protection comes in two forms:

**Open password (User password)** — prevents anyone from opening the document without the password. The strongest form of protection.

**Permissions password (Owner password)** — allows opening but restricts what the reader can do: editing, copying text, printing, etc.

For most use cases, an open password is the most effective protection.

## How to Protect a PDF From Editing on Breklo

[Breklo's Password Protect PDF tool](/password-protect-pdf) adds both an open password and editing restrictions in one step:

1. Go to [Password Protect PDF](/password-protect-pdf)
2. Upload your PDF
3. Enter a password
4. Click **Protect PDF**
5. Download the protected PDF

The protected PDF:
- Cannot be opened without the password
- Cannot be edited or modified
- Cannot have text copied from it
- Can still be printed (printing remains enabled)

## How Effective Is PDF Protection?

PDF protection prevents casual editing but is not unbreakable. Determined users with the right software can sometimes bypass permissions. For truly sensitive documents, consider:

- Using a strong, unique password
- Sharing only with trusted recipients
- Not including sensitive data in PDFs if possible

For business and personal use, password protection is more than sufficient to prevent accidental or casual modification.

## Protecting PDFs in Microsoft Word

When saving a Word document as PDF, you can add protection in the export dialog:

1. Go to **File → Save As → PDF**
2. Click **Options** (Windows) or **More options** (Mac)
3. Check **Encrypt the document with a password**
4. Enter a password

## Protecting PDFs in Preview on Mac

1. Open the PDF in Preview
2. **File → Export as PDF**
3. Click **Permissions**
4. Check editing and copying restrictions
5. Set a permissions password

## What About Watermarking?

If you need to track who shared a document, adding a visible watermark is more effective than password protection. Watermark tools add text or images to each page that remain visible in screenshots and printouts.
    `.trim(),
    faq: [
      { q: 'Can I prevent someone from copying text from my PDF?', a: 'Yes. Adding a permissions password with copying disabled prevents standard text copying in PDF readers. Note that screen screenshots can still capture text visually.' },
      { q: 'What is the difference between an open password and a permissions password?', a: 'An open password prevents anyone from opening the document without it. A permissions password allows opening but restricts actions like editing, copying and printing. For strong protection, use an open password.' },
      { q: 'Can someone bypass PDF password protection?', a: 'Strong passwords with AES encryption are very difficult to bypass. However, permissions-only protection (no open password) can be removed with some PDF tools. For maximum security, use an open password.' },
      { q: 'Does protecting a PDF affect its file size?', a: 'Only very slightly. The encryption adds a small amount of data to the file structure.' },
      { q: 'Can I add protection to a PDF that is already password protected?', a: 'You would need to open it first (with the existing password), then re-save with the new protection settings.' },
      { q: 'Is PDF password protection free on Breklo?', a: 'Yes, completely free with no limits and no signup required. Processing happens in your browser.' },
    ],
  },
];

export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug) || null;
}

export function getAllSlugs() {
  return posts.map(p => p.slug);
}
