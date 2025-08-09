import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiArrowRight } from "react-icons/fi";
import { FaClinicMedical, FaUserMd, FaCalendarAlt } from "react-icons/fa";

const MedicalBanner = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonHover = {
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.2
            }
        },
        tap: {
            scale: 0.97
        }
    };

    const features = [
        { icon: <FaUserMd size={24} />, text: "Expert Doctors" },
        { icon: <FaClinicMedical size={24} />, text: "Modern Facilities" },
        { icon: <FaCalendarAlt size={24} />, text: "Easy Appointments" }
    ];

    return (
        <motion.div
            className='relative mt-15 md:mt-20 py-10 px-4 md:px-10 z-[0]'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className='w-full max-w-7xl mx-auto flex items-center justify-center relative rounded-xl overflow-hidden bg-blue-900/10'>
                {/* Desktop Banner Image with Parallax Effect */}
                <motion.img
                    src={assets.Mainbanner}  // Update with your medical banner image
                    alt="Healthcare professionals banner"
                    className='w-full hidden md:block object-cover min-h-[500px]'
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Mobile Banner Image */}
                <motion.img
                    src={assets.Mainbanner_sm}  // Update with your mobile medical banner image
                    alt="Healthcare professionals banner"
                    className='w-full md:hidden object-cover min-h-[400px]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Content Overlay */}
                <motion.div
                    className='absolute inset-0  flex flex-col items-center  md:items-start justify-end md:justify-center pb-30 md:pb-0 px-4 md:pl-16 lg:pl-24 bg-gradient-to-t md:bg-gradient-to-r from-blue-900/70 to-transparent'
                    variants={containerVariants}
                >
                    {/* Headline */}
                    <motion.h1
                        className='text-3xl md:text-4xl  lg:text-5xl font-bold text-center md:text-left max-w-2xl leading-tight lg:leading-15 text-white drop-shadow-md'
                        variants={itemVariants}
                    >
                        Compassionate Care, <br className='hidden md:block' /> Advanced Medicine
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        className='mt-4 text-lg text-blue-100 text-center md:text-left max-w-2xl drop-shadow-sm'
                        variants={itemVariants}
                    >
                        Your health is our priority. Experience personalized care from our team of specialists.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        className='flex flex-grid justify-center md:justify-start  gap-4 mt-6'
                        variants={itemVariants}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className='flex items-center gap-1 bg-white/10 backdrop-blur-sm px-1 py-1 md:px-4 md:py-2 rounded-lg border border-white/20'
                                whileHover={{ y: -3 }}
                            >
                                <span className='text-blue-100'>{feature.icon}</span>
                                <span className='text-white text-sm md:text-base'>{feature.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        className='flex flex-col sm:flex-row items-center gap-4 mt-8 font-medium'
                        variants={itemVariants}
                    >
                        <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHover}
                        >
                            <Link
                                to='/appointment'
                                className="group flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white cursor-pointer shadow-lg w-full sm:w-auto"
                            >
                                Book Appointment
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHover}
                        >
                            <Link
                                to="/doctors"
                                className="group flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 transition-all rounded-lg text-blue-800 cursor-pointer shadow-lg w-full sm:w-auto"
                            >
                                Our Specialists
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Emergency Info */}
            <motion.div
                className='mt-6 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-7xl mx-auto'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-white/20 p-2 rounded-full'>
                            <FiAlertTriangle size={24} className='text-red-400' />
                        </div>
                        <div>
                            <h3 className='font-bold text-lg'>Emergency Contact</h3>
                            <p className='text-sm'>Immediate medical assistance available 24/7</p>
                        </div>
                    </div>
                    <a href="tel:+1234567890" className='bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors'>
                        Call Now: (123) 456-7890
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MedicalBanner;