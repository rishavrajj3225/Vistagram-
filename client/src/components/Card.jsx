import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ post, onLikeToggle, onShare, isLoggedIn }) => {
    const navigate = useNavigate();

    const handleLike = () => {
        if (isLoggedIn()) { // Call the function to check login status
            onLikeToggle(post._id);
        } else {
            navigate("/login");
        }
    };

    const handleShare = () => {
        if (isLoggedIn()) { // Call the function to check login status
            onShare(post._id);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="mb-4 bg-white shadow rounded-lg overflow-hidden max-w-xs">
            <img src={post.imageUrl} alt="post" className="w-full h-80 object-cover" />
            <div className="p-3">
                <p className="text-sm text-gray-800">{post.caption}</p>
                <div className="mt-3 flex gap-2">
                    <button
                        className={`px-2 py-2 rounded text-xs text-white transition-colors ${
                            post.isLikedByCurrentUser ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                        } ${!isLoggedIn() ? "opacity-75 cursor-pointer" : ""}`}
                        onClick={handleLike}
                        title={!isLoggedIn() ? "Login required" : ""}
                    >
                        {post.isLikedByCurrentUser ? "Dislike" : "Like"} ({post.likes?.length || 0})
                    </button>
                    <button
                        className={`px-2 py-2 bg-green-600 text-xs text-white rounded transition-colors hover:bg-green-700 ${
                            !isLoggedIn() ? "opacity-75 cursor-pointer" : ""
                        }`}
                        onClick={handleShare}
                        title={!isLoggedIn() ? "Login required" : ""}
                    >
                        Share ({post.shareCount || 0})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;