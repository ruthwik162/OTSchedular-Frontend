import React, { useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaEye, FaEyeSlash, FaUserMd, FaUserNurse, FaUserInjured, FaUserShield } from "react-icons/fa";
import { MdOutlineEmergency, MdBloodtype, MdOutlineDescription } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { FiArrowDownLeft, FiLoader, FiX } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";
import { useAppContext } from "../../AppContext/AppContext";

// Department to caseType mapping
const departmentCaseTypes = {
  "Cardiology": [
    "Heart Attack",
    "Arrhythmia",
    "Hypertension",
    "Angina",
    "Congenital Heart Disease",
    "Heart Failure",
    "Coronary Artery Disease",
    "Valvular Heart Disease"
  ],
  "Neurology": [
    "Stroke",
    "Epilepsy",
    "Brain Tumor",
    "Parkinson's Disease",
    "Multiple Sclerosis",
    "Migraine",
    "Alzheimer's Disease",
    "ALS"
  ],
  "Orthopedics": [
    "Fracture",
    "Arthritis",
    "Dislocation",
    "Ligament Tear",
    "Joint Replacement",
    "Osteoporosis",
    "Scoliosis",
    "Carpal Tunnel Syndrome"
  ],
  "Gastroenterology": [
    "Ulcers",
    "Hepatitis",
    "IBS",
    "Gallstones",
    "Pancreatitis",
    "GERD",
    "Crohn's Disease",
    "Colon Cancer"
  ],
  "Oncology": [
    "Breast Cancer",
    "Lung Cancer",
    "Leukemia",
    "Skin Cancer",
    "Brain Cancer",
    "Prostate Cancer",
    "Lymphoma",
    "Ovarian Cancer"
  ],
  "Gynecology": [
    "PCOD",
    "Fibroids",
    "Endometriosis",
    "Pregnancy",
    "Infertility",
    "Menopause",
    "Ovarian Cysts",
    "Cervical Cancer"
  ],
  "Dermatology": [
    "Acne",
    "Eczema",
    "Psoriasis",
    "Fungal Infection",
    "Skin Allergy",
    "Melanoma",
    "Rosacea",
    "Vitiligo"
  ],
  "Psychiatry": [
    "Depression",
    "Anxiety",
    "Bipolar Disorder",
    "Schizophrenia",
    "PTSD",
    "OCD",
    "ADHD",
    "Eating Disorders"
  ],
  "General Surgery": [
    "Appendicitis",
    "Hernia",
    "Gallbladder",
    "Tonsillitis",
    "Hemorrhoids",
    "Varicose Veins",
    "Thyroid Disorders",
    "Breast Surgery"
  ]
};

// Department-specific designations
const departmentDesignations = {
  "Cardiology": [
    "Cardiologist",
    "Cardiac Surgeon",
    "Senior Cardiologist",
    "Interventional Cardiologist",
    "Pediatric Cardiologist",
    "Electrophysiologist",
    "Head of Cardiology"
  ],
  "Neurology": [
    "Neurologist",
    "Neurosurgeon",
    "Senior Neurologist",
    "Pediatric Neurologist",
    "Epileptologist",
    "Head of Neurology"
  ],
  "Orthopedics": [
    "Orthopedic Surgeon",
    "Sr. Orthopedic Surgeon",
    "Joint Specialist",
    "Spine Specialist",
    "Sports Medicine Specialist",
    "Pediatric Orthopedist",
    "Head of Orthopedics"
  ],
  "Gastroenterology": [
    "Gastroenterologist",
    "Hepatologist",
    "Senior Gastroenterologist",
    "Pediatric Gastroenterologist",
    "Endoscopist",
    "Head of Gastroenterology"
  ],
  "Oncology": [
    "Oncologist",
    "Radiation Oncologist",
    "Medical Oncologist",
    "Surgical Oncologist",
    "Pediatric Oncologist",
    "Hematologist",
    "Head of Oncology"
  ],
  "Gynecology": [
    "Gynecologist",
    "Obstetrician",
    "Senior Gynecologist",
    "Reproductive Endocrinologist",
    "Gynecologic Oncologist",
    "Urogynecologist",
    "Head of Gynecology"
  ],
  "Dermatology": [
    "Dermatologist",
    "Cosmetic Dermatologist",
    "Pediatric Dermatologist",
    "Dermatopathologist",
    "Mohs Surgeon",
    "Head of Dermatology"
  ],
  "Psychiatry": [
    "Psychiatrist",
    "Clinical Psychologist",
    "Child Psychiatrist",
    "Geriatric Psychiatrist",
    "Addiction Psychiatrist",
    "Head of Psychiatry"
  ],
  "General Surgery": [
    "General Surgeon",
    "Laparoscopic Surgeon",
    "Trauma Surgeon",
    "Pediatric Surgeon",
    "Colorectal Surgeon",
    "Head of Surgery"
  ]
};

const roles = [
  { value: "admin", label: "Admin", icon: <FaUserShield className="mr-2" /> },
  { value: "doctor", label: "Doctor", icon: <FaUserMd className="mr-2" /> },
  { value: "assistantDoctor", label: "Assistant Doctor", icon: <FaUserMd className="mr-2" /> },
  { value: "nurse", label: "Nurse", icon: <FaUserNurse className="mr-2" /> },
  { value: "patient", label: "Patient", icon: <FaUserInjured className="mr-2" /> }
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

const bloodGroups = [
  "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"
];

const Login = () => {
  const [state, setState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    role: "patient",
    department: "",
    experience: "",
    designation: "",
    shiftTime: "",
    profileImage: null,
    age: "",
    caseType: "",
    conditionName: "",
    caseDescription: "",
    bloodGroup: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactNumber: ""
  });

  const { URL, setToken, setShowUserLogin, setUser } = useAppContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setError(null);

    if (name === "profileImage" && files?.length > 0) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB");
        return;
      }

      setFormData(prev => ({ ...prev, profileImage: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    if (name === "role") {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        department: "",
        designation: "",
        experience: "",
        shiftTime: "",
        ...(value !== "patient" && {
          age: "",
          caseType: "",
          conditionName: "",
          caseDescription: "",
          bloodGroup: "",
          allergies: "",
          emergencyContactName: "",
          emergencyContactNumber: ""
        }),
        ...(value === "patient" && {
          department: "",
          designation: "",
          shiftTime: "",
          experience: ""
        })
      }));
      return;
    }

    if (name === "caseType") {
      const department = Object.entries(departmentCaseTypes).find(([_, conditions]) =>
        conditions.includes(value)
      )?.[0] || "";

      setFormData(prev => ({
        ...prev,
        caseType: department,
        conditionName: value,
        department
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (state === "register") {
        const formDataToSend = new FormData();

        const registrationData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          gender: formData.gender,
          role: formData.role,

          ...(formData.role === "patient" && {
            age: formData.age,
            caseType: formData.caseType,
            conditionName: formData.conditionName,
            caseDescription: formData.caseDescription,
            bloodGroup: formData.bloodGroup,
            allergies: formData.allergies,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactNumber: formData.emergencyContactNumber
          }),

          ...((formData.role === "doctor" || formData.role === "assistantDoctor") && {
            department: formData.department,
            experience: formData.experience,
            designation: formData.designation
          }),

          ...(formData.role === "nurse" && {
            shiftTime: formData.shiftTime
          })
        };

        Object.entries(registrationData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            formDataToSend.append(key, value);
          }
        });

        if (formData.profileImage instanceof File) {
          formDataToSend.append("profileImage", formData.profileImage);
        }

        const response = await axios.post(`${URL}/user/register`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const role = formData.role;
        if (role === "patient") {
          toast.success("Patient registered successfully. You can now book OT slots.");
        } else if (role === "doctor" || role === "assistantDoctor") {
          toast.success("Doctor registered successfully. You will now be considered for OT scheduling.");
        } else if (role === "nurse") {
          toast.success("Nurse registered successfully. You will be auto-assigned to OTs as needed.");
        } else if (role === "admin") {
          toast.success("Admin registered successfully.");
        } else {
          toast.success("User registered successfully.");
        }

        setState("login");
        resetForm();

      } else {
        const response = await axios.post(`${URL}/user/login`, {
          email: formData.email,
          password: formData.password
        });

        console.log("Login API Response:", response.data); // 🔍 check the shape

        const loggedInUser = response.data.user || response.data; // fallback if no .user wrapper

        if (!loggedInUser) {
          toast.error("Login failed: No user data received");
          return;
        }

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);

        toast.success("Login successful");
        setShowUserLogin(false);
      }


    } catch (error) {
      const errorMsg = error.response?.data?.message ||
        (state === "login"
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again.");

      setError(errorMsg);
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      role: "patient",
      department: "",
      experience: "",
      designation: "",
      shiftTime: "",
      profileImage: null,
      age: "",
      caseType: "",
      conditionName: "",
      caseDescription: "",
      bloodGroup: "",
      allergies: "",
      emergencyContactName: "",
      emergencyContactNumber: ""
    });
    setPreviewImage(null);
  };

  // Style constants
  const inputStyle = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-150 text-sm";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1.5";
  const sectionTitleStyle = "text-lg font-semibold text-gray-800 mb-3 mt-4 pb-2 border-b border-gray-200";
  const iconStyle = "absolute left-3 top-3.5 text-gray-400";
  const dropdownIconStyle = "absolute right-3 top-3.5 text-gray-400 pointer-events-none";

  return (
    <div className="fixed inset-0 z-[999] bg-black/30 backdrop-blur-sm flex items-center justify-center  px-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-xl flex w-full max-w-4xl max-h-[75vh]">
        {/* Left Banner */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-300 items-center justify-center p-8">
          <div className="text-center text-white">
            <img
              src={assets.Banner}
              alt="Banner"
              className="w-80 mx-auto mb-6 rounded-lg shadow-lg border-4 border-white/30"
            />
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-700 to-violet-500 text-transparent bg-clip-text">
              MediCare Hospital
            </h2>
            <p className="text-lg opacity-90 text-gray-700">
              {state === "login"
                ? "Sign in to access your personalized dashboard."
                : "Join our healthcare platform to get the best medical services."}
            </p>

          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col relative w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <button onClick={() => setShowUserLogin(false)}
            className="absolute top-4 right-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors p-2 rounded-xl hover:bg-gray-100"
          ><FiX size={22} /></button>
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              {state === "login" ? "Welcome Back!" : "Create an Account"}
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              {state === "login"
                ? "Please sign in to continue"
                : "Fill in your details to get started"}
            </p>
          </div>

          {error && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="flex flex-col w-full">
            {state === "register" && (
              <>
                {/* Profile Picture */}
                <div className="w-full flex flex-col items-center mb-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-blue-100 shadow-sm mb-2">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <FaUser className="text-gray-400 text-3xl" />
                      </div>
                    )}
                  </div>
                  <label className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100 transition-colors text-xs flex items-center">
                    <FaUser className="mr-1.5" size={12} />
                    Upload Profile
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <h3 className={sectionTitleStyle}>Basic Information</h3>

                <div className="mb-4">
                  <label className={labelStyle}>Full Name</label>
                  <div className="relative">
                    <FaUser className={iconStyle} size={14} />
                    <input
                      type="text"
                      name="username"
                      placeholder="First Last Name"
                      required
                      onChange={handleChange}
                      value={formData.username}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Email</label>
                  <div className="relative">
                    <FaEnvelope className={iconStyle} size={14} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleChange}
                      value={formData.email}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Mobile Number</label>
                  <div className="relative">
                    <FaPhone className={iconStyle} size={14} />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      required
                      onChange={handleChange}
                      value={formData.mobile}
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Gender</label>
                  <div className="flex gap-4">
                    {genders.map((g) => (
                      <label key={g.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value={g.value}
                          onChange={handleChange}
                          checked={formData.gender === g.value}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="text-sm text-gray-700">{g.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <h3 className={sectionTitleStyle}>Account Type</h3>

                <div className="mb-4">
                  <label className={labelStyle}>Select Your Role</label>
                  <div className="grid grid-cols-2 gap-3">
                    {roles.map((r) => (
                      <label
                        key={r.value}
                        className={`flex items-center p-2.5 border rounded-lg cursor-pointer transition-colors ${formData.role === r.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={r.value}
                          onChange={handleChange}
                          checked={formData.role === r.value}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="flex items-center text-sm">
                          {r.icon}
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Doctor/Assistant Doctor Fields */}
                {(formData.role === "doctor" || formData.role === "assistantDoctor") && (
                  <>
                    <h3 className={sectionTitleStyle}>Professional Information</h3>

                    <div className="mb-4">
                      <label className={labelStyle}>Department</label>
                      <div className="relative">
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none pr-8`}
                          required
                        >
                          <option value="">Select Department</option>
                          {Object.keys(departmentCaseTypes).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                        <IoMdArrowDropdown className={dropdownIconStyle} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Experience (years)</label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="5"
                        className={inputStyle}
                        required
                        min="0"
                        max="50"
                      />
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Designation</label>
                      <div className="relative">
                        <select
                          name="designation"
                          value={formData.designation}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none pr-8`}
                          required
                          disabled={!formData.department}
                        >
                          <option value="">Select Designation</option>
                          {formData.department && departmentDesignations[formData.department]?.map(designation => (
                            <option key={designation} value={designation}>{designation}</option>
                          ))}
                        </select>
                        <IoMdArrowDropdown className={dropdownIconStyle} />
                      </div>
                    </div>
                  </>
                )}

                {/* Nurse Fields */}
                {formData.role === "nurse" && (
                  <>
                    <h3 className={sectionTitleStyle}>Professional Information</h3>
                    <div className="mb-4">
                      <label className={labelStyle}>Shift Time</label>
                      <div className="relative">
                        <select
                          name="shiftTime"
                          value={formData.shiftTime}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none pr-8`}
                          required
                        >
                          <option value="">Select Shift Time</option>
                          <option value="7am - 11am">7am - 11am</option>
                          <option value="11am - 3pm">11am - 3pm</option>
                          <option value="3pm - 7pm">3pm - 7pm</option>
                          <option value="7pm - 11pm">7pm - 11pm</option>
                        </select>
                        <IoMdArrowDropdown className={dropdownIconStyle} />
                      </div>
                    </div>
                  </>
                )}

                {/* Patient Fields */}
                {formData.role === "patient" && (
                  <>
                    <h3 className={sectionTitleStyle}>Medical Information</h3>

                    <div className="mb-4">
                      <label className={labelStyle}>Age</label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="35"
                        className={inputStyle}
                        required
                        min="0"
                        max="120"
                      />
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Medical Condition</label>
                      <div className="relative">
                        <select
                          name="caseType"
                          value={formData.conditionName}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none pr-8`}
                          required
                        >
                          <option value="">Select Medical Condition</option>
                          {Object.entries(departmentCaseTypes).map(([dept, cases]) => (
                            <optgroup label={dept} key={dept}>
                              {cases.map(caseType => (
                                <option key={caseType} value={caseType}>{caseType}</option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                        <IoMdArrowDropdown className={dropdownIconStyle} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Case Description</label>
                      <div className="relative">
                        <MdOutlineDescription className={iconStyle} size={16} />
                        <textarea
                          name="caseDescription"
                          value={formData.caseDescription}
                          onChange={handleChange}
                          placeholder="Describe your medical condition in detail"
                          className={`${inputStyle} pl-10 min-h-[100px]`}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Blood Group</label>
                      <div className="relative">
                        <MdBloodtype className={iconStyle} size={16} />
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          className={`${inputStyle} appearance-none pl-10 pr-8`}
                          required
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                        <IoMdArrowDropdown className={dropdownIconStyle} />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Allergies (if any)</label>
                      <div className="relative">
                        <GiMedicines className={iconStyle} size={16} />
                        <input
                          type="text"
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                          placeholder="Penicillin, Peanuts, etc."
                          className={`${inputStyle} pl-10`}
                        />
                      </div>
                    </div>

                    <h3 className={sectionTitleStyle}>Emergency Contact</h3>

                    <div className="mb-4">
                      <label className={labelStyle}>Contact Name</label>
                      <div className="relative">
                        <MdOutlineEmergency className={iconStyle} size={16} />
                        <input
                          type="text"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          placeholder="Emergency contact person name"
                          className={`${inputStyle} pl-10`}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className={labelStyle}>Contact Number</label>
                      <div className="relative">
                        <FaPhone className={iconStyle} size={14} />
                        <input
                          type="tel"
                          name="emergencyContactNumber"
                          value={formData.emergencyContactNumber}
                          onChange={handleChange}
                          placeholder="Emergency contact number"
                          className={`${inputStyle} pl-10`}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Login Fields */}
            {state === "login" && (
              <>
                <div className="mb-4 md:mt-10">
                  <label className={labelStyle}>Email</label>
                  <div className="relative">
                    <FaEnvelope className={iconStyle} size={14} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className={`${inputStyle} pl-10`}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelStyle}>Password</label>
                  <div className="relative">
                    <FaLock className={iconStyle} size={14} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className={`${inputStyle} pl-10`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm cursor-pointer text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {/* Password for registration */}
            {state === "register" && (
              <div className="mb-4">
                <label className={labelStyle}>Create Password</label>
                <div className="relative">
                  <FaLock className={iconStyle} size={14} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`${inputStyle} pl-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Processing...
                </>
              ) : state === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-gray-600 text-sm mt-4 w-full text-center">
              {state === "login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setState(state === "login" ? "register" : "login");
                  setPreviewImage(null);
                  setError(null);
                }}
                className="text-blue-600 cursor-pointer font-medium hover:underline"
              >
                {state === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;