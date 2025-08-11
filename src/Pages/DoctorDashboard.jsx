import React, { useEffect, useState } from "react";
import { 
  FiDownload, FiCalendar, FiPhone, FiMail, FiUser, 
  FiClock, FiScissors, FiUsers, FiFileText, FiLoader,
  FiUpload, FiX, FiPlus,
  FiRefreshCw,
  FiFile
} from "react-icons/fi";
import { FaUserNurse, FaUserMd } from "react-icons/fa";
import { useAppContext } from "../AppContext/AppContext";
import { motion } from "framer-motion";
import { GiStethoscope } from "react-icons/gi";

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAppointment, setActiveAppointment] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {URL} = useAppContext();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchDoctorData(parsedUser.email);
    } else {
      setError("User not found in localStorage");
      setLoading(false);
    }
  }, []);

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

  // File download helper a
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

  // Handle file upload
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
        `http://localhost:8087/ot/report/${user.email}/${appointment.patientEmail}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed");

      // Refresh data after successful upload
      fetchDoctorData(user.email);
      setShowUploadModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-200";
    let textColor = "text-gray-800";
    
    if (status.toLowerCase().includes("completed")) {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status.toLowerCase().includes("pending") || status.toLowerCase().includes("assigned")) {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status.toLowerCase().includes("cancelled")) {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    }
    
    return (
      <span className={`${bgColor} ${textColor} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
        {status}
      </span>
    );
  };

if (loading) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        {/* Animated medical-themed spinner */}
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

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              Loading Medical Team
            </span>
          </h3>
          
          <p className="text-gray-600">
            Preparing OT details for you
          </p>
          
          {/* Enhanced bouncing dots */}
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

        {/* Subtle floating elements in background */}
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
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto mt-20 p-4 md:p-6 font-sans">
      {/* Doctor Profile Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md rounded-xl p-6 mb-8 gap-6">
        <div className="relative">
          <img
            src={"https://ui-avatars.com/api/?name="+encodeURIComponent(user?.username || "Doctor")+"&background=random"}
            alt={user?.username || "Doctor"}
            className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
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
            <div className="flex items-center text-gray-700">
              <FiMail className="mr-2 text-blue-500" />
              <span>{user?.email || "Not provided"}</span>
            </div>
            {user?.mobile && (
              <div className="flex items-center text-gray-700">
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
              <FiCalendar className="mr-2" />
              My Appointments
            </h2>
            <button 
              onClick={() => fetchDoctorData(user.email)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FiRefreshCw className="w-5 h-5" />
            </button>
          </div>
          
          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FiClock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments scheduled</h3>
              <p className="mt-1 text-gray-500">You don't have any upcoming operations.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div
                  key={appt.id}
                  onClick={() => setActiveAppointment(appt.id)}
                  className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition-all ${activeAppointment === appt.id ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {appt.patientName}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <FiCalendar className="mr-1" />
                        {appt.date} • {appt.slot}
                      </p>
                    </div>
                    <StatusBadge status={appt.status} />
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <FiScissors className="mr-1" />
                    {appt.caseType} • OT{appt.otNumber}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Appointment Details */}
        <div className="lg:w-2/3">
          {activeAppointment && appointments.find(a => a.id === activeAppointment) ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {appointments.filter(a => a.id === activeAppointment).map((appt) => (
                <div key={appt.id}>
                  {/* Appointment Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {appt.patientName}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <StatusBadge status={appt.status} />
                          <span className="text-gray-600 text-sm">
                            <FiCalendar className="inline mr-1" />
                            {appt.date} at {appt.slot}
                          </span>
                          <span className="text-gray-600 text-sm">
                            OT {appt.otNumber}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {appt.caseType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="px-6 py-4 border-b">
                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                      <FiUser className="mr-2 text-blue-500" />
                      Patient Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{appt.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{appt.patientEmail}</p>
                      </div>
                    </div>
                  </div>

                  {/* Medical Team */}
                  <div className="px-6 py-4 border-b">
                    <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                      <FiUsers className="mr-2 text-blue-500" />
                      Medical Team
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Surgeon</p>
                        <p className="font-medium">
                          <FaUserMd className="inline mr-2 text-blue-500" />
                          {appt.doctor} ({appt.doctorEmail})
                        </p>
                      </div>
                      {appt.assistantDoctor && (
                        <div>
                          <p className="text-sm text-gray-500">Assistant Doctor</p>
                          <p className="font-medium">
                            <FaUserMd className="inline mr-2 text-blue-400" />
                            {appt.assistantDoctor} ({appt.assistantDoctorEmail})
                          </p>
                        </div>
                      )}
                      {appt.nurses.length > 0 && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-500">Nursing Staff</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {appt.nurses.map((nurse, index) => (
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
                        <FiFileText className="mr-2 text-blue-500" />
                        Patient Reports
                      </h4>
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                      >
                        <FiPlus className="mr-1" /> Add Report
                      </button>
                    </div>
                    {appt.reports && appt.reports.length > 0 ? (
                      <div className="space-y-3">
                        {appt.reports.map((rep) => (
                          <div key={rep.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 bg-blue-100 p-2 rounded-md">
                                <FiDownload className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-3 flex-1">
                                <button
                                  onClick={() => downloadFile(rep.fileUrl, rep.fileName)}
                                  className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {rep.fileName}
                                </button>
                                <p className="text-xs text-gray-500 mt-1">
                                  Uploaded by {rep.uploadedBy} on {new Date(rep.uploadedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No reports uploaded for this patient</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center h-full flex items-center justify-center">
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upload Medical Report</h3>
                <button 
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {!uploadFile ? (
                  <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 transition-colors">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiUpload className="w-8 h-8 text-blue-500" />
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
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FiFile className="w-5 h-5 text-blue-500" />
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
                        className="text-gray-400 hover:text-gray-600"
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
                        className="bg-blue-500 h-2 rounded-full"
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
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={!uploadFile || isUploading}
                    className={`px-4 py-2 text-sm rounded-md flex items-center ${
                      !uploadFile || isUploading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;