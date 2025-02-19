import React, { useEffect, useState } from 'react';

const ScrollProgressBox = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-16 h-16">
      {/* Container for the box */}
      <div className="relative w-full h-full">
        {/* Progress percentage text */}
        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {Math.round(scrollProgress)}%
        </div>
        
        {/* Top border */}
        <div 
          className="absolute top-0 left-0 h-0.5 bg-black transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
        
        {/* Right border */}
        <div 
          className="absolute top-0 right-0 w-0.5 bg-black transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />
        
        {/* Bottom border */}
        <div 
          className="absolute bottom-0 right-0 h-0.5 bg-black transition-all duration-150"
          style={{ width: `${scrollProgress}%`, right: 0 }}
        />
        
        {/* Left border */}
        <div 
          className="absolute bottom-0 left-0 w-0.5 bg-black transition-all duration-150"
          style={{ height: `${scrollProgress}%`, bottom: 0 }}
        />
      </div>
    </div>
  );
};

export default ScrollProgressBox;