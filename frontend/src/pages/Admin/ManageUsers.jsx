import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa"; // Icons for delete and edit actions
import NavBar from "../../components/Admin/AdminNavBar.jsx"; // Assuming you have a NavBar component

const AdminManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("clients"); // 'clients' or 'dietitians'

    // Fetch users (both dietitians and clients) data - Dummy data for now
    useEffect(() => {
        const fetchUsers = async () => {
            // Replace this with real data fetching logic (API call)
            const fetchedUsers = [
                { id: 1, name: "John Doe", role: "Client", email: "john@example.com", status: "Active" },
                { id: 2, name: "Dr. Sarah Lee", role: "Dietitian", email: "sarah@example.com", status: "Pending" },
                { id: 3, name: "Jane Smith", role: "Client", email: "jane@example.com", status: "Active" },
                { id: 4, name: "Dr. Mike Ross", role: "Dietitian", email: "mike@example.com", status: "Approved" }
            ];

            setUsers(fetchedUsers);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    // Handle delete action (for now, just log to console)
    const handleDelete = (id) => {
        // Here you can make a DELETE request to remove the user
        console.log(`Deleted user with id: ${id}`);
        // Update state after deletion (for example purposes, remove from local state)
        setUsers(users.filter(user => user.id !== id));
    };

    // Handle accept action for dietitians
    const handleAcceptDietitian = (id) => {
        console.log(`Accepted dietitian with id: ${id}`);
        setUsers(users.map(user => user.id === id ? { ...user, status: "Approved" } : user));
    };

    // Separate users by role
    const clients = users.filter(user => user.role === "Client");
    const dietitians = users.filter(user => user.role === "Dietitian");
    const pendingDietitians = dietitians.filter(user => user.status === "Pending");

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="p-6 space-y-8 mt-20">
                {/* User Management Header */}
                <div className="bg-white p-6 rounded-xl shadow-xl text-center">
                    <h2 className="text-3xl font-semibold text-gray-700">User Management</h2>
                    <p className="text-gray-500">Manage all users (Clients and Dietitians)</p>
                </div>

                {/* Pending Dietitians Section */}
                {pendingDietitians.length > 0 && (
                    <div className="bg-yellow-100 p-6 rounded-xl shadow-xl mb-8">
                        <h3 className="text-2xl font-semibold text-gray-700">Dietitians Awaiting Approval</h3>
                        <div className="space-y-4">
                            {pendingDietitians.map((user) => (
                                <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-gray-700">{user.name}</p>
                                        <p className="text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleAcceptDietitian(user.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tab Buttons */}
                <div className="flex justify-center gap-6 mb-8">
                    <button
                        onClick={() => setActiveTab("clients")}
                        className={`px-6 py-2 rounded-md ${activeTab === "clients" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Clients
                    </button>
                    <button
                        onClick={() => setActiveTab("dietitians")}
                        className={`px-6 py-2 rounded-md ${activeTab === "dietitians" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                        Dietitians
                    </button>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <p className="text-xl font-semibold text-gray-500">Loading users...</p>
                    </div>
                ) : (
                    <>
                        {/* Clients Section */}
                        {activeTab === "clients" && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Clients</h3>
                                {clients.length === 0 ? (
                                    <div className="text-center text-gray-500">
                                        <p>No clients available to manage.</p>
                                    </div>
                                ) : (
                                    clients.map((user) => (
                                        <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-4">
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-700 text-lg">{user.name}</p>
                                                <p className="text-gray-500">{user.status}</p>
                                                <p className="text-gray-400">{user.email}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                                >
                                                    <FaTrashAlt className="inline mr-2" />
                                                    Delete Account
                                                </button>
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                                    <FaUserEdit className="inline mr-2" />
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Dietitians Section */}
                        {activeTab === "dietitians" && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Dietitians</h3>
                                {dietitians.length === 0 ? (
                                    <div className="text-center text-gray-500">
                                        <p>No dietitians available to manage.</p>
                                    </div>
                                ) : (
                                    dietitians.map((user) => (
                                        <div key={user.id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center mb-4">
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-700 text-lg">{user.name}</p>
                                                <p className="text-gray-500">{user.status}</p>
                                                <p className="text-gray-400">{user.email}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                                >
                                                    <FaTrashAlt className="inline mr-2" />
                                                    Delete Account
                                                </button>
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                                    <FaUserEdit className="inline mr-2" />
                                                    Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminManageUsers;
