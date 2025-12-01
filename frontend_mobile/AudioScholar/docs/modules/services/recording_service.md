# RecordingService

**Type:** Service (Foreground)
**Package:** `edu.cit.audioscholar.service`
**Source:** [RecordingService.kt](../../../app/src/main/java/edu/cit/audioscholar/service/RecordingService.kt)

## Responsibility
`RecordingService` is an Android Foreground Service responsible for capturing audio input from the device microphone. It manages the entire recording lifecycle (start, pause, resume, stop, cancel), saves the audio data to local files, and broadcasts status updates (elapsed time, amplitude) to the UI. It ensures recording continues even when the app is in the background.

## Public API

### Intents Actions
The service is controlled via Intents with specific actions:

- `ACTION_START_RECORDING`: Initializes and starts recording.
- `ACTION_STOP_RECORDING`: Stops recording and saves the file.
- `ACTION_PAUSE_RECORDING`: Pauses the current recording (Android N+).
- `ACTION_RESUME_RECORDING`: Resumes a paused recording (Android N+).
- `ACTION_CANCEL_RECORDING`: Stops recording and deletes the temporary file.

### Broadcasts
The service emits status updates via `LocalBroadcastManager` using `BROADCAST_ACTION_STATUS_UPDATE`.

- **Extras**:
    - `EXTRA_IS_RECORDING`: Boolean status.
    - `EXTRA_IS_PAUSED`: Boolean status.
    - `EXTRA_ELAPSED_TIME_MILLIS`: Long, current duration.
    - `EXTRA_CURRENT_AMPLITUDE`: Float (0.0 - 1.0) for waveform visualization.
    - `EXTRA_RECORDING_FINISHED_PATH`: String, path to saved file (on success).
    - `EXTRA_ERROR_MESSAGE`: String, if an error occurred.

## Collaborators
- `RecordingFileHandler`: (Injected) Manages file creation and storage paths.
- `SharedPreferences`: (Injected) Used to retrieve the user's `QualitySetting` preference (Low, Medium, High).
- `NotificationManager`: System service for displaying the persistent foreground notification.

## Implementation Details
- **MediaRecorder**: Used for the actual file writing. It handles encoding (AAC/M4A).
- **AudioRecord**: Running in parallel with `MediaRecorder` solely to read audio buffer data and calculate real-time amplitude (RMS) for the UI visualizer.
- **Quality Settings**:
    - Configures sample rate and bitrate based on `QualitySetting` (Low, Medium, High).
    - Stereo recording is enabled for 'High' quality.
- **Foreground Service**: runs with a persistent notification (`NOTIFICATION_ID = 101`) to prevent the system from killing the process during long recordings.

## Usage Example

```kotlin
// Starting the service from a UI component
private fun startRecording() {
    val intent = Intent(context, RecordingService::class.java).apply {
        action = RecordingService.ACTION_START_RECORDING
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        context.startForegroundService(intent)
    } else {
        context.startService(intent)
    }
}

// Listening for updates
LocalBroadcastManager.getInstance(context).registerReceiver(
    receiver, 
    IntentFilter(RecordingService.BROADCAST_ACTION_STATUS_UPDATE)
)