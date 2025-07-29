import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 400,
    facingMode: "user",
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const captureFromWebcam = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      fetch(screenshot)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
          setImage(file);
          setPreview(screenshot);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption) {
      alert("Please select or capture an image and enter a caption.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/posts/create", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Post uploaded successfully!");
        setImage(null);
        setPreview(null);
        setCaption('');
      } else {
        alert(data?.message || "Failed to upload post.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
      navigate('/')
    }
  };

return (
    <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center"> Create a Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            {!useWebcam ? (
                <div>
                    <span className="block mb-1 font-medium text-center">Choose Image</span>
                    <div className="flex items-center justify-center space-x-2">
                        <label className="block">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                        </label>
                        <button
                            type="button"
                            className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 whitespace-nowrap"
                            onClick={() => setUseWebcam(true)}
                        >
                            Use Webcam
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="rounded border shadow-md mx-auto"
                    />
                    <div className="mt-2 flex justify-center space-x-2">
                        <button
                            type="button"
                            onClick={captureFromWebcam}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                        >
                            Capture
                        </button>
                        <button
                            type="button"
                            onClick={() => setUseWebcam(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Use File
                        </button>
                    </div>
                </div>
            )}

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="w-28 h-28 mx-auto mt-2 rounded shadow-md"
                />
            )}

            <textarea
                placeholder="Write your caption here..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full border rounded p-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
            >
                {loading ? "Uploading..." : "Post"}
            </button>
        </form>
    </div>
);
}

export default CreatePost;
