import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiCalendar, FiClock, FiUser, FiVideo, FiHome } from "react-icons/fi";
import { MdDone, MdCancel } from "react-icons/md";
import NavBar from "../../../components/Dietitian/NavBar";
const DietitianAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [showUpcoming, setShowUpcoming] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Replace with actual API call
                // const response = await axios.get('/api/appointments');
                // setAppointments(response.data);

                // Mock data
                setTimeout(() => {
                    setAppointments([
                        {
                            id: 1,
                            client: "John Doe",
                            service: "Diet Consultation",
                            date: "2025-03-15",
                            time: "10:00 AM",
                            mode: "Online",
                            status: "Upcoming",
                            clientId: "123"
                        },
                        {
                            id: 2,
                            client: "Alice Smith",
                            service: "Weight Management",
                            date: "2025-03-12",
                            time: "2:00 PM",
                            mode: "In-Clinic",
                            status: "Completed",
                            clientId: "456"
                        },
                    ]);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const upcomingAppointments = appointments.filter(app => app.status === "Upcoming");
    const pastAppointments = appointments.filter(app => app.status === "Completed");

    const handleAcceptAppointment = async (appointmentId) => {
        try {
            // API call to accept appointment
            // await axios.put(`/api/appointments/${appointmentId}/accept`);
            setAppointments(apps =>
                apps.map(app =>
                    app.id === appointmentId ? { ...app, status: "Completed" } : app
                )
            );
        } catch (error) {
            console.error("Failed to accept appointment:", error);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        try {
            // API call to cancel appointment
            // await axios.delete(`/api/appointments/${appointmentId}`);
            setAppointments(apps => apps.filter(app => app.id !== appointmentId));
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 pt-20 font-sans">
            <NavBar />

            <main className="container mx-auto max-w-4xl space-y-6">
                <div className="flex justify-center gap-4 bg-white p-4 rounded-xl shadow-md">
                    <button
                        onClick={() => setShowUpcoming(true)}
                        className={`px-6 py-2 rounded-lg font-medium ${showUpcoming ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"} transition-colors`}
                    >
                        Upcoming Appointments
                    </button>
                    <button
                        onClick={() => setShowUpcoming(false)}
                        className={`px-6 py-2 rounded-lg font-medium ${!showUpcoming ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"} transition-colors`}
                    >
                        Appointment History
                    </button>
                </div>

                <section className="bg-white rounded-xl shadow-md p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                    ) : (
                        <>
                            {(showUpcoming ? upcomingAppointments : pastAppointments).length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    No {showUpcoming ? "upcoming" : "past"} appointments found.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {(showUpcoming ? upcomingAppointments : pastAppointments).map(appointment => (
                                        <div key={appointment.id} className={`border rounded-lg p-4 ${appointment.status === "Upcoming" ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}>
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                                <div className="mb-4 md:mb-0">
                                                    <h3 className="font-bold text-lg text-gray-800">{appointment.service}</h3>
                                                    <div className="flex items-center mt-2 text-gray-600">
                                                        <FiUser className="mr-2" />
                                                        <span>{appointment.client}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1 text-gray-600">
                                                        <FiCalendar className="mr-2" />
                                                        <span>{appointment.date} at {appointment.time}</span>
                                                    </div>
                                                    <div className="flex items-center mt-1 text-gray-600">
                                                        {appointment.mode === "Online" ? (
                                                            <FiVideo className="mr-2" />
                                                        ) : (
                                                            <FiHome className="mr-2" />
                                                        )}
                                                        <span>{appointment.mode} session</span>
                                                    </div>
                                                </div>

                                                {appointment.status === "Upcoming" ? (
                                                    <div className="flex space-x-2 justify-end">
                                                        <button
                                                            onClick={() => handleAcceptAppointment(appointment.id)}
                                                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                        >
                                                            <MdDone className="mr-1" /> Complete
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelAppointment(appointment.id)}
                                                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                        >
                                                            <MdCancel className="mr-1" /> Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-end space-y-2">
                                                        <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-bold rounded-full">
                                                            Completed
                                                        </span>
                                                        <Link
                                                            to={`/dietitian/client-info/${appointment.clientId}`}
                                                            className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors"
                                                        >
                                                            View Client Details
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>

                <div className="text-center">
                    <Link
                        to="/dietitian-availability"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                        Manage Availability
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default DietitianAppointments;