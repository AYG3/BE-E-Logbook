import express from "express";
import { createLogbook, updateUserLogbook, getUserLogbooks, deleteUserLogbook, getUserLogbook, userDetails } from "../controller/logbookController.js";
import { protect } from '../middleware/protect.js'

const router = express.Router()

// router.get('/userDetails/:id', protect, userDetails);
router.get('/userDetails/:id', userDetails);
router.post('/logbookEntry', protect, createLogbook)
router.get('/userLogbooks/:userId', protect, getUserLogbooks)
router.get('/userLogbook/:entryId', protect, getUserLogbook)
router.put('/editLogbook/:entryId', protect, updateUserLogbook)
router.delete('/deleteLogbook/:entryId', protect, deleteUserLogbook)






export default router;