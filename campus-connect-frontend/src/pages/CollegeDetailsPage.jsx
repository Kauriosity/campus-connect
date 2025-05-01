import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiStar,
  FiBook,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiCheck,
  FiAward,
  FiTrendingUp,
  FiGrid,
  FiImage,
  FiYoutube,
  FiFileText,
  FiPhone,
  FiMail,
  FiGlobe,
} from "react-icons/fi";
import JoinModal from "../components/JoinModal";
import LoadingSpinner from "../components/LoadingSpinner";
import Gallery from "../components/Gallery";
import ReviewSection from "../components/ReviewSection";
import FacultySection from "../components/FacultySection";
import PlacementStats from "../components/PlacementStats";
import { AiOutlineCopy } from "react-icons/ai"; // make sure to install react-icons
import toast from "react-hot-toast";

const sampleMeetLink = "https://meet.google.com/abc-defg-hij";

const CollegeDetailsPage = () => {
  const { id } = useParams();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [college, setCollege] = useState(null);
  const [meetingData, setMeetingData] = useState(null);
  const [isMeetingScheduled, setIsMeetingScheduled] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem(`formData_${college?.name}`);
    if (data) {
      const parsedData = JSON.parse(data);
      setMeetingData(parsedData);
      console.log(parsedData, "parsed data");
    }
  }, [college, isMeetingScheduled]);

  console.log(meetingData?.date, "metting data");

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Replace with actual API call
        setCollege({
          id: 1,
          name: "Delhi Technical University",
          image:
            "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3",
          bannerImage:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3",
          location: "New Delhi, India",
          rating: 4.5,
          reviews: 1234,
          description:
            "Delhi Technical University (DTU) is one of India's premier engineering institutions...",
          established: 1941,
          accreditation: {
            naac: "A++",
            nba: "Accredited",
            nirf: 25,
          },
          courses: [
            {
              name: "B.Tech Computer Science",
              duration: "4 years",
              fees: "₹2.5L/year",
              seats: 180,
              eligibility: "JEE Main/Advanced",
              curriculum: ["Data Structures", "Algorithms", "Machine Learning"],
            },
            // ... more courses
          ],
          facilities: [
            {
              name: "Modern Computer Labs",
              description:
                "State-of-the-art computer labs with latest hardware and software",
              icon: "computer",
            },
            // ... more facilities
          ],
          placements: {
            averagePackage: "12.5 LPA",
            highestPackage: "45 LPA",
            placementRate: "95%",
            topRecruiters: ["Google", "Microsoft", "Amazon"],
            yearWiseStats: [
              { year: "2023", average: "12.5L", highest: "45L", placed: "95%" },
              // ... more years
            ],
          },
          faculty: [
            {
              name: "Dr. Rajesh Kumar",
              designation: "Professor",
              department: "Computer Science",
              qualification: "PhD from IIT Delhi",
              image: "https://iitbhu.ac.in/sites/default/files/styles/medium/public/pictures/2023-07/PHOTO-2022-07-07-07-56-24.jpg?itok=DHznuHQD",
            },
            // ... more faculty
          ],
          gallery: [
            {
              type: "image",
              url: "image-url",
              caption: "Campus View",
            },
            // ... more gallery items
          ],
          admissionProcess: [
            {
              step: 1,
              title: "JEE Main Score",
              description: "Minimum percentile required: 85",
            },
            // ... more steps
          ],
          contact: {
            address: "Bawana Road, Delhi-110042",
            phone: "+91-11-XXXXXXXX",
            email: "admissions@dtu.ac.in",
            website: "www.dtu.ac.in",
          },
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load college details");
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!college) return <div className="p-8 text-center">College not found</div>;

  const tabs = [
    { id: "overview", label: "Overview", icon: FiGrid },
    { id: "courses", label: "Courses", icon: FiBook },
    { id: "placements", label: "Placements", icon: FiTrendingUp },
    { id: "gallery", label: "Gallery", icon: FiImage },
    { id: "faculty", label: "Faculty", icon: FiUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={college.bannerImage}
          alt={college.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <h1 className="mb-4 text-4xl font-bold md:text-5xl ">
                {college.name}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center">
                  <FiMapPin className="mr-2" />
                  <span>{college.location}</span>
                </div>
                <div className="flex items-center">
                  <FiStar className="mr-2 text-yellow-400" />
                  <span>
                    {college.rating} ({college.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>Est. {college.established}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 transition-colors ${activeTab === tab.id
                  ? "border-blue-600 text-blue-400"
                  : "border-transparent text-gray-100 hover:text-blue-600"
                  }`}
              >
                <tab.icon className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8 lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* About Section */}
                  <section className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-4 text-2xl font-bold text-blue-600">
                      About College
                    </h2>
                    <p className="leading-relaxed text-gray-600">
                      {college.description}
                    </p>
                  </section>

                  {/* Accreditation Section */}
                  <section className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-4 text-2xl font-bold text-blue-600">
                      Accreditation & Rankings
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {Object.entries(college.accreditation).map(
                        ([key, value]) => (
                          <div key={key} className="p-4 rounded-lg bg-gray-50">
                            <h3 className="text-sm text-gray-600 uppercase">
                              {key}
                            </h3>
                            <p className="text-2xl font-bold text-gray-800">
                              {value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </section>

                  {/* Facilities Section */}
                  <section className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-4 text-2xl font-bold text-blue-600">
                      Campus Facilities
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {college.facilities.map((facility, index) => (
                        <div
                          key={index}
                          className="flex items-start p-4 space-x-4 border rounded-lg"
                        >
                          <div className="p-3 bg-blue-100 rounded-full">
                            <FiCheck className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-blue-600">
                              {facility.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {facility.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === "courses" && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Courses content */}
                  <section className="p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="mb-6 text-2xl font-bold text-blue-600">
                      Available Courses
                    </h2>
                    <div className="space-y-6">
                      {college.courses.map((course, index) => (
                        <div key={index} className="p-6 border rounded-lg">
                          <h3 className="mb-4 text-xl font-bold text-blue-600">
                            {course.name}
                          </h3>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex items-center space-x-3">
                              <FiCalendar className="text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Duration
                                </p>
                                <p className="font-medium text-blue-600">{course.duration}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FiDollarSign className="text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">Fees</p>
                                <p className="font-medium text-blue-600">{course.fees}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FiUsers className="text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Total Seats
                                </p>
                                <p className="font-medium text-blue-600">{course.seats}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <FiFileText className="text-gray-400" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Eligibility
                                </p>
                                <p className="font-medium text-blue-600">
                                  {course.eligibility}
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* Curriculum Preview */}
                          <div className="pt-4 mt-4 border-t">
                            <h4 className="mb-2 font-medium">Key Subjects</h4>
                            <div className="flex flex-wrap gap-2">
                              {course.curriculum.map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-500"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === "placements" && (
                <PlacementStats placements={college.placements} />
              )}

              {activeTab === "gallery" && <Gallery items={college.gallery} />}

              {activeTab === "faculty" && (
                <FacultySection faculty={college.faculty} />
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky space-y-6 top-24">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 bg-white shadow-lg rounded-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-blue-600">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FiMapPin className="mt-1 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-blue-600">
                        {college.contact.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href={`tel:${college.contact.phone}`}
                        className="font-medium text-blue-600"
                      >
                        {college.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${college.contact.email}`}
                        className="font-medium text-blue-600"
                      >
                        {college.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiGlobe className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Website</p>
                      <a
                        href={`https://${college.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600"
                      >
                        {college.contact.website}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Admission Steps */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-6 bg-white shadow-lg rounded-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-blue-600">
                  Admission Process
                </h3>
                <div className="space-y-4">
                  {college.admissionProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <span className="font-medium text-blue-600">
                          {step.step}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">
                          {step.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              {meetingData && meetingData.date ? (
                <motion.div className="w-full p-6 font-semibold text-white transition-colors bg-white shadow-lg rounded-xl">
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <a
                      href={sampleMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-600 underline"
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
                      localStorage.removeItem(`formData_${college?.name}`);
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
                  onClick={() => setShowJoinModal(true)}
                  className="w-full py-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
                >
                  Apply Now
                </motion.button>
              )}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowJoinModal(true)}
                className="w-full py-4 font-semibold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700"
              >
                Apply Now
              </motion.button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <JoinModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        collegeName={college.name}
        setIsMeetingScheduled={setIsMeetingScheduled}
      />
    </div>
  );
};

export default CollegeDetailsPage;


