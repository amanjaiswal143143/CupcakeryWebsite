import { Product } from "@shared/schema";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: (
        <div className="flex items-center justify-between">
          <span>{product.name} has been added to your cart.</span>
          <Button
            variant="link"
            className="px-0"
            onClick={() => setLocation("/cart")}
          >
            View Cart
          </Button>
        </div>
      ),
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden">
        <div className="aspect-square relative overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        <CardHeader>
          <CardTitle className="font-serif">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-lg font-semibold">₹{product.price}</p>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={!product.isAvailable}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}