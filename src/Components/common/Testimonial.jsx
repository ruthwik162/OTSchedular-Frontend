import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaUserCircle, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  // Testimonial data structure
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Cardiology Patient",
      department: "Cardiology",
      rating: 5,
      content: "The cardiac team saved my life with their quick response and expert care. The facilities are world-class and the staff made me feel safe throughout my treatment.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Orthopedics Patient",
      department: "Orthopedics",
      rating: 4,
      content: "After my knee replacement, I'm back to hiking thanks to Dr. Rodriguez and the physical therapy team. The entire process was explained clearly at every step.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Pediatrics Parent",
      department: "Pediatrics",
      rating: 5,
      content: "My daughter's asthma treatment has been exceptional. The pediatric team is so patient with children and the child-friendly environment makes all the difference.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  const departmentColors = {
  Cardiology: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-600',
    accent: 'from-red-400 to-red-600'
  },
  Neurology: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    accent: 'from-purple-400 to-purple-600'
  },
  Orthopedics: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    accent: 'from-blue-400 to-blue-600'
  },
  Gastroenterology: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    accent: 'from-amber-400 to-amber-600'
  },
  Oncology: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    text: 'text-pink-600',
    accent: 'from-pink-400 to-pink-600'
  },
  Gynecology: {
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    text: 'text-fuchsia-600',
    accent: 'from-fuchsia-400 to-fuchsia-600'
  },
  Dermatology: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-600',
    accent: 'from-yellow-400 to-yellow-600'
  },
  Psychiatry: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-600',
    accent: 'from-indigo-400 to-indigo-600'
  },
  "General Surgery": {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    accent: 'from-green-400 to-green-600'
  },
  Pediatrics: {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-600',
    accent: 'from-teal-400 to-teal-600'
  },
  default: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-600',
    accent: 'from-gray-400 to-gray-600'
  }
};

  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get department colors
  const getDepartmentColors = (dept) => {
    return departmentColors[dept] || departmentColors["Cardiology"]; // Default to Cardiology if not found
  };

  return (
    <div className="relative w-full max-w-9xl md:px-29 px-5 mx-auto p-4 md:p-8 overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12 text-center">
        <motion.h1 
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Patient <span className="text-indigo-500">Stories</span>
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Hear from those who've experienced our care firsthand
        </motion.p>
      </div>

      {/* Testimonial Carousel */}
      <div 
        className="relative h-[500px] md:h-[400px] flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence custom={direction} initial={false}>
          {testimonials.map((testimonial, index) => {
            if (index !== currentIndex) return null;
            
            const colors = getDepartmentColors(testimonial.department);
            
            return (
              <motion.div
                key={testimonial.id}
                className="absolute w-full md:w-2/3 lg:w-1/2 h-full px-2 md:px-4"
                initial={{ 
                  opacity: 0,
                  x: direction > 0 ? 300 : -300
                }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
                exit={{ 
                  opacity: 0,
                  x: direction > 0 ? -300 : 300,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`h-full rounded-2xl ${colors.bg} ${colors.border} border backdrop-blur-sm relative overflow-hidden shadow-xl`}>
                  {/* Floating elements */}
                  <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-r ${colors.accent} opacity-20`}></div>
                  
                  {/* Testimonial Content */}
                  <div className="relative p-8 h-full flex flex-col justify-center z-10">
                    <FaQuoteLeft className={`text-4xl ${colors.text} opacity-30 mb-6`} />
                    
                    <motion.p 
                      className="text-lg md:text-xl text-gray-700 mb-8 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {testimonial.content}
                    </motion.p>
                    
                    <div className="flex items-center mt-auto">
                      <div className="mr-4">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        ) : (
                          <FaUserCircle className="text-4xl text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-bold ${colors.text}`}>{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-sm`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevTestimonial}
          className="absolute left-0 md:-left-10 p-3 rounded-full bg-white backdrop-blur-lg border border-white/40 text-gray-800 hover:bg-white/50 hover:scale-110 transition-all shadow-md z-10"
          aria-label="Previous"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={nextTestimonial}
          className="absolute right-0 md:-right-10 p-3 rounded-full bg-white backdrop-blur-lg border border-white/40 text-gray-800 hover:bg-white/50 hover:scale-110 transition-all shadow-md z-10"
          aria-label="Next"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="relative rounded-full bg-gray-300"
            whileHover={{ scale: 1.3 }}
            animate={{
              width: currentIndex === index ? '1rem' : '0.5rem',
              height: '0.5rem',
              backgroundColor: currentIndex === index ? '#4b5563' : '#d1d5db'
            }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
            {currentIndex === index && (
              <motion.span
                layoutId="testimonialDot"
                className="absolute inset-0 rounded-full bg-gray-600"
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Ready to share your experience?
        </h2>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-all">
          Submit Your Testimonial
        </button>
      </motion.div>
    </div>
  );
};

export default Testimonials;