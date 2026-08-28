import User from "../models/user.js";
import { hashPassword, comparePassword } from "../util/bcrypt.js";
import { generateToken } from "../util/jwt.js";
import { verifyToken } from "../util/jwt.js";

export const registerUser = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.json({message:"Please fill all the fields"});
        }
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({message:"User already exists"});
        }
        const hashedPassword = await hashPassword(password);
        const token = generateToken({email});
        const newUser = await User.create({username,email,password:hashedPassword ,token});
        res.json({message:"User registered successfully",user:newUser});
    }
    catch(err){
        console.log(err);
        res.json({message:"Error in registering user"});
    }
}

export const LoginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.json({message:"Please fill all the fields"});
        }
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.json({message:"User does not exist"});
        }
        const isPasswordMatch = await comparePassword(password,checkUser.password);
        if(!isPasswordMatch){
            return res.json({message:"Invalid credentials"});
        }
        const token = generateToken({
            userId : checkUser._id,
            username:checkUser.username,
            email:checkUser.email
            });
        const userData = {
            userId: checkUser._id,
            username: checkUser.username,
            email: checkUser.email,
            token: token
        };
        res.json({message:"User logged in successfully",user:userData});
    }
    catch(err){
        console.log(err);
        res.json({message:"Error in logging in user"});
    }
}

export const getVerified = (req,res) =>{
    try{
        const user = req.user;
        return res.json({message:"User verified successfully",user:user});
    }

    catch(err){
        console.log(err);
        res.json({message:"error occured while verifiying",err:err});
    }
}