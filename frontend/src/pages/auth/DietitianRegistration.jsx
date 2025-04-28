import { useState } from "react";
import Select from "react-select";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ setLocation }) => {
    useMapEvents({
        click(e) {
            setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
        },
    });
    return null;
};
// i should also add all things for user himself 
// to att the same time add info for =dietitian and user 

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
        profilePicture: "",
    });
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //     specialization: { type: String, required: true },
    //     experience: { type: String, required: true },
    //     certification: { type: String, required: true },
    //     profile_img: { type: String },  // Image URL or file path to dietitian's profile picture
    //     clinic_address: { type: String },  // Clinic address
    const [error, setError] = useState('');

    const languageOptions = [
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
        { value: "Arabic", label: "Arabic" }
    ];

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...formData.services];
        updatedServices[index] = { ...updatedServices[index], [field]: value };
        setFormData({ ...formData, services: updatedServices });
    };

    const addService = () => {
        setFormData({ ...formData, services: [...formData.services, { name: "", price: "", type: "" }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.services.length === 0) {
            alert("Please add at least one service.");
            return;
        }

        if (formData.languages.length === 0) {
            alert("Please select at least one language.");
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/dietitianRegister',
                { username, phoneNumber, email, password }
            );
            // specialization: { type: String, required: true },
            // experience: { type: String, required: true },
            // certification: { type: String, required: true },
            // profile_img: { type: String },
            // clinic_address: { type: String },
            if (response.data.success) {
                alert("Registration successful! Please wait to be accepted.");
                navigate('/Login'); // Redirect to login page after signup
            }

        } catch (err) {
            console.log(err);
            if (err.response && !err.response.data.success) {
                setError(err.response.data.error);
            } else {
                setError("Server Error during Register");
            }
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-green-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap opacity-30">
                {Array.from({ length: 6 }).map((_, i) => (
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
                        className="absolute text-4xl"
                        style={{
                            top: `${Math.random() * 85 + 5}%`,
                            left: `${Math.random() * 85 + 5}%`,
                            padding: "20px",
                        }}
                    >
                        🥑 NutriWay
                    </motion.div>
                ))}
            </div>

            <div className="lg:w-full w-xsl max-w-3xl my-15 mx-2 p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
                <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6 animate-fadeIn">Dietitian Registration</h2>

                <form onSubmit={handleSubmit} className="space-y-4 animate-fadeInUp">
                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    <input type="text" name="certification" placeholder="Certification" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    <input type="number" name="clientsWorkedWith" placeholder="Clients Worked With" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    <input type="text" name="education" placeholder="Education" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />

                    {/* Languages */}
                    <label className="block font-semibold">Languages Spoken:</label>
                    <Select
                        isMulti
                        options={languageOptions}
                        onChange={(selected) => setFormData({ ...formData, languages: selected.map(option => option.value) })}
                        className="w-full"
                    />

                    {/* Profile Picture Upload */}
                    <label className="block font-semibold">Profile Picture:</label>
                    <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" />

                    {/* Services */}
                    <div className="flex items-center justify-between">
                        <label className="block font-semibold">Services Provided:</label>
                        <button type="button" onClick={addService} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
                            Add Service
                        </button>
                    </div>

                    {formData.services.map((service, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-4 shadow-md">
                            <input type="text" placeholder="Service Name" value={service.name} onChange={(e) => handleServiceChange(index, "name", e.target.value)} className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />
                            <input type="number" placeholder="Price ($)" value={service.price} onChange={(e) => handleServiceChange(index, "price", e.target.value)} className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required />
                            <select value={service.type} onChange={(e) => handleServiceChange(index, "type", e.target.value)} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-md" required>
                                <option value="">Select Service Type</option>
                                <option value="Online">Online</option>
                                <option value="In-Clinic">In-Clinic</option>
                            </select>
                        </div>
                    ))}

                    {/* Location Picker */}
                    <label className="block font-semibold">Select Your Location:</label>
                    <MapContainer center={{ lat: 33.8547, lng: 35.8623 }} zoom={8} style={{ height: "300px", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationPicker setLocation={(location) => setFormData({ ...formData, location })} />
                        <Marker position={formData.location} />
                    </MapContainer>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold mt-4"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DietitianRegistration;
