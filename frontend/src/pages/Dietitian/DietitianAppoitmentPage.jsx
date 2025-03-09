import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

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

const DietitianAppointmentsPage = () => {
  const [availability, setAvailability] = useState({ day: "", time: "" });
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [mode, setMode] = useState("");
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
  // Dummy data: Availability times
  const availabilityTimes = [
    "Monday: 9 AM - 5 PM",
    "Tuesday: 9 AM - 5 PM",
    "Wednesday: 9 AM - 5 PM",
  ];

  const handleSetAvailability = () => {
    if (!availability.day || !availability.time) {
      alert("Please fill in both day and time to set availability.");
      return;
    }

    setAvailabilityTimes([...availabilityTimes, `${availability.day}: ${availability.time}`]);
    setAvailability({ day: "", time: "" });
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6 font-serif">
      {/* Fixed Header with High z-index */}
      <div className="fixed rounded-b-2xl font-serif bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Dietitian Appointments</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>
      <h1 className="text-4xl mt-15 font-extrabold text-[#234403] mb-8 text-center">
        Manage Your Appointments
      </h1>

      {/* Set Availability Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Set Your Availability</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={availability.day}
            onChange={(e) => setAvailability({ ...availability, day: e.target.value })}
            className="p-3 border rounded-lg"
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            {/* Add more days as necessary */}
          </select>

          <input
            type="time"
            value={availability.time}
            onChange={(e) => setAvailability({ ...availability, time: e.target.value })}
            className="p-3 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSetAvailability}
          className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600"
        >
          Set Availability
        </button>
      </div>

      {/* Toggle Buttons for Viewing */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShowUpcoming(true)}
          className={`p-3 rounded-lg font-bold ${showUpcoming ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => setShowUpcoming(false)}
          className={`p-3 rounded-lg font-bold ${!showUpcoming ? "bg-green-600 text-white" : "bg-gray-300"}`}
        >
          Appointment History
        </button>
      </div>

      {/* Appointments Display */}
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {showUpcoming ? "Upcoming Appointments" : "Appointment History"}
        </h2>

        {showUpcoming && upcomingAppointments.length === 0 && (
          <p className="text-gray-500">No upcoming appointments.</p>
        )}
        {!showUpcoming && pastAppointments.length === 0 && (
          <p className="text-gray-500">No past appointments.</p>
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
                  {appointment.status === "Completed" && (
                    <span className="inline-block mt-2 px-3 py-1 text-sm font-bold rounded-full bg-gray-300 text-gray-700">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
};

export default DietitianAppointmentsPage;
