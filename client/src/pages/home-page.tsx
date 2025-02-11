import Hero from "@/components/sections/hero";
import ProductGrid from "@/components/sections/product-grid";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductGrid featured />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}
