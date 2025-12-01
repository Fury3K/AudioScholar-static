# Domain Models

**Layer:** Domain

## 1. Overview

This document details the core data models (entities) that represent the fundamental business objects and states within the AudioScholar application. These models are plain Kotlin data classes or enums, ensuring they are simple, independent, and focused solely on representing business data.

## 2. Key Components

*   `PasswordStrength.kt`: An enum representing the different levels of password security evaluated by the application. Its values are `NONE`, `WEAK`, `MEDIUM`, and `STRONG`. This is primarily used by the `PasswordValidator` use case to provide feedback to the user during registration or password changes.
*   `QualitySetting.kt`: An enum that defines the available audio quality settings for recordings: `Low`, `Medium`, and `High`. Each setting is associated with a string resource for its label, making it easy to display in the UI.

## 3. Dependencies

### Internal Dependencies
*   None.

### External Dependencies
*   Kotlin Standard Library
*   Androidx Annotation (for `@StringRes`)

## 4. Usage / Integration

These models are used throughout the application to ensure type safety and clarity when dealing with business-specific data.

### Example: Using QualitySetting to configure an audio recorder

```kotlin
// In a ViewModel or Service
fun startRecording(selectedQuality: QualitySetting) {
    val bitRate = when (selectedQuality) {
        QualitySetting.Low -> 64000 // 64 kbps
        QualitySetting.Medium -> 128000 // 128 kbps
        QualitySetting.High -> 256000 // 256 kbps
    }
    
    // Configure MediaRecorder with the selected bitRate
    // mediaRecorder.setAudioEncodingBitRate(bitRate)
    // ...
}