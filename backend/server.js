import express from "express";
import cors from "cors";
import connectDB from "./src/config/mongoDb.js";
import authRoutes from "./src/routes/auth.js";
import complaintRoutes from "./src/routes/complaint.js";
import {verifyToken} from "./src/util/jwt.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import rateLimiter from "./src/middlewares/ratelimiter.js";
connectDB();
const app = express();
app.use(rateLimiter);
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

app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);