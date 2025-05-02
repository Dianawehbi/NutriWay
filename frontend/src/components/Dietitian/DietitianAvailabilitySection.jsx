import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaClock, FaArrowRight } from 'react-icons/fa';

export default function DietitianAvailabilitySection() {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FaCalendarCheck className="mr-3 text-purple-500" />
                    My Availability
                </h2>
                <Link 
                    to="/dietitian-availability" 
                    className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    Manage Availability <FaArrowRight className="ml-2" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                        <FaClock className="mr-2" /> Schedule Overview
                    </h3>
                    <p className="text-gray-700">You can define your available days and working hours.</p>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Appointments</h3>
                    <p className="text-gray-700">Easily manage your upcoming slots and plan your weekly availability.</p>
                </div>
            </div>
        </div>
    );
}
