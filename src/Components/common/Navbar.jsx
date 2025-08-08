import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../AppContext/AppContext";
import { FiCalendar, FiHome, FiLayers, FiUsers, FiChevronDown, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, URL, setUser, navigate, logout, setShowUserLogin } = useAppContext();
    const location = useLocation();
    const isAdmin = user?.role === "admin";
    
    // Navigation links
    const navLinks = [
        { name: 'Home', path: '/', icon: <FiHome size={18} /> },
        { name: 'Departments', path: '/department', icon: <FiLayers size={18} /> },
        { name: 'Doctors', path: '/faculty', icon: <FiUsers size={18} /> },
        ...(user ? [{ name: 'My Appointments', path: '/my-appointment', icon: <FiCalendar size={18} /> }] : [])
    ];

    // State management
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            const email = localStorage.getItem("email");
            if (!user && email) {
                try {
                    const res = await fetch(`${URL}/api/users`);
                    if (!res.ok) throw new Error("Failed to fetch users");
                    const data = await res.json();
                    const currentUser = data.find(u => u.email === email);
                    if (currentUser) setUser(currentUser);
                } catch (err) {
                    console.error("Failed to fetch user:", err);
                }
            }
        };
        fetchUser();
    }, [user, setUser, URL]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when navigating
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Animation variants
    const mobileMenuVariants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } }
    };

    const dropdownVariants = {
        open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <nav 
            className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-500 z-50 ${
                isScrolled 
                    ? "bg-white/90 dark:bg-gray-200/90 shadow-sm backdrop-blur-lg py-3" 
                    : "py-4 bg-transparent"
            }`}
            aria-label="Main navigation"
        >
            {/* Logo */}
            <NavLink
                to={isAdmin ? "/adminhome" : "/"}
                className="hover:scale-110 transition-transform duration-200 p-2 flex items-center justify-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label="Home"
            >
                <motion.img
                    className="h-12 w-auto object-cover rounded"
                    src={assets.Banner}
                    alt="Company Logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                />
                <h1 className="font-bold text-blue-900/70">MediCare</h1>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <NavLink 
                        key={i} 
                        to={link.path} 
                        className={({ isActive }) => 
                            `group flex flex-col gap-0.5 ${isActive ? "text-indigo-600 font-medium" : "text-gray-700 hover:text-indigo-500"}`
                        }
                        aria-current={location.pathname === link.path ? "page" : undefined}
                    >
                        <div className="flex items-center gap-2">
                            {link.icon}
                            {link.name}
                        </div>
                        <div className={`h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                            isScrolled ? "bg-gray-700" : "bg-indigo-500"
                        }`} />
                    </NavLink>
                ))}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-4">
                {user?.role === "admin" && (
                    <motion.button
                        onClick={() => navigate("/adminhome")}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Admin Dashboard"
                    >
                        Admin Dashboard
                    </motion.button>
                )}

                {!user ? (
                    <motion.button
                        onClick={() => setShowUserLogin(true)}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Login"
                    >
                        Login
                    </motion.button>
                ) : (
                    <div className="relative" ref={profileDropdownRef}>
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center gap-2 bg-indigo-200 p-2 rounded-full "
                            aria-expanded={isProfileDropdownOpen}
                            aria-label="User profile"
                        >
                            <div className="relative">
                                <motion.img
                                    src={user?.profileImageUrl || assets.profile_icon}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            </div>
                            <span className="text-gray-800 font-medium hidden lg:inline-block">
                                {user.name?.split(' ')[0] || 'Profile'}
                            </span>
                            <FiChevronDown 
                                className={`w-4 h-4 text-gray-600 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {isProfileDropdownOpen && (
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={dropdownVariants}
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100"
                                >
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900 truncate">{user.username || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            navigate("/profile");
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        aria-label="My Profile"
                                    >
                                        <FiUser className="w-4 h-4 mr-2" />
                                        My Profile
                                    </button>
                                    {user.role === 'admin' && (
                                        <button
                                            onClick={() => {
                                                navigate("/adminhome");
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            aria-label="Admin Dashboard"
                                        >
                                            <FiSettings className="w-4 h-4 mr-2" />
                                            Admin Dashboard
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsProfileDropdownOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        aria-label="Sign Out"
                                    >
                                        <FiLogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2  bg-blue-900/70 rounded-md"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <svg
                        className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                        className="fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 z-40"
                    >
                        <button 
                            className="absolute top-6 right-6 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {navLinks.map((link, i) => (
                            <NavLink 
                                key={i} 
                                to={link.path} 
                                className={({ isActive }) => 
                                    `px-4 py-2 rounded-lg ${isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-50"}`
                                }
                                aria-current={location.pathname === link.path ? "page" : undefined}
                            >
                                <div className="flex items-center gap-3">
                                    {link.icon}
                                    {link.name}
                                </div>
                            </NavLink>
                        ))}

                        {user && (
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <motion.img
                                    src={user?.profileImageUrl || assets.profile_icon}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <p className="font-medium text-gray-900">{user.username || 'User'}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 w-full px-8 mt-4">
                            <button
                                onClick={() => {
                                    navigate("/profile");
                                    setIsMenuOpen(false);
                                }}
                                className="w-full px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full text-sm font-medium"
                            >
                                Profile
                            </button>

                            {!user ? (
                                <button
                                    onClick={() => setShowUserLogin(true)}
                                    className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                                >
                                    Login
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;