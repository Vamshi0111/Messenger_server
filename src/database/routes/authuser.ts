import { Router } from "express";
import users from "../model/users"; // Adjust path as needed
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const userAuthRouter = Router();

const secret = process.env.jwtsecretkey || 'default_secret'; // Fallback to 'default_secret' if not set

userAuthRouter.post('/login', async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Validate the request body
        if (!user_name || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find the user by username
        const findUser = await users.findOne({ where: { user_name } });

        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare provided password with stored hashed password
        const valid = await bcrypt.compare(password, findUser.password_hashed);

        if (valid) {
            // Generate JWT token
            const token = jwt.sign(
                {
                    user_name: findUser?.user_name,
                    name: findUser?.name,
                    id:findUser?.user_id

                },
                secret,
                { expiresIn: "24h" }
            );

            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default userAuthRouter;
