import express from 'express';
import { GetDietitianInfo} from '../controllers/dietitian.controller.js'
const router = express.Router()

router.get('/' , GetDietitianInfo)

// router.post('/client-add-information', AddClientInfo);

export default router; 