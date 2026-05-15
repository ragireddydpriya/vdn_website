import { ImgHTMLAttributes, useState } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
}

/**
 * SEO-optimized image component with:
 * - Lazy loading for performance
 * - ALT text for accessibility & SEO
 * - Fade-in animation on load
 * - Mobile-friendly responsive behavior
 */
export function OptimizedImage({
  src,
  alt,
  placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect fill='%23f0f0f0' width='16' height='16'/%3E%3C/svg%3E",
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-50"
      }`}
      {...props}
    />
  );
}
