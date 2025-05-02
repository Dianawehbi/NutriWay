import express from 'express';
import { GetAvailabilityByDietitianId, AddAvailabilityForDietitian } from '../controllers/availability.controller.js';
const router = express.Router()

router.get("/", GetAvailabilityByDietitianId);
router.post("/availability/add", AddAvailabilityForDietitian);

export default router;