import express from "express";
import { createLogbook, updateUserLogbook, getUserLogbooks, deleteUserLogbook, getUserLogbook } from "../controller/logbookController.js";
import { isAdmin, protect } from '../middleware/protect.js'

const router = express.Router()

router.post('/logbookEntry', protect, createLogbook)
router.get('/userLogbooks/:userId', protect, getUserLogbooks)
router.get('/userLogbook/:entryId', protect, getUserLogbook)
router.put('/editLogbook/:entryId', protect, updateUserLogbook)
router.delete('/deleteLogbook/:entryId', protect, deleteUserLogbook)


router.get('/admin/users', protect, isAdmin, getAllUsers)

export default router;