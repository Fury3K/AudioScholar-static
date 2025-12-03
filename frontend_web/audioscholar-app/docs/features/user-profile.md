# User Profile Management

The User Profile feature allows users to view their account details, manage personal information, and update security settings.

## Overview

-   **Profile View:** Read-only display of user information and subscription status.
-   **Edit Profile:** Form to update name, avatar, and password.
-   **Integration:**
    -   Fetches user data from `api/users/me`.
    -   Updates data via `PUT api/users/me` and `POST api/users/me/avatar`.
    -   Handles password changes via `POST api/auth/change-password`.

## Features

### 1. Viewing Profile
**File:** `src/pages/UserProfile/UserProfile.jsx`
**Route:** `/profile`

-   **Header:** Displays user's profile picture (or fallback initial), full name, email, and roles (e.g., Premium, Admin).
-   **Details:** Read-only fields for First Name, Last Name, Email, and Subscription Status.
-   **Actions:**
    -   **Edit Profile:** Navigate to the editing form.
    -   **Apply Subscription:** Navigate to the subscription page (if not already Premium).
    -   **Admin Dashboard:** Visible only to users with `ROLE_ADMIN`.

### 2. Editing Profile
**File:** `src/pages/UserProfileEdit/UserProfileEdit.jsx`
**Route:** `/profile/edit`

-   **Avatar Upload:**
    -   Users can select a new profile picture (JPG, PNG, GIF, max 5MB).
    -   Image is previewed locally before upload.
    -   Sent as `multipart/form-data` to the backend.
-   **Personal Details:**
    -   Users can update First Name and Last Name.
    -   Email is read-only (identity source).
-   **Password Change:**
    -   Optional fields to set a `New Password` and `Confirm Password`.
    -   Validated for length (min 6 chars) and matching.
-   **Save Process:**
    -   Updates are batched: profile details, avatar, and password are handled via separate API calls if changed.
    -   Success/Error feedback is displayed to the user.