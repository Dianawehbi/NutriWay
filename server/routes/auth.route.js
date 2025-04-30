import express from 'express';
import { Login, verify ,userRegister , dietitianRegister} from '../controllers/auth.controller.js';
import verifyUser from '../middleware/authMiddleware.js';


const router = express.Router()

router.post('/login', Login)
router.get('/verify', verifyUser, verify);
router.post('/userRegister', userRegister)
router.post('/dietitianRegister', dietitianRegister)

export default router;