import express from "express";
import { createLogbook, getUserLogbooks } from "../controller/logbookController.js";
import { protect } from '../middleware/protect.js'

const router = express.Router()

router.post('/logbookEntry', protect, createLogbook)
router.get('/userLogbooks', protect, getUserLogbooks)


export default router;