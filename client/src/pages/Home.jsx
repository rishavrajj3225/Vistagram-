import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/posts/all")
      .then((res) => {
        setPosts(Array.isArray(res.data.posts) ? res.data.posts : []);
      })
      .catch((err) => {
        console.error("Error fetching posts", err);
        setPosts([]);
      });
  }, []);

  const handleLikeToggle = async (postId) => {
    if (!postId) {
      console.error("postId is undefined");
      return;
    }
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const wasLiked = post.isLikedByCurrentUser;
          // Create a new post object to avoid state mutation
          return {
            ...post,
            isLikedByCurrentUser: !wasLiked,
            likes: {
              ...post.likes,
              length: wasLiked
                ? (post.likes?.length || 1) - 1
                : (post.likes?.length || 0) + 1,
            },
          };
        }
        return post;
      })
    );

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }
      // console.log(`Bearer ${token}`);
      await axios.put(
        `http://localhost:3000/api/v1/posts/like`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error toggling like", err);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const wasLiked = !post.isLikedByCurrentUser; // Revert the logic
            return {
              ...post,
              isLikedByCurrentUser: !wasLiked,
              likes: {
                ...post.likes,
                length: wasLiked
                  ? (post.likes?.length || 1) - 1
                  : (post.likes?.length || 0) + 1,
              },
            };
          }
          return post;
        })
      );
    }
  };
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">📸 Recent Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div
          key={post._id}
          className="mb-6 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img src={post.imageUrl} alt="post" className="w-full h-auto" />
          <div className="p-4">
            <p className="mt-2 text-gray-800">{post.caption}</p>
            <button
              className={`mt-2 px-4 py-2 ${post.isLikedByCurrentUser ? "bg-red-500" : "bg-blue-500"
                } text-white rounded hover:opacity-90`}
              onClick={() => handleLikeToggle(post._id)}
            >
              {post.isLikedByCurrentUser ? "Dislike" : "Like"} ({post.likes?.length})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
