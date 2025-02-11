import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Gift } from "lucide-react";
import { useCartStore } from "@/store/store";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const { user, logoutMutation } = useAuth();

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

          <Link href="/hamper-builder">
            <a className="text-sm font-medium transition-colors hover:text-primary">
              Build Hamper
            </a>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {!user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                )}
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => logoutMutation.mutate()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild>
              <Link href="/auth">Login</Link>
            </Button>
          )}

          <Button variant="outline" size="icon" asChild>
            <Link href="/cart">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}