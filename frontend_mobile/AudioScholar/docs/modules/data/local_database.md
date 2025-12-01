# Local Database Components

**Type:** Database & Persistence
**Package:** `edu.cit.audioscholar.data.local`
**Source:** [AppDatabase.kt](../../../app/src/main/java/edu/cit/audioscholar/data/local/db/AppDatabase.kt)

## Responsibility
The Local Database component is responsible for persistent offline storage of application data. It manages structured data like recording metadata and user notes using Room, and unstructured key-value pairs (user profile) using DataStore. It also handles physical file management for audio recordings.

## Public API

### AppDatabase
The main database holder, serving as the access point for the persisted data.

#### `recordingMetadataDao(): RecordingMetadataDao`
Provides access to the `RecordingMetadata` table operations.

#### `userNoteDao(): UserNoteDao`
Provides access to the `UserNote` table operations.

### Data Access Objects (DAOs)

#### `RecordingMetadataDao`
**Source:** [RecordingMetadataDao.kt](../../../app/src/main/java/edu/cit/audioscholar/data/local/dao/RecordingMetadataDao.kt)

- `getAllRecordings(): Flow<List<RecordingMetadata>>`: Observes all recordings ordered by timestamp.
- `getRecordingByPath(filePath: String): Flow<RecordingMetadata?>`: Observes a specific recording.
- `insertOrUpdate(metadata: RecordingMetadata)`: Inserts or updates a recording entry.
- `deleteRecordingByPath(filePath: String)`: Deletes a specific recording entry.
- `updateFavoriteStatus(filePath: String, isFavorite: Boolean)`: Toggles the favorite status.
- `updateCachedSummary(...)`: Updates cached summary and glossary data from the remote source.

#### `UserNoteDao`
**Source:** [UserNoteDao.kt](../../../app/src/main/java/edu/cit/audioscholar/data/local/dao/UserNoteDao.kt)

- `getNotesForRecording(filePath: String): Flow<List<UserNoteEntity>>`: Observes notes for a specific recording.
- `getUnsyncedNotes(): List<UserNoteEntity>`: Retrieves notes that haven't been synced to the server.
- `insertNote(note: UserNoteEntity)`: Saves a user note.
- `markAsSynced(localId: String, remoteId: String)`: Updates the sync status of a note.

### UserDataStore
**Source:** [UserDataStore.kt](../../../app/src/main/java/edu/cit/audioscholar/data/local/UserDataStore.kt)
Manages user session and profile data.

- `userProfileFlow: Flow<UserProfileDto?>`: Observes the current user's profile.
- `saveUserProfile(profile: UserProfileDto)`: Persists user profile data.
- `clearUserProfile()`: Clears all user data (used on logout).

### RecordingFileHandler
**Source:** [RecordingFileHandler.kt](../../../app/src/main/java/edu/cit/audioscholar/data/local/file/RecordingFileHandler.kt)
Handles file system operations for audio files.

- `setupMediaRecorderOutputFile(mediaRecorder: MediaRecorder): Result<File>`: Configures a media recorder with an output file.
- `copyUriToLocalRecordings(sourceUri: Uri): Result<File>`: Imports an external audio file into the app's private storage.
- `getRecordingsDirectory(): Result<File>`: Returns the directory where recordings are stored.

## Collaborators
- **Android Context**: Required for database initialization and file system access.
- **Room Database**: Underlying SQLite abstraction.
- **DataStore**: Underlying Preferences storage.

## Implementation Details
- **Threading**: All database interactions are suspended functions or Flows, designed to run off the main thread.
- **Migration**: The `AppDatabase` handles schema versioning. Currently on version 8, with a migration to add `isFavorite` column.