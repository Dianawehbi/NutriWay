import mongoose from "mongoose";
import Service from "./Services.model.js";
import Dietitian from "./Dietitian.model.js";

const availabilitySchema = new mongoose.Schema({
    dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dietitian', required: true },
    serviceId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    mode: { type: String },
    price: { type: String, required: true },
    date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    is_available: { type: Boolean, default: true },
}
);
const Availability = mongoose.model("Availability", availabilitySchema);
export default Availability;

