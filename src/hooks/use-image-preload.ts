import { useEffect } from "react";

export const useImagePreload = (imageUrl: string) => {
  useEffect(() => {
    if (!imageUrl) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = imageUrl;
    link.fetchPriority = "high";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [imageUrl]);
};

export const preloadImages = (urls: string[]) => {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.fetchPriority = "high";
    document.head.appendChild(link);
  });
};
