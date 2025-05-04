import React from "react";
import { motion } from "framer-motion";
import { FaAppleAlt, FaLeaf, FaHeartbeat, FaClipboardList } from "react-icons/fa";

const DietitianOverview = () => {
  const tips = [
    {
      icon: <FaAppleAlt className="text-red-400" size={24} />,
      title: "Daily Nutrition Tip",
      content: "Start meals with protein & fiber to stabilize blood sugar levels.",
      emoji: "🥗"
    },
    {
      icon: <FaLeaf className="text-green-500" size={24} />,
      title: "Seasonal Highlight",
      content: "Summer superfood: Watermelon - hydrating & rich in lycopene!",
      emoji: "🍉"
    },
    {
      icon: <FaHeartbeat className="text-pink-500" size={24} />,
      title: "Health Fact",
      content: "30g of nuts daily reduces heart disease risk by 30%.",
      emoji: "💓"
    },
    {
      icon: <FaClipboardList className="text-blue-500" size={24} />,
      title: "Dietitian's Pick",
      content: "Try our Mediterranean-style meal plan this week!",
      emoji: "📋"
    }
  ];

  return (
    <div className="bg-gradient-to-b w-full from-[#f0f7ed] to-[#d0ebc6] py-12 px-4 rounded-3xl mx-4 ">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-3">
            Your Dietitian's Corner
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert insights to guide your nutrition journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-white shadow-md mr-4">
                  {tip.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {tip.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-3">
                {tip.content} {tip.emoji}
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-green-600 font-medium">
                No action needed • Just for you
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export default DietitianOverview;