import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    evidenceImage:{
        type:String,
        trim:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{
        type:mongoose.Schema.ObjectId,
        ref:"Comment"
    }]
})

const Complaint = mongoose.model("Complaint",complaintSchema);

export default Complaint;