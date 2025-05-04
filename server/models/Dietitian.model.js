import mongoose from "mongoose";
import User from "./User.model.js";

const dietitianSchema = mongoose.Schema({
  user_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  certification: { type: String, required: true },
  profile_img: { type: String },
  clinic_address: {
    lat: Number,
    lng: Number
  },
  languages: [{ type: String }],
  clientsWorkedWith: { type: String },
  education: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }
});

const Dietitian = mongoose.model("Dietitian", dietitianSchema);
export default Dietitian;
