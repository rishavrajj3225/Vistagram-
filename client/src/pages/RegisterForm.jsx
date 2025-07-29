import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserValid = user.username && user.email && user.password;
    setButtonDisabled(!isUserValid);
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      if (response.data.success) {
        alert("Signup successful! Please login.");
        navigate('/login');
      } else {
        alert(response.data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center sm:h-screen p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">{loading ? "Loading...." : <h1 className="text-2xl font-semibold">Sign Up</h1>}</div>
        <form>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="text-slate-900 bg-white border border-gray-300 w-full text-m px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter username"
              />
            </div>
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
              onClick={onSignup}
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              {buttonDisabled ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
