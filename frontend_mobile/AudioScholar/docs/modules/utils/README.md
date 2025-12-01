# Utils Layer

**Layer:** Util

## 1. Overview

This document describes the utility classes and functions available in the AudioScholar mobile application. The components in this layer provide common, reusable logic that can be leveraged across different parts of the application, promoting code reuse and maintainability.

## 2. Key Components

- `FileUtils.kt`: Contains helper functions for file and directory management.
- `UiText.kt`: A utility for handling dynamic text in the UI, supporting both static strings and string resources.
- `Resource.kt`: A generic class for encapsulating data with a loading state, commonly used with network responses.

## 3. Dependencies

This module is designed to be self-contained and has no internal dependencies on other application layers.

### External Dependencies
- Kotlin Standard Library