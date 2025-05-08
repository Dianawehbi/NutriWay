import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

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
      { threshold: 0.5 }
    );

    const element = document.getElementById("body-composition-dashboard");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return inView;
};

export default function NutritionDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bodyData, setBodyData] = useState(null);
  const [bmiData, setBmiData] = useState([]);
  const id = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchBodyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/bodycomposition/${id}`);

        if (response.data.success) {
          setBodyData(response.data.bodyComposition);

          // Transform data for charts
          const latestData = response.data.bodyComposition[response.data.bodyComposition.length - 1];

          // BMI Trend Data (last 4 entries)
          const bmiTrend = response.data.bodyComposition
            .slice(-4)
            .map((entry, index) => ({
              month: `Month ${index + 1}`,
              bmi: entry.bmi
            }));
          setBmiData(bmiTrend);

      
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load body composition data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBodyData();
  }, [id]);
  console.log("its body data ")
  console.log(bodyData)
  if (loading) {
    return (
      <div className="h-auto w-full px-6 py-12 flex justify-center items-center">
        <FiLoader className="animate-spin text-4xl text-[#234403]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-auto w-full px-6 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-6xl mx-auto">
          {error}
        </div>
      </div>
    );
  }

  if (!bodyData || bodyData.length === 0) {
    return (
      <div className="h-auto w-full px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-6xl mx-auto text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Body Composition Data Found</h3>
          <p className="text-gray-600 mb-6">
            You haven't recorded any body composition measurements yet.
          </p>
        </div>
      </div>
    );
  }

  // Prepare nutrient breakdown data from latest measurement
  const latestMeasurement = bodyData[bodyData.length - 1];
  const nutrientData = [
    { name: "Fat", value: latestMeasurement?.fat || 0 },
    { name: "Muscle", value: latestMeasurement?.muscle || 0 },
    { name: "Water", value: latestMeasurement?.water || 0 },
  ];

  return (
    <div
      id="body-composition-dashboard"
      className="h-auto w-full px-6 py-12"
    >
      <div className="flex justify-between mb-6 max-w-6xl mx-auto">
        <h1 className="font-bold text-2xl text-[#234403]">Body Composition Tracker</h1>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* BMI Trend Chart */}
        <div className="bg-[#D0DBC2] p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-black mb-4">BMI Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bmiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bmi"
                stroke="#EC5666"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nutrient Breakdown - Bar Chart */}
        <div className="bg-[#D0DBC2] p-6 rounded-xl shadow-lg">
          <h4 className="text-lg font-semibold text-black mb-4">Body Composition</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={nutrientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#86D72F"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

     
      </div>

    </div>
  );
}