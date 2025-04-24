import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    order_id: { type: int, required: true, default: true },
    client_id: { type: String, required: true },
    total_price: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String, enum: ["admin", "client", "dietitian"], required: true },
})

const User = mongoose.model("User", userSchema);
export default User;