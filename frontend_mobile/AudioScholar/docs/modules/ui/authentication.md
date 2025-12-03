# Authentication Screens

This document covers the UI screens and components related to user authentication, including Login, Registration, Password Recovery, and Email Verification.

## Login Screen

**Route:** `Screen.Login.route`
**ViewModel:** [LoginViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/LoginViewModel.kt)
**Source:** [LoginScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/LoginScreen.kt)

### Overview
Allows users to sign in using their email and password or via third-party providers (Google, GitHub). It handles navigation to Registration and Forgot Password screens.

### UI State (LoginUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `email` | `String` | The current input for email. |
| `password` | `String` | The current input for password. |
| `isEmailLoginLoading` | `Boolean` | Shows loading spinner on the login button. |
| `isGoogleLoginLoading` | `Boolean` | Shows loading spinner on the Google button. |
| `isGitHubLoginLoading` | `Boolean` | Shows loading spinner on the GitHub button. |
| `errorMessage` | `UiText?` | Error message displayed in a Snackbar. |
| `navigateToRecordScreen` | `Boolean` | Trigger to navigate to the main app flow. |
| `welcomeType` | `WelcomeMessageType` | Determines the welcome text (New vs Returning). |

### User Actions (Events)

- **Login Click**: Triggers `viewModel.onLoginClick()`. Validates input and attempts Firebase/API login.
- **Google Sign-In**: Triggers `viewModel.onGoogleSignInClick()`. Launches the Google Sign-In intent.
- **GitHub Sign-In**: Triggers `viewModel.onGitHubSignInClick()`. Launches a custom tab for GitHub OAuth.
- **Register Click**: Navigates to the Registration screen.
- **Forgot Password Click**: Navigates to the Forgot Password screen.

### Navigation
- **From**: Splash Screen, Onboarding Screen, or after Logout.
- **To**: 
    - [Recording Screen](./recording.md) (on success)
    - [Registration Screen](#registration-screen)
    - [Forgot Password Screen](#forgot-password-screen)
    - Email Verification Screen

---

## Registration Screen

**Route:** `Screen.Registration.route`
**ViewModel:** [RegistrationViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/RegistrationViewModel.kt)
**Source:** [RegistrationScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/RegistrationScreen.kt)

### Overview
Allows new users to create an account. Includes form validation for names, email, and password strength, as well as Terms of Service acceptance.

### UI State (RegistrationUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `firstName` / `lastName` | `String` | User's name inputs. |
| `email` | `String` | User's email input. |
| `password` / `confirmPassword` | `String` | Password inputs. |
| `termsAccepted` | `Boolean` | Checkbox state for ToS. |
| `registrationInProgress` | `Boolean` | Loading state for email registration. |
| `passwordValidationResult` | `PasswordValidationResult` | Helper state for password strength indicators. |

### User Actions (Events)

- **Register Click**: Triggers `viewModel.registerUser()`.
- **Toggle Password Visibility**: Shows/hides password text.
- **Terms Click**: Opens a bottom sheet with legal text.
- **Google/GitHub Register**: OAuth registration flows.

### Navigation
- **To**: Email Verification Screen (on success), Login Screen.

---

## Forgot Password Screen

**Route:** `Screen.ForgotPassword.route`
**ViewModel:** [ForgotPasswordViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/ForgotPasswordViewModel.kt)
**Source:** [ForgotPasswordScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/ForgotPasswordScreen.kt)

### Overview
Allows users to request a password reset link via email.

### UI State (ForgotPasswordUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `email` | `String` | Input for the account email. |
| `isLoading` | `Boolean` | Loading state during API call. |
| `isSuccess` | `Boolean` | Toggles the success view with countdown. |

### User Actions (Events)

- **Submit**: Calls `viewModel.sendResetLink()`.
- **Back**: Navigates back to Login.

---

## Reset Password Confirm Screen

**Route:** `Screen.ResetPasswordConfirm.route`
**ViewModel:** [ResetPasswordConfirmViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/ResetPasswordConfirmViewModel.kt)
**Source:** [ResetPasswordConfirmScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/auth/ResetPasswordConfirmScreen.kt)

### Overview
Deep-linked screen where users enter a new password after clicking the email link.

### UI State (ResetPasswordConfirmUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `newPassword` | `String` | New password input. |
| `confirmPassword` | `String` | Confirmation input. |
| `passwordStrength` | `PasswordStrength` | Strength indicator for the new password. |
| `oobCode` | `String` | The reset code from the URL. |
| `resetSuccess` | `Boolean` | Shows success message and redirect countdown. |

### User Actions (Events)

- **Submit**: Calls `viewModel.submitPasswordReset()`.

---

## Key Components Used

- `ModernButton`: Primary action buttons.
- `ModernTextField`: Input fields with consistent styling.
- `ModernOutlinedButton`: Secondary actions (OAuth).
- `PasswordRequirementsIndicator`: Visual feedback for password strength (Registration).