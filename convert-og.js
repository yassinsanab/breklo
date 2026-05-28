const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public', 'og-image.svg');
const pngPath = path.join(__dirname, 'public', 'og-image.png');

sharp(fs.readFileSync(svgPath))
  .resize(1200, 630)
  .png()
  .toFile(pngPath)
  .then(() => console.log('Created public/og-image.png at 1200x630'))
  .catch(err => { console.error('Error:', err.message); process.exit(1); });
