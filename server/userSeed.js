import User from "./models/User.model.js"
import bcrypt from 'bcrypt';
import connectDB from "./config/db.js";

const userRegister = async () => {
    connectDB()
    try {
        const hashPassword = await bcrypt.hash("client", 10);
        //Salt ensures that even if two users have the same password, their hashed values will be different
        //Salt rounds make brute-force attacks more difficult because each hash takes more time to compute.
        const newUser = new User({
            username: "Dietitian",
            email: "dietitian@gmail.com",
            password: hashPassword,
            role: "dietitian",
            phone: '000'
        })
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister()
