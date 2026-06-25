// 10 NEW blog posts for Breklo — English, mixed angles (how-to, comparison, problem-solving)
// Add these objects to the `posts` array in lib/posts.js (after the existing 8 posts).
// Same structure: slug, title, description, date, category, readTime, relatedTools, content, faq

export const newPosts = [

  /* ───── 1. PROBLEM-SOLVING: PDF too big for email ───── */
  {
    slug: 'pdf-too-large-to-email',
    title: 'PDF Too Large to Email? 5 Ways to Fix It in 2026',
    description: 'Gmail and Outlook reject PDFs over 25 MB. Here are 5 free ways to shrink a PDF so it fits any email — no software, no signup.',
    date: '2026-01-10',
    category: 'PDF Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Split PDF', slug: 'split-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Why Your PDF Won't Send

Email providers cap attachment sizes. Gmail and Outlook both limit attachments to around 25 MB, and many corporate mail servers cut that to 10 MB or even 5 MB. If your PDF is larger, the email bounces or simply won't attach.

The fastest fix is to reduce the file size. Most oversized PDFs can shrink by 50–90% without any visible quality loss.

## Method 1: Compress the PDF (Easiest)

The simplest solution is to compress the PDF directly:

1. Go to [Breklo's Compress PDF tool](/compress-pdf)
2. Drop your PDF onto the page
3. Choose **Medium** for a balance of quality and size, or **High** for the smallest file
4. Download the compressed result

A 30 MB scanned PDF often drops to 3–5 MB on High mode — easily small enough to email.

## Method 2: Split the PDF Into Smaller Files

If the document is genuinely large (like a 200-page report), splitting it into parts can be better than compressing:

1. Use [Split PDF](/split-pdf)
2. Extract page ranges (e.g. pages 1–50, 51–100)
3. Send each section as a separate email

This keeps full quality while making each file small enough to send.

## Method 3: Remove Unnecessary Pages

Many PDFs contain blank pages, cover sheets, or sections the recipient doesn't need. Use [Delete PDF Pages](/delete-pdf-pages) to remove them before sending. Fewer pages means a smaller file.

## Method 4: Convert Images Before They Become a PDF

If you created the PDF from photos, the images are likely the cause. Next time, [compress the images](/compress-image) first, then [convert them to PDF](/jpg-to-pdf). The resulting PDF will be a fraction of the size.

## Method 5: Use a Cloud Link Instead

If nothing else works, upload the PDF to a cloud service (Google Drive, Dropbox) and email the share link instead of the file. But for most cases, compression alone solves the problem.

## Which Method Should You Use?

| Situation | Best method |
|---|---|
| Scanned document | Compress (High mode) |
| Very long report | Split into sections |
| Photos turned into PDF | Compress images first |
| Has extra pages | Delete unwanted pages |

For 90% of cases, [compressing the PDF](/compress-pdf) is all you need.
    `.trim(),
    faq: [
      { q: 'What is the maximum PDF size for Gmail?', a: 'Gmail allows attachments up to 25 MB. If your PDF is larger, Gmail automatically suggests uploading to Google Drive and sending a link instead.' },
      { q: 'How do I make a PDF smaller to email it?', a: 'The easiest way is to compress it. Use a free tool like Breklo\'s Compress PDF, choose Medium or High mode, and download the smaller file. Most PDFs shrink by 50–90%.' },
      { q: 'Will compressing a PDF for email reduce quality?', a: 'Medium mode keeps quality high and is unnoticeable for most documents. High mode reduces quality slightly for maximum size reduction — ideal for scanned documents.' },
      { q: 'Can I email a PDF larger than 25 MB?', a: 'Not as a direct attachment on Gmail or Outlook. You either need to compress it below the limit, split it into smaller files, or share it via a cloud link.' },
      { q: 'Is it safe to compress a confidential PDF online?', a: 'With Breklo, yes. All compression happens in your browser — the file never uploads to any server, so confidential documents stay private.' },
    ],
  },

  /* ───── 2. COMPARISON: Breklo vs iLovePDF vs SmallPDF ───── */
  {
    slug: 'best-free-pdf-tools-compared',
    title: 'Best Free PDF Tools in 2026: iLovePDF vs SmallPDF vs Breklo',
    description: 'A no-nonsense comparison of the top free online PDF tools in 2026 — pricing, privacy, limits and features compared side by side.',
    date: '2026-01-14',
    category: 'PDF Tools',
    readTime: '6 min',
    relatedTools: [
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
      { name: 'Edit PDF', slug: 'edit-pdf' },
    ],
    content: `
## The State of Free PDF Tools in 2026

There are dozens of online PDF tools, but most "free" options come with catches: daily limits, watermarks, file size caps, or — most concerning — uploading your documents to their servers. This guide compares the three most popular options honestly.

## Privacy: Where Your Files Actually Go

This is the biggest difference between tools, and most people never check it.

| Tool | File processing | Files uploaded to server? |
|---|---|---|
| iLovePDF | Server-side | Yes |
| SmallPDF | Server-side | Yes |
| Breklo | In your browser | No |

iLovePDF and SmallPDF upload your files to their servers to process them, then delete them later. Breklo processes everything locally in your browser using WebAssembly — your files never leave your device. For confidential documents, this matters.

## Pricing and Limits

| Tool | Free tier | Paid plan |
|---|---|---|
| iLovePDF | 2 tasks/hour free | ~$7/month |
| SmallPDF | 2 documents/day free | ~$12/month |
| Breklo | Unlimited, free | No paid plan |

iLovePDF and SmallPDF restrict free users to a couple of tasks before pushing you to a subscription. Breklo has no daily limits and no paid tier — it's free because it runs on your device, not their servers.

## Features Compared

All three handle the core tasks: compress, merge, split, convert. Here's where they differ:

- **iLovePDF** — the most features, including OCR and some server-only conversions. Polished but limited on the free tier.
- **SmallPDF** — clean interface, strong on conversions, aggressive upsells.
- **Breklo** — covers 34 tools including a full in-browser PDF editor; everything free, but server-only features (like OCR) aren't available yet since it's browser-based.

## Which Should You Choose?

- **For privacy and unlimited free use** → Breklo
- **For occasional use and don't mind uploads** → iLovePDF or SmallPDF free tier
- **For OCR and advanced server features** → iLovePDF paid

If you mostly compress, merge, convert, and edit PDFs and care about keeping files private, a browser-based tool like [Breklo](/compress-pdf) covers it without limits or subscriptions.

## The Bottom Line

The "best" tool depends on what you value. If it's privacy and no limits, browser-based wins. If it's the widest feature set regardless of uploads, the established server-based tools still lead on a few advanced features.
    `.trim(),
    faq: [
      { q: 'What is the best free PDF tool in 2026?', a: 'It depends on your priority. For unlimited free use with privacy, browser-based tools like Breklo are best. For the widest feature set, iLovePDF leads but limits free users.' },
      { q: 'Are online PDF tools safe to use?', a: 'It varies. Server-based tools (iLovePDF, SmallPDF) upload your files to their servers. Browser-based tools (Breklo) process files locally, so they never leave your device — safer for confidential documents.' },
      { q: 'Is iLovePDF really free?', a: 'iLovePDF has a free tier limited to about 2 tasks per hour. Heavier use requires a paid subscription of around $7/month.' },
      { q: 'Does SmallPDF have a daily limit?', a: 'Yes, SmallPDF\'s free tier limits you to about 2 documents per day before requiring a paid plan.' },
      { q: 'Which PDF tool does not upload my files?', a: 'Breklo processes all files in your browser using WebAssembly, so files are never uploaded to a server. This makes it the most private option for sensitive documents.' },
    ],
  },

  /* ───── 3. HOW-TO: Sign a PDF ───── */
  {
    slug: 'how-to-sign-a-pdf-online',
    title: 'How to Sign a PDF Online Free (Without Printing)',
    description: 'Add your signature to a PDF without printing or scanning. Draw or type your signature online for free — works on phone and desktop.',
    date: '2026-01-18',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Edit PDF', slug: 'edit-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## The Old Way vs the New Way

The traditional way to sign a document is painful: print it, sign with a pen, scan it back, and email it. That requires a printer, a scanner, and ten minutes you don't have.

The modern way takes 30 seconds and works entirely in your browser — no printer, no scanner, no app.

## How to Sign a PDF on Breklo

1. Go to [Breklo's PDF editor](/edit-pdf)
2. Upload your PDF
3. Click the **Signature** tool
4. Either:
   - **Draw** your signature with your mouse, trackpad, or finger (on touch devices)
   - **Type** your name and choose a handwriting-style font
5. Place the signature where it belongs and resize it to fit
6. Click **Download**

The signature is saved as a transparent overlay, so it sits cleanly on the document without a white box around it.

## Drawing vs Typing Your Signature

**Drawing** gives the most authentic look — it's your actual signature. On a phone or tablet, drawing with your finger works surprisingly well. The Breklo editor captures at high resolution so the signature stays crisp.

**Typing** is faster and more legible. Choose from handwriting fonts like Dancing Script or Great Vibes for a signature-like appearance. This is ideal when you need something quick and readable.

## Is an Electronic Signature Legal?

In most countries — including the US (ESIGN Act), EU (eIDAS), and UK — electronic signatures are legally binding for the vast majority of documents. Contracts, agreements, and forms can all be signed electronically.

A few document types (wills, some property deeds) may still require a handwritten signature depending on your jurisdiction. When in doubt, check local requirements.

## Signing on Your Phone

The Breklo editor works on mobile browsers. Open the [PDF editor](/edit-pdf) on your phone, upload the PDF from your files, draw your signature with your finger, and download. No app installation needed.

## After Signing

Once signed, you might want to:
- [Compress the PDF](/compress-pdf) if it's large before emailing
- [Merge it](/merge-pdf) with other documents
- Add text fields or dates with the same [PDF editor](/edit-pdf)
    `.trim(),
    faq: [
      { q: 'How do I sign a PDF without printing it?', a: 'Use an online PDF editor like Breklo. Upload the PDF, use the Signature tool to draw or type your signature, place it on the document, and download — no printer or scanner needed.' },
      { q: 'Is signing a PDF online legally binding?', a: 'In most countries, electronic signatures are legally binding for contracts, agreements, and forms under laws like the US ESIGN Act and EU eIDAS. Some document types may still require handwritten signatures.' },
      { q: 'Can I sign a PDF on my phone?', a: 'Yes. Breklo\'s PDF editor works in mobile browsers. You can draw your signature with your finger and download the signed PDF without installing an app.' },
      { q: 'Will my signature have a white box around it?', a: 'No. Signatures are saved as transparent overlays, so they sit cleanly on the document without any background box.' },
      { q: 'Is it safe to sign a confidential PDF online?', a: 'With Breklo, yes. The PDF is processed entirely in your browser and never uploaded to a server, keeping confidential documents private.' },
    ],
  },

  /* ───── 4. PROBLEM-SOLVING: iPhone photos won't open on Windows ───── */
  {
    slug: 'iphone-photos-wont-open-windows',
    title: "iPhone Photos Won't Open on Windows? Here's the Fix",
    description: 'iPhone HEIC photos often won\'t open on Windows. Learn why, and three quick ways to view or convert them so they work everywhere.',
    date: '2026-01-22',
    category: 'Image Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'HEIC to JPG', slug: 'heic-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'Image to PDF', slug: 'image-to-pdf' },
    ],
    content: `
## Why iPhone Photos Won't Open

Since iOS 11, iPhones save photos in HEIC format by default. HEIC produces great quality at about half the file size of JPG — but Windows doesn't support it out of the box. When you transfer iPhone photos to a Windows PC, they may show as blank icons or refuse to open.

This is one of the most common frustrations for people who use an iPhone but a Windows computer.

## Fix 1: Convert HEIC to JPG (Recommended)

The cleanest solution is to convert the photos to JPG, which opens on everything:

1. Go to [Breklo's HEIC to JPG converter](/heic-to-jpg)
2. Drop your HEIC files onto the page (you can do many at once)
3. Click convert
4. Download the JPG files

The conversion happens in your browser, so your photos never upload anywhere. The JPGs open instantly on Windows, Android, and any photo app.

## Fix 2: Install the HEIF Extension on Windows

Windows can open HEIC files if you install a codec:

1. Open the Microsoft Store
2. Search for **HEIF Image Extensions**
3. Install it (it's free)

After this, the Windows Photos app can open HEIC files. The downside: you'll need to do this on every Windows PC, and some older apps still won't read HEIC.

## Fix 3: Change Your iPhone to Save JPG

To avoid the problem entirely going forward:

1. On your iPhone, open **Settings**
2. Tap **Camera → Formats**
3. Select **Most Compatible**

Your iPhone will now save new photos as JPG instead of HEIC. Note this only affects future photos, not existing ones.

## Which Fix Is Best?

| Situation | Best fix |
|---|---|
| Photos you already have | Convert to JPG |
| Want Windows to open HEIC natively | Install HEIF extension |
| Prevent the problem forever | Change iPhone to JPG |

For photos you need right now, [converting to JPG](/heic-to-jpg) is the fastest and most reliable.

## Bonus: Turn Photos Into a PDF

If you're sending photos for a document (like receipts or ID scans), consider [converting them straight to PDF](/image-to-pdf) instead. One PDF is easier to share than a dozen image files, and it opens on every device.
    `.trim(),
    faq: [
      { q: 'Why won\'t my iPhone photos open on Windows?', a: 'iPhones save photos in HEIC format, which Windows doesn\'t support by default. You need to either convert the photos to JPG or install the HEIF Image Extensions from the Microsoft Store.' },
      { q: 'How do I convert iPhone photos to JPG?', a: 'Use a free converter like Breklo\'s HEIC to JPG tool. Drop your HEIC files in, convert, and download JPGs that open on any device. It works in your browser with no upload.' },
      { q: 'Is there a way to make my iPhone stop saving HEIC?', a: 'Yes. Go to Settings → Camera → Formats and select Most Compatible. New photos will save as JPG, though existing HEIC photos stay as they are.' },
      { q: 'Does converting HEIC to JPG lose quality?', a: 'There\'s a tiny quality reduction since JPG is lossy, but at high quality settings it\'s invisible in normal viewing. HEIC photos are high quality, so the JPG looks excellent.' },
      { q: 'Can I convert many iPhone photos at once?', a: 'Yes. Breklo\'s HEIC to JPG converter accepts batches, so you can convert an entire camera roll in one go.' },
    ],
  },

  /* ───── 5. HOW-TO: Reduce image file size for web ───── */
  {
    slug: 'reduce-image-size-without-losing-quality',
    title: 'How to Reduce Image File Size Without Losing Quality',
    description: 'Shrink JPG, PNG and WebP images for faster websites and smaller emails — without visible quality loss. Free, browser-based guide.',
    date: '2026-01-26',
    category: 'Image Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'Compress Image', slug: 'compress-image' },
      { name: 'Resize Image', slug: 'resize-image' },
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
    ],
    content: `
## The Difference Between "Smaller" and "Lower Quality"

People assume shrinking an image always means making it look worse. It doesn't. Most images contain far more data than the eye can perceive on a screen. Smart compression removes that invisible excess while keeping what you actually see.

There are two levers: **compression** (how much data per pixel) and **dimensions** (how many pixels). Using both correctly shrinks file size dramatically without visible quality loss.

## Step 1: Resize to the Right Dimensions

This is the step most people skip — and it's the biggest one. If your image is 4000 pixels wide but only displays at 800 pixels on your website, you're sending 5x more data than needed.

Use [Resize Image](/resize-image) to bring the dimensions down to what you actually need:
- Website hero images: 1920px wide max
- Blog post images: 1200px wide
- Thumbnails: 400px wide

## Step 2: Compress the Resized Image

Once the dimensions are right, compress to remove excess data:

1. Go to [Compress Image](/compress-image)
2. Drop your image
3. Choose around 75–80% quality (the sweet spot — invisible loss, big savings)
4. Download

A photo resized to 1200px and compressed at 80% often ends up 90% smaller than the original — with no visible difference on screen.

## Step 3: Use WebP for the Web

If the images are for a website, convert them to WebP. It's 25–35% smaller than JPG at the same quality and supported by every modern browser:

- [JPG to WebP](/jpg-to-webp) for photos
- [PNG to WebP](/png-to-webp) for graphics with transparency

## Quality Settings Cheat Sheet

| Use case | Quality | Format |
|---|---|---|
| Website photos | 75–80% | WebP |
| Email attachments | 65–75% | JPG |
| Print | 90–95% | JPG/PNG |
| Thumbnails | 60% | WebP |

## Why This Matters for Websites

Google uses page speed as a ranking factor, and images are usually the biggest thing slowing a page down. Properly sized and compressed images load faster, rank better, and use less mobile data for your visitors.

## The Complete Workflow

1. [Resize](/resize-image) to display dimensions
2. [Compress](/compress-image) at 75–80%
3. [Convert to WebP](/jpg-to-webp) for web use

Three quick steps, and your images go from megabytes to kilobytes with no visible quality loss.
    `.trim(),
    faq: [
      { q: 'How do I reduce image size without losing quality?', a: 'Two steps: resize the image to the dimensions you actually need, then compress at 75–80% quality. This removes invisible excess data while keeping the visible quality intact.' },
      { q: 'What quality setting is best for compression?', a: '75–80% is the sweet spot for most uses — the file gets much smaller while the quality loss stays invisible to the eye. Use 90%+ only for printing.' },
      { q: 'Does resizing an image reduce quality?', a: 'Reducing dimensions to what you actually display does not hurt visible quality — it just removes pixels you weren\'t using. Enlarging an image, however, does reduce quality.' },
      { q: 'Is WebP better than JPG?', a: 'For web use, yes. WebP is 25–35% smaller than JPG at the same quality and is supported by all modern browsers. It\'s the best format for website images.' },
      { q: 'Will compressed images look bad on my website?', a: 'Not at 75–80% quality. The difference from the original is invisible at screen resolution, while the file size drops dramatically.' },
    ],
  },

  /* ───── 6. HOW-TO: Convert PDF to Word (the honest version) ───── */
  {
    slug: 'how-to-convert-pdf-to-editable-text',
    title: 'How to Get Editable Text Out of a PDF (Free Methods)',
    description: 'Need to edit a PDF\'s text? Here are the free ways to extract editable text from any PDF and reuse it in Word, Docs or anywhere.',
    date: '2026-01-30',
    category: 'PDF Tools',
    readTime: '5 min',
    relatedTools: [
      { name: 'PDF to Text', slug: 'pdf-to-text' },
      { name: 'Edit PDF', slug: 'edit-pdf' },
      { name: 'PDF to JPG', slug: 'pdf-to-jpg' },
    ],
    content: `
## Why PDFs Are Hard to Edit

PDF stands for Portable Document Format — it was designed to look identical everywhere, which makes it great for sharing but deliberately hard to edit. The text is locked into a fixed layout. To reuse the content, you need to extract it first.

There are two different goals here, and the right method depends on which you want:
1. **Get the text** to paste elsewhere (Word, Docs, email)
2. **Edit the PDF itself** (add or change text on the page)

## Goal 1: Extract the Text

If you just want the words out of the PDF to use somewhere else:

1. Go to [Breklo's PDF to Text tool](/pdf-to-text)
2. Upload your PDF
3. Click convert
4. Download a clean .txt file with all the text

You can then paste this text into Word, Google Docs, or anywhere else and format it however you like. This works on any PDF that contains real text (not scanned images).

## Goal 2: Edit Text Directly on the PDF

If you want to change text on the page itself — fill a form, correct a typo, add a note — use the [PDF editor](/edit-pdf):

1. Upload the PDF
2. Use the **Text** tool to add new text anywhere
3. Cover old text with a white box and type over it if needed
4. Download the edited PDF

This is ideal for filling forms, adding information, or making small corrections.

## What About Scanned PDFs?

If your PDF is a scan (a photo of a document), it contains no actual text — just an image of text. Extracting text from these requires OCR (Optical Character Recognition), which reads the image and converts it to text.

Browser-based tools can't always do OCR reliably yet, so for scanned documents you may need a dedicated OCR service. Alternatively, [convert the PDF to images](/pdf-to-jpg) and retype the small amount you need.

## PDF to Word: The Honest Truth

Many tools promise perfect "PDF to Word" conversion, but the reality is messier. Complex layouts, tables, and columns rarely convert cleanly — you usually spend more time fixing the formatting than you saved.

For most needs, [extracting the text](/pdf-to-text) and reformatting it fresh in Word gives a cleaner result than a messy auto-conversion.

## Quick Reference

| What you want | Best tool |
|---|---|
| Text to paste elsewhere | PDF to Text |
| Edit text on the page | PDF editor |
| Scanned document | OCR service |
| Save pages as images | PDF to JPG |
    `.trim(),
    faq: [
      { q: 'How do I extract text from a PDF for free?', a: 'Use Breklo\'s PDF to Text tool. Upload the PDF, convert, and download a .txt file with all the text. You can then paste it into Word, Google Docs, or anywhere else.' },
      { q: 'Can I edit the text directly in a PDF?', a: 'Yes, with a PDF editor. Breklo\'s editor lets you add text anywhere on the page, and you can cover old text with a white box and type over it for corrections.' },
      { q: 'Why can\'t I get text from a scanned PDF?', a: 'Scanned PDFs are images of text, not real text, so there\'s nothing to extract directly. You need OCR (Optical Character Recognition) to read the image and convert it to text.' },
      { q: 'Is PDF to Word conversion reliable?', a: 'Not always. Complex layouts, tables, and columns often convert messily. For clean results, extracting the text and reformatting it in Word is usually faster than fixing a bad auto-conversion.' },
      { q: 'Does extracting PDF text keep the formatting?', a: 'Plain text extraction gives you the words in reading order but not the visual formatting. You reapply formatting wherever you paste the text.' },
    ],
  },

  /* ───── 7. PROBLEM-SOLVING: Reduce video audio size ───── */
  {
    slug: 'convert-video-to-audio-save-space',
    title: 'How to Turn a Video Into Audio and Save 90% Space',
    description: 'Only need the sound from a video? Convert MP4 to MP3 to shrink the file by 90% — perfect for podcasts, lectures and music. Free guide.',
    date: '2026-02-03',
    category: 'Audio & Video',
    readTime: '4 min',
    relatedTools: [
      { name: 'MP4 to MP3', slug: 'mp4-to-mp3' },
      { name: 'MP4 to WAV', slug: 'mp4-to-wav' },
      { name: 'WAV to MP3', slug: 'wav-to-mp3' },
    ],
    content: `
## When You Only Need the Sound

A lot of video content is really audio content with a picture attached. Podcasts, lectures, interviews, music performances, webinars — for all of these, the video track is just taking up space. Converting to audio-only can cut the file size by 90% or more.

A 500 MB lecture recording becomes a 30 MB MP3. That fits on any phone, streams instantly, and works with any audio player.

## How to Convert Video to Audio

1. Go to [Breklo's MP4 to MP3 converter](/mp4-to-mp3)
2. Upload your video file
3. Choose a bitrate (128 kbps for voice, 192–320 kbps for music)
4. Download the MP3

The conversion happens in your browser — the video never uploads anywhere. It works with MP4, MOV, WebM, and other common formats.

## Why MP3 Is So Much Smaller

Video files store 24–60 images per second plus the audio. Stripping out all those frames and keeping only the audio track removes the vast majority of the data. The audio quality stays identical to the source — you're not losing sound, just discarding the unneeded video.

## Choosing the Right Quality

| Content type | Bitrate | Why |
|---|---|---|
| Podcast, lecture, voice | 128 kbps | Voice doesn't need high bitrate |
| Music, performance | 192–320 kbps | Preserves musical detail |
| Archiving | 320 kbps | Maximum quality |

For spoken content, 128 kbps is plenty and keeps files tiny. For music, go higher.

## Need Lossless Audio Instead?

If you're editing the audio in software like Audacity, you may want uncompressed WAV instead of MP3. Use [MP4 to WAV](/mp4-to-wav) for a lossless extract, then [convert to MP3](/wav-to-mp3) afterward for the final shareable version.

## Common Uses

- Save a webinar as a podcast to listen on your commute
- Extract a song from a concert video
- Turn a video lecture into audio for studying
- Pull a voice memo out of a screen recording

For all of these, [MP4 to MP3](/mp4-to-mp3) is the fastest route.
    `.trim(),
    faq: [
      { q: 'How do I convert a video to audio only?', a: 'Use a tool like Breklo\'s MP4 to MP3 converter. Upload the video, choose a bitrate, and download the MP3. The video track is removed, keeping only the sound.' },
      { q: 'How much smaller is an MP3 than an MP4?', a: 'Typically 90% smaller or more. A 500 MB video often becomes a 30 MB MP3, because removing the video frames discards the vast majority of the data.' },
      { q: 'Does converting video to audio lose sound quality?', a: 'No, the audio quality matches the source. You\'re only removing the video, not the sound. Choose 192–320 kbps for music to preserve full detail.' },
      { q: 'What bitrate should I use for a podcast?', a: '128 kbps is ideal for spoken content like podcasts and lectures. It keeps the file small while sounding clear. Use higher bitrates only for music.' },
      { q: 'Can I convert video to audio on my phone?', a: 'Yes. Breklo works in mobile browsers, so you can convert MP4 to MP3 on your phone without installing an app.' },
    ],
  },

  /* ───── 8. HOW-TO: Scan documents with phone to PDF ───── */
  {
    slug: 'turn-phone-photos-into-pdf',
    title: 'How to Turn Phone Photos Into a Professional PDF',
    description: 'Snap photos of documents with your phone and combine them into one clean PDF. Free, no scanner app needed — works on any phone.',
    date: '2026-02-07',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Image to PDF', slug: 'image-to-pdf' },
      { name: 'JPG to PDF', slug: 'jpg-to-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
    ],
    content: `
## Your Phone Is a Scanner

You don't need a scanner or a dedicated scanning app to digitize documents. Your phone camera plus a free online tool turns photos into a clean, single PDF — perfect for receipts, contracts, forms, and ID documents.

## Step 1: Take Good Photos

A few tips for document photos that look professional:
- Use good, even lighting — natural daylight is best
- Place the document on a contrasting surface (dark document on light table)
- Shoot straight down, not at an angle
- Make sure the whole document is in frame and in focus

## Step 2: Convert Photos to PDF

1. Go to [Breklo's Image to PDF tool](/image-to-pdf)
2. Upload your photos (JPG, PNG, or HEIC from your phone)
3. Drag them into the right order
4. Choose page size (A4 is standard for documents)
5. Download your PDF

Each photo becomes one page. Multiple photos combine into a single multi-page PDF — exactly like a scanned document.

## Step 3: Compress if Needed

Phone photos are high resolution, so a multi-page PDF of photos can be large. If you need to email it, run it through [Compress PDF](/compress-pdf) to bring the size down.

## Why This Beats Scanner Apps

Most phone scanner apps are free to start but push subscriptions, add watermarks, or limit how many documents you can scan. Using your camera plus a free browser tool has none of those limits — and your photos never upload to a company's servers.

## Handling iPhone HEIC Photos

If your iPhone photos are in HEIC format, the [Image to PDF tool](/image-to-pdf) handles them directly — no need to convert first. If you run into issues, [convert HEIC to JPG](/heic-to-jpg) first, then make the PDF.

## Perfect For

- Receipts for expense reports
- Signed contracts to email back
- ID and passport copies for applications
- Handwritten notes to archive
- Forms to submit online

For any of these, [Image to PDF](/image-to-pdf) turns a pile of photos into one tidy document in seconds.
    `.trim(),
    faq: [
      { q: 'How do I turn phone photos into a PDF?', a: 'Use Breklo\'s Image to PDF tool. Upload your photos, arrange them in order, choose a page size, and download. Each photo becomes a page in a single PDF.' },
      { q: 'Do I need a scanner app to digitize documents?', a: 'No. Your phone camera plus a free tool like Image to PDF works just as well, without subscriptions, watermarks, or scan limits.' },
      { q: 'Can I combine multiple photos into one PDF?', a: 'Yes. Add all your photos to the Image to PDF tool and they combine into a single multi-page PDF in the order you arrange them.' },
      { q: 'Does Image to PDF work with iPhone HEIC photos?', a: 'Yes, it handles HEIC directly. If you have any trouble, convert HEIC to JPG first with Breklo\'s converter, then create the PDF.' },
      { q: 'My photo PDF is too big to email. What do I do?', a: 'Run it through Compress PDF. Phone photos are high resolution, so compression can shrink a photo-based PDF significantly for emailing.' },
    ],
  },

  /* ───── 9. COMPARISON: JPG vs PNG vs WebP ───── */
  {
    slug: 'jpg-vs-png-vs-webp',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Use?',
    description: 'Confused about image formats? This 2026 guide explains JPG, PNG and WebP — when to use each, with a simple decision chart.',
    date: '2026-02-11',
    category: 'Image Tools',
    readTime: '6 min',
    relatedTools: [
      { name: 'JPG to WebP', slug: 'jpg-to-webp' },
      { name: 'PNG to JPG', slug: 'png-to-jpg' },
      { name: 'Compress Image', slug: 'compress-image' },
    ],
    content: `
## The Short Answer

- **JPG** — best for photos. Small files, no transparency.
- **PNG** — best for graphics, logos, and anything needing transparency or sharp text.
- **WebP** — best for the web. Smaller than both, supports transparency, works in all modern browsers.

Now the details, so you know *why*.

## JPG: The Photo Format

JPG (or JPEG) uses lossy compression, meaning it throws away some data to achieve small file sizes. For photographs — where the eye can't detect the missing data — this is perfect. A JPG photo is a fraction of the size of an uncompressed image.

**Use JPG for:** photographs, complex images with many colors, hero images, anything where small file size matters and transparency isn't needed.

**Avoid JPG for:** logos, text, graphics with sharp edges (it adds visible artifacts), or anything needing transparency.

## PNG: The Graphics Format

PNG uses lossless compression — it preserves every pixel exactly. It also supports transparency (alpha channel), which JPG can't do. The trade-off is larger file sizes.

**Use PNG for:** logos, icons, screenshots, graphics with text, illustrations, and any image needing a transparent background.

**Avoid PNG for:** photographs (the files become unnecessarily huge compared to JPG).

## WebP: The Modern All-Rounder

WebP, developed by Google, combines the best of both: it does lossy compression like JPG (but smaller) AND supports transparency like PNG. WebP files are typically 25–35% smaller than the equivalent JPG or PNG at the same quality.

**Use WebP for:** basically everything on websites. Every modern browser supports it now.

**The one catch:** some older desktop software and very old browsers don't read WebP, so for files you'll open in legacy apps, JPG or PNG is safer.

## Decision Chart

| Your image is... | Use this format |
|---|---|
| A photo for a website | WebP |
| A photo for printing/email | JPG |
| A logo or icon | PNG (or WebP) |
| A graphic with transparency | PNG or WebP |
| A screenshot | PNG |
| Anything, smallest size for web | WebP |

## Converting Between Formats

You can switch formats anytime with free tools:
- [JPG to WebP](/jpg-to-webp) — shrink web photos
- [PNG to WebP](/png-to-webp) — shrink transparent graphics
- [PNG to JPG](/png-to-jpg) — shrink photos saved as PNG
- [WebP to JPG](/webp-to-jpg) — for compatibility with older software

## The Practical Takeaway

For websites in 2026, convert your images to WebP — it's smaller and faster, which helps your Google ranking. For everything else, use JPG for photos and PNG for graphics. When in doubt, [compress whatever you have](/compress-image) and you'll still see big savings.
    `.trim(),
    faq: [
      { q: 'Is WebP better than JPG and PNG?', a: 'For web use, yes. WebP is 25–35% smaller than JPG or PNG at the same quality and supports transparency. The only downside is some older software doesn\'t read it.' },
      { q: 'When should I use PNG instead of JPG?', a: 'Use PNG for logos, icons, screenshots, graphics with text, and anything needing a transparent background. Use JPG for photographs where small file size matters.' },
      { q: 'Why are my PNG photos so large?', a: 'PNG uses lossless compression, which keeps every pixel but creates big files for photos. Convert photographs to JPG or WebP to shrink them dramatically.' },
      { q: 'Does converting JPG to WebP lose quality?', a: 'At equivalent quality settings, the difference is invisible while the file gets 25–35% smaller. WebP is more efficient than JPG at the same visual quality.' },
      { q: 'Which format is best for a website logo?', a: 'PNG for guaranteed compatibility and transparency, or WebP for a smaller file if you don\'t need to support very old browsers.' },
    ],
  },

  /* ───── 10. PROBLEM-SOLVING: protect a PDF before sending ───── */
  {
    slug: 'how-to-password-protect-a-pdf',
    title: 'How to Password Protect a PDF Before Sending It',
    description: 'Add a password to any PDF before emailing sensitive documents. Free, browser-based, with strong encryption — no software needed.',
    date: '2026-02-15',
    category: 'PDF Tools',
    readTime: '4 min',
    relatedTools: [
      { name: 'Password Protect PDF', slug: 'password-protect-pdf' },
      { name: 'Compress PDF', slug: 'compress-pdf' },
      { name: 'Merge PDF', slug: 'merge-pdf' },
    ],
    content: `
## Why Password Protect a PDF?

When you email a PDF, it can be forwarded, intercepted, or end up in the wrong inbox. For sensitive documents — tax returns, contracts, medical records, financial statements, ID copies — that's a real risk. Adding a password means only someone with the password can open the file, no matter where it ends up.

## How to Add a Password to a PDF

1. Go to [Breklo's Password Protect PDF tool](/password-protect-pdf)
2. Upload your PDF
3. Enter a strong password and confirm it
4. Click Encrypt
5. Download the protected PDF

The encrypted PDF works in every PDF reader — Adobe, Preview, Chrome, mobile apps. The recipient just enters the password to open it.

## What Makes a Strong Password

- At least 12 characters
- Mix uppercase, lowercase, numbers, and symbols
- Avoid dictionary words and personal info (birthdays, names)
- Use a unique password, not one you reuse elsewhere

## How to Share the Password Safely

Never send the password in the same email as the PDF — if that email is compromised, both are exposed. Instead:
- Send the password by text message or a different channel
- Tell them over the phone
- Use a password manager's secure sharing feature

This "two-channel" approach keeps the document secure even if one channel is intercepted.

## Is the Encryption Actually Secure?

Breklo uses AES encryption — the same standard used by banks and governments. As long as your password is strong and shared safely, the document is genuinely protected. A weak password (like "1234") undermines even the best encryption, so choose carefully.

## Privacy During Encryption

With Breklo, the entire encryption process happens in your browser. Your PDF and your password never upload to any server. This matters: a tool that uploads your file to encrypt it has, for a moment, an unencrypted copy of your sensitive document. Browser-based encryption avoids that entirely.

## After Protecting

You can still [compress](/compress-pdf) or [merge](/merge-pdf) PDFs before encrypting them. The usual workflow: assemble and compress the document first, then add the password as the final step before sending.
    `.trim(),
    faq: [
      { q: 'How do I password protect a PDF for free?', a: 'Use Breklo\'s Password Protect PDF tool. Upload your PDF, set a strong password, and download the encrypted file. It uses AES encryption and works in every PDF reader.' },
      { q: 'Is it safe to password protect a PDF online?', a: 'With a browser-based tool like Breklo, yes — the file and password never leave your device. Avoid tools that upload your file to a server, since they briefly hold an unencrypted copy.' },
      { q: 'What encryption does PDF password protection use?', a: 'Breklo uses AES encryption, the same standard used by banks and governments. Combined with a strong password, it provides genuine security.' },
      { q: 'Should I email the password with the PDF?', a: 'No. Send the password through a different channel — text message, phone call, or a password manager — so that if the email is intercepted, the document stays protected.' },
      { q: 'Can the recipient open the protected PDF normally?', a: 'Yes. They just enter the password when opening it. The encrypted PDF works in Adobe, Preview, Chrome, and all standard PDF readers.' },
    ],
  },

];
