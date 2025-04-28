import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar";

const ClientManageProfile = () => {
    const navigate = useNavigate();
    // put  on chat gpt userinfo page and this page and then write that you need to make the pprofile managment look like user information , then 
    // add also the user general information 
    const [user, setUser] = useState({
        name: "Jane Smith",
        email: "janesmith@example.com",
        password: "",
        age: 27,
        location: "Beirut, Lebanon",
        height: 168,
        activityLevel: "Very Active",
        waterIntake: 3,
        dietPreference: "Vegan",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: name === "height" || name === "waterIntake" ? Number(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated successfully!");
        navigate("/profile");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBar />
            <div className="flex flex-col mt-20 items-center p-6">
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 max-w-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Manage Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Name</span>
                            <input 
                                type="text" 
                                name="name" 
                                value={user.name} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input 
                                type="email" 
                                name="email" 
                                value={user.email} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">New Password</span>
                            <input 
                                type="password" 
                                name="password" 
                                value={user.password} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                                placeholder="Leave blank to keep current password"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Location</span>
                            <select 
                                name="location" 
                                value={user.location} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            >
                                <option value="Beirut, Lebanon">Beirut, Lebanon</option>
                                <option value="Tripoli, Lebanon">Tripoli, Lebanon</option>
                                <option value="Sidon, Lebanon">Sidon, Lebanon</option>
                                <option value="Byblos, Lebanon">Byblos, Lebanon</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Height (cm)</span>
                            <input 
                                type="number" 
                                name="height" 
                                value={user.height} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Activity Level</span>
                            <select 
                                name="activityLevel" 
                                value={user.activityLevel} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            >
                                <option value="Sedentary">Sedentary</option>
                                <option value="Lightly Active">Lightly Active</option>
                                <option value="Active">Active</option>
                                <option value="Very Active">Very Active</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Water Intake (L/day)</span>
                            <input 
                                type="number" 
                                name="waterIntake" 
                                value={user.waterIntake} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Diet Preference</span>
                            <input 
                                type="text" 
                                name="dietPreference" 
                                value={user.dietPreference} 
                                onChange={handleChange} 
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </label>

                        <button 
                            type="submit" 
                            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClientManageProfile;
