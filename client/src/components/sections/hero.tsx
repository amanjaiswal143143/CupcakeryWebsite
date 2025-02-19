import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import React from "react"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Welcome to Bindi's Cupcakery"
  
  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 100)  // Adjust speed of typing if needed
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('IMAGES/bg.jpg')]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0" />
      
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white font-serif">
          {text}
        </h1>
      </motion.div>
    </div>
  )
}