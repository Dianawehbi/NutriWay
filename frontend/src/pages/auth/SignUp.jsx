// SignUp.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const foodIcons = ["🥑", "NutriWay"];

export default function SignUp() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [usersEmails, setUsersEmails] = useState([]);

  const [signupForm, setSignupForm] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    waterIntake: "",
    goal: "",
  });

  const backgroundPositionsRef = useRef([]);

  useEffect(() => {
    backgroundPositionsRef.current = Array.from({ length: 10 }).map(() => ({
      top: `${Math.random() * 85 + 5}%`,
      left: `${Math.random() * 85 + 5}%`,
    }));

    const saved = JSON.parse(localStorage.getItem("user_register"));
    if (saved?.step === 2) {
      setStep(2);
      setSignupForm({
        username: saved.username,
        phoneNumber: saved.phoneNumber,
        email: saved.email,
        password: saved.password,
        confirmPassword: saved.password,
      });
    }
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const [clientsRes, dietitiansRes] = await Promise.all([
          axios.get("http://localhost:5000/api/client"),
          axios.get("http://localhost:5000/api/dietitian/all"),
        ]);

        const clientEmails = clientsRes.data.data.map(c => c.user_id?.email).filter(Boolean);
        const dietitianEmails = dietitiansRes.data.dietitians.map(d => d.user_id?.email).filter(Boolean);

        setUsersEmails([...clientEmails, ...dietitianEmails]);
      } catch (err) {
        console.error("Error fetching user emails", err);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { username, phoneNumber, email, password, confirmPassword } = signupForm;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (usersEmails.includes(email)) {
      setError("Email is already used.");
      return;
    }

    localStorage.setItem("user_register", JSON.stringify({ username, phoneNumber, email, password, step: 2 }));
    setError(null);
    setStep(2);
  };

  const handleClientInfoSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userData = { ...signupForm, ...userInfo };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/userRegister", userData);

      if (response.data.success) {
        localStorage.removeItem("user_register");
        setError(null);
        navigate("/login");
      } else {
        setError(response.data.error || "Could not complete registration.");
        setStep(1);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || "Unexpected error occurred.");
      setStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (label, name, type, value, onChange, placeholder) => (
    <div className="mb-4">
      <label className="block text-green-700 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-green-50 px-4 overflow-hidden">
      <div className="absolute inset-0 flex flex-wrap opacity-35 z-0">
        {backgroundPositionsRef.current.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ y: -20 }}
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
            className="absolute text-6xl"
            style={{ top: pos.top, left: pos.left }}
          >
            {foodIcons[i % foodIcons.length]}
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl z-10">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6">NutriWay Sign Up</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <form onSubmit={handleSignupSubmit}>
                {renderInput("Username", "username", "text", signupForm.username, handleSignupChange, "Enter username")}
                {renderInput("Phone Number", "phoneNumber", "tel", signupForm.phoneNumber, handleSignupChange, "Enter phone")}
                {renderInput("Email", "email", "email", signupForm.email, handleSignupChange, "Enter email")}
                {renderInput("Password", "password", "password", signupForm.password, handleSignupChange, "Enter password")}
                {renderInput("Confirm Password", "confirmPassword", "password", signupForm.confirmPassword, handleSignupChange, "Confirm password")}

                <button type="submit" disabled={isSubmitting} className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 mt-2 transition transform hover:scale-105">
                  {isSubmitting ? "Registering..." : "Continue to Health Profile"}
                </button>
              </form>

              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account? <Link to="/Login" className="text-green-600 font-medium hover:underline">Login</Link>
              </div>
              <div className="text-center text-sm text-gray-600 mt-1">
                Dietitian? <Link to="/DietitianRegister" className="text-green-600 font-medium hover:underline">Register here</Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-serif font-bold text-center text-green-700 mb-6">Complete Your Health Profile</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              <form onSubmit={handleClientInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {renderInput("Age", "age", "number", userInfo.age, handleUserInfoChange, "Age")}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={userInfo.gender} onChange={handleUserInfoChange} required className="w-full p-2 border rounded-md focus:ring-green-500">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {renderInput("Weight (kg)", "weight", "number", userInfo.weight, handleUserInfoChange, "Weight")}
                  {renderInput("Height (cm)", "height", "number", userInfo.height, handleUserInfoChange, "Height")}
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Activity Level</label>
                  <select name="activityLevel" value={userInfo.activityLevel} onChange={handleUserInfoChange} required className="w-full p-2 border rounded-md focus:ring-green-500">
                    <option value="">Select level</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly active</option>
                    <option value="moderate">Moderately active</option>
                    <option value="active">Very active</option>
                    <option value="superactive">Super active</option>
                  </select>
                </div>
                {renderInput("Water Intake (L)", "waterIntake", "number", userInfo.waterIntake, handleUserInfoChange, "Liters")}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Goal</label>
                  <select name="goal" value={userInfo.goal} onChange={handleUserInfoChange} required className="w-full p-2 border rounded-md focus:ring-green-500">
                    <option value="">Select goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="maintain">Maintain Weight</option>
                  </select>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105">
                  {isSubmitting ? "Saving..." : "Finish Registration"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
