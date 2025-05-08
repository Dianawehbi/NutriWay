import mongoose from "mongoose";
import User from "./User.model.js";
import Availability from "./availability.model.js";

//her
const appointmentSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  availability_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  status: { type: String, enum: ['upcoming', 'completed', 'rejected'], default: 'upcoming' },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;