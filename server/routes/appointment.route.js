import express from 'express';
import { addAppointment, getAppointments , updateAppointment } from '../controllers/appointment.controller.js';

const router = express.Router()

router.get('/', getAppointments);

// router.get('/:id', getRecipeById);

router.post('/add', addAppointment);

router.put('/update/:id' , updateAppointment);

// router.post('/delete/:id', deleteRecipe);
// update / delete / select by id / 

export default router; 