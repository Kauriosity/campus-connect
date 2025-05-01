import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import { FaSpinner, FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const JoinModal = ({ isOpen, onClose, collegeName, setIsMeetingScheduled }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    course: "",
    category: "",
    message: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardHolder: "",
  });

  // Load form data from local storage when modal opens
  useEffect(() => {
    if (isOpen && collegeName) {
      const savedData = localStorage.getItem(`formData_${collegeName}`);
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, [isOpen, collegeName]);

  // Reset step to 1 when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (collegeName) {
      localStorage.setItem(`formData_${collegeName}`, JSON.stringify(formData));
      setIsMeetingScheduled(true);
    }
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (collegeName) {
      localStorage.setItem(`formData_${collegeName}`, JSON.stringify(formData));
    }
     setIsMeetingScheduled(true);
    setIsLoading(false);
    setStep(3);
    setTimeout(onClose, 2000);
  };

  // Format card number (add spaces every 4 digits)
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted =
      cleaned
        .match(/.{1,4}/g)
        ?.join(" ")
        .slice(0, 19) || cleaned.slice(0, 19);
    return formatted;
  };

  // Format expiry date (MM/YY)
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  // Get tomorrow's date for min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Animation variants for form fields
  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute z-10 text-gray-400 right-4 top-4 hover:text-gray-600"
              >
                <FiX size={24} />
              </button>

              <div className="flex flex-col justify-center min-h-[80vh] p-8 bg-white shadow-2xl rounded-xl">
                {step === 1 ? (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-700">
                      Apply to {collegeName}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your full name"
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Enter your email"
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Preferred Date For Meeting
                        </label>
                        <input
                          type="date"
                          required
                          placeholder="Select a date"
                          min={minDate}
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Preferred Time For Meeting
                        </label>
                        <input
                          type="time"
                          required
                          placeholder="Select a time"
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Preferred Course
                        </label>
                        <select
                          required
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.course}
                          onChange={(e) =>
                            setFormData({ ...formData, course: e.target.value })
                          }
                        >
                          <option value="">Select a course</option>
                          <option value="btech">B.Tech</option>
                          <option value="mtech">M.Tech</option>
                          <option value="mba">MBA</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Category
                        </label>
                        <select
                          required
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="">Select category</option>
                          <option value="general">General</option>
                          <option value="obc">OBC</option>
                          <option value="sc">SC</option>
                          <option value="st">ST</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                          Message (Optional)
                        </label>
                        <textarea
                          placeholder="Enter your message"
                          className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          rows="3"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Application
                      </button>
                    </form>
                  </div>
                ) : step === 2 ? (
                  <div className="flex flex-col justify-center min-h-[60vh] space-y-6">
                    <h2 className="text-2xl font-bold text-gray-700 text-center">
                      Payment Details
                    </h2>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="flex justify-end space-x-2 mb-4">
                        <FaCcVisa className="text-blue-600 text-2xl" />
                        <FaCcMastercard className="text-red-600 text-2xl" />
                        <FaCcAmex className="text-blue-800 text-2xl" />
                      </div>
                      <form
                        onSubmit={handlePaymentSubmit}
                        className="space-y-4"
                      >
                        <motion.div
                          variants={fieldVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardNumber: formatCardNumber(e.target.value),
                              })
                            }
                            maxLength="19"
                          />
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                          <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
                              value={formData.expiry}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  expiry: formatExpiry(e.target.value),
                                })
                              }
                              maxLength="5"
                            />
                          </motion.div>
                          <motion.div
                            variants={fieldVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <label className="block mb-1 text-sm font-medium text-gray-700">
                              CVV
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="123"
                              className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
                              value={formData.cvv}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  cvv: e.target.value.replace(/\D/g, ""),
                                })
                              }
                              maxLength="4"
                            />
                          </motion.div>
                        </div>

                        <motion.div
                          variants={fieldVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <label className="block mb-1 text-sm font-medium text-gray-700">
                            Card Holder Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter cardholder name"
                            className="w-full px-4 py-2 text-gray-700 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm"
                            value={formData.cardHolder}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                cardHolder: e.target.value,
                              })
                            }
                          />
                        </motion.div>

                        <motion.div
                          variants={fieldVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-2 text-white rounded-lg transition-colors flex items-center justify-center ${
                              isLoading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {isLoading ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                Processing...
                              </>
                            ) : (
                              "Confirm Payment"
                            )}
                          </button>
                        </motion.div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
                      <FiCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700">
                      Payment Successful!
                    </h2>
                    <p className="text-gray-600">
                      Your application and payment have been received. We'll
                      contact you soon.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinModal;
