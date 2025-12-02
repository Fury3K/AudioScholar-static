# State Management

This document describes the state management strategies used in the AudioScholar frontend application.

## Overview

The application primarily uses React's built-in state management capabilities (`useState`, `useEffect`, `useContext`) and `localStorage` for persisting specific user preferences and authentication tokens.

## Global State

### Context API

The application uses the Context API for global state that needs to be accessible across the component tree.

#### ThemeContext

- **File:** `src/context/ThemeContext.jsx`
- **Purpose:** Manages the application's visual theme (light vs. dark mode).
- **State:**
  - `theme`: Current theme string ('light' or 'dark').
- **Persistence:** The theme preference is stored in `localStorage` under the key `theme`. It also respects the user's system preference (`prefers-color-scheme`) if no local preference is found.
- **Provider:** `ThemeProvider` wraps the entire application in `src/main.jsx`.
- **Hook:** `useTheme` is a custom hook exposing `theme` and `toggleTheme`.

## Local State

Most component-specific data is managed using the `useState` hook. This includes form inputs, loading states, and data fetched from APIs within specific pages or components.

## Persistence

### localStorage

The application uses `localStorage` to persist data across sessions.

- **`AuthToken`**: Stores the JWT authentication token received from the backend. This is critical for session persistence and is checked by the `ProtectedRoute` component.
- **`theme`**: Stores the user's preferred theme (light/dark).

## Data Flow

Data flow is primarily unidirectional (top-down) via props. For data that needs to be shared or manipulated by sibling components, state is lifted up to a common ancestor or managed via Context (like the Theme).

## API Data

Data fetched from the backend (via services) is typically stored in the local state of the page or component that requested it. There is currently no global store (like Redux or Zustand) for caching API data; it is fetched on demand.