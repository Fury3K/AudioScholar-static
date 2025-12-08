# Survey Framework & Evaluation Methodology: AudioScholar

**Project:** AudioScholar: Transforming Audio into Actionable Insights for Learners  
**Document ID:** SURVEY-FRAMEWORK-007  
**Date:** December 2025  
**Version:** 1.0  

---

## 1. Executive Summary

This document outlines the comprehensive evaluation strategy for **AudioScholar**, a multimodal educational technology platform designed to automate lecture note-taking. The purpose of this evaluation is to rigorously assess the system's technical quality, user acceptance, and overall usability within an academic context. To ensure a holistic assessment, this framework integrates three distinct academic models: **ISO/IEC 25010** for software quality, the **Technology Acceptance Model (TAM)** for user adoption prediction, and the **System Usability Scale (SUS)** for subjective usability scoring. By triangulating data from these frameworks, we aim to validate AudioScholar's dual-platform architecture (Android/Web) and its core AI-driven features, such as context-aware summarization and learning material recommendations.

## 2. Evaluation Framework Selection

The selection of evaluation frameworks is driven by the need to answer three fundamental questions about the system:
1.  **Does it work well?** (Technical Quality)
2.  **Will students use it?** (User Acceptance)
3.  **Is it easy to use?** (Usability)

No single framework addresses all these dimensions. Therefore, a hybrid approach was adopted:

*   **ISO/IEC 25010** was chosen to provide a granular technical audit of the system's characteristics, specifically addressing the non-functional requirements outlined in the System Synthesis.
*   **TAM (Davis, 1989)** was selected because AudioScholar introduces a novel behavior (AI-assisted study) into an established habit (manual note-taking). Understanding the *intention* to adopt is as critical as the technology itself.
*   **SUS (Brooke, 1996)** was included to provide a standardized, industry-recognized quantitative metric (0-100) that allows for benchmarking against other educational software.

## 3. ISO/IEC 25010 Software Quality Model

The ISO/IEC 25010 standard (formerly ISO 9126) provides a structured model for evaluating software quality. For AudioScholar, we focus on seven specific characteristics relevant to mobile and web educational tools.

### 3.1 Functional Suitability
*   **Definition:** The degree to which the system provides functions that meet stated and implied needs.
*   **Application to AudioScholar:**
    *   **Functional Completeness:** Does the system successfully record, upload, transcribe, and summarize audio without data loss?
    *   **Functional Correctness:** Are the AI-generated summaries accurate? Does the *Context Injection* (PPTX to PDF) correctly identify domain-specific terminology?
    *   **Functional Appropriateness:** Are the generated YouTube recommendations pedagogically relevant to the lecture topic?

### 3.2 Performance Efficiency
*   **Definition:** Performance relative to the amount of resources used under stated conditions.
*   **Application to AudioScholar:**
    *   **Time Behavior:** Verification of the <15 minute processing latency target for 1-hour lectures.
    *   **Resource Utilization:** Assessment of battery drain on the Android client (target <10% per hour) and heap memory usage during large file uploads (500MB limit).

### 3.3 Usability
*   **Definition:** The degree to which the product can be used by specified users to achieve specified goals with effectiveness, efficiency, and satisfaction.
*   **Application to AudioScholar:**
    *   Evaluation of the "One-Tap Record" feature.
    *   Clarity of the "Processing" status feedback loop.
    *   Accessibility of the navigation drawer and consistency of the UI across Mobile and Web platforms.

### 3.4 Reliability
*   **Definition:** The degree to which a system, product, or component performs specified functions under specified conditions for a specified period of time.
*   **Application to AudioScholar:**
    *   **Fault Tolerance:** Ability of the Android app to continue recording when backgrounded or when the screen is off (Service lifecycle management).
    *   **Recoverability:** Handling of network interruptions during file uploads to Nhost.

### 3.5 Security
*   **Definition:** Protection of information and data.
*   **Application to AudioScholar:**
    *   **Confidentiality:** Verification that users can only access their own recordings (Firestore Rules).
    *   **Integrity:** Secure handling of OAuth tokens (Google/GitHub) and password hashing.
    *   **Non-repudiation:** Audit logging of user actions via the Admin Dashboard.

### 3.6 Maintainability
*   **Definition:** The degree of effectiveness and efficiency with which a product or system can be modified.
*   **Application to AudioScholar:**
    *   Assessment of the Spring Boot backend's modular architecture (Controller/Service/Repository layers).
    *   Ease of updating the Gemini API prompt engineering without requiring a full app redeploy.

### 3.7 Portability
*   **Definition:** The ease with which a system can be transferred from one hardware or software environment to another.
*   **Application to AudioScholar:**
    *   **Adaptability:** Rendering of the ReactJS web dashboard across different browser sizes (Tailwind CSS responsiveness).
    *   **Installability:** ease of APK installation on various Android versions (Min API 24).

## 4. Technology Acceptance Model (TAM)

Derived from Davis (1989), TAM postulates that user acceptance is determined primarily by two factors: **Perceived Usefulness** and **Perceived Ease of Use**.

### 4.1 Perceived Usefulness (PU)
*   **Definition:** The degree to which a person believes that using a particular system would enhance his or her job performance.
*   **Survey Constructs for AudioScholar:**
    *   "Using AudioScholar improves my ability to retain lecture information."
    *   "The generated summaries reduce the time I spend reviewing for exams."
    *   "The YouTube recommendations provide valuable supplementary learning materials."

### 4.2 Perceived Ease of Use (PEOU)
*   **Definition:** The degree to which a person believes that using a particular system would be free of effort.
*   **Survey Constructs for AudioScholar:**
    *   "I find it easy to start a recording and upload a presentation file."
    *   "Navigating between the mobile app and web dashboard is intuitive."
    *   "I rarely encounter confusing errors or delays."

### 4.3 Attitude Toward Using (ATU)
*   **Definition:** The user's positive or negative feeling about performing the target behavior.
*   **Survey Constructs for AudioScholar:**
    *   "I believe AudioScholar is a good idea for university students."
    *   "I feel confident using AI to assist my studies."

### 4.4 Behavioral Intention to Use (BI)
*   **Definition:** The degree to which a person has formulated conscious plans to perform or not perform some specified future behavior.
*   **Survey Constructs for AudioScholar:**
    *   "I intend to use AudioScholar for my major subjects in the upcoming semester."
    *   "I would recommend AudioScholar to my classmates."

## 5. System Usability Scale (SUS)

Developed by Brooke (1996), SUS provides a "quick and dirty" but reliable tool for measuring usability. It consists of 10 items with five response options (Strongly Disagree to Strongly Agree).

### 5.1 The 10 Questions (Adapted)
1.  I think that I would use AudioScholar frequently.
2.  I found AudioScholar unnecessarily complex.
3.  I thought AudioScholar was easy to use.
4.  I think that I would need the support of a technical person to use AudioScholar.
5.  I found the various functions in AudioScholar (recording, summarization, sync) were well integrated.
6.  I thought there was too much inconsistency in AudioScholar.
7.  I would imagine that most people would learn to use AudioScholar very quickly.
8.  I found AudioScholar very cumbersome to use.
9.  I felt very confident using AudioScholar.
10. I needed to learn a lot of things before I could get going with AudioScholar.

### 5.2 Scoring Methodology
*   **Scale:** 0 to 100.
*   **Calculation:**
    *   For odd items (1, 3, 5, 7, 9): Score = User Response - 1.
    *   For even items (2, 4, 6, 8, 10): Score = 5 - User Response.
    *   Total Score = Sum of converted scores × 2.5.
*   **Benchmarks:**
    *   **> 80.3:** Excellent (A)
    *   **68 - 80.3:** Good (B/C)
    *   **< 68:** Below Average

## 6. Combined Evaluation Approach

By layering these three frameworks, we avoid the pitfalls of single-metric evaluation.
*   **Mapping:**
    *   **ISO 25010 (Usability)** correlates directly with **TAM (PEOU)** and **SUS**. A low PEOU score should align with a low SUS score.
    *   **ISO 25010 (Functional Suitability)** drives **TAM (PU)**. If the function fails (e.g., poor summaries), the user will not perceive it as useful.
    *   **ISO 25010 (Performance)** acts as a moderator. Even high Utility (PU) can be negated by poor Performance (e.g., waiting too long for a summary).

This triangulation allows us to isolate root causes. For example, if SUS is high but Intention to Use (TAM) is low, the app is easy to use but offers no value (low Utility). Conversely, if Utility is high but SUS is low, the app solves a painful problem but the interface needs redesign.

## 7. Target Respondent Profile

### 7.1 Participants
The study targets the primary stakeholders defined in the Project Synthesis:
*   **Primary:** Undergraduate and graduate students actively enrolled in university courses.
*   **Discipline:** Mixed cohort (STEM and Humanities) to test the AI's adaptability to different lecture styles.
*   **Device Requirement:** Must own an Android device (Android 7.0+) for the mobile component.

### 7.2 Sample Size
*   **Minimum Target:** N = 30.
*   **Justification:** According to the Central Limit Theorem, a sample size of 30 is generally considered sufficient for the distribution of the sample mean to approximate a normal distribution, allowing for parametric statistical analysis (t-tests, etc.) of the SUS and TAM scores.

### 7.3 Sampling Methodology
*   **Method:** Convenience Sampling via university channels, followed by Snowball Sampling.
*   **Inclusion Criteria:** Must attend at least 3 hours of lectures per week.

## 8. Data Collection Methodology

### 8.1 Instrument
*   **Platform:** Google Forms.
*   **Structure:**
    1.  **Demographics:** Age, Year Level, Course, Device Model.
    2.  **Task Performance:** Users perform a guided test (Record a 5-min clip -> Upload PPT -> Generate Summary -> View Recommendation).
    3.  **ISO 25010 Section:** 5-point Likert scale questions.
    4.  **TAM Section:** 5-point Likert scale questions.
    5.  **SUS Section:** Standard 10-item matrix.
    6.  **Open Feedback:** Qualitative suggestions.

### 8.2 Timeline
*   **Week 1:** Survey Instrument Design & Validation (Internal).
*   **Week 2:** Pilot Testing (n=5) to verify question clarity.
*   **Week 3:** Deployment to Target Respondents.
*   **Week 4:** Data aggregation and analysis.

### 8.3 Response Validation
*   Responses completed in under 2 minutes will be discarded (speed-lining).
*   Duplicate User IDs (if collected) will be merged.

## 9. Analysis Methods

### 9.1 Quantitative Analysis
*   **Descriptive Statistics:** Mean and Standard Deviation will be calculated for all ISO and TAM constructs to identify strengths and weaknesses.
*   **SUS Scoring:** Calculated per respondent and averaged to derive the System Usability Score.
*   **Correlation Analysis:** Pearson correlation coefficient will be used to analyze relationships between constructs (e.g., Does higher *Functional Suitability* correlate with *Intention to Use*?).

### 9.2 Scale Interpretation
*   **Likert Scale:** 1 (Strongly Disagree) to 5 (Strongly Agree).
*   **Threshold:** A mean score of **> 3.5** is considered a positive indicator for ISO and TAM constructs.

---

## References

1.  **Brooke, J.** (1996). SUS: A 'quick and dirty' usability scale. In P. W. Jordan, B. Thomas, B. A. Weerdmeester, & A. L. McClelland (Eds.), *Usability Evaluation in Industry* (pp. 189–194). Taylor & Francis.
2.  **Davis, F. D.** (1989). Perceived Usefulness, Perceived Ease of Use, and User Acceptance of Information Technology. *MIS Quarterly*, 13(3), 319–340.
3.  **ISO/IEC.** (2011). *ISO/IEC 25010:2011 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models*. International Organization for Standardization.
4.  **Biacolo, M. L., et al.** (2025). *AudioScholar Project Synthesis*. Cebu Institute of Technology - University.