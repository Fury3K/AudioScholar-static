import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GithubAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('AuthToken', 'demo-static-token');
    localStorage.setItem('userId', 'demo-user-001');
    navigate('/dashboard');
  }, [navigate]);

  return <div className="min-h-screen flex items-center justify-center">Redirecting (demo mode)...</div>;
};

export default GithubAuthCallback;
