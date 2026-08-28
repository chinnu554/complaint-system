import cloudinary from "../config/cloudinary.js";

export const uploadComplaintImage = async (file) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: "ComplaintImages",
        });
        return result;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
};