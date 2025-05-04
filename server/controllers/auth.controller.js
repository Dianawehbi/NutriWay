import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import Dietitian from "../models/Dietitian.model.js";
import Service from "../models/Services.model.js";

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

export const dietitianRegister = async (req, res) => {
    let newUser;
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already registered." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        newUser = await new User({
            username: req.body.fullName,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: "dietitian"
        }).save();

        const newDietitian = new Dietitian({
            specialization: req.body.specialization,
            experience: req.body.experience,
            certification: req.body.certification,
            profile_img: req.body.profilePicture || null, // Multer handles this
            clinic_address: {
                "lat": req.body.location.lat,
                "lng": req.body.location.lng
            },
            languages: req.body.languages,
            clientsWorkedWith: req.body.clientsWorkedWith,
            education: req.body.education,
            user_id: newUser._id,
            status: "pending"
        });
        await newDietitian.save();

        const services = req.body.services;
        await Promise.all(
            services.map(async (item) => {
                const update = {
                    deititian_id: newDietitian._id,
                    price: item.price,
                    mode: item.mode,
                };

                await Service.findByIdAndUpdate(
                    item.serviceId, // you had serviceID (case-sensitive mistake)
                    { $push: { dietitian: update } },
                    { new: true }
                );
            })
        );

        return res.status(201).json({ success: true, message: "Dietitian registered successfully" });
    } catch (err) {
        if (newUser?._id) {
            await User.findByIdAndDelete(newUser._id);
        }
        console.error(err);
        return res.status(500).json({ success: false, error: "Registration failed, user rolled back." + err });
    }

};

export const verify = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}
