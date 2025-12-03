# Recording Screen

**Route:** `Screen.Record.route`
**ViewModel:** [RecordingViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/recording/RecordingViewModel.kt)
**Source:** [RecordingScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/recording/RecordingScreen.kt)

## Overview
Allows users to record new audio. It includes permission handling, a real-time waveform visualizer, recording controls (Start, Pause, Resume, Stop, Cancel), and a dialog to save the recording with a custom title. It interacts directly with the `RecordingService`.

## UI State (RecordingUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `isRecording` | `Boolean` | True if recording is active. |
| `isPaused` | `Boolean` | True if recording is paused. |
| `elapsedTimeFormatted` | `String` | HH:MM:SS string of current duration. |
| `currentAmplitude` | `Float` | Current microphone amplitude (0-1) for visualization. |
| `permissionGranted` | `Boolean` | True if Microphone permission is granted. |
| `showTitleDialog` | `Boolean` | Shows dialog to enter title after stopping. |
| `showStopConfirmationDialog` | `Boolean` | Confirmation before stopping. |
| `showCancelConfirmationDialog`| `Boolean` | Confirmation before discarding. |
| `error` | `String?` | Error message (e.g., permission denied, service error). |

## User Actions (Events)

- **Record Button Click**: Starts recording (if permission granted) or requests permissions.
- **Stop Button Click**: Pauses and shows stop confirmation dialog.
- **Pause/Resume Click**: Toggles pause state via `RecordingService`.
- **Cancel Click**: Shows confirmation to discard the current recording.
- **Save Dialog Confirm**: Finalizes the recording file and metadata.

## Navigation
- **From**: Main Navigation Drawer or Login Screen.
- **To**: Stays on screen, but saves file to local storage which then appears in [Library](./library.md).

## Key Components
- `AudioWaveformVisualizer`: Custom Canvas-based component that draws bars based on amplitude history.
- `RecordingTitleDialog`: Dialog for naming the file before saving.
- `LargeFloatingActionButton`: Main control button.

## Permissions
- `Manifest.permission.RECORD_AUDIO`: Required to capture audio.
- `Manifest.permission.POST_NOTIFICATIONS`: Required for the foreground service notification (Android 13+).