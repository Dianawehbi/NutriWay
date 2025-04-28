import express from 'express';
import {AddClientInfo , GetClientInfo} from '../controllers/client.controller.js'
const router = express.Router()

router.get('/' , GetClientInfo)

router.post('/client-add-information', AddClientInfo);
// update / delete / select by id / 

export default router; 