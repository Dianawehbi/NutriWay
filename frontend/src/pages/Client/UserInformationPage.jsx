import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const UserInformationPage = () => {
  const [userInfo, setUserInfo] = useState({
    weight: "",
    height: "",
    activity: "",
    waterIntake: "",
    dietType: "",
    age: "",
    gender: "",
    bodyFat: "",
    goal: "",
    lifestyleNote: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send the data to the server)
    console.log("User Information Submitted: ", userInfo);
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
      </div >
      <div className="max-w-3xl w-11/12  my-15 p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
        <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6 animate-fadeIn">Enter Your Information</h2>

        <form onSubmit={handleSubmit} className="space-y-6 mx-auto bg-white p-6">
          <div className="flex flex-col">
            <label htmlFor="weight" className="text-xl font-medium text-gray-700 mb-2">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userInfo.weight}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your weight"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="height" className="text-xl font-medium text-gray-700 mb-2">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={userInfo.height}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your height"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="activity" className="text-xl font-medium text-gray-700 mb-2">Activity Level</label>
            <select
              id="activity"
              name="activity"
              value={userInfo.activity}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (light exercise or sports 1-3 days/week)</option>
              <option value="moderate">Moderately active (moderate exercise or sports 3-5 days/week)</option>
              <option value="active">Very active (hard exercise or sports 6-7 days a week)</option>
              <option value="superactive">Super active (very hard exercise or physical job)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="waterIntake" className="text-xl font-medium text-gray-700 mb-2">Water Intake (liters)</label>
            <input
              type="number"
              id="waterIntake"
              name="waterIntake"
              value={userInfo.waterIntake}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your daily water intake in liters"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dietType" className="text-xl font-medium text-gray-700 mb-2">Diet Type</label>
            <select
              id="dietType"
              name="dietType"
              value={userInfo.dietType}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your diet type</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
              <option value="omnivore">Omnivore</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="age" className="text-xl font-medium text-gray-700 mb-2">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your age"
            />
          </div>

          {/* New Fields */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-xl font-medium text-gray-700 mb-2">Gender</label>
            <select
              id="gender"
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="bodyFat" className="text-xl font-medium text-gray-700 mb-2">Body Fat Percentage (%)</label>
            <input
              type="number"
              id="bodyFat"
              name="bodyFat"
              value={userInfo.bodyFat}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your body fat percentage"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="goal" className="text-xl font-medium text-gray-700 mb-2">Fitness Goal</label>
            <select
              id="goal"
              name="goal"
              value={userInfo.goal}
              onChange={handleChange}
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select your fitness goal</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintain">Maintain Weight</option>
              <option value="improve_fitness">Improve Fitness</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="lifestyleNote" className="text-xl font-medium text-gray-700 mb-2">Lifestyle Note (Optional)</label>
            <textarea
              id="lifestyleNote"
              name="lifestyleNote"
              value={userInfo.lifestyleNote}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Add any preferences or lifestyle notes"
              rows="4"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
            >
              Submit Information
            </button>

          </div>
        </form>
      </div>
    </div>

  );
};

export default UserInformationPage;
