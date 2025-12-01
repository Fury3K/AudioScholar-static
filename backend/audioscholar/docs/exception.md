# Exception Module

## 1. Module Overview

The Exception module establishes a robust and centralized error handling strategy for the AudioScholar backend. Its primary role is to intercept exceptions that occur during application runtime, including custom-defined exceptions and common framework errors. By providing a global handler, it ensures that all API error responses are consistent, structured, and informative for the client, while also logging critical information for debugging purposes. This decouples error handling logic from the core business logic in controllers and services.

## 2. Key Classes & Components

| Class / Component | Description |
| --- | --- |
| [`GlobalExceptionHandler.java`](src/main/java/edu/cit/audioscholar/exception/GlobalExceptionHandler.java) | A centralized exception handler using `@ControllerAdvice` to catch exceptions across the entire application. It formats them into a standardized JSON response and maps them to appropriate HTTP status codes. |
| [`FirestoreInteractionException.java`](src/main/java/edu/cit/audioscholar/exception/FirestoreInteractionException.java) | A custom `RuntimeException` thrown when there are issues communicating with the Google Firestore database, such as failed read/write operations. |
| [`InvalidAudioFileException.java`](src/main/java/edu/cit/audioscholar/exception/InvalidAudioFileException.java) | A custom `RuntimeException` thrown during file upload processes if the provided file is not a valid or supported audio format. |
| [`KeysExhaustedException.java`](src/main/java/edu/cit/audioscholar/exception/KeysExhaustedException.java) | A custom `RuntimeException` used by key rotation managers to indicate that all available API keys for a third-party service have been depleted. |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
- **Centralized Handling:** Intercepts unhandled exceptions from anywhere in the application.
- **Standardized Responses:** Formats all error responses into a consistent JSON object containing a timestamp, status code, error type, and a descriptive message.
- **HTTP Status Mapping:** Maps different exception types to appropriate HTTP status codes (e.g., `400`, `403`, `500`).
- **Error Logging:** Logs detailed error information for diagnostics and monitoring.

**Example Workflow: Invalid File Upload**
1.  **Step 1:** A user uploads a non-audio file to an endpoint in the `AudioController`.
2.  **Step 2:** A validation check in the `AudioProcessingService` fails and throws an `InvalidAudioFileException`.
3.  **Step 3:** The `GlobalExceptionHandler` intercepts this exception because it is not caught within the controller.
4.  **Step 4:** The `handleInvalidAudioFileException` method within the handler is invoked. It constructs a JSON response with a `400 Bad Request` status and returns it to the client.

## 4. Dependencies

**Internal Dependencies:**
- This module has no direct dependencies on other application modules, as it sits at the top level to catch their errors.

**External Dependencies:**
- **Spring Web** (`spring-web-servlet`): Used for `@ControllerAdvice`, `@ExceptionHandler`, and core components for handling web requests and responses.
- **Spring Security** (`spring-security-web`): Required for handling `AccessDeniedException` to enforce security constraints.
- **SLF4J** (`slf4j-api`): Used for structured logging of exceptions and warnings.

## 5. Configuration

This module does not require any specific application properties or environment variables to function correctly. Its behavior is configured entirely through Spring Framework annotations.