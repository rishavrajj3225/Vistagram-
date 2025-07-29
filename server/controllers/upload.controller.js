// controllers/upload.controller.js
import { uploadToCloudinary } from "../utils/fileUpload.js";
import Post from "../models/post.model.js";
import {apiResponse} from "../utils/apiResponse.js";
export const uploadFile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json(new apiResponse(400, null, "No file uploaded"));
        }
        const userId = req.user._id; 
        const username = req.user.username; 
        const { caption } = req.body;
        if (!caption) {
            caption = " ";
        }
        const result = await uploadToCloudinary(req.file.buffer);
        // console.log("New post data:", result);
        // console.log("Cloudinary upload result:", result);
        const newPost = new Post({
            user: username,
            caption,
            imageUrl: result.secure_url,
            timestamp: new Date(),
        });
        await newPost.save();
        return res.status(200).json(new apiResponse(200, result, "Post created successfully"));

    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ error: "Failed to create post" });
    }
};
