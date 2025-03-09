import React from "react";
import { Link } from "react-router-dom";
import { FaUserCog, FaUsers, FaClipboardList, FaCogs, FaChartLine } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Users Section */}
          <div className="bg-gradient-to-r from-red-500 to-red-300 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <div className="flex items-center mb-4">
              <FaUsers size={30} className="mr-4" />
              <h3 className="text-2xl font-semibold">Manage Users</h3>
            </div>
            <p>View and manage clients and dietitians in the system.</p>
            <Link to="/admin/manage-users" className="text-white font-semibold mt-4 inline-block hover:underline">
              Manage Users
            </Link>
          </div>

          {/* Pending Dietitians Section */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <div className="flex items-center mb-4">
              <FaClipboardList size={30} className="mr-4" />
              <h3 className="text-2xl font-semibold">Pending Dietitians</h3>
            </div>
            <p>Review dietitians waiting for registration approval.</p>
            <Link to="/admin/pending-dietitians" className="text-white font-semibold mt-4 inline-block hover:underline">
              Review Pending
            </Link>
          </div>

          {/* System Settings Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-300 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <div className="flex items-center mb-4">
              <FaCogs size={30} className="mr-4" />
              <h3 className="text-2xl font-semibold">System Settings</h3>
            </div>
            <p>Configure global settings for the platform.</p>
            <Link to="/admin/settings" className="text-white font-semibold mt-4 inline-block hover:underline">
              Configure Settings
            </Link>
          </div>

          {/* Analytics Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <div className="flex items-center mb-4">
              <FaChartLine size={30} className="mr-4" />
              <h3 className="text-2xl font-semibold">Analytics & Reports</h3>
            </div>
            <p>Analyze user activity and generate reports.</p>
            <Link to="/admin/reports" className="text-white font-semibold mt-4 inline-block hover:underline">
              View Reports
            </Link>
          </div>
        </div>

        {/* Quick Access Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h4 className="text-xl font-semibold text-red-700 mb-4">Manage Clients</h4>
            <Link to="/admin/manage-users" className="text-red-600 hover:underline">View All Clients</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h4 className="text-xl font-semibold text-yellow-700 mb-4">Pending Dietitians</h4>
            <Link to="/admin/pending-dietitians" className="text-yellow-600 hover:underline">Review Pending Registrations</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h4 className="text-xl font-semibold text-green-700 mb-4">System Settings</h4>
            <Link to="/admin/settings" className="text-green-600 hover:underline">Configure Platform</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
