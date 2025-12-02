# Project Info Summary

## Executive Summary
AudioScholar is an intelligent, multi-user platform designed to record lecture audio and leverage AI-driven summarization techniques to produce structured insights for learners. The system consists of an Android mobile application for recording and management, a React-based web interface for review and uploading, and a Spring Boot backend handling AI processing (Google Gemini), data storage (Firestore), and recommendations (YouTube Data API).

## Advisers & Team
*   **Adviser/Lead:** Ralph P. Laviste
*   **Group Adviser:** Jasmine A. Tulin
*   **Proponents:**
    *   Biacolo, Math Lee L.
    *   Terence, John Duterte
    *   Orlanes, John Nathan
    *   Barrientos, Claive Justin
    *   Alpez, Christian Brent

## Tech Stack

### Backend (`backend/audioscholar`)
*   **Language:** Java 24
*   **Framework:** Spring Boot 3.5.8
*   **Build Tool:** Maven (mvnw)
*   **Database:** Google Cloud Firestore
*   **Authentication:** Firebase Authentication, OAuth 2.0 (Google, GitHub)
*   **AI & APIs:**
    *   Google Gemini AI API (via `google-cloud-firestore` exclusions? No, likely direct REST or custom implementation as no specific Gemini SDK dependency is evident besides generic Google Client, check source if needed, but `GeminiService.java` exists).
    *   YouTube Data API v3 (`v3-rev20250224-2.0.0`)
*   **Key Dependencies:**
    *   `spring-boot-starter-webflux` (Reactive Web)
    *   `spring-boot-starter-security`
    *   `spring-boot-starter-amqp` (RabbitMQ integration inferred)
    *   `firebase-admin` (9.6.0)
    *   `apache-poi` & `pdfbox` (Document processing)
    *   `bucket4j` (Rate limiting)

### Mobile (`frontend_mobile/AudioScholar`)
*   **Platform:** Android (Min SDK 24, Target SDK 35, Compile SDK 35)
*   **Language:** Kotlin (JVM Target 17)
*   **UI Framework:** Jetpack Compose (BOM used)
*   **Architecture/DI:** Hilt
*   **Local Database:** Room (2.8.1)
*   **Networking:** Retrofit, OkHttp, Ktor Client (2.3.12)
*   **Media:** Media3 ExoPlayer (1.6.1)
*   **Cloud/Auth:** Firebase Auth, Analytics, Messaging

### Web (`frontend_web/audioscholar-app`)
*   **Framework:** React 19
*   **Build Tool:** Vite 6.4.1
*   **Styling:** Tailwind CSS 4.1.1, Material UI Icons
*   **Routing:** React Router DOM 7.5.2
*   **State/Data:** Firebase (11.6.0), Axios

## Deployment & Build Cues
*   **Backend:**
    *   Contains `Dockerfile`.
    *   Includes `run-with-env.bat` and `run-with-env.sh` for local execution with environment variables.
    *   Standard Maven build: `./mvnw clean install`.
*   **Mobile:**
    *   Standard Gradle build: `./gradlew assembleDebug`.
    *   Contains `google-services.json` (implied by plugin usage, though usually ignored).
*   **Web:**
    *   Standard Node/Vite build: `npm run build`.
    *   Preview: `npm run preview`.