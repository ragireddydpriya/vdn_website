import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  author?: string;
  published?: string;
  updated?: string;
  schema?: Record<string, any>;
}

export function useSEO({
  title,
  description,
  keywords,
  image,
  url = "https://vdnlandscapes.in",
  author = "VDN Landscapes",
  published,
  updated,
  schema,
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    updateMetaTag("description", description);
    if (keywords) updateMetaTag("keywords", keywords);
    
    // Open Graph tags
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:url", url, "property");
    if (image) updateMetaTag("og:image", image, "property");
    
    // Twitter tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    if (image) updateMetaTag("twitter:image", image);
    
    // Article meta tags
    if (published) updateMetaTag("article:published_time", published, "property");
    if (updated) updateMetaTag("article:modified_time", updated, "property");
    updateMetaTag("article:author", author, "property");
    
    // Canonical URL
    updateCanonicalTag(url);
    
    // JSON-LD Schema
    if (schema) {
      updateJsonLd(schema);
    }
  }, [title, description, keywords, image, url, author, published, updated, schema]);
}

function updateMetaTag(
  name: string,
  content: string,
  type: "name" | "property" = "name"
) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${type}="${name}"]`);
  
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(type, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

function updateCanonicalTag(url: string) {
  let tag = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
  
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = "canonical";
    document.head.appendChild(tag);
  }
  
  tag.href = url;
}

function updateJsonLd(schema: Record<string, any>) {
  // Remove existing JSON-LD
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }
  
  // Add new JSON-LD
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

// Helper to create Organization schema
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VDN Landscapes",
    url: "https://vdnlandscapes.in",
    logo: "https://vdnlandscapes.in/logo.png",
    description:
      "Premium landscaping, garden design, and nursery services in Hyderabad with 20+ years experience.",
    telephone: "+91 9581012611",
    email: "contact@vdnlandscapes.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  };
}

// Helper to create LocalBusiness schema
export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VDN Landscapes",
    description: "Premium Landscaping & Nursery Services",
    url: "https://vdnlandscapes.in",
    telephone: "+91 9581012611",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "150",
    },
  };
}

// Helper to create Product schema
export function createProductSchema(product: {
  name: string;
  description: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviews || 1,
      },
    }),
  };
}

// Helper to create BreadcrumbList schema
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
