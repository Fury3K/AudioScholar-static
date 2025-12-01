# Recording Module

**Layer:** UI

## 1. Overview

The Recording module provides the primary interface for users to capture new audio. It features a minimalist design centered around a large control button to start and stop recording. The screen displays a real-time elapsed timer and an audio waveform visualizer that reacts to microphone input. It also handles the necessary runtime permissions for audio recording and notifications.

## 2. Key Components

*   `RecordingScreen.kt`: The main screen composable that presents the recording interface, including the timer, visualizer, and control buttons.
*   `AudioWaveformVisualizer()`: A custom composable that renders a dynamic waveform based on the current audio amplitude, providing visual feedback to the user during recording.
*   `RecordingTitleDialog()`: A dialog that appears after a recording is successfully stopped, prompting the user to provide an optional title before saving the file.
*   The screen manages several states, including idle, recording, paused, and saving, with the UI updating accordingly to show relevant controls (e.g., pause/resume, cancel).

## 3. Dependencies

### Internal Dependencies
*   `RecordingService`: The screen communicates with this background service (via the ViewModel) to manage the actual audio capture, allowing recording to continue even if the app is backgrounded.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): For building all UI elements.
*   [Hilt](https://dagger.dev/hilt/): For injecting the `RecordingViewModel`.

## 4. Usage / Integration

The `RecordingScreen` is a main destination in the app's navigation structure. The recording flow begins when the user presses the microphone button. The `RecordingViewModel` first ensures that the necessary microphone permissions are granted before starting the `RecordingService`.

### Example: Starting a Recording

```kotlin
// In RecordingScreen.kt, inside the main button's onClick lambda

if (uiState.permissionGranted) {
    viewModel.startRecording()
} else {
    // This triggers the system's permission request dialog
    multiplePermissionsLauncher.launch(permissionsToRequest)
}