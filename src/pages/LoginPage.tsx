// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';
import Button from '../atoms/button/Button'; // Import the reusable Button component
import Input from '../atoms/input/input'; // Import the reusable Input component

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      setError(err.response?.data?.result?.message || 'An error occurred');
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
              onChange={(value) => setEmail(value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(value) => setPassword(value)}
              required
            />
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