import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    appointmen_id: { type: int, required: true, default: true },
    dietitian_id: { type: String, required: true },
    client_id: { type: String, required: true },
    service_id: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["admin", "client", "dietitian"], required: true },
})

const User = mongoose.model("User", userSchema);
export default User;