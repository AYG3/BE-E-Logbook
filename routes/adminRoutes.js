import express from 'express'
import { adminComment, adminGetAllUsers, adminGetUserLogbooks } from '../controller/adminController.js';
import { isAdmin, protect } from '../middleware/protect.js';


const router = express.Router();

router.get('/admin/users', protect, isAdmin, adminGetAllUsers)
router.get('/admin/user/logbooks/:userId', protect, isAdmin, adminGetUserLogbooks)
router.put('/admin/addComment/:entryId', protect, isAdmin, adminComment)

export default router;