import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import MobileMenu from "./MobileMenu";
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/authContext.jsx';

export default function ClientNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth();

    const navLinks = [
        { path: "/clientdashboard", label: "Home" },
        { path: "/recipes", label: "Recipes" },
    ];

    const dropdownItems = [
        { path: "/AppointmentBookingPage", label: " Make Appointment" },
        { path: "/AppointmentHistory", label: "Appointments History " },
        { path: "/recipes", label: "Recipes" },
        { path: "/diet-plan", label: "Diet Plan" },
        { path: "/logout", label: "Logout" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="NutriWay Logo" className="h-10" />
                    <span className="text-2xl font-bold text-gray-800">NutriWay</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Main Navigation Links */}
                    <div className="flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-700 transition-all duration-300 py-1"
                            >
                                {link.label}
                            </Link>
                        ))}

                    </div>

                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-700 transition-all duration-300 py-1"
                        >
                            Pages <span className="ml-1">▼</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                {dropdownItems.map((item) =>
                                    item.label == "Logout" ? (
                                        <button
                                            key={item.path}
                                            onClick={() => {
                                                logout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            {item.label}
                                        </button>
                                    ) : (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                )}

                            </div>
                        )}
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/user-profile"
                        className="p-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
                        aria-label="User Profile"
                    >
                        <CgProfile className="text-2xl" />
                    </Link>

                    <button
                        className="md:hidden p-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <IoMdMenu className="text-2xl" />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <MobileMenu
                    onClose={() => setIsMobileMenuOpen(false)}
                    links={[...navLinks, ...dropdownItems.map(item => ({
                        path: item.path,
                        label: item.label
                    }))]}
                />
            )}
        </header>
    );
}