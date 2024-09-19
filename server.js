import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import logbookRoutes from "./routes/logbookRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/logbook", logbookRoutes);
app.use("/logbook", adminRoutes);

connectDB();

export default app;
