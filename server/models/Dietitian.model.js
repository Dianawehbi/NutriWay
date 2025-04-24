import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    dietitianID: { type: int, required: true, default: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    certification: { type: String, required: true },
    profile_img: { type: String },
    clinic_address: { type: String },
})

const User = mongoose.model("User", userSchema);
export default User;