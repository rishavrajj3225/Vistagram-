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

const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const posts = await Post.find().maxTimeMS(10000).skip(skip).limit(limit); // Fetches all posts
        // console.log(posts);
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts: posts,
        });
    } catch (error) {
        return new apiResponse(res, 500, "Server error", null, error.message);
    }
};

const deletePost = async (req, res) => {
    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({ message: "postId is required" });
    }

    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await post.deleteOne();
        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { toggleLike, incrementShareCount, getAllPosts, deletePost };