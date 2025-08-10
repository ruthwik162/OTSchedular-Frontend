import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext/AppContext';
import {
  MdEmail,
  MdPhone,
  MdPerson,
  MdCalendarToday,
  MdAccessTime,
  MdLocalHospital,
  MdBloodtype,
  MdInfo,
  MdAssignment,
  MdMedicalServices,
  MdPeople,
  MdReceipt,
  MdLocationOn,
  MdHistory,
  MdPayment,
  MdDescription,
  MdWork
} from 'react-icons/md';
import {
  FaUserMd,
  FaUserNurse,
  FaIdCard,
  FaTransgender,
  FaAllergies,
  FaNotesMedical,
  FaProcedures,
  FaClinicMedical,
  FaFileMedical,
  FaChartLine,
  FaUserInjured
} from 'react-icons/fa';
import { GiHealthNormal, GiHospital } from 'react-icons/gi';
import { IoMdAlert, IoMdDocument } from 'react-icons/io';
import { FiLoader, FiClock } from 'react-icons/fi';
import { BsClipboard2Pulse } from 'react-icons/bs';
import { TbReportMedical } from 'react-icons/tb';

const PatientProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { URL } = useAppContext();
  const [userRole, setUserRole] = useState('patient'); // Default to patient

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          throw new Error("No user found in localStorage");
        }

        const user = JSON.parse(storedUser);
        if (!user.email) {
          throw new Error("User email is missing");
        }

        // Determine user role (this could come from your auth system)
        const role = user.role || 'patient'; // Default to patient if role not specified
        setUserRole(role);

        const endpoint = `${URL}/ot/${role}/${encodeURIComponent(user.email)}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const data = await response.json();
        if (data.success === false) {
          throw new Error("API returned unsuccessful status");
        }

        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [URL]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <FiLoader className="animate-spin rounded-full h-12 w-12 text-blue-500" />
      <p className="text-gray-500">Loading user data...</p>
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <IoMdAlert className="text-2xl text-red-500 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error loading user data</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!userData) return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
        <div className="flex items-start gap-3">
          <MdInfo className="text-2xl text-blue-500 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-blue-800">No user data found</h3>
            <p className="text-blue-600">We couldn't find any records associated with your account.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Determine which data structure to use based on role
  const isDoctor = userRole === 'doctor';
  const profileData = isDoctor ? userData?.doctor : userData?.patient;
  const appointments = userData?.appointments || [];
  const medicalHistory = isDoctor ? [] : userData?.medicalHistory || [];
  const prescriptions = isDoctor ? [] : userData?.prescriptions || [];
  const labReports = isDoctor ? [] : userData?.labReports || [];

  return (
    <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* User Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-6 flex justify-center">
            <div className="relative">
              <img
                src={profileData?.profileImageUrl || profileData?.image || '/default-profile.png'}
                alt={`${profileData?.username || profileData?.name || 'User'}'s profile`}
                className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-profile.png';
                }}
              />
              <div className={`absolute bottom-0 right-0 rounded-full p-2 shadow-md ${isDoctor ? 'bg-purple-500' : 'bg-blue-500'
                } text-white`}>
                {isDoctor ? <FaUserMd className="text-xl" /> : <GiHealthNormal className="text-xl" />}
              </div>
            </div>
          </div>
          <div className="p-6 md:p-8 flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {profileData.username || 'Unknown User'}
                </h1>
                <p className="text-gray-600">{profileData.email}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isDoctor ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                  {isDoctor ? <MdWork className="mr-1" /> : <FaIdCard className="mr-1" />}
                  {isDoctor ? 'Doctor' : 'Patient'} ID: {profileData.id || 'N/A'}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isDoctor ? (
                <>
                  <InfoCard
                    label="Specialization"
                    value={profileData.specialization || 'Not specified'}
                    icon={<MdMedicalServices className="text-purple-500" />}
                  />
                  <InfoCard
                    label="Department"
                    value={profileData.department || 'Not specified'}
                    icon={<GiHospital className="text-purple-500" />}
                  />
                  <InfoCard
                    label="Phone"
                    value={profileData.phone || 'Not provided'}
                    icon={<MdPhone className="text-purple-500" />}
                  />
                  <InfoCard
                    label="Years of Experience"
                    value={profileData.experience || 'Not specified'}
                    icon={<FaChartLine className="text-purple-500" />}
                  />
                  <InfoCard
                    label="Qualification"
                    value={profileData.qualification || 'Not specified'}
                    icon={<MdAssignment className="text-purple-500" />}
                  />
                </>
              ) : (
                <>
                  <InfoCard
                    label="Age / Gender"
                    value={`${profileData.age || 'NA'} / ${profileData.gender || 'NA'}`}
                    icon={<MdPerson className="text-blue-500" />}
                  />
                  <InfoCard
                    label="Blood Group"
                    value={profileData.bloodGroup || 'Not specified'}
                    icon={<MdBloodtype className="text-red-500" />}
                  />
                  <InfoCard
                    label="Case Type"
                    value={profileData.caseType || 'Not specified'}
                    icon={<FaNotesMedical className="text-green-500" />}
                  />
                  <InfoCard
                    label="Phone"
                    value={profileData.phone || 'Not provided'}
                    icon={<MdPhone className="text-purple-500" />}
                  />
                  <InfoCard
                    label="Last Visit"
                    value={profileData.lastVisit || 'No record'}
                    icon={<MdHistory className="text-gray-500" />}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <div className="flex items-center gap-2">
              <MdAssignment />
              Overview
            </div>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'appointments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <div className="flex items-center gap-2">
              <MdCalendarToday />
              Appointments
            </div>
          </button>

          {!isDoctor && (
            <>
              <button
                onClick={() => setActiveTab('history')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2">
                  <MdHistory />
                  Medical History
                </div>
              </button>
              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'prescriptions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2">
                  <FaFileMedical />
                  Prescriptions
                </div>
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reports' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-2">
                  <TbReportMedical />
                  Lab Reports
                </div>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        {activeTab === 'overview' && (
          <OverviewTab
            user={profileData}
            appointments={appointments}
            isDoctor={isDoctor}
          />
        )}

        {activeTab === 'appointments' && (
          <AppointmentsTab
            appointments={appointments}
            userName={profileData.username}
            isDoctor={isDoctor}
          />
        )}

        {!isDoctor && activeTab === 'history' && (
          <MedicalHistoryTab medicalHistory={medicalHistory} />
        )}

        {!isDoctor && activeTab === 'prescriptions' && (
          <PrescriptionsTab prescriptions={prescriptions} />
        )}

        {!isDoctor && activeTab === 'reports' && (
          <LabReportsTab labReports={labReports} />
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, icon }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-md ${icon.props.className.includes('text-blue-500') ? 'bg-blue-50' :
          icon.props.className.includes('text-purple-500') ? 'bg-purple-50' :
            icon.props.className.includes('text-red-500') ? 'bg-red-50' :
              icon.props.className.includes('text-green-500') ? 'bg-green-50' : 'bg-gray-50'
        }`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-gray-900 font-medium mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const OverviewTab = ({ user, appointments, isDoctor }) => (
  <div className="p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Summary */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 rounded-lg p-5 h-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MdPerson className={isDoctor ? "text-purple-500" : "text-blue-500"} />
            {isDoctor ? 'Doctor' : 'Patient'} Summary
          </h3>
          <div className="space-y-4">
            {isDoctor ? (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                  <p className="text-gray-700 mt-1">{user.department || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</p>
                  <p className="text-gray-700 mt-1">{user.specialization || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</p>
                  <p className="text-gray-700 mt-1">{user.qualification || 'Not specified'}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</p>
                  <p className="text-gray-700 mt-1">{user.address || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency Contact</p>
                  <p className="text-gray-700 mt-1">
                    {user.emergencyContact?.name || 'Not specified'}
                    {user.emergencyContact?.phone && (
                      <span className="block text-sm text-gray-500 mt-1">
                        <MdPhone className="inline mr-1" />
                        {user.emergencyContact.phone}
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</p>
                  <p className="text-gray-700 mt-1">
                    {user.insurance?.provider || 'Not specified'}
                    {user.insurance?.policyNumber && (
                      <span className="block text-sm text-gray-500 mt-1">
                        Policy: {user.insurance.policyNumber}
                      </span>
                    )}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiClock className={isDoctor ? "text-purple-500" : "text-blue-500"} />
          Upcoming Appointments
        </h3>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.caseType}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MdCalendarToday className="text-sm" />
                      <span>{appointment.date}</span>
                      <MdAccessTime className="text-sm ml-2" />
                      <span>{appointment.slot}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${appointment.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <MdLocalHospital className="text-gray-400" />
                  <span>OT {appointment.otNumber}</span>
                  {isDoctor ? (
                    <>
                      <FaUserInjured className="text-gray-400 ml-2" />
                      <span>{appointment.patientName || 'Patient name not available'}</span>
                    </>
                  ) : (
                    <>
                      <FaUserMd className="text-gray-400 ml-2" />
                      <span>{appointment.doctor || 'Doctor not assigned'}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
            {appointments.length > 3 && (
              <button className={`text-sm font-medium mt-2 ${isDoctor ? 'text-purple-600 hover:text-purple-800' : 'text-blue-600 hover:text-blue-800'
                }`}>
                View all {appointments.length} appointments
              </button>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <MdCalendarToday className="mx-auto text-3xl text-gray-400 mb-3" />
            <p className="text-gray-500">No upcoming appointments scheduled</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const AppointmentsTab = ({ appointments, userName, isDoctor }) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <MdCalendarToday className={isDoctor ? "text-purple-500" : "text-blue-500"} />
        Appointment History
      </h3>
      {!isDoctor && (
        <button className={`px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 ${isDoctor ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-blue-600 text-white'
          }`}>
          <MdAccessTime className="text-lg" />
          Book New Appointment
        </button>
      )}
    </div>

    {appointments.length > 0 ? (
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            userName={userName}
            isDoctor={isDoctor}
          />
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <MdCalendarToday className="mx-auto text-4xl text-gray-300 mb-4" />
        <h4 className="text-lg font-medium text-gray-500 mb-2">No appointments found</h4>
        <p className="text-gray-400">You don't have any appointment records yet.</p>
      </div>
    )}
  </div>
);

const MedicalHistoryTab = ({ medicalHistory }) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
      <MdHistory className="text-blue-500" />
      Medical History
    </h3>

    {medicalHistory.length > 0 ? (
      <div className="space-y-4">
        {medicalHistory.map((record, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{record.condition || 'Medical Condition'}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MdCalendarToday className="text-sm" />
                  <span>Diagnosed: {record.dateDiagnosed || 'Unknown date'}</span>
                  {record.dateResolved && (
                    <>
                      <span>•</span>
                      <span>Resolved: {record.dateResolved}</span>
                    </>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${record.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                  record.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {record.status || 'unknown'}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Description</p>
              <p className="text-gray-700">{record.description || 'No description provided'}</p>
            </div>
            {record.treatment && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Treatment</p>
                <p className="text-gray-700">{record.treatment}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <MdHistory className="mx-auto text-4xl text-gray-300 mb-4" />
        <h4 className="text-lg font-medium text-gray-500 mb-2">No medical history found</h4>
        <p className="text-gray-400">Your medical history records will appear here.</p>
      </div>
    )}
  </div>
);

const PrescriptionsTab = ({ prescriptions }) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
      <FaFileMedical className="text-blue-500" />
      Prescriptions
    </h3>

    {prescriptions.length > 0 ? (
      <div className="space-y-4">
        {prescriptions.map((prescription, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{prescription.medication || 'Medication'}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MdCalendarToday className="text-sm" />
                  <span>Prescribed: {prescription.datePrescribed || 'Unknown date'}</span>
                  <span>•</span>
                  <span>By: {prescription.doctor || 'Unknown doctor'}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${prescription.status === 'active' ? 'bg-blue-100 text-blue-800' :
                  prescription.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {prescription.status || 'active'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Dosage</p>
                <p className="text-gray-700">{prescription.dosage || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Frequency</p>
                <p className="text-gray-700">{prescription.frequency || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                <p className="text-gray-700">{prescription.duration || 'Not specified'}</p>
              </div>
            </div>
            {prescription.instructions && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Instructions</p>
                <p className="text-gray-700">{prescription.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <FaFileMedical className="mx-auto text-4xl text-gray-300 mb-4" />
        <h4 className="text-lg font-medium text-gray-500 mb-2">No prescriptions found</h4>
        <p className="text-gray-400">Your prescription records will appear here.</p>
      </div>
    )}
  </div>
);

const LabReportsTab = ({ labReports }) => (
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
      <TbReportMedical className="text-blue-500" />
      Lab Reports
    </h3>

    {labReports.length > 0 ? (
      <div className="space-y-4">
        {labReports.map((report, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{report.testName || 'Lab Test'}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MdCalendarToday className="text-sm" />
                  <span>Test Date: {report.testDate || 'Unknown date'}</span>
                  <span>•</span>
                  <span>Report Date: {report.reportDate || 'Unknown date'}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${report.status === 'normal' ? 'bg-green-100 text-green-800' :
                  report.status === 'abnormal' ? 'bg-yellow-100 text-yellow-800' :
                    report.status === 'critical' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                }`}>
                {report.status || 'unknown'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tested By</p>
                <p className="text-gray-700">{report.labName || 'Unknown lab'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Ordered By</p>
                <p className="text-gray-700">{report.orderedBy || 'Unknown doctor'}</p>
              </div>
            </div>
            {report.results && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Results</p>
                <p className="text-gray-700">{report.results}</p>
              </div>
            )}
            {report.notes && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Notes</p>
                <p className="text-gray-700">{report.notes}</p>
              </div>
            )}
            {report.attachmentUrl && (
              <div className="mt-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                  <IoMdDocument className="text-lg" />
                  View Full Report
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <TbReportMedical className="mx-auto text-4xl text-gray-300 mb-4" />
        <h4 className="text-lg font-medium text-gray-500 mb-2">No lab reports found</h4>
        <p className="text-gray-400">Your lab test reports will appear here.</p>
      </div>
    )}
  </div>
);

const AppointmentCard = ({ appointment, userName, isDoctor }) => {
  const statusColors = {
    assigned: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' }
  };

  const status = statusColors[appointment.status] || statusColors.pending;

  return (
    <div className={`border rounded-lg overflow-hidden ${status.border} hover:shadow-lg transition-shadow`}>
      {/* Header with case type and user name */}
      <div className={`px-5 py-3 border-b ${status.border} ${status.bg} ${status.text}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <FaProcedures />
              {appointment.caseType || 'Medical Procedure'}
            </h3>
            <p className="text-sm opacity-90">
              {isDoctor ? 'Patient' : 'Doctor'}: {userName || 'Unknown'}
            </p>
          </div>
          <span className={`px-3 py-1 rounded text-xs font-medium ${status.text} ${status.bg} border ${status.border}`}>
            {appointment.status}
          </span>
        </div>
      </div>

      {/* Highlighted OT, Date, Time section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-gray-200">
        <div className="p-4 border-r border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <MdLocalHospital className="text-gray-700" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">OT Room</p>
          </div>
          <p className="text-xl font-bold text-gray-900">{appointment.otNumber || 'Not assigned'}</p>
        </div>

        <div className="p-4 border-r border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <MdCalendarToday className="text-gray-700" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">{appointment.date || 'Not scheduled'}</p>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <MdAccessTime className="text-gray-700" />
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slot</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">{appointment.slot || 'Not specified'}</p>
        </div>
      </div>

      {/* Medical team section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="p-4 border-r border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <FaUserMd className="text-gray-700" />
            <p className="text-sm font-medium text-gray-700">Medical Team</p>
          </div>

          <div className="space-y-4">
            {!isDoctor && (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Doctor</p>
                  <p className="text-gray-900 font-medium">{appointment.doctor || 'Not assigned'}</p>
                  {appointment.doctorEmail && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <MdEmail className="text-xs" />
                      <p>{appointment.doctorEmail}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assistant Doctor</p>
                  <p className="text-gray-900 font-medium">{appointment.assistantDoctor || 'Not assigned'}</p>
                  {appointment.assistantDoctorEmail && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                      <MdEmail className="text-xs" />
                      <p>{appointment.assistantDoctorEmail}</p>
                    </div>
                  )}
                </div>
              </>
            )}
            {isDoctor && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</p>
                <p className="text-gray-900 font-medium">{appointment.patientName || 'Not assigned'}</p>
                {appointment.patientEmail && (
                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                    <MdEmail className="text-xs" />
                    <p>{appointment.patientEmail}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <FaUserNurse className="text-gray-700" />
            <p className="text-sm font-medium text-gray-700">Nursing Staff</p>
          </div>

          {appointment.nurses?.length > 0 ? (
            <ul className="space-y-2">
              {appointment.nurses.map((nurse, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <MdPeople className="text-gray-400 text-sm" />
                  <span className="text-gray-900">{nurse}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Not assigned</p>
          )}

          <div className="mt-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Additional Notes</p>
            <p className="text-gray-700 text-sm">{appointment.notes || 'No additional notes provided'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;