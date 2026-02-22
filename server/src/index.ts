import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoute';
import { connectDB } from './config/db';

dotenv.config();
connectDB();
const port = process.env.PORT || 3000;

const app = express();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    }
));
app.use(express.json());

// trigger route to prevent render from sleeping
app.get("/api/trigger", (_, res) => {
    res.json({ status: "OK", service: "running" });
});

app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));