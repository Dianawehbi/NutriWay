import express from 'express';
import { addAppointment, getAppointments , updateAppointment ,getAppointmentByClientId, getAppointmentsByDietitianUserId} from '../controllers/appointment.controller.js';

const router = express.Router()

router.get('/', getAppointments);
router.post('/add', addAppointment);
router.get('/client/:client_id', getAppointmentByClientId);
router.get('/dietitian/:user_id', getAppointmentsByDietitianUserId);
router.put('/update/:id' , updateAppointment);

// router.post('/delete/:id', deleteRecipe);
// update / delete / select by id / 

export default router; 