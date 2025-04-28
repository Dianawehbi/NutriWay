import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'

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

export const userRegister = async (req, res) => {
    try {
        const { username, phoneNumber, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already registered!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: 'client',
            phone: phoneNumber,
        });

        await newUser.save();

        return res.status(200).json({
            success: true, message: "You Have Succesfuly Register"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const registerDietitian = async (req, res) => {
    try {
        const { username, email, password, phone, specialization, experience, certification, profile_img, clinic_address } = req.body;

        // Create a new User with role 'dietitian'
        const user = new User({
            username,
            email,
            password, // Hash the password before saving (make sure to hash it)
            role: 'dietitian',
            phone,
        });

        await user.save(); // Save user first

        // Now create the Dietitian document and link it to the User
        const dietitian = new Dietitian({
            user: user._id,  // Link to user
            specialization,
            experience,
            certification,
            profile_img,  // Profile image URL/path
            clinic_address,
        });

        await dietitian.save(); // Save dietitian

        res.status(201).json({ success: true, message: 'Dietitian registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const verify = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}
