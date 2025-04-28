import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const AdminAppointmentPage = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: "John Doe",
      dietitian: "Dr. Sarah Johnson",
      service: "Diet Consultation",
      date: "2025-03-15",
      time: "10:00 AM",
      status: "Scheduled",
      address: "123 Main St",
      phone: "123-456-7890",
    },
    {
      id: 2,
      client: "Alice Smith",
      dietitian: "Dr. Mark Davis",
      service: "Weight Management",
      date: "2025-03-12",
      time: "2:00 PM",
      status: "Completed",
      address: "456 Elm St",
      phone: "987-654-3210",
    },
  ]);
  const [showScheduled, setShowScheduled] = useState(true);

  const handleConfirmAppointment = (appointmentId) => {
    setAppointments(
      appointments.map((app) =>
        app.id === appointmentId ? { ...app, status: "Confirmed" } : app
      )
    );
  };

  const handleRemoveAppointment = (appointmentId) => {
    setAppointments(appointments.filter((app) => app.id !== appointmentId));
  };

  const scheduledAppointments = appointments.filter(
    (app) => app.status === "Scheduled"
  );
  const pastAppointments = appointments.filter(
    (app) => app.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-serif">
      <div className="fixed rounded-b-2xl font-serif bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Admin Appointment Management</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>

      <h1 className="text-4xl mt-16 font-extrabold text-[#234403] mb-8 text-center">
        Manage Appointments
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShowScheduled(true)}
          className={`p-3 rounded-lg font-bold ${showScheduled ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Scheduled Appointments
        </button>
        <button
          onClick={() => setShowScheduled(false)}
          className={`p-3 rounded-lg font-bold ${!showScheduled ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Completed Appointments
        </button>
      </div>

      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {showScheduled ? "Scheduled Appointments" : "Completed Appointments"}
        </h2>

        {showScheduled && scheduledAppointments.length === 0 && (
          <p className="text-gray-500">No scheduled appointments.</p>
        )}
        {!showScheduled && pastAppointments.length === 0 && (
          <p className="text-gray-500">No completed appointments.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(showScheduled ? scheduledAppointments : pastAppointments).map((appointment, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50">
              <p className="text-lg font-semibold">{appointment.service}</p>
              <p className="text-gray-600">Client: {appointment.client}</p>
              <p className="text-gray-600">Dietitian: {appointment.dietitian}</p>
              <p className="text-gray-600">Date: {appointment.date} | Time: {appointment.time}</p>
              <p className="text-gray-600">Address: {appointment.address}</p>
              <p className="text-gray-600">Phone: {appointment.phone}</p>

              <div className="mt-2 flex gap-4">
                {appointment.status === "Scheduled" && (
                  <>
                    <button
                      onClick={() => handleRemoveAppointment(appointment.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </>
                )}
                {appointment.status === "Completed" && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-bold rounded-full bg-gray-300 text-gray-700">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentPage;
