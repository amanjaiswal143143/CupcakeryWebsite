import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCollection, setSelectedCollection] = useState(0);

  // Local images from IMAGES folder
  const placeholderUrls1 = {
    main: "/src/IMAGES/b20.jpg",  // Featured Image
    thumb: ["/src/IMAGES/b20.jpg","/src/IMAGES/b22.jpg","/src/IMAGES/b25.jpg",],  // Thumbnail Image
  };
  const placeholderUrls2 = {
    main: "/src/IMAGES/b22.jpg",  // Featured Image
    thumb: ["/src/IMAGES/b20.jpg","/src/IMAGES/b22.jpg","/src/IMAGES/b25.jpg",],  // Thumbnail Image
  };
  const placeholderUrls3 = {
    main: "/src/IMAGES/b25.jpg",  // Featured Image
    thumb: ["/src/IMAGES/b20.jpg","/src/IMAGES/b22.jpg","/src/IMAGES/b25.jpg",],  // Thumbnail Image
  };
  

  const collections = [
    {
      id: 0,
      title: "Signature Collection",
      mainImage: placeholderUrls1.main,
      thumbnails: placeholderUrls1.thumb,
      description: "Our award-winning signature cupcakes featuring unique flavors and designs"
    },
    {
      id: 1,
      title: "Seasonal Specials",
      mainImage: placeholderUrls2.main,
      thumbnails: placeholderUrls2.thumb,
      description: "Limited edition cupcakes that celebrate the flavors of each season"
    },
    {
      id: 2,
      title: "Classic Favorites",
      mainImage: placeholderUrls3.main,
      thumbnails: placeholderUrls3.thumb,
      description: "Timeless recipes that have delighted our customers for years"
    }
  ];

  // Reset image index on collection change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedCollection]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) =>
        (prev + 1) % collections[selectedCollection].thumbnails.length
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [selectedCollection]);

  const navigateImage = (direction: 'next' | 'prev') => {
    const imageCount = collections[selectedCollection].thumbnails.length;
    setCurrentImageIndex((prev) =>
      direction === 'next' ? (prev + 1) % imageCount : (prev === 0 ? imageCount - 1 : prev - 1)
    );
  };

  return (
    <div className="w-full bg-white py-12 px-4 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our handcrafted cupcake collections
          </p>
        </motion.div>

        {/* Main Gallery */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Featured Image */}
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${selectedCollection}-${currentImageIndex}`}
                src={collections[selectedCollection].mainImage}
                alt={`Featured ${collections[selectedCollection].title}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Navigation */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              {/* <button
                onClick={() => navigateImage('prev')}
                className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button> */}
            </div>
          </div>

          {/* Collection Info and Thumbnails */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
                {collections[selectedCollection].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {collections[selectedCollection].description}
              </p>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {collections[selectedCollection].thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                    currentImageIndex === index ? 'ring-0' : ''
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collection Selector */}
        <div className="grid md:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`p-6 rounded-lg text-left transition-all ${
                selectedCollection === collection.id
                  ? 'bg-rose-50 shadow-md'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <h4 className="text-lg font-semibold mb-2">{collection.title}</h4>
              <p className="text-gray-600 text-sm">{collection.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
