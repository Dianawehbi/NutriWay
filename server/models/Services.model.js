import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    dietitian: [{
        deititian_id: { type: String},
        price: { type: String },
        mode: { type: String }
    }]
})

const Service = mongoose.model("Service", serviceSchema);
export default Service;