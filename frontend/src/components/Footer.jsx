import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#D0DBC2]  text-gray-700 py-10 px-6 mt-20 font-serif w-full"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About NutriWay</h2>
            <p className="text-sm">
              NutriWay is dedicated to helping you live a healthier life by offering tailored diet plans, expert consultations, and the best healthy snacks.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="">Home</Link>
              </li>
              <li>
                <Link to="/pages/Appointment" className="">Make Appointment</Link>
              </li>
              <li>
                <Link to="/pages/Contact" className="">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <p className="text-sm">
              Email: <a href="mailto:support@nutriway.com" className="">support@nutriway.com</a>
            </p>
            <p className="text-sm">
              Phone: <span className="">+1 234 567 890</span>
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="">Instagram</a>
            </div>
          </div>      
        </div>
        {/* Bottom Section with Copyright */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-sm ">
          <p>&copy; 2025 NutriWay. All rights reserved.</p>
        </div>
      </div>
    </motion.div>
  );
}
