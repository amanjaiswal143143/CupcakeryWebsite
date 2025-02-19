import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-[#2D2217] to-[#1F1812] text-zinc-100 min-h-[400px] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-4 transform transition-all duration-300 hover:translate-y-[-5px]">
          <h2 className="text-4xl font-light text-[#BEB3A3] tracking-wider">Bindi's</h2>
          <p className="text-xl font-light text-[#BEB3A3] tracking-wide">Cupcakery</p>
          <p className="text-sm text-zinc-400 mt-4 leading-relaxed max-w-sm">
            Crafting delightful moments with freshly baked, eggless desserts since 2020.
          </p>
          <div className="pt-4 flex space-x-4">
            <a href="https://instagram.com" className="text-zinc-400 hover:text-white transition-colors duration-300">
              <Instagram className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" />
            </a>
            <a href="https://facebook.com" className="text-zinc-400 hover:text-white transition-colors duration-300">
              <Facebook className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" />
            </a>
            <a href="https://twitter.com" className="text-zinc-400 hover:text-white transition-colors duration-300">
              <Twitter className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Address Section with Map */}
        <div className="md:col-span-2">
          <div className="h-[250px] bg-zinc-800 rounded-lg overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.7247342639147!2d72.7868!3d21.1924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDExJzMyLjYiTiA3MsKwNDcnMTIuNSJF!5e0!3m2!1sen!2sin!4v1635835824000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              className="filter contrast-75"
            />
          </div>
          <p className="text-sm text-zinc-400 mt-4 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Location: Surat Gujarat, India
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4 text-[#BEB3A3]">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'Products', 'About Us', 'Workshop'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-zinc-400 hover:text-white text-sm transition-all duration-300 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4 text-[#BEB3A3]">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-zinc-400 hover:text-white text-sm transition-all duration-300 hover:pl-2 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-700/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-400">
          <div className="flex items-center space-x-2 transition-colors duration-300 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 9770096693</span>
          </div>
          <div className="flex items-center space-x-2 transition-colors duration-300 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>hello@bindiscupcakery.com</span>
          </div>
          <div className="text-right transition-colors duration-300 hover:text-white">
            © 2025 Bindi's Cupcakery. Made with 
            <span className="text-red-400 animate-pulse mx-1">❤️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;