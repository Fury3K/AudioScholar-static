# Player (Recording Details) Module

**Layer:** UI

## 1. Overview

The Player module, sourced from the `details` package, is the central screen for interacting with a single recording. It provides audio playback controls and a tabbed interface to display various types of information related to the recording, such as AI-generated summaries, key points, glossary terms, external resource recommendations, and user-created notes. This screen handles both local and cloud-based recordings, adapting its capabilities accordingly.

## 2. Key Components

*   `RecordingDetailsScreen.kt`: The main entry point and container for this module. It manages the overall layout, state, and navigation for the screen. It includes the playback controls (play/pause, seek bar) and the tab container.
*   `InsightsTabContent()`: A composable that displays the AI-generated summary, key points, and identified topics for a cloud recording.
*   `ResourcesTabContent()`: A composable that shows supplementary materials, including YouTube video recommendations and a glossary of terms.
*   `UserNotesTabContent()`: A dedicated tab for users to create, view, edit, and delete their own personal notes associated with the recording.
*   `SummaryEditDialog()`: A dialog allowing users to modify the AI-generated summary and key points.

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: The `RecordingDetailsViewModel` interacts with repositories to fetch recording metadata, summaries, notes, and other details.
*   `PlaybackManager`: A service that handles the underlying logic for audio playback, which the ViewModel communicates with.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): For building all UI elements.
*   [Hilt](https://dagger.dev/hilt/): For injecting the `RecordingDetailsViewModel`.
*   [Coil](https://coil-kt.github.io/coil/): Used for loading thumbnail images for YouTube recommendations.

## 4. Usage / Integration

This screen is navigated to from the `LibraryScreen` when a user selects a recording. It requires either a local file path or a remote recording ID to be passed as navigation arguments.

### Example: Navigating to a Cloud Recording's Details

```kotlin
// In LibraryViewModel, when a cloud recording is clicked
fun onCloudRecordingClicked(metadata: AudioMetadataDto) {
    val route = Screen.RecordingDetails.createCloudRoute(
        id = metadata.id,
        // ... other parameters
    )
    // This event is collected by the UI to trigger navigation
    _eventFlow.tryEmit(LibraryViewEvent.NavigateToCloudDetails(route))
}