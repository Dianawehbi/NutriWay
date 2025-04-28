import mongoose from "mongoose";

const dietitianSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    certification: { type: String, required: true },
    profile_img: { type: String },  // Image URL or file path to dietitian's profile picture
    clinic_address: { type: String },  // Clinic address
});

const Dietitian = mongoose.model("Dietitian", dietitianSchema);
export default User;