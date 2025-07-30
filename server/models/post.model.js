import mongoose from "mongoose";

// models/Post.js
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    shareCount: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});
const Post = mongoose.model('postschemas', PostSchema);
export default Post;
