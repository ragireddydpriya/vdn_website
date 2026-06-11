import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import config from "@/data/config.json";
import productData from "@/data/products.json";
import logo from "@/assets/logo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Blogs", href: "/blogs" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const anchorId = href.replace("/#", "");
    const isHomePage = location.pathname === "/";

    const scrollToElement = () => {
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    };

    if (isHomePage) {
      // Already on home page, just scroll
      scrollToElement();
    } else {
      // Navigate to home first, then scroll
      navigate("/");
      scrollToElement();
    }

    setMobileOpen(false);
  };

  const NavLinkComponent = ({ item }: { item: typeof navItems[0] }) => {
    const isAnchor = item.href.startsWith("/#");
    
    if (isAnchor) {
      return (
        <a
          href={item.href}
          onClick={(e) => handleSmoothScroll(e, item.href)}
          className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors cursor-pointer"
        >
          {item.label}
        </a>
      );
    }
    
    return (
      <Link
        to={item.href}
        onClick={() => setMobileOpen(false)}
        className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container-wide mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt={config.business_name} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLinkComponent key={item.label} item={item} />
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${config.phone}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
          <a href={config.whatsapp} target="_blank" rel="noopener noreferrer" className="cta-primary text-sm px-5 py-2.5">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <div key={item.label} className="text-sm font-medium text-foreground/70 hover:text-primary py-2">
                <NavLinkComponent item={item} />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <a href={`tel:${config.phone}`} className="cta-warm text-sm flex-1 py-2.5 text-center">
                <Phone className="w-4 h-4 inline mr-1" /> Call
              </a>
              <a href={config.whatsapp} target="_blank" rel="noopener noreferrer" className="cta-primary text-sm flex-1 py-2.5 text-center">
                <MessageCircle className="w-4 h-4 inline mr-1" /> WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
