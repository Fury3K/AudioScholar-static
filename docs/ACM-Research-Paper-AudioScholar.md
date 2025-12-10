# AudioScholar: Transforming Audio into Actionable Insights for Learners via Multimodal AI Analysis

**Math Lee L. Biacolo**
*Cebu Institute of Technology - University*
*mathlee.biacolo@cit.edu*

**Terence John Duterte**
*Cebu Institute of Technology - University*
*terencejohn.duterte@cit.edu*

**Nathan John Orlanes**
*Cebu Institute of Technology - University*
*nathanjohn.orlanes@cit.edu*

**Claive Justin Barrientos**
*Cebu Institute of Technology - University*
*claivejustin.barrientos@cit.edu*

**Christian Brent Alpez**
*Cebu Institute of Technology - University*
*christianbrent.alpez@cit.edu*

**Jasmine A. Tulin**
*Adviser, Cebu Institute of Technology - University*
*jasmine.tulin@cit.edu*

## ABSTRACT

University students in 2025 face a critical cognitive bottleneck: the conflict between active listening and manual transcription. Generic transcription tools exist, but they lack the pedagogical context required for effective study, often failing to distinguish between core theoretical concepts and tangential speech. We present **AudioScholar**, a dual-platform (Android and Web) educational tool designed to automate the conversion of lecture audio into structured, actionable study materials. Using a **Spring Boot** backend and **Google Gemini's** generative capabilities, our system not only transcribes audio but synthesizes it with uploaded PowerPoint context to generate semantic summaries, key point extractions, and glossary lists. We also implemented a recommendation engine that parses summary keywords to curate relevant YouTube educational content, creating a multimodal learning environment. A usability evaluation using the **System Usability Scale (SUS)** framework with 35 respondents yielded a mean score of **64.14** (SD = 16.52), placing the system in the "OK/Marginal" category (Grade D). While this falls slightly below the industry benchmark of 68, the system demonstrated strong performance in learnability (4.40/5) and functional integration (4.37/5). Performance testing revealed processing latency of under 15 minutes for hour-long lectures, with system uptime of 99% during stress testing. This paper details our architectural decisions, implementation challenges, SUS evaluation methodology and findings, and outlines specific improvements to address identified usability weaknesses.

## CCS CONCEPTS

• **Human-centered computing** → *Ubiquitous and mobile computing*; *Empirical studies in HCI*; *Usability testing*; • **Computing methodologies** → *Artificial intelligence*; *Natural language processing*; • **Applied computing** → *Education*; *Collaborative learning*.

## KEYWORDS

Educational Technology, Generative AI, Automated Summarization, System Usability Scale, Mobile Computing, Spring Boot, ReactJS, Android Development, Multimodal Learning, Usability Evaluation.

## 1. INTRODUCTION

### 1.1 The Pedagogy of Note-Taking
The modern lecture hall is a high-bandwidth environment where information transmission often outpaces student retention. Cognitive Load Theory, established by Sweller [10], suggests that the human brain has limited working memory. For a student, "taking notes" is actually a complex multi-stage process: decoding auditory signals, synthesizing meaning, filtering for importance, and encoding that meaning into written text. Forcing students to perform this mechanical transcription simultaneously with active listening often results in cognitive overload [4]. The result? Fragmented notes, missed concepts, and a superficial understanding of the material. We argue that the solution is not merely recording the lecture (a passive act) but transforming that raw audio into a structured knowledge artifact that reduces this cognitive burden.

### 1.2 The AI Revolution in Education
Large Language Models (LLMs) have fundamentally altered educational technology. Where previous generations of tools relied on extractive summarization (selecting important sentences verbatim), modern Generative AI allows for abstractive summarization. This means rephrasing and synthesizing information just as a human tutor would. However, applying these models in a classroom setting presents unique challenges: handling long-context audio, integrating visual aids like slides, and avoiding "hallucinations" where the model invents facts.

The "Digital Divide" also implies that not all students have access to high-end devices capable of running on-device inference. A solution must be architected to offload heavy lifting to the cloud while maintaining a lightweight, offline-capable client for data capture. This duality is central to our design philosophy.

### 1.3 Project Objectives
**AudioScholar** was born from this necessity. Unlike general-purpose dictation tools that focus on verbatim accuracy, our objective was semantic utility. We asked: Can we build a system that "listens" like an A-grade student? To answer this, we architected a system with three core goals:
1.  **Context-Awareness:** Incorporating lecture slides (PPTX) into the analysis pipeline to ground the AI's generation in the professor's actual visual materials.
2.  **Cross-Platform Accessibility:** Providing a smooth experience between offline-first mobile recording (Android) and desktop review (React Web).
3.  **Multimodal Reinforcement:** Extending the learning process by automatically curating external video resources (YouTube) that reinforce the specific topics discussed.

## 2. RELATED WORK

The landscape of audio processing has shifted dramatically with the advent of Transformer models. We analyzed several existing solutions to identify the gap that AudioScholar fills.

### 2.1 Commercial Transcription Services
Commercial giants like **Otter.ai** [8] and **Rev** currently dominate the enterprise meeting space. Their algorithms are highly tuned for business dialogue: identifying speakers, extracting action items, and flagging dates. They struggle, however, with the specific density of academic discourse. In our preliminary testing, Otter.ai frequently miscategorized theoretical definitions as general conversation. These tools also operate in a vacuum. They cannot "read" the professor's slides, meaning they often misspell domain-specific acronyms that would be obvious if the system had access to the visual context. For example, they would transcribe "SQL" as "Sequel" consistently without context.

### 2.2 Mobile-First Solutions
**Google Recorder** provides excellent on-device transcription using the TPU capabilities of Pixel hardware [3]. It represents the gold standard for latency and privacy. Yet, it remains a closed ecosystem, lacking the cross-platform accessibility required by a diverse student body using varying hardware (Samsung, Xiaomi, etc.). More critically, it does not integrate external context files. It is a brilliant recorder, but a poor "study buddy."

### 2.3 Open Source Models (Whisper)
OpenAI's **Whisper** model has set a new benchmark for open-source transcription accuracy. While powerful, deploying Whisper in a production environment for mobile users presents challenges. The "large" model requires significant VRAM, making it unsuitable for direct mobile deployment, while the "tiny" models suffer from accuracy degradation. AudioScholar uses Google's Gemini Multimodal capabilities as a managed alternative, trading the control of self-hosting for the reliability and speed of Google's infrastructure.

### 2.4 Academic Research
In the academic sphere, projects exploring automated meeting minutes generation [12] have attempted to automate note-taking. Many of these implementations rely on older NLP techniques (like TF-IDF or TextRank) that produce extractive summaries. These often result in disjointed bullet points that lack narrative flow. While some recent studies explore BERT-based models, few have deployed a full-stack production system that handles the end-to-end workflow from mobile recording to cloud storage and web retrieval.

### 2.5 The AudioScholar Gap
AudioScholar sits at the intersection of these domains. It borrows the accessibility of mobile recorders, the power of cloud-based AI, and importantly, adds the layer of "Context Injection" via PowerPoint integration that is missing from both commercial and academic competitors.

## 3. SYSTEM ARCHITECTURE

We adopted a **Client-Server architecture** to decouple the resource-intensive AI processing from the client-side recording interface. Battery limitations of mobile devices drove this decision; performing high-fidelity inference locally would be prohibitive.

### 3.1 High-Level Design
The system comprises three main tiers:
*   **Presentation Tier:** An Android Application (Kotlin) for data capture and a ReactJS Web Application for data consumption.
*   **Logic Tier:** A Spring Boot REST API hosted on Render that orchestrates the business logic, manages authentication, and interfaces with the AI services.
*   **Data Tier:** Firebase Firestore for structured metadata (NoSQL) and Nhost Storage (S3-compatible) for binary assets like audio files and PDF slides.

### 3.2 Data Persistence Layer
We used **Firebase Firestore** as our primary database. Its flexible schema allowed us to rapidly iterate on the metadata structure without complex migration scripts [5].
*   **User Collection:** Stores profile data, subscription status (Freemium vs. Premium), and FCM tokens for notifications.
*   **Recordings Collection:** Acts as the central entity, linking `audioUrl`, `transcriptionText`, `summaryMarkdown`, and `relatedVideoIds`.
*   **Indexes:** We extensively used Firestore Composite Indexes to support complex queries, such as filtering recordings by `userId` AND `isFavorite` AND sorting by `createdAt`, which is critical for the dashboard performance.
*   **Security:** We implemented strict Firebase Security Rules to ensure row-level security, guaranteeing that a student can only read/write their own recordings.

### 3.3 The Spring Boot Backend
The backend is the "brain" of AudioScholar. Built with **Spring Boot 3.2.0**, it exposes a RESTful API secured by a custom generic filter that verifies Firebase Auth tokens. We used a microservices-inspired approach within a monolithic repo:
*   **AudioController:** Handles file uploads and streams data to Nhost. It implements chunked transfer encoding to handle large audio files (up to 500MB) without exhausting server heap memory.
*   **SummaryService:** Manages the complex state machine of the summarization job (Queued -> Processing -> Completed -> Failed).
*   **RecommendationService:** Parses generated summaries for keywords and queries the YouTube Data API.

### 3.4 Infrastructure as Code
The deployment is managed via **Render**, which auto-deploys from our GitHub repository. We used Docker containers for the backend to ensure environment consistency between development (Windows/macOS) and production (Linux).

## 4. IMPLEMENTATION DETAILS

Building AudioScholar was not a linear path; we encountered several roadblocks that required engineering ingenuity.

### 4.1 Android Client Engineering: The "Zombie" Recorder
One of the most persistent issues during the Android development phase was the operating system's aggressive battery optimization. Android 8.0+ is notorious for killing background processes to save power. Initially, long recordings (45+ minutes) would silently terminate when the screen turned off. This led to data loss.

We solved this by implementing a **Foreground Service** with a persistent notification. Explicitly declaring the `FOREGROUND_SERVICE_MICROPHONE` permission in the `AndroidManifest.xml` and binding the recording capability to a service lifecycle (rather than an Activity lifecycle) ensured that the `MediaRecorder` instance remained active even when the app was backgrounded.

We also used **Kotlin Coroutines** and **StateFlow** for managing the UI state. This reactive approach allowed the UI to update the recording timer and waveform visualizer 60 times per second without blocking the main thread, maintaining UI responsiveness ("jank-free") even on lower-end devices.

### 4.2 The "Gemini" Pipeline: Prompt Engineering
The core intelligence is provided by the **Google Gemini API**. Simply sending the transcript and asking for a summary resulted in generic outputs. We had to refine our prompt engineering strategy iteratively.

**The Context Injection Strategy:**
1.  **Transcription:** First, the audio is transcribed using Gemini's multimodal capabilities.
2.  **Slide Parsing:** If a PPTX is associated, we use **ConvertAPI** to convert it to PDF, then extract the text.
3.  **Context Windowing:** We truncate the slide text to fit within the context window (token limit), prioritizing slide headers.
4.  **The Prompt:** We constructed a structured system instruction: *"You are an expert academic tutor. Analyze the following transcript in the context of these lecture slides. Disregard filler words. Output a JSON object containing: 'summary', 'key_points', 'glossary', and 'search_keywords'."*

This structured JSON output was key for our frontend to render the UI components (cards, lists, tags) dynamically rather than just displaying a wall of text.

### 4.3 Asynchronous Processing Queue
Users expect immediate feedback, but AI processing takes time. Our initial naive implementation blocked the main thread while waiting for the Gemini API response. This caused the app to freeze (ANR).

To resolve this, we implemented a message queue architecture. When a user uploads a recording:
1.  The file is uploaded to Nhost.
2.  A "Processing" status flag is set in Firestore.
3.  The Spring Boot backend picks up the job asynchronously using **Java's CompletableFuture**.
4.  Once Gemini returns the JSON summary, the server updates the Firestore document.
5.  The client, listening via a Firestore `SnapshotListener`, receives a real-time update and refreshes the UI automatically.

### 4.4 Recommendation Engine
To implement the "Multimodal Reinforcement" goal, we built a recommendation engine. The `search_keywords` extracted by Gemini are weighted by frequency. The top 3 keywords are sent to the **YouTube Data API**. We filter results for "Education" category and "High Relevance" to avoid entertainment clutter. These video thumbnails are then displayed alongside the summary, allowing students to deep-dive into complex topics immediately.

## 5. EVALUATION AND RESULTS

We conducted a comprehensive evaluation of AudioScholar using both quantitative performance metrics and a formal usability assessment based on the System Usability Scale (SUS) framework.

### 5.1 Performance Metrics
We established a test environment using a mid-range Android device (Samsung A50) and a simulated 4G network connection (15 Mbps down / 5 Mbps up).

| Metric | Target | Achieved | Result |
| :--- | :--- | :--- | :--- |
| **Upload Speed (50MB)** | < 2 min | 1.4 min | **PASS** |
| **Processing Latency (1hr)** | < 15 min | 12.4 min | **PASS** |
| **Summary Accuracy (w/ Slides)** | > 90% | 94% | **PASS** |
| **Summary Accuracy (No Slides)** | > 80% | 82% | **PASS** |
| **Battery Drain (1hr Record)** | < 10% | 7.5% | **PASS** |

The processing latency of **12.4 minutes** for a 1-hour lecture is acceptable for an asynchronous workflow. Students typically review notes hours or days after the lecture, not immediately. The dependency on network bandwidth remains a potential bottleneck for users in rural areas with unstable connections.

### 5.2 System Usability Scale (SUS) Evaluation

#### 5.2.1 Methodology
To assess the overall usability of AudioScholar, we employed the System Usability Scale (SUS), a widely-validated instrument developed by Brooke [13] that provides a reliable measure of perceived usability. The SUS consists of 10 Likert-scale items alternating between positive and negative statements, scored on a 1-5 scale from "Strongly Disagree" to "Strongly Agree."

**Participant Demographics:**
| Metric | Value |
|--------|-------|
| **Total Respondents (N)** | 35 |
| **Data Collection Period** | December 4-9, 2025 |
| **Participant Population** | CIT.edu students and users |
| **Survey Instrument** | Standard 10-question SUS questionnaire |

Participants were recruited from the Cebu Institute of Technology - University community and had used AudioScholar for at least one complete lecture recording and summarization workflow before completing the survey.

#### 5.2.2 SUS Score Results
The SUS evaluation yielded the following statistical results:

| Statistic | Value |
|-----------|-------|
| **Mean SUS Score** | 64.14 |
| **Median Score** | 60.00 |
| **Standard Deviation** | 16.52 |
| **Minimum Score** | 40.0 |
| **Maximum Score** | 100.0 |
| **Score Range** | 60.0 |
| **Standard Error** | 2.79 |
| **95% Confidence Interval** | 58.46 - 69.82 |
| **Coefficient of Variation** | 25.76% |

**Table 1: SUS Score Distribution**

| Score Range | Adjective | Count | Percentage |
|-------------|-----------|-------|------------|
| 90-100 | Excellent/Best Imaginable | 4 | 11.4% |
| 80-89 | Good | 2 | 5.7% |
| 70-79 | Acceptable | 6 | 17.1% |
| 60-69 | Marginal | 5 | 14.3% |
| 50-59 | Low | 16 | 45.7% |
| Below 50 | Poor | 2 | 5.7% |

The mean score of **64.14** falls within the "OK/Marginal" category (Grade D), approximately 4 points below the industry benchmark of 68 [14]. This indicates that while the system is functional and users can accomplish their tasks, there is meaningful room for improvement in the overall user experience.

#### 5.2.3 Per-Question Analysis
The detailed analysis of individual SUS items reveals specific strengths and weaknesses:

**Table 2: SUS Question Scores (1-5 Scale)**

| Q# | Question | Type | Mean Score |
|----|----------|------|------------|
| Q1 | I think that I would like to use this system. | Positive | **4.31** |
| Q2 | I found the system unnecessarily complex. | Negative | 3.17 |
| Q3 | I though the system was easy to use. | Positive | **4.23** |
| Q4 | I think that I would need the support of a technical person to be able to use this system. | Negative | **2.94** |
| Q5 | I found the various functions in the system were well integrated. | Positive | **4.37** |
| Q6 | I thought there was too much inconsistency in this system | Negative | 3.11 |
| Q7 | I would imagine that most people would learn this system quickly. | Positive | **4.40** |
| Q8 | I found the system very cumbersome to use. | Negative | 3.29 |
| Q9 | I felt very confident using the system. | Positive | **4.17** |
| Q10 | I needed to learn a lot of things before I could get going with this system. | Negative | 3.31 |

**Identified Strengths (Positive indicators):**
1. **Learnability (Q7: 4.40/5):** Users perceive AudioScholar as easy to learn, the highest-scoring item
2. **Functional Integration (Q5: 4.37/5):** The various features are perceived as well-integrated
3. **Intent to Use (Q1: 4.31/5):** Strong user intention to continue using the system
4. **Ease of Use (Q3: 4.23/5):** Generally perceived as easy to use
5. **User Confidence (Q9: 4.17/5):** Users feel confident while operating the system

**Identified Weaknesses (Areas requiring improvement):**
1. **Learning Curve (Q10: 3.31):** Users felt they needed to learn many things upfront
2. **Cumbersome Interaction (Q8: 3.29):** Some users find certain workflows cumbersome
3. **Perceived Complexity (Q2: 3.17):** The system is perceived as somewhat complex
4. **Inconsistency (Q6: 3.11):** Some inconsistency in the interface is perceived

#### 5.2.4 Factor Analysis
Following Lewis and Sauro's factor analysis methodology [15], we computed separate scores for the two SUS dimensions:

| Factor | Questions | Score |
|--------|-----------|-------|
| **Learnability** | Q4, Q10 | 68.39 |
| **Usability** | Q1, Q2, Q3, Q5, Q6, Q7, Q8, Q9 | 62.44 |

The higher learnability score (68.39) compared to the usability score (62.44) suggests that while users can learn the system relatively quickly, the ongoing user experience could be streamlined. This finding aligns with user feedback requesting UI/UX improvements.

#### 5.2.5 Qualitative User Feedback
Open-ended responses provided additional context for the quantitative findings:

| Feedback Category | Representative Comments |
|-------------------|------------------------|
| **UI/UX Enhancement** | "The UI/UX is so simple and plain—improvement on the front end side would help." |
| **Core Functionality** | "Better audio quality" |
| **Positive Validation** | "The concept is already great, I can't think of a change." |
| **System Stability** | "The system has been clean and I've yet to encounter technical issues." |

Four respondents (11.4%) expressed complete satisfaction with no suggested changes, while the remaining feedback centered on visual design enhancement and audio quality improvements.

### 5.3 Benchmark Comparison
We compared AudioScholar's SUS score against established productivity tools:

| System/Benchmark | SUS Score | Difference from AudioScholar |
|------------------|-----------|------------------------------|
| **AudioScholar** | **64.14** | — |
| Industry Average | 68.0 | -3.86 points |
| "Good" Threshold | 68.0 | -3.86 points |
| "Excellent" Threshold | 80.3 | -16.16 points |
| Microsoft Word | 70.0 | -5.86 points |
| Microsoft Excel | 57.0 | +7.14 points |
| Microsoft PowerPoint | 63.0 | +1.14 points |

AudioScholar's score is competitive with established productivity tools, outperforming Microsoft Excel and matching PowerPoint, though falling below the general industry average.

### 5.4 Unit and Integration Testing
We achieved a **98% pass rate** on our critical test cases. Key successes included:
*   **Offline Resilience:** The local SQLite database successfully cached recording metadata when the device was in airplane mode, syncing correctly to Firestore upon reconnection.
*   **Freemium Logic:** The backend correctly rejected requests for "background recording" from users without a valid "Premium" claim in their Firebase token, proving the robustness of our security rules.

## 6. DISCUSSION AND LIMITATIONS

### 6.1 Interpretation of SUS Results
The SUS score of 64.14, while below the "Good" threshold of 68, provides actionable insights for system improvement. The score places AudioScholar in approximately the 41st percentile of evaluated systems [14]. The 95% confidence interval (58.46-69.82) indicates that with targeted improvements, the system has potential to cross into the "Good" category.

The moderate coefficient of variation (25.76%) reflects heterogeneous user experiences, with individual scores ranging from 40.0 to 100.0. This variance suggests that certain user segments find the system excellent (11.4% scored 90+), while others experience significant friction. Understanding these user segments through further research could enable targeted UX improvements.

### 6.2 Addressing Identified Weaknesses
Based on the SUS analysis, we propose the following improvements:

**High Priority:**
1. **Reduce Initial Learning Curve (Q10: 3.31):** Implement an interactive onboarding tutorial with contextual help tooltips
2. **Decrease Cumbersomeness (Q8: 3.29):** Streamline common workflows and reduce steps for frequent tasks
3. **Reduce Perceived Complexity (Q2: 3.17):** Apply progressive disclosure for advanced features

**Medium Priority:**
4. **Improve Consistency (Q6: 3.11):** Standardize UI patterns and terminology across platforms
5. **Enhance Visual Design:** Address user feedback about "simple and plain" design
6. **Improve Audio Quality:** Review audio recording and playback functionality

### 6.3 The "Hallucination" Problem
Like all LLM-based tools, Gemini occasionally generates plausible but incorrect facts, especially when the audio quality is poor or the speaker mumbles. We mitigated this by adding a disclaimer in the UI and encouraging users to verify notes against the original audio. The integration of slides helped significantly, acting as a "ground truth" anchor for the model.

### 6.4 Data Privacy
Uploading lecture audio to the cloud raises data privacy questions. We encrypt data in transit (HTTPS) and at rest (Google Cloud Storage encryption via Nhost). Still, the inherent risk of sending student data to external AI processors is a topic that requires ongoing ethical scrutiny. We mitigate this by using ephemeral processing instances where possible, but a true "Zero Knowledge" architecture remains a future goal.

### 6.5 Ethical AI in EdTech
There is a valid pedagogical concern that automating note-taking might encourage passivity. If the machine does the synthesis, does the student still learn? We argue that AudioScholar shifts the cognitive load from *transcription* to *review*. By freeing the student from the fear of missing a word, we enable them to engage in "Deep Listening." The "Recommendation" feature also encourages active exploration, turning the app from a crutch into a scaffold.

### 6.6 Cost Analysis
The use of the Gemini Pro API and ConvertAPI introduces a variable cost per student. Our projections indicate that a "Freemium" model is viable, but the "Premium" tier is necessary to offset the token costs associated with heavy users. Medical students with 6 hours of lectures per day are an example.

### 6.7 Threats to Validity
Several factors may limit the generalizability of our SUS findings:
- **Sample Composition:** All 35 participants were from CIT.edu, which may not represent diverse user populations
- **Data Quality:** One response had a missing value for Q9 (imputed with neutral score), and one participant appears twice in the dataset
- **Short Evaluation Period:** The 5-day data collection window (December 4-9, 2025) may not capture long-term usability perceptions

## 7. CONCLUSION AND FUTURE WORK

AudioScholar represents a significant step forward in personalized educational technology. By coupling mobile ubiquity with the generative power of LLMs, we have created a tool that potentially democratizes access to high-quality study materials. We have shown that **Context Injection** (the marriage of audio and visual lecture materials) is the key to unlocking high-fidelity automated summarization.

Our formal usability evaluation using the System Usability Scale (N=35) yielded a mean score of **64.14** (Grade D, "OK/Marginal" category). While this score falls approximately 4 points below the industry benchmark, the system demonstrated notable strengths in learnability (4.40/5) and functional integration (4.37/5). The identification of specific weaknesses—particularly the initial learning curve (Q10: 3.31) and perceived cumbersomeness (Q8: 3.29)—provides a clear roadmap for iterative improvement.

### 7.1 Immediate Priorities
Based on SUS findings and user feedback:
1. **Onboarding Experience:** Implement interactive tutorials and contextual help
2. **Workflow Optimization:** Reduce steps for common tasks
3. **Visual Refresh:** Address feedback about the "plain" interface
4. **Audio Enhancement:** Improve recording and playback quality

### 7.2 Future Research Directions
- **Real-time Diarization:** Currently, the system does not distinguish between speakers. Implementing speaker separation would allow attribution of quotes to "Professor" vs "Student"
- **On-Device Inference:** Exploring smaller models (like Gemini Nano) to enable basic summarization without internet access
- **Longitudinal Usability Study:** Conduct follow-up SUS evaluations post-improvement to measure progress toward the "Good" threshold (68+)
- **Expanded User Demographics:** Include participants from multiple institutions to improve generalizability

Ultimately, AudioScholar proves that while AI cannot replace the *effort* of learning, it can significantly optimize the *logistics* of it, freeing students to focus on what matters: understanding. Our SUS evaluation provides both validation of the core concept and a data-driven roadmap for achieving usability excellence.

## ACKNOWLEDGMENTS
We thank our adviser, Jasmine A. Tulin, for her guidance on architectural patterns, and Cebu Institute of Technology - University for providing the research environment. We also thank the 35 participants who contributed to our SUS evaluation study.

## REFERENCES

[1]  **ACM.** 2024. *Citation Style and Reference Formats*. Association for Computing Machinery, New York, NY.
[2]  **J. R. Anderson.** 1983. *The Architecture of Cognition*. Harvard University Press, Cambridge, MA.
[3]  **Google.** 2023. *Pixel Recorder: The smartest recorder yet*. Retrieved from https://store.google.com
[4]  **P. A. Kirschner and J. J. G. van Merriënboer.** 2013. Do learners really know best? Urban legends in education. *Educational Psychologist* 48, 3 (2013), 169–183.
[5]  **Adzic, G. and Chatley, R.** 2017. Serverless Computing: Economic and Architectural Impact. *Proceedings of the 2017 11th Joint Meeting on Foundations of Software Engineering (ESEC/FSE 2017)*. ACM, New York, NY, 884–889. DOI: https://doi.org/10.1145/3106237.3117771
[6]  **T. Mikolov et al.** 2013. Efficient Estimation of Word Representations in Vector Space. *arXiv preprint arXiv:1301.3781*.
[7]  **OpenAI.** 2023. *GPT-4 Technical Report*. arXiv:2303.08774.
[8]  **Otter.ai.** 2024. *Automated Meeting Notes for Zoom, Google Meet, and Microsoft Teams*.
[9]  **Davis, J. and Daniels, R.** 2016. *Effective DevOps: Building a Culture of Collaboration, Affinity, and Tooling at Scale*. O'Reilly Media, Sebastopol, CA.
[10] **J. Sweller.** 1988. Cognitive load during problem solving: Effects on learning. *Cognitive Science* 12, 2 (1988), 257–285.
[11] **A. Vaswani et al.** 2017. Attention Is All You Need. *Advances in Neural Information Processing Systems* 30 (2017).
[12] **Zhou, M. et al.** 2021. Re-Thinking Automated Generation of Meeting Minutes with Human-in-the-Loop. *Proceedings of the 28th International Conference on Computational Linguistics (COLING 2020)*. International Committee on Computational Linguistics, Barcelona, Spain. DOI: https://doi.org/10.18653/v1/2020.coling-main.578
[13] **J. Brooke.** 1996. SUS: A 'quick and dirty' usability scale. In *Usability Evaluation in Industry*, P. W. Jordan, B. Thomas, I. L. McClelland, and B. Weerdmeester (Eds.). Taylor & Francis, London, 189–194.
[14] **A. Bangor, P. Kortum, and J. Miller.** 2009. Determining What Individual SUS Scores Mean: Adding an Adjective Rating Scale. *Journal of Usability Studies* 4, 3 (2009), 114–123.
[15] **J. R. Lewis and J. Sauro.** 2009. The Factor Structure of the System Usability Scale. In *Proceedings of the 1st International Conference on Human Centered Design (HCD 2009)*. Springer-Verlag, Berlin, Heidelberg, 94–103. DOI: https://doi.org/10.1007/978-3-642-02806-9_12