import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addAppointment} from '../controllers/appointment.controller.js';

const router = express.Router()

// router.get('/', getRecipes);

// router.get('/:id', getRecipeById);

router.post('/add', addAppointment);

// router.put('/update/:id' , updateRecipe);

// router.post('/delete/:id', deleteRecipe);
// update / delete / select by id / 

export default router; 