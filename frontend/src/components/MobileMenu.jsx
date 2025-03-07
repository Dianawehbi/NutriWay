import { useState } from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";   // Material Design icons
import { AiOutlineUser } from "react-icons/ai"; // Ant Design icons
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { GiMeal } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";

export default function MobileMenu() {
    return (
        <div className=" md:hidden fixed z-50 top-0 left-0 font-serif  bg-gray-100 p-4 shadow-md  w-50 min-h-screen  rounded-br-2xl">
            <div className="text-xl flex items-center">
                <span className="text-green-700 text-2xl font-bold">NutriWay</span>
                <button onClick={() => { setIsOpen(false) }}><AiOutlineUser /></button>
            </div>
            <Link to="/" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                <MdHome className="m-1" /> Home</div></Link>
            <Link to="../pages/Profile" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300 ">
                <AiOutlineUser className="m-1" /> Profile</div></Link>
            <Link to="../pages/Shop" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300 ">
                <MdOutlineShoppingCart className="m-1" /> Shop</div></Link>
            <Link to="../pages/DietPlan" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                <LuClipboardCheck className="m-1" /> Diet Plan</div></Link>
            <Link to="../pages/Appointment" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300 ">
                <IoCalendarNumberOutline className="m-1" /> Appointment</div></Link>
            <Link to="../pages/Receipt" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                <GiMeal className="m-1" /> Receipt</div></Link>
            <Link to="../pages/Login" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                <CiLogin className="m-1" /> Log in</div></Link>
            <Link to="/" className="block py-2"> <div className="flex flex-row items-center hover:text-green-700 hover:border-b-2 hover:border-green-700 hover:shadow-md hover:shadow-green-300 transition-all duration-300">
                <IoMdInformationCircleOutline className="m-1" /> About Us</div></Link>
        </div>
    )
}