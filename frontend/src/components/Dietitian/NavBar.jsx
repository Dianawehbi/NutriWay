import { useState } from "react";
import { Link } from "react-router-dom";
import logiImg from '../../assets/logo.png';
import { CgProfile } from "react-icons/cg";

export default function DietitianNavBar() {

    return (
        <div>
            <nav className=" fixed right-0 text-gray-700 left-0 top-0 z-50 bg-white flex justify-between items-center rounded-b-2xl p-3 font-serif ">
                <div className="flex flex-row items-center gap-2">
                    <div>
                        <img src={logiImg} alt="" className="w-15" />
                    </div>
                    <div>
                        <span className="text-2xl  font-bold">NutriWay</span>
                    </div>

                </div>
                <div className="space-x-3 md:space-x-6 text-gray-700">
                    <Link to="/DietitianDashboard" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Home
                    </Link>
                    <Link to="/dietitianappointment" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Appointment
                    </Link>
                    <Link to="/" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Meals
                    </Link>
                </div>

                <div className="flex flex-row  justify-between space-x-1 items-center ">
                    <Link to={'/DietitianProfile'} className="text-gray-700 m-1 text-2xl font-bold  hover:text-green-700 hover:border-b-2 transition-all duration-300 ">
                        <CgProfile />
                    </Link>
                </div>
            </nav>

        </div>
    );
}
