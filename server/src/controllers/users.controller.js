import bcrypt from "bcryptjs";
import crypto from "crypto";
import httpStatus from "http-status";
import UserModel from "../models/users.model.js";


// register
export const registerController = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name: name,
            username: username,
            password: hashedPassword
        });
        // ← removed newUser.save() — create() already saves to DB
        return res.status(httpStatus.CREATED).json({ message: "User created successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const loginController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Please provide username and password" });
    }
    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = crypto.randomBytes(64).toString("hex");
            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({
                message: "Login successful",
                token: token
            });
        }
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const logoutController = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: "Token is required" });
    }

    try {
        const user = await UserModel.findOne({ token });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Invalid token" });
        }

        user.token = null;
        await user.save();

        return res.status(httpStatus.OK).json({ message: "Logout successful" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}