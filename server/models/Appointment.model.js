import mongoose from "mongoose";
import User from "./User.model.js";
import Availability from "./availability.model.js";

//her
const appointmentSchema = new mongoose.Schema({
  dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  availability_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'], 
    default: 'scheduled' 
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);