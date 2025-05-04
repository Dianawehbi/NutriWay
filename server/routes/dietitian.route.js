import express from 'express';
import {updateDietitianStatus, GetAllDietitiansInfo ,  GetDietitianInfo, updateDietitian, GetDietitianServices } from '../controllers/dietitian.controller.js'
const router = express.Router()

// More specific routes first
router.get('/all', GetAllDietitiansInfo);                 
router.put('/update/status/:id', updateDietitianStatus); 
router.get('/service/:userId', GetDietitianServices);             
router.put('/update/:id', updateDietitian);              
router.get('/:id', GetDietitianInfo);                   

// router.post('/client-add-information', AddClientInfo);

export default router; 