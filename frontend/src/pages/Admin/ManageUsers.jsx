import React, { useState, useEffect } from "react";
import { FaUserEdit, FaTrash, FaUserPlus, FaEye, FaCheck, FaTimes } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching user data
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: "John Doe", role: "Client", status: "active", pending: false },
        { id: 2, name: "Jane Smith", role: "Dietitian", status: "active", pending: false },
        { id: 3, name: "Michael Brown", role: "Client", status: "inactive", pending: true },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Delete user handler
  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Update user name handler
  const handleUpdateName = (userId) => {
    const newName = prompt("Enter the new name:");
    if (newName) {
      setUsers(users.map(user => user.id === userId ? { ...user, name: newName } : user));
    }
  };

  // Update user role handler
  const handleUpdateRole = (userId, newRole) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
  };

  // Activate/Deactivate user handler
  const handleToggleStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    ));
  };

  // Approve pending registration handler
  const handleApproveUser = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, pending: false } : user));
  };

  // Loading state
  if (loading) {
    return <div className="text-center text-xl">Loading users...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-8">Admin Dashboard - Manage Users</h1>

        {/* Pending User Approvals */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Pending User Registrations</h2>
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            {users.filter(user => user.pending).map(user => (
              <div key={user.id} className="flex justify-between items-center mb-3">
                <span className="text-lg">{user.name} ({user.role})</span>
                <button onClick={() => handleApproveUser(user.id)} className="text-green-600 hover:underline">
                  <FaCheck /> Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* User List Table */}
        <table className="min-w-full border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 border-b text-left">Name</th>
              <th className="py-3 px-6 border-b text-left">Role</th>
              <th className="py-3 px-6 border-b text-left">Status</th>
              <th className="py-3 px-6 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-6 border-b">{user.name}</td>
                  <td className="py-2 px-6 border-b">{user.role}</td>
                  <td className="py-2 px-6 border-b">{user.status}</td>
                  <td className="py-2 px-6 border-b flex space-x-2">
                    <button
                      onClick={() => handleUpdateName(user.id)}
                      className="text-yellow-600 hover:underline"
                    >
                      <FaUserEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash size={20} />
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    {user.pending && (
                      <button
                        onClick={() => handleApproveUser(user.id)}
                        className="text-green-600 hover:underline"
                      >
                        <FaCheck /> Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleUpdateRole(user.id, user.role === "Client" ? "Dietitian" : "Client")}
                      className="text-purple-600 hover:underline"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-6 border-b text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
