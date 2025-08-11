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
    { name: 'About', path: '/about', icon: <FiUsers size={18} /> },
    { name: 'Departments', path: '/department', icon: <FiLayers size={18} /> },
    { name: 'Doctors', path: '/doctors', icon: <FiUsers size={18} /> },
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
    open: { 
      x: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
    closed: { 
      x: "-100%", 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      } 
    }
  };

  const dropdownVariants = {
    open: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      } 
    },
    closed: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95, 
      transition: { 
        duration: 0.15 
      } 
    }
  };

  const navItemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 transition-all duration-300 z-50 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-200/95 shadow-sm backdrop-blur-md py-3"
          : "py-4 bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <NavLink
        to={isAdmin ? "/adminhome" : "/"}
        className="hover:scale-105 transition-transform duration-200 p-2 flex items-center justify-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label="Home"
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            className="h-10 w-10 object-cover rounded"
            src={assets.Banner}
            alt="Company Logo"
          />
          <h1 className="font-bold text-blue-900/80 text-lg md:text-xl">MediCare</h1>
        </motion.div>
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `group relative flex flex-col gap-0.5 ${
                isActive 
                  ? "text-indigo-600 font-medium" 
                  : "text-gray-700 hover:text-indigo-500"
              }`
            }
            aria-current={location.pathname === link.path ? "page" : undefined}
          >
            <div className="flex items-center gap-2 px-1 py-2">
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {link.icon}
              </motion.span>
              <span>{link.name}</span>
            </div>
            <motion.div
              className={`absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full`}
              initial={{ width: 0 }}
              animate={{ 
                width: location.pathname === link.path ? '100%' : 0,
                backgroundColor: isScrolled ? "#4b5563" : "#6366f1"
              }}
              whileHover={{ width: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </NavLink>
        ))}
      </div>

      {/* Desktop User Actions */}
      <div className="hidden md:flex items-center gap-4">
        {user?.role === "admin" && (
          <motion.button
            onClick={() => navigate("/adminhome")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm shadow-indigo-200"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Admin Dashboard"
          >
            Admin Dashboard
          </motion.button>
        )}

        {!user ? (
          <motion.button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm shadow-indigo-200"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Login"
          >
            Login
          </motion.button>
        ) : (
          <div className="relative" ref={profileDropdownRef}>
            <motion.button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 bg-white/80 hover:bg-indigo-50 p-1.5 rounded-full border border-indigo-100 shadow-sm"
              aria-expanded={isProfileDropdownOpen}
              aria-label="User profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <img
                  src={user?.profileImageUrl || assets.profile_icon}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <span className="text-gray-800 font-medium hidden lg:inline-block pr-1">
                {user.name?.split(' ')[0] || 'Profile'}
              </span>
              <motion.div
                animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FiChevronDown className="w-4 h-4 text-gray-600" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-100 bg-indigo-50/50">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.username || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <motion.button
                    onClick={() => {
                      navigate("/profile");
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/50 transition-colors"
                    aria-label="My Profile"
                    whileHover={{ x: 2 }}
                    whileTap={{ x: 0 }}
                  >
                    <FiUser className="w-4 h-4 mr-2 text-indigo-500" />
                    My Profile
                  </motion.button>
                  {user.role === 'admin' && (
                    <motion.button
                      onClick={() => {
                        navigate("/adminhome");
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/50 transition-colors"
                      aria-label="Admin Dashboard"
                      whileHover={{ x: 2 }}
                      whileTap={{ x: 0 }}
                    >
                      <FiSettings className="w-4 h-4 mr-2 text-indigo-500" />
                      Admin Dashboard
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50/50 transition-colors border-t border-gray-100"
                    aria-label="Sign Out"
                    whileHover={{ x: 2 }}
                    whileTap={{ x: 0 }}
                  >
                    <FiLogOut className="w-4 h-4 mr-2 text-indigo-500" />
                    Sign Out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {!user ? (
          <motion.button
            onClick={() => setShowUserLogin(true)}
            className="px-4 py-1.5 bg-indigo-900/70 hover:bg-blue-900/40 text-white rounded-sm text-sm font-medium shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Login"
          >
            Login
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="p-1.5 rounded-full border border-indigo-100 shadow-sm"
            aria-expanded={isProfileDropdownOpen}
            aria-label="User profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={user?.profileImageUrl || assets.profile_icon}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </motion.button>
        )}
        
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-md ${isScrolled ? "bg-indigo-100" : "bg-indigo-100/80"}`}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className={`h-6 w-6 ${isScrolled ? "text-black" : "text-black"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <motion.path
              animate={isMenuOpen ? "open" : "closed"}
              variants={{
                closed: { d: "M4 6h16M4 12h16M4 18h16" },
                open: { d: "M6 18L18 6M6 6l12 12" }
              }}
              transition={{ duration: 0.3 }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-sm text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 z-40"
          >
            <motion.button
              className="absolute top-6 right-6 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Logo in Mobile Menu */}
            <motion.div
              className="absolute top-6 left-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <NavLink to="/" className="flex items-center gap-2">
                <img
                  className="h-10 w-10 object-cover rounded"
                  src={assets.Banner}
                  alt="Company Logo"
                />
                <h1 className="font-bold text-blue-900/80 text-lg">MediCare</h1>
              </NavLink>
            </motion.div>

            {/* Animated Navigation Links */}
            <motion.div
              className="w-full px-8 flex flex-col gap-2 mt-16"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                },
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  variants={navItemVariants}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? "bg-indigo-100 text-indigo-600" 
                          : "hover:bg-indigo-50 text-gray-700"
                      }`
                    }
                    aria-current={location.pathname === link.path ? "page" : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {link.icon}
                      </motion.span>
                      <span>{link.name}</span>
                    </div>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>

            {/* User Section with Animation */}
            {user && (
              <motion.div
                className="flex flex-col items-center gap-2 mt-4 w-full px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={user?.profileImageUrl || assets.profile_icon}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-md"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                </motion.div>
                <p className="font-medium text-gray-900">{user.username || 'User'}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </motion.div>
            )}

            {/* Action Buttons with Animation */}
            <motion.div
              className="flex flex-col items-center justify-center gap-3 w-full px-8 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (user ? navLinks.length * 0.1 + 0.4 : navLinks.length * 0.1 + 0.2) }}
            >
              {user && (
                <>
                  {isAdmin && (
                    <motion.button
                      onClick={() => {
                        navigate("/adminhome");
                        setIsMenuOpen(false);
                      }}
                      className="w-full max-w-xs px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Admin Dashboard
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                    className="w-full max-w-xs px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Profile
                  </motion.button>
                </>
              )}

              {!user ? (
                <motion.button
                  onClick={() => setShowUserLogin(true)}
                  className="w-full max-w-xs px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full max-w-xs px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;