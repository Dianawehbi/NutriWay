import express from 'express';



const router = express.Router()

router.post('/login', Login)
router.get('/verify', verifyUser, verify);
// for example in recipes i have :
// update / add / delete / select all  / select by id / 

export default router;