# Event Buses

## ProcessingEventBus

**Type:** Event Bus (Singleton)
**Package:** `edu.cit.audioscholar.util`
**Source:** [ProcessingEventBus.kt](../../../app/src/main/java/edu/cit/audioscholar/util/ProcessingEventBus.kt)

### Responsibility
Handles cross-component communication for backend processing events. Primarily used to notify the UI or other services when a recording's processing (e.g., transcription, summarization) is complete or when a favorite status is toggled.

### Public API

#### Events

##### `processingCompleteEvent: SharedFlow<String>`
Emits the ID of a recording when its processing is finished.

- **Replay**: 0 (Only new subscribers get updates)
- **Buffer**: 1 (Drops oldest if buffer overflows)

##### `favoriteToggledEvent: SharedFlow<FavoriteToggledEvent>`
Emits when a recording is favorited or unfavorited.
- **Data**: `FavoriteToggledEvent(val id: String, val isFavorite: Boolean)`

#### Methods

##### `signalProcessingComplete(recordingId: String): Boolean`
Triggers the `processingCompleteEvent`.

- **Parameters**:
    - `recordingId`: The unique ID of the processed recording.
- **Returns**: `true` (always).

##### `emitFavoriteToggled(id: String, isFavorite: Boolean)`
Triggers the `favoriteToggledEvent`.

### Usage Example

```kotlin
// Emitter (e.g., in FcmService)
processingEventBus.signalProcessingComplete("rec_123")

// Collector (e.g., in ViewModel)
viewModelScope.launch {
    processingEventBus.processingCompleteEvent.collect { recordingId ->
        refreshRecording(recordingId)
    }
}
```

---

## TokenEventBus

**Type:** Event Bus (Object)
**Package:** `edu.cit.audioscholar.util`
**Source:** [TokenEventBus.kt](../../../app/src/main/java/edu/cit/audioscholar/util/TokenEventBus.kt)

### Responsibility
Manages the broadcasting of new Firebase Cloud Messaging (FCM) tokens. This ensures that when a token is refreshed by the system, other components (like `UserRepository`) can immediately register it with the backend.

### Public API

#### Events

##### `tokenFlow: Flow<String>`
A SharedFlow that emits new FCM token strings.

- **Replay**: 0
- **Buffer**: 1 (Drops oldest on overflow)

#### Methods

##### `postNewToken(token: String)`
Emits a new token to the flow.

- **Parameters**:
    - `token`: The new FCM token string.

### Implementation Details
- Uses `MutableSharedFlow` with `extraBufferCapacity = 1` and `BufferOverflow.DROP_OLDEST` to ensure that if no subscribers are listening, the latest token is still kept briefly or dropped safely without blocking the emitter.
- Being a Kotlin `object`, it acts as a true singleton accessible from anywhere without dependency injection (though typically used within DI-managed classes).

### Usage Example

```kotlin
// In FcmService.onNewToken
override fun onNewToken(token: String) {
    TokenEventBus.postNewToken(token)
}

// In UserRepository or similar
TokenEventBus.tokenFlow.collect { newToken ->
    apiService.registerFcmToken(newToken)
}