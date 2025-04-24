import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    id: { type: int, required: true, default: true },
    order_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quatity: { type: String, required: true },
    price: { type: String, required: true },
})

const User = mongoose.model("User", userSchema);
export default User;