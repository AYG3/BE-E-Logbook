import express from "express";
import { createLogbook, updateUserLogbook, getUserLogbooks, deleteUserLogbook } from "../controller/logbookController.js";
import { protect } from '../middleware/protect.js'

const router = express.Router()

router.post('/logbookEntry', protect, createLogbook)
router.get('/userLogbooks', protect, getUserLogbooks)
router.put('/editLogbook', protect, updateUserLogbook)
router.delete('/deleteLogbook', protect, deleteUserLogbook)

export default router;