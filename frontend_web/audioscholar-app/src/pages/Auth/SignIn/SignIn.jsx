import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Header } from '../../Home/HomePage';

const SignIn = () => {
        const navigate = useNavigate();

        // Static demo mode - auto redirect to dashboard
        useEffect(() => {
                localStorage.setItem('AuthToken', 'demo-static-token');
                localStorage.setItem('userId', 'demo-user-001');
                navigate('/dashboard');
        }, [navigate]);

        return (
                <>
                        <Header />
                        <main className="flex-grow flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-900">
                                <title>AudioScholar - Sign In</title>
                                <div className="text-center">
                                        <p className="text-gray-600 dark:text-gray-300">Redirecting to dashboard (demo mode)...</p>
                                </div>
                        </main>
                        <Footer />
                </>
        );
};

export default SignIn;
