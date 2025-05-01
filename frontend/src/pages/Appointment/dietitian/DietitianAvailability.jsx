import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiCalendar, FiClock, FiPlus, FiMinus } from "react-icons/fi";

const DietitianAvailability = () => {
  // Sample services data with fixed durations (in minutes)
  const [services, setServices] = useState([
    { id: 1, name: "Initial Consultation", duration: 60 },
    { id: 2, name: "Follow-up Session", duration: 30 },
    { id: 3, name: "Meal Plan Creation", duration: 90 }
  ]);

  const [availability, setAvailability] = useState({ 
    serviceId: "",
    day: "", 
    startTime: "" 
  });

  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday", "Sunday"
  ];

  // Check for time conflicts when adding new availability
  const checkForConflicts = (newSlot) => {
    const newStart = new Date(`1970-01-01T${newSlot.startTime}`);
    const newEnd = new Date(newStart.getTime() + newSlot.duration * 60000);
    
    return availabilitySlots.filter(slot => {
      if (slot.day !== newSlot.day) return false;
      
      const slotStart = new Date(`1970-01-01T${slot.startTime}`);
      const slotEnd = new Date(slotStart.getTime() + slot.duration * 60000);
      
      return (
        (newStart >= slotStart && newStart < slotEnd) ||
        (newEnd > slotStart && newEnd <= slotEnd) ||
        (newStart <= slotStart && newEnd >= slotEnd)
      );
    });
  };

  const handleSetAvailability = () => {
    if (!availability.serviceId || !availability.day || !availability.startTime) {
      alert("Please fill in all fields to set availability.");
      return;
    }

    const selectedService = services.find(s => s.id === parseInt(availability.serviceId));
    if (!selectedService) return;

    const newSlot = {
      id: Date.now(), // temporary ID
      serviceId: availability.serviceId,
      serviceName: selectedService.name,
      day: availability.day,
      startTime: availability.startTime,
      duration: selectedService.duration,
      endTime: calculateEndTime(availability.startTime, selectedService.duration)
    };

    const conflictingSlots = checkForConflicts(newSlot);
    if (conflictingSlots.length > 0) {
      setConflicts(conflictingSlots);
      alert(`This time slot conflicts with existing availability. Please choose a different time.`);
      return;
    }

    setAvailabilitySlots([...availabilitySlots, newSlot]);
    setAvailability({ serviceId: "", day: "", startTime: "" });
    setConflicts([]);
  };

  const calculateEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`;
  };

  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const handleRemoveSlot = (id) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-20 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md rounded-b-xl z-20">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link to="/dietitian-dashboard" className="text-2xl text-gray-700 hover:text-green-600">
            <IoMdArrowRoundBack />
          </Link>
          <h1 className="text-xl font-bold text-gray-800">Manage Availability</h1>
          <Link to="/dietitian-profile" className="text-2xl text-gray-700 hover:text-green-600">
            <CgProfile />
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl space-y-6">
        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <FiCalendar className="mr-2" /> Set Service Availability
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
              <select
                value={availability.serviceId}
                onChange={(e) => setAvailability({ ...availability, serviceId: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} ({formatDuration(service.duration)})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <select
                value={availability.day}
                onChange={(e) => setAvailability({ ...availability, day: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select Day</option>
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="time"
                value={availability.startTime}
                onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg"
                step="900" // 15 minute increments
              />
            </div>
          </div>

          <button
            onClick={handleSetAvailability}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            <FiPlus className="mr-2" /> Add Availability Slot
          </button>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <FiClock className="mr-2" /> Your Availability Schedule
          </h2>
          
          {availabilitySlots.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No availability slots set yet</p>
          ) : (
            <div className="space-y-4">
              {daysOfWeek.map(day => {
                const daySlots = availabilitySlots.filter(slot => slot.day === day);
                if (daySlots.length === 0) return null;
                
                return (
                  <div key={day} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-3 font-medium text-gray-800">
                      {day}
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {daySlots
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map(slot => (
                          <li key={slot.id} className="p-3 flex justify-between items-center">
                            <div>
                              <span className="font-medium">{slot.serviceName}</span>
                              <div className="text-sm text-gray-600">
                                {formatTimeDisplay(slot.startTime)} - {formatTimeDisplay(slot.endTime)} 
                                <span className="ml-2 text-gray-500">({formatDuration(slot.duration)})</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleRemoveSlot(slot.id)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                              title="Remove slot"
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

        <div className="text-center">
          <Link 
            to="/dietitian-appointments" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            View Appointments
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DietitianAvailability;