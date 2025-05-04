import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import myImage from "../../assets/logo.png";
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

    const element = document.getElementById("header-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return inView;
};

export default function Header() {
  const inView = useInView(); // State to track visibility of the section

  return (
    <motion.div
      id="header-section"
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : -50,
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white h-auto w-full px-6 py-12 m-0 rounded-b-[500px] font-serif"
    >
      <NavBar />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-6xl mx-auto mt-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : -50,
          }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-center lg:text-left max-w-xl m-2"
        >
          <h1 className="text-4xl font-bold text-[#40740e] mb-5">
            Welcome to NutriWay
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Your journey to a healthier lifestyle starts here. Discover expert
            diet plans, book consultations, and find the best healthy snacks
            tailored for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-[#AEC78B] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform"
          >
            <Link to={`/Appointment`}>Make Appointment</Link>
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: inView ? 1 : 0,
            scale: inView ? 1 : 0.8,
          }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex justify-center mb-2 pb-5"
        >
          <img
            src={myImage}
            alt="Healthy Lifestyle"
            className="h-100 max-w-md lg:max-w-lg  rounded-bl-[80px] rounded-tr-[80px] rounded-br-[20px] rounded-tl-[20px]"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
