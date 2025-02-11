import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Delightful Moments,{" "}
            <span className="text-primary">Handcrafted Desserts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            Experience the joy of freshly baked, eggless desserts crafted with love
            and care. Perfect for every celebration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link href="/products">
              <Button size="lg" className="rounded-full">
                Explore Our Menu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(253,186,116,0.1),rgba(255,255,255,0))]" />
    </div>
  );
}
