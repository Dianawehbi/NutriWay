import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    service_id: { type: int, required: true, default: true },
    name: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true },
    price: { type: String, required: true },
})

const User = mongoose.model("User", userSchema);
export default User;