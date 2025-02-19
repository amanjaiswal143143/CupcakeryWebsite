

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Gift } from "lucide-react";
import { useCartStore } from "@/store/store";
import useAuth from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-white/80"
          : "bg-transparent"
      }`}
    >
      {/* Main navigation bar - now the primary element */}
      <div className="bg-[#59392a] text-white py-4 rounded-full mx-4 lg:mx-auto my-4 max-w-4xl">
        <div className="container h-full flex items-center justify-center gap-8 md:gap-16">
          <Link href="/products">
            <a className="font-medium uppercase tracking-wide text-sm hover:text-amber-200 transition-colors">
              PRODUCTS
            </a>
          </Link>
          <Link href="/hamper-builder">
            <a className="font-medium uppercase tracking-wide text-sm hover:text-amber-200 transition-colors">
              HAMPER
            </a>
          </Link>
          
          {/* Logo in center */}
          <div className="relative top-2">
            <Link href="/">
              <a>
                <CustomLogo />
              </a>
            </Link>
          </div>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium uppercase tracking-wide text-sm hover:text-amber-200 transition-colors">
                  ACCOUNT
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2">
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
            <Link href="/auth">
              <a className="font-medium uppercase tracking-wide text-sm hover:text-amber-200 transition-colors">
                LOGIN
              </a>
            </Link>
          )}
          
          <Link href="/cart">
            <a className="font-medium uppercase tracking-wide text-sm hover:text-amber-200 transition-colors relative">
              CART
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-4 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </a>
          </Link>
        </div>
      </div>
      
      {/* About Us link - fixed position (replacing cart) */}
      <div className="fixed top-4 right-4 md:right-8">
        <Button variant="outline" size="sm" asChild className="rounded-full bg-white shadow-md px-4">
          <Link href="/about-us">
            <span className="text-xs font-medium">About Us</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
}

// Custom logo component that resembles the one in the image
function CustomLogo() {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 5C12.85 5 3 14.85 3 27C3 39.15 12.85 49 25 49C37.15 49 47 39.15 47 27C47 14.85 37.15 5 25 5Z" fill="#59392a" />
      <path d="M25 45C15.07 45 7 36.93 7 27C7 17.07 15.07 9 25 9C34.93 9 43 17.07 43 27C43 36.93 34.93 45 25 45Z" fill="#59392a" stroke="#e0c4a0" strokeWidth="1" />
      <path d="M18 29L23 22.5L27 22.5L32 29" stroke="#e0c4a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 22V18" stroke="#e0c4a0" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 18C25.8284 18 26.5 17.3284 26.5 16.5C26.5 15.6716 25.8284 15 25 15C24.1716 15 23.5 15.6716 23.5 16.5C23.5 17.3284 24.1716 18 25 18Z" fill="#e0c4a0" />
      <path d="M20 35H30" stroke="#e0c4a0" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 27C15 25.3431 16.3431 24 18 24H32C33.6569 24 35 25.3431 35 27V32C35 33.6569 33.6569 35 32 35H18C16.3431 35 15 33.6569 15 32V27Z" fill="#59392a" stroke="#e0c4a0" strokeWidth="1" />
    </svg>
  );
}
