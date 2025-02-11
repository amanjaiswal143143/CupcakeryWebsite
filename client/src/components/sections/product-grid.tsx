import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/ui/product-card";
import { motion } from "framer-motion";

interface ProductGridProps {
  products?: Product[];
  featured?: boolean;
}

export default function ProductGrid({ products: propProducts, featured }: ProductGridProps) {
  const { data: fetchedProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: !propProducts,
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
            key={product.id}
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
