# Core UI Components

**Layer:** UI

## 1. Overview

The Core Components module contains a set of reusable, styled Jetpack Compose components that are used throughout the application to maintain a consistent look and feel. These components are designed to be flexible and encapsulate common UI patterns, reducing code duplication and simplifying screen development.

## 2. Key Components

*   `ModernButton.kt`: Provides customized `Button` and `OutlinedButton` composables with a standardized height and shape. It offers overloads for accepting either a string label or a content lambda for more complex button layouts.
*   `ModernCard.kt`: A styled `Card` composable with predefined rounded corners and elevation, providing a consistent container for grouping related content.
*   `ModernDialog.kt`: A wrapper around `AlertDialog` that enforces a consistent style for dialog titles and shapes. It simplifies the creation of alert dialogs for confirmations, warnings, or informational messages.
*   `ModernTextField.kt`: A styled `OutlinedTextField` with a consistent shape and color scheme for focused states. It wraps the standard Material component to ensure uniformity across all text input fields in the app.

## 3. Dependencies

### Internal Dependencies
*   None. This module is designed to be self-contained.

### External Dependencies
*   [Jetpack Compose Material 3](https://developer.android.com/jetpack/compose/designsystems/material3): The foundation for all components in this module.

## 4. Usage / Integration

These components are intended to be used in any screen that requires these common UI elements. They can be imported and used just like standard Jetpack Compose composables.

### Example: Using ModernButton and ModernTextField in a Login Form

```kotlin
// In a screen composable, like LoginScreen.kt

Column(horizontalAlignment = Alignment.CenterHorizontally) {
    ModernTextField(
        value = emailState,
        onValueChange = { emailState = it },
        label = "Email",
        leadingIcon = { Icon(Icons.Filled.Email, null) }
    )
    Spacer(modifier = Modifier.height(16.dp))
    ModernButton(
        text = "Log In",
        onClick = { /* Handle login logic */ }
    )
}