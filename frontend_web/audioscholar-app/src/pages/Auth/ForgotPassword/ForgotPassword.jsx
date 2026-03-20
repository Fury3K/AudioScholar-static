import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../Home/HomePage';

const ForgotPassword = () => {
  return (
    <>
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-900">
        <title>AudioScholar - Forgot Password</title>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Forgot Password</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">This is a static demo. No password reset is needed.</p>
          <Link to="/dashboard" className="bg-[#2D8A8A] text-white py-2 px-6 rounded-lg hover:bg-[#236b6b] transition">
            Go to Dashboard
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPassword;
