import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import DietitianServicesSection from "../../components/profile/dietitian_services_section";
import ProfileSection from "../../components/profile/profileSection";

const DietitianManageProfile = () => {
    const [location, setLocation] = useState([34.4143186, 35.8221472]); // Default location
    const [services, setServices] = useState([
        { name: "Consultation", price: "50" },
        { name: "Meal Plan", price: "30" },
    ]);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
            console.log('Account Deleted');
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
        setServices([...services, { name: "", price: "" }]);
    };

    return (
        <div className="bg-gray-100">
            <NavBar />
            <div className="min-h-screen flex flex-col items-center p-6 mt-20 font-serif">
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <div>
                        <label className="block text-lg font-medium">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-3 border rounded-lg" rows="3" required></textarea>
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                    </div>

                    <div>
                        <label className="block text-lg font-medium">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" required />
                    </div>
                </div>

                {/* Services Section - Editable */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Manage Services</h2>
                    {services.map((service, index) => (
                        <div key={index} className="flex gap-4 mb-4 items-center">
                            <input
                                type="text"
                                value={service.name}
                                onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-1/2"
                            />
                            <input
                                type="number"
                                value={service.price}
                                onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-1/4"
                            />
                            <button onClick={() => handleRemoveService(index)} className="p-2 bg-red-500 text-white rounded-md">Remove</button>
                        </div>
                    ))}
                    <button onClick={handleAddService} className="mt-4 p-2 bg-blue-500 text-white rounded-md">Add Service</button>
                </div>

                {/* Location Section */}
                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Update Clinic Location</h2>
                    <MapContainer center={location} zoom={13} className="w-full h-64 rounded-xl">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>

                <div className="bg-white shadow-xl rounded-3xl p-8 w-11/12 mt-8">
                    <button type="submit" className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">Save Changes</button>
                </div>

            </div>
        </div>
    );
};

export default DietitianManageProfile;