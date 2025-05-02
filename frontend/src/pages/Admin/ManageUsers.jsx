import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaUserEdit, FaSearch, FaUser, FaUserMd } from "react-icons/fa";
import NavBar from "../../components/Admin/AdminNavBar";

const AdminManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("clients");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Simulate API call
        const fetchUsers = async () => {
            setTimeout(() => {
                setUsers([
                    { id: 1, name: "John Doe", role: "Client", email: "john@example.com", status: "Active" },
                    { id: 2, name: "Dr. Sarah Lee", role: "Dietitian", email: "sarah@example.com", status: "Pending" },
                    { id: 3, name: "Jane Smith", role: "Client", email: "jane@example.com", status: "Active" },
                    { id: 4, name: "Dr. Mike Ross", role: "Dietitian", email: "mike@example.com", status: "Approved" }
                ]);
                setLoading(false);
            }, 800);
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== id));
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
            Pending: "bg-yellow-100 text-yellow-800",
            Approved: "bg-blue-100 text-blue-800"
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
                                                        {getStatusBadge(user.status)}
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