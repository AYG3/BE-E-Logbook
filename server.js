import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import logbookRoutes from './routes/logbookRoutes.js'

import dotenv from 'dotenv';
import cors from 'cors'


dotenv.config();


const app = express();
app.use(cors())

connectDB()
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/logbook', logbookRoutes)

export default app;