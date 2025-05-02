import express from 'express';
import {GetAllDietitiansInfo ,  GetDietitianInfo, updateDietitian, GetDietitianServices } from '../controllers/dietitian.controller.js'
const router = express.Router()

router.get('/', GetDietitianInfo)
router.get('/all', GetAllDietitiansInfo)
router.put('/update/:id', updateDietitian);
router.get('/service', GetDietitianServices)
// router.post('/client-add-information', AddClientInfo);

export default router; 