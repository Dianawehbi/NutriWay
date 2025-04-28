import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRuler, FaTint, FaRunning, FaAppleAlt } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import NavBar from "../../../components/NavBar.jsx";
import axios from "axios";

const ClientProfile = () => {
    const [user, setUser] = useState(null);
    const [bodyData, setBodyData] = useState(null);
    const [weightData, setWeightData] = useState([]);
    const [bmiData, setBmiData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // what i want to do is first check 
                // if user want to enter to another user profile he cannot 
                // dietitian can but cannot manage the profile 
                const userResponse = await axios.get('http://localhost:5000/api/client', {
                    params: {
                        id: JSON.parse(localStorage.getItem("user"))._id
                    }
                });

                if(userResponse.data.success){
                    setUser(userResponse.data);
                }
                // const bodyResponse = await axios.get("http://localhost:5000/api/bodydata/123");
                // const trendsResponse = await axios.get("http://localhost:5000/api/trends/123");

                // setBodyData(bodyResponse.data);
                // setWeightData(trendsResponse.data.weightTrend);
                // setBmiData(trendsResponse.data.bmiTrend);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-bold text-gray-700">Loading...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-2xl font-bold text-red-500">No Data Available</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100">
            <NavBar />
            <div className="min-h-screen flex flex-col items-center p-6 mt-20 font-serif">
                {/* Profile Section */}
                <div className="bg-white shadow-xl rounded-3xl p-8 mx-6 w-11/12 flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
                    <div className="flex-shrink-0 flex items-center justify-center">
                        {/* i will make a folder of avatar if i have time */}
                        <img
                            className="min-w-32 h-32 rounded-full border-4 border-green-500 shadow-md transform transition-transform hover:scale-105"
                            src={user.avatar || '/default-avatar.png'}
                            alt="User"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between p-6 w-full space-y-4 sm:space-y-0">
                        <div className="flex-grow text-center sm:text-left">
                            <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
                            <p className="text-gray-500 text-lg"> {user.activityLevel}</p>
                        </div>
            
                        <div className="mt-4 sm:mt-0 sm:ml-8 space-y-2 text-gray-600 text-lg">
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Height:</strong> {user.height}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <InfoCard icon={<FaRuler className="text-4xl text-blue-600 mb-2" />} label="Height" value={user.height} />
                        <InfoCard icon={<FaRunning className="text-4xl text-blue-600 mb-2" />} label="Activity Level" value={user.activityLevel} />
                        <InfoCard icon={<FaTint className="text-4xl text-blue-600 mb-2" />} label="Water Intake" value={user.waterIntake} />
                        {/* <InfoCard icon={<FaAppleAlt className="text-4xl text-blue-600 mb-2" />} label="Diet Preference" value={user.dietPreference} /> */}
                    </div>
                </div>
                {/* General Information */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">General Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoSection
                            title="Consultation Data"
                            description="Next Appointment: March 15, 2025"
                            additional="Dietitian: Dr. Sarah Lee"
                            buttonText="View Details"
                            buttonColor="bg-green-500"
                            link="/Appointment"
                        />
                        <InfoSection
                            title="Shopping Cart"
                            description="Go to your Shopping Cart"
                            buttonText="Go to Cart"
                            buttonColor="bg-blue-500"
                            link="/Shop"
                        />
                        <InfoSection
                            title="Diet Plans"
                            description="Current Plan: Weight Loss Plan"
                            buttonText="View Diet Plan"
                            buttonColor="bg-red-500"
                            link="/DietPlan"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

// Components for cleaner code
const InfoCard = ({ icon, label, value }) => (
    <div className="bg-blue-100 p-6 rounded-xl text-center shadow-lg flex flex-col items-center">
        {icon}
        <p className="text-gray-700 text-lg font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const InfoSection = ({ title, description, additional, buttonText, buttonColor, link }) => (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className={`text-xl font-semibold mb-2 ${buttonColor.replace('bg-', 'text-')}`}>{title}</h3>
        <p className="text-gray-600">{description}</p>
        {additional && <p className="text-gray-600">{additional}</p>}
        <Link to={link}>
            <button className={`mt-3 ${buttonColor} text-white px-4 py-2 rounded-lg hover:brightness-110`}>
                {buttonText}
            </button>
        </Link>
    </div>
);

export default ClientProfile;
