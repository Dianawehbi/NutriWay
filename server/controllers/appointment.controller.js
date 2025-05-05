import Appointment from "../models/Appointment.model.js";
import mongoose from "mongoose";
import Availability from "../models/availability.model.js";
import Dietitian from "../models/Dietitian.model.js";

const addAppointment = async (req, res) => {
    try {
        const { availabilityId, client_id, status } = req.body;
        const newAppointment = new Appointment({
            client_id,
            availability_id: availabilityId,
            status,
        })

        await newAppointment.save()
        return res.status(200).json({ success: true, appointment: newAppointment })
    } catch (error) {
        return res.status(500).json({ success: false, error: "add appointment server error" })
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate({
                path: "availability_id",
                populate: [
                    {
                        path: "dietitian_id",
                        populate: { path: "user_id" }, // Populate user inside dietitian
                    },
                    {
                        path: "serviceId", // Populate the service
                    },
                ],
            })
            .populate("client_id"); // Populate the client (user)

        if (!appointments.length) {
            return res.status(404).json({ success: false, error: "No appointments found" });
        }

        res.status(200).json({ success: true, data: appointments });

    } catch (err) {
        console.error("Error fetching all appointments:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

const getAppointmentByClientId = async (req, res) => {
    const { client_id } = req.params;

    try {
        const appointments = await Appointment.find({ client_id: new mongoose.Types.ObjectId(client_id) })
            .populate(
                {
                    path: "availability_id",
                    populate: [
                        {
                            path: "dietitian_id",
                            populate: { path: "user_id" }, // populate dietitian's user
                        },
                        {
                            path: "serviceId", // populate service details
                        },
                    ],
                });

        if (!appointments || appointments.length == 0) {
            return res.status(404).json({ success: false, error: "No appointments found" });
        }

        res.status(200).json({ success: true, appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ success: false, error: "Server error while fetching appointments" });
    }
};

const getAppointmentsByDietitianUserId = async (req, res) => {
    const { user_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ success: false, error: "Invalid user_id" });
    }

    try {
        // Step 0: Find the dietitian using user_id
        const dietitian = await Dietitian.findOne({ user_id });

        if (!dietitian) {
            return res.status(404).json({ success: false, error: "No dietitian found for this user" });
        }

        const dietitian_id = dietitian._id;

        // Step 1: Find all availability slots for the given dietitian
        const availabilities = await Availability.find({ dietitian_id }).select("_id");
        const availabilityIds = availabilities.map(avail => avail._id);

        if (availabilityIds.length === 0) {
            return res.status(404).json({ success: false, error: "No availabilities found for this dietitian" });
        }

        // Step 2: Find appointments linked to those availabilities
        const appointments = await Appointment.find({ availability_id: { $in: availabilityIds } })
            .populate({
                path: "availability_id",
                populate: [
                    {
                        path: "dietitian_id",
                        populate: { path: "user_id" },
                    },
                    {
                        path: "serviceId",
                    }
                ]
            })
            .populate("client_id");

        if (!appointments.length) {
            return res.status(404).json({ success: false, error: "No appointments found for this dietitian" });
        }

        res.status(200).json({ success: true, data: appointments });

    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).json({ success: false, error: "Server error" });
    }
};



const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const newAppointment = req.body;

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id,
            newAppointment,
            { new: true } // to return the updated document
        );

        if (!updatedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, appointment: updatedAppointment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { addAppointment, getAppointments, updateAppointment, getAppointmentByClientId, getAppointmentsByDietitianUserId }

