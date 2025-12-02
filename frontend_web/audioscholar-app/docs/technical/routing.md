# Routing Architecture

This document describes the routing implementation in the AudioScholar frontend application. The application uses `react-router-dom` for client-side routing.

## Overview

The routing logic is centralized in `src/components/App/App.jsx`. It defines the mapping between URL paths and React components (pages). The application uses a `BrowserRouter` (aliased as `Router`) to handle navigation.

## Route Types

The application distinguishes between public and protected routes.

### Public Routes

Public routes are accessible to any user without authentication.

- `/` - Home Page
- `/about` - About Page
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service
- `/signup` - Sign Up Page
- `/signin` - Sign In Page
- `/forgot-password` - Forgot Password Page
- `/email-verification` - Email Verification Page
- `/verify-email-notice` - Email Verification Notice Page
- `/reset-password` - Reset Password Route
- `/auth/github/callback` - Github Auth Callback

### Protected Routes

Protected routes require the user to be authenticated. This is enforced using the `ProtectedRoute` wrapper component (`src/components/common/ProtectedRoute.jsx`).

- `/dashboard` - User Dashboard
- `/upload` - Upload Page
- `/recordings` - Recording List
- `/recordings/:id` - Recording Data (Details)
- `/profile` - User Profile
- `/profile/edit` - User Profile Edit
- `/subscribe` - Subscription Tier Page
- `/payment` - Payment Method Page
- `/checkout` - Checkout Page

#### Admin Routes

Admin routes are nested under `/admin` and are also protected.

- `/admin` (index) - Admin Dashboard
- `/admin/users` - Admin User List
- `/admin/analytics` - Admin Analytics

## Protected Route Implementation

The `ProtectedRoute` component checks for the existence of an authentication token in `localStorage` (`AuthToken`).

**File:** `src/components/common/ProtectedRoute.jsx`

```jsx
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('AuthToken');

    if (!token) {
        console.log('ProtectedRoute: No token found, redirecting to /signin');
        return <Navigate to="/signin" replace />;
    }

    return children;
};
```

If no token is found, the user is redirected to the `/signin` page.

## Layout Structure

The `App` component wraps all routes in a container div with `min-h-screen flex flex-col` classes, ensuring the layout takes up the full viewport height. Admin routes share a common layout component `AdminLayout` (`src/pages/Admin/AdminLayout.jsx`).