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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const durationOptions = [
    "15 minutes",
    "30 minutes",
    "45 minutes",
    "1 hour",
    "1 hour 30 minutes",
    "2 hours",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Service Submitted:", service);
    try {
      const response = await axios.post('http://localhost:5000/api/services/add', service);

      if (response.data.success) {
        setError("");
        navigate("/services");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        setError(error.message || "Something went wrong");
      }
    }
    setService({
      name: "",
      duration: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-10 flex flex-col items-center">
      {/* NavBar */}
      <div className="w-full bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
          <Link to="/services" className="text-2xl"><IoMdArrowRoundBack /></Link>
          <span className="text-xl">Add Service</span>
        </div>
        <Link to="/UserProfile" className="text-2xl text-green-700"><CgProfile /></Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-3xl p-8 mt-20">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Create a New Service</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Service Name</label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Duration</label>
              <select
                name="duration"
                value={service.duration}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Duration</option>
                {durationOptions.map((duration) => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <div className="text-red-600 pb-3">{error}</div>
            <button type="submit"
              className="w-full py-3 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition">
              Submit Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
