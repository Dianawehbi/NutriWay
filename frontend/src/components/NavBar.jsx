import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai"; // Ant Design icons
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "./MobileMenu";


export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchClick, setsearchClick] = useState(false);

    return (

        <div>
            <nav className=" fixed right-0  left-0 top-0 z-50 bg-white flex justify-between items-center rounded-b-2xl p-3 font-serif ">
                <div className="text-2xl ">
                    <span className="text-green-700 font-bold">NutriWay</span>
                </div>
                <div className="hidden md:flex space-x-6 text-gray-700">
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                        Home
                    </Link>
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                        About Us
                    </Link>
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                        Services
                    </Link>

                    {/* Simple Dropdown Menu */}
                    <div >
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300"
                        >
                            Pages ▼
                        </button>
                        {dropdownOpen && (
                            <div className="absolute  mt-2 w-32 bg-white shadow-md rounded-md">
                                <Link to="../pages/Appointment" className="block px-4 py-2 hover:bg-green-200">Appointment</Link>
                                <Link to="../pages/Shop" className="block px-4 py-2 hover:bg-green-200">Shop</Link>
                                <Link to="../pages/Receipt" className="block px-4 py-2 hover:bg-green-200">Receipt</Link>
                                <Link to="../pages/DietPlan" className="block px-4 py-2 hover:bg-green-200">Diet Plan</Link>
                                <Link to="../pages/Login" className="block px-4 py-2 hover:bg-green-200">Login</Link>

                            </div>
                        )}
                    </div>

                </div>

                <div className="flex flex-row  justify-between space-x-1 items-center ">
                    {
                        searchClick && (
                            <input type="search" placeholder="search..." className="font-sans bg-gray-100 rounded-2xl p-1 border-green-700  hover:p-2 " />
                        )
                    }
                    <FaSearch className="text-green-700 cursor-pointer" onClick={() => { setsearchClick(!searchClick) }} />
                    <Link to="/" className="block py-2"> <div className=" text-green-700 font-bold  hover:text-green-700 hover:border-b-2 transition-all duration-300 ">
                        <AiOutlineUser className="m-1" /> </div>
                    </Link>
                    <IoMdMenu className="md:hidden size-5 text-green-700" onClick={() => setIsOpen(!isOpen)} />
                </div>
            </nav>
            {/* Mobile Menu */}
            {isOpen && (
                <MobileMenu />
            )}
        </div>
    );
}
