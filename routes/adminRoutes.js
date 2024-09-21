import express from 'express'
import { adminComment, adminDeleteUser, adminDetails, adminGetAllUsers, adminGetUser, adminGetUserLogbooks } from '../controller/adminController.js';
import { isAdmin, protect } from '../middleware/protect.js';


const router = express.Router();

router.get('/adminDetails/:id', adminDetails);
router.get('/users', protect, isAdmin, adminGetAllUsers);
router.get('/user/logbooks/:userId', protect, isAdmin, adminGetUserLogbooks);
router.put('/addComment/:entryId', protect, isAdmin, adminComment);
router.get('/getUser/:userId', protect, isAdmin, adminGetUser);
router.delete('/userDelete/:userId', protect, isAdmin, adminDeleteUser);

export default router;