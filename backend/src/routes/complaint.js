import {createComplaint,getAllComplaints,getComplaintsByUserId,deleteComplaint} from "../controller/complaint.js";
import {addComment,toggleLike} from "../controller/complaint.js";
import express from "express";
import upload from "../util/multer.js";

const router = express.Router();

router.post("/create", upload.single("evidenceImage"), createComplaint);
router.get("/all",getAllComplaints);
router.get("/:id",getComplaintsByUserId);
router.delete("/:id",deleteComplaint);
router.post("/:id/like",toggleLike);
router.post("/:id/comments",addComment);

export default router;