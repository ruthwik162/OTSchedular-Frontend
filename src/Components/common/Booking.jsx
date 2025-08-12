import React, { useState } from 'react';
import axios from 'axios';
import { 
  HiOutlineUserCircle, 
  HiOutlineMail, 
  HiOutlineCalendar, 
  HiOutlineClock, 
  HiOutlineDocumentText,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi';
import { FiArrowRight } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { assets } from '../../assets/assets';

const Booking = () => {
  const [formData, setFormData] = useState({
    doctorEmail: "",
    patientEmail: "",
    patientName: "",
    subject: "",
    message: "",
    date: "",
    slot: ""
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState({ text: "", isSuccess: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg({ text: "", isSuccess: false });

    try {
      const res = await axios.post("http://localhost:5000/book-doctor-appointment", formData);
      setResponseMsg({
        text: `Appointment booked successfully! Your booking ID: ${res.data.id}`,
        isSuccess: true
      });
      setIsSubmitted(true);
    } catch (err) {
      setResponseMsg({
        text: err.response?.data?.message || "Failed to book appointment. Please try again.",
        isSuccess: false
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      doctorEmail: "",
      patientEmail: "",
      patientName: "",
      subject: "",
      message: "",
      date: "",
      slot: ""
    });
    setResponseMsg({ text: "", isSuccess: false });
    setIsSubmitted(false);
  };

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HiOutlineBookOpen className="text-2xl" />
              <h1 className="text-xl font-semibold">Book Appointment</h1>
            </div>
            <div className=" bg-opacity-20 p-2 rounded-lg">
                <img src={assets.Banner} className='w-15 object-cover' alt="" />
            </div>
          </div>
          <p className="mt-2 text-blue-100 text-sm">
            Fill the form to schedule your consultation
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <HiOutlineCheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {responseMsg.text}
              </p>
              <button
                onClick={resetForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-5">
                  {/* Doctor Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineUserCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="doctorEmail"
                      placeholder="Doctor's Email"
                      value={formData.doctorEmail}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Patient Email */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="patientEmail"
                      placeholder="Your Email"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Patient Name */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineUserCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="patientName"
                      placeholder="Your Full Name"
                      value={formData.patientName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineDocumentText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Appointment Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <div className="absolute top-3 left-3">
                      <HiOutlineDocumentText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      placeholder="Additional Message (Optional)"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiOutlineCalendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Time Slot */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiOutlineClock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="slot"
                        value={formData.slot}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        required
                      >
                        <option value="">Select Time</option>
                        {timeSlots.map((slot, index) => (
                          <option key={index} value={slot}>{slot}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <IoIosArrowDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Message */}
                {responseMsg.text && (
                  <div className={`rounded-md p-4 ${responseMsg.isSuccess ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {responseMsg.isSuccess ? (
                          <HiOutlineCheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <HiOutlineXCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className={`text-sm font-medium ${responseMsg.isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                          {responseMsg.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking <FiArrowRight className="ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;