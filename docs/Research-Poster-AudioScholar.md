# AudioScholar: Transforming Audio into Actionable Insights for Learners via Multimodal AI Analysis

**Math Lee L. Biacolo, Terence John Duterte, Nathan John Orlanes, Claive Justin Barrientos, Christian Brent Alpez**
*Adviser: Jasmine A. Tulin*
Cebu Institute of Technology - University, Cebu City, Philippines

---

## 🚩 Problem Statement
**The Cognitive Bottleneck:** University students cannot effectively listen actively *and* transcribe mechanically at the same time.
*   **Cognitive Load Theory:** Simultaneous decoding and encoding causes overload.
*   **Result:** Fragmented notes, missed concepts, and superficial understanding.
*   **Gap:** Existing tools lack **pedagogical context** (slides) and **multimodal reinforcement**.

---

## 💡 Solution Overview
**AudioScholar** is a dual-platform (Android & Web) educational tool that automates the conversion of lecture audio into structured study materials.

*   **Core Concept:** Transforms **Raw Lecture Audio + PowerPoint Slides** → **Structured Knowledge Artifacts**.
*   **Differentiation:** Unlike generic transcribers, AudioScholar "reads" the slides to ground the AI, ensuring domain-specific accuracy (e.g., correct acronyms).

---

## 🏗️ System Architecture

| Tier | Components |
| :--- | :--- |
| **📱 Presentation** | **Android** (Kotlin, Offline-first) & **Web** (ReactJS, Tailwind) |
| **🧠 Logic** | **Spring Boot** (REST API), **ConvertAPI** (Slide Parsing) |
| **☁️ Data** | **Firebase Firestore** (Metadata), **Nhost** (Object Storage) |
| **🤖 AI Engine** | **Google Gemini** (Context-Aware Summarization) |

> **Data Flow:** Audio Capture → Async Upload → Slide Text Extraction → Gemini Context Window → Structured JSON Output

---

## ✨ Key Features

*   🎙️ **Context-Aware Recording:** Integrates PPTX slides to reduce "hallucinations" and improve accuracy.
*   🔄 **Cross-Platform Sync:** Seamless transition between mobile capture and desktop review.
*   🎥 **Multimodal Recommendations:** Auto-curates relevant **YouTube** educational videos based on summary keywords.
*   📝 **Structured Outputs:** Generates Summaries, Key Points, and Glossary lists automatically.

---

## 🛠️ Technical Stack

*   **Mobile:** Kotlin, Android SDK (API 24+), Coroutines
*   **Web:** ReactJS, Tailwind CSS
*   **Backend:** Spring Boot 3.2.0, Java 17
*   **AI/ML:** Google Gemini Pro API
*   **Database:** Firebase Firestore (NoSQL)

---

## 📊 Results & Metrics

| Metric | Result | Note |
| :--- | :--- | :--- |
| **Processing Latency** | **12.4 min** | For 1-hour lecture |
| **Test Pass Rate** | **95.4%** | System reliability |
| **Summary Accuracy** | **94%** | With Slide Context |
| **System Uptime** | **99%** | During stress testing |

---

## 🚀 Future Work
*   **Real-time Diarization:** Speaker separation (Professor vs. Student).
*   **On-Device Inference:** Utilizing **Gemini Nano** for offline summarization.
*   **Zero Knowledge:** Enhanced privacy architecture.

---

<div align="center">

**[ 🔗 Scan for Demo / Repo ]**
*(Place QR Code Here)*

**Links:** https://linktr.ee/AudioScholar

**Contact:** mathlee.biacolo@cit.edu | jasmine.tulin@cit.edu

</div>