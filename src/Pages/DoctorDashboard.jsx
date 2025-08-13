import React, { useEffect, useState } from "react";
import {
  FiDownload, FiCalendar, FiPhone, FiMail, FiUser,
  FiClock, FiScissors, FiUsers, FiFileText, FiLoader,
  FiUpload, FiX, FiPlus, FiRefreshCw, FiFile, FiEdit2, FiSave,
  FiCheck, FiAlertCircle, FiClock as FiPending
} from "react-icons/fi";
import { FaUserNurse, FaUserMd } from "react-icons/fa";
import { useAppContext } from "../AppContext/AppContext";
import { motion } from "framer-motion";
import { GiStethoscope } from "react-icons/gi";

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const { URL } = useAppContext();

  // Load user from localStorage
  useEffect(() => {
    if (!URL) {
      setError("API base URL is not configured");
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchDoctorData(parsedUser.email);
      fetchDoctorAppointments(parsedUser.email);
    } else {
      setError("User not found in localStorage");
      setLoading(false);
    }
  }, [URL]); // Add URL as dependency

  const fetchDoctorData = async (email) => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/ot/doctor/${email}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch doctor data");
      setAppointments(json.data || []);
      if (json.data?.length > 0) {
        setActiveAppointment(json.data[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorAppointments = async (email) => {
    try {
      const res = await fetch(`${URL}/ot/appointments/doctor/${email}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to fetch doctor appointments");
      setDoctorAppointments(json.appointments || []);
    } catch (err) {
      console.error("Error fetching doctor appointments:", err.message);
    }
  };

  const downloadFile = (url, filename) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      });
  };

  const handleFileUpload = async () => {
    if (!uploadFile || !activeAppointment) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("report", uploadFile);

    const appointment = appointments.find(a => a.id === activeAppointment);
    if (!appointment) return;

    try {
      const response = await fetch(
        `${URL}/ot/report/${user.email}/${appointment.patientEmail}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed");

      fetchDoctorData(user.email);
      setShowUploadModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Enhanced Status Badge component
  const StatusBadge = ({
    status,
    onStatusChange,
    appointment,
    disabled = false,
    className = ""
  }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const statusConfig = {
      pending: {
        bg: "bg-amber-100",
        text: "text-amber-800",
        icon: <FiPending className="mr-1" />,
        label: "Pending",
        dotColor: "bg-amber-500"
      },
      approved: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <FiCheck className="mr-1" />,
        label: "Approved",
        dotColor: "bg-blue-500"
      },
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <FiCheck className="mr-1" />,
        label: "Confirmed",
        dotColor: "bg-green-500"
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <FiAlertCircle className="mr-1" />,
        label: "Cancelled",
        dotColor: "bg-red-500"
      },
      completed: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: <FiCheck className="mr-1" />,
        label: "Completed",
        dotColor: "bg-purple-500"
      },
      assigned: {
        bg: "bg-indigo-100",
        text: "text-indigo-800",
        icon: <FiUser className="mr-1" />,
        label: "Assigned",
        dotColor: "bg-indigo-500"
      }
    };

    const normalizedStatus = status.toLowerCase();
    const config = statusConfig[normalizedStatus] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: null,
      label: status,
      dotColor: "bg-gray-500"
    };

    const handleStatusChange = (newStatus) => {
      setIsMenuOpen(false);
      if (onStatusChange) {
        onStatusChange(appointment, newStatus);
      }
    };

    // Available status transitions (you can customize this based on your business logic)
    const availableStatuses = ["pending", "approved", "confirmed", "cancelled"];

    return (
      <div className={`relative group ${className}`}>
        <button
          type="button"
          onClick={() => !disabled && setIsMenuOpen(!isMenuOpen)}
          disabled={disabled}
          className={`${config.bg} ${config.text} ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'} 
          text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center transition-all duration-200`}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <span className={`w-2 h-2 rounded-full ${config.dotColor} mr-1.5`}></span>
          {config.icon}
          {config.label}
          {!disabled && (
            <svg
              className={`ml-1 w-3 h-3 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {!disabled && onStatusChange && isMenuOpen && (
          <div
            className={`
            absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden
            animate-fadeIn transition-all duration-200 origin-top-right
            sm:right-auto sm:left-0  /* Left align on mobile */
          `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {availableStatuses.map((newStatus) => {
                const newConfig = statusConfig[newStatus] || statusConfig.pending;
                return (
                  <button
                    key={newStatus}
                    onClick={() => handleStatusChange(newStatus)}
                    className={`
                    block w-full text-left px-4 py-2 text-sm text-gray-700 
                    hover:bg-gray-50 flex items-center transition-colors
                    ${newStatus === normalizedStatus ? 'bg-gray-100 font-medium' : ''}
                  `}
                    disabled={newStatus === normalizedStatus}
                  >
                    <span className={`w-2 h-2 rounded-full ${newConfig.dotColor} mr-2`}></span>
                    <span>
                      {newStatus === normalizedStatus ? '✓ ' : ''}
                      {newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Updated to use PATCH method
  const updateAppointmentStatus = async (appointment, newStatus) => {
    try {
      const response = await fetch(
        `${URL}/ot/appointments/status/${user.email}/${appointment.patientEmail}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      // First check if the response is OK
      if (!response.ok) {
        // Try to get the error message from response
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || "Failed to update status";
        } catch (e) {
          // If response isn't JSON, use the status text
          errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      // If successful, parse the JSON response
      const result = await response.json();

      // Refresh the data
      fetchDoctorData(user.email);
      fetchDoctorAppointments(user.email);

      return result;
    } catch (err) {
      console.error("Update status error:", err);
      setError(err.message);
      throw err;
    }
  };

  // Rest of the component code remains the same...
  // (handleEditAppointment, saveEditedAppointment, handleEditFormChange functions remain unchanged)

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
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

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Loading Medical Team
              </span>
            </h3>

            <p className="text-gray-600">
              Preparing OT details for you
            </p>

            <div className="flex justify-center mt-6">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="inline-block w-3 h-3 bg-indigo-400 rounded-full mx-1"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-indigo-100/50"
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-indigo-100/50"
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto mt-20 p-4 md:p-6 font-sans">
      {/* Enhanced Doctor Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 mb-8 gap-6 border border-white/30 backdrop-blur-sm">
        <div className="relative">
          <img
            src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.username || "Doctor") + "&background=random"}
            alt={user?.username || "Doctor"}
            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-lg">
            <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Dr. {user?.username || "Doctor"}</h1>
          <p className="text-gray-600 mb-4">Orthopedic Surgeon</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-700 bg-white/50 rounded-lg p-2 shadow-sm">
              <FiMail className="mr-2 text-blue-500" />
              <span>{user?.email || "Not provided"}</span>
            </div>
            {user?.mobile && (
              <div className="flex items-center text-gray-700 bg-white/50 rounded-lg p-2 shadow-sm">
                <FiPhone className="mr-2 text-blue-500" />
                <span>{user.mobile}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Appointment List */}
        <div className="lg:w-1/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FiCalendar className="mr-2 text-indigo-500" />
              My Appointments
            </h2>
            <button
              onClick={() => {
                fetchDoctorData(user.email);
                fetchDoctorAppointments(user.email);
              }}
              className="text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* OT Appointments */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <GiStethoscope className="mr-2 text-indigo-500" />
              OT Appointments
            </h3>
            {appointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-gray-500 italic">No OT appointments scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {appointments.map((appt) => (
                  <motion.div
                    key={appt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveAppointment(appt.id)}
                    className={`bg-white p-4 rounded-xl shadow-sm cursor-pointer transition-all ${activeAppointment === appt.id
                      ? 'border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-white'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {appt.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <FiCalendar className="mr-1" />
                          {appt.date} • <FiClock className="ml-1 mr-1" /> {appt.slot}
                        </p>
                      </div>

                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <FiScissors className="mr-1" />
                      {appt.caseType} • OT{appt.otNumber}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Doctor Appointments */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <FaUserMd className="mr-2 text-indigo-500" />
              Clinic Appointments
            </h3>
            {doctorAppointments.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <p className="text-gray-500 italic">No clinic appointments scheduled</p>
              </div>
            ) : (
              <div className="space-y-3">
                {doctorAppointments.map((appt) => (
                  <motion.div
                    key={appt.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveAppointment(appt.id)}
                    className={`bg-white p-4 rounded-xl shadow-sm cursor-pointer transition-all ${activeAppointment === appt.id
                      ? 'border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50 to-white'
                      : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {appt.patientName}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <FiCalendar className="mr-1" />
                          {appt.date} • <FiClock className="ml-1 mr-1" /> {appt.slot}
                        </p>
                      </div>
                      <StatusBadge
                        status={appt.status}
                        onStatusChange={updateAppointmentStatus}
                        appointment={appt}
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">{appt.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{appt.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Appointment Details */}
        <div className="lg:w-2/3">
          {activeAppointment ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {(() => {
                const otAppointment = appointments.find(a => a.id === activeAppointment);
                const clinicAppointment = doctorAppointments.find(a => a.id === activeAppointment);

                if (otAppointment) {
                  return (
                    <div key={otAppointment.id}>
                      {/* OT Appointment Details Header */}
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {otAppointment.patientName}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <StatusBadge status={otAppointment.status} />
                              <span className="text-gray-600 text-sm bg-white/70 px-2 py-0.5 rounded-full">
                                <FiCalendar className="inline mr-1" />
                                {otAppointment.date} at {otAppointment.slot}
                              </span>
                              <span className="text-gray-600 text-sm bg-white/70 px-2 py-0.5 rounded-full">
                                OT {otAppointment.otNumber}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 flex items-center gap-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                              {otAppointment.caseType}
                            </span>
                            <button
                              onClick={() => handleEditAppointment(otAppointment)}
                              className="text-indigo-500 hover:text-indigo-700 transition-colors"
                            >
                              <FiEdit2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Edit Form (conditionally rendered) */}
                      {editingAppointment === otAppointment.id && (
                        <div className="bg-amber-50 p-4 border-b">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <FiEdit2 className="mr-2 text-indigo-500" />
                            Edit Appointment Details
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">Case Type</label>
                              <input
                                type="text"
                                name="caseType"
                                value={editFormData.caseType}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">OT Number</label>
                              <input
                                type="text"
                                name="otNumber"
                                value={editFormData.otNumber}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">Date</label>
                              <input
                                type="date"
                                name="date"
                                value={editFormData.date}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">Time Slot</label>
                              <input
                                type="text"
                                name="slot"
                                value={editFormData.slot}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">Assistant Doctor</label>
                              <input
                                type="text"
                                name="assistantDoctor"
                                value={editFormData.assistantDoctor}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-500 mb-1">Assistant Email</label>
                              <input
                                type="email"
                                name="assistantDoctorEmail"
                                value={editFormData.assistantDoctorEmail}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm text-gray-500 mb-1">Nursing Staff (comma separated)</label>
                              <input
                                type="text"
                                name="nurses"
                                value={editFormData.nurses}
                                onChange={handleEditFormChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end space-x-3 mt-4">
                            <button
                              onClick={() => setEditingAppointment(null)}
                              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEditedAppointment}
                              className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-lg flex items-center hover:bg-indigo-600 transition-colors"
                            >
                              <FiSave className="mr-2" />
                              Save Changes
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Patient Info */}
                      <div className="px-6 py-4 border-b">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiUser className="mr-2 text-indigo-500" />
                          Patient Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{otAppointment.patientName}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{otAppointment.patientEmail}</p>
                          </div>
                        </div>
                      </div>

                      {/* Medical Team */}
                      <div className="px-6 py-4 border-b">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiUsers className="mr-2 text-indigo-500" />
                          Medical Team
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Surgeon</p>
                            <p className="font-medium">
                              <FaUserMd className="inline mr-2 text-indigo-500" />
                              {otAppointment.doctor} ({otAppointment.doctorEmail})
                            </p>
                          </div>
                          {otAppointment.assistantDoctor && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-500">Assistant Doctor</p>
                              <p className="font-medium">
                                <FaUserMd className="inline mr-2 text-indigo-400" />
                                {otAppointment.assistantDoctor} ({otAppointment.assistantDoctorEmail})
                              </p>
                            </div>
                          )}
                          {otAppointment.nurses.length > 0 && (
                            <div className="md:col-span-2 bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-500">Nursing Staff</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {otAppointment.nurses.map((nurse, index) => (
                                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    <FaUserNurse className="mr-1" />
                                    {nurse}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Reports Section */}
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-gray-700 flex items-center">
                            <FiFileText className="mr-2 text-indigo-500" />
                            Patient Reports
                          </h4>
                          <button
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center text-sm bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <FiPlus className="mr-1" /> Add Report
                          </button>
                        </div>
                        {otAppointment.reports && otAppointment.reports.length > 0 ? (
                          <div className="space-y-3">
                            {otAppointment.reports.map((rep) => (
                              <motion.div
                                key={rep.id}
                                whileHover={{ scale: 1.01 }}
                                className="border rounded-xl p-3 hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-start">
                                  <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                                    <FiDownload className="h-5 w-5 text-indigo-600" />
                                  </div>
                                  <div className="ml-3 flex-1">
                                    <button
                                      onClick={() => downloadFile(rep.fileUrl, rep.fileName)}
                                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                    >
                                      {rep.fileName}
                                    </button>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Uploaded by {rep.uploadedBy} on {new Date(rep.uploadedAt).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No reports uploaded for this patient</p>
                        )}
                      </div>
                    </div>
                  );
                } else if (clinicAppointment) {
                  return (
                    <div key={clinicAppointment.id}>
                      {/* Clinic Appointment Details */}
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {clinicAppointment.patientName}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              <StatusBadge status={clinicAppointment.status} />
                              <span className="text-gray-600 text-sm bg-white/70 px-2 py-0.5 rounded-full">
                                <FiCalendar className="inline mr-1" />
                                {clinicAppointment.date} at {clinicAppointment.slot}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Patient Info */}
                      <div className="px-6 py-4 border-b">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiUser className="mr-2 text-indigo-500" />
                          Patient Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{clinicAppointment.patientName}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{clinicAppointment.patientEmail}</p>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="px-6 py-4 border-b">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiFileText className="mr-2 text-indigo-500" />
                          Appointment Details
                        </h4>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Subject</p>
                            <p className="font-medium">{clinicAppointment.subject}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Message</p>
                            <p className="font-medium">{clinicAppointment.message}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Requested On</p>
                            <p className="font-medium">
                              {new Date(clinicAppointment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center h-full flex items-center justify-center">
              <div>
                <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Select an appointment</h3>
                <p className="mt-1 text-gray-500">Choose an appointment from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upload Medical Report</h3>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {!uploadFile ? (
                  <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUpload className="w-8 h-8 text-indigo-500" />
                      <p className="text-sm text-gray-600">
                        Click to select or drag and drop files
                      </p>
                      <span className="text-xs text-gray-500">
                        Supported formats: PDF, JPG, PNG (Max 10MB)
                      </span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files[0] && setUploadFile(e.target.files[0])}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                ) : (
                  <div className="border rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FiFile className="w-5 h-5 text-indigo-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {uploadFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setUploadFile(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 text-right">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadFile(null);
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={!uploadFile || isUploading}
                    className={`px-4 py-2 text-sm rounded-lg flex items-center transition-colors ${!uploadFile || isUploading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600'
                      }`}
                  >
                    {isUploading ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUpload className="mr-2" />
                        Upload Report
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;