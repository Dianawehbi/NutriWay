import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiPlus, FiMinus } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../../../components/Dietitian/NavBar.jsx";
import axios from "axios";

const DietitianAvailability = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const [dietitian_id, setDietitian_id] = useState("");
  const [services, setServices] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [form, setForm] = useState({ serviceId: "", date: null, startTime: "" });

  useEffect(() => {
    const fetchDietitianInfo = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dietitian", {
          params: { id: userId },
        });
        if (res.data.success) {
          setDietitian_id(res.data.dietitian._id);
        } else {
          console.error("Failed to fetch dietitian info: success = false");
        }
      } catch (err) {
        console.error("Failed to fetch dietitian info:", err);
      }
    };
    fetchDietitianInfo();
  }, [userId]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!dietitian_id) return;
      try {
        const res = await axios.get("http://localhost:5000/api/dietitian/service", {
          params: { id: dietitian_id },
        });
        if (res.data.success) {
          setServices(res.data.services);
        } else {
          console.error("Failed to fetch services: success = false");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, [dietitian_id]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/availability", {
          params: { id: userId },
        });
        if (data.success) {
          setAvailabilities(data.availabilitySlots || []);
        }
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };
    fetchAvailability();
  }, [form, userId]);

  const handleAddAvailability = async () => {
    const { serviceId, date, startTime } = form;
    if (!serviceId || !date || !startTime) return alert("Please fill in all fields.");

    const selectedService = services.find(s => s._id === serviceId || s.serviceId === serviceId);
    if (!selectedService) return;

    const duration = selectedService.duration;
    const endTime = calculateEndTime(startTime, duration);

    const selectedDietitian = selectedService.dietitian?.find(d => d.deititian_id === dietitian_id);
    if (!selectedDietitian) return alert("Dietitian not found for this service.");
    const newSlot = {
      dietitian_id: userId,
      serviceId,
      price: selectedDietitian.price,
      mode: selectedDietitian.mode,
      duration,
      name: selectedService.name,
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
      const sameDay = new Date(slot.date).toDateString() == new Date(newSlot.date).toDateString();

      if (!sameDay) return false;
      console.log(slot)
      const startA = timeToDate(slot.start_time);
      const endA = timeToDate(slot.end_time);
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
    if (!start) return "";
    const [h, m] = start.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return ""; // Return empty if not valid
    const startTime = new Date();
    startTime.setHours(h, m, 0, 0);  // Set the hours and minutes
    const endTime = new Date(startTime.getTime() + durationMin * 60000);
    const endHour = String(endTime.getHours()).padStart(2, "0");
    const endMinute = String(endTime.getMinutes()).padStart(2, "0");
    return `${endHour}:${endMinute}`;
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

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <FiClock className="mr-2" /> Your Availability
          </h2>

          {availabilities.length === 0 ? (
            <p className="text-center text-gray-500">No slots yet</p>
          ) : (
            <div className="space-y-4">
              {[...new Set(availabilities
                .filter(slot => slot.is_available) // 🔍 Only include available slots
                .map(slot => new Date(slot.date).toISOString().split("T")[0])
              )].sort()
                .map(dateStr => {
                  const dailySlots = availabilities
                    .filter(s =>
                      s.is_available && new Date(s.date).toISOString().split("T")[0] === dateStr
                    )
                    .sort((a, b) => a.start_time.localeCompare(b.start_time));

                  return (
                    <div key={dateStr} className="border rounded-lg">
                      <div className="bg-gray-100 p-3 font-semibold text-gray-800">
                        {formatDate(dateStr)}
                      </div>
                      <ul className="divide-y">
                        {dailySlots.map(slot => (
                          <li key={slot._id} className="p-3 flex justify-between items-center">
                            <div>
                              <div className="font-medium">{slot.name}</div>
                              <div className="text-sm text-gray-600">
                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                <span className="ml-2 text-gray-500">
                                  ({formatDuration(slot.duration)})
                                </span>
                              </div>
                            </div>

                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DietitianAvailability;
