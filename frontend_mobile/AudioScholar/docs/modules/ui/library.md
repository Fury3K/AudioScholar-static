# Library Screen

**Route:** `Screen.Library.route`
**ViewModel:** [LibraryViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/library/LibraryViewModel.kt)
**Source:** [LibraryScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/library/LibraryScreen.kt)

## Overview
The Library Screen serves as the central hub for managing audio recordings. It features a tabbed interface to switch between locally stored recordings and cloud-synced recordings. It supports multi-selection, deletion, importing audio, and navigating to detailed views.

## UI State (LibraryUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `isLoadingLocal` | `Boolean` | Loading indicator for local files. |
| `isLoadingCloud` | `Boolean` | Loading indicator for cloud files. |
| `localRecordings` | `List<RecordingMetadata>` | List of recordings stored on the device. |
| `cloudRecordings` | `List<AudioMetadataDto>` | List of recordings fetched from the API. |
| `isMultiSelectActive` | `Boolean` | Toggles selection checkboxes for batch operations. |
| `selectedRecordingIds` | `Set<String>` | IDs of currently selected items. |
| `importDialogState` | `ImportDialogState?` | State for the import metadata dialog. |
| `showMultiDeleteConfirmation` | `Boolean` | Controls visibility of the delete confirmation dialog. |

## User Actions (Events)

- **Tab Switch**: Toggles between Local and Cloud tabs. Refreshing cloud data if needed.
- **Item Click**: Navigates to [Recording Details](./player.md).
- **Item Long Click**: Enters multi-select mode.
- **Import Click**: Opens system file picker to import external audio.
- **Delete Selected**: Deletes selected items (local or cloud) after confirmation.
- **Favorite Toggle**: Marks a recording as favorite locally or remotely.

## Navigation
- **From**: Main Navigation Drawer.
- **To**: 
    - [Recording Details](./player.md) (Local or Cloud)

## Key Components
- `HorizontalPager`: Handles the tabbed view.
- `LocalRecordingListItem`: Composable for a single local item row.
- `CloudRecordingListItem`: Composable for a single cloud item row.
- `MultiSelectTopAppBar`: Contextual app bar shown during multi-selection.
- `ImportAudioDialog`: Dialog for entering title/description for imported files.