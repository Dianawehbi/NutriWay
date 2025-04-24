import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const verifyUser = async (req, res, next) => {
    // the problem her i cant reach this function
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provider" })
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)

        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token Not Valid" })
        }

        const user = await User.findById({ _id: decoded._id }).select('-password') // to select all values

        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" })
        }

        req.user = user;
        next(); //it mean it will continue the operation
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error during verify user" })
    }
}

export default verifyUser