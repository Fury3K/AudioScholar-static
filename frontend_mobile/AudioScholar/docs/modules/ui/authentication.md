# Authentication Module

**Layer:** UI

## 1. Overview

The authentication module is responsible for all user-facing authentication flows. This includes user sign-in with email/password and third-party providers (Google, GitHub), new user registration, password recovery, and email verification. The module is composed of several screens, each with a dedicated ViewModel to handle its state and logic.

## 2. Key Components

*   `LoginScreen.kt`: The primary entry point for unauthenticated users. It provides forms for email/password login and buttons for initiating Google and GitHub sign-in flows. It is responsible for handling the results from these external providers.
*   `RegistrationScreen.kt`: Allows new users to create an account. It includes fields for user details, password creation with real-time validation, and a checkbox for accepting legal terms. It also supports registration via Google and GitHub.
*   `ForgotPasswordScreen.kt`: A simple screen where users can enter their email address to receive a password reset link.
*   `ResetPasswordConfirmScreen.kt`: The screen users are directed to from the password reset email. It allows them to set and confirm a new password.
*   `EmailVerificationScreen.kt`: After registration, users are directed here to confirm their email address. It periodically checks the user's verification status and allows them to request a new verification email.

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: Interacts with use cases for validating user input and executing authentication logic.
*   Data Layer: ViewModels rely on repositories from the Data Layer to communicate with the backend API and local data stores.

### External Dependencies
*   [Jetpack Compose](https://developer.android.com/jetpack/compose): For building all UI elements.
*   [Hilt](https://dagger.dev/hilt/): For injecting repositories and other dependencies into the ViewModels.
*   [Google Sign-In for Android](https://developers.google.com/identity/sign-in/android/): Manages the Google authentication flow.

## 4. Usage / Integration

The authentication flow is managed by the main navigation graph. If a user is not authenticated, they are directed to the `LoginScreen`. From there, they can navigate to the `RegistrationScreen` or `ForgotPasswordScreen`.

### Example: Navigating to the Registration Screen

```kotlin
// From LoginScreen.kt

// When the user clicks the "Register" button
navController.navigate(Screen.Registration.route) {
    launchSingleTop = true
}