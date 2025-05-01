import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiDollarSign, FiBriefcase, FiAward } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const PlacementStats = ({ placements }) => {
  return (
    <div className="space-y-8">
      {/* Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FiDollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Package</p>
              <p className="text-xl font-bold text-blue-600">{placements.averagePackage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FiAward className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Highest Package</p>
              <p className="text-xl font-bold text-blue-600">{placements.highestPackage}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FiBriefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Placement Rate</p>
              <p className="text-xl font-bold text-blue-600">{placements.placementRate}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <FiTrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Companies Visited</p>
              <p className="text-xl font-bold text-blue-600">{placements.topRecruiters.length}+</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Year-wise Stats Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-6">Placement Trends</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placements.yearWiseStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average" name="Average Package" fill="#3B82F6" />
              <Bar dataKey="highest" name="Highest Package" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Recruiters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-6">Top Recruiters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {placements.topRecruiters.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg"
            >
              <img
                src={`/companies/${company.toLowerCase()}.png`}
                alt={company}
                className="h-12 object-contain"
                onError={(e) => {
                  e.target.src = '/companies/default.png';
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Branch-wise Placements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold mb-6">Branch-wise Placement Statistics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students Placed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Highest Package
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {placements.branchWiseStats?.map((branch, index) => (
                <tr key={branch.name}>
                  <td className="px-6 py-4 whitespace-nowrap ">{branch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">{branch.placed}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">{branch.avgPackage}</td>
                  <td className="px-6 py-4 whitespace-nowrap ">{branch.highestPackage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PlacementStats; 