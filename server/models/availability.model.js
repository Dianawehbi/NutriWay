import mongoose from "mongoose";
import User from "./User.model.js";
const availabilitySchema = new mongoose.Schema({
    dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: String, required: true },
    mode: { type: String },
    price: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    is_available: { type: Boolean, default: true },
}
);
const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;

