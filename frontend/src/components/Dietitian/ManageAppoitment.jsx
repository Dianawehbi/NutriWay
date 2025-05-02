import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function DashboardAppointmentsSection() {
    // Sample data - replace with real data from your backend
    const appointmentStats = {
        upcoming: 3,
        completed: 5,
        cancelled: 1
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <FaCalendarAlt className="mr-3 text-blue-500" />
                    Appointment Management
                </h2>
                <Link 
                    to="/manage-appointments" 
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    Manage All <FaArrowRight className="ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Upcoming Appointments Card */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-medium text-blue-800 mb-1">Upcoming</h3>
                    <p className="text-2xl font-bold text-blue-600">{appointmentStats.upcoming}</p>
                    <p className="text-xs text-blue-500 mt-1">Appointments scheduled</p>
                </div>

                {/* Completed Appointments Card */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="text-sm font-medium text-green-800 mb-1">Completed</h3>
                    <p className="text-2xl font-bold text-green-600">{appointmentStats.completed}</p>
                    <p className="text-xs text-green-500 mt-1">Recent sessions</p>
                </div>

                {/* Cancelled Appointments Card */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <h3 className="text-sm font-medium text-red-800 mb-1">Cancelled</h3>
                    <p className="text-2xl font-bold text-red-600">{appointmentStats.cancelled}</p>
                    <p className="text-xs text-red-500 mt-1">This month</p>
                </div>
            </div>
        </div>
    );
}