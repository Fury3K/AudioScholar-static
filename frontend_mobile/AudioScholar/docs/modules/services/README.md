# Services Layer

**Layer:** Service

## 1. Overview

This document provides an overview of the services layer in the AudioScholar mobile application. This layer is responsible for handling background tasks such as audio playback and recording, ensuring that these operations can continue running even when the application is not in the foreground.

## 2. Key Components

- `RecordingService.kt`: Manages background audio recording.
- `PlaybackManager.kt`: Handles the logic for playing, pausing, and stopping audio playback.

## 3. Dependencies

### Internal Dependencies
- Domain Layer
- Data Layer

### External Dependencies
- Android Service and Media3 ExoPlayer