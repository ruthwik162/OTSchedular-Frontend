import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

const URL = "https://otschedular-backend.onrender.com";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [dept, setDept] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (formData) => {
    try {
      const json = {};
      formData.forEach((value, key) => {
        json[key] = value;
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      let payload = {};

      switch (json.role) {
        case "doctor":
        case "assistantDoctor":
          payload = {
            email: json.email,
            password: json.password,
            username: json.username,
            gender: json.gender,
            mobile: json.mobile,
            role: json.role,
            department: json.department,
            designation: json.designation,
            experience: json.experience,
            caseType: json.caseType,
          };
          break;

        case "nurse":
          payload = {
            email: json.email,
            password: json.password,
            username: json.username,
            gender: json.gender,
            mobile: json.mobile,
            role: json.role,
            department: json.department,
            shiftTime: json.shiftTime,
            experience: json.experience,
          };
          break;

        case "patient":
        default:
          payload = {
            email: json.email,
            password: json.password,
            username: json.username,
            gender: json.gender,
            mobile: json.mobile,
            role: json.role,
            age: json.age,
            caseType: json.caseType,
            caseDescription: json.caseDescription,
            bloodGroup: json.bloodGroup,
            allergies: json.allergies,
            emergencyContactName: json.emergencyContactName,
            emergencyContactNumber: json.emergencyContactNumber,
          };
          break;
      }

      await axios.post(`${URL}/users/register`, payload, config);

      toast.success("Registration successful! Please log in.");
      navigate("/");
      setShowUserLogin(true);
    } catch (error) {
      console.error("Registration error:", error.response || error);
      toast.error(error.response?.data?.message || "Error registering user.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${URL}/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const user = response.data;

        if (!user || !user.id) {
          toast.error("Login failed: Invalid user data");
          return;
        }

        const userDetails = {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          gender: user.gender,
          image: user.profileImageUrl || "",
        };

        // Always store in localStorage
        localStorage.setItem("user", JSON.stringify(userDetails));

        setUser(userDetails);
        toast.success("Logged in successfully!");

        switch (user.role) {
          case "admin":
            navigate("/adminhome");
            break;
          case "doctor":
            navigate("/doctor-home");
            break;
          case "patient":
            navigate("/patient-home");
            break;
          default:
            navigate("/");
            break;
        }

        setShowUserLogin(false);
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user"); // clear from local storage
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${URL}/user/forgot-password`, { email });
      toast.success(response.data.message || "Password reset link sent.");
    } catch (error) {
      console.error("Forgot password error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        dept,
        setDept,
        navigate,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        searchQuery,
        setSearchQuery,
        register,
        teacher,
        setTeacher,
        login,
        logout,
        forgotPassword,
        appointments,
        setAppointments,
        URL,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
