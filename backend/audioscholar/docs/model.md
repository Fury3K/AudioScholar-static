# Model Module

## 1. Module Overview

The Model module defines the core domain entities and data structures of the AudioScholar application. These classes represent the fundamental objects that the system works with, such as users, recordings, and summaries. They serve as the in-memory representation of data retrieved from or destined for the Firestore database and are used throughout the application, particularly by the `Service` module to implement business logic.

## 2. Key Classes & Components

| Class / Component | Description |
| --- | --- |
| [`User.java`](src/main/java/edu/cit/audioscholar/model/User.java) | Represents an application user, storing profile information, authentication details, associated recording IDs, and roles. |
| [`Recording.java`](src/main/java/edu/cit/audioscholar/model/Recording.java) | Represents a user-uploaded audio recording, containing metadata like title, description, audio URL, duration, and links to related summaries and recommendations. |
| [`Summary.java`](src/main/java/edu/cit/audioscholar/model/Summary.java) | Holds the AI-generated summary of a recording, including key points, topics, a glossary of terms, and the full formatted summary text. |
| [`UserNote.java`](src/main/java/edu/cit/audioscholar/model/UserNote.java) | Represents a note created by a user associated with a specific recording. It includes the note content and user-defined tags. |
| [`AudioMetadata.java`](src/main/java/edu/cit/audioscholar/model/AudioMetadata.java) | A comprehensive data structure that tracks the state of an audio file throughout the entire processing pipeline, from initial upload to final completion. |
| [`LearningRecommendation.java`](src/main/java/edu/cit/audioscholar/model/LearningRecommendation.java) | Represents a recommended learning resource (typically a YouTube video) generated based on the content of a recording. |
| [`ProcessingStatus.java`](src/main/java/edu/cit/audioscholar/model/ProcessingStatus.java) | An enum that defines the distinct stages of the audio processing workflow, such as `UPLOADED`, `TRANSCRIBING`, `SUMMARIZING`, and `COMPLETE`. |
| [`KeyProvider.java`](src/main/java/edu/cit/audioscholar/model/KeyProvider.java) | An enum used to identify different third-party API key providers, such as `GEMINI` and `CONVERTAPI`. |

## 3. Responsibilities & Logic Flow

The classes in this module are primarily Plain Old Java Objects (POJOs) and enums. Their main responsibility is to act as data carriers.

**Key Responsibilities:**
- **Data Encapsulation:** Provide a structured, type-safe way to handle application data.
- **State Management:** `AudioMetadata.java` and `ProcessingStatus.java` are critical for tracking the state of long-running, asynchronous operations.
- **Database Mapping:** The models include `toMap()` and `fromMap()` methods, which facilitate serialization to and deserialization from Firestore documents.

**Example Workflow: User Uploads a Recording**
1.  A user uploads an audio file, which the system receives in the `controller` layer.
2.  An `AudioMetadata` object is created to track the entire process. Its status is set to `UPLOAD_PENDING`.
3.  Once uploaded to storage, a `Recording` object is created, containing essential details like `userId`, `title`, and `audioUrl`.
4.  As the file is transcribed and summarized by the `service` layer, the `AudioMetadata` status is updated through various `ProcessingStatus` enum values.
5.  Finally, a `Summary` object is created and linked to the `Recording` via its `summaryId`.

## 4. Dependencies

**Internal Dependencies:**
- This module has no dependencies on other application modules, making it a foundational layer. Other modules like `Service`, `Controller`, and `DTO` depend heavily on it.

**External Dependencies:**
- **`com.google.cloud:google-cloud-firestore`**: Used for annotations like `@DocumentId` and `@ServerTimestamp` and for data types like `com.google.cloud.Timestamp`, which are essential for Firestore integration.
- **`com.fasterxml.jackson.annotation.JsonProperty`**: Used in `AudioMetadata` to map a field to a specific JSON property name (`gptSummary`).
- **`jakarta.validation.constraints`**: Used in `User.java` for basic validation of fields like email and display name.

## 5. Configuration

This module does not require any specific application properties or environment variables to function. It is a pure data model package with no direct external configuration needs.