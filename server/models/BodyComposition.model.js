import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    meal_id: { type: int, required: true, default: true },
    dietitian_id: { type: String, required: true },
    client_id: { type: String, required: true },
    water: { type: String, required: true },
    muscle: { type: String, required: true },
    fat: { type: String, enum: ["admin", "client", "dietitian"], required: true },
    bmi : { type: String, required: true },
    weight : { type: String, required: true },
    date : { type: String, required: true },
})

const User = mongoose.model("User", userSchema);
export default User;