# [Screen Name]

**Route:** `ScreenRoute.Name`
**ViewModel:** [ScreenViewModel](../path/to/ScreenViewModel.kt)
**UiState:** [ScreenUiState](../path/to/ScreenUiState.kt)

## Overview
Description of the screen's purpose and user goals.

## Visual Reference
(Placeholder for screenshot)
`![Screen Screenshot](./images/screen_name.png)`

## UI State
Description of the data driven by the ViewModel.

| Property | Type | Description |
| :--- | :--- | :--- |
| `isLoading` | `Boolean` | Shows loading spinner when true. |
| `data` | `List<Item>` | The main content list. |
| `errorMessage` | `String?` | Error to display in Snackbar. |

## User Actions (Events)
Interactions the user can perform.

- **Click Action**: Description of what happens.
- **Swipe Action**: Description of what happens.

## Navigation
- **From**: [Previous Screen](./previous_screen.md)
- **To**: [Next Screen](./next_screen.md)

## Key Components
List of custom Composables used.
- `ModernButton`
- `ModernCard`