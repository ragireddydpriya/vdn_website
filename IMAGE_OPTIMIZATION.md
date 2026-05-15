# Image Optimization Guide

## Overview
This project uses WebP format with fallback support for faster image loading. The optimization process:
1. Compresses original images (JPG/PNG)
2. Creates WebP versions for modern browsers (30-50% smaller)
3. Keeps original formats as fallback for older browsers

## Performance Impact
- **WebP**: ~75% quality, reduced file size
- **JPG/PNG**: Optimized but kept as fallback
- **Expected savings**: 40-60% reduction in image bandwidth

## How It Works

### Automatic Optimization
The `npm run build` command automatically optimizes images before building:
```bash
npm run build
```

### Manual Optimization (Optional)
To optimize images without building:
```bash
npm run optimize-images
```

## Image Formats

### Browser Support
- **WebP**: Chrome, Firefox, Edge, Safari 16+
- **JPG/PNG**: All browsers (fallback)

Modern browsers automatically use WebP versions through the `<picture>` element in ProductCard.

## Adding New Images

1. Place images in `/public/images/`
2. Supported formats: JPG, PNG
3. Run `npm run build` or `npm run optimize-images`
4. WebP versions are automatically created

## Quality Settings

Edit `scripts/optimize-images.cjs` to adjust quality:

```js
const QUALITY_SETTINGS = {
  webp: {
    quality: 75,      // 0-100 (higher = larger file)
    alphaQuality: 90,  // For transparent images
  },
  jpg: {
    quality: 80,       // 0-100
    progressive: true, // Progressive JPEG
  },
  png: {
    compressionLevel: 9, // 0-9 (higher = slower but smaller)
  },
};
```

## Troubleshooting

### "sharp" package not found
```bash
npm install -D sharp
```

### Images not optimizing
- Check if images are in `/public/images/`
- Ensure proper file extensions (.jpg, .png)
- Run: `npm run optimize-images`

### Large file sizes still
- Reduce quality settings in `scripts/optimize-images.cjs`
- Consider different image compression tools
- Check original image resolution

## Performance Metrics

Before optimization:
- LCP: 12.1s
- Performance Score: 67/100

After optimization (target):
- LCP: <2.5s
- Performance Score: 85+/100

Run lighthouse audit to verify improvements.
