// CaloriesOverview.js
import React from "react";
import { FaAppleAlt, FaApple, FaCarrot, FaDrumstickBite, FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";

const foodData = [
  { food: "Apple", calories: 52, unit: "per 100g", icon: <FaAppleAlt size={30} /> },
  { food: "Banana", calories: 89, unit: "per 100g", icon: <FaApple size={30} /> },
  { food: "Orange", calories: 47, unit: "per 100g", icon: <FaCarrot size={30} /> },
  { food: "Chicken Breast", calories: 165, unit: "per 100g", icon: <FaDrumstickBite size={30} /> },
  { food: "Broccoli", calories: 55, unit: "per 100g", icon: <FaLeaf size={30} /> },
];

const CaloriesOverview = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-[#234403] mb-12">Calories Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodData.map((item, index) => (
          <div key={index} className="bg-gradient-to-r from-[#c6d3c6] to-[#5bff3a] p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-900 text-2xl font-semibold">{item.food}</div>
              <div className="text-white">{item.icon}</div>
            </div>
            <div className=" text-lg">
              {item.calories} kcal {item.unit}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-12 text-center">
        <Link to={'/caloriesoverview'} className="text-gray-500 hover:text-green-700 font-semibold text-xl">
          Access more food

        </Link>
      </div> */}
    </div>
  );
};

export default CaloriesOverview;
