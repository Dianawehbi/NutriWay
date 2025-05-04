import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import AuthContext, { useAuth } from "../../context/authContext";
import { useEffect } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate()
    const backgroundPositionsRef = useRef([]);

    useEffect(() => {
        backgroundPositionsRef.current = Array.from({ length: 10 }).map(() => ({
            top: `${Math.random() * 85 + 5}%`,
            left: `${Math.random() * 85 + 5}%`,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password }
            );

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                if (response.data.user.role === "admin") {
                    navigate('/AdminDashboard');
                } else if (response.data.user.role === "dietitian") {
                    navigate('/DietitianDashboard');
                } else if (response.data.user.role === "client") {
                    navigate('/clientdashboard');
                } else {
                    navigate('/login');
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
            console.log(error);
        }
    };

    const foodIcons = ["🥑", "NutriWay"];

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-green-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Animated food icons in background */}
            <div className="absolute inset-0 flex flex-wrap opacity-35 ">
                {backgroundPositionsRef.current.map((pos, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 1 }}
                        animate={{ y: [10, -10, 10], opacity: 1 }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        className="absolute text-6xl"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            padding: "30px",
                        }}
                    >
                        {foodIcons[i % foodIcons.length]}
                    </motion.div>
                ))}
            </div>

            <div className=" w-xs lg:w-100 max-w-md p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
                <h2 className="text-3xl font-bold font-serif text-center text-green-700 mb-6 animate-fadeIn">NutriWay Login</h2>
                <p className="text-center text-gray-600 mb-4 animate-slideUp">Access your nutrition appointments and healthy plans</p>
                <form onSubmit={handleSubmit} className="animate-fadeInUp">
                    <div>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Password</label>
                        <input
                            placeholder="******"
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <label className="flex items-center text-green-700">
                            <input
                                type="checkbox"
                                className="mr-2 transition duration-300 ease-in-out transform hover:scale-110"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            Remember me
                        </label>
                        <a href="#" className="text-green-500 hover:underline text-sm mt-2 sm:mt-0 transition duration-300 ease-in-out hover:text-green-700">Forgot password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4 text-sm animate-slideUp">
                    Don't have an account?
                    <Link to={`../SignUp`} className="text-green-500 hover:underline transition duration-300 ease-in-out hover:text-green-700">Sign up</Link>
                </p>
            </div>
            <style>
                {`
          @keyframes floatAnimation {
            0% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(20px);
            }
          }
        `}
            </style>
        </div>
    );
}

