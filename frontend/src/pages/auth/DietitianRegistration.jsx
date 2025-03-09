import { useState } from "react";
import Select from "react-select";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion"; // For animation

const LocationPicker = ({ setLocation }) => {
    useMapEvents({
        click(e) {
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
};

const DietitianRegistration = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        certification: "",
        clientsWorkedWith: "",
        education: "",
        specialization: "",
        experience: "",
        languages: [],
        services: [],
        location: { lat: 37.7749, lng: -122.4194 },
    });
    const [serviceCount, setServiceCount] = useState(1);

    const languageOptions = [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
        { value: "German", label: "German" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...formData.services];
        updatedServices[index] = { ...updatedServices[index], [field]: value };
        setFormData({ ...formData, services: updatedServices });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-green-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap opacity-35 ">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 1 }}
                        animate={{ y: [10, -10, 10], opacity: 1 }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        className="absolute text-6xl"
                        style={{
                            top: `${Math.random() * 85 + 5}%`,
                            left: `${Math.random() * 85 + 5}%`,
                            padding: "30px",
                        }}
                    >
                        🥑 NutriWay
                    </motion.div>
                ))}
            </div>
            <div className="lg:w-full w-xsl max-w-3xl my-15 mx-2 p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
                <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6 animate-fadeIn">Dietitian Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4 animate-fadeInUp">
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                    <input type="text" name="certification" placeholder="Certification" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                    <input type="number" name="clientsWorkedWith" placeholder="Clients Worked With" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                    <input type="text" name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                    <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                    <input type="text" name="experience" placeholder="Experience" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />

                    <label className="block">Languages Spoken:</label>
                    <Select isMulti options={languageOptions} onChange={(selected) => setFormData({ ...formData, languages: selected })} className="w-full" />

                    <label className="block">How many services do you provide?</label>
                    <input type="number" min="1" value={serviceCount} onChange={(e) => setServiceCount(parseInt(e.target.value))} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" />

                    {[...Array(serviceCount)].map((_, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-4 shadow-md">
                            <input type="text" placeholder="Service Name" onChange={(e) => handleServiceChange(index, "name", e.target.value)} className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                            <input type="number" placeholder="Price ($)" onChange={(e) => handleServiceChange(index, "price", e.target.value)} className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required />
                            <select onChange={(e) => handleServiceChange(index, "type", e.target.value)} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out hover:shadow-md" required>
                                <option value="">Select Service Type</option>
                                <option value="Online">Online</option>
                                <option value="In-Clinic">In-Clinic</option>
                            </select>
                        </div>
                    ))}

                    <label className="block">Select Your Location:</label>
                    <MapContainer center={formData.location} zoom={15} style={{ height: "300px", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationPicker setLocation={(location) => setFormData({ ...formData, location })} />
                        <Marker position={formData.location} />
                    </MapContainer>

                    <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DietitianRegistration;
