import express from 'express';
import { signUp, login, forgotPassword, resetPassword, adminSignUp, adminLogin, getUser } from '../controller/authcontroller.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/signup', signUp )
router.post('/login', login )
router.post('/forgotpassword', forgotPassword)
router.put('/restpassword/:resettoken', resetPassword)

//admin
router.post('/adminSignup', adminSignUp)
router.post('/adminLogin', adminLogin)

//get user details
router.get('/user/:id', protect, getUser)

//reset password
router.post('/forgotPassword', forgotPassword)
// router.post()
export default router;
