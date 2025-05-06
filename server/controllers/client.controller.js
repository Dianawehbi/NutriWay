import Client from "../models/Client.model.js";
import User from "../models/User.model.js";

const AddClientInfo = async (req, res) => {
    try {
        const { user_id, age, gender, height, weight, goal, activityLevel, waterIntake } = req.body;

        // Check if user exists
        const existingUser = await User.findById(user_id);
        if (!existingUser) {
            return res.status(400).json({ success: false, error: "User ID does not exist!" });
        }

        const client = new Client({
            user_id,
            age,
            gender,
            height,
            weight,
            goal,
            activityLevel,
            waterIntake,
        });

        await client.save();
        return res.status(200).json({ success: true, message: 'Client information added successfully.' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const GetClientInfo = async (req, res) => {
    try {
        const clientId = req.params.id;

        if (!clientId) {
            return res.status(400).json({ success: false, message: "Client ID is required" });
        }

        const client = await Client.findOne({ user_id: clientId }).populate("user_id");
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        return res.status(200).json({ success: true, data: client });

    } catch (error) {
        console.error("GetClientInfo Error:", error.message);
        return res.status(500).json({ success: false, message: "Server error while getting client information" });
    }
};

const GetAllClientInfo = async (req, res) => {
    try {

        const client = await Client.find({}).populate("user_id");
        if (!client) {
            return res.status(404).json({ success: false, message: "Client not found" });
        }

        return res.status(200).json({ success: true, data: client });

    } catch (error) {
        console.error("GetClientInfo Error:", error.message);
        return res.status(500).json({ success: false, message: "Server error while getting client information" });
    }
};

const updateClientProfile = async (req, res) => {
    // try {
    //     const clientId = req.params.clientId;
    //     const { age, gender, height, weight, goal, activityLevel, waterIntake, dietType, dietPlan } = req.body;

    //     const updatedClient = await Client.findOneAndUpdate(
    //         { user: clientId },
    //         { age, gender, height, weight, goal, activityLevel, waterIntake, dietType, dietPlan },
    //         { new: true }
    //     );

    //     if (!updatedClient) {
    //         return res.status(404).json({ success: false, message: 'Client not found' });
    //     }

    //     res.status(200).json({ success: true, message: 'Profile updated successfully', data: updatedClient });
    // } catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }
};

export { AddClientInfo, GetClientInfo ,GetAllClientInfo}