import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServiceForm from "../../components/ServiceForm.jsx";

const ManageServicesPage = () => {
    const [services, setServices] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchServices = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/services");
            if (res.data.success) {
                setServices(res.data.services);
                setError(null);
            }
        } catch (err) {
            console.error("Failed to fetch services:", err);
            setError("Failed to fetch services");
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleServiceChange = (e, index) => {
        const updated = [...services];
        updated[index][e.target.name] = e.target.value;
        setServices(updated);
    };

    const handleUpdateService = async (id, updatedService) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/services/update/${id}`, updatedService);
            if (response.data.success) {
                setEditingId(null);
            }
        } catch (err) {
            console.error("Error updating service:", err);
            alert("Error During Editing" + err)
            setEditingId(null);
        }
    };

    const handleDeleteService = async (id) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/services/delete/${id}`);
            if (res.data.success) {
                window.location.reload();
            }
        } catch (err) {
            console.error("Error deleting service:", err);
        }
    };

    return (
        <>
            {error ? (
                <div className="min-h-screen bg-[#f1f1f1] flex justify-center items-center">
                    <div className="text-red-600 font-semibold">{error}</div>
                </div>
            ) : (
                <div className="min-h-screen bg-[#f1f1f1]">
                    <nav className="bg-[#40740e] text-white shadow-md p-4 rounded-b-[30px]">
                        <div className="flex justify-between items-center">
                            <div className="text-2xl font-semibold">NutriWay</div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => navigate("/")}
                                    className="hover:bg-[#6fbf49] px-4 py-2 rounded-md"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => navigate("/add-service")}
                                    className="hover:bg-[#6fbf49] px-4 py-2 rounded-md"
                                >
                                    Add Service
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="px-8 py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-3xl font-bold text-[#40740e]">Manage Services</h1>
                            <button
                                onClick={() => navigate("/add-service")}
                                className="bg-[#40740e] text-white px-4 py-2 rounded-md hover:bg-[#6fbf49]"
                            >
                                + Add New Service
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map((service, index) => (
                                <div key={service._id} className="bg-white p-6 rounded-xl shadow-md">
                                    {editingId === service._id ? (
                                        <>
                                            <ServiceForm
                                                service={service}
                                                onChange={(e) => handleServiceChange(e, index)}
                                            />
                                            <div className="flex justify-end gap-3 mt-4">
                                                <button
                                                    onClick={() => handleUpdateService(service._id, service)}
                                                    className="bg-[#40740e] text-white px-5 py-2 rounded-md hover:bg-[#6fbf49]"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={() => setEditingId(null)}
                                                    className="bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-semibold text-[#40740e] mb-1">{service.name}</h3>
                                            <p className="text-gray-600 mb-4">Duration: {service.duration}</p>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setEditingId(service._id)}
                                                    className="bg-gray-400 text-white px-4 py-1 rounded-md hover:bg-gray-700"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteService(service._id)}
                                                    className="bg-[#e74c3c] text-white px-4 py-1 rounded-md hover:bg-[#c0392b]"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageServicesPage;
