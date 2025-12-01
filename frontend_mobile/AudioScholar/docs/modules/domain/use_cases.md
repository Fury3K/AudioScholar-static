# Domain Use Cases

**Type:** Use Case
**Package:** `edu.cit.audioscholar.domain.usecase`
**Source:** [PasswordValidator.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/usecase/PasswordValidator.kt)

## Responsibility
This document details the Use Cases within the domain layer. Use Cases represent specific business rules or logic that the application performs. They are pure Kotlin implementations that encapsulate single responsibilities.

---

## 1. PasswordValidator
**Source:** [PasswordValidator.kt](../../../app/src/main/java/edu/cit/audioscholar/domain/usecase/PasswordValidator.kt)

A singleton object responsible for evaluating the strength of a given password string against defined security policies and returning specific validation errors if any policies are violated.

### Public API

#### `validatePassword(password: String): Pair<PasswordStrength, List<UiText>>`
Evaluates a password string and returns its calculated strength along with a list of specific validation errors.

- **Parameters**:
    - `password`: The plain text password string to evaluate.
- **Returns**: A `Pair` containing:
    1. `PasswordStrength`: The calculated strength level (`STRONG`, `MEDIUM`, `WEAK`).
    2. `List<UiText>`: A list of localized error messages describing which criteria were not met.

### Business Rules
The validator checks for the following criteria:
1. **Length**: Must be at least 8 characters.
2. **Uppercase**: Must contain at least one uppercase letter.
3. **Lowercase**: Must contain at least one lowercase letter.
4. **Digit**: Must contain at least one numeric digit.
5. **Special Character**: Must contain at least one special character (non-letter/non-digit).

### Strength Calculation Logic
- **STRONG**: 0 errors found (all criteria met).
- **MEDIUM**: 1 error found.
- **WEAK**: 2 or more errors found.

### Collaborators
- `PasswordStrength`: Enum for result type.
- `UiText`: Utility for wrapping string resources to ensure errors are localizable.
- `R.string`: References specific string resources for error messages (e.g., `settings_password_validation_length`).

### Implementation Details
The `validatePassword` function is a pure function (no side effects). It builds a mutable list of errors by checking the input string against each rule sequentially. The final strength is derived solely from the count of accumulated errors.

### Usage Example

```kotlin
val password = "MySecretPassword123!"
val (strength, errors) = PasswordValidator.validatePassword(password)

if (errors.isEmpty()) {
    // Password is valid and STRONG
    proceedWithRegistration()
} else {
    // Show errors to user
    errors.forEach { errorUiText ->
        showToast(errorUiText.asString(context))
    }
}