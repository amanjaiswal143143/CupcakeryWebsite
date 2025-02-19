import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/ui/product-card";
import { motion } from "framer-motion";
import React from "react";

// Sample product data
export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    description: "Rich, moist chocolate cake with dark chocolate ganache",
    price: "230",
    image: "/src/IMAGES/b117.jpg",
    category: "cakes",
    isAvailable: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chocolate  Bean Cupcakes",
    description: "Light and fluffy cupcakes with real chocolate bean frosting",
    price: "800",
    image: "/src/IMAGES/b221.jpg",
    category: "cupcakes",
    isAvailable: true,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    description: "Traditional red velvet cake with cream cheese frosting",
    price: "300",
    image: "/src/IMAGES/b228.jpg",
    category: "cakes",
    isAvailable: true,
    rating: 4.9,
  },
  {
    id: 4,
    name: "chilly chees cookies",
    description: "chilly falour in cookies deep into chessy",
    price: "500",
    image: "/src/IMAGES/b115.jpg",
    category: "tarts",
    isAvailable: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: "Strawberry Cheesecake",
    description: "Creamy New York style cheesecake with fresh strawberry topping",
    price: "250",
    image: "/src/IMAGES/b113.jpg",
    category: "cookies",
    isAvailable: true,
    rating: 4.9,
  },
  {
    id: 6,
    name: "nuts Cheesecake",
    description: "Creamy New York style cheesecake with fresh nuts topping",
    price: "400",
    image: "/src/IMAGES/b114.jpg",
    category: "cookies",
    isAvailable: true,
    rating: 4.9,
  },



];


interface ProductGridProps {
  products?: Product[];
  featured?: boolean;
}

export default function ProductGrid({ products: propProducts, featured }: ProductGridProps) {
  const { data: fetchedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: !propProducts,
    initialData: sampleProducts, // Provide sample data as fallback
  });

  const products = propProducts || fetchedProducts;
  const displayProducts = featured ? products?.slice(0, 6) : products;

  return (
    <div className="container py-16">
      {featured && (
        <h2 className="text-3xl font-serif font-bold text-center mb-12">
          Our Featured Delights
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProducts?.map((product, index) => (
          <motion.div
            key={product.id} // ✅ Corrected placement of key
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
