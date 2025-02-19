import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-4xl bg-white p-8 rounded-2xl shadow-xl text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to <span className="font-semibold text-gray-900">Bindi’s Cupcakery</span>, a haven for delicious, 
          eggless treats made with love! We are passionate about crafting the most delightful cupcakes and 
          desserts, ensuring every bite is a moment of joy. Our journey began with a dream to spread sweetness 
          and happiness, and today, we proudly serve our community with quality and care.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-pink-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-pink-600">100% Eggless</h3>
            <p className="text-gray-700 text-sm">Every cupcake is made with pure vegetarian ingredients.</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-600">Freshly Baked</h3>
            <p className="text-gray-700 text-sm">Baked fresh every day with love and care.</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-600">Custom Orders</h3>
            <p className="text-gray-700 text-sm">Personalized cupcakes for special occasions.</p>
          </div>
        </div>

        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <a 
            href="/contact" 
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
