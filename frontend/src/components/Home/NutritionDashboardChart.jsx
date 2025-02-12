import { inView, motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";

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

// Sample Data (you can replace it with API data)
const pieData = [
  { name: "Proteins", value: 30 },
  { name: "Carbs", value: 50 },
  { name: "Fats", value: 20 },
];
const barData = [
  { name: "Protein", value: 80 },
  { name: "Carbs", value: 120 },
  { name: "Fats", value: 60 },
];
const lineData = [
  { date: "2025-01-01", protein: 50, carbs: 80, fats: 40 },
  { date: "2025-01-02", protein: 55, carbs: 85, fats: 45 },
  { date: "2025-01-03", protein: 60, carbs: 90, fats: 50 },
  { date: "2025-01-04", protein: 65, carbs: 95, fats: 55 },
];

const COLORS = ["#34D399", "#FBBF24", "#EF4444"]; // Green, Yellow, Red

export default function NutritionDashboard() {
  const [date, setDate] = useState(new Date());
  const inView = useInView(); // State to track visibility of the section

  return (
    
    <motion.div
      id="body-composition-dashboard"
      animate={{ opacity: inView?  1 : 0 , y: inView ? 0 : -50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" h-auto w-full px-6 py-12 m-0 font-serif"
    >
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">Nutrition Dashboard</h1>
      </div>

      {/* Date Picker */}
      <div className="mb-6">
        <h3>Select a Date: </h3>
        <DatePicker selected={date} onChange={(d) => setDate(d)} />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: inView? 1 : 0, x: inView ? 0 : -50 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white shadow-lg rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold text-center mb-4">Nutrient Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity:inView ? 1 : 0 , x:inView ? 0 : -50}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white shadow-lg rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold text-center mb-4">Nutrient Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50  }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white shadow-lg rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold text-center mb-4">Nutrition Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="protein" stroke="#34D399" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="carbs" stroke="#FBBF24" />
              <Line type="monotone" dataKey="fats" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
              
  );
}
