import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/store";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/">
          <a className="font-serif text-2xl font-bold">Bindi's Cupcakery</a>
        </Link>
        
        <div className="flex items-center space-x-4 ml-auto">
          <Link href="/products">
            <a className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </a>
          </Link>
          
          <Button variant="outline" size="icon">
            <ShoppingBag className="h-5 w-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
