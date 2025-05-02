import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';

const AddService = () => {
  const [service, setService] = useState({
    name: "",
    duration: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: name === "duration" ? parseInt(value) || "" : value });
  };

  const durationOptions = [
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "45 minutes", value: 45 },
    { label: "1 hour", value: 60 },
    { label: "1.5 hours", value: 90 },
    { label: "2 hours", value: 120 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const serviceData = {
        ...service,
        duration: Number(service.duration)
      };
      
      const response = await axios.post('http://localhost:5000/api/services/add', serviceData);

      if (response.data.success) {
        navigate("/services", { state: { successMessage: "Service added successfully!" } });
      }
    } catch (error) {
      setError(error.response?.data?.error || "Failed to add service. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-xl font-semibold text-gray-800">Add New Service</h1>
          </div>
          <Link to="/UserProfile" className="text-gray-600 hover:text-green-700 transition">
            <CgProfile className="text-2xl" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto pt-24 pb-10 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-green-50 px-6 py-4 border-b border-green-100">
            <h2 className="text-lg font-medium text-green-800">Service Details</h2>
            <p className="text-sm text-green-600">Fill in the details for your new service</p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={service.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={service.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                  required
                >
                  <option value="">Select duration</option>
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                  isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                } transition`}
              >
                {isSubmitting ? 'Adding Service...' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddService;