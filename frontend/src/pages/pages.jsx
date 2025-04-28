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
                                <Link to="/Login" className="text-red-600 hover:underline">Login</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianRegister" className="text-blue-600 hover:underline">Registration</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/AdminDashboard" className="text-green-600 hover:underline">Dashboard</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/SignUp" className="text-red-600 hover:underline">Register</Link>
                            </td>

                            <td className="py-2 px-6 border-b">
                                <Link to="/dietitianprofile" className="text-blue-600 hover:underline">Profile</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/ManageUsers" className="text-green-600 hover:underline">Manage Users</Link>
                            </td>
                        </tr>
                        <tr>

                            <td className="py-2 px-6 border-b">
                                <Link to="/userinformation" className="text-red-600 hover:underline">Add Your Information</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/dietitianappointment" className="text-green-600 hover:underline">Appointments</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/OrderManagementPage" className="text-black-600 hover:underline">OrderManagementPage</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Card" className="text-black-600 hover:underline">Shopping Cart</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianAddClientInfoPage" className="text-green-600 hover:underline">Add Client Information</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/SalesPage" className="text-black-600 hover:underline">Sales Page</Link>
                            </td>
                        </tr>

                      
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Home" className="text-green-600 hover:underline">Dashboard</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianManageProfile" className="text-blue-600 hover:underline">Manage Profile</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/ManageProduct" className="text-black-600 hover:underline">Add product</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/MealsPage" className="text-green-600 hover:underline">Meals</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/add-recipes" className="text-red-600 hover:underline">Add Recipe 'error: click twice to get access</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/add-recipes" className="text-red-600 hover:underline">Add Recipe</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/clientprofile" className="text-blue-600 hover:underline">Profile</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/recipes" className="text-red-600 hover:underline">Recipes</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/recipes" className="text-red-600 hover:underline">Recipes</Link>
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Appointment" className="text-green-600 hover:underline">Appointments</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/edit-recipes/2" className="text-red-600 hover:underline">Edit Recipe</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/edit-recipes/2" className="text-red-600 hover:underline">Edit Recipe</Link>
                            </td>
                        </tr>
                        <tr>

                            <td className="py-2 px-6 border-b">
                                <Link to="/recipe/2" className="text-green-600 hover:underline">Recipes Details</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/recipe/2" className="text-red-600 hover:underline">Recipes Details</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/recipe/2" className="text-red-600 hover:underline">Recipes Details</Link>
                            </td>
                        </tr>
                        <tr>
                        <td className="py-2 px-6 border-b">
                                <Link to="/DietPlan" className="text-green-600 hover:underline">Diet Plan</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/DietitianDashboard" className="text-green-600 hover:underline">Dashboard</Link>
                            </td>
                            <td className="py-2 px-6 border-b">
                                <Link to="/AppointmentAdminPage" className="text-green-600 hover:underline">Manage Appoitments</Link>
                            </td>
                        </tr>
                        
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/Shop" className="text-black-500 hover:underline">Shopping Page</Link>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/clientmanageprofile" className="text-blue-600 hover:underline">Manage Profile</Link>
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 px-6 border-b">
                                <Link to="/CheckoutPage" className="text-black-600 hover:underline">CheckOut</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="h-10">
                </div>
                <div>maybe i will remove the e commerce age : this will lead to delete 5 pages </div>
                <div class="text-green-500 font-semibold text-lg mb-2">
                    🟢 <span class="">you shoould start working on this </span>
                </div>
                <div class="text-blue-500 font-semibold text-lg mb-2">
                    🔵 <span class="">Small Update have done</span>
                </div>
                <div class="text-yellow-500 font-semibold text-lg mb-2">
                    🟡 <span class="">under building</span>
                </div>
                <div class="text-red-500 font-semibold text-lg mb-2">
                    🔴 <span class="">Fnish</span>
                </div>
            </div>
        </div>
    );
}
