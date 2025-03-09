import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid } from "recharts";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Custom hook to detect if element is in view
const useInView = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the element is visible
    );

    const element = document.getElementById("body-composition-dashboard");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return inView;
};

const barData = [
  { name: "Fat", value: 80 },
  { name: "Muscle", value: 50 },
  { name: "Water", value: 60 },
];

const bmiData = [
  { month: "Jan", bmi: 23 },
  { month: "Feb", bmi: 22.5 },
  { month: "Mar", bmi: 22 },
  { month: "Apr", bmi: 21.8 },
];

// New Data: Current Weight vs Goal Weight
const weightData = [
  { name: "Current Weight", value: 75 }, // Example current weight
  { name: "Goal Weight", value: 65 }, // Example goal weight
];

export default function NutritionDashboard() {
  const [date, setDate] = useState(new Date());
  const inView = useInView(); // State to track visibility of the section

  return (
    <motion.div
      id="body-composition-dashboard"
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-auto w-full px-6 py-12  "
    >
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl text-[#234403]">Body Composition Tracker</h1>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-[#D0DBC2] p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-black mb-4">BMI Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bmiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bmi" stroke="#EC5666" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nutrient Breakdown - Bar Chart */}
        <div className="bg-[#D0DBC2] shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-center mb-4">Nutrient Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#86D72F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* New Section: Current Weight vs Goal Weight */}
        <div className="bg-[#D0DBC2] shadow-lg rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-black mb-4">Weight Progress</h2>
          <div className="flex justify-center gap-10 text-lg font-medium">
            <div className="bg-white px-6 py-4 w-5/12 rounded-lg shadow-md">
              <p className="text-gray-600">Current Weight</p>
              <p className="text-2xl font-bold text-[#FF7F50]">75 kg</p>
            </div>
            <div className="bg-white px-6 py-4 w-5/12 rounded-lg shadow-md">
              <p className="text-gray-600">Goal Weight</p>
              <p className="text-2xl font-bold text-[#4CAF50]">65 kg</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Link
            to="/UserProfile"
            className=" hover:text-gray-600 hover:border-[#234403] text-[#234403]  border-b-1 font-bold py-3 px-6  transition-all duration-300"
          >
            View More
          </Link>
        </div>

      </div>

    </motion.div>
  );
}
