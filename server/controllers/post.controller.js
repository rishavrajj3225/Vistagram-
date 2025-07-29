import Post from "../models/post.model.js";
import { apiResponse } from "../utils/apiResponse.js";
const toggleLike = async (req, res) => {
    const userId = req.user._id;
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "postId is required" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likesCount: post.likes.length,
            liked: !alreadyLiked
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const incrementShareCount = async (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            console.error("postId is required");
            return res.status(400).json({ message: "postId is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.shareCount += 1;
        await post.save();

        const shareLink = `${process.env.CLIENT_URL}/posts/${post._id}`;
        res.status(200).json({
            message: "Share count updated",
            shareLink,
            currentShareCount: post.shareCount,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
export { toggleLike, incrementShareCount };