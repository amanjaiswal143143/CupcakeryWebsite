import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Minus, ShoppingBag } from "lucide-react";

interface HamperItem {
  product: Product;
  quantity: number;
}

export default function HamperBuilder() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const addToCart = useCartStore((state) => state.addItem);
  const [selectedItems, setSelectedItems] = useState<HamperItem[]>([]);

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const updateQuantity = (product: Product, quantity: number) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (!existing && quantity > 0) {
        return [...prev, { product, quantity }];
      }
      if (existing && quantity === 0) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return prev.map((item) =>
        item.product.id === product.id ? { ...item, quantity } : item
      );
    });
  };

  const addHamperToCart = () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Empty Hamper",
        description: "Please add some items to your hamper first.",
        variant: "destructive",
      });
      return;
    }

    // Create a special hamper product
    const hamperProduct: Product = {
      id: Date.now(), // Temporary ID for the cart
      name: "Custom Dessert Hamper",
      description: `Custom hamper with ${selectedItems.length} items`,
      price: totalPrice.toString(),
      image: selectedItems[0].product.image, // Use first item's image
      category: "hamper",
      isAvailable: true,
    };

    addToCart(hamperProduct);
    toast({
      title: "Hamper added to cart",
      description: (
        <div className="flex items-center justify-between">
          <span>Your custom hamper has been added to the cart.</span>
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
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-serif font-bold mb-4">Build Your Hamper</h1>
        <p className="text-muted-foreground mb-8">
          Create your perfect dessert hamper by selecting items and quantities
          below.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-serif text-xl font-semibold">Available Items</h2>
            {products?.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const current =
                              selectedItems.find(
                                (item) => item.product.id === product.id
                              )?.quantity || 0;
                            updateQuantity(product, Math.max(0, current - 1));
                          }}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>
                          {selectedItems.find(
                            (item) => item.product.id === product.id
                          )?.quantity || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const current =
                              selectedItems.find(
                                (item) => item.product.id === product.id
                              )?.quantity || 0;
                            updateQuantity(product, current + 1);
                          }}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Your Hamper Summary</CardTitle>
                <CardDescription>
                  {selectedItems.length} items selected
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.product.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{Number(item.product.price) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={addHamperToCart}
                  disabled={selectedItems.length === 0}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add Hamper to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
