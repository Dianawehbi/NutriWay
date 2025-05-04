import express from 'express';
import { GetAvailabilityByDietitianId, AddAvailabilityForDietitian , GetAvailability} from '../controllers/availability.controller.js';
const router = express.Router()

router.get("/", GetAvailability);
router.get("/id", GetAvailabilityByDietitianId);
router.post("/add", AddAvailabilityForDietitian);

export default router;
