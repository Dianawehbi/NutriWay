import mongoose from "mongoose";
import User from "./User.model.js";

const clientSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: String },
    gender: { type: String },
    height: { type: String },
    weight: { type: String },
    goal: { type: String },
    activityLevel: { type: String },
    waterIntake: { type: String },
    dietPlan: { type: String },
});


const Client = mongoose.model("Client", clientSchema);

export default Client;