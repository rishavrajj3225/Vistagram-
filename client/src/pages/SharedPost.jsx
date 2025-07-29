// src/pages/SharedPostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SharedPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                console.log("Fetched post data:", postId);
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/${postId}`);
                setPost(res.data.post);
            } catch (err) {
                console.error("Error fetching post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <div>Loading...</div>;
    if (!post) return <div>Post not found.</div>;

    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto", border: "1px solid #ccc", padding: "1rem", borderRadius: "10px" }}>
            <img src={post.imageUrl} alt="Shared post" style={{ width: "100%", borderRadius: "10px" }} />
            <p><strong>Caption:</strong> {post.caption}</p>
            <p><strong>Likes:</strong> {post.likeCount} | <strong>Shares:</strong> {post.shareCount}</p>
        </div>
    );
};

export default SharedPost;
