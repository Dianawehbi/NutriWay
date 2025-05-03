import mongoose from "mongoose";

//her
const appointmentSchema = new mongoose.Schema({
  dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dietitian', required: true },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  availability_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Availability' },
  date: { type: Date, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'], 
    default: 'scheduled' 
  },
  notes: String,
  payment_status: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
  meeting_link: String // For virtual appointments
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);