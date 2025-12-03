# Domain Models

**Type:** Domain Model
**Package:** `edu.cit.audioscholar.domain.model`
**Source:** [PasswordStrength.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/model/PasswordStrength.kt), [QualitySetting.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/model/QualitySetting.kt)

## Responsibility
This document covers the core domain models used throughout the application to represent business rules and settings configurations. These models are pure Kotlin classes/enums and do not depend on platform-specific implementations (except for necessary resource annotations).

## Components

### 1. PasswordStrength
**Source:** [PasswordStrength.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/model/PasswordStrength.kt)

Enum representing the classification of a password's security level.

#### Enum Values
- `NONE`: No password entered or validation not started.
- `WEAK`: Password fails critical security checks (length, etc.).
- `MEDIUM`: Password meets basic requirements but lacks some complexity.
- `STRONG`: Password meets all complexity requirements.

---

### 2. QualitySetting
**Source:** [QualitySetting.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/model/QualitySetting.kt)

Enum defining the available audio recording quality presets. Each preset is associated with a localized string resource for UI display.

#### Properties
- `labelResId`: `@StringRes Int` - The Android string resource ID for the localized label of the setting.

#### Enum Values
| Value | Resource ID | Description |
| :--- | :--- | :--- |
| `Low` | `R.string.settings_quality_low` | Lower bitrate/sample rate for smaller file sizes. |
| `Medium` | `R.string.settings_quality_medium` | Balanced quality and file size (Default). |
| `High` | `R.string.settings_quality_high` | Highest bitrate/sample rate for best audio fidelity. |

#### Companion Object
- `PREF_KEY`: `const String = "pref_quality"` - Key used for persisting this setting.
- `DEFAULT`: `const String = "Medium"` - The default fallback value.

## Usage Example

```kotlin
// Working with QualitySetting
val currentQuality = QualitySetting.Medium
val labelId = currentQuality.labelResId
// Display labelId in UI...

// Working with PasswordStrength
fun getStrengthColor(strength: PasswordStrength): Color {
    return when(strength) {
        PasswordStrength.STRONG -> Color.Green
        PasswordStrength.MEDIUM -> Color.Yellow
        PasswordStrength.WEAK -> Color.Red
        PasswordStrength.NONE -> Color.Gray
    }
}