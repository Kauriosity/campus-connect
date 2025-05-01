import React from 'react';
import { motion } from 'framer-motion';
import { FiSliders, FiChevronDown } from 'react-icons/fi';
import { sortOptions } from '../data/collegeData';

const FilterSortBar = ({ 
  totalColleges, 
  sortBy, 
  setSortBy, 
  showFilters, 
  setShowFilters 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(prev => !prev)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FiSliders className="text-gray-600" />
            <span>Filters</span>
          </button>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">{totalColleges}</span> colleges found
          </p>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-48 p-2 pr-8 bg-white border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Sort by</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {/* We'll add active filter chips here later */}
      </div>
    </div>
  );
};

export default FilterSortBar; 