import express from 'express';
import { addAppointment, getAppointments , updateAppointment ,getAppointmentByClientId} from '../controllers/appointment.controller.js';

const router = express.Router()

router.get('/', getAppointments);
router.post('/add', addAppointment);
router.get('/client/:id', getAppointmentByClientId);
// router.get('/dietitian/:id', getRecipeById);
router.put('/update/:id' , updateAppointment);

// router.post('/delete/:id', deleteRecipe);
// update / delete / select by id / 

export default router; 