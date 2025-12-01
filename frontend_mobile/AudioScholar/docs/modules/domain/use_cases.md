# Domain Use Cases

**Layer:** Domain

## 1. Overview

This document describes the use cases (also known as interactors) within the Domain Layer. Each use case encapsulates a specific piece of business logic, orchestrating the flow of data between the UI and Data layers without being directly coupled to them. They represent the actions a user can perform within the application.

## 2. Key Components

*   `PasswordValidator.kt`: A singleton object that provides a function to validate a user's password based on a set of predefined security rules. It checks for length, uppercase and lowercase characters, numbers, and special characters.

## 3. Dependencies

### Internal Dependencies
*   `domain.model.PasswordStrength`: Used to classify the strength of the password.
*   `util.UiText`: Used to provide localized error messages for display in the UI.

### External Dependencies
*   Kotlin Standard Library

## 4. Usage / Integration

Use cases are typically injected into ViewModels in the UI layer, which then call them to execute business logic.

### Example: Validating a password in a ViewModel

```kotlin
// In RegistrationViewModel.kt (UI Layer)
import edu.cit.audioscholar.domain.usecase.PasswordValidator

class RegistrationViewModel : ViewModel() {

    fun validate(password: String) {
        val (strength, errors) = PasswordValidator.validatePassword(password)
        
        // The ViewModel would then update its state to reflect the
        // strength and the list of specific validation errors,
        // allowing the UI to display appropriate feedback to the user.
        // For example:
        // _uiState.update { it.copy(passwordStrength = strength, passwordErrors = errors) }
    }
}