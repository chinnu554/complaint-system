import Complaint from "../models/complaint.js";
import { Comment } from "../models/comment.js";
import Like from "../models/like.js"
import { uploadComplaintImage } from "../util/images.js";
import { complaintSchema, idSchema, commentSchema } from "../validators/complaint.validator.js";

const createComplaint = async (req, res) => {
    try {
        const complaintValidation = complaintSchema.safeParse(req.body);
        if (!complaintValidation.success) {
            return res.status(400).json({ message: complaintValidation.error.issues[0].message, success: false });
        }
        const {title,description} = complaintValidation.data;
        const file = req.file;
        const {userId} = req.user;
        if (!title || !description || !userId) {
            return res.status(400).json({ message: "Title, description, and userId are required", success: false });
        }

        let imageUrl = "";
        if (file) {
            const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const result = await uploadComplaintImage(dataUri);
            imageUrl = result.secure_url;
        }

        await Complaint.create({ title, description, userId, evidenceImage: imageUrl });
        res.status(201).json({ message: "Complaint created successfully", success: true });
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
        console.log(error);
    }
};

const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().populate("userId", "username email");
        
        const complaintsWithLikes = [];

        for (const complaint of complaints) {

            const liked = await Like.findOne({
                complaintId: complaint._id,
                userId: req.user.userId
            });
            complaintsWithLikes.push({
                ...complaint.toObject(),
                likedByUser: liked ? true : false
            });
        
        }
        res.status(200).json(complaintsWithLikes);
    } catch (error) {
        res.status(400).json({ message: error.message, success: false });
    }
};

const getComplaintsByUserId = async (req,res) =>{
    try{
        const idValidation = idSchema.safeParse(req.params);
        if(!idValidation.success){
            return res.status(400).json({message:idValidation.error.issues[0].message, success: false});
        }
        const {id} = idValidation.data;
        const userExists = await User.findById(id);
        if (!userExists) {
            return res.status(404).json({message:"User not found", success: false});
        }
        const complaints = await Complaint.find({userId:id}).populate("userId").populate("comments");
        if(!complaints){
            return res.status(404).json({message:"No complaints found", success: false});
        }
        res.status(200).json(complaints);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message, success: false});
    }
}

const deleteComplaint = async(req,res)=>{
    try{
        const idValidation = idSchema.safeParse(req.params);
        if(!idValidation.success){
            return res.status(400).json({message:idValidation.error.issues[0].message, success: false});
        }
        const {id} = idValidation.data;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found", success: false});
        }
        if (complaint.userId.toString() !== req.user.userId) {
            return res.status(403).json({message:"Unauthorized to delete this complaint", success: false});
        }
        await Complaint.findByIdAndDelete(id);
        res.status(200).json({message:"Complaint deleted successfully", success: true});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message, success: false});
    }
}


const toggleLike = async(req,res) =>{
    try{
        const idValidation = idSchema.safeParse(req.params);
        if(!idValidation.success){
            return res.status(400).json({message:idValidation.error.issues[0].message, success: false});
        }
        const {id:complaintId} = idValidation.data;
        const userId = req.user.userId;
        const existingLike = await Like.findOne({userId:userId,complaintId:complaintId});
        if(existingLike){
            await Like.deleteOne({_id : existingLike._id});

            await Complaint.findOneAndUpdate({_id:complaintId},{$inc :{likes : -1}})
            return res.json({
                message:"like removed",
                success: true
            });
        }
        await Like.create({userId:userId,complaintId:complaintId,isLiked:true});

        await Complaint.findOneAndUpdate({_id:complaintId},{$inc:{likes:1}});

        return res.json({message:"like added", success: true});

    }
    catch(err){
        console.log(err);
        return res.json({message:"Error occured while liking", success: false})    }
}

const addComment = async(req,res)=>{
    try{
        const idValidation = idSchema.safeParse(req.params);
        if(!idValidation.success){
            return res.status(400).json({message:idValidation.error.issues[0].message, success: false});
        }
        const {id} = idValidation.data;
        const commentValidation = commentSchema.safeParse(req.body);
        if(!commentValidation.success){
            return res.status(400).json({message:commentValidation.error.issues[0].message, success: false});
        }
        const {comment} = commentValidation.data;
        const {userId} = req.user;
        if(!comment){
            return res.status(400).json({message:"Comment is required", success: false});
        }
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({message:"Complaint not found", success: false});
        }
        const newComment = await Comment.create({complaintId:id,userId,comment});
        await Complaint.findByIdAndUpdate(id,{$push:{comments:newComment._id}});
        res.status(201).json({message:"Comment added successfully",comment:newComment, success: true});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message, success: false});
    }
}

export {createComplaint,getAllComplaints,getComplaintsByUserId,deleteComplaint,toggleLike,addComment};
