# Repositories

**Layer:** Data

## 1. Overview

The repository module is a critical component of the Data Layer, implementing the Repository design pattern. Its primary responsibility is to act as a single source of truth for application data. Repositories abstract the data sources from the rest of the application, meaning the Domain Layer does not need to know whether the data is coming from a local database or a remote server. They manage data fetching, caching, and synchronization logic.

## 2. Key Components

*   `AdminRepositoryImpl.kt`: The implementation of the `AdminRepository` interface defined in the Domain Layer. This repository handles all data operations related to administrative functions, such as fetching user lists, updating user roles, and retrieving analytics data from the remote API.
*   `UserRepository.kt`: This repository manages user-specific data that is not directly related to the user's profile, such as registering an FCM token with the backend.
*   Other Repositories (`AuthRepositoryImpl.kt`, `LocalAudioRepositoryImpl.kt`, `RemoteAudioRepositoryImpl.kt`): While their implementations are in the `domain/repository` package for this project, they logically function as part of the data layer's repository pattern. They handle user authentication, and local/remote audio data management respectively.

## 3. Dependencies

### Internal Dependencies
*   Domain Layer: Repositories in this module implement interfaces defined in the Domain Layer's `repository` package.
*   `local` module: Repositories interact with DAOs and DataStore to access and persist data locally.
*   `remote` module: Repositories use the `ApiService` to fetch data from and send data to the backend server.

### External Dependencies
*   [Kotlin Coroutines & Flow](https://kotlinlang.org/docs/coroutines-guide.html): Used extensively to handle asynchronous operations and provide reactive data streams to the upper layers.
*   [Hilt](https://dagger.dev/hilt/): For dependency injection of `ApiService`, DAOs, and other components into the repositories.

## 4. Usage / Integration

Use cases in the Domain Layer are injected with repository interfaces. This allows the use cases to request data without being coupled to the implementation details of the Data Layer.

### Example: How admin analytics are fetched

The `AdminRepository` provides a `Flow` of `Resource` objects, which encapsulates the data along with its loading or error state. This pattern is used throughout the application for a consistent way of handling data operations.

```kotlin
// In a ViewModel, calling a use case that depends on AdminRepository
viewModelScope.launch {
    getAnalyticsOverviewUseCase().collect { resource ->
        when (resource) {
            is Resource.Loading -> {
                // Show loading indicator
            }
            is Resource.Success -> {
                // Display the analytics overview data
                val overview = resource.data
            }
            is Resource.Error -> {
                // Show error message
            }
        }
    }
}