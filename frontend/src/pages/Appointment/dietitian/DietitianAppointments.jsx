import { useState } from "react";
import DietitianNavBar from "../../../components/Dietitian/NavBar";
import { useNavigate } from "react-router-dom";

export default function ManageAppointments() {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            client: "John Doe",
            service: "Diet Consultation",
            date: "2025-03-15",
            time: "10:00 AM",
            mode: "Online",
            status: "Upcoming",
            clientImage: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            client: "Alice Smith",
            service: "Weight Management",
            date: "2025-03-12",
            time: "2:00 PM",
            mode: "In-Clinic",
            status: "Completed",
            clientImage: "https://randomuser.me/api/portraits/women/45.jpg"
        },
        {
            id: 3,
            client: "Robert Johnson",
            service: "Meal Planning",
            date: "2025-03-18",
            time: "11:30 AM",
            mode: "Online",
            status: "Rejected",
            clientImage: "https://randomuser.me/api/portraits/men/75.jpg"
        }
    ]);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("upcoming");

    const upcomingAppointments = appointments.filter(app => app.status === "Upcoming");
    const completedAppointments = appointments.filter(app => app.status === "Completed");
    const rejectedAppointments = appointments.filter(app => app.status === "Rejected");

    const handleAcceptAppointment = (id) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: "Completed" } : app
        ));
    };

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: "Rejected" } : app
        ));
    };

    const handleRescheduleAppointment = (id, newDate, newTime) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, date: newDate, time: newTime } : app
        ));
    };

    const renderAppointments = (list, label) => (
        list.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">No {label} appointments found</p>
            </div>
        ) : (
            list.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                    <div className="p-6">
                        <div className="flex items-start space-x-4">
                            <img
                                src={appointment.clientImage}
                                alt={appointment.client}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">{appointment.client}</h3>
                                        <p className="text-blue-600 font-medium">{appointment.service}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${appointment.status === "Upcoming"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : appointment.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-700"
                                        }`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{appointment.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{appointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mode</p>
                                        <p className="font-medium">{appointment.mode}</p>
                                    </div>
                                </div>

                                {appointment.status === "Upcoming" && (
                                    <div className="mt-6 flex space-x-3">
                                        <button
                                            onClick={() => handleAcceptAppointment(appointment.id)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            Mark as Completed
                                        </button>
                                        <button
                                            onClick={() => handleCancelAppointment(appointment.id)}
                                            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition"
                                        >
                                            Cancel Appointment
                                        </button>
                                        <button
                                            onClick={() => handleRescheduleAppointment(appointment.id, "2025-03-20", "3:00 PM")}
                                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition"
                                        >
                                            Reschedule
                                        </button>
                                    </div>
                                )}{appointment.status === "Completed" && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => navigate('/dietitian-add-client-info')}
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

    return (
        <div className="max-w-6xl mx-auto p-6">
            <DietitianNavBar />
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
