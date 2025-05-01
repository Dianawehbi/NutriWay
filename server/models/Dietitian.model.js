import mongoose from "mongoose";

const dietitianSchema = mongoose.Schema({
  user_id: { type:String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  certification: { type: String, required: true },
  profile_img: { type: String },
  clinic_address: {
    lat: Number,
    lng: Number
  },
  languages: [{ type: String }],
  services: [
    {
      serviceId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      mode: { type: String },
      duration: { type: String, required: true },
    }],
    // what i think about is to add also array her for availability , 
    // then for each service , ther are many avaialble  time 
  clientsWorkedWith: { type: String },
  education: { type: String },
  status: {
    type: String, enum: ["pending", "approved", "rejected"], default: "pending",
  }
});


const Dietitian = mongoose.model("Dietitian", dietitianSchema);
export default Dietitian;
