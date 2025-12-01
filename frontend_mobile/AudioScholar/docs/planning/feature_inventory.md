# Feature Inventory

This document provides a comprehensive inventory of all implemented features and components in the AudioScholar codebase, categorized by module.

## Data Layer

### Local Persistence
- **Room Database (`AppDatabase.kt`)**: Defines the local database with `RecordingMetadata` and `UserNoteEntity` tables.
- **DAOs**:
    - `RecordingMetadataDao`: Handles CRUD operations for recording metadata.
    - `UserNoteDao`: Handles CRUD operations for user notes.
- **DataStore (`UserDataStore.kt`)**: Manages user profile persistence using Jetpack DataStore.
- **File Handling (`RecordingFileHandler.kt`)**: Manages local audio file storage and retrieval.

### Remote API
- **Retrofit Service (`ApiService.kt`)**: Defines endpoints for:
    - Audio upload (`/api/audio/upload`)
    - Metadata retrieval and management (`/api/audio/metadata`)
    - Authentication (Register, Login, Token Verification)
    - User Profile management (`/api/users/me`)
    - Recordings (Summary, Recommendations, Details, Favorites)
    - Notes management
    - Admin & Analytics features

### Repositories
- **Admin Repository (`AdminRepositoryImpl.kt`)**: Handles admin-related data fetching (Users, Analytics).
- **User Repository (`UserRepository.kt`)**: Handles user-specific tasks like FCM token registration.
- **Auth Repository (`AuthRepository.kt`)**: Manages authentication state and user sessions.
- **Audio Repositories (`LocalAudioRepository.kt`, `RemoteAudioRepository.kt`)**: Separate handling for local vs cloud audio operations.
- **Notification Repository (`NotificationRepository.kt`)**: Interface for notification token management.

## Domain Layer

### Models
- **`PasswordStrength`**: Enum for password security levels.
- **`QualitySetting`**: Enum for audio recording quality options.

### Use Cases
- **`PasswordValidator`**: Logic for validating password strength requirements.

## Services Layer

### Background Services
- **`RecordingService.kt`**: Foreground service for handling audio recording.
    - Features: Start, Stop, Pause, Resume, Cancel.
    - Amplitude monitoring for UI visualization.
    - Notification controls.
- **`PlaybackManager.kt`**: Singleton managing `ExoPlayer` for audio playback.
    - Features: Play, Pause, Seek, Progress updates.
- **`FcmService.kt`**: Firebase Messaging Service implementation.
    - Handles push notifications for processing completion.
    - Token refresh events.

## UI Layer

### Authentication
- **Login**: `LoginScreen`, `LoginViewModel` (Email/Password, OAuth).
- **Registration**: `RegistrationScreen`, `RegistrationViewModel`.
- **Password Management**: `ForgotPasswordScreen`, `ResetPasswordConfirmScreen`.
- **Email Verification**: `EmailVerificationScreen`.

### Main Application
- **Library**: `LibraryScreen` (Tabs for Cloud/Local recordings).
- **Recording**: `RecordingScreen` (Waveform visualization, recording controls).
- **Details**: `RecordingDetailsScreen` (Playback, Summary, Notes, Recommendations).
- **Profile**: `UserProfileScreen`, `EditProfileScreen`.
- **Settings**: `SettingsScreen`, `ChangePasswordScreen`.

### Subscription
- **Payment Flow**: `SubscriptionPricingScreen`, `PaymentMethodSelectionScreen`.
- **Payment Details**: `CardPaymentDetailsScreen`, `EWalletPaymentDetailsScreen`.

### Admin Dashboard
- **Dashboard**: `AdminDashboardScreen`.
- **User Management**: `AdminUserListScreen`.
- **Analytics**: `AdminAnalyticsScreen`.

### Onboarding
- **Onboarding**: `OnboardingScreen`.

## Utils Layer

- **`PremiumStatusManager.kt`**: Manages user premium status (Local preference + JWT check).
- **`ProcessingEventBus.kt`**: Handles events for backend processing completion.
- **`TokenEventBus.kt`**: Manages FCM token refresh events.
- **`UiText.kt`**: Wrapper for UI strings (Resource/String).
- **`FileUtils.kt`**: General file utility helpers.