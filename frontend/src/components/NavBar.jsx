import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import MobileMenu from "./MobileMenu";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (

        <div>
            <nav className=" fixed right-0 text-gray-700 left-0 top-0 z-50 bg-white flex justify-between items-center rounded-b-2xl p-3 font-serif ">
                <div className="flex flex-row items-center gap-2">
                    {/* <div>
                        <img src={logiImg} alt="" className="w-15" />
                    </div> */}
                    <div>
                        <span className="text-2xl  font-bold">NutriWay</span>
                    </div>

                </div>
                <div className="hidden md:flex space-x-6 text-gray-700">
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Home
                    </Link>
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        About Us
                    </Link>
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Services
                    </Link>

                    {/* Simple Dropdown Menu */}
                    <div >
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="hover:text-green-700 hover:border-b-2 hover:border-green-700 transition-all duration-300"
                        >
                            Pages ▼
                        </button>
                        {dropdownOpen && (
                            <div className="absolute  mt-2 w-32 bg-white shadow-md rounded-md text-gray-700">
                                <Link to="../Appointment" className="block px-4 text-gray-700-4 py-2 hover:bg-gray-200">Appointment</Link>
                                <Link to="../Shop" className="block px-4 text-gray-700 py-2 hover:bg-gray-200">Shop</Link>
                                <Link to="../Receipt" className="block px-4 text-gray-700 py-2 hover:bg-gray-200">Meals</Link>
                                <Link to="../DietPlan" className="block px-4 text-gray-700 py-2 hover:bg-gray-200">Diet Plan</Link>
                                <Link to="../Login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Login</Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-row  justify-between space-x-1 items-center ">
                   
                    <Link to={'/UserProfile'} className="text-gray-700 m-1 text-2xl font-bold  hover:text-green-700 hover:border-b-2 transition-all duration-300 ">
                        <CgProfile />
                    </Link>
                    <Link to={'/Card'} className="text-gray-700 m-1 text-2xl font-bold  hover:text-green-700 hover:border-b-2 transition-all duration-300">
                        <IoBagOutline />
                    </Link>
                    <IoMdMenu className="md:hidden  text-gray-700 m-1 text-2xl font-bold  hover:text-green-700 hover:border-b-2 transition-all duration-300" onClick={() => setIsOpen(!isOpen)} />
                </div>
            </nav>
            {/* Mobile Menu */}
            {isOpen && (
                <MobileMenu />
            )}
        </div>
    );
}
