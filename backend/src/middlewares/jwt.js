import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: "3h" });
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: token missing" });
    }


    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: invalid token" });
    }
};
