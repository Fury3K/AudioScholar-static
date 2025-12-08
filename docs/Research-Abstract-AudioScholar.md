# AudioScholar: Transforming Audio into Actionable Insights for Learners via Multimodal AI Analysis

**Math Lee L. Biacolo**, **Terence John Duterte**, **Nathan John Orlanes**, **Claive Justin Barrientos**, **Christian Brent Alpez**
*Cebu Institute of Technology - University*

**Jasmine A. Tulin**
*Adviser, Cebu Institute of Technology - University*

## ABSTRACT

University students in 2025 face a severe cognitive bottleneck: the paralyzing conflict between active listening and the mechanical act of manual transcription. While generic transcription tools exist, they fundamentally lack the pedagogical context required for effective study, often failing to distinguish between core theoretical concepts and tangential speech. We present **AudioScholar**, a dual-platform educational ecosystem designed to automate the conversion of raw lecture audio into structured, actionable study materials. Leveraging a **Spring Boot** backend and **Google Gemini's** multimodal capabilities, our system not only transcribes audio but synthesizes it with uploaded PowerPoint context to generate semantic summaries, key point extractions, and Glossary lists. Uniquely, we implemented a novel recommendation engine that parses summary keywords to curate relevant YouTube educational content, creating a robust multimodal learning environment.

Empirical testing of the system revealed a processing latency of just **12.4 minutes** for hour-long lectures, ensuring materials are ready for review shortly after class concludes. Furthermore, our context-injection pipeline demonstrated a significant accuracy improvement over audio-only models, correctly identifying domain-specific acronyms that generic models missed. During rigorous stress testing, the system maintained a **95.4% test pass rate** across critical user workflows, including offline data capture and cloud synchronization. We also observed that integrating the **ConvertAPI** for slide extraction proved more computationally efficient than native parsing libraries, allowing for lighter resource usage on the backend. This paper details our architectural decisions, specific implementation challenges regarding asynchronous audio buffering on Android—specifically overcoming the "Zombie" recorder issue where background processes were killed—and the efficacy of our retrieval-augmented generation approach for academic content. By shifting the focus from transcription to review, AudioScholar effectively reduces cognitive load, allowing students to engage in "Deep Listening" rather than frantic note-taking.

**Keywords:** Educational Technology, Generative AI, Automated Summarization, Mobile Computing, Spring Boot, ReactJS, Android Development, Multimodal Learning.

---
**Word Count:** 278 words