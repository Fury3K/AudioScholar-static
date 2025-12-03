# Utility Helpers

## FileUtils

**Type:** Utility
**Package:** `edu.cit.audioscholar.util`
**Source:** [FileUtils.kt](../../../app/src/main/java/edu/cit/audioscholar/util/FileUtils.kt)

### Responsibility
Provides helper methods for handling file URIs and extracting file metadata like names, ensuring consistent file naming conventions across the app.

### Public API

#### Methods

##### `getFileName(uri: Uri): String?`
Extracts the display name of a file from a content URI. Falls back to the path if the query fails.

- **Parameters**:
    - `uri`: The content URI of the file.
- **Returns**: The sanitized file name (slashes replaced with underscores) or null if extraction fails.
- **Throws**: Logs exceptions internally, returns null.

##### `getFileNameWithoutExtension(fullFileName: String?): String`
Removes the file extension from a file name string.

- **Parameters**:
    - `fullFileName`: The complete file name (e.g., "audio.mp3").
- **Returns**: The file name without extension (e.g., "audio"). Returns "Recording" if input is blank.

### Collaborators
- `Context`: Injected via Hilt (@ApplicationContext) to access `ContentResolver`.

---

## UiText

**Type:** Utility (Sealed Class)
**Package:** `edu.cit.audioscholar.util`
**Source:** [UiText.kt](../../../app/src/main/java/edu/cit/audioscholar/util/UiText.kt)

### Responsibility
A wrapper for UI strings that allows ViewModels to pass string resources (IDs) or dynamic strings to the UI layer without holding a reference to `Context`.

### Public API

#### Variants
- `DynamicString(val value: String)`: Holds a raw string.
- `StringResource(@StringRes val resId: Int, vararg val args: Any)`: Holds a resource ID and optional formatting arguments.

#### Methods

##### `asString(): String`
Composable function to resolve the string value within a Composable scope.

- **Returns**: The resolved string.

##### `asString(context: Context): String`
Resolves the string value using a provided Context.

- **Parameters**:
    - `context`: Android Context.
- **Returns**: The resolved string.

---

## FcmTokenProvider

**Type:** Utility (Object)
**Package:** `edu.cit.audioscholar.util`
**Source:** [FcmTokenProvider.kt](../../../app/src/main/java/edu/cit/audioscholar/util/FcmTokenProvider.kt)

### Responsibility
Provides a simplified, coroutine-based way to retrieve the current Firebase Cloud Messaging (FCM) token.

### Public API

#### Methods

##### `getCurrentToken(): String?`
Asynchronously fetches the current FCM token from `FirebaseMessaging`.

- **Returns**: The token string if successful, or null if it fails.
- **Throws**: Logs exceptions internally, returns null.

---

## PremiumStatusManager

**Type:** Manager (Singleton)
**Package:** `edu.cit.audioscholar.util`
**Source:** [PremiumStatusManager.kt](../../../app/src/main/java/edu/cit/audioscholar/util/PremiumStatusManager.kt)

### Responsibility
Manages the user's premium subscription status, persisting it locally and verifying it against user roles or JWT tokens.

### Public API

#### Properties
- `isPremiumUserFlow`: `StateFlow<Boolean>` emitting the current premium status.

#### Methods

##### `updatePremiumStatus(userProfile: UserProfileDto?)`
Updates the status based on roles in the user profile. Falls back to JWT inspection if profile roles are ambiguous.

##### `updatePremiumStatus(isPremium: Boolean)`
Directly sets the premium status.

##### `isPremiumUser(): Boolean`
Checks the stored preference. If not found, attempts to resolve from the cached JWT token.

##### `clearPremiumStatus()`
Resets the premium status to false and clears the preference.

### Collaborators
- `SharedPreferences`: For persisting the status boolean.

---

## Resource

**Type:** Wrapper (Sealed Class)
**Package:** `edu.cit.audioscholar.util`
**Source:** [Resource.kt](../../../app/src/main/java/edu/cit/audioscholar/util/Resource.kt)

### Responsibility
A generic wrapper class used throughout the data and domain layers to hold data along with its state (Success, Error, Loading).

### Public API

#### Variants
- `Success<T>(data: T)`
- `Error<T>(message: String, data: T? = null)`
- `Loading<T>(data: T? = null)`

#### Extension Functions
- `onSuccess(action: (T) -> Unit): Resource<T>`
- `onFailure(action: (Throwable) -> Unit): Resource<T>`