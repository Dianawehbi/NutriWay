import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log({ email, username, phoneNumber, password });
    };

    const foodIcons = ["🥑", "NutriWay"];

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-green-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap opacity-35 ">
                {Array.from({ length: 10 }).map((_, i) => (
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
                            top: `${Math.random() * 85 + 5}%`,
                            left: `${Math.random() * 85 + 5}%`,
                            padding: "30px",
                        }}
                    >
                        {foodIcons[i % foodIcons.length]}
                    </motion.div>
                ))}
            </div>
            <div className="lg:w-ful w-xsl max-w-md p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
                <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6 animate-fadeIn">NutriWay Sign Up</h2>
                <p className="text-center text-gray-600 mb-4 animate-slideUp">Create your account to start your healthy journey</p>
                <form onSubmit={handleSubmit} className="animate-fadeInUp">
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-green-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4 text-sm animate-slideUp">
                    Already have an account?
                    <Link to="../Login" className="text-green-500 hover:underline transition duration-300 ease-in-out hover:text-green-700">Login</Link>
                </p>
                <p className="text-center text-gray-600 mt-4 text-sm animate-slideUp">
                    Register as Dietitian?
                    <Link to="../DietitianRegister" className="text-green-500 hover:underline transition duration-300 ease-in-out hover:text-green-700">Register</Link>
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