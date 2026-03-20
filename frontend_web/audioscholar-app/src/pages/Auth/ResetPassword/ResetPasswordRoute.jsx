import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordRoute = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate('/dashboard'); }, [navigate]);
  return <div className="min-h-screen flex items-center justify-center">Redirecting (demo mode)...</div>;
};

export default ResetPasswordRoute;
