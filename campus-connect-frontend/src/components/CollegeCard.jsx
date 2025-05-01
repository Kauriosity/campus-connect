import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiStar, FiUsers, FiBookmark } from 'react-icons/fi';

const CollegeCard = ({ college }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      <Link to={`/college/${college.id}`} className="flex flex-col h-full">
        <div className="relative aspect-[16/9]">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
            {college.admissionStatus}
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
            {college.name}
          </h3>
          
          <div className="flex items-center text-gray-700 mb-3">
            <FiMapPin className="mr-2 flex-shrink-0 text-gray-500" />
            <span className="text-sm truncate">{college.location}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-gray-700">{college.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({college.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiUsers className="mr-1" />
              <span className="text-sm">{college.studentCount}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Starting from</p>
                <p className="text-lg font-bold text-gray-800">{college.fees}</p>
              </div>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Add bookmark functionality here
                }}
              >
                <FiBookmark className="text-gray-400 hover:text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollegeCard;
