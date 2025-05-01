import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/collegeData';

const PopularCategories = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <span className="text-3xl mb-2 block">{category.icon}</span>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} Colleges</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories; 