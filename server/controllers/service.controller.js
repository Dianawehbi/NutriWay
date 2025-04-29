import Service from "../models/Services.model.js";

// Add Service
const addService = async (req, res) => {
    try {
        const { name, duration } = req.body;
        const newService = new Service({
            name,
            duration
        });

        await newService.save();
        return res.status(200).json({ success: true, service: newService });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Add Service server error" });
    }
};

// Get All Services
const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        return res.status(200).json({ success: true, services });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Get Services server error" });
    }
};

// Get Service By ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ success: false, error: "Service not found" });
        }
        return res.status(200).json({ success: true, service });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while fetching service" });
    }
};

// Update Service
const updateService = async (req, res) => {
    const { id } = req.params;
    const newServiceData = req.body;

    try {
        const updatedService = await Service.findByIdAndUpdate(
            id,
            newServiceData,
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ success: false, message: "Service not found" });
        }

        res.status(200).json({ success: true, service: updatedService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete Service
const deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, service });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Delete Service server error" });
    }
};

export { addService, getServices, getServiceById, updateService, deleteService };
