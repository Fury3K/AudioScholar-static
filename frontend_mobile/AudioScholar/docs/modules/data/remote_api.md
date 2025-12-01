# Remote API Service

**Base URL:** (Configurable)
**Implementation:** `edu.cit.audioscholar.data.remote.service.ApiService`
**Source:** [ApiService.kt](../../../app/src/main/java/edu/cit/audioscholar/data/remote/service/ApiService.kt)

## Overview
The Remote API component handles all network communication between the mobile app and the backend server. It uses Retrofit to define endpoints for authentication, audio file management, metadata synchronization, and user administration.

## Authentication
Most endpoints are protected and require a Bearer token.
- [ ] Public (Login, Register)
- [x] Protected (Requires `Authorization: Bearer <token>`)

## Endpoints

### Audio Management

#### POST `/api/audio/upload`
Uploads a new audio recording and optionally a PowerPoint file.
- **Content-Type:** `multipart/form-data`
- **Parts:** `file` (Audio), `powerpointFile` (Optional), `title`, `description`.
- **Response:** [AudioMetadataDto](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/AudioMetadataDto.kt)

#### GET `/api/audio/metadata`
Retrieves a list of all audio recordings for the authenticated user.
- **Response:** `List<AudioMetadataDto>`

#### GET `/api/audio/recordings/{recordingId}`
Retrieves detailed metadata for a specific recording.
- **Response:** `AudioMetadataDto`

### Authentication

#### POST `/api/auth/register`
Registers a new user.
- **Body:** [RegistrationRequest](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/AuthDtos.kt)
- **Response:** `AuthResponse`

#### POST `/api/auth/login`
Authenticates an existing user.
- **Body:** [LoginRequest](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/AuthDtos.kt)
- **Response:** `AuthResponse`

### User Profile

#### GET `/api/users/me`
Fetches the currently authenticated user's profile.
- **Response:** [UserProfileDto](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/UserProfileDto.kt)

#### PUT `/api/users/me`
Updates user profile information.
- **Body:** `UpdateUserProfileRequest`
- **Response:** `UserProfileDto`

### Notes

#### POST `/api/notes`
Creates a new note for a recording.
- **Body:** `CreateUserNoteRequest`
- **Response:** `UserNoteDto`

#### GET `/api/notes`
Retrieves notes for a specific recording.
- **Query Parameter:** `recordingId`
- **Response:** `List<UserNoteDto>`

### Admin & Analytics

#### GET `/api/admin/users`
Retrieves a paginated list of users (Admin only).
- **Response:** `AdminUserListResponse`

#### GET `/api/admin/analytics/overview`
Retrieves system-wide analytics overview.
- **Response:** `AnalyticsOverviewDto`

## Data Models used
- [AudioMetadataDto](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/AudioMetadataDto.kt)
- [AuthDtos](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/AuthDtos.kt)
- [UserProfileDto](../../../app/src/main/java/edu/cit/audioscholar/data/remote/dto/UserProfileDto.kt)