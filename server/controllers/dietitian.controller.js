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

const getDietitianInfo = async (dietitianId) => {
    try {
        const dietitian = await Dietitian.findOne({ user: dietitianId }).populate("user");

        if (!dietitian) {
            throw new Error("Dietitian not found");
        }

        return dietitian;
    } catch (error) {
        throw new Error(error.message);
    }
};

