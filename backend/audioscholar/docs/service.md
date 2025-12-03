# Service Module

## 1. Module Overview

The Service module is the heart of the AudioScholar backend, containing the core business logic that drives the application's functionality. It acts as an intermediary between the `controller` and `model` layers, orchestrating data flow, handling complex operations, and interacting with external services. Its responsibilities include user management, audio processing pipelines, AI-powered transcription and summarization, data storage, and asynchronous task handling through message queues. The module is designed to be robust, with features like API key rotation, caching, and resilient task execution to ensure system stability and performance.

## 2. Key Classes & Components

| Class / Component | Description |
| --- | --- |
| `UserService.java` | Manages all user-related business logic, including registration, profile updates, avatar uploads, and role management. It interacts with both Firebase Authentication and the Firestore database. |
| `AudioProcessingService.java`| Orchestrates the entire audio upload and processing workflow. It handles file validation, temporary storage, and queues asynchronous tasks for uploading, transcription, and conversion. |
| `GeminiService.java` | A client for Google's Gemini API. It is responsible for performing AI-powered audio transcription and generating structured summaries from text content, with built-in retry logic and API key rotation. |
| `NhostStorageService.java` | Manages interactions with Nhost for persistent file storage. It handles uploading and deleting audio files, PowerPoint presentations, and generated PDFs. |
| `AudioTranscriptionListenerService.java` | An asynchronous listener that consumes messages from the transcription queue. It downloads audio files, calls the `GeminiService` for transcription, and triggers the summarization process upon completion. |
| `SummarizationListenerService.java` | An asynchronous listener that consumes messages from the summarization queue. It gathers the transcript and any PDF context, calls the `GeminiService` to generate a summary, and triggers the recommendation process. |
| `PptxConversionListenerService.java` | An asynchronous listener that orchestrates the conversion of PowerPoint files to PDF by calling the `ConvertApiService`. It updates the processing status and triggers the final summarization step. |
| `LearningMaterialRecommenderService.java` | Generates learning recommendations by analyzing lecture topics and searching the YouTube API for relevant educational videos. It ranks and filters results to provide high-quality suggestions. |
| `KeyRotationManagerImpl.java` | Manages a pool of API keys for services like Gemini and ConvertAPI. It rotates keys in a round-robin fashion and implements a cooldown mechanism for keys that encounter rate-limiting errors. |
| `FirebaseService.java` | A comprehensive service that abstracts all interactions with Firebase, including Firestore database operations (CRUD), Firebase Authentication, and Firebase Cloud Messaging (FCM) for push notifications. |
| `AnalyticsService.java` | Provides data aggregation and statistical analysis for the admin dashboard, calculating metrics like total users, storage usage, user distribution, and content engagement. |
| `RecordingService.java` | Manages the lifecycle of `Recording` documents in Firestore, including creation, updates, and deletion. It also handles the linking of related entities like summaries and recommendations. |
| `SummaryService.java` | Handles CRUD operations for `Summary` documents, which store the generated summary text, key points, topics, and glossary. |
| `UserNoteService.java` | Manages user-created notes associated with recordings, handling creation, retrieval, updates, and deletion while enforcing ownership-based access control. |
| `TokenRevocationService.java`| Implements JWT revocation by maintaining a denylist in Firestore. It is used to invalidate tokens upon user logout. |
| `OAuth2LoginSuccessHandler.java` | A custom authentication success handler that processes user information after a successful OAuth2 login (e.g., Google, GitHub) and creates or updates the user profile in the database. |
| `ConvertApiService.java` | A client for the ConvertAPI service, used to convert `.pptx` files to `.pdf` format. It supports API key rotation for handling rate limits. |
| `GeminiSmartRotationService.java` | Provides a higher-level abstraction for making resilient Gemini API calls. It automatically rotates through a hierarchy of models upon encountering rate-limiting errors, with exponential backoff. |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
-   **User Management:** Handles user registration, authentication state, profile data (name, avatar), and role assignments (`ROLE_USER`, `ROLE_PREMIUM`).
-   **Asynchronous Audio Processing:** Manages the entire lifecycle of an audio upload, from initial request to final completion, using a message-driven architecture with RabbitMQ.
-   **AI Content Generation:** Integrates with the Gemini API to perform audio-to-text transcription, generate structured summaries (including key points and topics), and create learning recommendations.
-   **File Storage & Conversion:** Interfaces with Nhost for storing large binary files (audio, PPTX) and uses ConvertAPI to transform PowerPoint presentations into PDFs for contextual analysis.
-   **Data Persistence:** Serves as the primary interface to the Firestore database for all business objects, including users, recordings, summaries, and recommendations.
-   **API Key Management:** Rotates API keys for external services to distribute load and gracefully handle rate-limiting or quota issues.
-   **Security:** Manages JWT denylisting for token revocation and handles user creation logic after OAuth2 authentication.

**Example Workflow: Audio & PowerPoint Upload**
1.  **Step 1:** An incoming request with an audio file and an optional `.pptx` file is received by `AudioController` and passed to `AudioProcessingService`.
2.  **Step 2:** `AudioProcessingService` validates the files, saves them to a temporary local directory, and creates an `AudioMetadata` document in Firestore with the status `UPLOAD_PENDING`.
3.  **Step 3:** It then sends two separate messages to the RabbitMQ `processing_exchange`: one for the audio file (routing key `upload.audio`) and one for the `.pptx` file (routing key `upload.pptx`).
4.  **Step 4:** `NhostUploadListenerService` consumes both messages. For each message, it uploads the corresponding temporary file to Nhost Storage and updates the `AudioMetadata` document with the Nhost file ID.
5.  **Step 5:** Upon successful audio upload, `NhostUploadListenerService` sends a message to the transcription queue. Concurrently, upon successful `.pptx` upload, it sends a message to the PPTX conversion queue.
6.  **Step 6:** `AudioTranscriptionListenerService` consumes the transcription message, downloads the audio from Nhost, calls `GeminiService.callGeminiTranscriptionAPI()` to get the transcript, and saves it to the `AudioMetadata` document.
7.  **Step 7:** `PptxConversionListenerService` consumes the conversion message, calls `ConvertApiService` to get a PDF URL, and updates the `AudioMetadata` document.
8.  **Step 8:** Both the transcription and conversion listeners check if all prerequisite steps are complete. The listener that finishes last triggers the final step by sending a message to the summarization queue.
9.  **Step 9:** `SummarizationListenerService` consumes the message, retrieves the transcript and PDF context, calls `GeminiService.generateSummaryWithPdfContext()`, saves the resulting `Summary`, and finally triggers the `LearningMaterialRecommenderService`.
10. **Step 10:** The status in the `AudioMetadata` document is updated to `COMPLETE`, and an FCM notification is sent to the user.

## 4. Dependencies

**Internal Dependencies:**
-   **Controller Module:** Services are injected into controllers to handle API requests.
-   **Model Module:** Services use model classes (`User`, `Recording`, `Summary`) to define data structures and interact with the database.
-   **DTO Module:** Services often use DTOs to receive data from controllers or structure data for specific tasks, though many map directly to models.
-   **Security Module:** `TokenRevocationService` depends on `JwtTokenProvider` to parse JWTs. `UserService` interacts with Firebase Auth for user management.

**External Dependencies:**
-   **Spring Framework (`spring-boot-starter-*`)**: Used for dependency injection, component scanning (`@Service`), caching (`@Cacheable`), and asynchronous task handling.
-   **Spring AMQP (`spring-rabbit`)**: Used for sending and receiving messages with the RabbitMQ message broker to manage the asynchronous processing pipeline.
-   **Google Cloud Firestore (`google-cloud-firestore`)**: The primary database client for all data persistence.
-   **Google Firebase Admin (`firebase-admin`)**: Used for Firebase Authentication, user management, and Firebase Cloud Messaging (FCM).
-   **Google Generative AI (`spring-ai-google-vertex-ai-gemini`)**: While not directly used, the principles guide the custom `GeminiService` RestTemplate client for interacting with the Gemini API.
-   **Nhost Java Client (Custom)**: A custom `RestTemplate`-based client for interacting with Nhost Storage.
-   **ConvertAPI (Custom)**: A custom `RestTemplate`-based client for the PPTX to PDF conversion service.
-   **JSON Web Token (`jjwt-api`, `jjwt-impl`)**: Used by `TokenRevocationService` via `JwtTokenProvider` for parsing JWT claims.
-   **SLF4J**: Used for application-wide logging.

## 5. Configuration

The Service module relies on several configuration properties defined in `application.properties` and environment variables.

| Property | File | Description |
| --- | --- | --- |
| `nhost.storage.url` | `application.properties` | The base URL for the Nhost Storage API endpoint. |
| `nhost.storage.admin-secret` | `.env` / System Environment| The admin secret required for authenticated write/delete operations on Nhost Storage. |
| `google.ai.api.key` | `.env` / System Environment| A primary API key for the Google AI (Gemini) API. |
| `gemini.api.keys` | `.env` / System Environment| A comma-separated list of Gemini API keys used by the `KeyRotationManager` for load distribution and handling rate limits. |
| `convertapi.secret` | `.env` / System Environment| A primary secret key for the ConvertAPI service. |
| `convertapi.secrets` | `.env` / System Environment| A comma-separated list of ConvertAPI secret keys for the `KeyRotationManager`. |
| `app.temp-file-dir` | `application.properties` | The local directory path where files are temporarily stored before being uploaded to persistent storage. |
| `spring.rabbitmq.*` | `application.properties` | Configuration properties for connecting to the RabbitMQ server, including host, port, username, and password. |
| `firebase.firestore.collection.*`| `application.properties` | Defines the names of the Firestore collections used by various services (e.g., `audiometadata`, `recommendations`). |
