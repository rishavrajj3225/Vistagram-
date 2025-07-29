import mongoose from "mongoose";

// models/Post.js
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String
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
});
const Postschema = mongoose.model('postschemas', PostSchema);
export default Postschema;
