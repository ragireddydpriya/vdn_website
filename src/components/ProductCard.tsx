import { Droplets, Sun, Leaf, MessageCircle } from "lucide-react";
import config from "@/data/config.json";
import { getImagePath } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  sub_category: string;
  size: string;
  price: string;
  image: string;
  care_level: string;
  watering: string;
  sunlight: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const showCare = product.care_level !== "N/A";
  const whatsappMsg = `${config.whatsapp}&text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(product.name)}%20(${product.id})`;
  const imagePath = getImagePath(product.image);

  return (
    <div className="glass-card overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={imagePath}
          alt={product.name}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          srcSet={`
            ${imagePath}?w=300 300w,
            ${imagePath}?w=600 600w
          `}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getImagePath("/images/plant-placeholder.svg");
          }}
        />
      </div>
      <div className="p-5">
        <div className="mb-2">
          <h3 className="font-semibold text-foreground font-display text-lg leading-tight">{product.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{product.title}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{product.description}</p>

        {showCare && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-care"><Leaf className="w-3 h-3 mr-1" />{product.care_level}</span>
            <span className="badge-care"><Droplets className="w-3 h-3 mr-1" />{product.watering}</span>
            <span className="badge-sun"><Sun className="w-3 h-3 mr-1" />{product.sunlight}</span>
          </div>
        )}

        <a
          href={whatsappMsg}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary w-full text-sm py-2.5"
        >
          <MessageCircle className="w-4 h-4" />
          Enquire Now
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
