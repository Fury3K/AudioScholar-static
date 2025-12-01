# Core UI Components

This document details the reusable UI components used throughout the AudioScholar application to ensure design consistency and reduce boilerplate.

**Package:** `edu.cit.audioscholar.ui.components`

## ModernButton

**Source:** [ModernButton.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/components/ModernButton.kt)

### Responsibility
Provides a consistent styled button following the application's design system. It supports both filled and outlined styles.

### Public API

#### `ModernButton` (Composable)
A filled button with rounded corners and a minimum height.

- **Parameters**:
    - `onClick`: `() -> Unit` - Callback invoked when the button is clicked.
    - `modifier`: `Modifier` - Modifier to be applied to the button.
    - `enabled`: `Boolean` - Controls the enabled state of the button.
    - `colors`: `ButtonColors` - The colors to use for the button.
    - `elevation`: `ButtonElevation?` - The elevation to use for the button.
    - `content`: `@Composable () -> Unit` - The content to be displayed inside the button.

#### `ModernButton` (Overload)
A convenience overload that takes a simple string for text content.

- **Parameters**:
    - `text`: `String` - The text to display.
    - ... (Standard parameters same as above)

#### `ModernOutlinedButton` (Composable)
An outlined version of the button.

- **Parameters**:
    - `onClick`: `() -> Unit`
    - `modifier`: `Modifier`
    - ... (Standard parameters)
    - `content`: `@Composable () -> Unit`

### Usage Example

```kotlin
ModernButton(
    text = "Login",
    onClick = { viewModel.onLoginClick() },
    modifier = Modifier.fillMaxWidth()
)

ModernOutlinedButton(
    onClick = { viewModel.onGoogleSignInClick() }
) {
    Icon(...)
    Text("Sign in with Google")
}
```

## ModernTextField

**Source:** [ModernTextField.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/components/ModernTextField.kt)

### Responsibility
A wrapper around Material3's `OutlinedTextField` with pre-configured styling (rounded corners, typography) for consistency across forms.

### Public API

#### `ModernTextField` (Composable)

- **Parameters**:
    - `value`: `String` - The input text to be shown in the text field.
    - `onValueChange`: `(String) -> Unit` - The callback that is triggered when the input service updates the text.
    - `label`: `String?` - Optional label to be displayed inside the text field container.
    - `placeholder`: `String?` - Optional placeholder to be displayed when the text field is in focus and the input text is empty.
    - `leadingIcon`: `@Composable (() -> Unit)?` - Optional leading icon to be displayed at the start of the text field container.
    - `trailingIcon`: `@Composable (() -> Unit)?` - Optional trailing icon to be displayed at the end of the text field container.
    - `isError`: `Boolean` - Indicates if the text field's current value is in an error state.
    - `visualTransformation`: `VisualTransformation` - Transforms the visual representation of the input value (e.g., for passwords).
    - `keyboardOptions`: `KeyboardOptions` - Software keyboard options.
    - `keyboardActions`: `KeyboardActions` - Actions to take when specific keyboard keys are pressed.

### Usage Example

```kotlin
ModernTextField(
    value = uiState.email,
    onValueChange = viewModel::onEmailChange,
    label = "Email",
    leadingIcon = { Icon(Icons.Filled.Email, contentDescription = null) },
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
)
```

## ModernCard

**Source:** [ModernCard.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/components/ModernCard.kt)

### Responsibility
A styled Card component with consistent elevation, rounded corners, and internal padding.

### Public API

#### `ModernCard` (Composable)

- **Parameters**:
    - `modifier`: `Modifier`
    - `colors`: `CardColors`
    - `elevation`: `CardElevation`
    - `content`: `@Composable ColumnScope.() -> Unit` - The content to be displayed inside the card.

### Usage Example

```kotlin
ModernCard(
    modifier = Modifier.fillMaxWidth(),
    onClick = { /* navigate */ } // Note: Check source for clickable support if added later
) {
    Text(text = "Card Title", style = MaterialTheme.typography.titleMedium)
    Text(text = "Card content goes here...")
}
```

## ModernDialog

**Source:** [ModernDialog.kt](../../../app/src/main/java/edu/cit/audioscholar/ui/components/ModernDialog.kt)

### Responsibility
A wrapper around `AlertDialog` to provide a consistent look and feel for modal dialogs.

### Public API

#### `ModernDialog` (Composable)

- **Parameters**:
    - `onDismissRequest`: `() -> Unit` - Executed when the user tries to dismiss the dialog.
    - `title`: `String` - The title text.
    - `content`: `@Composable () -> Unit` - The body content of the dialog.
    - `confirmButton`: `@Composable () -> Unit` - The confirmation button.
    - `dismissButton`: `@Composable (() -> Unit)?` - The dismissal button (optional).
    - `icon`: `@Composable (() -> Unit)?` - Optional icon above the title.

### Usage Example

```kotlin
if (showDialog) {
    ModernDialog(
        onDismissRequest = { showDialog = false },
        title = "Confirm Deletion",
        content = { Text("Are you sure you want to delete this item?") },
        confirmButton = {
            TextButton(onClick = { onDelete(); showDialog = false }) {
                Text("Delete")
            }
        },
        dismissButton = {
            TextButton(onClick = { showDialog = false }) {
                Text("Cancel")
            }
        }
    )
}