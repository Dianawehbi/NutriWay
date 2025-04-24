import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    clientID: { type: int, required: true, default: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, enum: ["admin", "client", "dietitian"], required: true },
    goal: { type: String },
    acitivityLevel: { type: String },
    waterIntake: { type: String },
    dietType: { type: String },
    dietPlan: { type: String },
})

const User = mongoose.model("User", userSchema);
export default User;