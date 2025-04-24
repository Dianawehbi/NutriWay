import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "client", "dietitian"], required: true },
    phone: {type: String , required:true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const User = mongoose.model("User", userSchema);
export default User;
