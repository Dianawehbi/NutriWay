import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import MobileMenu from "./MobileMenu.jsx";
import logo from '../../assets/logo.png'
import { useAuth } from '../../context/authContext.jsx';

export default function AdminNavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout } = useAuth();
    const id = JSON.parse(localStorage.getItem('user'))._id
    const navigate = useNavigate()

    const navLinks = [
        { path: "/AdminDashboard", label: "Home" },
        { path: "/manage-appointments", label: "Appointment" },
        { path: "/profite", label: "Profite" },
        { path: "/logout", label: "Logout" },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
            <nav className="container mx-auto flex items-center justify-between p-5">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="NutriWay Logo" className="h-10" />
                    <span className="text-2xl font-bold text-gray-800">NutriWay</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Main Navigation Links */}
                    <div className="flex space-x-6">
                        {navLinks.map((link) => (
                            link.label == "Logout" ? (
                                <button
                                    key={link.path}
                                    onClick={handleLogout}
                                    className="text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-700 transition-all duration-300 py-1"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-gray-700 hover:text-green-700 hover:border-b-2 hover:border-green-700 transition-all duration-300 py-1"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}

                    </div>

                </div>

                {/* User Actions */}
                <div className="flex items-center space-x-4">
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
                />
            )}
        </header>
    );
}