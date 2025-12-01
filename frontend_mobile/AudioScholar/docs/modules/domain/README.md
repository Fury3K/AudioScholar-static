# Domain Layer

**Layer:** Domain

## 1. Overview

The Domain Layer is the core of the AudioScholar application, encapsulating all its business logic. It is designed to be completely independent of the UI and Data layers, meaning it has no knowledge of how data is displayed or where it comes from. This layer defines the essential business models, the repository interfaces that dictate data access contracts, and the use cases (or interactors) that orchestrate the application's workflows.

## 2. Key Components

The Domain Layer is organized into three primary sub-packages:

*   `model`: Contains the fundamental data structures and business objects of the application (e.g., `PasswordStrength`, `QualitySetting`). These are plain Kotlin classes or enums that represent the core entities of the domain.
*   `repository`: Defines the interfaces (`contracts`) for data access operations. These interfaces abstract the data sources, allowing the domain logic to remain unaware of whether data is fetched from a local database or a remote server.
*   `usecase`: Holds the individual business rules and interactors. Each use case is responsible for a single, specific task (e.g., `PasswordValidator`). ViewModels in the UI layer call these use cases to execute business logic.

## 3. Dependencies

### Internal Dependencies
*   None. The Domain Layer is the most central and independent layer in the application.

### External Dependencies
*   Kotlin Standard Library

## 4. Usage / Integration

The Domain Layer is integrated with the other layers in the following ways:

*   **UI Layer:** ViewModels in the UI layer depend on and invoke use cases from the Domain Layer to perform business operations in response to user actions.
*   **Data Layer:** The Data Layer provides concrete implementations for the repository interfaces defined in the Domain Layer. This dependency inversion is a key principle of Clean Architecture, ensuring the domain remains independent of data source specifics.

### Example: How a ViewModel uses a Use Case

```kotlin
// Example inside a ViewModel in the UI Layer
class RegistrationViewModel(
    private val passwordValidator: PasswordValidator // Injected from Domain Layer
) : ViewModel() {

    fun onPasswordChanged(password: String) {
        val (strength, errors) = PasswordValidator.validatePassword(password)
        // Update UI state with the validation results
    }
}