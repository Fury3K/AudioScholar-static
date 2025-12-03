# Settings & Profile Screens

This section covers user configuration, profile management, and application preferences.

## User Profile Screen

**Route:** `Screen.Profile.route`
**ViewModel:** [UserProfileViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/profile/UserProfileViewModel.kt)
**Source:** [UserProfileScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/profile/UserProfileScreen.kt)

### Overview
Displays the current user's information (avatar, name, email) and status (Premium, Admin). It serves as a gateway to editing profile details, changing passwords, managing subscriptions, and accessing the Admin Dashboard.

### UI State (UserProfileUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `contentState` | `ProfileContentState` | Sealed class: `Loading`, `Error`, or `Success` (containing profile data). |
| `navigateToLogin` | `Boolean` | Flag to trigger navigation to Login after logout. |
| `userMessage` | `String?` | One-off messages (e.g., toast notifications). |

### User Actions (Events)

- **Edit Profile**: Navigates to [Edit Profile Screen](#edit-profile-screen).
- **Change Password**: Navigates to Change Password Screen (if provider supports it).
- **Admin Dashboard**: Navigates to Admin area (if user is Admin).
- **Upgrade/Manage Subscription**: Navigates to Subscription Screen.
- **Logout**: Shows confirmation dialog and logs the user out.

---

## Edit Profile Screen

**Route:** `Screen.EditProfile.route`
**ViewModel:** [EditProfileViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/profile/EditProfileViewModel.kt)
**Source:** [EditProfileScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/profile/EditProfileScreen.kt)

### Overview
Allows the user to update their display name, first name, last name, and profile picture. Supports picking images from the gallery or taking a photo.

### UI State (EditProfileUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `firstName` / `lastName` | `String` | Input fields. |
| `isUploadingAvatar` | `Boolean` | Loading state for image upload. |
| `isSaving` | `Boolean` | Loading state for saving text details. |
| `selectedAvatarUri` | `Uri?` | Temporary URI for the selected new avatar. |

### User Actions (Events)

- **Avatar Click**: Opens bottom sheet to choose "Gallery", "Camera", or "Remove".
- **Save**: Validates inputs and uploads changes to the backend.

---

## Settings Screen

**Route:** `Screen.Settings.route`
**ViewModel:** [SettingsViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/settings/SettingsViewModel.kt)
**Source:** [SettingsScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/settings/SettingsScreen.kt)

### Overview
Manages global application preferences stored in SharedPreferences.

### Settings Categories

#### Cloud Sync
- **Sync Mode**: `Automatic`, `Manual`, `WifiOnly`.
- **Sync Frequency**: `Daily`, `Weekly`, `Monthly`.

#### App Preferences
- **Theme**: `Light`, `Dark`, `System`.
- **Theme Style**: `Classic`, `Quantum` (Indigo/Purple), `Zen` (Sage/Green).

#### Audio
- **Recording Quality**: `Low`, `Medium`, `High`.

#### Support
- **Legal/Help**: Opens bottom sheets for Help Center, Privacy Policy, and Terms of Service.

### User Actions (Events)

- **Selection Dialogs**: Clicking a setting row opens a `SelectionDialog` to update the preference value. Updates are immediate.

## Key Components
- `SettingsItemRow`: Standard row layout for settings.
- `SelectionDialog`: Reusable dialog for single-choice preferences.
- `ProfileContentState`: Handling Loading/Error/Success states for profile data fetching.