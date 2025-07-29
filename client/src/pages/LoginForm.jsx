import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserValid = user.email && user.password;
    setButtonDisabled(!isUserValid);
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, user);
      if (response.data.success) {
        const accessToken = response.data.data.accessToken;
        // const refreshToken = response.data.data.refreshToken;
        
        localStorage.setItem("accessToken", accessToken);
        // localStorage.setItem("refreshToken", refreshToken);


        alert("Login successful!");
        navigate('/');
      } else {
        alert(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">{loading ? "Loading...." : <h1 className="text-2xl font-semibold">Login</h1>}</div>
        <form>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="text-slate-900 bg-white border border-gray-300 w-full text-m px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="text-slate-900 bg-white border border-gray-300 w-full text-m px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className="mt-12">
            <button
              type="button"
              onClick={onLogin}
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              {buttonDisabled ? 'Logging in...' : 'Log In'}
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">
            Don't have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline ml-1">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm