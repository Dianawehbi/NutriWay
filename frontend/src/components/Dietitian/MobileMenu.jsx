import { Link } from "react-router-dom";
import { MdHome, MdOutlineClose } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../../context/authContext.jsx";

export default function MobileMenu({ onClose }) {
  const id = JSON.parse(localStorage.getItem('user'))._id
  
  const menuItems = [
    { path: "/DietitianDashboard", label: "Home", icon: <MdHome className="text-xl" /> },
    { path: `/dietitianprofile/${id}`, label: "Profile", icon: <AiOutlineUser className="text-xl" /> },
    { path: "/manage-appointments", label: "Appointment", icon: <IoCalendarNumberOutline className="text-xl" /> },
    { path: "/recipes", label: "Recipes", icon: <GiMeal className="text-xl" /> },
    { path: "/about", label: "About Us", icon: <IoMdInformationCircleOutline className="text-xl" /> },
    { path: "#", label: "Logout", icon: <CiLogin className="text-xl" />, action: true },
  ];
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  }

  return (
    <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl rounded-r-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-green-50">
        <span className="text-2xl font-bold text-green-700">NutriWay</span>
        <button
          onClick={onClose}
          className="p-1 text-gray-500 hover:text-green-700 transition-colors"
          aria-label="Close menu"
        >
          <MdOutlineClose className="text-2xl" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-2">
        {menuItems.map((item) => (
          item.action ? (
            <button
              key={item.path}
              onClick={handleLogout}
              className="flex items-center w-full p-3 my-1 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200 text-left"
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center p-3 my-1 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        ))}
      </nav>
    </div>
  );
}