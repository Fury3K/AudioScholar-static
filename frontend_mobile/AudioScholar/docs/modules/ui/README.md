# UI Layer

**Layer:** UI

## 1. Overview

The UI layer is responsible for presenting the application's data to the user and handling all user interactions. It is built entirely with Jetpack Compose, a modern declarative UI toolkit for Android. This layer is structured into feature-specific packages, each containing composable screens and their corresponding ViewModels, which manage UI state and business logic.

## 2. Key Components

*   `MainActivity.kt`: The main entry point for the application's UI.
*   `LoginScreen.kt`: Handles user authentication, including email/password and OAuth providers.
*   `LibraryScreen.kt`: Displays the user's local and cloud-based audio recordings.
*   `RecordingDetailsScreen.kt`: Shows detailed information and actions for a specific recording.
*   `RecordingScreen.kt`: Provides the interface for capturing new audio recordings.
*   `ModernButton.kt`: A custom, reusable button component used throughout the application.

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: For accessing business logic and models.
*   Data Layer: For observing data streams and triggering data operations via ViewModels.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): The core UI toolkit.
*   [Hilt](https://dagger.dev/hilt/): For dependency injection in ViewModels.
*   [Coil](https://coil-kt.github.io/coil/): For image loading.