import React, { useState, useEffect } from 'react';
import { FaUserMd, FaHospitalSymbol, FaPhone, FaEnvelope, FaCalendarAlt, FaStar, FaClinicMedical, FaPhoneAlt } from 'react-icons/fa';
import { GiBrain, GiBoneKnife, GiStethoscope, GiHealthNormal, GiMedicines } from 'react-icons/gi';
import { MdWork, MdVerified, MdLocalHospital } from 'react-icons/md';
import { RiHeartPulseFill } from 'react-icons/ri';
import { BsClipboard2Pulse } from 'react-icons/bs';
import { PulseLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../AppContext/AppContext';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { URL } = useAppContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${URL}/user/role/doctor`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const getDepartmentIcon = (department) => {
    switch (department?.toLowerCase()) {
      case 'neurology':
      case 'neuro':
        return <GiBrain className="text-purple-600 text-xl sm:text-2xl" />;
      case 'ortho':
      case 'orthopedic':
        return <GiBoneKnife className="text-blue-600 text-xl sm:text-2xl" />;
      case 'cardiology':
        return <RiHeartPulseFill className="text-red-600 text-xl sm:text-2xl" />;
      case 'general':
        return <GiStethoscope className="text-green-600 text-xl sm:text-2xl" />;
      case 'pediatrics':
        return <FaClinicMedical className="text-pink-600 text-xl sm:text-2xl" />;
      case 'surgery':
        return <GiMedicines className="text-indigo-600 text-xl sm:text-2xl" />;
      default:
        return <BsClipboard2Pulse className="text-teal-600 text-xl sm:text-2xl" />;
    }
  };

  const getDepartmentColor = (department) => {
    switch (department?.toLowerCase()) {
      case 'neurology':
      case 'neuro':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ortho':
      case 'orthopedic':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cardiology':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'general':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pediatrics':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'surgery':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-teal-100 text-teal-800 border-teal-200';
    }
  };

  const formatExperience = (exp) => {
    if (!exp) return 'Experience not specified';
    if (typeof exp === 'number') return `${exp} years experience`;
    if (exp.includes('years')) return exp;
    return `${exp} years experience`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <motion.div
            key="spinner"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 360,
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="mb-6 mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-300 rounded-full flex items-center justify-center shadow-lg"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <GiStethoscope className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Loading Medical Team
              </span>
            </h3>

            <p className="text-gray-600">
              Preparing specialist doctors for you
            </p>

            <div className="flex justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block w-3 h-3 bg-indigo-400 rounded-full mx-1"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-indigo-100/50"
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-indigo-100/50"
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-white">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-lg max-w-md mx-4 border border-red-100"
        >
          <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4">
            <MdLocalHospital className="text-3xl text-red-500" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">Error Loading Doctors</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-29 ">

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl sm:rounded-3xl mt-16 sm:mt-20 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Meet Our Specialist Doctors <span className="text-blue-200"></span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Highly qualified medical professionals dedicated to your health and wellbeing
          </motion.p>
        </div>
      </motion.div>

      {/* Floating decorative elements - hidden on mobile */}
      <div className="hidden sm:block fixed top-20 left-10 opacity-10 -z-10">
        <GiStethoscope className="text-7xl sm:text-9xl text-blue-300" />
      </div>
      <div className="hidden sm:block fixed bottom-20 right-10 opacity-10 -z-10">
        <GiHealthNormal className="text-7xl sm:text-9xl text-blue-300" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Animated background elements - hidden on mobile */}
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="hidden sm:block absolute -top-16 -left-16 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-blue-100 opacity-20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="hidden sm:block absolute -bottom-16 -right-16 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-purple-100 opacity-20 blur-xl"
        />

        {/* Doctors Grid */}
        {doctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <FaUserMd className="mx-auto text-4xl sm:text-5xl text-gray-300 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-700">No Doctors Available</h3>
            <p className="text-gray-500 mt-1 sm:mt-2">Please check back later</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden hover:shadow-md sm:hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
              >
                {/* Ribbon for verified doctors */}
                {doctor.verified && (
                  <div className="absolute -right-7 sm:-right-8 top-4 sm:top-6 bg-blue-500 text-white text-xs font-bold px-6 sm:px-8 py-0.5 sm:py-1 transform rotate-45 z-10 shadow-sm sm:shadow-md">
                    Verified
                  </div>
                )}

                {/* Doctor Header with Image */}
                <div className="relative h-78 sm:h-56 md:h-70 bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden">
                  {doctor.profileImageUrl ? (
                    <img
                      src={doctor.profileImageUrl}
                      alt={doctor.username}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-900">
                      <FaUserMd className="text-4xl sm:text-5xl text-white opacity-80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white">{doctor.username}</h2>
                    <div className="flex items-center">
                      <MdVerified className="text-blue-300 mr-1 text-sm sm:text-base" />
                      <span className="text-xs sm:text-sm text-blue-200">{doctor.designation}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-4 sm:p-6 relative">
                  {/* Department Badge */}
                  <div className={`absolute -top-4 sm:-top-5 right-4 sm:right-6 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center border ${getDepartmentColor(doctor.department)} shadow-sm`}>
                    {getDepartmentIcon(doctor.department)}
                    <span className="ml-1 sm:ml-2 capitalize">
                      {doctor.department?.toLowerCase() === 'ortho' ? 'Orthopedics' :
                        doctor.department?.toLowerCase() === 'neuro' ? 'Neurology' :
                          doctor.department || 'General'}
                    </span>
                  </div>

                  {/* Experience and Rating */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                    <div className="flex items-center text-xs sm:text-sm text-gray-600">
                      <MdWork className="mr-1 sm:mr-2 text-blue-500" />
                      <span>{formatExperience(doctor.experience)}</span>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`${star <= 4 ? 'text-yellow-400' : 'text-gray-300'} text-xs sm:text-sm`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center text-xs sm:text-sm text-gray-700">
                      <FaPhone className="mr-2 sm:mr-3 text-blue-500 min-w-[12px] sm:min-w-[16px]" />
                      <a
                        href={`tel:${doctor.mobile}`}
                        className="hover:text-blue-600 transition hover:underline truncate"
                      >
                        {doctor.mobile || 'Not provided'}
                      </a>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-gray-700">
                      <FaEnvelope className="mr-2 sm:mr-3 text-blue-500 min-w-[12px] sm:min-w-[16px]" />
                      <a
                        href={`mailto:${doctor.email}`}
                        className="hover:text-blue-600 transition hover:underline truncate"
                      >
                        {doctor.email || 'Not provided'}
                      </a>
                    </div>
                    {doctor.age && (
                      <div className="flex items-center text-xs sm:text-sm text-gray-700">
                        <FaCalendarAlt className="mr-2 sm:mr-3 text-blue-500 min-w-[12px] sm:min-w-[16px]" />
                        <span>{doctor.age} years old</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/booking-doctor/${doctor.email}`)}
                    className="w-full py-1.5 sm:py-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md sm:rounded-lg text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  >
                    Book Appointment
                  </motion.button>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 opacity-5 group-hover:opacity-10 transition-opacity">
                    <GiStethoscope className="text-4xl sm:text-5xl md:text-6xl text-blue-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;