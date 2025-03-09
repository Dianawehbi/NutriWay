import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Nutritionist" },
  { id: 2, name: "Dr. Mark Davis", specialty: "Dietitian" },
  { id: 3, name: "Dr. Emma Brown", specialty: "Weight Loss Specialist" },
];

const services = [
  "Diet Consultation",
  "Weight Management",
  "Meal Planning",
  "Nutritional Therapy",
];

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [showUpcoming, setShowUpcoming] = useState(true);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedService || !date || !time || !mode) {
      alert("Please fill all fields before booking.");
      return;
    }

    const newAppointment = {
      doctor: selectedDoctor,
      service: selectedService,
      date,
      time,
      mode,
      status: new Date(`${date}T${time}`) > new Date() ? "Upcoming" : "Completed",
    };

    setAppointments([...appointments, newAppointment]);
    setSelectedDoctor("");
    setSelectedService("");
    setDate("");
    setTime("");
    setMode("");
  };

  const upcomingAppointments = appointments.filter(
    (app) => app.status === "Upcoming"
  );
  const pastAppointments = appointments.filter(
    (app) => app.status === "Completed"
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-serif">
      {/* Fixed Header with High z-index */}
      <div className="fixed rounded-b-2xl  font-serif  bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Appointments</span>
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

      {/* Book an Appointment Section */}
      <div className="bg-white shadow-lg p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Book an Appointment</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name} - {doc.specialty}
              </option>
            ))}
          </select>

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">Select a Service</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-3 border rounded-lg"
          >
            <option value="">Select Mode</option>
            <option value="Online">Online</option>
            <option value="In-Clinic">In-Clinic</option>
          </select>
        </div>

        <button
          onClick={handleBookAppointment}
          className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600"
        >
          Book Appointment
        </button>
      </div>

      {/* Toggle Buttons for Viewing */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setShowUpcoming(true)}
          className={`p-3 rounded-lg font-bold ${showUpcoming ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => setShowUpcoming(false)}
          className={`p-3 rounded-lg font-bold ${!showUpcoming ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
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
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="text-lg font-semibold">{appointment.service}</p>
                <p className="text-gray-600">Doctor: {appointment.doctor}</p>
                <p className="text-gray-600">
                  Date: {appointment.date} | Time: {appointment.time}
                </p>
                <p className="text-gray-600">Mode: {appointment.mode}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-sm font-bold rounded-full ${appointment.status === "Upcoming"
                      ? "bg-blue-200 text-blue-700"
                      : "bg-gray-300 text-gray-700"
                    }`}
                >
                  {appointment.status}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
