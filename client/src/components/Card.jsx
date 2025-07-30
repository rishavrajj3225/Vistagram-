import React from "react";

const Post = ({ post, onLikeToggle, onShare }) => {
    return (
        <div className="mb-4 bg-white shadow rounded-lg overflow-hidden max-w-xs">
            <img src={post.imageUrl} alt="post" className="w-full h-80 object-cover" />
            <div className="p-3">
                <p className="text-sm text-gray-800">{post.caption}</p>
                <div className="mt-3 flex gap-2">
                    <button
                        className={`px-2 py-2 rounded text-xs text-white ${post.isLikedByCurrentUser ? "bg-red-500" : "bg-blue-500"}`}
                        onClick={() => onLikeToggle(post._id)}
                    >
                        {post.isLikedByCurrentUser ? "Dislike" : "Like"} ({post.likes?.length || 0})
                    </button>
                    <button
                        className="px-2 py-2 bg-green-600 text-xs text-white rounded hover:opacity-90"
                        onClick={() => onShare(post._id)}
                    >
                        Share ({post.shareCount || 0})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
