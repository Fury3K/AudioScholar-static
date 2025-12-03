# UI Module

## Overview
The **UI Module** encompasses all user-facing components of the AudioScholar application. It is built using **Jetpack Compose** following the **Material Design 3** (Material You) guidelines. The architecture follows the **MVVM (Model-View-ViewModel)** pattern, where UI components (Screens) observe state exposed by ViewModels.

## Architecture

```mermaid
graph TD
    A[UI Screen (Composable)] -->|Events| B[ViewModel]
    B -->|UI State (StateFlow)| A
    B -->|UseCase/Repository| C[Domain Layer]
    A -->|Navigation| D[NavHost]
    A -->|Uses| E[Core Components]
```

## Key Components

| Component | Role | Description |
| :--- | :--- | :--- |
| `Screen` Enums | Navigation | Defines routes and arguments for the Navigation Graph. |
| `MainActivity` | Host | Sets up the `NavHost`, `ModalDrawer`, and global theme. |
| `ViewModels` | State Holder | Manages business logic and exposes `UiState` to Composables. |
| `Theme` | Styling | Provides colors, typography, and shapes (`Quantum`, `Zen`, `Classic` styles). |

## Dependencies
- `app/src/main/java/edu/cit/audioscholar/domain/...` (Business Logic)
- `app/src/main/java/edu/cit/audioscholar/service/...` (Playback/Recording Services)
- External Lib: **Jetpack Compose** (UI Toolkit)
- External Lib: **Hilt** (Dependency Injection)
- External Lib: **Coil** (Image Loading)
- External Lib: **Compose Markdown** (Rendering AI summaries)

## Usage

Screens are generally self-contained and accessed via the `NavHost` in `MainActivity`.

```kotlin
// Example Navigation Setup
NavHost(navController = navController, startDestination = Screen.Library.route) {
    composable(Screen.Library.route) {
        LibraryScreen(
            navController = navController,
            drawerState = drawerState
        )
    }
    // ... other screens
}
```

## Module Structure

- [**Authentication**](./authentication.md): Login, Registration, Password Reset.
- [**Library**](./library.md): List of local and cloud recordings.
- [**Recording**](./recording.md): Audio capture interface.
- [**Player & Details**](./player.md): Playback, insights (summary, notes), and attachments.
- [**Settings & Profile**](./settings.md): User configuration and profile management.
- [**Core Components**](./core_components.md): Reusable widgets (`ModernButton`, `ModernTextField`, etc.).