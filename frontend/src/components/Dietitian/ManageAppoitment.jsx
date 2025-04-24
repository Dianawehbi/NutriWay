import { useState } from "react";

// Sample doctors for simplicity, could be dynamic in real application.
const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Nutritionist" },
    { id: 2, name: "Dr. Mark Davis", specialty: "Dietitian" },
    { id: 3, name: "Dr. Emma Brown", specialty: "Weight Loss Specialist" },
];

// Sample services for simplicity.
const services = [
    "Diet Consultation",
    "Weight Management",
    "Meal Planning",
    "Nutritional Therapy",
];

// Sample data
const appointmentsData = [
    {
        id: 1,
        client: "John Doe",
        service: "Diet Consultation",
        date: "2025-03-15",
        time: "10:00 AM",
        mode: "Online",
        status: "Upcoming",
    },
    {
        id: 2,
        client: "Alice Smith",
        service: "Weight Management",
        date: "2025-03-12",
        time: "2:00 PM",
        mode: "In-Clinic",
        status: "Completed",
    },
];

export default function ManageAppt() {
    const [appointments, setAppointments] = useState(appointmentsData);
    const [showUpcoming, setShowUpcoming] = useState(true);

    const upcomingAppointments = appointments.filter(
        (app) => app.status === "Upcoming"
    );
    const pastAppointments = appointments.filter(
        (app) => app.status === "Completed"
    );

    const handleAcceptAppointment = (appointmentId) => {
        setAppointments(
            appointments.map((app) =>
                app.id === appointmentId ? { ...app, status: "Completed" } : app
            )
        );
    };

    const handleCancelAppointment = (appointmentId) => {
        setAppointments(
            appointments.filter((app) => app.id !== appointmentId)
        );
    };


    return (
        <div>
            {/* Appointments Display */}
            <div className="bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Pending Appoitments
                </h2>

                {showUpcoming && upcomingAppointments.length === 0 && (
                    <p className="text-gray-500">No upcoming appointments.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(showUpcoming ? upcomingAppointments : pastAppointments).map(
                        (appointment, index) => (
                            <div
                                key={index}
                                className={`border p-4 rounded-lg shadow-sm bg-gray-50 ${appointment.status === "Upcoming" ? "border-blue-400" : "border-gray-300"
                                    }`}
                            >
                                <p className="text-lg font-semibold">{appointment.service}</p>
                                <p className="text-gray-600">Client: {appointment.client}</p>
                                <p className="text-gray-600">
                                    Date: {appointment.date} | Time: {appointment.time}
                                </p>
                                <p className="text-gray-600">Mode: {appointment.mode}</p>

                                <div className="mt-2 flex gap-4">
                                    {appointment.status === "Upcoming" && (
                                        <>
                                            <button
                                                onClick={() => handleAcceptAppointment(appointment.id)}
                                                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleCancelAppointment(appointment.id)}
                                                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="bg-gray-100 p-6 rounded-lg mt-10 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Upcoming Appointments</h3>
                    {appointments.map(appointment => (
                        <div key={appointment.id} className="mb-4">
                            <p className="font-medium text-gray-700">Date: {appointment.date}</p>
                            <p className="text-gray-500">Client: {appointment.clientName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}