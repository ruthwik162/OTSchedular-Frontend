import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { departmentCaseTypes } from '../../assets/assets';
import { GiHeartOrgan, GiBrain, GiBoneKnife, GiStomach, GiCancer, GiFemale, GiSun, GiMeditation, GiScalpel } from "react-icons/gi";
import { MdPsychology } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
import { HiArrowLeftCircle, HiArrowRight, HiArrowRightCircle } from "react-icons/hi2";


const DoctorCard = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [data] = useState(Object.entries(departmentCaseTypes));

  // Enhanced department colors with glass effect


const departmentColors = {
  "Cardiology": { 
    bg: "bg-gradient-to-br from-red-50/70 via-white/50 to-white/20", 
    text: "text-red-600",
    accent: "from-red-400 to-red-600",
    border: "border-red-100/30",
    icon: <GiHeartOrgan className="text-red-500" />,
    highlight: "bg-red-100/30"
  },
  "Neurology": { 
    bg: "bg-gradient-to-br from-blue-50/70 via-white/50 to-white/20", 
    text: "text-blue-600",
    accent: "from-blue-400 to-blue-600",
    border: "border-blue-100/30",
    icon: <GiBrain className="text-blue-500" />,
    highlight: "bg-blue-100/30"
  },
  "Orthopedics": { 
    bg: "bg-gradient-to-br from-green-50/70 via-white/50 to-white/20", 
    text: "text-green-600",
    accent: "from-green-400 to-green-600",
    border: "border-green-100/30",
    icon: <GiBoneKnife className="text-green-500" />,
    highlight: "bg-green-100/30"
  },
  "Gastroenterology": { 
    bg: "bg-gradient-to-br from-yellow-50/70 via-white/50 to-white/20", 
    text: "text-yellow-600",
    accent: "from-yellow-400 to-yellow-600",
    border: "border-yellow-100/30",
    icon: <GiStomach className="text-yellow-500" />,
    highlight: "bg-yellow-100/30"
  },
  "Oncology": { 
    bg: "bg-gradient-to-br from-purple-50/70 via-white/50 to-white/20", 
    text: "text-purple-600",
    accent: "from-purple-400 to-purple-600",
    border: "border-purple-100/30",
    icon: <GiCancer className="text-purple-500" />,
    highlight: "bg-purple-100/30"
  },
  "Gynecology": { 
  bg: "bg-gradient-to-br from-pink-50/70 via-white/50 to-white/20", 
  text: "text-pink-600",
  accent: "from-pink-400 to-pink-600",
  border: "border-pink-100/30",
  icon: <IoFlowerOutline className="text-pink-500" />,
  highlight: "bg-pink-100/30"
},
  "Dermatology": { 
    bg: "bg-gradient-to-br from-orange-50/70 via-white/50 to-white/20", 
    text: "text-orange-600",
    accent: "from-orange-400 to-orange-600",
    border: "border-orange-100/30",
    icon: <GiSun className="text-orange-500" />,
    highlight: "bg-orange-100/30"
  },
  "Psychiatry": { 
    bg: "bg-gradient-to-br from-indigo-50/70 via-white/50 to-white/20", 
    text: "text-indigo-600",
    accent: "from-indigo-400 to-indigo-600",
    border: "border-indigo-100/30",
    icon: <MdPsychology className="text-indigo-500" />,
    highlight: "bg-indigo-100/30"
  },
  "General Surgery": { 
    bg: "bg-gradient-to-br from-teal-50/70 via-white/50 to-white/20", 
    text: "text-teal-600",
    accent: "from-teal-400 to-teal-600",
    border: "border-teal-100/30",
    icon: <GiScalpel className="text-teal-500" />,
    highlight: "bg-teal-100/30"
  }
};


  // Auto-slide effect with pause on hover
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [data, isHovered]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const getCardStyle = (index) => {
    const position = index - currentIndex;
    const isCenter = position === 0;
    const isLeft = position < 0;
    const isRight = position > 0;
    
    return {
      transform: isCenter 
        ? 'translateX(0) scale(1)' 
        : isLeft 
          ? `translateX(calc(-50% - ${Math.abs(position) * 20}px)) scale(${1 - Math.abs(position) * 0.15})`
          : `translateX(calc(50% + ${Math.abs(position) * 20}px)) scale(${1 - Math.abs(position) * 0.15})`,
      zIndex: isCenter ? 10 : 5 - Math.abs(position),
      opacity: isCenter ? 1 : 0.7 - Math.abs(position) * 0.2,
      filter: isCenter ? 'none' : 'blur(1px)',
      pointerEvents: isCenter ? 'auto' : 'none'
    };
  };

  return (
    <div 
      className="relative w-full max-w-9xl md:px-20 ld:px-26 px-5 mx-auto p-4 md:p-8 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center px-5 md:px-20 justify-between mb-6">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center drop-shadow-sm">
        Meet Our <span className="text-indigo-500">Specialists</span>
      </h1>
      <button
        className="p-3 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 text-gray-800 hover:bg-white/50 hover:scale-110 transition-all shadow-md"
        aria-label="Next"
      >
        <HiArrowRight size={22} />
      </button>
    </div>

      {/* Navigation arrows */}
      {/* <motion.button 
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 z-20 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        onClick={nextSlide}
        className="absolute right-2 md:right-1 top-1/2 z-20 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,1)' }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button> */}

      <div className="relative h-96 md:h-96 flex items-center justify-center">
        {data.map(([department, caseTypes], index) => {
          const colors = departmentColors[department];
          const caseCount = caseTypes.length;
          const position = index - currentIndex;
          
          if (Math.abs(position) > 1) return null;
          
          return (
            <motion.div
              key={index}
              className={`absolute w-full md:w-2/3 lg:w-1/2 h-full px-2 md:px-4`}
              style={getCardStyle(index)}
              initial={{ 
                opacity: 0, 
                x: direction > 0 ? '100%' : '-100%',
                scale: 0.8
              }}
              animate={{ 
                opacity: position === 0 ? 1 : 0.7,
                x: position === 0 
                  ? '0%' 
                  : position < 0 
                    ? `calc(-50% - ${Math.abs(position) * 20}px)`
                    : `calc(50% + ${Math.abs(position) * 20}px)`,
                scale: position === 0 ? 1 : 0.85,
                transition: { duration: 0.6 }
              }}
              exit={{ 
                opacity: 0, 
                x: direction > 0 ? '-100%' : '100%',
                transition: { duration: 0.6 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className={`h-full rounded-2xl shadow-lg ${colors.bg} ${colors.border} border backdrop-blur-sm relative overflow-hidden group transition-all duration-300 ${position === 0 ? 'shadow-xl' : 'shadow-md'}`}>
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl" />
                
                {/* Department header */}
                <div className="relative p-6 pb-0 z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl mb-2 p-3 bg-white/30 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm">
                        {colors.icon}
                      </div>
                      <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>{department}</h2>
                      <p className="text-gray-600 text-sm">{caseCount} specialized treatments</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.highlight} ${colors.text} backdrop-blur-sm`}>
                        SPECIALTY
                      </div>
                    </div>
                  </div>
                  <div className={`w-full h-1 mt-4 rounded-full bg-gradient-to-r ${colors.accent} backdrop-blur-sm`}></div>
                </div>
                
                {/* Case types visualization */}
                <div className="relative p-6 h-3/5 md:h-3/5 overflow-hidden z-10">
                  <div className="relative h-full">
                    {/* Animated floating bubbles */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {caseTypes.slice(0, 8).map((_, idx) => {
                          const size = 6 + (idx % 3) * 4;
                          const left = 10 + (idx * 20) % 70;
                          const top = 10 + (idx * 30) % 70;
                          const delay = idx * 0.1;
                          
                          return (
                            <motion.div
                              key={idx}
                              className={`absolute rounded-full ${colors.highlight} shadow-sm backdrop-blur-sm`}
                              style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${left}%`,
                                top: `${top}%`
                              }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ 
                                opacity: [0, 0.8, 0.5], 
                                scale: [0, 1.2, 1],
                                transition: { 
                                  delay,
                                  duration: 1.5,
                                  repeat: Infinity,
                                  repeatType: 'reverse'
                                }
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Main content area */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-white/70 via-white/50 to-transparent`}>
                      <motion.div 
                        className={`p-4 rounded-xl ${colors.highlight} backdrop-blur-sm border ${colors.border} shadow-sm`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className={`font-semibold ${colors.text} mb-1`}>Expert Care</h3>
                        <p className="text-sm text-gray-600">
                          Our {department.toLowerCase()} specialists provide advanced treatments for {caseCount} conditions.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating accent elements */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r ${colors.accent} opacity-5 group-hover:opacity-10 transition-opacity backdrop-blur-sm`}></div>
                <div className={`absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-r ${colors.accent} opacity-5 group-hover:opacity-10 transition-opacity backdrop-blur-sm`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: data.length }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`relative rounded-full ${index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'}`}
            initial={{ width: index === currentIndex ? '1rem' : '0.5rem', height: '0.5rem' }}
            animate={{ 
              width: index === currentIndex ? '1rem' : '0.5rem',
              height: index === currentIndex ? '0.5rem' : '0.5rem',
              backgroundColor: index === currentIndex ? '#4b5563' : '#d1d5db'
            }}
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {index === currentIndex && (
              <motion.span
                layoutId="activeDot"
                className="absolute inset-0 rounded-full bg-gray-600"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DoctorCard;