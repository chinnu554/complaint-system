import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongoDb.js";
import authRoutes from "./src/routes/auth.js";
import complaintRoutes from "./src/routes/complaint.js";
import {verifyToken} from "./src/util/jwt.js";
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use("/api/auth",authRoutes);
app.use("/api/complaints",verifyToken,complaintRoutes);