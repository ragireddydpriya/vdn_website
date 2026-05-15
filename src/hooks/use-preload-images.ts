import { useEffect } from "react";

/**
 * Hook to preload multiple images
 * Used for critical images that should load immediately
 */
export const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      // Create link element for resource hint
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      link.fetchPriority = "high";
      document.head.appendChild(link);

      // Also preload WebP version if available
      const webpUrl = url.replace(/\?.*$/, '.webp');
      if (webpUrl !== url) {
        const webpLink = document.createElement("link");
        webpLink.rel = "preload";
        webpLink.as = "image";
        webpLink.href = webpUrl;
        webpLink.type = "image/webp";
        webpLink.fetchPriority = "high";
        document.head.appendChild(webpLink);
      }
    });
  }, [imageUrls]);
};

/**
 * Preload images at app startup
 * Call this from App.tsx or useEffect in root component
 */
export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach((url) => {
    // Preload with Image API
    const img = new Image();
    img.src = url;

    // Also try WebP
    const webpUrl = url.replace(/\?.*$/, '.webp');
    const webpImg = new Image();
    webpImg.src = webpUrl;
  });
};
