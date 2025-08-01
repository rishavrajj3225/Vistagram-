import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card"; // Updated import name

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add isLoggedIn function
  const isLoggedIn = () => {
    return !!localStorage.getItem("accessToken");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/all`,
          { headers }
        );

        setPosts(Array.isArray(res.data.posts) ? res.data.posts : []);
      } catch (err) {
        console.error("Error fetching posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLikeToggle = async (postId) => {
    // Check if user is logged in before proceeding
    if (!isLoggedIn()) {
      return; // Card component will handle redirect
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          const wasLiked = post.isLikedByCurrentUser;
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
      if (!token) return;

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/like`,
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error toggling like", err);
      // Revert on failure
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const wasLiked = !post.isLikedByCurrentUser;
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

  const handleShare = async (postId) => {
    // Check if user is logged in before proceeding
    if (!isLoggedIn()) {
      return; // Card component will handle redirect
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/posts/share`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { shareLink, currentShareCount } = response.data;

      await navigator.clipboard.writeText(shareLink);
      alert("Share link copied to clipboard!");

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, shareCount: currentShareCount }
            : post
        )
      );
    } catch (error) {
      console.error("Error sharing post:", error);
      alert("Failed to share post.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post._id}
              post={post}
              onLikeToggle={handleLikeToggle}
              onShare={handleShare}
              isLoggedIn={isLoggedIn} // Pass the function itself
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;