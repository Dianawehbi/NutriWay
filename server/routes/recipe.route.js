import express from 'express';
import verifyUser from '../middleware/authMiddleware.js';
import { addRecipe, getRecipes, deleteRecipe, getRecipeById ,updateRecipe} from '../controllers/recipe.controller.js';

const router = express.Router()

router.get('/', getRecipes);

router.get('/:id', getRecipeById);

router.post('/add', addRecipe);

router.put('/update/:id' , updateRecipe);

router.post('/delete/:id', deleteRecipe);
// update / delete / select by id / 

export default router; 