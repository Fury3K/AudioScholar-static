# Remote API

**Layer:** Data

## 1. Overview

The Remote API module is responsible for all network communication with the AudioScholar backend server. It uses Retrofit to define a type-safe HTTP client for API interactions. This module handles the serialization and deserialization of data between the application's data models and the JSON format used by the API. It is central to fetching remote data, uploading new recordings, and authenticating users.

## 2. Key Components

*   `ApiService.kt`: A Retrofit interface that defines all the API endpoints. It uses annotations to specify the HTTP method (e.g., GET, POST), URL path, and request/response bodies for each endpoint.
*   `dto` package: This package contains all the Data Transfer Objects (DTOs). These are Kotlin data classes that model the JSON objects sent to and received from the API. They are used by Retrofit and Gson to automatically serialize and deserialize network request and response bodies.
    *   `AuthDtos.kt`: Contains data classes for authentication-related requests and responses.
    *   `AudioMetadataDto.kt`: Represents the metadata for a single audio recording on the server.
    *   `UserProfileDto.kt`: Represents a user's profile data.
    *   `UserNoteDto.kt`: Represents a user note on the server.
    *   And many others for specific API interactions.

## 3. Dependencies

### Internal Dependencies
*   None. This module provides data to other parts of the Data Layer, primarily the repositories.

### External Dependencies
*   [Retrofit](https://square.github.io/retrofit/): The core library used to create a type-safe HTTP client for interacting with the backend API.
*   [OkHttp](https://square.github.io/okhttp/): Provides the underlying HTTP client and interceptors for Retrofit, used here to add authentication headers to outgoing requests.
*   [Gson](https://github.com/google/gson): Used by Retrofit to convert JSON API responses into Kotlin DTO objects and vice versa.

## 4. Usage / Integration

The `ApiService` is injected via Hilt into repository implementations, which then call its methods to perform network operations. The repositories are responsible for handling the response and mapping the DTOs to domain models if necessary.

### Example: How to fetch the user's profile

```kotlin
// In a repository implementation
class AuthRepositoryImpl @Inject constructor(
    private val apiService: ApiService,
    private val userDataStore: UserDataStore
) : AuthRepository {

    override suspend fun fetchAndCacheUserProfile(): Resource<UserProfileDto> {
        try {
            val response = apiService.getUserProfile()
            if (response.isSuccessful) {
                val userProfile = response.body()
                userProfile?.let {
                    userDataStore.saveUserProfile(it)
                    return Resource.Success(it)
                }
            }
            return Resource.Error("Failed to fetch profile: ${response.message()}")
        } catch (e: Exception) {
            return Resource.Error("An error occurred: ${e.message}")
        }
    }
}