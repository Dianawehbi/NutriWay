import { useState } from "react";
import DietitianNavBar from "../../components/Dietitian/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { FaVideo, FaMoneyBillWave } from "react-icons/fa";
import AdminNavBar from "../../components/Admin/AdminNavBar";

export default function ManageAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("upcoming");
    const role = JSON.parse(localStorage.getItem("user")).role
    const user_id = JSON.parse(localStorage.getItem("user"))._id

    const upcomingAppointments = appointments.filter(app => app.status === "upcoming");
    const completedAppointments = appointments.filter(app => app.status === "completed");
    const rejectedAppointments = appointments.filter(app => app.status === "rejected");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                if (role == "dietitian") {
                    const response = await axios.get(`http://localhost:5000/api/appointment/dietitian/${user_id}`);
                    console.log(response.data.data)
                    if (response.data.success) {
                        setAppointments(response.data.data);
                    }
                }
                if (role == "admin") {
                    const response = await axios.get(`http://localhost:5000/api/appointment`);
                    if (response.data.success) {
                        setAppointments(response.data.data);
                    }
                }

            } catch (error) {
                console.log("Error fetching appointments:", error.message);
                setError(error.response?.data?.error || "Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/appointment/update/${id}`, {
                status: newStatus
            });

            if (response.data.success) {
                setAppointments(appointments.map(app =>
                    app._id === id ? { ...app, status: newStatus } : app
                ));
            }
        } catch (error) {
            console.log("Error updating appointment:", error.message);
            setError(error.response?.data?.error || "Failed to update appointment");
        }
    };

    const handleAcceptAppointment = (id) => {
        updateAppointmentStatus(id, "completed");
    };

    const handleCancelAppointment = (id) => {
        updateAppointmentStatus(id, "rejected");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const generateGoogleMeetLink = (appointmentId) => {
        // In a real app, you might generate this based on appointment details
        // or get it from your backend
        return `https://meet.google.com/${appointmentId.slice(0, 8)}-${appointmentId.slice(8, 12)}`;
    };

    const renderAppointments = (list, label) => (
        list.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">No {label} appointments found</p>
            </div>
        ) : (
            list.map(appointment => (
                <div key={appointment._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="p-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xl font-semibold text-gray-600">
                                    {appointment.client_id?.username.charAt(0) || 'C'}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {appointment.client_id?.username || 'Client'}
                                        </h3>
                                        <p className="text-blue-600 font-medium">
                                            {appointment.availability_id?.serviceId.name || 'Consultation'}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === "upcoming"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : appointment.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-700"
                                        }`}>
                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">
                                            {formatDate(appointment.availability_id?.date)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">
                                            {appointment.availability_id.start_time} - {appointment.availability_id.end_time}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mode</p>
                                        <p className="font-medium">
                                            {appointment.availability_id?.mode || 'In-Clinic'}
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Information Section */}
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Dietitian</p>
                                        <p className="font-medium">
                                            {appointment.dietitian_id?.username || 'Dr. Sarah Chen'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-medium flex items-center">
                                            <FaMoneyBillWave className="mr-2" />
                                            ${appointment.availability_id?.price || '50'}
                                        </p>
                                    </div>
                                    {appointment.status === "upcoming" && appointment.availability_id?.mode === "Virtual" && (
                                        <div>
                                            <p className="text-sm text-gray-500">Meeting Link</p>
                                            <a
                                                href={generateGoogleMeetLink(appointment._id)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                                <FaVideo className="mr-2" />
                                                Join Google Meet
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {appointment.status === "upcoming" && (
                                    <div className="mt-6 flex space-x-3">
                                        <button
                                            onClick={() => handleAcceptAppointment(appointment._id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Mark as Completed
                                        </button>
                                        <button
                                            onClick={() => handleCancelAppointment(appointment._id)}
                                            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition"
                                        >
                                            Cancel Appointment
                                        </button>
                                    </div>
                                )}
                                {appointment.status === "completed" && role == "dietitian" && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => navigate(`/dietitian-add-client-info/${appointment.client_id._id}`)}
                                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Add Client Information
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )
    );

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                {role == "dietitian" && <DietitianNavBar />}
                {role == "admin" && <AdminNavBar />}

                <div className="mt-20 text-center">Loading appointments...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                {role == "dietitian" && <DietitianNavBar />}
                {role == "admin" && <AdminNavBar />}
                <div className="mt-20 text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {role == "dietitian" && <DietitianNavBar />}
            {role == "admin" && <AdminNavBar />}
            <h1 className="text-3xl mt-20 font-bold text-gray-800 mb-8">Appointment Management</h1>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === "upcoming" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming ({upcomingAppointments.length})
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === "completed" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("completed")}
                >
                    Completed ({completedAppointments.length})
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === "rejected" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
                    onClick={() => setActiveTab("rejected")}
                >
                    Rejected ({rejectedAppointments.length})
                </button>
            </div>

            {/* Appointment Cards */}
            <div className="space-y-4">
                {activeTab === "upcoming" && renderAppointments(upcomingAppointments, "upcoming")}
                {activeTab === "completed" && renderAppointments(completedAppointments, "completed")}
                {activeTab === "rejected" && renderAppointments(rejectedAppointments, "rejected")}
            </div>
        </div>
    );
}