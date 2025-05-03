import mongoose from "mongoose";

// her
const availabilitySchema = new mongoose.Schema({
    dietitian_id: { type: String, required: true },
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