import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import React, { useState } from "react";
import { FaAppleAlt, FaApple, FaCarrot, FaDrumstickBite, FaLeaf, FaCheese, FaGlassWhiskey } from "react-icons/fa";

const moreFoodData = [
  // Fruits
  { food: "Apple", calories: 52, unit: "per 100g", category: "Fruits", icon: <FaAppleAlt size={30} /> },
  { food: "Banana", calories: 89, unit: "per 100g", category: "Fruits", icon: <FaApple size={30} /> },
  { food: "Orange", calories: 47, unit: "per 100g", category: "Fruits", icon: <FaCarrot size={30} /> },
  { food: "Strawberry", calories: 32, unit: "per 100g", category: "Fruits", icon: <FaAppleAlt size={30} /> },

  // Meat
  { food: "Chicken Breast", calories: 165, unit: "per 100g", category: "Meat", icon: <FaDrumstickBite size={30} /> },
  { food: "Beef Steak", calories: 250, unit: "per 100g", category: "Meat", icon: <FaDrumstickBite size={30} /> },
  { food: "Salmon", calories: 208, unit: "per 100g", category: "Meat", icon: <FaDrumstickBite size={30} /> },
  { food: "Egg", calories: 155, unit: "per 100g", category: "Meat", icon: <FaDrumstickBite size={30} /> },

  // Vegetables
  { food: "Broccoli", calories: 55, unit: "per 100g", category: "Vegetables", icon: <FaLeaf size={30} /> },
  { food: "Carrot", calories: 41, unit: "per 100g", category: "Vegetables", icon: <FaCarrot size={30} /> },
  { food: "Spinach", calories: 23, unit: "per 100g", category: "Vegetables", icon: <FaLeaf size={30} /> },
  { food: "Cucumber", calories: 16, unit: "per 100g", category: "Vegetables", icon: <FaLeaf size={30} /> },

  // Dairy
  { food: "Milk", calories: 42, unit: "per 100ml", category: "Dairy", icon: <FaCheese size={30} /> },
  { food: "Cheese", calories: 402, unit: "per 100g", category: "Dairy", icon: <FaCheese size={30} /> },
  { food: "Yogurt", calories: 59, unit: "per 100g", category: "Dairy", icon: <FaCheese size={30} /> },

  // Juice
  { food: "Orange Juice", calories: 45, unit: "per 100ml", category: "Juice", icon: <FaGlassWhiskey size={30} /> },
  { food: "Apple Juice", calories: 46, unit: "per 100ml", category: "Juice", icon: <FaGlassWhiskey size={30} /> },
  { food: "Carrot Juice", calories: 41, unit: "per 100ml", category: "Juice", icon: <FaGlassWhiskey size={30} /> },
];

// Extract unique categories
const categories = [...new Set(moreFoodData.map(item => item.category))];

const MoreFood = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter food items based on search query and selected category
  const filteredFoodData = moreFoodData.filter((item) => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      item.food.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-serif">
      {/* Fixed Header */}
      <div className="fixed bg-white top-0 right-0 left-0 flex justify-between p-4 shadow-md z-20">
        <div className="flex items-center gap-3">
          <Link to="/Home">
            <IoMdArrowRoundBack className="text-2xl" />
          </Link>
          <span className="text-xl font-semibold">Calories</span>
        </div>
        <Link to="/UserProfile">
          <CgProfile className="text-2xl" />
        </Link>
      </div>

      {/* Page Content */}
      <div className="mt-20">
        <h1 className="text-4xl font-extrabold text-[#234403] mb-8 text-center">More Food Options</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Categories Row */}
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5  pb-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl text-white font-semibold transition-all ${
                selectedCategory === category ? "bg-green-600" : "bg-green-400 hover:bg-green-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display Foods Below the Selected Category */}
        {selectedCategory && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoodData.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-r from-[#c6d3c6] to-[#5bff3a] p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-900 text-2xl font-semibold">{item.food}</span>
                  <span className="text-white">{item.icon}</span>
                </div>
                <div className="text-lg">
                  {item.calories} kcal {item.unit}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreFood;
