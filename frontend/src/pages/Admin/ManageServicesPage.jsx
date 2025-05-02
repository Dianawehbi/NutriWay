import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { IoMdAdd, IoMdCreate, IoMdTrash, IoMdTime } from "react-icons/io";

import AdminNavBar from "../../components/Admin/AdminNavBar.jsx";
const ManageServicesPage = () => {
    const [services, setServices] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const durationOptions = [
        { label: "15 minutes", value: 15 },
        { label: "30 minutes", value: 30 },
        { label: "45 minutes", value: 45 },
        { label: "1 hour", value: 60 },
        { label: "1.5 hours", value: 90 },
        { label: "2 hours", value: 120 },
    ];

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/services");
            if (res.data.success) {
                setServices(res.data.services);
                setError(null);
            }
        } catch (err) {
            console.error("Failed to fetch services:", err);
            setError("Failed to fetch services. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;
        const updated = [...services];
        updated[index][name] = name === "duration" ? parseInt(value) || "" : value;
        setServices(updated);
    };

    const handleUpdateService = async (id, updatedService) => {
        try {
            const serviceData = {
                ...updatedService,
                duration: Number(updatedService.duration)
            };

            const response = await axios.put(
                `http://localhost:5000/api/services/update/${id}`,
                serviceData
            );

            if (response.data.success) {
                setEditingId(null);
                fetchServices();
            }
        } catch (err) {
            console.error("Error updating service:", err);
            setError(err.response?.data?.error || "Failed to update service");
        }
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;

        try {
            const res = await axios.post(`http://localhost:5000/api/services/delete/${id}`);
            if (res.data.success) {
                fetchServices();
            }
        } catch (err) {
            console.error("Error deleting service:", err);
            setError(err.response?.data?.error || "Failed to delete service");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavBar />

            {/* Main Content */}
            <main className="max-w-6xl mx-auto pt-24 pb-10 px-4">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Service Management</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            {services.length} {services.length === 1 ? 'service' : 'services'} available
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/add-service")}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition"
                    >
                        <IoMdAdd className="text-lg" />
                        Add New Service
                    </button>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                ) : services.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                            <IoMdTime className="text-2xl text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No services found</h3>
                        <p className="text-gray-500 mb-6">Get started by creating your first service</p>
                        <button
                            onClick={() => navigate("/add-service")}
                            className="flex items-center gap-2 mx-auto bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition"
                        >
                            <IoMdAdd className="text-lg" />
                            Create Service
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={service._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                {editingId === service._id ? (
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <IoMdCreate className="text-green-600" />
                                            Edit Service
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={service.name}
                                                    onChange={(e) => handleServiceChange(e, index)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                                <select
                                                    name="duration"
                                                    value={service.duration}
                                                    onChange={(e) => handleServiceChange(e, index)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                                    required
                                                >
                                                    {durationOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 mt-6">
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleUpdateService(service._id, service)}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                                            <IoMdTime className="text-gray-400" />
                                            <span>
                                                {durationOptions.find(opt => opt.value === service.duration)?.label || `${service.duration} minutes`}
                                            </span>
                                        </div>

                                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => setEditingId(service._id)}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-green-700 hover:bg-green-50 rounded-lg transition"
                                            >
                                                <IoMdCreate className="text-base" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteService(service._id)}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50 rounded-lg transition"
                                            >
                                                <IoMdTrash className="text-base" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageServicesPage;