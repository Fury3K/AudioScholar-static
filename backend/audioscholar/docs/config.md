# Config Module

## 1. Module Overview

The Config module is responsible for the setup and initialization of all application-wide configurations for the AudioScholar backend. This includes setting up core Spring Framework beans, configuring security policies, establishing connections to third-party services like Firebase and RabbitMQ, and managing environment-specific variables. Its primary role is to ensure that all parts of the application have access to the necessary components and settings required to function correctly.

## 2. Key Classes & Components

| Class / Component | Description |
| --- | --- |
| `AppConfig.java` | Configures general-purpose application beans, including `RestTemplate`, `WebClient`, and a Caffeine-based `CacheManager` for in-memory caching. |
| `DotenvConfig.java` | Loads environment variables from a `.env` file into the Spring Environment, allowing for flexible configuration outside of compiled code. |
| `FirebaseConfig.java` | Initializes the connection to the Firebase Admin SDK, authenticating the application using service account credentials. |
| `FirestoreConfig.java` | Provides a `Firestore` bean for database interactions, retrieving it from the already initialized Firebase application instance. |
| `RabbitMQConfig.java` | Defines the entire messaging architecture for RabbitMQ, including exchanges, queues, and bindings for asynchronous tasks like audio processing and summarization. |
| `SecurityConfig.java` | Implements the core security layer using Spring Security. It configures CORS, JWT validation, OAuth2 login, and defines distinct security rules for stateful and stateless endpoints. |
| `WebConfig.java` | Provides web-layer configurations, such as custom `ObjectMapper` settings for JSON serialization and global CORS mappings. |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
- **Bean Initialization:** Creates and configures essential Spring beans that are injected across the application (e.g., `RestTemplate`, `PasswordEncoder`).
- **Security Enforcement:** Establishes comprehensive security rules, including authentication, authorization, and Cross-Origin Resource Sharing (CORS) policies.
- **External Service Integration:** Manages the setup and connection to external services, primarily Firebase (for Firestore) and RabbitMQ (for message queuing).
- **Environment Abstraction:** Loads environment-specific settings from `.env` files, decoupling the application from hard-coded configuration values.
- **Asynchronous Messaging Setup:** Declares all necessary queues, exchanges, and bindings for the event-driven architecture powered by RabbitMQ.

**Example Workflow: Application Startup**
1.  **Step 1:** On application start, Spring's component scanning identifies all classes annotated with `@Configuration`.
2.  **Step 2:** `DotenvConfig.java` is triggered first to load all variables from the `.env` file into the Spring `Environment`.
3.  **Step 3:** `FirebaseConfig.java` uses the loaded environment variables to find credentials and initializes the `FirebaseApp` singleton.
4.  **Step 4:** `FirestoreConfig.java` and other configurations that depend on `FirebaseApp` can now successfully create their beans (e.g., `Firestore`).
5.  **Step 5:** `SecurityConfig.java` builds the security filter chains, defining which API endpoints are public and which are protected.
6.  **Step 6:** All other configuration classes (`AppConfig`, `RabbitMQConfig`, `WebConfig`) initialize their respective beans, making them available for dependency injection throughout the application.

## 4. Dependencies

**Internal Dependencies:**
- **Security Module:** The `SecurityConfig` class relies on components from the `security` package, such as `JwtTokenProvider` and `JwtDenylistFilter`, to implement token handling.
- **Service Module:** The `SecurityConfig` depends on `OAuth2LoginSuccessHandler` and `TokenRevocationService` from the `service` module to manage login and logout flows.

**External Dependencies:**
- **Spring Framework (`spring-boot-starter-*`)**: Used extensively for dependency injection, web server setup, security, and data access.
- **Spring Security (`spring-security-oauth2-resource-server`)**: Used for handling authentication and authorization via JWT and OAuth2.
- **Firebase Admin SDK (`firebase-admin`)**: Used for integrating with Firebase services, specifically Firestore.
- **RabbitMQ (`spring-rabbit`)**: Used for implementing the asynchronous message queue system.
- **Caffeine Cache (`caffeine`)**: Used as a high-performance in-memory caching solution.
- **Dotenv Java (`java-dotenv`)**: Used to load environment variables from `.env` files.

## 5. Configuration

| Property | File | Description |
| --- | --- | --- |
| `GOOGLE_APPLICATION_CREDENTIALS` | `.env` / System Environment | Specifies the file path to the Firebase service account JSON key, used by `FirebaseConfig.java` to authenticate. |
| `spring.rabbitmq.listener.simple.concurrency` | `application.properties` | Sets the default number of concurrent consumers for RabbitMQ listeners, configured in `RabbitMQConfig.java`. |
| `spring.rabbitmq.listener.simple.max-concurrency` | `application.properties` | Sets the maximum number of concurrent consumers that a RabbitMQ listener can scale up to. |