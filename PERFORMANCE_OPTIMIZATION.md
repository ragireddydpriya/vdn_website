# Website Performance Optimization Guide

## Current Metrics
- **Performance Score**: 67/100 (Needs Improvement)
- **LCP (Largest Contentful Paint)**: 12.1s → Target: <2.5s
- **FCP (First Contentful Paint)**: 3.1s → Target: <1.8s
- **Speed Index**: 4.6s → Target: <3.4s

## Optimizations Applied ✅

### 1. Code Splitting & Minification
- Vendor libraries chunked separately (React, Framer Motion, Radix UI)
- JavaScript minified with console logs stripped
- Sourcemaps disabled in production

### 2. Cache Headers
- HTML: 1 hour cache
- CSS/JS: 1 year cache (immutable)
- Images: 24 hours cache
- See: `public/_headers`

### 3. Lazy Loading
- Use `OptimizedImage` component for images
- All images use `loading="lazy"`
- Progressive image loading with fade-in effect

## Recommended Next Steps 🚀

### 1. Optimize Images (Biggest Impact)
Your images are too large. Follow these steps:

**For Product/Service Images:**
```bash
# Using imagemin or similar tool
1. Compress JPG/PNG to ~100-300KB per image
2. Create WebP versions for modern browsers
3. Use responsive images with srcset
```

**Example responsive image markup:**
```tsx
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <OptimizedImage
    src="image.jpg"
    alt="Description"
    width={800}
    height={600}
  />
</picture>
```

### 2. Replace Heavy Images with Services
Services like `public/images/services/` - compress these:

```bash
# Recommended tools:
- TinyPNG/TinyJPG (online)
- ImageMagick (CLI)
- Squoosh (Google's tool)
- FFmpeg (video to WebP)

# Targets:
- Landscape images: 150-300KB max
- Product images: 100-200KB max
- Thumbnails: 20-50KB max
```

### 3. Replace Heavy Libraries (Advanced)
```tsx
// BEFORE (inefficient)
import Cropper from 'react-easy-crop';

// AFTER (lightweight alternative)
// Consider removing or lazy-loading non-critical UI libraries
```

### 4. Remove Render-Blocking Resources
In `src/index.css` - check for heavy fonts or styles:

```css
/* Use font-display: swap for faster text rendering */
@font-face {
  font-family: 'Your Font';
  font-display: swap;
  src: url('font.woff2') format('woff2');
}
```

### 5. Enable Dynamic Imports (Code Splitting)
For heavy components:

```tsx
// BEFORE
import Projects from './components/Projects';

// AFTER
const Projects = lazy(() => import('./components/Projects'));

<Suspense fallback={<div>Loading...</div>}>
  <Projects />
</Suspense>
```

## Quick Wins (Do These First)

1. ✅ **Compress all images** (+50-200ms improvement)
   - Use: https://squoosh.app/
   - Save 1-2MB file size

2. ✅ **Update image paths to use OptimizedImage**
   - Already created for you
   - Import and use in ProductCard, Services, Projects, etc.

3. ✅ **Set responsive image dimensions**
   - Add `width` and `height` to images
   - Prevents layout shift

4. ✅ **Lazy load below-the-fold images**
   - Already automatic with `loading="lazy"`

## Tools to Use

| Tool | Purpose |
|------|---------|
| [Squoosh](https://squoosh.app/) | Image compression & format conversion |
| [TinyPNG](https://tinypng.com/) | PNG/JPG optimization |
| [WebPageTest](https://www.webpagetest.org/) | Detailed performance analysis |
| [Lighthouse](chrome://inspect/) | Chrome built-in audits |
| [Bundle Analyzer](https://www.npmjs.com/package/vite-plugin-visualizer) | See what's making your JS large |

## Expected Results After Optimization

- **Performance**: 67 → 85-95 (with image optimization)
- **LCP**: 12.1s → 2-3s (with lazy loading + image compression)
- **FCP**: 3.1s → 1-2s

## File References

- Vite config: `vite.config.ts` (build optimizations added)
- Cache headers: `public/_headers`
- Image component: `src/components/OptimizedImage.tsx`

## Next Deployment

```bash
git add .
git commit -m "perf: optimize build and add image lazy loading"
git push
```

The GitHub Actions workflow will rebuild with these optimizations!

---

**Note**: The biggest performance gain will come from **compressing your images**. Those saved 1,695 KiB would boost your performance score significantly.
