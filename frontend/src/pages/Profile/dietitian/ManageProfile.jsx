import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../../components/NavBar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FiTrash2, FiMapPin, FiUpload } from "react-icons/fi";
import { FaUserEdit, FaRegMoneyBillAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineDescription, MdEmail, MdPhone } from "react-icons/md";
import { handleImageUpload } from "../../../utils/imageUtils";

const DietitianManageProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [availableServices, setAvailableServices] = useState([]);
    const [location, setLocation] = useState([34.4143186, 35.8221472]);
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profile_img: '',
        phone: '',
        specialization: '',
        experience: '',
        certification: '',
        education: '',
        clinic_address: '',
        languages: [],
        services: [],
    });

    // Fetch dietitian data and available services
    useEffect(() => {
        const fetchDietitian = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dietitian', {
                    params: { id },
                });
                if (res.data.success) {
                    const {
                        username, email, phone, specialization,
                        experience, certification, education,
                        profile_img, clinic_address, languages, services
                    } = res.data.dietitian;

                    setFormData({
                        username, email, phone, specialization,
                        experience, certification, education,
                        profile_img, clinic_address,
                        languages: languages || []
                    });

                    setServices(services || []);

                    if (clinic_address?.coordinates) {
                        setLocation([clinic_address.coordinates.lat, clinic_address.coordinates.lng]);
                    }
                    console.log(formData)
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load dietitian profile");
            }
        };

        const fetchAvailableServices = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/services", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (res.data.success) {
                    setAvailableServices(res.data.services || []);
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
                setError("Failed to fetch services. Please reload the page!");
            }
        };

        fetchDietitian();
        fetchAvailableServices();
    }, [id]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const resizedImage = await handleImageUpload([file]);
            if (resizedImage) {
                setFormData((prev) => ({ ...prev, profile_img: resizedImage }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/dietitian/update/${id}`,
                formData,
            );
            console.log(response)
            if (response.data.success) {
                setError('');
                alert('Profile updated successfully!');
                navigate('/dietitianprofile/' + id);
            }
        } catch (error) {
            console.error(error);
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Failed to update profile");
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            try {
                const response = await axios.delete(
                    `http://localhost:5000/api/dietitian/delete/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.success) {
                    localStorage.removeItem('token');
                    location.removeItem("user");
                    navigate("/login");
                }
            } catch (error) {
                console.error(error);
                setError("Failed to delete account");
            }
        }
    };

    const handleLocationChange = (latlng) => {
        setLocation([latlng.lat, latlng.lng]);
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                handleLocationChange(e.latlng);
            },
        });
        return <Marker position={location} />;
    }

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const handleRemoveService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const handleAddService = () => {
        // Filter out services that are already added
        const unaddedServices = availableServices.filter(
            service => !services.some(s => s.serviceId === service._id)
        );

        if (unaddedServices.length > 0) {
            setServices([
                ...services,
                {
                    serviceId: unaddedServices[0]._id,
                    name: unaddedServices[0].name,
                    price: "",
                    type: "clinic" // Default type
                }
            ]);
        } else {
            alert("You've added all available services.");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />
            <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
                    <FaUserEdit className="mr-2" /> Manage Your Profile
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Profile Image</h2>
                        <div className="flex flex-col items-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 mb-4">
                                {formData.profile_img ? (
                                    <img
                                        src={formData.profile_img}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">No Image</span>
                                    </div>
                                )}
                            </div>
                            <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors">
                                <FiUpload className="mr-2" />
                                Upload New Image
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                            <p className="mt-2 text-sm text-gray-500">Recommended size: 300x300 pixels</p>
                        </div>
                    </div>

                    {/* Basic Information Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Basic Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            {/* Add other fields similarly */}
                        </div>
                    </div>

                    {/* Services Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                            <FaRegMoneyBillAlt className="mr-2" /> Your Services
                        </h2>
                        <div className="space-y-4">
                            {services.map((service, index) => {
                                const serviceInfo = availableServices.find(s => s._id === service.serviceId) || {};
                                return (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-50 p-4 rounded-lg">
                                        <div className="md:col-span-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                            <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
                                                {serviceInfo.name || "Service not found"}
                                            </div>
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={service.price}
                                                onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                placeholder="50"
                                                min="0"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <select
                                                value={service.type}
                                                onChange={(e) => handleServiceChange(index, "type", e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            >
                                                <option value="clinic">In-Clinic</option>
                                                <option value="online">Online</option>
                                                <option value="both">Both</option>
                                            </select>
                                        </div>
                                        <div className="md:col-span-2 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveService(index)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>);
                            })}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Add New Service</label>
                                <select
                                    onChange={(e) => {
                                        const selectedService = availableServices.find(s => s._id === e.target.value);
                                        if (selectedService) {
                                            setServices([
                                                ...services,
                                                {
                                                    serviceId: selectedService._id,
                                                    name: selectedService.name,
                                                    price: "",
                                                    type: "clinic"
                                                }
                                            ]);
                                        }
                                    }}
                                    className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg mb-2"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select a service to add</option>
                                    {availableServices
                                        .filter(service => !services.some(s => s.serviceId === service._id))
                                        .map((service) => (
                                            <option key={service._id} value={service._id}>
                                                {service.name}
                                            </option>
                                        ))}
                                </select>
                                {availableServices.filter(service => !services.some(s => s.serviceId === service._id)).length === 0 && (
                                    <p className="text-sm text-gray-500 mt-1">All available services have been added</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                            <FaMapMarkerAlt className="mr-2" /> Clinic Location
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">Click on the map to update your clinic location</p>
                        <div className="h-80 rounded-xl overflow-hidden border border-gray-200">
                            <MapContainer center={location} zoom={13} className="w-full h-full">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker />
                            </MapContainer>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 flex items-center">
                            <FiMapPin className="mr-2" />
                            Current location: {location[0].toFixed(6)}, {location[1].toFixed(6)}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm flex-1"
                        >
                            Save All Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="px-6 py-3 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors flex-1"
                        >
                            Delete Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DietitianManageProfile;