// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
  
    setIsLoading(true);
    setError('');
  
    try {
      const response = await api.post('/api/login', { email, password });
      console.log('Login Response:', response.data); // Log the response
  
      if (response.data.result.message === 'success') {
        const { accessToken, expiresIn } = response.data.result.data;
  
        // Store token and expiration time in Zustand store
        setAuth({ token: accessToken, expiresAt: expiresIn });
        console.log("token>>>>", accessToken);
  
        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (err: any) {
      let errorMessage = 'An error occurred';
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Unauthorized: Invalid email or password.';
        } else if (err.response.data.result && err.response.data.result.message) {
          errorMessage = err.response.data.result.message;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white rounded shadow-md dark:bg-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-black dark:text-white">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <Input
              type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
              placeholder="Enter your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
                          {/* Show/Hide Password Icon */}
                          <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle showPassword state
                className="absolute pt-5 padding-top inset-y-0 right-3 flex items-center px-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            size="large"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;