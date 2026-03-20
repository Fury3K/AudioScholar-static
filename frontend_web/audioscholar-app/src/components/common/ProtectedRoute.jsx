import React from 'react';

// Static demo mode - all routes are accessible
const ProtectedRoute = ({ children }) => {
    // Ensure demo token exists
    if (!localStorage.getItem('AuthToken')) {
        localStorage.setItem('AuthToken', 'demo-static-token');
        localStorage.setItem('userId', 'demo-user-001');
    }
    return children;
};

export default ProtectedRoute;
