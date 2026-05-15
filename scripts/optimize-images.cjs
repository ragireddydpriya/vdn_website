#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts JPG/PNG images to WebP format with compression
 * Usage: node scripts/optimize-images.cjs
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');

const QUALITY_SETTINGS = {
  webp: {
    quality: 75,
    alphaQuality: 90,
  },
  jpg: {
    quality: 80,
    progressive: true,
  },
  png: {
    compressionLevel: 9,
  },
};

async function optimizeImage(inputPath, outputPath, format) {
  try {
    let transformer = sharp(inputPath);

    if (format === 'webp') {
      transformer = transformer.webp(QUALITY_SETTINGS.webp);
    } else if (format === 'jpg') {
      transformer = transformer.jpeg(QUALITY_SETTINGS.jpg);
    } else if (format === 'png') {
      transformer = transformer.png(QUALITY_SETTINGS.png);
    }

    await transformer.toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(2);

    console.log(`✓ ${path.relative(PUBLIC_IMAGES_DIR, outputPath)} (${savings}% smaller)`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      // Create WebP version
      const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Skip if WebP already exists and is newer
      if (!fs.existsSync(webpPath) || fs.statSync(webpPath).mtime < stat.mtime) {
        await optimizeImage(fullPath, webpPath, 'webp');
      }

      // Optimize original (in-place)
      const tempPath = fullPath + '.tmp';
      const ext = path.extname(file).toLowerCase();
      const format = ext === '.png' ? 'png' : 'jpg';
      
      await optimizeImage(fullPath, tempPath, format);
      fs.renameSync(tempPath, fullPath);
    }
  }
}

async function main() {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.error(`Images directory not found: ${PUBLIC_IMAGES_DIR}`);
    process.exit(1);
  }

  console.log('🖼️  Starting image optimization...\n');
  
  try {
    await processDirectory(PUBLIC_IMAGES_DIR);
    console.log('\n✅ Image optimization complete!');
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

// Check if sharp is installed
try {
  require('sharp');
} catch (e) {
  console.error('❌ "sharp" package not found. Install it with: npm install -D sharp');
  process.exit(1);
}

main();
