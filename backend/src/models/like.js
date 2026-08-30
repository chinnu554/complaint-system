import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    complaintId:{
        type:mongoose.Schema.ObjectId,
        ref:"Complaint",
        required:true
    }
})

const Like = mongoose.model("Like",likeSchema);

export default Like;