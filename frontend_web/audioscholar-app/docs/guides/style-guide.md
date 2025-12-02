# Style Guide

This document outlines the coding standards and best practices for the AudioScholar frontend application.

## CSS & Styling

We use **Tailwind CSS** for styling components.

- **Utility-First**: Prefer using Tailwind utility classes directly in JSX `className` attributes over creating separate CSS files.
- **Configuration**: The design system (colors, fonts, animations) is customized in `tailwind.config.js`.
    - **Fonts**: `Montserrat` and `Inter`.
    - **Colors**: Custom palette includes `teal` (primary), `light.blue`, and `dark.blue`.
    - **Animations**: Custom keyframes for `fade-in-up`, `fade-in`, and `scale-in`.
- **Global Styles**: Global styles and Tailwind directives are located in `src/styles/index.css`.

## JavaScript / React

- **Framework**: React 19 with Vite.
- **File Extensions**: Use `.jsx` for React components and `.js` for utility logic.
- **Component Structure**:
    - Place components in feature-specific directories within `src/components` or `src/pages`.
    - Use functional components with hooks.
- **Linting**:
    - We use **ESLint** (configured in `eslint.config.js`) to enforce code quality.
    - Run `npm run lint` to check for errors.
    - Rules include standard React Hooks enforcement and unused variable checks.

## Formatting & Naming

- **Components**: PascalCase (e.g., `UserProfile.jsx`, `SignIn.jsx`).
- **Functions/Variables**: camelCase (e.g., `handleSubmit`, `isLoading`).
- **Folders**: PascalCase for component folders (e.g., `src/pages/Auth`) or camelCase/kebab-case for utility folders (e.g., `src/utils`).

## State Management

- **Local State**: Use `useState` for component-level state.
- **Global State**: Use React Context (e.g., `src/context/ThemeContext.jsx`) for application-wide state like themes or authentication.

## Directory Structure

Refer to [Project Structure](project-structure.md) for details on where files belong.