# Integration Module

## 1. Module Overview

The Integration module is responsible for managing communications with external, third-party services. Its primary role is to abstract the complexities of external API interactions, providing a simplified and consistent interface for the rest of the application. This module handles API client initialization, request execution, and response parsing for services like the YouTube Data API, enabling the application to search for and retrieve external content.

## 2. Key Classes & Components

| Class / Component | Description |
|---|---|
| [`YouTubeAPIClient.java`](src/main/java/edu/cit/audioscholar/integration/YouTubeAPIClient.java) | A service client that handles all interactions with the YouTube Data API v3. It is responsible for initializing the YouTube service, constructing search queries, executing searches, and returning video results. |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
- Initializes and configures the `YouTube` service client for making API requests.
- Provides a method to search for YouTube videos based on a list of query strings.
- Handles API error responses, including quota exceptions, and implements basic retry or fallback logic.
- Ensures that search results are unique by filtering out duplicate video IDs.
- Manages API key injection from application properties.

**Example Workflow: Searching for YouTube Videos**
1. **Step 1:** The `searchVideos` method is called by a component in the `service` module, passing a list of search queries and a maximum number of desired results.
2. **Step 2:** The client iterates through each query and calls the internal `executeSearch` method to make a request to the YouTube Data API.
3. **Step 3:** The search request is configured with parameters such as the API key, query string, result type ("video"), and relevance language.
4. **Step 4:** The API response, containing a list of `SearchResult` objects, is received and parsed.
5. **Step 5:** The client collects unique video results until the maximum limit is reached and returns the aggregated list.

## 4. Dependencies

**Internal Dependencies:**
- This module currently has no direct dependencies on other modules within the application, as it serves as a client for external services.

**External Dependencies:**
- **Google API Client for Java**: Used to build and execute requests to the YouTube Data API.
- **Google YouTube Data API v3**: The core library providing the necessary classes and methods to interact with YouTube.
- **Spring Framework (`@Service`, `@Value`)**: Used for dependency injection and managing the component's lifecycle within the Spring application context.

## 5. Configuration

| Property | File | Description |
|---|---|---|
| `youtube.api.key` | `application.properties` | The API key required to authenticate requests to the YouTube Data API. The application will fail to initialize the client if this key is missing or invalid. |