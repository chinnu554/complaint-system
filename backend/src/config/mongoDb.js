import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_STRING;
const connectDB = async () => {
try{
 await mongoose.connect(url);
 console.log("mongodb is connected successfully");
 
}
catch(err){
    console.log(err);
}
}


export default connectDB;