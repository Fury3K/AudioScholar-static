# Data Repositories

**Type:** Repository Pattern Implementation
**Package:** `edu.cit.audioscholar.data.repository`

## Responsibility
Repositories act as the single source of truth for the Domain layer, abstracting the underlying data sources (Local Database, Remote API, Files). They handle data synchronization, caching strategies, and error mapping.

## Key Repositories

### AdminRepository
**Implementation:** [AdminRepositoryImpl.kt](../../../app/src/main/java/edu/cit/audioscholar/data/repository/AdminRepositoryImpl.kt)
**Interface:** [AdminRepository.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/repository/AdminRepository.kt)

Handles administrative operations such as user management and analytics retrieval.

#### Public Methods
- `getUsers(limit: Int, pageToken: String?): Flow<Resource<AdminUserListResponse>>`: Fetches a paginated list of users.
- `updateUserStatus(uid: String, disabled: Boolean)`: Enable or disable a user account.
- `getAnalyticsOverview()`: Fetches high-level system analytics.

### UserRepository
**Source:** [UserRepository.kt](../../../app/src/main/java/edu/cit/audioscholar/data/repository/UserRepository.kt)

Handles user-specific data operations that don't fit into the Auth flow, such as FCM token registration.

#### Public Methods
- `registerFcmToken(token: String): Boolean`: Registers the device's Firebase Cloud Messaging token with the backend.

### AuthRepository
**Interface:** [AuthRepository.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/repository/AuthRepository.kt)

Manages the user's authentication state, login/registration flows, and token management.

### LocalAudioRepository
**Interface:** [LocalAudioRepository.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/repository/LocalAudioRepository.kt)

Manages audio recordings stored on the device.

#### Responsibilities
- CRUD operations for `RecordingMetadata` in the local Room database.
- File system operations via `RecordingFileHandler`.
- Synchronization of local changes (like renaming) to the remote server.

### RemoteAudioRepository
**Interface:** [RemoteAudioRepository.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/repository/RemoteAudioRepository.kt)

Manages audio recordings stored in the cloud.

#### Responsibilities
- Uploading new audio files.
- Fetching cloud recordings and their metadata (summaries, recommendations).
- Syncing remote changes back to the local database.

## Collaborators
- `ApiService`: For network requests.
- `AppDatabase`: For local caching.
- `UserDataStore`: For user session management.
- `RecordingFileHandler`: For file system access.