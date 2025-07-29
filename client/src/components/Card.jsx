import React from "react";

const Post = ({ post, onLikeToggle, onShare }) => {
    return (
        <div className="mb-6 bg-white shadow-md rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt="post" className="w-full h-auto" />
            <div className="p-4">
                <p className="mt-2 text-gray-800">{post.caption}</p>

                <div className="mt-4 flex gap-4">
                    <button
                        className={`px-4 py-2 rounded text-white ${post.isLikedByCurrentUser ? "bg-red-500" : "bg-blue-500"}`}
                        onClick={() => onLikeToggle(post._id)}
                    >
                        {post.isLikedByCurrentUser ? "Dislike" : "Like"} ({post.likes?.length || 0})
                    </button>

                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded hover:opacity-90"
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
