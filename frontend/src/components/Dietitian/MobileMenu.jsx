import { Link } from "react-router-dom";
import { 
  MdHome,
  MdOutlineShoppingCart,
  MdOutlineClose
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";

export default function MobileMenu({ onClose }) {
  const menuItems = [
    { path: "/", label: "Home", icon: <MdHome className="text-xl" /> },
    { path: "/profile", label: "Profile", icon: <AiOutlineUser className="text-xl" /> },
    { path: "/diet-plan", label: "Diet Plan", icon: <LuClipboardCheck className="text-xl" /> },
    { path: "/appointment", label: "Appointment", icon: <IoCalendarNumberOutline className="text-xl" /> },
    { path: "/recipes", label: "Recipes", icon: <GiMeal className="text-xl" /> },
    { path: "/about", label: "About Us", icon: <IoMdInformationCircleOutline className="text-xl" /> },
    { path: "/logout", label: "Logout", icon: <CiLogin className="text-xl" /> },
  ];

  return (
    <div className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl rounded-r-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-green-50">
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
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="flex items-center p-3 my-1 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer/Cart */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          to="/cart"
          onClick={onClose}
          className="flex items-center p-3 rounded-lg hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
        >
          <MdOutlineShoppingCart className="text-xl mr-3" />
          <span className="font-medium">Shopping Cart</span>
        </Link>
      </div>
    </div>
  );
}