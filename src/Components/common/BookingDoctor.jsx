import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUserMd, FaStethoscope, FaInfoCircle, FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdDateRange, MdAccessTime } from "react-icons/md";
import { useAppContext } from "../../AppContext/AppContext";
import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { FiLoader, FiSkipBack } from "react-icons/fi";
import { GiStethoscope } from "react-icons/gi";

const BookingDoctor = () => {
    const { email } = useParams();
    const { URL, user } = useAppContext();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [form, setForm] = useState({
        subject: "",
        message: "",
        date: "",
        slot: "",
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [availableSlots, setAvailableSlots] = useState([]);

    // Fetch doctor details
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await fetch(`${URL}/user/email/${email}`);
                if (!res.ok) throw new Error("Doctor not found");
                const data = await res.json();
                setDoctor(data);
                generateTimeSlots();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
    }, [email, URL]);

    const generateTimeSlots = () => {
        const slots = [
            "9:00 AM - 9:30 AM",
            "9:30 AM - 10:00 AM",
            "10:00 AM - 10:30 AM",
            "11:30 AM - 12:00 PM",
            "12:00 PM - 12:30 PM",
            "2:00 PM - 2:30 PM",
            "2:30 PM - 3:00 PM",
            "3:00 PM - 3:30 PM",
            "6:00 PM - 6:30 PM",
            "6:30 PM - 7:00 PM",
            "7:00 PM - 7:30 PM"
        ];
        setAvailableSlots(slots);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch(`${URL}/ot/appointments/doctor`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorEmail: email,
                    patientEmail: user?.email,
                    patientName: user?.username,
                    ...form,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Booking failed");

            toast.success("Appointment booked successfully!", {
                icon: "👨‍⚕️",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            navigate("/my-appointment");
        } catch (err) {
            toast.error(err.message, {
                icon: "⚠️",
                style: {
                    borderRadius: "10px",
                    background: "#ff3333",
                    color: "#fff",
                },
            });
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
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
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
            >
                <div className="bg-red-100 border-l-4 border-red-500 p-4 w-full max-w-md">
                    <div className="flex items-center">
                        <FaInfoCircle className="text-red-500 text-xl mr-2" />
                        <h3 className="text-red-700 font-bold">Error</h3>
                    </div>
                    <p className="text-red-600 mt-2">{error}</p>
                    <button
                        onClick={() => navigate("/doctors")}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Back to Doctors
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen  py-2 md:py-2 lg:py-2 px-4 sm:px-6 lg:px-8"
        >
            
            <div className="max-w-5xl mt-20 mx-auto">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="text-center mb-12 relative"
                >
                    
                    <div className="absolute top-4 md:-left-6 w-30 h-30 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute right-4 -bottom-6 md:-right-6 w-20 h-20 bg-indigo-100 rounded-full opacity-50"></div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl relative z-10">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Book an Appointment
                        </span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
                        Schedule your consultation with <span className="font-semibold text-blue-600">Dr. {doctor.username}</span>
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                    </div>
                </motion.div>
                <button onClick={()=>navigate(-1)} className="font-bold cursor-pointer border-blue-200 text-violet-800 transform flex items-center pb-2 border-2 p-2 rounded-md justify-center gap-2"><FaArrowLeft />Go Back</button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Doctor Info Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col"
                    >
                        <div className="p-6 flex-1">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                        <img src={doctor.profileImageUrl} alt="" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Dr. {doctor.username}
                                    </h2>
                                    <div className="flex items-center mt-1 text-blue-600">
                                        <FaStethoscope className="mr-2" />
                                        <span className="font-medium">{doctor.department}</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-gray-600">
                                        <MdEmail className="mr-2" />
                                        <span>{doctor.email}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    About the Doctor
                                </h3>
                                <p className="text-gray-600">
                                    {doctor.bio || "Highly experienced professional with expertise in their field. Committed to providing the best care for patients."}
                                </p>
                            </div>
                        </div>
                        

                        {/* Centered and smaller doctor image */}
                        <div className="mt-auto px-6 pb-6 flex justify-center">
                            <div className="w-64 h-64 flex items-center justify-center">
                                <img
                                    src={assets.Banner}
                                    alt="Doctor illustration"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        
                    </motion.div>

                    {/* Booking Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-xl overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                Appointment Details
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Consultation Subject
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="e.g. General Checkup, Pain Consultation"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Additional Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Describe your symptoms or concerns..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Appointment Date
                                        </label>
                                        <div className="relative">
                                            <MdDateRange className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="date"
                                                name="date"
                                                value={form.date}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split("T")[0]}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Time Slot
                                        </label>
                                        <div className="relative">
                                            <MdAccessTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <select
                                                name="slot"
                                                value={form.slot}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition"
                                                required
                                            >
                                                <option value="">Select a time slot</option>
                                                {availableSlots.map((slot, index) => (
                                                    <option key={index} value={slot}>
                                                        {slot}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-red-50 border-l-4 border-red-500 p-4"
                                        >
                                            <div className="flex items-center">
                                                <FaInfoCircle className="text-red-500 mr-2" />
                                                <p className="text-red-700">{error}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3 cursor-pointer px-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                                >
                                    {submitting ? (
                                        <>
                                            <FiLoader className="animate-spin mr-2 text-white" size={18} />
                                            Processing...
                                        </>
                                    ) : (
                                        "Confirm Appointment"
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default BookingDoctor;