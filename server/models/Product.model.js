import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    product_id: { type: int, required: true, default: true },
    product_name: { type: String, required: true },
    decsription: { type: String, required: true },
    price: { type: String, required: true },
})

const User = mongoose.model("User", userSchema);
export default User;