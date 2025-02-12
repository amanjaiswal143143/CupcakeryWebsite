"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "wouter"
import { useState } from "react"

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOF4QSfHSJPscQkLSOCgYMi9jFjzdX.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOF4QSfHSJPscQkLSOCgYMi9jFjzdX.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOF4QSfHSJPscQkLSOCgYMi9jFjzdX.png",
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative bg-white">
    

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative z-10 px-4 pt-24 pb-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex items-center justify-center gap-1"
          >
            <span>Google:</span>
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">(4.9)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Brewed to perfection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-lg text-gray-600"
          >
            Your perfect spot for coffee, pastries, and more.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
            <Button size="lg" className="rounded-full bg-black text-white hover:bg-gray-800">
              Explore menu
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative mt-12 h-80 w-full overflow-hidden rounded-lg"
        >
          <div
            className="relative flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="h-full min-w-full">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

