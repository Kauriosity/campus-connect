import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Gallery = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-video cursor-pointer group"
            onClick={() => {
              setSelectedImage(item);
              setCurrentIndex(index);
            }}
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg" />
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-lg">
                <p className="text-white text-sm">{item.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <FiX size={24} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <FiChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
            >
              <FiChevronRight size={24} />
            </button>

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={items[currentIndex].url}
              alt={items[currentIndex].caption}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {items[currentIndex].caption && (
              <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                <p className="text-lg">{items[currentIndex].caption}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery; 