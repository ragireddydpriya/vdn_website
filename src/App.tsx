import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import NotFound from "./pages/NotFound.tsx";
import { preloadCriticalImages } from "@/hooks/use-preload-images";

const queryClient = new QueryClient();

const App = () => {
  // Preload critical images on app startup
  useEffect(() => {
    // Preload hero and first product images
    preloadCriticalImages([
      "/images/products/plants/snake-plant.jpg",
      "/images/products/plants/monstera.jpg",
      "/images/projects/garden-1.jpg",
    ]);

    // Also preload service gallery images
    const serviceGalleryImages: string[] = [];
    const serviceNames = [
      "landscape-design",
      "garden-maintenance",
      "lawn-installation",
      "terrace-gardens",
    ];

    for (const service of serviceNames) {
      for (let i = 1; i <= 3; i++) {
        serviceGalleryImages.push(`/images/services/${service}/${i}.jpg`);
      }
    }

    preloadCriticalImages(serviceGalleryImages);

    // Preload category images
    const categoryImages = [
      "/images/categories/plants.jpg",
      "/images/categories/seeds.jpg",
      "/images/categories/pots.jpg",
      "/images/categories/planters.jpg",
    ];

    preloadCriticalImages(categoryImages);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
