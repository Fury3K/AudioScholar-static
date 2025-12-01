# Recording Details & Player

**Route:** `Screen.RecordingDetails.route` (Supports both Local and Cloud arguments)
**ViewModel:** [RecordingDetailsViewModel.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/details/RecordingDetailsViewModel.kt)
**Source:** [RecordingDetailsScreen.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/details/RecordingDetailsScreen.kt)

## Overview
This screen provides a comprehensive view for a single recording. It combines audio playback, metadata management, and AI-generated insights (Summary, Key Points, Glossary, Recommendations). It also supports attaching PowerPoint files and user note-taking.

## UI State (RecordingDetailsUiState)

| Property | Type | Description |
| :--- | :--- | :--- |
| `isLoading` | `Boolean` | Initial loading state. |
| `title` / `description` | `String` | Editable metadata. |
| `isPlaying` | `Boolean` | Current playback status. |
| `playbackProgress` | `Float` | 0.0 to 1.0 progress for slider. |
| `summaryStatus` | `SummaryStatus` | State of AI summary generation (IDLE, PROCESSING, READY, FAILED). |
| `recommendationsStatus` | `RecommendationsStatus` | State of YouTube recommendations. |
| `userNotes` | `List<UserNoteDto>` | List of user-created notes for this recording. |
| `isCloudSource` | `Boolean` | True if viewing a cloud recording (enables sync features). |

## User Actions (Events)

- **Play/Pause**: Toggles audio playback via `PlaybackManager`.
- **Seek**: Updates playback position.
- **Edit Details**: Opens dialog to update title/description.
- **Process Recording**: Uploads a local file to generating insights (if not already processed).
- **Tabs (Insights/Resources/Notes)**: Switches content views.
- **Add Note**: Creates a new timestamped user note.
- **Attach PowerPoint**: Opens file picker to associate a PPT/PDF with the recording.

## Navigation
- **From**: [Library Screen](./library.md).
- **To**: External Browser (for YouTube/PDF links), [Library Screen](./library.md) (on delete).

## Key Components
- `InsightsTabContent`: Displays Topics, Summary, and Key Points.
- `ResourcesTabContent`: Displays YouTube Recommendations, Glossary, and Attachments.
- `UserNotesTabContent`: Interface for CRUD operations on user notes.
- `SummaryEditDialog`: Allows manual correction of AI-generated summaries.
- `YouTubeRecommendationCard`: Visual card for related videos.