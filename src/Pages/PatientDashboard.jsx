import React, { useEffect, useState } from "react";
import { FiDownload, FiCalendar, FiPhone, FiMail, FiUser, FiDroplet, FiAlertTriangle, FiClock, FiScissors, FiLoader, FiFileText } from "react-icons/fi";
import { FaUserNurse, FaUserMd, FaProcedures } from "react-icons/fa";
import { useAppContext } from "../AppContext/AppContext";
import { motion } from "framer-motion";
import { GiStethoscope } from "react-icons/gi";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [patientAppointments, setPatientAppointments] = useState([]); // New state for patient appointments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");
  const { URL } = useAppContext();

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      setError("User not found in localStorage");
      setLoading(false);
    }
  }, []);

  // Fetch patient data once user is set
  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch OT data
        const otRes = await fetch(`${URL}/ot/patient/${user.email}`);
        const otJson = await otRes.json();
        if (!otJson.success) throw new Error(otJson.message || "Failed to fetch OT data");

        // Fetch patient appointments
        const patientAppointmentsRes = await fetch(`${URL}/ot/appointments/patient/${user.email}`);
        const patientAppointmentsJson = await patientAppointmentsRes.json();

        setData(otJson);
        setPatientAppointments(patientAppointmentsJson.appointments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

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
              Preparing OT & Doctors for you
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

  if (!data) return null;

  const { patient, appointments, reports } = data;

  // File download helper
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-200";
    let textColor = "text-gray-800";

    if (status.toLowerCase().includes("completed")) {
      bgColor = "bg-green-100";
      textColor = "text-green-800";
    } else if (status.toLowerCase().includes("pending") || status.toLowerCase().includes("scheduled")) {
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

  return (
    <div className="max-w-7xl mx-auto mt-24 p-4 md:p-6 font-sans">
      {/* Patient Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-center bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md rounded-xl p-10 mb-8 gap-5 md:gap-15">
        <div className="relative">
          <img
            src={patient.profileImageUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(patient.username) + "&background=random"}
            alt={patient.username}
            className="w-28 h-28 md:w-32 md:h-32 object-cover flex items-center justify-center rounded-full border-4 border-white shadow-md"
          />
          <div className="absolute bottom-2 right-0 bg-white p-1 rounded-full shadow">
            <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{patient.username}</h1>
          <p className="text-gray-600 font-semibold mb-4">case: <span className="text-violet-500 font-bold">{patient.caseType || "General Patient"}</span></p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center text-gray-700">
              <FiMail className="mr-2 text-blue-500" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiPhone className="mr-2 text-blue-500" />
              <span>{patient.mobile || "Not provided"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiUser className="mr-2 text-blue-500" />
              <span>{patient.gender || "-"} {patient.age && `, ${patient.age} yrs`}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiDroplet className="mr-2 text-blue-500" />
              <span>{patient.bloodGroup || "Not specified"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiAlertTriangle className="mr-2 text-blue-500" />
              <span>Allergies: {patient.allergies || "None"}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FiCalendar className="mr-2 text-blue-500" />
              <span>Member since {new Date(patient.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === "appointments" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              Appointments ({appointments.length + patientAppointments.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === "reports" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            <div className="flex items-center">
              <FiDownload className="mr-2" />
              Medical Reports ({reports.length})
            </div>
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === "appointments" ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FiCalendar className="mr-2" />
            My Appointments
          </h2>

          {/* OT Appointments Section */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaProcedures className="mr-2 text-blue-500" />
              Operation Theatre Appointments ({appointments.length})
            </h3>

            {appointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No OT appointments scheduled</h3>
                <p className="mt-1 text-gray-500">You don't have any upcoming OT appointments.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          <FaProcedures className="inline mr-2 text-blue-500" />
                          Operation Theatre - {appt.otNumber}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <StatusBadge status={appt.status} />
                          <span className="text-gray-600 text-sm">
                            <FiCalendar className="inline mr-1" />
                            {appt.date} at {appt.slot}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {appt.caseType}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {/* Medical Team */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FaUserMd className="mr-2 text-blue-500" />
                          Medical Team
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Surgeon</p>
                            <p className="font-medium">{appt.doctor} ({appt.doctorEmail})</p>
                          </div>
                          {appt.assistantDoctor && (
                            <div>
                              <div>
                                <p className="text-sm text-gray-500">Assistant Name</p>
                                <p className="font-medium">{appt.assistantDoctor} </p>
                              </div>
                              <p className="text-sm text-gray-500">Assistant Email</p>
                              <p className="font-medium"> ({appt.assistantDoctorEmail})</p>
                            </div>

                          )}
                          {appt.nurses.length > 0 && (
                            <div>
                              <p className="text-sm text-gray-500">Nursing Staff</p>
                              <p className="font-medium">{appt.nurses.join(", ")}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* OT Room Details */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiScissors className="mr-2 text-blue-500" />
                          Operation Details
                        </h4>
                        {appt.otRoomDetails ? (
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(appt.otRoomDetails).map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                  <p className="font-medium text-sm">{value || '-'}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">No OT room details available</p>
                        )}
                      </div>
                    </div>

                    {/* Reports Section */}
                    {appt.reports && appt.reports.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiDownload className="mr-2 text-blue-500" />
                          Appointment Reports
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {appt.reports.map((rep) => (
                            <div key={rep.id} className="border border-indigo-300 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                              <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                  <button
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    {rep.fileName}
                                  </button>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Uploaded by {rep.uploadedBy} on {new Date(rep.uploadedAt).toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 bg-blue-100 mt-5 p-2 rounded-md">
                                  <FiDownload
                                    onClick={() => downloadFile(rep.fileUrl, rep.fileName)}
                                    className="h-5 w-5 cursor-pointer text-blue-600" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinic Appointments Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <FaUserMd className="mr-2 text-blue-500" />
              Clinic Appointments ({patientAppointments.length})
            </h3>

            {patientAppointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No clinic appointments scheduled</h3>
                <p className="mt-1 text-gray-500">You don't have any upcoming clinic appointments.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {patientAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          <FaUserMd className="inline mr-2 text-blue-500" />
                          {appt.subject}
                        </h3>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <StatusBadge status={appt.status} />
                          <span className="text-gray-600 text-sm">
                            <FiCalendar className="inline mr-1" />
                            {appt.date} at {appt.slot}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          Clinic Visit
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {/* Doctor Information */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FaUserMd className="mr-2 text-blue-500" />
                          Doctor Information
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Doctor Name</p>
                            <p className="font-bold">{appt.doctorName} ({appt.doctorEmail})</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Doctor Email</p>
                            <p className="font-semibold"> {appt.doctorEmail}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Requested On</p>
                            <p className="font-medium">
                              {new Date(appt.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div>
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          <FiFileText className="mr-2 text-blue-500" />
                          Appointment Details
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Purpose</p>
                            <p className="font-medium">{appt.message}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Subject</p>
                            <p className="font-medium">{appt.subject}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Request Type</p>
                            <p className="font-medium capitalize">{appt.assignmentMetadata.assignedBy} request</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FiDownload className="mr-2" />
            Medical Reports
          </h2>

          {reports.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FiDownload className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No reports available</h3>
              <p className="mt-1 text-gray-500">You don't have any medical reports uploaded yet.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {reports.map((rep) => (
                  <li key={rep.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          onClick={() => downloadFile(rep.fileUrl, rep.fileName)}
                          className="flex-shrink-0 bg-blue-100 p-3 rounded-md cursor-pointer"
                        >
                          <FiDownload className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {rep.fileName}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Uploaded by {rep.uploadedBy} on {new Date(rep.uploadedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(rep.fileUrl, rep.fileName)}
                        className="ml-4 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <FiDownload className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;