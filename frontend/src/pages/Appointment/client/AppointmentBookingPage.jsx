import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUser, FiCalendar, FiClock, FiDollarSign } from "react-icons/fi";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import ClientNavbar from "../../../components/Client/NavBar";
const AppointmentBooking = () => {
    const navigate = useNavigate();
    const [availabilities, setAvailabilities] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const client_id = JSON.parse(localStorage.getItem("user"))._id

    // Fetch available slots
    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("http://localhost:5000/api/availability");
                if (data.success) {
                    const availableSlots = data.availabilitySlots
                        .filter(slot => slot.is_available)
                        .map(slot => ({
                            ...slot,
                            formattedDate: format(parseISO(slot.date), 'EEE, MMM d yyyy')
                        }));
                    setAvailabilities(availableSlots);
                    console.log(availableSlots)
                }
            } catch (err) {
                console.log("Failed to fetch availability:", err);
                setError('Failed to load available time slots');
            } finally {
                setLoading(false);
            }
        };
        fetchAvailability();
    }, []);

    const selectedSlot = availabilities.find(slot => slot._id === selectedSlotId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSlotId) {
            setError('Please select an available time slot');
            return;
        }

        // i have 2 things to have her , uppdate availabilty , and add apointment 
        try {
            setLoading(true);
            setError('');
            const appointmentData = {
                availabilityId: selectedSlotId,
                client_id,
                status: 'upcoming',
            };
            //her
            console.log(appointmentData)
            const { data } = await axios.post(
                "http://localhost:5000/api/appointment/add",
                appointmentData
            );
            if (data.success) {
                setSuccess('Appointment booked successfully!');
                try {
                    const new_avai = { is_available: false };
                    const response = await axios.put(`http://localhost:5000/api/availability/update/${selectedSlotId}`, new_avai);
                    console.log(response)
                    if (response.data.success) {
                        setError('');
                        navigate("/AppointmentHistory");
                    }
                } catch (err) {

                }
            }
            // also her we should update availability to be false is_available 
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
            console.log(err.response)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Modern Header */}
            <ClientNavbar />

            <main className="max-w-4xl mx-auto px-4 py-8 mt-18">
                {/* Booking Card */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Your Session</h2>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg border border-green-100">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Available Slots Dropdown */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Available Time Slots
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSlotId}
                                        onChange={(e) => setSelectedSlotId(e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        disabled={loading || availabilities.length === 0}
                                    >
                                        <option value="">Select a time slot</option>
                                        {availabilities.map(slot => (
                                            <option key={slot._id} value={slot._id}>
                                                {slot.formattedDate} • {slot.start_time}-{slot.end_time} • {slot.dietitian_id.user_id.username} • {slot.mode}  • {slot.serviceId.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute left-3 top-3 text-gray-400">
                                        <FiCalendar size={18} />
                                    </div>
                                </div>
                                {availabilities.length === 0 && !loading && (
                                    <p className="mt-2 text-sm text-gray-500">No available slots at this time</p>
                                )}
                            </div>

                            {/* Selected Slot Details */}
                            {selectedSlot && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center mb-2">
                                        <FiCalendar className="text-gray-400 mr-2" />
                                        <span className="font-medium">{selectedSlot.formattedDate}</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <FiClock className="text-gray-400 mr-2" />
                                        <span>{selectedSlot.start_time} - {selectedSlot.end_time}</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <FiDollarSign className="text-gray-400 mr-2" />
                                        <span>${selectedSlot.price}</span>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <FiUser className="text-gray-400 mr-2" />
                                        <span>Dietitian: {selectedSlot.dietitian_id.user_id.username || 'N/A'}</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {selectedSlot.serviceId.name} • {selectedSlot.mode}
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading || !selectedSlotId}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Booking...' : 'Confirm Appointment'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AppointmentBooking;