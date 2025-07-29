import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken");
        window.location.href = '/login';
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                        Vistagram
                    </span>
                </a>
                <div className="hidden md:block">
                    <ul className="flex space-x-10 text-xl font-medium text-gray-700 dark:text-gray-200 ">
                        <li>
                            <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                                Home
                            </a>
                        </li>
                        {isLoggedIn && (
                            <li>
                                <a href="/create" className="hover:text-blue-600 dark:hover:text-blue-400">
                                    Create Post
                                </a>
                            </li>
                        )}

                        {isLoggedIn ? (
                            <>
                                <li>
                                    <a href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400">
                                        Profile
                                    </a>
                                </li>
                                <li>
                                    <a href="/logout" onClick={handleLogout} className="hover:text-blue-600 dark:hover:text-blue-400">
                                        Logout
                                    </a>
                                </li>
                            </>


                        ) : (
                            <>
                                <li>
                                    <a href="/login" className="hover:text-blue-600 dark:hover:text-blue-400">
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a href="/signup" className="hover:text-blue-600 dark:hover:text-blue-400">
                                        Signup
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
