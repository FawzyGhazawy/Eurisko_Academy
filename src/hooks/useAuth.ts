// src/hooks/useAuth.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const useAuth = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [navigate, token]);

  return !!token;
};

export default useAuth;