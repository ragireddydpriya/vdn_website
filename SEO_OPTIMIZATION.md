# On-Page SEO Optimization Guide

## ✅ Completed Optimizations

### 1. Title Tag & Meta Description
Your index.html now has:
- **Title**: "Premium Landscaping & Garden Design in Hyderabad | VDN Landscapes" (59 characters)
  - ✅ Includes main keyword (landscaping, Hyderabad)
  - ✅ Compelling and clickable
  - ✅ Under 60 character limit

- **Meta Description**: "Transform your outdoor spaces with VDN Landscapes. Premium landscape design, garden maintenance, plants & nursery services in Hyderabad. 20+ years experience."
  - ✅ Includes keywords
  - ✅ Calls to action
  - ✅ Professional tone

### 2. Heading Structure (H1, H2, H3)
**Implementation Rules:**
```tsx
// ✅ CORRECT - One H1 per page (in Hero section)
<h1>Your main heading here</h1>

// ✅ CORRECT - Multiple H2s for sections
<h2>Services Section</h2>
<h2>Products Section</h2>

// ✅ CORRECT - H3s for subsections
<h3>Service category</h3>
```

**Audit your components:**
- [x] Hero.tsx - Already has H1
- [ ] Services.tsx - Check for proper H2 headings
- [ ] CategoryShowcase.tsx - Ensure H2 for "Shop by Category"
- [ ] Projects.tsx - Use H2 for main title

---

### 3. URL Structure
Your current setup:
```
❌ /index.html (not ideal for static)
✅ / (homepage)
✅ /products (clean)
❌ /#section-name (hash-based routing - consider cleaning)
```

**Improvement for future pages:**
```
✅ vdnlandscapes.in/products
✅ vdnlandscapes.in/services/landscape-design
✅ vdnlandscapes.in/blog/garden-tips
❌ vdnlandscapes.in/page?id=123
❌ vdnlandscapes.in/#products
```

---

### 4. Image Optimization with ALT Text

**Complete ALT text checklist:**

- [x] Hero image: "Beautiful landscaped garden"
- [x] CategoryShowcase: "{category.name}" (dynamic)

**Images still needing ALT text:**

#### Services.tsx
```tsx
// Update images in service gallery with descriptive ALTs
<img 
  src={imagePath}
  alt="Professional landscape design showing lush green garden with stone pathways" // ✅ Good
/>
```

#### ProductCard.tsx
```tsx
// Should include product type and key features
<img 
  alt="Indoor potted plants for living room decoration" // ✅ Good
/>
```

#### Projects.tsx
```tsx
// Include project type and location
<img 
  alt="Terrace garden project with vertical green walls in Hyderabad" // ✅ Good
/>
```

**ALT text best practices:**
- Describe the image accurately
- Include relevant keywords naturally
- Keep under 125 characters
- Don't start with "image of" or "picture of"
- Avoid keyword stuffing

---

## 5. Structured Data (JSON-LD Schema)

**Implemented:**
✅ Organization Schema (in use-seo.ts)
✅ LocalBusiness Schema
✅ Product Schema helper
✅ Breadcrumb Schema helper

**Usage Example:**
```tsx
import { useSEO, createProductSchema } from "@/hooks/use-seo";

export function ProductPage({ product }) {
  useSEO({
    title: `${product.name} | VDN Landscapes`,
    description: product.description,
    schema: createProductSchema(product),
  });
  
  return <div>...</div>;
}
```

---

## 6. Meta Tags Reference

### HTML Head Tags (Already set in index.html)
```html
<!-- Primary -->
<title>Your Page Title (< 60 chars)</title>
<meta name="description" content="Your description (< 160 chars)">
<meta name="keywords" content="keyword1, keyword2, keyword3">

<!-- Canonical (prevents duplicate content) -->
<link rel="canonical" href="https://vdnlandscapes.in">

<!-- Open Graph (for social sharing) -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

---

## 7. Keywords Target Map

**Primary Keywords (Priority):**
- "landscape design Hyderabad"
- "garden maintenance"
- "plants nursery Hyderabad"
- "landscaping services"

**Secondary Keywords:**
- "drip irrigation systems"
- "terrace garden design"
- "vertical gardens"
- "lawn installation"
- "indoor plants"

**Implementation in content:**
- Page titles (1-2 keywords)
- Meta descriptions (1-2 keywords)
- H1 heading (1 main keyword)
- Body content (naturally scattered)
- Image ALT text (1 keyword where relevant)

---

## Action Checklist

### Immediate (High Priority)
- [ ] Add ALT text to all images in Services.tsx
- [ ] Add ALT text to all images in ProductCard.tsx  
- [ ] Add ALT text to all images in Projects.tsx
- [ ] Verify each page has proper H1/H2 structure
- [ ] Test sitemap generation

### Short-term (1 week)
- [ ] Compress all images to improve performance
- [ ] Add breadcrumb schema to product/service pages
- [ ] Create individual page titles for /products
- [ ] Add FAQ schema markup

### Medium-term (2-4 weeks)
- [ ] Create /sitemap.xml
- [ ] Add blog/resources section with keyword-rich content
- [ ] Implement internal linking strategy
- [ ] Monitor Google Search Console for impressions

---

## SEO Hooks Available

### useSEO() Hook
```tsx
import { useSEO } from "@/hooks/use-seo";

useSEO({
  title: "Page Title",
  description: "Meta description",
  keywords: "comma, separated, keywords",
  image: "og-image-url",
  url: "https://vdnlandscapes.in/page",
  published: "2024-01-01T00:00:00Z",
  updated: "2024-04-08T00:00:00Z",
  schema: createOrganizationSchema(),
});
```

### Schema Helpers
```tsx
import {
  createOrganizationSchema,
  createLocalBusinessSchema,
  createProductSchema,
  createBreadcrumbSchema,
} from "@/hooks/use-seo";
```

---

## Performance & SEO Connection

**Page Speed = SEO Ranking**
- LCP < 2.5s (required for good SEO)
- FCP < 1.8s
- CLS = 0 (no layout shift)

See PERFORMANCE_OPTIMIZATION.md for detailed improvements.

---

## Testing & Monitoring

### Test SEO Implementation
1. **Rich Results Test**: https://search.google.com/test/rich-results
   - Paste your homepage URL
   - Verify schema markup shows correctly

2. **Mobile Friendly Test**: https://search.google.com/mobile-friendly-test
   - Ensure layout is responsive

3. **Meta Tags Preview**: Use online SEO preview tools
   - Check title/description display

### Monitor Rankings
- **Google Search Console**: 
  - Add property at https://search.google.com/search-console
  - Monitor impressions, clicks, rankings

- **Google Analytics**:
  - Track organic traffic
  - Monitor user behavior

---

## Common SEO Mistakes to Avoid

❌ **Multiple H1s per page** (should be 1)
❌ **Missing ALT text on images**
❌ **Title tags > 60 characters** (truncated)
❌ **Meta descriptions > 160 characters** (truncated)
❌ **Keyword stuffing** (sounds unnatural)
❌ **Broken internal links**
❌ **Missing structured data**
❌ **Duplicate content** (without canonical tags)

---

## Next Steps

1. **Run Lighthouse audit** on your live site
2. **Add ALT text** to remaining images
3. **Compress images** (biggest performance impact)
4. **Create Google Search Console account** and submit sitemap
5. **Monitor rankings** for target keywords

This will significantly improve your search visibility and user experience! 📈
