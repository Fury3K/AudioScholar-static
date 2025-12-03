# Styling & Theming

This document explains the styling and theming implementation in the AudioScholar frontend application.

## Tailwind CSS

The application uses Tailwind CSS for utility-first styling.

**Configuration:** `tailwind.config.js`

- **Content Paths:** Configured to scan `./src/**/*.{js,ts,jsx,tsx}`.
- **Dark Mode:** Enabled via the `selector` strategy (class-based).
- **Fonts:** Custom font families `montserrat` and `inter` are defined.
- **Colors:** Custom color palette including `teal` (primary), `light.blue`, and `dark.blue`.
- **Animations:** Custom animations like `fade-in-up`, `fade-in`, and `scale-in` are extended.
- **Plugins:** Includes `@tailwindcss/typography` for prose styling.

**Global Styles:** `src/styles/index.css`

- Imports Tailwind directives.
- Defines base styles for the `body` tag, including default font and background/text colors for light and dark modes.
- Defines custom CSS variables for animations.

## Theme Management

Theme management (Light/Dark mode) is handled by the `ThemeContext`.

**File:** `src/context/ThemeContext.jsx`

### Logic

1.  **Initialization:** The initial theme is determined by checking `localStorage`. If not set, it falls back to the system preference (`window.matchMedia('(prefers-color-scheme: dark)')`). Defaults to 'light'.
2.  **Application:** When the `theme` state changes, a `useEffect` hook updates the `class` attribute of the `document.documentElement` (the `<html>` tag). It adds or removes the `dark` class.
3.  **Persistence:** The selected theme is saved to `localStorage`.

### Usage

The `ThemeProvider` wraps the application in `src/main.jsx`. Components can consume the theme context using the `useTheme` hook:

```javascript
import { useTheme } from '../../context/ThemeContext';

const MyComponent = () => {
    const { theme, toggleTheme } = useTheme();
    // ...
};
```

## CSS Architecture

- **Utility Classes:** Most styling is done directly in JSX using Tailwind utility classes.
- **Component Styles:** Component-specific CSS files (e.g., `src/components/App/App.css`) are used sparingly, mostly for layout containers or styles that are difficult to express with utilities alone.