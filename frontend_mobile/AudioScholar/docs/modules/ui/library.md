# Library Module

**Layer:** UI

## 1. Overview

The Library module provides the user with a centralized location to view and manage all of their audio recordings. The UI is organized into two main sections: local on-device recordings and recordings that have been uploaded to the cloud. It supports functionalities such as viewing recording details, importing new audio files, and multi-selecting items for batch operations like deletion.

## 2. Key Components

*   `LibraryScreen.kt`: The main composable for this module. It houses the tab layout for switching between local and cloud recordings and manages the state for multi-selection mode.
*   `LocalRecordingsTabPage()`: A composable function that displays the list of recordings stored on the user's device. It handles the empty state and the list view.
*   `CloudRecordingsTabPage()`: A composable function that displays the list of recordings fetched from the remote server. It also handles its loading and empty states.
*   `LocalRecordingListItem()`: A composable that represents a single item in the local recordings list, displaying metadata like title, date, and duration.
*   `CloudRecordingListItem()`: A composable that represents a single item in the cloud recordings list, showing details like title, upload date, and file size.
*   `MultiSelectTopAppBar()`: A dynamic top app bar that appears when multi-selection mode is active, providing actions like "Select All" and "Delete".

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: ViewModels use repositories to fetch local and remote recording lists.
*   UI Components: Utilizes components from the `core_components` module, such as `ModernCard` and `ModernDialog`.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): For building all UI elements.
*   [Hilt](https://dagger.dev/hilt/): For injecting the `LibraryViewModel`.

## 4. Usage / Integration

The `LibraryScreen` is a primary destination in the main navigation graph, accessible from the app's navigation drawer. It is responsible for navigating to the `RecordingDetailsScreen` when a user taps on a recording.

### Example: Navigating to Recording Details

```kotlin
// In LibraryViewModel.kt, handling a click event

fun onRecordingClicked(metadata: RecordingMetadata) {
    // This event is collected in the UI to trigger navigation
    val event = LibraryViewEvent.NavigateToLocalDetails(metadata.filePath)
    _eventFlow.tryEmit(event)
}