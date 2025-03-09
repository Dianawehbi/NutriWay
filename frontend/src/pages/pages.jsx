import { Link } from "react-router-dom";

export default function Pages() {
    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 shadow-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-3 px-6 border-b text-left">Client</th>
                            <th className="py-3 px-6 border-b text-left">Dietitian</th>
                            <th className="py-3 px-6 border-b text-left">Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Home" className="text-green-600 hover:underline">Dashboard</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianDashboard" className="text-yellow-600 hover:underline">Dashboard</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/AdminDashboard" className="text-yellow-600 hover:underline">Dashboard</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/UserProfile" className="text-green-600 hover:underline">Profile</Link>
                            </td>
                            
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianProfile" className="text-green-600 hover:underline">Profile</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/ManageUsers" className="text-yellow-600 hover:underline">Manage Users</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Shop" className="text-green-500 hover:underline">Shopping Page</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/dietitianappointment" className="text-green-600 hover:underline">Appointments</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/pages" className="text-red-600 hover:underline">Manage Settings</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Card" className="text-green-600 hover:underline">Shopping Cart</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianAddClientInfoPage" className="text-green-600 hover:underline">Add Client Information</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/MealsPage" className="text-green-600 hover:underline">Meals</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianAddRecipes" className="text-green-600 hover:underline">Add Receipt</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/MealDetail" className="text-green-600 hover:underline">Meal Details</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianRegister" className="text-green-600 hover:underline">Registration</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Login" className="text-green-600 hover:underline">Login</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianRegister" className="text-red-600 hover:underline">Manage Profile</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/SignUp" className="text-green-600 hover:underline">Register</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/caloriesoverview" className="text-green-600 hover:underline">Calories Overview</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Appointment" className="text-green-600 hover:underline">Appointments</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianProfile" className="text-green-600 hover:underline">Dietitian Profile</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietPlan" className="text-green-600 hover:underline">Diet Plan</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/ProfileManagementPage" className="text-green-600 hover:underline">Manage Profile</Link>
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/userinformation" className="text-green-600 hover:underline">Add Your Information</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/CheckoutPage" className="text-green-600 hover:underline">CheckOut</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="h-10">
                </div>
                <div class="text-green-500 font-semibold text-lg mb-2">
                    🟢 <span class="">Done</span>
                </div>
                <div class="text-blue-500 font-semibold text-lg mb-2">
                    🔵 <span class="">Small Update in Progress</span>
                </div>
                <div class="text-yellow-500 font-semibold text-lg mb-2">
                    🟡 <span class="">Design update</span>
                </div>
                <div class="text-red-500 font-semibold text-lg mb-2">
                    🔴 <span class="">Waiting to Be Built</span>
                </div>



            </div>
        </div>
    );
}
