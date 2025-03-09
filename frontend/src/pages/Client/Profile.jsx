import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWeight, FaHeartbeat, FaDumbbell, FaRuler, FaTint, FaRunning, FaAppleAlt } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import NavBar from "../../components/NavBar";
const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        age: 29,
        location: "New York, USA",
        avatar: '',
        height: "175 cm",
        activityLevel: "Active",
        waterIntake: "2.5 L/day",
        dietPreference: "Vegetarian",
    });

    const [bodyData, setBodyData] = useState({
        weight: 70,
        bmi: 22.5,
        bodyFat: 15,
        muscleMass: 55,
    });

    const weightData = [
        { month: "Jan", weight: 72 },
        { month: "Feb", weight: 70 },
        { month: "Mar", weight: 69 },
        { month: "Apr", weight: 68 },
    ];

    const bmiData = [
        { month: "Jan", bmi: 23 },
        { month: "Feb", bmi: 22.5 },
        { month: "Mar", bmi: 22 },
        { month: "Apr", bmi: 21.8 },
    ];

    useEffect(() => {
        // Simulate fetching user data from an API
        setTimeout(() => {
            setUser({
                name: "Jane Smith",
                email: "janesmith@example.com",
                age: 27,
                location: "Los Angeles, USA",
                avatar: '',
                height: "168 cm",
                activityLevel: "Very Active",
                waterIntake: "3 L/day",
                dietPreference: "Vegan",
            });

            setBodyData({
                weight: 65,
                bmi: 21.8,
                bodyFat: 18,
                muscleMass: 50,
            });
        }, 3000);
    }, []);

    return (
        <div className="bg-gray-100">
            <NavBar />
            <div className="min-h-screen  flex flex-col items-center p-6 mt-20 font-serif">
                {/* Profile Section */}
                <div className="bg-white shadow-xl rounded-3xl p-8 mx-6 w-11/12 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                    {/* User Image */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <img
                            className="min-w-32 h-32 rounded-full border-4 border-green-500 shadow-md transform transition-transform hover:scale-105"
                            src={user.avatar}
                            alt="User Image"
                        />
                    </div>

                    {/* User Info Section */}
                    <div className="flex flex-col sm:flex-row sm:justify-between p-6 w-full space-y-4 sm:space-y-0">
                        {/* Name and Diet Info */}
                        <div className="flex-grow text-center sm:text-left">
                            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-500 text-lg">{user.dietPreference} | {user.activityLevel}</p>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-4 sm:mt-0 sm:ml-8 space-y-2 text-gray-600 text-lg">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Height:</strong> {user.height}</p>
                            <p><strong>Location:</strong> {user.location}</p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Section */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Body Composition Data</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-green-100 p-6 rounded-xl shadow-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">Weight Trend</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={weightData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-green-100 p-6 rounded-xl shadow-lg">
                            <h4 className="text-lg font-semibold text-gray-700 mb-4">BMI Trend</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={bmiData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="bmi" stroke="#ef4444" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Health Information */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Health Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg flex flex-col items-center">
                            <FaRuler className="text-4xl text-blue-600 mb-2" />
                            <p className="text-gray-700 text-lg font-medium">Height</p>
                            <p className="text-2xl font-bold">{user.height}</p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg flex flex-col items-center">
                            <FaRunning className="text-4xl text-blue-600 mb-2" />
                            <p className="text-gray-700 text-lg font-medium">Activity Level</p>
                            <p className="text-2xl font-bold">{user.activityLevel}</p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg flex flex-col items-center">
                            <FaTint className="text-4xl text-blue-600 mb-2" />
                            <p className="text-gray-700 text-lg font-medium">Water Intake</p>
                            <p className="text-2xl font-bold">{user.waterIntake}</p>
                        </div>
                        <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg flex flex-col items-center">
                            <FaAppleAlt className="text-4xl text-blue-600 mb-2" />
                            <p className="text-gray-700 text-lg font-medium">Diet Preference</p>
                            <p className="text-2xl font-bold">{user.dietPreference}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    {/* Section Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">General Information</h2>

                    <div className="grid grid-cols-1  md:grid-cols-3 gap-6">
                        {/* Consultation Data */}
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold mb-2 text-green-700">Consultation Data</h3>
                            <p className="text-gray-600">Next Appointment: <span className="font-medium">March 15, 2025</span></p>
                            <p className="text-gray-600">Dietitian: <span className="font-medium">Dr. Sarah Lee</span></p>

                            <Link to={'/Appointment'}>
                                <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">View Details</button>
                            </Link>
                        </div>

                        {/* Shopping Card */}
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">Shopping Cart</h3>
                            <p className="text-gray-600 ">Go tou your Shopping Card </p>
                            <Link to={'/Shop'}>
                                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Go to Cart</button></Link>
                        </div>

                        {/* Diet Plans */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2 text-red-700">Diet Plans</h3>
                            <p className="text-gray-600 mb-2">Current Plan: <span className="font-medium">Weight Loss Plan</span></p>
                            <Link to={'/DietPlan'}>
                                <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">View Diet Plan</button></Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;