# Deployment

This guide explains how to build the AudioScholar frontend application for production and deploy it to various hosting platforms.

## Building for Production

To create an optimized production build, run the following command in your terminal:

```bash
npm run build
```

This command uses Vite to bundle the application. The output will be generated in the `dist/` directory. The build includes:
- Minified JavaScript and CSS.
- Optimized assets.
- An `index.html` file entry point.

You can preview the production build locally before deploying:

```bash
npm run preview
```

## General Deployment Strategy

Since this is a Single Page Application (SPA) built with Vite (Client-side React), it can be deployed to any static site host. The core requirement is to serve the contents of the `dist/` folder.

**Crucial SPA Configuration:**
You must configure your host to rewrite all 404 requests to `index.html`. This ensures that when a user refreshes a page on a specific route (e.g., `/dashboard`), the server returns the main HTML file, allowing React Router to handle the routing on the client side.

## Deployment Platforms

### Vercel (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Import your project into Vercel.
3.  Vercel typically detects Vite automatically.
    - **Build Command:** `npm run build` (or `vite build`)
    - **Output Directory:** `dist`
4.  Deploy.

Vercel handles SPA routing rewrites automatically.

### Netlify

1.  Push your code to Git.
2.  Connect your repository to Netlify.
3.  Configure build settings:
    - **Build command:** `npm run build`
    - **Publish directory:** `dist`
4.  To handle SPA routing, ensure you have a `_redirects` file in your `public/` folder with the following content (or create it during build):
    ```
    /* /index.html 200
    ```

### Static Web Server

If deploying to a traditional web server (Nginx, Apache):

1.  Upload the contents of the `dist/` folder to your server's web root.
2.  Configure the server to fallback to `index.html` for non-existent paths.

**Nginx Example:**

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Environment Variables

If your application uses environment variables (e.g., Firebase config), ensure they are set in your deployment platform's dashboard. In Vite, these variables must be prefixed with `VITE_` to be exposed to the client-side code.

*Note: Never commit `.env` files containing secrets to version control.*