import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TreePine, Flower2, Building2, Droplets, Sun, Palette, Shovel, Leaf, Truck, Users, Gift, X } from "lucide-react";
import { getImagePath } from "@/lib/utils";

// Service gallery images are loaded from: public/images/services/<service-slug>/
// Add 5-10 .jpg images per folder. Name them: 1.jpg, 2.jpg, 3.jpg, etc.
// The component will try to load up to 10 images per service.

const services = [
  {
    icon: TreePine,
    title: "Landscape Design & Execution",
    slug: "landscape-design",
    desc: "Custom garden designs that blend aesthetics with functionality. From concept to completion.",
  },
  {
    icon: Flower2,
    title: "Garden Development & Maintenance",
    slug: "garden-maintenance",
    desc: "Regular upkeep services to keep your garden lush, healthy, and beautiful year-round.",
  },
  {
    icon: Sun,
    title: "Lawn Installation",
    slug: "lawn-installation",
    desc: "Natural and artificial lawn installation for pristine green spaces that last.",
  },
  {
    icon: Palette,
    title: "Terrace & Balcony Gardens",
    slug: "terrace-gardens",
    desc: "Maximize small spaces with vertical gardens, planters, and creative green solutions.",
  },
  {
    icon: Droplets,
    title: "Drip Irrigation Systems",
    slug: "drip-irrigation",
    desc: "Smart automated irrigation setups for efficient water management and plant health.",
  },
  {
    icon: Leaf,
    title: "Vertical Gardens",
    slug: "vertical-gardens",
    desc: "Living walls and vertical green installations for modern spaces.",
  },
  {
    icon: Shovel,
    title: "Hardscaping & Water Features",
    slug: "hardscaping",
    desc: "Pathways, stones, decking, fountains, and water features for stunning outdoor aesthetics.",
  },
  {
    icon: Building2,
    title: "Drain Cell & Red Soil Supply",
    slug: "drain-cell",
    desc: "Drain cell supply & installation, red soil, and plant nutrient supply for healthy landscapes.",
  },
  {
    icon: Users,
    title: "Skilled Labour",
    slug: "skilled-labour",
    desc: "Experienced, trained landscaping workforce for projects of all scales.",
  },
  {
    icon: Truck,
    title: "Indoor Plants Supply & Maintenance",
    slug: "indoor-plants-supply",
    desc: "Premium indoor plant supply with regular maintenance services for homes and offices.",
  },
  {
    icon: Gift,
    title: "Corporate Bulk Supply & Gifts",
    slug: "corporate-bulk",
    desc: "Pan-India corporate bulk plant supply and curated green gift solutions.",
  },
];

// Gallery image component with blur placeholder and WebP support
interface GalleryImageProps {
  src: string;
  alt: string;
}

const GalleryImage = ({ src, alt }: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null; // Don't render anything if image fails to load
  }

  return (
    <div className={`relative aspect-[4/3] bg-muted rounded-xl overflow-hidden transition-opacity duration-300 ${
      isLoaded ? "opacity-100" : "opacity-50"
    }`}>
      {/* Main image with eager loading */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="sync"
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const openGallery = (service: typeof services[0]) => {
    // Immediately load images without checking - they'll fail silently if missing
    const images: string[] = [];
    
    // Try loading images 1.jpg through 15.jpg
    for (let i = 1; i <= 15; i++) {
      images.push(getImagePath(`/images/services/${service.slug}/${i}.jpg`));
    }

    setLoadedImages(images);
    setSelectedService(service);
  };

  return (
    <>
      <section id="services" className="section-padding" style={{ background: "var(--gradient-sand)" }}>
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <p className="section-subtitle">What We Offer</p>
            <h2 className="section-title">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-8 cursor-pointer"
                onClick={() => openGallery(service)}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--gradient-earth)" }}>
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 font-display">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                <span className="inline-block mt-4 text-xs font-semibold text-primary uppercase tracking-wider">View Gallery →</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Gallery Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground font-display">{selectedService.title}</h3>
                  <p className="text-muted-foreground mt-1">{selectedService.desc}</p>
                </div>
                <button onClick={() => setSelectedService(null)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {loadedImages.map((img, idx) => (
                  <GalleryImage
                    key={idx}
                    src={img}
                    alt={`${selectedService.title} example ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;
