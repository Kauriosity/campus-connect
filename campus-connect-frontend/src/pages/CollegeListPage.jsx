import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiFilter, FiMapPin, FiStar, FiDollarSign,
  FiBook, FiAward, FiX
} from 'react-icons/fi';
import { colleges, filters } from '../data/collegeData';
import CollegeCard from '../components/CollegeCard';

const CollegeListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    location: 'All',
    category: 'All',
    course: 'All',
    fees: 'all',
    exam: 'All'
  });
  const [sortBy, setSortBy] = useState('ranking');
  const [filteredColleges, setFilteredColleges] = useState(colleges);

  useEffect(() => {
    const filtered = colleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = selectedFilters.location === 'All' ||
        college.location.includes(selectedFilters.location);

      const matchesCategory = selectedFilters.category === 'All' ||
        college.category === selectedFilters.category;

      const matchesCourse = selectedFilters.course === 'All' ||
        college.courses.includes(selectedFilters.course);

      const matchesExam = selectedFilters.exam === 'All' ||
        college.examAccepted.includes(selectedFilters.exam);

      return matchesSearch && matchesLocation && matchesCategory &&
        matchesCourse && matchesExam;
    });

    // Sort colleges
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.ranking - b.ranking;
        case 'rating':
          return b.rating - a.rating;
        case 'fees_low':
          return parseFloat(a.fees) - parseFloat(b.fees);
        case 'fees_high':
          return parseFloat(b.fees) - parseFloat(a.fees);
        default:
          return 0;
      }
    });

    setFilteredColleges(sorted);
  }, [searchQuery, selectedFilters, sortBy]);

  const resetFilters = () => {
    setSelectedFilters({
      location: 'All',
      category: 'All',
      course: 'All',
      fees: 'all',
      exam: 'All'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex-1 sm:flex-none"
              >
                <FiFilter />
                <span>Filters</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
              >
                <option value="ranking">Ranking: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="fees_low">Fees: Low to High</option>
                <option value="fees_high">Fees: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters */}
        {Object.values(selectedFilters).some(value => value !== 'All') && (
          <div className="mb-6 flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([key, value]) => (
              value !== 'All' && (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => setSelectedFilters({ ...selectedFilters, [key]: 'All' })}
                    className="hover:text-blue-600"
                  >
                    <FiX size={16} />
                  </button>
                </motion.div>
              )
            ))}
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <CollegeCard college={college} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No colleges found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedFilters.location}
                    onChange={(e) => setSelectedFilters({
                      ...selectedFilters,
                      location: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedFilters.category}
                    onChange={(e) => setSelectedFilters({
                      ...selectedFilters,
                      category: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Course Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course
                  </label>
                  <select
                    value={selectedFilters.course}
                    onChange={(e) => setSelectedFilters({
                      ...selectedFilters,
                      course: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entrance Exam
                  </label>
                  <select
                    value={selectedFilters.exam}
                    onChange={(e) => setSelectedFilters({
                      ...selectedFilters,
                      exam: e.target.value
                    })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {filters.examAccepted.map(exam => (
                      <option key={exam} value={exam}>{exam}</option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={resetFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollegeListPage; 