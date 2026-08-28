import mongoose from "mongoose";

const   userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim :true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    collegeName:{
        type:String,
        trim:true
    },
    branch:{
        type:String,
        enum:["CSE","ECE","EEE","MECH","CIVIL"],
    },
    profileImage:{
        type:String,
        trim:true
    }
})

const User = mongoose.model("User",userSchema);
export default User;