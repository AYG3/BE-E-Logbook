import express from "express";
import { createLogbook, updateUserLogbook, getUserLogbooks, deleteUserLogbook } from "../controller/logbookController.js";
import { protect } from '../middleware/protect.js'

const router = express.Router()

router.post('/logbookEntry', protect, createLogbook)
router.get('/userLogbooks/:userId', protect, getUserLogbooks)
router.get('/userLogbook/:entryId', protect, getUserLogbooks)
router.put('/editLogbook/:entryId', protect, updateUserLogbook)
router.delete('/deleteLogbook/:entryId', protect, deleteUserLogbook)

export default router;