import User from "../models/user.js";
import { hashPassword, comparePassword } from "../util/bcrypt.js";
import { generateToken } from "../util/jwt.js";

export const registerUser = async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        console.log(req.body);
        if(!username || !email || !password){
            return res.status(400).json({message:"Please fill all the fields",success:false});
        }
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(400).json({message:"User already exists",success:false});
        }
        const hashedPassword = await hashPassword(password);
        const token = generateToken({email});
        const newUser = await User.create({username,email,password:hashedPassword ,token});
        res.status(201).json({message:"User registered successfully",success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in registering user",success:false});
    }
}

export const LoginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields",success:false});
        }
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(404).json({message:"User does not exist",success:false});
        }
        const isPasswordMatch = await comparePassword(password,checkUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:"Invalid credentials",success:false});
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
        res.status(200).json({message:"User logged in successfully",user:userData ,success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error in logging in user",success:false});
    }
}

export const getVerified = (req,res) =>{
    try{
        const user = req.user;
        return res.status(200).json({message:"User verified successfully",user:user,success:true});
    }

    catch(err){
        console.log(err);
        res.status(500).json({message:"error occured while verifiying",err:err,success:false});
    }
}