# Project Structure

This document provides an overview of the AudioScholar frontend folder hierarchy and the purpose of key directories.

## Root Directory

- `src/`: Contains the application source code.
- `public/`: Static assets like images, icons, and `index.html` (in Vite projects, `index.html` is often in the root, but static assets go here).
- `docs/`: Project documentation.
- `package.json`: Dependency manifest and scripts.
- `vite.config.js`: Vite configuration file.
- `eslint.config.js`: ESLint configuration.
- `tailwind.config.js`: Tailwind CSS configuration.

## Source Directory (`src/`)

The source code is organized as follows:

- **`assets/`**: Static assets imported within components (e.g., global images, SVGs).
- **`components/`**: Reusable UI components.
    - `common/`: Shared components used across different features (e.g., `ProtectedRoute`).
    - `ui/`: Basic UI building blocks (buttons, inputs, etc.).
    - `App/`: Main application component and global styles.
- **`config/`**: Configuration files (e.g., `firebaseConfig.js`).
- **`context/`**: React Context providers (e.g., `ThemeContext`).
- **`hooks/`**: Custom React hooks.
- **`layouts/`**: Layout components (e.g., main layout, auth layout).
- **`pages/`**: Components representing full pages/routes.
    - `Auth/`: Authentication related pages (SignIn, SignUp, ResetPassword, etc.).
    - `Admin/`: Admin panel pages (Dashboard, Users, Analytics).
    - `Dashboard/`: User dashboard.
    - `Home/`: Landing page and public-facing pages.
    - `Notes/`: Note management (if applicable, structure suggests `src/components/Notes` exists).
    - `Subscription/`: Subscription and payment pages.
    - `UserProfile/`: User profile viewing and editing.
- **`services/`**: API and external service integrations.
    - `authService.js`: Authentication logic.
    - `adminService.js`: Admin-related API calls.
    - `noteService.js`: Notes management logic.
- **`store/`**: Global state management (if using Redux or similar, though structure suggests Context/Services are primary).
- **`styles/`**: Global CSS files (e.g., `index.css`).
- **`utils/`**: Helper functions and utilities (e.g., `logger.js`).

## Key Files

- `src/main.jsx`: The application entry point where the React app is mounted.
- `src/components/App/App.jsx`: The root component often handling routing setup.