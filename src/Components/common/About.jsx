import React from 'react';
import { motion } from 'framer-motion';
import {
    FaHeartbeat, FaBrain, FaBone, FaLungs, FaProcedures,
    FaFemale, FaTooth, FaUserMd, FaClinicMedical,
    FaHospital, FaXRay, FaMicroscope, FaAmbulance,
    FaPhoneAlt, FaCalendarAlt, FaMapMarkerAlt, FaClock
} from 'react-icons/fa';
import { assets } from '../../assets/assets';
import DoctorCard from './DoctorCard';
import { FiUser } from 'react-icons/fi';

// Professional healthcare color palette
const colors = {
    primary: '#0d3b66',      // Deep blue (trust, stability)
    secondary: '#ffffff',     // White
    accent: '#2a9d8f',       // Teal (health, renewal)
    emergency: '#e63946',    // Emergency red (critical care)
    dark: '#1a1a1a',         // Dark text
    lightBg: '#f8f9fa',      // Light background
    lightBlue: '#e6f2ff'     // Subtle blue tint
};

// ... (departmentCaseTypes, surgeons, facilities remain the same)
export const departmentCaseTypes = {
    Cardiology: [
        "Heart Attack",
        "Arrhythmia",
        "Hypertension",
        "Angina",
        "Congenital Heart Disease",
        "Heart Failure",
        "Coronary Artery Disease",
        "Valvular Heart Disease",
    ],
    Neurology: [
        "Stroke",
        "Epilepsy",
        "Brain Tumor",
        "Parkinson's Disease",
        "Multiple Sclerosis",
        "Migraine",
        "Alzheimer's Disease",
        "ALS",
    ],
    Orthopedics: [
        "Fracture",
        "Arthritis",
        "Dislocation",
        "Ligament Tear",
        "Joint Replacement",
        "Osteoporosis",
        "Scoliosis",
        "Carpal Tunnel Syndrome",
    ],
    Gastroenterology: [
        "Ulcers",
        "Hepatitis",
        "IBS",
        "Gallstones",
        "Pancreatitis",
        "GERD",
        "Crohn's Disease",
        "Colon Cancer",
    ],
    Oncology: [
        "Breast Cancer",
        "Lung Cancer",
        "Leukemia",
        "Skin Cancer",
        "Brain Cancer",
        "Prostate Cancer",
        "Lymphoma",
        "Ovarian Cancer",
    ],
    Gynecology: [
        "PCOD",
        "Fibroids",
        "Endometriosis",
        "Pregnancy",
        "Infertility",
        "Menopause",
        "Ovarian Cysts",
        "Cervical Cancer",
    ],
    Dermatology: [
        "Acne",
        "Eczema",
        "Psoriasis",
        "Fungal Infection",
        "Skin Allergy",
        "Melanoma",
        "Rosacea",
        "Vitiligo",
    ],
    Psychiatry: [
        "Depression",
        "Anxiety",
        "Bipolar Disorder",
        "Schizophrenia",
        "PTSD",
        "OCD",
        "ADHD",
        "Eating Disorders",
    ],
    "General Surgery": [
        "Appendicitis",
        "Hernia",
        "Gallbladder",
        "Tonsillitis",
        "Hemorrhoids",
        "Varicose Veins",
        "Thyroid Disorders",
        "Breast Surgery",
    ],
};

const facilities = [
    {
        name: "Digital X-Ray",
        description: "High-resolution digital imaging for accurate diagnosis",
        icon: <FaXRay className="text-4xl" />,
        image: assets.xray
    },
    {
        name: "CT Scan",
        description: "128-slice CT scanner for detailed cross-sectional imaging",
        icon: <FaHospital className="text-4xl" />,
        image: assets.ctscan
    },
    {
        name: "MRI",
        description: "1.5 Tesla MRI machine for advanced neurological and musculoskeletal imaging",
        icon: <FaMicroscope className="text-4xl" />,
        image: assets.mri
    }
];

const surgeons = [
    {
        name: "Dr. V. Rajesh",
        specialization: "Orthopedic Specialist",
        experience: "15+ years",
        education: "MS (Ortho), Fellowship in Joint Replacement",

        image: assets.doctor1
    },
    {
        name: "Dr. V. Ashok",
        specialization: "Senior Orthopedic Surgeon",
        experience: "20+ years",
        education: "MD, DNB (Ortho)",

        image: assets.doctor2
    },
    {
        name: "Dr. T. Sanjay",
        specialization: "Senior Neurosurgeon",
        experience: "18+ years",
        education: "MCh (Neurosurgery), FIAGES",
        image: assets.doctor3
    },
    {
        name: "Dr. M. Charan",
        specialization: "Neurologist",
        experience: "12+ years",
        education: "DM (Neurology), PDF (Epilepsy)",
        image: assets.doctor4
    },
    {
        name: "Dr. Samuel",
        specialization: "Senior General Surgeon",
        experience: "25+ years",
        education: "MS (General Surgery), FMAS",
        image: assets.doctor5
    },
    {
        name: "Dr. Priya Sharma",
        specialization: "Cardiologist",
        experience: "14+ years",
        education: "DM (Cardiology), FACC",
        image: assets.doctor6
    }
];

// Updated department icons with healthcare colors


const About = () => {
    return (
        <motion.div
            className="px-4 sm:px-6 lg:px-25 py-12"
            style={{ backgroundColor: colors.lightBg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section with Medical Blue */}
            <motion.div
                className="relative rounded-3xl md:mt-15 mt-13 overflow-hidden mb-16 bg-gradient-to-r from-cyan-800 to-blue-900"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-opacity-20 bg-blue-900"></div>
                <div className="relative md:flex items-center justify-around z-10 py-20 px-8 text-center">
                    <div>
                        <img src={assets.Banner} className='w-70 object-cover' alt="" />
                    </div>
                    <div>
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="block mb-2 text-cyan-300">Veena Medicare Hospital</span>
                            Excellence in Healthcare
                        </motion.h1>
                        <motion.p
                            className="text-xl text-cyan-100 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Compassionate care combined with cutting-edge medical technology
                        </motion.p>
                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <button
                                className="bg-white text-cyan-800 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-cyan-50 transition-all duration-300 flex items-center mx-auto"
                            >
                                <FaCalendarAlt className="mr-2" /> Book Appointment
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 relative z-20 px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
            >
                {[
                    { value: "150+", label: "Beds", icon: <FaHospital className="text-xl" /> },
                    { value: "25+", label: "Specialists", icon: <FaUserMd className="text-xl" /> },
                    { value: "50k+", label: "Patients", icon: <FaHeartbeat className="text-xl" /> },
                    { value: "24/7", label: "Emergency", icon: <FaAmbulance className="text-xl" /> }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white flex flex-col items-center justify-center p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 border border-blue-50"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex justify-center mb-2">
                            <div className="p-2 rounded-full bg-cyan-50 text-cyan-700">
                                {stat.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-blue-900">{stat.value}</h3>
                            <p className="text-blue-700 text-sm font-medium">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>


            {/* Departments Section */}
            <div className="relative mb-20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 transform -skew-y-2 rounded-3xl -z-10"
                    style={{ top: '20%', height: '80%' }}
                ></div>

                <motion.section
                    className="relative pt-16 pb-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-14">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
                            initial={{ y: -20 }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                        >
                            Medical Specialties
                        </motion.h2>
                        <motion.p
                            className="text-lg text-blue-700 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Comprehensive care across all medical disciplines
                        </motion.p>
                    </div>
                    <DoctorCard />

                </motion.section>
            </div>

            {/* Facilities Section */}
            <motion.section
                className="mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-14">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-blue-900"
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                    >
                        Advanced Medical Facilities
                    </motion.h2>
                    <motion.p
                        className="text-lg text-blue-700 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        State-of-the-art diagnostic and treatment technology
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 items-center justify-center md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl   overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group border border-blue-50 flex flex-col"
                            variants={cardVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* 1:1 Square Image */}
                            <div className="relative  overflow-hidden">
                                <motion.img
                                    src={facility.image}
                                    alt={facility.name}
                                    className="w-60 object-cover flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-70"></div>
                                <div className="absolute bottom-4 left-4">
                                    <div className="p-3 rounded-full bg-cyan-500 text-white">
                                        {React.cloneElement(facility.icon, { className: "text-white text-2xl" })}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-bold mb-1 text-blue-900">{facility.name}</h3>
                                <p className="text-blue-700 text-sm flex-1">{facility.description}</p>
                                <button className="mt-3 text-sm font-semibold flex items-center text-cyan-700">
                                    Learn more <span className="ml-1">→</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>


            {/* Doctors Section */}
            <motion.section
                className="mb-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="text-center mb-14">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-blue-900"
                        initial={{ y: -20 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Medical Experts
                    </motion.h2>
                    <motion.p
                        className="text-lg text-blue-700 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Board-certified specialists dedicated to your health
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {surgeons.map((doctor, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group border border-blue-50"
                            variants={cardVariants}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.2 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="relative h-40 overflow-hidden">
                                {typeof doctor.image === "string" ? (
                                    <div className="relative h-60 w-60 mx-auto rounded-full border-4 border-cyan-500 overflow-hidden shadow-lg">
                                        {/* Decorative background circle */}
                                        <div className="absolute w-72 h-72 rounded-full bg-blue-200 opacity-30 -bottom-16 -left-16 blur-xl"></div>

                                        {/* Profile Image */}
                                        <motion.img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-60 w-60 mx-auto rounded-full border-4 border-gray-300 bg-gray-100 shadow-inner">
                                        <FiUser className="text-7xl text-gray-400" />
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-70"></div>
                                <div className="absolute bottom-0 left-0 p-6 w-full">
                                    <h3 className="text-2xl font-bold text-black">{doctor.name}</h3>
                                    <p className="text-gray-300">{doctor.specialization}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center mb-3">
                                    <span className="w-3 h-3 rounded-full mr-2 bg-cyan-500"></span>
                                    <span className="text-sm font-medium text-blue-700">{doctor.experience} experience</span>
                                </div>
                                <p className="text-blue-700 mb-4">{doctor.education}</p>
                                <button
                                    className="w-full py-2 rounded-lg font-semibold border-2 hover:bg-blue-50 transition-colors duration-300 border-cyan-500 text-cyan-700"
                                >
                                    View Profile
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Emergency CTA Section */}
            <motion.div
                className="rounded-3xl overflow-hidden mb-5"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative">
                    <img
                        src={assets.emergencyBg}
                        alt="Emergency"
                        className="w-full h-90 md:h-55 lg:h-55 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-6 text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">24/7 Emergency Care</h3>
                            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                                Immediate medical attention when you need it most
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button className="bg-white text-red-700 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-red-50 transition-all duration-300 flex items-center justify-center">
                                    <FaPhoneAlt className="mr-2" /> Call Emergency
                                </button>
                                <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-red-700 transition-all duration-300 flex items-center justify-center">
                                    <FaMapMarkerAlt className="mr-2" /> Get Directions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Mission/Vision Section */}
            <motion.div
                className="grid md:grid-cols-2 gap-8 mb-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div
                    className="p-8 rounded-3xl text-white relative overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-800"
                >
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 bg-cyan-400"></div>
                    <div className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full opacity-10 bg-blue-300"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-6 flex items-center">
                            <FaHeartbeat className="mr-3 text-cyan-300" /> Our Mission
                        </h3>
                        <p className="text-lg opacity-90">
                            To provide exceptional healthcare through innovation, compassion, and clinical
                            excellence while putting patients at the center of everything we do.
                        </p>
                    </div>
                </div>

                <div
                    className="p-8 rounded-3xl relative overflow-hidden border border-blue-100 bg-gradient-to-br from-blue-900 to-cyan-800"
                >
                    <div className="absolute -right-20 top-30 w-60 h-60 rounded-full opacity-10 bg-cyan-200"></div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center text-blue-100">
                        <FaBrain className="mr-3 text-cyan-500" /> Our Vision
                    </h3>
                    <p className="text-lg text-blue-100">
                        To be recognized as a global leader in patient-centered care, medical innovation,
                        and community health transformation.
                    </p>
                    <div className="mt-6 pt-6 border-t border-blue-100">
                        <div className="flex items-center text-blue-100 mb-2">
                            <FaClock className="mr-2 text-cyan-600" /> <span>Mon-Sun: 24/7 Services</span>
                        </div>
                        <div className="flex items-center text-blue-100">
                            <FaMapMarkerAlt className="mr-2 text-cyan-600" /> <span>123 Healing Street, Medical City</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Final CTA Section */}
            <motion.div
                className="rounded-3xl p-12 text-center relative overflow-hidden bg-gradient-to-r from-cyan-700 to-blue-800"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-40 h-40 rounded-full bg-cyan-300 top-[-50px] right-[-50px]"></div>
                    <div className="absolute w-60 h-60 rounded-full bg-blue-300 bottom-[-100px] left-[-100px]"></div>
                </div>
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Health Journey Starts Here</h3>
                    <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
                        Schedule your consultation with our specialists today
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-white text-cyan-800 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center mx-auto sm:mx-0">
                            <FaPhoneAlt className="mr-2" /> Call Now
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-cyan-800 transition-all duration-300 flex items-center justify-center mx-auto sm:mx-0">
                            <FaCalendarAlt className="mr-2" /> Book Online
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ... (animation variants remain the same)

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            duration: 0.8
        }
    }
};

const cardVariants = {
    offscreen: {
        y: 60,
        opacity: 0,
        scale: 0.95
    },
    onscreen: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export default About;