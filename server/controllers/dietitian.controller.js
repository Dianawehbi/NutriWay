import Dietitian from "../models/dietitian.model.js";
import User from "../models/User.model.js";

const updateDietitianProfile = async (req, res) => {
    try {
        const dietitianId = req.params.dietitianId;
        const { specialization, experience, certification, profile_img, clinic_address } = req.body;

        const updatedDietitian = await Dietitian.findOneAndUpdate(
            { user: dietitianId },
            { specialization, experience, certification, profile_img, clinic_address },
            { new: true }
        );

        if (!updatedDietitian) {
            return res.status(404).json({ success: false, message: 'Dietitian not found' });
        }

        res.status(200).json({ success: true, message: 'Profile updated successfully', data: updatedDietitian });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const GetDietitianInfo = async (req, res) => {
  try {
    const dietitianUserId = req.query.id;
    // Find dietitian by user_id
    const dietitian = await Dietitian.findOne({ user_id: dietitianUserId });
    if (!dietitian) {
      return res.status(400).json({ success: false, message: "Dietitian not found" });
    }

    // Find the related user
    const user = await User.findById(dietitian.user_id);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Combine data
    const combinedData = {
      userId: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      specialization: dietitian.specialization,
      experience: dietitian.experience,
      certification: dietitian.certification,
      profile_img: dietitian.profile_img,
      clinic_address: dietitian.clinic_address,
      languages: dietitian.languages,
      services: dietitian.services,
      clientsWorkedWith: dietitian.clientsWorkedWith,
      education: dietitian.education,
      status: dietitian.status,
    };

    return res.status(200).json({ success: true, dietitian: combinedData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while fetching dietitian information  ||  " + error });
  }
};

