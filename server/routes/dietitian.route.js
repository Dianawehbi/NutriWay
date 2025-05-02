import express from 'express';
import { GetDietitianInfo, updateDietitian, GetDietitianServices } from '../controllers/dietitian.controller.js'
const router = express.Router()

router.get('/', GetDietitianInfo)

router.put('/update/:id', updateDietitian);
router.get('/service', GetDietitianServices)
// router.post('/client-add-information', AddClientInfo);

export default router; 