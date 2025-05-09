import mongoose from "mongoose";
import Dietitian from "./Dietitian.model.js";
import Client from "./Client.model.js";
//her

const bodySchema = mongoose.Schema({
    dietitian_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dietitian', required: true },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    water: { type: String, required: true },
    muscle: { type: String, required: true },
    fat: { type: String, required: true },
    bmi: { type: String, required: true },
    weight: { type: String, required: true },
    includeMealPlan: { type: Boolean, required: true },
    weeklyMealPlan: [{
        breakfast: { type: String, default: "" },
        lunch: { type: String, default: "" },
        dinner: { type: String, default: "" },
        snack: { type: String, default: "" }
    }],
    date: { type: Date, default: Date.now }
})

const Body = mongoose.model("Body", bodySchema);
export default Body;