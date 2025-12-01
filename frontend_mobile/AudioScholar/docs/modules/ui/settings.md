# Settings & Profile Module

**Layer:** UI

## 1. Overview

This module encompasses all screens related to user account management and application configuration. It is split between the `settings` and `profile` packages. Users can modify app-wide preferences like theme and recording quality, view their profile information, edit their details, change their password, and log out.

## 2. Key Components

*   `SettingsScreen.kt`: The main hub for application settings. It provides options to change the app's theme (light, dark, system), audio recording quality, and cloud sync preferences. It also contains links to legal documents like the Privacy Policy and Terms of Service.
*   `UserProfileScreen.kt`: Displays the logged-in user's profile picture, name, and email. It serves as a navigation point to edit the profile, change the password (if applicable), and log out. It also shows the user's premium or admin status.
*   `EditProfileScreen.kt`: A form that allows users to update their personal information, such as their name and profile picture.
*   `ChangePasswordScreen.kt`: A dedicated screen for users who have an email and password account to securely change their password. It requires them to enter their current password for verification.

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: ViewModels interact with repositories to fetch and update user data and application preferences.
*   Data Layer: Specifically interacts with `UserDataStore` to persist local app settings.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): For building all UI elements.
*   [Hilt](https://dagger.dev/hilt/): For injecting ViewModels and their dependencies.
*   [Coil](https://coil-kt.github.io/coil/): For loading and displaying the user's profile picture.

## 4. Usage / Integration

The `SettingsScreen` and `UserProfileScreen` are typically accessed from the main navigation drawer. The `EditProfileScreen` and `ChangePasswordScreen` are accessed from the `UserProfileScreen`.

### Example: Navigating to the Change Password Screen

```kotlin
// In UserProfileScreen.kt

// Inside a button's onClick lambda
ModernButton(
    onClick = { navController.navigate(Screen.ChangePassword.route) },
    modifier = Modifier.fillMaxWidth(0.8f)
) {
    Text("Change Password")
}