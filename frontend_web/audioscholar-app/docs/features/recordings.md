# Recording Management

The Recording Management feature allows users to upload audio lectures, view their processing status, and access detailed summaries and analytics.

## Overview

This feature consists of three main views:
1.  **Upload:** Interface for submitting new audio files (and optional presentations).
2.  **List:** A searchable list of all user recordings with real-time status updates.
3.  **Details (Data):** A comprehensive view displaying the audio player, transcript, AI summary, and recommendations.

## 1. Uploading Recordings

**File:** `src/pages/Upload/Uploading.jsx`
**Route:** `/upload`

### Functionality
-   **File Selection:** Users can select an audio file (Required) and a PowerPoint file (Optional).
-   **Validation:**
    -   **Audio:** Supports `mp3`, `wav`, `aiff`, `aac`, `ogg`, `flac`.
    -   **PowerPoint:** Supports `ppt`, `pptx`.
-   **Metadata:** Users must provide a `Title` and can optionally add a `Description`.
-   **Process:**
    1.  User selects files and fills form.
    2.  Frontend validates file types and required fields.
    3.  Data is sent via `POST` to `api/audio/upload`.
    4.  Files are uploaded using `FormData` with the `AuthToken`.
    5.  On success, the user is notified and the form is reset.

## 2. Recording List

**File:** `src/pages/RecordingList/RecordingList.jsx`
**Route:** `/recordings`

### Functionality
-   **Listing:** Fetches recording metadata from `api/audio/metadata`.
-   **Filtering/Sorting:**
    -   Grouped by date (Today, This Week, This Month, Older).
    -   Sorted by upload timestamp (newest first).
    -   Search bar to filter by title or description.
-   **Real-time Polling:**
    -   Automatically polls for status updates every 15 seconds if any recording is in a non-terminal state (e.g., `TRANSCRIBING`, `SUMMARIZING`).
    -   Stops polling when all items are `COMPLETE`, `FAILED`, or timed out.
-   **Status Badges:** Displays color-coded badges indicating the current state (e.g., "Uploading", "Processing", "Completed", "Failed").
-   **Deletion:** Users can delete individual recordings or "Delete All" (with confirmation). Deletion happens in the background to keep the UI responsive.

## 3. Recording Details

**File:** `src/pages/RecordingData/RecordingData.jsx`
**Route:** `/recordings/:id`

### Functionality
-   **Data Retrieval:** Fetches metadata, then asynchronously loads specific details (Summary, Recommendations) to allow progressive rendering.
-   **Audio Player:** HTML5 audio player for playback of the uploaded lecture.
-   **Tabs:**
    -   **Summary:** Displays AI-generated summaries, key points, glossary, and topics. Uses `react-markdown` for formatting.
    -   **My Notes:** A personal note-taking area where users can write and save their own notes (Markdown supported). Notes are persisted via `noteService`.
    -   **Transcript:** Full raw text transcript of the audio.
-   **Recommendations:** Shows relevant YouTube videos or resources based on the content.
-   **Downloads:** Options to download the original Audio, generated PDF summary, or original PowerPoint.