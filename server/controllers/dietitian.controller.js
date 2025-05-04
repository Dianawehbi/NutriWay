import User from "../models/User.model.js";
import Dietitian from "../models/Dietitian.model.js";
import Service from "../models/Services.model.js";
import mongoose from "mongoose";
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
    return res.status(500).json({
      success: false,
      message: "Server error during update of Dietitian profile"
    });
  }
};

export const updateDietitianStatus = async (req, res) => {
  const { id } = req.params; // This should be dietitian's _id
  const newDietitian = req.body;

  try {
    const updatedDietitian = await Dietitian.findByIdAndUpdate(
      id,
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
    const dietitianUserId = req.params.id;

    const dietitian = await Dietitian.findOne({ user_id: dietitianUserId }).populate("user_id");

    if (!dietitian) {
      return res.status(400).json({ success: false, message: "Dietitian not found" });
    }

    res.status(200).json({ success: true, data: dietitian });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


export const GetAllDietitiansInfo = async (req, res) => {
  try {
    const dietitians = await Dietitian.find().populate("user_id");
    if (!dietitians) {
      return res.status(400).json({ success: false, message: "Dietitians not found" });
    }
    return res.status(200).json({ success: true, dietitians: dietitians });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching all dietitians information || " + error,
    });
  }
};


export const GetDietitianServices = async (req, res) => {
  const { userId } = req.params;

  try {
    const dietitian = await Dietitian.findOne({ user_id: userId });

    if (!dietitian) {
      return res.status(404).json({ success: false, message: "Dietitian not found." });
    }
    const services = await Service.find({
      "dietitian.dietitian_id": dietitian._id
    });

    if (!services || services.length === 0) {
      return res.status(400).json({ success: false, message: "This dietitian has no services." });
    }

    const filteredServices = services.map(service => {
      const matchedDietitian = service.dietitian.find(
        d => d.dietitian_id.toString() === dietitian._id.toString()
      );

      return {
        _id: service._id,
        name: service.name,
        duration: service.duration,
        dietitian: matchedDietitian
      };
    });

    return res.status(200).json({ success: true, services: filteredServices });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dietitian's services",
      error: error.message
    });
  }
};
