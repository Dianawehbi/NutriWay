import mongoose from "mongoose";
import Dietitian from "./Dietitian.model.js";

const serviceSchema = mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: String, required: true },
    dietitian: [{
        dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dietitian', required: true },
        price: { type: String },
        mode: { type: String }
    }]
})

const Service = mongoose.model("Service", serviceSchema);
export default Service;