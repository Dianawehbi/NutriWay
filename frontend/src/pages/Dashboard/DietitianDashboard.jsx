import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DietitianNavBar from "../../components/Dietitian/NavBar";
import DietitianHeader from "../../components/Dietitian/Header";
import MealsManager from "../../components/MealsManager";
import ManageAppt from "../../components/Dietitian/ManageAppoitment";
import Footer from "../../components/Footer";
import Dietitian from "../../components/Client/DietianSection";
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
            <DietitianNavBar />
 
            <DietitianHeader />
            {/* Dashboard Content */}


            <div>her i should check the ststus of dietitian  if pendig then
                display a new page , or other thing
            </div>
            <div className="p-6 space-y-6 mt-20">
                <ManageAppt />
                <MealsManager />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-700">Go to My Profile</h3>
                        <Link to="/DietitianProfile" className="text-green-500 hover:underline">Go to My Profile</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-gray-700">Manage Profile</h3>
                        <Link to="/DietitianManageProfile/123" className="text-green-500 hover:underline">Manage Profile</Link>
                    </div>
                </div>
            </div>
            <Dietitian />
            <Footer />
        </div>
    );
};

export default DietitianDashboard;
