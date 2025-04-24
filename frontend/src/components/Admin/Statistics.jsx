import { Link } from "react-router-dom"
export default function Statistic() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Summary Boxes */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700">Dietitians</h3>
                <p className="text-3xl font-bold text-green-700">2</p>
                <Link to="/ManageUsers" className="text-blue-500">Manage</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700">Clients</h3>
                <p className="text-3xl font-bold text-green-700">198</p>
                <Link to="/ManageUsers" className="text-blue-500">View All</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-700">Sales</h3>
                <p className="text-3xl font-bold text-green-700">$ 3708</p>
                <Link to="/SalesPage" className="text-blue-500">View Reports</Link>
            </div>
        </div>
    )
}