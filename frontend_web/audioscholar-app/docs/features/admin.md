# Admin Portal

The Admin Portal is a restricted area designed for platform administrators to manage users, monitor analytics, and oversee system health.

## Overview

-   **Access:** Restricted to users with the `ROLE_ADMIN` role.
-   **Route Base:** `/admin`
-   **Layout:** Dedicated layout with a side/top navigation bar separate from the main user app.

## Features

### 1. Admin Dashboard
**File:** `src/pages/Admin/Dashboard/AdminDashboard.jsx`
**Route:** `/admin`

-   **Overview Statistics:** Displays key metrics:
    -   Total Users
    -   Total Recordings
    -   Total Duration (hours/minutes)
    -   Storage Used (formatted in MB/GB)
-   **Quick Actions:** Shortcuts to User Management and Analytics.
-   **System Health:** Visual indicators for API and Database status (Mocked for now).

### 2. User Management
**File:** `src/pages/Admin/Users/AdminUserList.jsx`
**Route:** `/admin/users`

-   **Listing:** Displays a table of all registered users (paginated limit: 100).
-   **Columns:** User Profile (Avatar/Name/Email), Status (Active/Disabled), Roles (e.g., USER, PREMIUM, ADMIN).
-   **Actions:**
    -   **Toggle Status:** Enable or disable user accounts. Disabled users cannot log in.
    -   **Manage Roles:** Promote or demote users to/from Admin status.

### 3. Analytics
**File:** `src/pages/Admin/Analytics/AdminAnalytics.jsx`
**Route:** `/admin/analytics`

-   **Activity:** Bar charts showing New Users and New Recordings over the last 30 days.
-   **Distribution:**
    -   **User Roles:** Breakdown of users by role (e.g., how many Premium users).
    -   **Login Providers:** Breakdown of authentication methods (Email, Google, GitHub).
-   **Engagement:** Table listing top content based on favorite counts.

## Services

**File:** `src/services/adminService.js`

Contains the API calls for administrative tasks:
-   `getUsers(limit, startAfter)`: Fetches user list.
-   `updateUserStatus(uid, disabled)`: Toggles user access.
-   `updateUserRoles(uid, roles)`: Updates user permissions.
-   `getOverview()`, `getActivityStats()`, `getUserDistribution()`, `getContentEngagement()`: Fetch analytics data.