import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    goal: { type: String },
    activityLevel: { type: String },
    waterIntake: { type: String },
    dietPlan: { type: String },
});


const Client = mongoose.model("Client", clientSchema);

export default Client;