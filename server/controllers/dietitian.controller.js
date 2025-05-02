import User from "../models/User.model.js";
import Dietitian from "../models/Dietitian.model.js";
import Service from "../models/Services.model.js";

export const updateDietitian = async (req, res) => {
  const { id } = req.params;
  const newDietitian = req.body; // Use consistent casing

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      newDietitian,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const updatedDietitian = await Dietitian.findOneAndUpdate(
      { user_id: id },
      newDietitian,
      { new: true }
    );

    if (!updatedDietitian) {
      return res.status(404).json({ success: false, message: "Dietitian not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Dietitian updated successfully",
      data: {
        user: updatedUser,
        dietitian: updatedDietitian
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error during update of Dietitian profile"
    });
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
      _id: dietitian._id,
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
      clientsWorkedWith: dietitian.clientsWorkedWith,
      education: dietitian.education,
      status: dietitian.status,
    };

    return res.status(200).json({ success: true, dietitian: combinedData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while fetching dietitian information  ||  " + error });
  }
};


export const GetAllDietitiansInfo = async (req, res) => {
  try {
    // Find all dietitians
    const dietitians = await Dietitian.find();

    // Fetch all user info in parallel
    const combinedData = await Promise.all(
      dietitians.map(async (dietitian) => {
        const user = await User.findById(dietitian.user_id);
        if (!user) return null; // Skip if user not found

        return {
          _id: dietitian._id,
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
          clientsWorkedWith: dietitian.clientsWorkedWith,
          education: dietitian.education,
          status: dietitian.status,
        };
      })
    );

    // Filter out null results (if user was not found for some dietitians)
    const filteredData = combinedData.filter(Boolean);

    return res.status(200).json({ success: true, dietitians: filteredData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching all dietitians information || " + error,
    });
  }
};


export const GetDietitianServices = async (req, res) => {
  const { id } = req.params;

  try {

    const services = await Service.find({
      dietitian: {
        $elemMatch: { dietitian_id: id }
      }
    });

    if (!services) {
      return res.status(400).json({ success: false, message: "This dietitian has no services " })
    }

    return res.status(200).json({ success: true, services });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error while fetching dietitians services  ||  " + error });

  }
}