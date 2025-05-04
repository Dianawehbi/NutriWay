import Appointment from "../models/Appointment.model.js";

const addAppointment = async (req, res) => {
    try {
        const { availabilityId, dietitian_id, client_id, appointmentDate, startTime, endTime, status } = req.body;
        const newAppointment = new Appointment({
            dietitian_id,
            client_id,
            availability_id: availabilityId,
            date: appointmentDate,
            start_time: startTime,
            end_time: endTime,
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
        const appointments = await Appointment.find().populate("dietitian_id").populate("client_id").populate("availability_id")
        return res.status(200).json({ success: true, appointments })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Get appointments server error" })
    }
}

const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ success: false, error: "Recipe not found" });
        }
        return res.status(200).json({ success: true, recipe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while fetching recipe" });
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


export { addAppointment, getAppointments , updateAppointment }

