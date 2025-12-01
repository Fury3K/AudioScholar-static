# FcmService

**Type:** Service (FirebaseMessagingService)
**Package:** `edu.cit.audioscholar.service`
**Source:** [FcmService.kt](../../../app/src/main/java/edu/cit/audioscholar/service/FcmService.kt)

## Responsibility
`FcmService` is responsible for handling incoming Firebase Cloud Messaging (FCM) messages. It processes two main types of messages: "processing complete" notifications (indicating backend audio processing is finished) and general notifications (marketing or system announcements). It also handles the generation and refreshing of FCM registration tokens.

## Public API

### Methods

#### `onMessageReceived(remoteMessage: RemoteMessage)`
Invoked when a message is received from Firebase. It parses the message payload to determine if it's a data message (processing complete) or a notification message.

- **Parameters**:
    - `remoteMessage`: The object containing the message payload and metadata.

#### `onNewToken(token: String)`
Invoked when a new FCM registration token is generated. This method updates the local `TokenEventBus` and attempts to register the token with the backend via `NotificationRepository`.

- **Parameters**:
    - `token`: The new FCM registration token.

#### `sendProcessingCompleteNotification(recordingId: String)`
Internal helper to display a system notification when audio processing is complete. Clicking it navigates the user to the Cloud Library.

#### `sendGeneralNotification(title: String?, messageBody: String?, navigateTo: String?)`
Internal helper to display a standard notification. Clicking it navigates the user to a specified screen (defaulting to Upload/Home).

## Collaborators
- `UserRepository`: (Injected) Intended for user-related operations (though currently `NotificationRepository` is primarily used for token registration).
- `NotificationRepository`: (Injected) Responsible for sending the new FCM token to the backend API.
- `ProcessingEventBus`: (Injected) A shared event bus to notify running UI components that a specific recording has finished processing.
- `TokenEventBus`: (Static Utility) Used to broadcast the new token to other parts of the app that might be listening immediately.

## Implementation Details
- **Job/Scope**: Maintains its own `SupervisorJob` and `CoroutineScope` (IO dispatcher) to handle network operations like token registration without blocking the main thread.
- **Message Types**:
    - `type="processingComplete"`: Triggers `processingEventBus` signal and a specific "Processing Complete" notification.
    - Default/Notification payload: Triggers a general notification.
- **Navigation**: Uses PendingIntents with `MainActivity` as the entry point, passing extras like `NAVIGATE_TO` to direct the user to the correct screen.

## Usage Example

```kotlin
// This service is system-managed by the Android Manifest and Firebase SDK.
// However, it relies on the manifest declaration:
/*
<service
    android:name=".service.FcmService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
*/