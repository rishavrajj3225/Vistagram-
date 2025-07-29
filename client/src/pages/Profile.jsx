import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            window.location.href = '/login';
            return;
        }
        axios
            .get("http://localhost:3000/api/v1/users/current", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                setUser(res.data.user);
                console.log("User data:", res.data.user);
            })
            .catch((err) => {
                console.error("Error fetching user", err);
                setUser(null);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">{user?.username}</h2>
                <p>Email: {user?.email}</p>

                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
