import { useState, useEffect } from "react";
import { FiClock, FiCalendar, FiUser, FiDollarSign, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import ClientNavbar from "../../../components/Client/NavBar";

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const client_id = JSON.parse(localStorage.getItem("user"))._id;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        alert(client_id)
        const { data } = await axios.get(`http://localhost:5000/api/appointment/client/${client_id}`);
        console.log(data);
        if (data.success) {
          setAppointments(data.appointments);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [client_id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />
      <main className="max-w-4xl mx-auto px-4 py-8 mt-18">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Appointment History</h2>

        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((appt) => {
              const slot = appt.availability_id;
              const formattedDate = format(parseISO(slot.date), 'EEE, MMM d yyyy');

              return (
                <div key={appt._id} className="bg-white rounded-lg shadow p-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm font-semibold px-3 py-1 rounded-full
                      ${appt.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        appt.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'}`}>
                      {appt.status}
                    </span>
                  </div>
                  <div className="flex items-center mb-1">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <FiClock className="text-gray-400 mr-2" />
                    <span>{slot.start_time} - {slot.end_time}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <FiUser className="text-gray-400 mr-2" />
                    <span>Dietitian: {slot.dietitian_id.user_id.username}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <FiDollarSign className="text-gray-400 mr-2" />
                    <span>${slot.price}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {slot.serviceId.name} • {slot.mode}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default AppointmentHistory;
