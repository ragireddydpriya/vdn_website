import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CategoryShowcase from "@/components/CategoryShowcase";
import OffersBanner from "@/components/OffersBanner";
import Projects from "@/components/Projects";
import { RecentBlogs } from "@/components/RecentBlogs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => {
  useEffect(() => {
    // Handle scroll to anchor on mount or hash change
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const anchorId = hash.replace("#", "");
        setTimeout(() => {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <CategoryShowcase />
      <OffersBanner />
      <Projects />
      <RecentBlogs />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Index;
