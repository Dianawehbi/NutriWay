import express from 'express';
import { addBodyComposition, getBodyCompositionById } from '../controllers/bodycomposition.controller.js';

const router = express.Router()

router.post('/add', addBodyComposition);
router.get('/:id', getBodyCompositionById);

export default router; 