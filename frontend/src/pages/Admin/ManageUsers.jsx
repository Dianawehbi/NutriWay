import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaUserEdit, FaSearch, FaUser, FaUserMd } from "react-icons/fa";
import NavBar from "../../components/Admin/AdminNavBar";
import axios from "axios";

const AdminManageUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("clients");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const [clientsRes, dietitiansRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/client"),       // Clients with user_id populated
                    axios.get("http://localhost:5000/api/dietitian/all") // Dietitians with user_id populated
                ]);

                const clients = (clientsRes.data.data || []).map(client => ({
                    id: client._id,
                    role: "Client",
                    name: client.user_id?.username || "N/A",
                    email: client.user_id?.email || "N/A",
                    status: "Active", // or from some client-specific field
                }));

                const dietitians = (dietitiansRes.data.dietitians || []).map(dietitian => ({
                    id: dietitian._id,
                    role: "Dietitian",
                    name: dietitian.user_id?.username || "N/A",
                    email: dietitian.user_id?.email || "N/A",
                    status: dietitian.status || "Pending",
                }));

                setUsers([...clients, ...dietitians]);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/delete/${id}`);
            
            if (response.data.success) {
                alert("User deleted successfully!");
                // Reload the page to reflect the changes
                window.location.reload();
            } else {
                alert("Failed to delete the user. Please try again.");
            }
        } catch (error) {
            console.log("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    };
    

    const filteredUsers = users.filter(user => {
        const matchesTab = activeTab === "clients" ? user.role === "Client" : user.role === "Dietitian";
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusBadge = (status) => {
        const statusClasses = {
            Active: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-blue-100 text-blue-800",
            rejected: "bg-red-100 text-red-800"

        };
        return (
            <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />

            <div className="max-w-6xl mx-auto p-4 md:p-6 mt-20">
                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow-sm text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">User Management</h1>
                    <p className="text-gray-600">Manage all clients and dietitians</p>
                </div>

                {/* Tabs and Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("clients")}
                            className={`flex items-center px-4 py-2 rounded-md ${activeTab === "clients" ? "bg-white shadow" : "text-gray-600"}`}
                        >
                            <FaUser className="mr-2" /> Clients
                        </button>
                        <button
                            onClick={() => setActiveTab("dietitians")}
                            className={`flex items-center px-4 py-2 rounded-md ${activeTab === "dietitians" ? "bg-white shadow" : "text-gray-600"}`}
                        >
                            <FaUserMd className="mr-2" /> Dietitians
                        </button>
                    </div>

                    <div className="relative w-full md:w-64">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">No {activeTab} found</p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mt-2 text-green-600 hover:underline"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="divide-y">
                                {filteredUsers.map(user => (
                                    <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gray-200 rounded-full p-3">
                                                    {user.role === "Client" ? (
                                                        <FaUser className="text-gray-600" />
                                                    ) : (
                                                        <FaUserMd className="text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                                    <p className="text-gray-600 text-sm">{user.email}</p>
                                                    <div className="mt-1">
                                                        {getStatusBadge(user?.status || "Active")}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => console.log("Edit", user.id)}
                                                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100"
                                                >
                                                    <FaUserEdit /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100"
                                                >
                                                    <FaTrashAlt /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManageUsers;