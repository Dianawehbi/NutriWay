import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import bcrypt from 'bcrypt'
import Dietitian from "../models/Dietitian.model.js";
import Service from "../models/Services.model.js";
import Client from '../models/Client.model.js';

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
    let newUser;
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "Email already registered." });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phoneNumber,
            role: "client"
        }).save();

        const newClient = new Client({
            user_id: newUser._id,
            age: req.body.age || "",
            gender: req.body.gender || "",
            height: req.body.height || "",
            weight: req.body.weight || "",
            goal: req.body.goal || "",
            activityLevel: req.body.activityLevel || "",
            waterIntake: req.body.waterIntake || "",
            dietPlan: ""
        });

        await newClient.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (err) {
        if (newUser?._id) {
            await User.findByIdAndDelete(newUser._id);
        }
        console.error("User Registration Error:", err);
        return res.status(500).json({ success: false, error: "Registration failed, user rolled back. " + err.message });
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
                    dietitian_id: newDietitian._id,
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

export const deleteUser = async (req, res) => {
    const { id } = req.params;  // The `id` you are passing will be the `dietitian._id` or `client._id`
    let user;
    try {
        // Check and delete from Dietitian
        const dietitian = await Dietitian.findById(id).populate("user_id");  // Use `findById` instead of `findOne`
        if (dietitian) {
            let dietitian_id = dietitian.user_id._id;
            await Dietitian.findByIdAndDelete(dietitian._id);
            user = await User.findByIdAndDelete(dietitian_id)
        }

        // Check and delete from Client
        const client = await Client.findById(id).populate("user_id");;  // Use `findById` instead of `findOne`
        if (client) {
            let client_id = client.user_id._id;
            await Client.findByIdAndDelete(client._id);
            user = await User.findByIdAndDelete(client_id)
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({ success: true, message: "User and related profile deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ success: false, message: "Server error while deleting user." });
    }
};



export const verify = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user })
}
