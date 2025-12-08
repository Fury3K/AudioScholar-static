# Presentation Slides: AudioScholar - Final Capstone Defense

**Project:** AudioScholar: Transforming Audio into Actionable Insights for Learners  
**Date:** December 2025  
**Target Audience:** Academic Panel / Final Capstone Defense  
**Total Slides:** 10  
**Time Allocation:** 10 Minutes Presentation + 5 Minutes Q&A

---

## **CRITICAL PRESENTATION REQUIREMENTS**

### **Dress Code & Identification**
- ⚠️ **ALL presenters MUST wear the official school uniform**
- ⚠️ **ALL presenters MUST wear name tags with:**
  - Complete Name
  - Group Code + Member Number (e.g., "G5-M1")

### **Member Assignment Rules**
- **Members 1 and 2:** May be pre-identified before the defense
- **Members 3, 4, and 5:** Will be **RANDOMLY SELECTED** during the presentation
  - All team members must be prepared to present any of these sections

---

## **Team Members**

| Member # | Name | Role |
|----------|------|------|
| 1 | Math Lee L. Biacolo | Team Leader |
| 2 | Nathan John Orlanes | Developer |
| 3 | Christian Brent Alpez | Developer |
| 4 | Claive Justin Barrientos | Developer |
| 5 | Terence John Duterte | Developer |

**Adviser:** Jasmine A. Tulin

---

## **Essential Transactions Identified for Demo**

| Transaction | Description | Primary Feature |
|-------------|-------------|-----------------|
| **Essential Transaction 1** | Audio Recording & Background Upload | Offline-first recording → automatic cloud sync → server processing initiation |
| **Essential Transaction 2** | AI Summarization with Context Injection | PowerPoint slide upload → Gemini AI analysis → structured study guide generation |

---

## **MEMBER-BASED PRESENTATION STRUCTURE**

---

### **📋 MEMBER 1 SECTION** *(PPT Required, ~2.5 minutes)*

#### **SLIDE 1: Title & Team Introduction**

**Visual Content:**
- **Project Name:** AudioScholar
- **Tagline:** AI-Powered Lecture Note-Taking System
- **Subtitle:** Transforming Audio into Actionable Insights for Learners
- **Institution:** Cebu Institute of Technology - University
- **Team Photo or Member List**

**Content to Present:**
- Project title and tagline
- Brief introduction of the team (5 members)
- Adviser acknowledgment: Ms. Jasmine A. Tulin

> **Speaker Notes:**
> "Good morning/afternoon. We are the team behind AudioScholar. I am [Name], and our team consists of Math Lee Biacolo as Team Leader, Nathan John Orlanes, Christian Brent Alpez, Claive Justin Barrientos, and Terence John Duterte. We are guided by our adviser, Ms. Jasmine Tulin."

---

#### **SLIDE 2: Problem Being Solved**

**Visual Content:**
- **Headline:** The Cognitive Bottleneck in Education
- **Key Visual:** Split-attention diagram showing student torn between listening and writing
- **Key Statistics/Pain Points:**
  - Students cannot actively listen AND write simultaneously
  - Manual transcription of 1-hour lecture takes 2-3 hours
  - Existing tools (Otter.ai, Rev) are expensive and lack academic context

> **Speaker Notes:**
> "University students face a critical challenge: the 'Cognitive Bottleneck'. It is nearly impossible to actively listen to complex lectures while simultaneously writing comprehensive notes. Current solutions either require expensive subscriptions or lack the academic context needed for technical subjects. This gap directly impacts learning outcomes and study efficiency."

---

#### **SLIDE 3: Proposed Solution & Team Roles**

**Visual Content:**
- **Headline:** AudioScholar: Your AI Study Companion
- **Core Features Addressing the Problem:**
  1. **Offline-First Recording** → Addresses: "Fear of missing content"
  2. **AI Summarization (Gemini)** → Addresses: "Time wasted re-listening"
  3. **Context Injection (PPT Upload)** → Addresses: "Lack of academic context"
  4. **Cross-Platform Sync** → Addresses: "Accessibility across devices"

**Team Roles:**
| Member | Primary Responsibility |
|--------|----------------------|
| Math Lee L. Biacolo | System Architecture & Backend Lead & Frontend Mobile Development |
| Nathan John Orlanes | Frontend Web Development |
| Terence John Duterte | Frontend Web Development |
| Christian Brent Alpez | User Research & External Affairs |
| Claive Justin Barrientos | User Research & External Affairs |

> **Speaker Notes:**
> "AudioScholar is a dual-platform system—Android mobile and React web—that automates note-taking. Our essential transactions are: First, recording and uploading audio seamlessly. Second, processing that audio with AI to generate structured summaries. The key innovation is our 'Context Injection' feature—users can upload the professor's slides, and our AI uses this as ground truth to improve accuracy and reduce hallucinations."

---

### **📋 MEMBER 2 SECTION** *(~2 minutes)*

#### **SLIDE 4: Technology Stack**

**Visual Content:**
- **Architecture Diagram showing data flow:**
  - Client Layer → API Gateway → Processing Services → Data Storage

**Tech Stack Grid:**
| Layer | Technology |
|-------|-----------|
| Backend | Java, Spring Boot, RabbitMQ |
| Mobile | Kotlin, Android, Jetpack Compose |
| Web | React, Tailwind CSS, Vite |
| AI/ML | Google Gemini AI |
| Cloud | Firebase, Nhost Storage |
| External APIs | YouTube Data API, ConvertAPI |

> **Speaker Notes:**
> "Our architecture follows microservices principles. The backend uses Spring Boot with RabbitMQ for asynchronous processing—critical for handling long audio files without blocking the user interface. Firebase handles authentication and real-time data, while Nhost manages file storage. Google Gemini powers our AI for both transcription and summarization with context injection."

---

#### **SLIDE 5: Server Services & Transactions Demo**

**Visual Content:**
- **Server Architecture Flow:**
  1. REST API Endpoints (Spring Boot)
  2. Message Queue (RabbitMQ) for async processing
  3. External Service Integration (Gemini, YouTube, ConvertAPI)
  4. Data Persistence Layer (Firestore + Nhost)

**Key Server Transactions:**
- Audio upload → Nhost storage → Processing queue
- AI analysis request → Gemini API → Result caching
- Notification dispatch → Firebase Cloud Messaging

> **Speaker Notes:**
> "Let me demonstrate our server architecture. When audio is uploaded, it's stored in Nhost and a message is queued in RabbitMQ. The processing service picks this up, sends the audio to Gemini for transcription and summarization, then stores the results in Firestore. The user receives a push notification when processing is complete. This asynchronous design ensures the app remains responsive even during lengthy processing tasks."

**[LIVE DEMO: Show server logs or API response flow]**

---

### **📋 MEMBER 3 SECTION** *(Randomly Selected, ~2 minutes)*

#### **SLIDE 6: Essential Transaction 1 - Audio Recording & Upload**

**Visual Content:**
- **Transaction Flow Diagram:**
  ```
  [User taps Record] → [Foreground Service Activated] → [Audio Captured Locally]
         ↓
  [User taps Stop] → [File Saved to Local Storage] → [Background Upload Triggered]
         ↓
  [Server Receives Audio] → [Nhost Storage] → [Processing Queue Entry Created]
         ↓
  [User Notified: "Upload Complete, Processing Started"]
  ```

**Key Technical Points:**
- **Foreground Service:** Prevents Android from killing the recorder
- **Offline-First:** Recording works without internet, stored locally
- **Background Sync:** Automatic upload when connection is available
- **File Formats:** Supports MP3, WAV, M4A, and other common audio formats

> **Speaker Notes:**
> "This is Essential Transaction 1: The complete audio recording and upload flow. Watch as I start a recording... [TAP RECORD]. The app uses a Foreground Service—this is critical because Android aggressively kills background processes to save battery. When I stop recording... [TAP STOP], the file is saved locally first, then uploaded in the background. The user can close the app and the upload continues. Once complete, the server queues the file for AI processing."

**[LIVE DEMO: Record audio on device, show upload progress, show server acknowledgment]**

---

### **📋 MEMBER 4 SECTION** *(Randomly Selected, ~2 minutes)*

#### **SLIDE 7: Essential Transaction 2 - AI Summarization with Context**

**Visual Content:**
- **Transaction Flow Diagram:**
  ```
  [User Uploads PPT Slides (Optional)] → [Cloud Storage] → [Convert to PDF]
         ↓
  [Audio Uploaded] → [Cloud Storage] → [AI Transcription]
         ↓
  [Transcript + PDF Context] → [AI Summarization]
         ↓
  [Results Saved] → [Push Notification: "Study Guide Ready"]
         ↓
  [YouTube API: Fetch Recommended Educational Videos]
  ```

**Output Artifacts:**
1. **Structured Summary:** Markdown-formatted lecture notes
2. **Key Points:** Action items and takeaways
3. **Glossary:** Auto-generated definitions of key terms
4. **Video Recommendations:** Curated educational YouTube videos

> **Speaker Notes:**
> "This is Essential Transaction 2: The AI-powered summarization. First, I'll upload a PowerPoint file... [UPLOAD SLIDES]. The file is converted to PDF for context. When audio transcription completes, the system sends both the transcript AND the PDF to Gemini for summarization. This 'Context Injection' dramatically improves accuracy—the AI knows the exact terminology the professor is using. The result is a structured study guide with summary, glossary, key points, and recommended YouTube videos."

**[LIVE DEMO: Show processed recording with summary, glossary, and recommendations]**

---

### **📋 MEMBER 5 SECTION** *(Randomly Selected, ~1.5 minutes)*

#### **SLIDE 8: Validation & Testing Summary**

**Visual Content:**
- **Testing Overview Table:**

| Test Type | Scope | Results |
|-----------|-------|---------|
| Unit Tests | Backend Services | 85% code coverage |
| Integration Tests | API Endpoints | All critical paths validated |
| Load Testing (k6) | Concurrent Users | Stable at 100 VUs |
| Usability Testing | SUS Survey (N=13) | Score: **76.9/100** (Grade B) |

**Performance Metrics:**
- Average API Response Time: < 200ms
- Audio Processing Time: ~3 min per 1-hour recording
- Mobile App Startup: < 2 seconds

> **Speaker Notes:**
> "Our validation strategy covered multiple layers. Unit tests achieved 85% code coverage on critical backend services. We used k6 for load testing, confirming stability under 100 concurrent virtual users. Most importantly, our System Usability Scale survey with 13 university students achieved a score of 76.9—rated 'Good' and above the industry average of 68."

---

#### **SLIDE 9: Insights, Recommendations & Research Highlights**

**Visual Content:**
- **Key Insights from Development:**
  1. Context Injection reduces AI hallucinations by ~40%
  2. Foreground Service is essential for reliable mobile recording
  3. Asynchronous processing is critical for user experience

- **Recommendations for Future Work:**
  1. Real-time transcription during recording
  2. Multi-language support (Filipino, Cebuano)
  3. LMS integration (Canvas, Blackboard)
  4. Collaborative study group features

**Research Paper Highlights:**
- **Title:** "AudioScholar: An AI-Powered Lecture Note-Taking System Using Context-Aware Summarization"
- **Key Contributions:**
  1. Novel "Context Injection" approach for academic AI accuracy
  2. Validated Technology Acceptance Model (TAM) scores: PU=4.46/5, PEOU=4.15/5
  3. Open-source implementation for academic research reproducibility

> **Speaker Notes:**
> "From our research, three key insights emerged: First, Context Injection—feeding slides to the AI—reduced hallucinations significantly. Second, Android's process management required careful engineering with Foreground Services. Third, asynchronous processing was non-negotiable for good UX. Our research paper contributes a novel context-aware summarization approach, validated by strong TAM scores indicating high perceived usefulness and intention to use among students."

---

#### **SLIDE 10: Conclusion & Q&A**

**Visual Content:**
- **Summary Statement:** "AudioScholar bridges the gap between listening and learning."
- **Project Links:**
  - GitHub: https://github.com/MasuRii/AudioScholar
  - All Links: https://linktr.ee/AudioScholar
- **Acknowledgments:**
  - Adviser: Ms. Jasmine A. Tulin
  - Cebu Institute of Technology - University
- **"We are now open for questions."**

> **Speaker Notes:**
> "In conclusion, AudioScholar addresses a validated student need—the cognitive bottleneck of note-taking. Our technical implementation is robust, our testing confirms stability, and student feedback shows strong adoption potential. Thank you for your attention. We welcome your questions."

---

## **APPENDIX: Preparation Checklist**

### **Before Defense Day:**
- [ ] All 5 members know ALL sections (random selection requirement)
- [ ] Official school uniforms prepared
- [ ] Name tags printed with: Complete Name + Group Code + Member Number
- [ ] Demo devices charged and tested
- [ ] Backup demo recordings available (in case of network issues)
- [ ] Server services confirmed running

### **Demo Requirements:**
- [ ] Android phone with AudioScholar app installed
- [ ] Laptop with web dashboard open in browser
- [ ] Sample PowerPoint slides for Context Injection demo
- [ ] Stable internet connection (or hotspot backup)
- [ ] Confirm server is running before presentation

### **Time Allocation Summary:**
| Section | Member | Duration |
|---------|--------|----------|
| Title, Problem, Solution, Team | Member 1 | ~2.5 min |
| Tech Stack, Server Demo | Member 2 | ~2 min |
| Essential Transaction 1 Demo | Member 3 (Random) | ~2 min |
| Essential Transaction 2 Demo | Member 4 (Random) | ~2 min |
| Testing, Insights, Research | Member 5 (Random) | ~1.5 min |
| **Total Presentation** | | **10 min** |
| Q&A | All Members | 5 min |

---

## **References**

- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning.
- Davis, F. D. (1989). Perceived Usefulness, Perceived Ease of Use, and User Acceptance of Information Technology.
- Google. (2024). Gemini API Documentation.
- ISO/IEC 25010:2011 Systems and software quality models.
- Brooke, J. (1996). SUS: A 'Quick and Dirty' Usability Scale.

---

## **Technical Implementation Details**

### **Backend Architecture**
- **Framework:** Spring Boot 3.5.8 on Java 24
- **Message Queue:** RabbitMQ with multiple queues (processing, transcription, summarization, recommendations, upload, pptx-conversion)
- **Database:** Google Cloud Firestore (NoSQL)
- **File Storage:** Nhost (S3-compatible)
- **Caching:** Caffeine in-memory cache
- **Security:** Spring Security with JWT + OAuth2 (Google, GitHub)
- **Rate Limiting:** Bucket4j

### **AI/ML Pipeline**
- **Audio Transcription:** Google Gemini 2.0-flash with structured JSON schema output
- **Summarization:** Google Gemini 2.5-flash with context injection (PDF + Transcript)
- **Key Rotation:** Automatic API key rotation and model fallback on rate limits
- **Output Schema:** summaryText (Markdown), keyPoints (array), topics (3 YouTube queries), glossary (term/definition pairs)

### **Mobile App (Android)**
- **Language:** Kotlin
- **UI:** Jetpack Compose
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 35 (Android 15)
- **Architecture:** MVVM with Hilt DI
- **Local Storage:** Room Database 2.8.1
- **Networking:** Ktor Client + Retrofit
- **Auth:** Firebase Auth with Google Sign-In

### **Web Frontend**
- **Framework:** React 19.0.0
- **Build Tool:** Vite 6.4.1
- **Styling:** Tailwind CSS 4.1.1
- **HTTP Client:** Axios
- **Auth:** Firebase Web SDK 11.6.0
- **Routing:** React Router DOM 7.5.2

### **External Service Integrations**
| Service | Purpose | API Version |
|---------|---------|-------------|
| Google Gemini | Audio transcription & summarization | v1beta |
| YouTube Data API | Educational video recommendations | v3 |
| ConvertAPI | PPTX to PDF conversion | v2 |
| Firebase | Auth, Firestore, FCM | Admin SDK 9.6.0 |
| Nhost | File storage (S3-compatible) | GraphQL |

---

*Document Version: 3.0 - Updated with accurate technical specifications from codebase*
*Last Updated: December 2025*