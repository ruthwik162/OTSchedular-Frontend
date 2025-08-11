import React, { useState, useEffect } from 'react';
import { FaUserMd, FaHospitalSymbol, FaPhone, FaEnvelope, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';
import { GiBrain, GiBoneKnife, GiStethoscope } from 'react-icons/gi';
import { MdWork, MdVerified } from 'react-icons/md';
import { PulseLoader } from 'react-spinners';
import { motion } from 'framer-motion';


const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:8087/user/role/doctor');
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
                return <GiBrain className="text-purple-600 text-2xl" />;
            case 'ortho':
            case 'orthopedic':
                return <GiBoneKnife className="text-blue-600 text-2xl" />;
            default:
                return <GiStethoscope className="text-green-600 text-2xl" />;
        }
    };

    const getDepartmentColor = (department) => {
        switch (department?.toLowerCase()) {
            case 'neurology':
            case 'neuro':
                return 'bg-purple-100 text-purple-800';
            case 'ortho':
            case 'orthopedic':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-green-100 text-green-800';
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
                    {/* Animated medical-themed spinner */}
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

                    {/* Content */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-gray-800">
                            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                                Loading Medical Team
                            </span>
                        </h3>

                        <p className="text-gray-600">
                            Preparing specialist doctors for you
                        </p>

                        {/* Enhanced bouncing dots */}
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

                    {/* Subtle floating elements in background */}
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
            <div className="flex justify-center items-center h-screen">
                <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                    <FaHospitalSymbol className="mx-auto text-4xl text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600">Error Loading Doctors</h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mt-20 mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-lg mb-4">
                        <FaHospitalSymbol className="text-4xl text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Meet Our Specialist Doctors</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Highly qualified medical professionals dedicated to your health and wellbeing
                    </p>
                </div>

                {/* Doctors Grid */}
                {doctors.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                        <FaUserMd className="mx-auto text-5xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium text-gray-700">No Doctors Available</h3>
                        <p className="text-gray-500 mt-2">Please check back later</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Doctor Header with Image */}
                                <div className="relative bg-gradient-to-r from-blue-400 to-blue-600">
                                    {doctor.profileImageUrl ? (
                                        <img
                                            src={doctor.profileImageUrl}
                                            alt={doctor.username}
                                            className="w-full h-full bg-indigo-900 object-cover opacity-90"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaUserMd className="text-6xl text-white opacity-80" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20">
                                        <div className="absolute bottom-3 left-4">
                                            <h2 className="text-xl font-bold text-white">{doctor.username}</h2>
                                            <div className="flex items-center">
                                                <MdVerified className="text-blue-300 mr-1" />
                                                <span className="text-sm text-blue-200">{doctor.designation}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Doctor Details */}
                                <div className="p-6 relative">
                                    {/* Department Badge */}
                                    <div className={`absolute -top-5 right-6 px-3 py-1 rounded-full text-sm font-semibold flex items-center ${getDepartmentColor(doctor.department)}`}>
                                        {getDepartmentIcon(doctor.department)}
                                        <span className="ml-2 capitalize">
                                            {doctor.department?.toLowerCase() === 'ortho' ? 'Orthopedics' : doctor.department || 'General'}
                                        </span>
                                    </div>

                                    {/* Experience and Rating */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <MdWork className="mr-2 text-blue-500" />
                                            <span>{formatExperience(doctor.experience)}</span>

                                        </div>
                                        <div className="flex items-center text-yellow-500">
                                            <div className="flex items-center">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        className={`${star <= 4 ? 'text-yellow-400' : 'text-gray-300'} text-sm`}
                                                    />
                                                ))}
                                            </div>
                                            <span>4.8</span>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-700">
                                            <FaPhone className="mr-3 text-blue-500" />
                                            <a href={`tel:${doctor.mobile}`} className="hover:text-blue-600 transition">
                                                {doctor.mobile || 'Not provided'}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <FaEnvelope className="mr-3 text-blue-500" />
                                            <a href={`mailto:${doctor.email}`} className="hover:text-blue-600 transition truncate">
                                                {doctor.email || 'Not provided'}
                                            </a>
                                        </div>
                                        {doctor.age && (
                                            <div className="flex items-center text-gray-700">
                                                <FaCalendarAlt className="mr-3 text-blue-500" />
                                                <span>{doctor.age} years old</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute bottom-2 right-2 opacity-10">
                                        <GiStethoscope className="text-6xl text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPage;