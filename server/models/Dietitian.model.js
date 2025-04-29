import mongoose from "mongoose";

const dietitianSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    certification: { type: String, required: true },
    profile_img: { type: String },
    clinic_address: { type: String },
    languages: [{ type: String }],
    services: [
      {
        service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
        mode: { type: String }, 
        price: { type: String, required: true },
      }
    ],
    clientsWorkedWith: [{ type: String }],
    education: { type: String },
  });
  

const Dietitian = mongoose.model("Dietitian", dietitianSchema);
export default User;
