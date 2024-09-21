import express from 'express'
import { adminComment, adminGetAllUsers, adminGetUser, adminGetUserLogbooks } from '../controller/adminController.js';
import { isAdmin, protect } from '../middleware/protect.js';


const router = express.Router();

router.get('/users', protect, isAdmin, adminGetAllUsers)
router.get('/user/logbooks/:userId', protect, isAdmin, adminGetUserLogbooks)
router.put('/addComment/:entryId', protect, isAdmin, adminComment)
router.get('/getUser/:userId', adminGetUser);
export default router;