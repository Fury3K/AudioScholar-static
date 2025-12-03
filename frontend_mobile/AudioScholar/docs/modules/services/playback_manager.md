# PlaybackManager

**Type:** Manager (Singleton)
**Package:** `edu.cit.audioscholar.service`
**Source:** [PlaybackManager.kt](../../../app/src/main/java/edu/cit/audioscholar/service/PlaybackManager.kt)

## Responsibility
`PlaybackManager` is a centralized singleton component responsible for handling all audio playback logic within the application. It wraps the `androidx.media3.exoplayer.ExoPlayer` instance, manages the playback lifecycle (prepare, play, pause, release), and exposes a reactive stream of `PlaybackState` for UI components to consume.

## Public API

### Methods

#### `preparePlayer(filePath: String)`
Prepares the player with a specific local file but does not auto-start playback.
- **Parameters**:
    - `filePath`: Absolute path to the local audio file.

#### `prepareAndPlay(filePath: String)`
Prepares the player with a specific local file and immediately starts playback.
- **Parameters**:
    - `filePath`: Absolute path to the local audio file.

#### `preparePlayerForStreaming(url: String)`
Prepares the player for streaming from a remote URL.
- **Parameters**:
    - `url`: The remote HTTP/HTTPS URL of the audio file.

#### `play()`
Resumes playback if paused or starts if ready.

#### `pause()`
Pauses current playback.

#### `seekTo(positionMs: Long)`
Seeks to a specific position in the audio track.
- **Parameters**:
    - `positionMs`: The target position in milliseconds.

#### `releasePlayer()`
Releases the ExoPlayer instance and frees resources.

#### `cleanup()`
Full cleanup of the manager, including cancelling internal coroutine scopes.

### Properties

#### `playbackState: StateFlow<PlaybackState>`
A read-only state flow that emits the current status of the player.
- **PlaybackState**:
    - `isPlaying`: Boolean indicating if audio is currently playing.
    - `currentPositionMs`: Current playback head position in milliseconds.
    - `totalDurationMs`: Total duration of the track in milliseconds.
    - `isReady`: Boolean indicating if the player is buffered and ready.
    - `error`: String? containing any error messages.

## Collaborators
- `Context`: (Injected via `@ApplicationContext`) Used to build the ExoPlayer instance.

## Implementation Details
- **State Management**: Uses `MutableStateFlow` to emit immutable `PlaybackState` objects. UI components subscribe to this flow to update progress bars and play/pause buttons.
- **Progress Updates**: An internal coroutine job (`positionUpdateJob`) polls the player's position every 100ms when playing to provide smooth UI updates.
- **Error Handling**: Catches ExoPlayer exceptions and exposes them via the `error` field in `PlaybackState`.
- **Concurrency**: Operations run on the main thread (as required by ExoPlayer) but leverage `CoroutineScope` for periodic updates.

## Usage Example

```kotlin
// In a ViewModel
val playbackState = playbackManager.playbackState

fun togglePlayPause() {
    val state = playbackState.value
    if (state.isPlaying) {
        playbackManager.pause()
    } else {
        playbackManager.play()
    }
}

fun onSeek(position: Float) {
    playbackManager.seekTo(position.toLong())
}