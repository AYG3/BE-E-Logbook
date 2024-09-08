import express from 'express';
import { signUp, login, forgotPassword, resetPassword, adminSignUp, adminLogin, getUser } from '../controller/authcontroller.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/signup', signUp )
router.post('/login', login )
router.post('/forgotpassword', forgotPassword)
router.put('/restpassword/:resettoken', resetPassword)

router.post('/adminSignup', adminSignUp)
router.post('/adminLogin', adminLogin)

//get user details
router.get('/user/:id', protect, getUser)
export default router;
