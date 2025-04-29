import express from 'express';
import { addService, getServices, getServiceById, updateService, deleteService } from '../controllers/service.controller.js'

const router = express.Router()

router.get('/', getServices);

// router.get('/:id', getServiceById);

router.post('/add', addService)

router.put('/update/:id', updateService);

router.post('/delete/:id', deleteService);

export default router; 