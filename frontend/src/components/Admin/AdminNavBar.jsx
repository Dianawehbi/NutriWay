import { useState } from "react";
import { Link } from "react-router-dom";
import logiImg from '../../assets/logo.png';

export default function AdminNavBar() {

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
                <div className="space-x-2  md:space-x-6 text-gray-700">
                    <Link to="/AdminDashboard" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Home
                    </Link>
                    <Link to="/AppointmentAdminPage" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Appointment
                    </Link>
                    <Link to="/ManageMeals" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Meals
                    </Link>
                    <Link to="/ManageProduct" className="hover:text-green-700 hover:border-b-2 hover:border-green-700  transition-all duration-300">
                        Products
                    </Link>
                </div>

                <div className="flex flex-row  justify-between space-x-1 items-center ">
                    
                </div>
            </nav>

        </div>
    );
}
