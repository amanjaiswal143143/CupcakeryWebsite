import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1587668178277-295251f900ce",
  "https://images.unsplash.com/photo-1521886243261-de87e3108a5a",
  "https://images.unsplash.com/photo-1603532648955-039310d9ed75",
  "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e",
];

export default function Gallery() {
  return (
    <div className="bg-muted/50 py-16">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif font-bold text-center mb-12"
        >
          Our Sweet Gallery
        </motion.h2>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
