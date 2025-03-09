import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DietitianDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [clients, setClients] = useState([]);
    const [dietPlans, setDietPlans] = useState([]);
    const [recipes, setRecipes] = useState([]);

    // Dummy Data (replace with real data fetching later)
    useEffect(() => {
        setAppointments([
            { id: 1, date: "2025-03-12", clientName: "John Doe" },
            { id: 2, date: "2025-03-15", clientName: "Jane Smith" },
        ]);
        setClients([
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Smith", email: "jane@example.com" },
        ]);
        setDietPlans([
            { id: 1, planName: "Weight Loss Plan", status: "Active" },
            { id: 2, planName: "Keto Diet", status: "Completed" },
        ]);
        setRecipes([
            { id: 1, name: "Avocado Salad", servings: 2 },
            { id: 2, name: "Chicken Soup", servings: 4 },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-green-700 text-white p-4 flex justify-between">
                <div className="text-xl font-semibold">NutriWay Dashboard</div>
                <div>
                    <Link to="/" className="text-white px-4">Home</Link>
                    <Link to="/profile" className="text-white px-4">Profile</Link>
                    <Link to="/logout" className="text-white px-4">Logout</Link>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Summary Boxes */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Appointments</h3>
                        <p className="text-3xl font-bold text-green-700">{appointments.length}</p>
                        <Link to="/appointments" className="text-blue-500">View All</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Clients</h3>
                        <p className="text-3xl font-bold text-green-700">{clients.length}</p>
                        <Link to="/clients" className="text-blue-500">View All</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-700">Diet Plans</h3>
                        <p className="text-3xl font-bold text-green-700">{dietPlans.filter(plan => plan.status === "Active").length}</p>
                        <Link to="/diet-plans" className="text-blue-500">View All</Link>
                    </div>
                </div>

                {/* Task Overview */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
                    {appointments.map(appointment => (
                        <div key={appointment.id} className="mb-4">
                            <p className="font-medium text-gray-700">Date: {appointment.date}</p>
                            <p className="text-gray-500">Client: {appointment.clientName}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-700">Add New Service</h3>
                        <Link to="/add-service" className="text-green-500 hover:underline">Add Service</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-700">Manage Recipes</h3>
                        <Link to="/recipes" className="text-green-500 hover:underline">Manage Recipes</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DietitianDashboard;
