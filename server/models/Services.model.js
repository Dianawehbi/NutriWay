import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
})

const Service = mongoose.model("Service", serviceSchema);
export default Service;