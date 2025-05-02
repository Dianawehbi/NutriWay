import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiPlus, FiMinus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../../components/Dietitian/NavBar.jsx";
import axios from "axios";

const DietitianAvailability = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [services, setServices] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [form, setForm] = useState({ serviceId: "", date: null, startTime: "" });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/dietitian", { params: { id: userId } });
        if (data.success) {
          setServices(data.dietitian.services || []);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, [userId]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/availability", { params: { id: userId } });
        if (data.success) {
          setAvailabilities(data.availabilitySlots || []);
        }
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, [form]);

  const handleAddAvailability = async () => {
    const { serviceId, date, startTime } = form;
    if (!serviceId || !date || !startTime) return alert("Please fill in all fields.");

    const selectedService = services.find(s => s._id === serviceId || s.serviceId === serviceId);
    if (!selectedService) return;

    const duration = selectedService.duration; // assumed in minutes
    const endTime = calculateEndTime(startTime, duration);

    const newSlot = {
      dietitian_id: userId,
      service: {
        serviceId,
        name: selectedService.name,
        price: selectedService.price,
        mode: selectedService.mode,
        duration: duration,
      },
      date,
      startTime,
      endTime,
      is_available: true,
    };

    const overlapping = checkConflicts(newSlot);
    if (overlapping.length > 0) {
      setConflicts(overlapping);
      return alert("Time conflict detected. Please choose another slot.");
    }

    try {
      console.log(newSlot)
      const res = await axios.post("http://localhost:5000/api/availability/add", newSlot);
      if (res.data.success) {
        setForm({ serviceId: "", date: null, startTime: "" });
        setConflicts([]);
        alert("Availability slot saved.");
      }

    } catch (err) {
      console.error("Error saving slot:", err);
      alert("Failed to save. Try again.");
    }
  };

  const checkConflicts = (newSlot) => {
    return availabilities.filter(slot => {
      const sameDay = new Date(slot.date).toDateString() === new Date(newSlot.date).toDateString();
      if (!sameDay) return false;

      const startA = timeToDate(slot.startTime);
      const endA = timeToDate(slot.endTime);
      const startB = timeToDate(newSlot.startTime);
      const endB = timeToDate(newSlot.endTime);

      return (
        (startB >= startA && startB < endA) ||
        (endB > startA && endB <= endA) ||
        (startB <= startA && endB >= endA)
      );
    });
  };

  const timeToDate = (time) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const calculateEndTime = (start, durationMin) => {
    const [h, m] = start.split(":").map(Number);
    const startTime = new Date();
    startTime.setHours(h, m, 0, 0);
    const end = new Date(startTime.getTime() + durationMin * 60000);
    return `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`;
  };

  const handleRemoveSlot = async (slotId) => {
    try {
      await axios.delete(`/api/availability/${slotId}`);
      setAvailabilities(availabilities.filter(slot => slot._id !== slotId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete slot.");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${m} ${ampm}`;
  };

  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h ? `${h}h ` : ""}${m ? `${m}m` : ""}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-20 font-sans">
      <NavBar />

      <main className="max-w-3xl mx-auto space-y-6 mt-6">
        {/* Availability Form */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <FiCalendar className="mr-2" /> Set Availability
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Service</label>
              <select
                value={form.serviceId}
                onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                className="w-full p-3 border rounded-lg mt-1"
              >
                <option value="">Choose service</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({formatDuration(s.duration)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                selected={form.date}
                onChange={(date) => setForm({ ...form, date })}
                className="w-full p-3 border rounded-lg mt-1"
                minDate={new Date()}
                placeholderText="Pick a date"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full p-3 border rounded-lg mt-1"
                step="900"
              />
            </div>
          </div>

          <button
            onClick={handleAddAvailability}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <FiPlus className="mr-2" /> Add Slot
          </button>
        </section>

        {/* Display Schedule */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <FiClock className="mr-2" /> Your Availability
          </h2>

          {availabilities.length === 0 ? (
            <p className="text-center text-gray-500">No slots yet</p>
          ) : (
            <div className="space-y-4">
              {[...new Set(availabilities.map(slot => new Date(slot.date).toISOString().split("T")[0]))]
                .sort()
                .map(dateStr => {
                  const dailySlots = availabilities.filter(
                    s => new Date(s.date).toISOString().split("T")[0] === dateStr
                  ).sort((a, b) => a.startTime.localeCompare(b.startTime));

                  return (
                    <div key={dateStr} className="border rounded-lg">
                      <div className="bg-gray-100 p-3 font-semibold text-gray-800">
                        {formatDate(dateStr)}
                      </div>
                      <ul className="divide-y">
                        {dailySlots.map(slot => (
                          <li key={slot._id} className="p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{slot.service?.name}</div>
                              <div className="text-sm text-gray-600">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                <span className="ml-2 text-gray-500">
                                  ({formatDuration(slot.service?.duration)})
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveSlot(slot._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FiMinus />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          )}
        </section>

        {/* Appointments Link */}
        <div className="text-center">
          <Link
            to="/dietitian-appointments"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg inline-block"
          >
            View Appointments
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DietitianAvailability;
