import express from 'express';
import { GetAvailabilityByDietitianId, AddAvailabilityForDietitian , GetAvailability  , updateAvailability} from '../controllers/availability.controller.js';
const router = express.Router()

router.get("/", GetAvailability);
router.post("/add", AddAvailabilityForDietitian);
router.put('/update/:id' , updateAvailability);
router.get("/:id", GetAvailabilityByDietitianId);


export default router;
