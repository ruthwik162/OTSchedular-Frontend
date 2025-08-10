import React, { useState } from 'react';
import { assets, departmentCaseTypes } from '../assets/assets';
import { FaStethoscope, FaUserMd, FaPhoneAlt, FaCalendarAlt, FaHeartbeat, FaMedal, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GiHeartOrgan, GiBrain, GiBoneKnife, GiStomach, GiCancer, GiSun, GiScalpel } from "react-icons/gi";
import { MdPsychology } from "react-icons/md";
import { IoFlowerOutline } from "react-icons/io5";

// Enhanced department colors and icons
const departmentColors = {
  "Cardiology": {
    bg: "bg-gradient-to-br from-red-50/80 via-white/60 to-white/30",
    text: "text-red-600",
    accent: "from-red-500 to-red-700",
    border: "border-red-200/40",
    icon: <GiHeartOrgan className="text-red-600" size={24} />,
    highlight: "bg-red-100/40",
    darkHighlight: "bg-red-800/20"
  },
  "Neurology": {
    bg: "bg-gradient-to-br from-blue-50/80 via-white/60 to-white/30",
    text: "text-blue-600",
    accent: "from-blue-500 to-blue-700",
    border: "border-blue-200/40",
    icon: <GiBrain className="text-blue-600" size={24} />,
    highlight: "bg-blue-100/40",
    darkHighlight: "bg-blue-800/20"
  },
  "Orthopedics": {
    bg: "bg-gradient-to-br from-green-50/80 via-white/60 to-white/30",
    text: "text-green-600",
    accent: "from-green-500 to-green-700",
    border: "border-green-200/40",
    icon: <GiBoneKnife className="text-green-600" size={24} />,
    highlight: "bg-green-100/40",
    darkHighlight: "bg-green-800/20"
  },
  "Gastroenterology": {
    bg: "bg-gradient-to-br from-yellow-50/80 via-white/60 to-white/30",
    text: "text-yellow-600",
    accent: "from-yellow-500 to-yellow-700",
    border: "border-yellow-200/40",
    icon: <GiStomach className="text-yellow-600" size={24} />,
    highlight: "bg-yellow-100/40",
    darkHighlight: "bg-yellow-800/20"
  },
  "Oncology": {
    bg: "bg-gradient-to-br from-purple-50/80 via-white/60 to-white/30",
    text: "text-purple-600",
    accent: "from-purple-500 to-purple-700",
    border: "border-purple-200/40",
    icon: <GiCancer className="text-purple-600" size={24} />,
    highlight: "bg-purple-100/40",
    darkHighlight: "bg-purple-800/20"
  },
  "Gynecology": {
    bg: "bg-gradient-to-br from-pink-50/80 via-white/60 to-white/30",
    text: "text-pink-600",
    accent: "from-pink-500 to-pink-700",
    border: "border-pink-200/40",
    icon: <IoFlowerOutline className="text-pink-600" size={24} />,
    highlight: "bg-pink-100/40",
    darkHighlight: "bg-pink-800/20"
  },
  "Dermatology": {
    bg: "bg-gradient-to-br from-orange-50/80 via-white/60 to-white/30",
    text: "text-orange-600",
    accent: "from-orange-500 to-orange-700",
    border: "border-orange-200/40",
    icon: <GiSun className="text-orange-600" size={24} />,
    highlight: "bg-orange-100/40",
    darkHighlight: "bg-orange-800/20"
  },
  "Psychiatry": {
    bg: "bg-gradient-to-br from-indigo-50/80 via-white/60 to-white/30",
    text: "text-indigo-600",
    accent: "from-indigo-500 to-indigo-700",
    border: "border-indigo-200/40",
    icon: <MdPsychology className="text-indigo-600" size={24} />,
    highlight: "bg-indigo-100/40",
    darkHighlight: "bg-indigo-800/20"
  },
  "General Surgery": {
    bg: "bg-gradient-to-br from-teal-50/80 via-white/60 to-white/30",
    text: "text-teal-600",
    accent: "from-teal-500 to-teal-700",
    border: "border-teal-200/40",
    icon: <GiScalpel className="text-teal-600" size={24} />,
    highlight: "bg-teal-100/40",
    darkHighlight: "bg-teal-800/20"
  }
};

// Enhanced treatment details
const getTreatmentDetails = (department, treatment) => {
  const details = {
    "Cardiology": {
      "Heart Failure Management": "Comprehensive programs including medication optimization and lifestyle interventions",
      "Arrhythmia Treatment": "State-of-the-art electrophysiology studies and ablation procedures",
      "Coronary Angiography": "Minimally invasive diagnostic procedure for heart conditions",
      "Cardiac Rehabilitation": "Supervised programs to improve cardiovascular health"
    },
    "Neurology": {
      "Stroke Care": "24/7 stroke team with rapid response protocols",
      "Epilepsy Management": "Comprehensive diagnostic testing and treatment plans",
      "Migraine Treatment": "Personalized approaches including preventive therapies",
      "Neuropathy Care": "Advanced testing and symptom management"
    },
    // Add details for other departments...
    "default": {
      [treatment]: "Personalized treatment approach with board-certified specialists"
    }
  };

  return details[department]?.[treatment] || details.default[treatment];
};

const DepartmentCard = ({ department, caseTypes, colors }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleTreatments = expanded ? caseTypes : caseTypes.slice(0, 5);

  return (
    <motion.div
      className={`h-full rounded-2xl overflow-hidden shadow-lg ${colors.bg} ${colors.border} border-2`}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colors.highlight} shadow-sm`}>
              {colors.icon}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${colors.text}`}>{department}</h3>
              <p className="text-sm text-gray-600">{caseTypes.length} specialized treatments</p>
            </div>
          </div>
          
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${colors.highlight} ${colors.text}`}>
            SPECIALTY
          </span>
        </div>

        

        {/* Divider */}
        <div className={`w-full h-0.5 my-3 rounded-full bg-gradient-to-r ${colors.accent}`} />

        {/* Content */}
        
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-700 mb-4">
            Our {department.toLowerCase()} department combines cutting-edge technology with compassionate care to deliver exceptional outcomes.
          </p>

          <h4 className={`text-sm font-semibold ${colors.text} mb-3 flex items-center gap-2`}>
            <FaMedal className="text-xs" /> Featured Treatments:
          </h4>

          <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {visibleTreatments.map((treatment, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/40 transition-colors cursor-pointer"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className={`mt-0.5 p-1.5 rounded-full ${colors.highlight}`}>
                  <FaStethoscope className={`${colors.text} text-xs`} />
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-800 block">{treatment}</span>
                  <span className="text-xs text-gray-600">
                    {getTreatmentDetails(department, treatment)}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>


          {caseTypes.length > 5 && (
            <div>
              <button
                onClick={() => setExpanded(!expanded)}
                className={`mt-2 text-xs font-medium ${colors.text} flex items-center gap-1 ml-auto`}
              >
                {expanded ? 'Show less' : `+${caseTypes.length - 5} more treatments`}
                <FaArrowRight className={`text-xs transition-transform ${expanded ? 'rotate-90' : ''}`} />
              </button>
            </div>
          )}
        </div>
        <div className={`absolute md:-top-19 -top-0 left-10 md:left-10 w-40 h-40 rounded-full bg-gradient-to-r ${colors.accent} opacity-30  z-[10] transition-opacity backdrop-blur-sm`}></div>

        <div className={`absolute md:bottom-40 md:-right-11 -right-50 top-13 w-70 h-70 rounded-full bg-gradient-to-r ${colors.accent} opacity-10 transition-opacity backdrop-blur-sm`}></div>

        <div className={`absolute -bottom-40 left-0 w-60 h-60 rounded-full  opacity-100 transition-opacity `}>
          <img src={assets.Banner} className='w-32 -top-10 relative' alt="" />
        </div>
        <div className={`absolute -top-5 -left-10 w-40 h-40 rounded-full bg-gradient-to-r ${colors.accent} opacity-10  transition-opacity backdrop-blur-sm`}></div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <motion.button
            className={`w-full py-2 px-4 rounded-lg ${colors.highlight} text-white font-medium flex items-center justify-between`}
            whileHover={{ backgroundColor: colors.darkHighlight }}
            transition={{ duration: 0.2 }}
          >
            <span>View Department</span>
            <FaArrowRight className="text-xs" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Department = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const departments = Object.entries(departmentCaseTypes);

  const testimonials = [
    {
      quote: "The cardiology team provided exceptional care during my heart procedure. Their expertise and compassion made all the difference in my recovery.",
      author: "Michael T.",
      role: "Cardiac Patient",
      department: "Cardiology"
    },
    {
      quote: "After years of chronic migraines, the neurology department finally helped me find an effective treatment plan that changed my life.",
      author: "Sarah K.",
      role: "Neurology Patient",
      department: "Neurology"
    },
    {
      quote: "The orthopedic surgeons replaced my knee with minimal pain and a rapid recovery. I'm back to hiking again!",
      author: "Robert J.",
      role: "Orthopedics Patient",
      department: "Orthopedics"
    }
  ];

  const stats = [
    { value: 250, label: "Specialist Physicians", icon: <FaUserMd /> },
    { value: 55, label: "Medical Departments", icon: <FaStethoscope /> },
    { value: 15000, label: "Patients Treated Yearly", icon: <FaHeartbeat /> },
    { value: 24, label: "Hour Emergency Care", icon: <FaPhoneAlt /> }
  ];

  return (
    <div className="container mx-auto px-4 mt-20 py-12 max-w-7xl">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Exceptional Care, <span className="text-blue-200">Advanced Medicine</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8 opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Our world-class medical center brings together leading specialists and cutting-edge technology to deliver personalized care.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >

            <motion.button
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhoneAlt /> Emergency: (123) 456-7890
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Departments Section */}
      <section className="mb-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Medical Specialties</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Comprehensive care across all major medical specialties, delivered by board-certified physicians using the latest evidence-based treatments.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {departments.map(([department, caseTypes]) => {
            const colors = departmentColors[department] || departmentColors["Cardiology"];
            return (
              <motion.div
                key={department}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <DepartmentCard
                  department={department}
                  caseTypes={caseTypes}
                  colors={colors}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="mb-5">
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-white rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4"
              whileHover={{ y: -5 }}
              transition={{ type: "spring" }}
            >
              <div className={`text-blue-600 text-2xl mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {typeof stat.value === 'number' ? (
                  <CountUp end={stat.value} suffix={stat.value > 1000 ? "+" : ""} />
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="mb-5">
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          <div className="relative max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  Whether you need a routine check-up or specialized treatment, our team is here to provide exceptional care tailored to your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaPhoneAlt /> Call (123) 456-7890
                  </motion.button>
                  <motion.button
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FaCalendarAlt /> Book Online
                  </motion.button>
                </div>
              </div>
              <div className="hidden md:block w-1/3">
                <div className="relative h-full min-h-[200px]">
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-xl"></div>
                  <div className="absolute right-0 bottom-0 text-8xl opacity-20">
                    <FaHeartbeat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Patient Experiences</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Hear from our patients about their experiences with our medical teams.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="bg-white p-8 rounded-3xl shadow-lg relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-6 left-6 text-blue-400 text-2xl">
                <FaQuoteLeft />
              </div>
              <p className="text-gray-700 text-lg italic mb-6 pl-8">
                {testimonials[activeTestimonial].quote}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">
                    {testimonials[activeTestimonial].author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].department}
                  </div>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <div key={i}>
                      <button

                        onClick={() => setActiveTestimonial(i)}
                        className={`w-3 h-3 rounded-full transition-colors ${activeTestimonial === i ? 'bg-blue-600' : 'bg-gray-300'}`}
                      />
                    </div>

                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

// CountUp component for animated numbers
const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    const duration = 2000;
    const start = 0;
    const increment = end / (duration / 16); // 60fps

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        current = end;
      }
      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export default Department;