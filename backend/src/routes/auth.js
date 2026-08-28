import express from "express";
import { registerUser, LoginUser ,getVerified } from "../controller/auth.js";
import { verifyToken } from "../util/jwt.js";

const router = express.Router();    

router.post("/register",registerUser);
router.post("/login",LoginUser);
router.post("/me",verifyToken,getVerified);


export default router;