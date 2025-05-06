import express from 'express';
import {AddClientInfo , GetClientInfo , GetAllClientInfo} from '../controllers/client.controller.js'
const router = express.Router()

router.get('/' , GetAllClientInfo)
router.post('/client-add-information', AddClientInfo);
router.get('/:id' , GetClientInfo)

export default router; 