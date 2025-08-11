import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiEdit, FiSave, FiX, FiCamera, FiUser, FiMail, FiPhone, FiUsers, FiLoader } from 'react-icons/fi';
import { useAppContext } from '../../AppContext/AppContext';
import { FaCog, FaSpinner } from 'react-icons/fa';


const Profile = () => {
    const { user, setUser } = useAppContext();
    const [userData, setUserData] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const { URL } = useAppContext();


    useEffect(() => {
        if (user) {
            setUserData({ ...user });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData((prev) => ({
                    ...prev,
                    profileImageUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('username', userData.username || '');
            formData.append('mobile', userData.mobile || '');
            formData.append('gender', userData.gender || '');
            if (profileImageFile) {
                formData.append('image', profileImageFile);
            }

            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${URL}/user/update/${userData.email}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            const updatedUser = response.data;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            sessionStorage.setItem('user', JSON.stringify(updatedUser));

            setIsEditing(false);
            setProfileImageFile(null);
            toast.success('Profile updated successfully!', {
                style: {
                    background: '#4BB543',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#4BB543'
                }
            });
        } catch (error) {
            console.error('Profile update error details:', error);
            toast.error(
                error.response?.data?.message || 'Failed to update profile. Please try again.',
                {
                    style: {
                        background: '#FF3333',
                        color: '#fff',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    },
                    iconTheme: {
                        primary: '#fff',
                        secondary: '#FF3333'
                    }
                }
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen   py-5 md:py-5 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white mt-18 rounded-2xl shadow-xl overflow-hidden"
                >
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <div className="flex flex-col sm:flex-row items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative mb-4 sm:mb-0 sm:mr-6"
                            >
                                <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden">
                                    <img
                                        src={userData.
                                            profileImageUrl
                                            || 'https://via.placeholder.com/150'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {isEditing && (
                                    <motion.label
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute bottom-0 right-0 bg-white rounded-full p-3 shadow-lg cursor-pointer"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <FiCamera className="h-5 w-5 text-blue-600" />
                                    </motion.label>
                                )}
                            </motion.div>
                            <div className="text-center sm:text-left">
                                <h1 className="text-3xl font-bold">{userData.username}</h1>
                                <p className="text-blue-100">{userData.email}</p>
                                {!isEditing && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsEditing(true)}
                                        className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition flex items-center gap-2"
                                    >
                                        <FiEdit /> Edit Profile
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                        {isEditing ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg"
                                >
                                    <FiUser className="text-blue-600 text-xl" />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={userData.username}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg"
                                >
                                    <FiMail className="text-blue-600 text-xl" />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            disabled
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg"
                                >
                                    <FiPhone className="text-blue-600 text-xl" />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={userData.mobile}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg"
                                >
                                    <FiUsers className="text-blue-600 text-xl" />
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            value={userData.gender}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex justify-end gap-3 pt-1"
                                >
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsEditing(false)}
                                        className="md:px-6 px-4 py-1 md:py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                                    >
                                        <FiX /> Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={!isLoading ? {
                                            scale: 1.05,
                                            boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
                                            backgroundColor: "#2563eb"
                                        } : {}}
                                        whileTap={!isLoading ? {
                                            scale: 0.98,
                                            backgroundColor: "#1e40af"
                                        } : {}}
                                        className="relative px-6 py-3 bg-blue-600 text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-80 overflow-hidden"
                                        style={{ minWidth: "140px" }}
                                    >


                                        <motion.span className="relative z-10 flex flex-row items-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <motion.span
                                                        key="spinner"
                                                        initial={{ opacity: 0, rotate: 0 }}
                                                        animate={{
                                                            opacity: 1,
                                                            rotate: 360,
                                                        }}
                                                        transition={{
                                                            rotate: {
                                                                duration: 1.5, // Slower rotation
                                                                repeat: Infinity,
                                                                ease: "easeInOut",
                                                                times: [0, 0.8, 1], // Spends more time at start/end
                                                            },
                                                            opacity: {
                                                                duration: 0.3
                                                            }
                                                        }}
                                                        className="text-white"
                                                    >
                                                        <FiLoader className="w-5 h-5" />
                                                    </motion.span>
                                                    <motion.span
                                                        key="text"
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        Saving...
                                                    </motion.span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiSave className="w-5 h-5" />
                                                    <span>Save Changes</span>
                                                </>
                                            )}
                                        </motion.span>

                                        {!isLoading && (
                                            <motion.span
                                                className="absolute inset-0 rounded-full bg-white opacity-0"
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                whileTap={{
                                                    scale: 2,
                                                    opacity: 0.2,
                                                    transition: { duration: 0.5 }
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                </motion.div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-blue-50 p-5 rounded-xl"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <FiUser className="text-blue-600 text-xl" />
                                        <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                                    </div>
                                    <p className="text-gray-800 pl-8">{userData.username}</p>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-blue-50 p-5 rounded-xl"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <FiMail className="text-blue-600 text-xl" />
                                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    </div>
                                    <p className="text-gray-800 pl-8">{userData.email}</p>
                                </motion.div>

                                {userData.mobile && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-blue-50 p-5 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiPhone className="text-blue-600 text-xl" />
                                            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                                        </div>
                                        <p className="text-gray-800 pl-8">{userData.mobile}</p>
                                    </motion.div>
                                )}

                                {userData.gender && (
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="bg-blue-50 p-5 rounded-xl"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <FiUsers className="text-blue-600 text-xl" />
                                            <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                                        </div>
                                        <p className="text-gray-800 pl-8 capitalize">{userData.gender}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;