import { useState, useEffect } from "react";
import Select from "react-select";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleImageUpload } from "../../utils/imageUtils";

const DietitianRegistration = () => {
    const navigate = useNavigate();
    const [availableServices, setAvailableServices] = useState([]);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        certification: "",
        clientsWorkedWith: "",
        education: "",
        specialization: "",
        experience: "",
        languages: [],
        services: [],
        location: { "lat": 34.3749, "lng": 35.8194 },
        profilePicture: null,
    });

    const languageOptions = [
        { value: "Arabic", label: "Arabic" },
        { value: "English", label: "English" },
        { value: "Spanish", label: "Spanish" },
        { value: "French", label: "French" },
    ];

    const onImageChange = async (e) => {
        const resizedImage = await handleImageUpload(e.target.files);
        if (resizedImage) {
            setFormData({ ...formData, image: resizedImage });
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/services");
                if (res.data.success) {
                    setAvailableServices(res.data.services || []);
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
            }
        };
        fetchServices();
    }, []);

    const removeService = (indexToRemove) => {
        const updated = formData.services.filter((_, index) => index !== indexToRemove);
        setFormData({ ...formData, services: updated });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleServiceChange = (index, field, value) => {
        const updated = [...formData.services];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, services: updated });
    };

    const addService = () => {
        setFormData({
            ...formData,
            services: [...formData.services, { serviceId: "", price: "", mode: "" }],
        });
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
            console.log(formData)
            const response = await axios.post(
                "http://localhost:5000/api/auth/dietitianRegister",
                formData, {
                Headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
            );
            console.log(response);
            if (response.data.success) {
                alert("Registration successful! Please wait to be accepted.");
                navigate("/Login");
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    password: "",
                    certification: "",
                    clientsWorkedWith: "",
                    education: "",
                    specialization: "",
                    experience: "",
                    languages: [],
                    services: [],
                    location: { "lat": 37.7749, "lng": -122.4194 },
                    profilePicture: null,
                })
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

            </div>

            <div className="lg:w-full w-xsl max-w-3xl my-15 mx-2 p-8 bg-white rounded-2xl shadow-xl border border-green-200 transform transition duration-500 ease-in-out hover:scale-105 relative z-10">
                <h2 className="text-3xl font-serif font-bold text-center text-green-700 mb-6">
                    Dietitian Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="text" name="certification" placeholder="Professional Certification" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="number" name="clientsWorkedWith" placeholder="Clients You've Worked With" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="text" name="education" placeholder="Highest Education Level" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="text" name="specialization" placeholder="Your Specialization" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                        <input type="number" name="experience" placeholder="Years of Experience" onChange={handleChange} required className="input rounded-xl border px-4 py-2" />
                    </div>

                    <label className="block font-semibold">Languages Spoken:</label>
                    <Select
                        isMulti
                        options={languageOptions}
                        onChange={(selected) =>
                            setFormData({ ...formData, languages: selected.map((option) => option.value) })
                        }
                        className="w-full"
                    />

                    <label className="block font-semibold">Profile Picture:</label>
                    <input type="file" name="file" accept="image/*" onChange={onImageChange} className="input" />

                    <div className="flex items-center justify-between">
                        <label className="block font-semibold">Services Provided:</label>
                        <button type="button" onClick={addService} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition">
                            Add Service
                        </button>
                    </div>

                    {formData.services.map((service, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-4 shadow-md relative">
                            {/* X Button */}
                            <button
                                type="button"
                                onClick={() => removeService(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                                title="Remove"
                            >
                                ×
                            </button>

                            <select
                                value={service.serviceId}
                                onChange={(e) => handleServiceChange(index, "serviceId", e.target.value)}
                                required
                                className="input mb-2"
                            >
                                <option value="">Select a Service</option>
                                {availableServices.map((srv) => (
                                    <option key={srv._id} value={srv._id}>
                                        {srv.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
                                placeholder="Price ($)"
                                value={service.price}
                                onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                                required
                                className="input mb-2"
                            />

                            <select
                                value={service.mode}
                                onChange={(e) => handleServiceChange(index, "mode", e.target.value)}
                                required
                                className="input"
                            >
                                <option value="">Select Service Type</option>
                                <option value="Online">Online</option>
                                <option value="In-Clinic">In-Clinic</option>
                            </select>
                        </div>
                    ))}


                    <label className="block font-semibold">Select Your Location:</label>
                    <MapContainer
                        center={formData.location} zoom={8} style={{ height: "300px", width: "100%" }}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={formData.location} />
                        {
                            (() => {
                                const LocationHandler = () => {
                                    useMapEvents({
                                        click(e) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                location: {
                                                    "lat": e.latlng.lat,
                                                    "lng": e.latlng.lng,
                                                },
                                            }));
                                        },
                                    });
                                    return null;
                                };
                                return <LocationHandler />;
                            })()}
                    </MapContainer>

                    <button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold mt-4">
                        Register
                    </button>
                    {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default DietitianRegistration;
