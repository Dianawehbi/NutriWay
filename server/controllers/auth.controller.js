import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Incorrect Password!" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.username, role: user.role },
        });
    } catch (error) {

        return res.status(500).json({ success: false, error: error.message });
    }
};

export const verify = async (req, res)=>  {
    return res.status(200).json({success:true , user: req.user})
}
