import { Link } from "react-router-dom"
export default function Actions() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-gray-700">Manage Order</h3>
                <Link to="/OrderManagementPage" className="text-green-500 hover:underline">Manage</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-gray-700">Manage Products</h3>
                <Link to="/ManageProduct" className="text-green-500 hover:underline">View Products</Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold text-gray-700">Manage Appoitments</h3>
                <Link to="/AppointmentAdminPage" className="text-green-500 hover:underline">Manage</Link>
            </div>
        </div>
    )
}