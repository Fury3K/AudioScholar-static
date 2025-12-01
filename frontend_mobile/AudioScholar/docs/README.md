# AudioScholar Mobile Application Documentation

## 1. Getting Started

Welcome to the technical documentation for the AudioScholar mobile application. This documentation is designed to serve as a central resource for developers, providing a comprehensive guide to the application's architecture, modules, and components.

To get started, familiarize yourself with the overall architecture below. Then, use the **Navigation Map** to find the specific module that interests you. Each module's `README.md` provides a high-level overview of its responsibilities and key components.

## 2. System Overview

The application is built following the principles of **Clean Architecture**, which separates the codebase into distinct layers, each with a specific responsibility. This approach enhances modularity, scalability, and testability.

The core of our architectural approach is the separation of concerns into three primary layers:

*   **UI Layer:** Responsible for displaying data and handling user interactions.
*   **Domain Layer:** Contains the core business logic, models, and use cases of the application.
*   **Data Layer:** Manages all data operations, including fetching data from remote APIs and caching it locally.

This structure ensures that dependencies flow inwards, from the outer layers (UI, Data) to the inner layer (Domain), making the core business logic independent of implementation details.

## 3. Navigation Map

Use this map to quickly locate the documentation for different parts of the application.

| To learn about...                                  | Go to...                                                    |
| -------------------------------------------------- | ----------------------------------------------------------- |
| **Core business logic and models**                 | [**Domain Layer**](./modules/domain/README.md)              |
| &nbsp;&nbsp;&nbsp;↳ Business entities              | `Domain Layer > models.md`                                  |
| &nbsp;&nbsp;&nbsp;↳ Application use cases          | `Domain Layer > use_cases.md`                               |
| **Data sources and repositories**                  | [**Data Layer**](./modules/data/README.md)                  |
| &nbsp;&nbsp;&nbsp;↳ Local database (Room)          | `Data Layer > local_database.md`                            |
| &nbsp;&nbsp;&nbsp;↳ Remote API (Retrofit)          | `Data Layer > remote_api.md`                                |
| &nbsp;&nbsp;&nbsp;↳ Repository pattern             | `Data Layer > repositories.md`                              |
| **UI screens and components**                      | [**UI Layer**](./modules/ui/README.md)                      |
| &nbsp;&nbsp;&nbsp;↳ Reusable components            | `UI Layer > core_components.md`                             |
| &nbsp;&nbsp;&nbsp;↳ Authentication flow            | `UI Layer > authentication.md`                              |
| &nbsp;&nbsp;&nbsp;↳ Recording library              | `UI Layer > library.md`                                     |
| &nbsp;&nbsp;&nbsp;↳ Audio recording                | `UI Layer > recording.md`                                   |
| **Background processes**                           | [**Services Layer**](./modules/services/README.md)          |
| &nbsp;&nbsp;&nbsp;↳ Background recording/playback  | `Services Layer > ...`                                      |
| **Common helper functions**                        | [**Utils Layer**](./modules/utils/README.md)                |

## 4. User Resources & Legal

For end-user documentation and legal information, please refer to:

*   [**Help Center**](./HelpCenter.md): FAQ and guides on how to use the application.
*   [**Privacy Policy**](./PrivacyPolicy.md): Details on how we handle your data.
*   [**Terms of Service**](./Terms.md): The terms governing your use of AudioScholar.
