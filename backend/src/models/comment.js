import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    complaintId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Complaint",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim:true
    }
    

},{
    timestamps:true,
})

export const Comment = mongoose.model("Comment",commentSchema);