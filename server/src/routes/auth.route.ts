import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        const existUser = await User.findOne({ email });

        if (existUser)
            return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                role: user.role,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" },
        );

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
});

export default router;
