import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AiOutlineCopy } from "react-icons/ai"; // make sure to install react-icons
import {
  FiSearch,
  FiMapPin,
  FiStar,
  FiBook,
  FiUsers,
  FiFilter,
  FiX,
  FiTrendingUp,
} from "react-icons/fi";
import CollegeCard from "../components/CollegeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { colleges, categories, cities, feeRanges } from "../data/collegeData";
import JoinModalForHome from "../components/JoinModalForHome";
import toast from "react-hot-toast";
const sampleMeetLink = "https://meet.google.com/abc-defg-hij";
const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showJoinModalForHome, setShowJoinModalForHome] = useState(false);
  const [meetingData, setMeetingData] = useState(null);
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(`formData_Home`);
    if (data) {
      const parsedData = JSON.parse(data);
      setMeetingData(parsedData);
      console.log(parsedData, "parsed data");
    }
  }, [meetingData, isMeetingScheduled]);

  console.log(meetingData?.date, "metting data");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    city: "",
    fee: "",
  });

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Add your API call here if needed
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError("Failed to load colleges. Please try again.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Featured colleges section
  const featuredColleges = colleges.filter((college) => college.featured);

 

  // Filter colleges based on search query and filters
  const filteredColleges = colleges.filter((college) => {
    if (
      searchQuery &&
      !college.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedFilters.category &&
      college.category !== selectedFilters.category
    ) {
      return false;
    }
    // Add more filter logic as needed
    return true;
  });

   console.log(filteredColleges, "featured colleges");

  const FilterSection = ({ isMobile = false }) => (
    <div className={`space-y-4 ${isMobile ? "p-4" : ""}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course
        </label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-900"
          value={selectedFilters.category}
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, category: e.target.value })
          }
        >
          <option value="" className="text-slate-800">
            All Courses
          </option>
          <option value="btech" className="text-slate-800">
            B.Tech
          </option>
          <option value="mtech" className="text-slate-800">
            M.Tech
          </option>
          <option value="mba" className="text-slate-800">
            MBA
          </option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-900"
          value={selectedFilters.city}
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, city: e.target.value })
          }
        >
          <option value="" className="text-slate-800">
            All Cities
          </option>
          <option value="delhi" className="text-slate-800">
            Delhi
          </option>
          <option value="mumbai" className="text-slate-800">
            Mumbai
          </option>
          <option value="bangalore" className="text-slate-800">
            Bangalore
          </option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fee Range
        </label>
        <select
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-slate-900"
          value={selectedFilters.fee}
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, fee: e.target.value })
          }
        >
          <option value="" className="text-slate-800">
            All Ranges
          </option>
          <option value="0-2" className="text-slate-800">
            Below 2L
          </option>
          <option value="2-5" className="text-slate-800">
            2L - 5L
          </option>
          <option value="5+" className="text-slate-800">
            Above 5L
          </option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 lg:pt-0">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8 lg:py-16 max-w-7xl">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
            Find Your Perfect College
          </h1>
          <div className="relative max-w-2xl mx-auto lg:mx-0">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-100" />
            <input
              type="text"
              placeholder="Search colleges, courses, or locations..."
              className="w-full pl-12 pr-4 py-3 lg:py-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Featured Colleges Section */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center mb-6">
            <FiTrendingUp className="text-blue-600 mr-2" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              Featured Colleges
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Filters
              </h3>
              <FilterSection />
              <div className="flex justify-between items-center mt-4  border-t">
                {meetingData && meetingData.date ? (
                  <motion.div className="w-full p-6 font-semibold text-white transition-colors bg-white shadow-lg rounded-xl mt-4">
                    <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
                      <a
                        href={sampleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-600 underline break-all overflow-wrap-anywhere"
                      >
                        {sampleMeetLink}
                      </a>
                      <button
                        onClick={() => {
                          toast.success("Link Copied to Clipboard");
                          navigator.clipboard.writeText(sampleMeetLink);
                        }}
                        className="text-white transition-colors hover:text-gray-200"
                        title="Copy Link"
                      >
                        <AiOutlineCopy size={20} />
                      </button>
                    </div>
                    <p className="mt-4 font-medium text-gray-600">
                      Your meeting is scheduled on {meetingData.date} at{" "}
                      {meetingData.time}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        localStorage.removeItem(`formData_Home`);
                        setMeetingData(null);
                        toast.success("Cancelled Successfully");
                      }}
                      className="py-4 mt-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                      Cancel Meeting
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowJoinModalForHome(true)}
                    className="w-full py-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                  >
                    Apply Now
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-30">
            <button
              onClick={() => setShowFilters(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg"
            >
              <FiFilter size={20} />
            </button>
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0  bg-opacity-50"
                onClick={() => setShowFilters(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-lg"
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Filters</h3>

                  <button onClick={() => setShowFilters(false)}>
                    <FiX size={24} />
                  </button>
                </div>
                <FilterSection isMobile />
                <div className="flex justify-between items-center mt-4 px-4 border-t">
                  {meetingData && meetingData.date ? (
                    <motion.div className="w-full p-6 font-semibold text-white transition-colors bg-white shadow-lg rounded-xl mt-4 my-4">
                      <div className="flex items-center justify-between gap-2 mt-2 flex-wrap">
                        <a
                          href={sampleMeetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-600 underline break-all overflow-wrap-anywhere"
                        >
                          {sampleMeetLink}
                        </a>
                        <button
                          onClick={() => {
                            toast.success("Link Copied to Clipboard");
                            navigator.clipboard.writeText(sampleMeetLink);
                          }}
                          className="text-white transition-colors hover:text-gray-200"
                          title="Copy Link"
                        >
                          <AiOutlineCopy size={20} />
                        </button>
                      </div>
                      <p className="mt-4 font-medium text-gray-600">
                        Your meeting is scheduled on {meetingData.date} at{" "}
                        {meetingData.time}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          localStorage.removeItem(`formData_Home`);
                          setMeetingData(null);
                          toast.success("Cancelled Successfully");
                        }}
                        className="py-4 mt-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                      >
                        Cancel Meeting
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowJoinModalForHome(true)}
                      className=" w-full py-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 "
                    >
                      Apply Now
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Colleges Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Colleges</h2>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">
                  {colleges.length} colleges
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Join Modal */}
      <JoinModalForHome
        isOpen={showJoinModalForHome}
        onClose={() => setShowJoinModalForHome(false)}
        collegeName={"home"}
        setIsMeetingScheduled={setIsMeetingScheduled}
      />
    </div>
  );
};

export default HomePage;
