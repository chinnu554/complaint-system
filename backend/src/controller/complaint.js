import Complaint from "../models/complaint.js";
import { Comment } from "../models/comment.js";
import User from "../models/user.js";
import upload from "../util/multer.js";
import Like from "../models/like.js"
import { uploadComplaintImage } from "../util/images.js";

const createComplaint = async (req, res) => {
    try {
        const file = req.file;
        const { title, description, userId } = req.body;

        if (!title || !description || !userId) {
            return res.status(400).json({ message: "Title, description, and userId are required" });
        }

        let imageUrl = "";
        if (file) {
            const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const result = await uploadComplaintImage(dataUri);
            imageUrl = result.secure_url;
        }
        console.log(imageUrl);

        await Complaint.create({ title, description, userId, evidenceImage: imageUrl });
        res.status(201).json({ message: "Complaint created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("userId", "username email");
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getComplaintsByUserId = async (req,res) =>{
    try{
        const {id} = req.params;
        const complaints = await Complaint.find({userId:id}).populate("userId").populate("comments");
        if(!complaints){
            return res.status(404).json({nessage:"No complaints found"});
        }
        res.status(200).json(complaints);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const deleteComplaint = async(req,res)=>{
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }   
        await Complaint.findByIdAndDelete(id);
        res.status(200).json({message:"Complaint deleted successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const likeComplaint = async(req,res)=>{
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }   
        await Complaint.findByIdAndUpdate(id,{$inc:{likes:1}});
        res.status(200).json({message:"Complaint liked successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const toggleLike = async(req,res) =>{
    try{
        const complaintId = req.params;
        const userId = req.user.userId;
        const existingLike = await Like.find({userId:userId,complaintId:complaintId});
        if(existingLike){
            await Like.deleteOne({_id : existingLike._id});

            await Complaint.findOneAndUpdate({_id:complaintId},{$inc :{likes : -1}})
            console.log("disliked");
            return res.json({
                message:"like removed"
            });
        }
        await Like.create({userId:userId,complaintId:complaintId});

        await Complaint.findOneAndUpdate({_id:complaintId},{$inc:{likes:1}});

        console.log("liked");

        return res.json({message:"like added"});

    }
    catch(err){
        console.log(err);
        return res.json({message:"Error occured while liking"})    }
}

const dislikeComplaint = async(req,res)=>{
    try{
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }   
        await Complaint.findByIdAndUpdate(id,{$inc:{dislikes:1}});
        res.status(200).json({message:"Complaint disliked successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const addComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const {userId,comment} = req.body;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found"});
        }
        const newComment = await Comment.create({complaintId:id,userId,comment});
        res.status(201).json({message:"Comment added successfully",comment:newComment});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

export {createComplaint,getAllComplaints,getComplaintsByUserId,deleteComplaint,toggleLike,addComment};