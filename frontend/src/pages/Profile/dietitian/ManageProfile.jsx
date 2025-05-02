import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DietitianNavBar from "../../../components/Dietitian/NavBar";
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
    const [dietitian, setDietitian] = useState(null);
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
    });

    useEffect(() => {
        const fetchDietitian = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dietitian', { params: { id } });
                if (res.data.success) {
                    const dietitianData = res.data.dietitian;
                    const {
                        username, email, phone, specialization,
                        experience, certification, education,
                        profile_img, clinic_address, languages
                    } = dietitianData;

                    setFormData({
                        username, email, phone, specialization,
                        experience, certification, education,
                        profile_img,
                        clinic_address,
                        languages: languages || []
                    });

                    if (clinic_address?.lat && clinic_address?.lng) {
                        setLocation([clinic_address.lat, clinic_address.lng]);
                    }

                    setDietitian(dietitianData);
                    setError('');
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
        // her for service i will send 2 think , serviice id , and dietitiian id 
        // also i will send the information 
        try {
            const response = await axios.put(
                `http://localhost:5000/api/dietitian/update/${id}`,
                {
                    ...formData,
                    clinic_address: {
                        ...formData.clinic_address,
                        lat: location[0],
                        lng: location[1]
                    }
                }
            );
            if (response.data.success) {
                setError('');
                alert('Profile updated successfully!');
                navigate(`/dietitianprofile/${id}`);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError("Failed to update profile");
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

    console.log(services)

    return (
        <div className="bg-gray-50 min-h-screen">
            <DietitianNavBar />
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
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DietitianManageProfile;