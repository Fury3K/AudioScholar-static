# Local Database

**Layer:** Data

## 1. Overview

The local database module handles all on-device data persistence for the AudioScholar application. It uses the Room Persistence Library to provide an abstraction layer over SQLite, enabling robust and fluent database access. This module is responsible for caching user data, recording metadata, and user notes to support an offline-first architecture. It also includes handlers for managing audio files on the local file system.

## 2. Key Components

*   `AppDatabase.kt`: The main Room database class that defines the database configuration, lists the entities, and provides access to the DAOs.
*   `RecordingMetadataDao.kt`: Data Access Object for performing CRUD (Create, Read, Update, Delete) operations on the `recording_metadata` table.
*   `UserNoteDao.kt`: Data Access Object for performing CRUD operations on the `user_notes` table.
*   `RecordingMetadata.kt`: An entity class representing a single record in the `recording_metadata` table. It stores all information about a recording, including its local file path, title, duration, and cached summary data.
*   `UserNoteEntity.kt`: An entity class representing a single user note associated with a recording.
*   `Converters.kt`: Contains type converters that allow Room to persist complex data types, such as lists of custom objects, by converting them to and from JSON strings.
*   `RecordingFileHandler.kt`: A utility class responsible for all interactions with the device's file system, including creating, reading, and deleting audio recording files.
*   `UserDataStore.kt`: Utilizes Jetpack DataStore to persist simple key-value data, specifically the user's profile information, in a safe and asynchronous manner.

## 3. Dependencies

### Internal Dependencies
*   None. This is a foundational module within the Data Layer.

### External Dependencies
*   [Room Persistence Library](https://developer.android.com/training/data-storage/room): The core component for local database management.
*   [Jetpack DataStore](https://developer.android.com/topic/libraries/architecture/datastore): Used for storing user profile preferences.
*   [Gson](https://github.com/google/gson): Used by the `Converters` class to serialize and deserialize complex objects into JSON strings for storage in the database.

## 4. Usage / Integration

DAOs are the primary interface for interacting with the local database. They are injected via Hilt into repository implementations.

### Example: How to get all recording metadata

The `RecordingMetadataDao` exposes a `Flow` that emits a new list of recordings whenever the underlying data changes. This allows the UI to be updated reactively.

```kotlin
// In a repository implementation
class LocalAudioRepositoryImpl @Inject constructor(
    private val recordingMetadataDao: RecordingMetadataDao
) : LocalAudioRepository {

    override fun getAllRecordings(): Flow<List<RecordingMetadata>> {
        return recordingMetadataDao.getAllRecordings()
    }
}