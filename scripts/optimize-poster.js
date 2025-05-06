const sharp = require('sharp');
const path = require('path');

async function optimizePoster() {
  try {
    await sharp('public/poster.jpg')
      .webp({ quality: 80, effort: 6 })
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .toFile('public/images-compressed/hero-poster.webp');
    
    console.log('Poster optimized successfully!');
  } catch (error) {
    console.error('Error optimizing poster:', error);
  }
}

optimizePoster(); 