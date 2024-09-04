import express from 'express';
import { signUp, login, forgotPassword, resetPassword } from '../controller/authcontroller.js';

const router = express.Router();

router.post('/signup', signUp )
router.post('/login', login )
router.post('/forgotpassword', forgotPassword)
router.put('/restpassword/:resettoken', resetPassword)

export default router;
