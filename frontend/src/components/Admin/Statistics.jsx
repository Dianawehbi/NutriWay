import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaUsers,
  FaDollarSign,
  FaArrowRight,
  FaChartLine
} from "react-icons/fa";

export default function Statistic() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-5">
      {/* First Stat Card */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <FaUserMd className="text-green-600" /> <FaUsers className="text-blue-600 ml-1" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Users</h3>
            </div>

            <div className="mb-3">
              <div className="mb-2">
                <Link
                  to="/manage-users"
                  className="inline-flex items-center text-xs font-medium text-green-600 hover:text-green-700 group transition-colors"
                >
                  Manage
                  <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Stat Card */}
      <div className="bg-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-white shadow-xs">
                <FaDollarSign className="text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-700">Sales</h3>
            </div>

            <div className="mb-3">
              <p className="text-2xl font-semibold text-gray-800">$3,708</p>
              <p className="text-sm text-gray-500 mt-1">
                ↑ <FaChartLine className="inline" /> 8.5% growth
              </p>
            </div>
          </div>
        </div>
        
        <Link
          to="/Profite"
          className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 group transition-colors"
        >
          View Reports
          <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}