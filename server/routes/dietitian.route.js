import express from 'express';
import { GetDietitianInfo , updateDietitian} from '../controllers/dietitian.controller.js'
const router = express.Router()

router.get('/' , GetDietitianInfo)

router.put('/update/:id' , updateDietitian);

// router.post('/client-add-information', AddClientInfo);

export default router; 