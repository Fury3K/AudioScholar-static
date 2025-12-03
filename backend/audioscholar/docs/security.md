# Security Module

## 1. Module Overview

The Security module is responsible for authentication and authorization for the AudioScholar backend. Its primary role is to secure API endpoints by managing JSON Web Tokens (JWTs), including their creation, validation, and revocation. This ensures that only authenticated and authorized users can access protected resources.

## 2. Key Classes & Components

| Class / Component | Description |
|---|---|
| `JwtTokenProvider.java` | A core utility class responsible for generating, parsing, and validating JWTs used for user authentication. |
| `JwtDenylistFilter.java` | A Spring Security filter that intercepts requests to check if the provided JWT has been revoked (e.g., after a user logs out). |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
- Generating signed JWTs upon successful user authentication.
- Validating incoming JWTs to authenticate API requests.
- Parsing user details (ID, roles) from a valid token.
- Checking for revoked tokens to prevent their reuse after logout.
- Integrating with Spring Security to protect application endpoints.

**Example Workflow: JWT-based Authentication**
1.  **Step 1:** A user authenticates via the `AuthController`, which uses Spring Security to validate credentials.
2.  **Step 2:** Upon success, `JwtTokenProvider.generateToken()` is called to create a JWT containing the user's identity and roles.
3.  **Step 3:** The token is returned to the client in an `AuthResponse`.
4.  **Step 4:** For subsequent requests, the client includes the JWT in the `Authorization: Bearer <token>` header.
5.  **Step 5:** A standard JWT authentication filter (part of Spring Security config) validates the token using `JwtTokenProvider.validateToken()`.
6.  **Step 6:** The `JwtDenylistFilter` then runs, checking with the `TokenRevocationService` to ensure the token hasn't been denylisted. If it has, the request is rejected with a 401 Unauthorized error.
7.  **Step 7:** If the token is valid and not revoked, the request proceeds to the target controller.

## 4. Dependencies

**Internal Dependencies:**
- **Service Module:** The `JwtDenylistFilter` depends on the `TokenRevocationService` to check if a token is present in the denylist.

**External Dependencies:**
- **Spring Security (`spring-boot-starter-security`)**: Used for the overall security framework, authentication management, and filter chain.
- **Java JWT (`io.jsonwebtoken`)**: The underlying library used for creating and parsing JSON Web Tokens.
- **SLF4J API (`slf4j-api`)**: Used for structured logging within the security components.

## 5. Configuration

The security module relies on properties defined in `application.properties`.

| Property | File | Description |
|---|---|---|
| `app.jwt.secret` | `application.properties` | The Base64-encoded secret key used for signing and verifying JWTs. Must be a strong, unique secret in production. |
| `app.jwt.expiration-ms` | `application.properties` | Defines the validity period of a JWT in milliseconds. |