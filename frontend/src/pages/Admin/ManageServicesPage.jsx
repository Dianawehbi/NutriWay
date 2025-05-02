import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
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
                fetchServices(); // Refresh the list
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
                fetchServices(); // Refresh the list instead of reloading
            }
        } catch (err) {
            console.error("Error deleting service:", err);
            setError(err.response?.data?.error || "Failed to delete service");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link to="/services" className="text-gray-600 hover:text-green-700 transition">
                            <IoMdArrowRoundBack className="text-2xl" />
                        </Link>
                        <h1 className="text-xl font-semibold text-gray-800">Manage Services</h1>
                    </div>
                    <Link to="/UserProfile" className="text-gray-600 hover:text-green-700 transition">
                        <CgProfile className="text-2xl" />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto pt-24 pb-10 px-4">
                {/* Page Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-green-800">Your Services</h2>
                    <button
                        onClick={() => navigate("/add-service")}
                        className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition"
                    >
                        + Add New Service
                    </button>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    </div>
                ) : services.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <p className="text-gray-500">No services found</p>
                        <button
                            onClick={() => navigate("/add-service")}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            Create Your First Service
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={service._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {editingId === service._id ? (
                                    <div className="p-6">
                                        <h3 className="text-lg font-medium text-green-800 mb-4">Edit Service</h3>
                                        
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
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-green-800 mb-1">{service.name}</h3>
                                        <p className="text-gray-600 mb-4">
                                            Duration: {durationOptions.find(opt => opt.value === service.duration)?.label || `${service.duration} minutes`}
                                        </p>
                                        
                                        <div className="flex gap-3 pt-2">
                                            <button
                                                onClick={() => setEditingId(service._id)}
                                                className="px-4 py-2 text-green-700 hover:bg-green-50 rounded-lg transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteService(service._id)}
                                                className="px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg transition"
                                            >
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