import { useState } from "react";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import { FaCalendarCheck, FaTrashAlt, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

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

  const handleConfirm = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? {...app, status: "Confirmed"} : app
    ));
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this appointment?")) {
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(app => 
    showScheduled ? app.status === "Scheduled" : app.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <AdminNavBar />
      
      <div className="max-w-6xl mt-18 mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Appointments
        </h1>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setShowScheduled(true)}
            className={`px-4 py-2 rounded-lg font-medium ${showScheduled ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setShowScheduled(false)}
            className={`px-4 py-2 rounded-lg font-medium ${!showScheduled ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Completed
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            {showScheduled ? "Scheduled Appointments" : "Completed Appointments"}
          </h2>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaCalendarCheck className="mx-auto text-4xl mb-2" />
              No {showScheduled ? "scheduled" : "completed"} appointments
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAppointments.map(appointment => (
                <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{appointment.service}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === "Scheduled" ? "bg-yellow-100 text-yellow-800" : 
                      appointment.status === "Completed" ? "bg-green-100 text-green-800" : ""
                    }`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    <p><span className="font-medium">Client:</span> {appointment.client}</p>
                    <p><span className="font-medium">Dietitian:</span> {appointment.dietitian}</p>
                    <p><span className="font-medium">Date:</span> {appointment.date} at {appointment.time}</p>
                    <p className="flex items-center">
                      <FaPhone className="mr-2 text-gray-500" />
                      {appointment.phone}
                    </p>
                    <p className="flex items-start">
                      <FaMapMarkerAlt className="mr-2 mt-1 text-gray-500" />
                      {appointment.address}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t">
                    {appointment.status === "Scheduled" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleConfirm(appointment.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleRemove(appointment.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center"
                        >
                          <FaTrashAlt className="mr-1" /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentPage;