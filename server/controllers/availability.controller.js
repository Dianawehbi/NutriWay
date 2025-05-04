import Availability from "../models/availability.model.js"

export const GetAvailability = async (req, res) => {
  try {
    const availabilitySlots = await Availability.find().populate("dietitian_id");

    if (!availabilitySlots) {
      return res.status(404).json({ success: false, message: "No availability slots found for this dietitian." });
    }

    // Return the available slots
    return res.status(200).json({
      success: true,
      availabilitySlots,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export const GetAvailabilityByDietitianId = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ success: false, message: "Dietitian ID is required." });
    }

    // Fetch availability slots for the given dietitian_id
    const availabilitySlots = await Availability.find({ dietitian_id: id });

    if (!availabilitySlots) {
      return res.status(404).json({ success: false, message: "No availability slots found for this dietitian." });
    }

    // Return the available slots
    return res.status(200).json({
      success: true,
      availabilitySlots,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const AddAvailabilityForDietitian = async (req, res) => {
  try {
    const { dietitian_id, name, duration, serviceId, mode, price, date, startTime, endTime, is_available } = req.body;
    if (!dietitian_id || !serviceId || !date || !startTime || !endTime) {
    }

    const newAvailability = new Availability({
      dietitian_id,
      serviceId,
      mode,
      price,
      name,
      duration,
      date: new Date(date),
      start_time: startTime,
      end_time: endTime,
      is_available,
    });
    // Save the availability slot to the database
    const savedAvailability = await newAvailability.save();

    return res.status(201).json({
      success: true,
      message: "Availability slot added successfully.",
      availability: savedAvailability,
    });
  } catch (err) {
    console.error("Error saving availability:", err);
    return res.status(500).json({ success: false, message: "Server error. Try again later.", error: err.message });
  }
};

