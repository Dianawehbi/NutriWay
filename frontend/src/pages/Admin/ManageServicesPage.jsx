import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ServiceForm from "../../components/ServiceForm.jsx";

const ManageServicesPage = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
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
      await axios.put(`http://localhost:5000/api/services/${id}`, updatedService);
      setEditingId(null);
    } catch (err) {
      console.error("Error updating service:", err);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-green-600 text-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">NutriWay</div>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/")}
              className="hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/add-service")}
              className="hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Add Service
            </button>
            <button
              onClick={() => navigate("/user-profile")}
              className="hover:bg-green-500 px-4 py-2 rounded-md"
            >
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Manage Services</h1>
          <button
            onClick={() => navigate("/add-service")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            + Add New Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={service._id} className="bg-white p-6 rounded-xl shadow-sm">
              {editingId === service._id ? (
                <>
                  <ServiceForm
                    service={service}
                    onChange={(e) => handleServiceChange(e, index)}
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => handleUpdateService(service._id, service)}
                      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
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
                  <h3 className="text-xl font-semibold text-green-700 mb-1">{service.name}</h3>
                  <p className="text-gray-600 mb-4">Duration: {service.duration}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingId(service._id)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700"
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
  );
};

export default ManageServicesPage;
