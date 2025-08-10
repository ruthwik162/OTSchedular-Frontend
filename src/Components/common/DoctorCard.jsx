import React, { useEffect, useState, useRef } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
import { GiHeartOrgan, GiBrain, GiBoneKnife, GiStomach, GiCancer, GiFemale, GiSun, GiMeditation, GiScalpel } from "react-icons/gi";
import { MdPsychology } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";
import { HiArrowLeftCircle, HiArrowRight, HiArrowRightCircle } from "react-icons/hi2";
import { departmentCaseTypes } from '../../assets/assets';

// ... (keep your departmentColors object exactly as is)
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

const DoctorCard = () => {
  const [data] = useState(Object.entries(departmentCaseTypes));
  
  // Create extended array for infinite loop
  const extendedData = [...data, ...data, ...data];
  const middleIndex = data.length; // starting point in the middle copy
  
  const [currentIndex, setCurrentIndex] = useState(middleIndex);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const sliderRef = useRef(null);

  // Define getClientX before it's used
  const getClientX = (e) => {
    if ("clientX" in e) return e.clientX;
    if (e.touches?.[0]) return e.touches[0].clientX;
    if (e.changedTouches?.[0]) return e.changedTouches[0].clientX;
    return 0;
  };

  // Handle drag start
  const handleDragStart = (e) => {
    setDragStartX(getClientX(e));
  };

  // Handle drag end with momentum
  const handleDragEnd = (e, info) => {
    const dragDistance = getClientX(e) - dragStartX;
    const velocity = info.velocity.x;
    
    if (Math.abs(dragDistance) > 100 || Math.abs(velocity) > 500) {
      if (dragDistance > 0 || velocity > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // Auto-slide with optimized timing
  useEffect(() => {
    if (isHovered || data.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isHovered, currentIndex, data.length]);

  // Next slide function
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => prev + 1);
  };

  // Previous slide function
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  };

  // Reset position when reaching edges to keep loop infinite
  useEffect(() => {
    if (currentIndex >= middleIndex + data.length) {
      // Jump to middle without animation when reaching right edge
      setCurrentIndex(middleIndex);
    } else if (currentIndex < middleIndex) {
      // Jump to middle without animation when reaching left edge
      setCurrentIndex(middleIndex + data.length - 1);
    }
  }, [currentIndex, data.length, middleIndex]);

  // Optimized card positioning with spring physics
  const getCardStyle = (index) => {
    const position = index - currentIndex;
    const absPosition = Math.abs(position);
    
    return {
      x: position === 0 ? 0 : position * 300,
      scale: position === 0 ? 1 : 1 - absPosition * 0.15,
      zIndex: 10 - absPosition,
      opacity: 1 - absPosition * 0.3,
      filter: position === 0 ? 'none' : 'blur(1px)',
      pointerEvents: position === 0 ? 'auto' : 'none',
      transition: {
        type: "spring",
        stiffness: position === 0 ? 400 : 300,
        damping: 30,
        mass: 0.5
      }
    };
  };

  // Only render visible cards for better performance
  const getVisibleIndices = () => {
    const indices = [];
    indices.push(currentIndex - 1);
    indices.push(currentIndex);
    indices.push(currentIndex + 1);
    return indices;
  };

  // Get the actual data index from extended array index
  const getDataIndex = (index) => {
    return index % data.length;
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
          onClick={nextSlide}
          className="p-3 rounded-full bg-white md:block hidden backdrop-blur-lg border border-white/40 text-gray-800 hover:bg-white/50 hover:scale-110 transition-all shadow-md"
          aria-label="Next"
        >
          <HiArrowRight size={22} />
        </button>
      </div>

      <div className="relative h-75 md:h-70 flex items-center justify-center">
        <AnimatePresence custom={direction} initial={false}>
          {getVisibleIndices().map((visibleIndex) => {
            const dataIndex = getDataIndex(visibleIndex);
            const [department, caseTypes] = data[dataIndex];
            const colors = departmentColors[department];
            const caseCount = caseTypes.length;
            const position = visibleIndex - currentIndex;

            return (
              <motion.div
                key={visibleIndex}
                className={`absolute w-full md:w-2/3 lg:w-1/2 h-full px-2 md:px-4`}
                ref={sliderRef}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                custom={direction}
                initial={{ 
                  opacity: 0,
                  x: direction > 0 ? 300 : -300,
                  scale: 0.9
                }}
                animate={getCardStyle(visibleIndex)}
                exit={{ 
                  opacity: 0,
                  x: direction > 0 ? -300 : 300,
                  scale: 0.9,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`h-full rounded-2xl cursor-pointer shadow-lg ${colors.bg} ${colors.border} border backdrop-blur-sm relative overflow-hidden group transition-all duration-150 ${position === 0 ? 'shadow-xl' : 'shadow-md'}`}>
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-white backdrop-blur-sm rounded-2xl" />
                  
                  {/* Department header */}
                  <div className="relative p-6 pb-0 z-10">
                    <div className="flex items-center justify-between">
                      <div className='flex justify-center items-center'>
                        <div className="text-4xl mb-2 p-3 bg-white/30 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm">
                          {colors.icon}
                        </div>
                        <div className='flex flex-col justify-center ml-4'>
                          <h2 className={`text-2xl font-bold ${colors.text} mb-1`}>{department}</h2>
                          <p className="text-gray-600 text-sm">{caseCount} specialized treatments</p>
                        </div>
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
                  <div className="relative p-6 h-3/3 md:h-3/5 overflow-hidden z-10">
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

                  {/* Floating accent elements */}
                  <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-r ${colors.accent} opacity-50 transition-opacity backdrop-blur-sm`}></div>
                  <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r ${colors.accent} opacity-20  transition-opacity backdrop-blur-sm`}></div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Enhanced navigation dots with better animation */}
      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: data.length }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              const targetIndex = middleIndex + index;
              setDirection(targetIndex > currentIndex ? 1 : -1);
              setCurrentIndex(targetIndex);
            }}
            className="relative rounded-full bg-gray-300"
            whileHover={{ scale: 1.3 }}
            animate={{
              width: getDataIndex(currentIndex) === index ? '1rem' : '0.5rem',
              height: '0.5rem',
              backgroundColor: getDataIndex(currentIndex) === index ? '#4b5563' : '#d1d5db'
            }}
            transition={{ type: "spring", stiffness: 600, damping: 30 }}
          >
            {getDataIndex(currentIndex) === index && (
              <motion.span
                layoutId="activeDot"
                className="absolute inset-0 rounded-full bg-gray-600"
                transition={{ type: "spring", stiffness: 600, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DoctorCard;