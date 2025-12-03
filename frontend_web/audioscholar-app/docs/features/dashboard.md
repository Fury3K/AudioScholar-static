# User Dashboard

The Dashboard is the central hub for users after they log in. It provides quick access to the core functionalities of the AudioScholar application.

## Overview

- **Route:** `/dashboard`
- **Component:** `src/pages/Dashboard/DashBoard.jsx`
- **Access:** Protected (requires authentication).

## Features

The dashboard provides a simple grid layout with direct links to the primary user actions:

### 1. Upload Audio
- **Link:** `/upload`
- **Description:** Allows users to upload new audio files to be processed.
- **Icon:** Cloud Upload icon.

### 2. Recording List
- **Link:** `/recordings`
- **Description:** Navigates to the list of all user's audio recordings and their statuses.
- **Icon:** List/Document icon.

## Structure

The dashboard layout includes:
1.  **Header:** The global application header (`src/pages/Home/HomePage.jsx`).
2.  **Main Content:** A responsive grid displaying feature cards.
3.  **Footer:** The global application footer.