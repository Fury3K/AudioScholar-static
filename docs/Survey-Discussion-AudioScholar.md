# Survey Discussion and Analysis: AudioScholar

**Project:** AudioScholar: Transforming Audio into Actionable Insights for Learners  
**Document ID:** SURVEY-ANALYSIS-009  
**Date:** December 2025  
**Version:** 1.0  

---

## 1. Executive Summary

This document presents the analysis of the user evaluation conducted for **AudioScholar**, a multimodal educational technology platform. The study aimed to validate the system's usability, technical quality, and user acceptance among its target demographic of university students. Data was collected from **13 respondents (N=13)** who participated in a guided testing session involving lecture recording, context injection (PPT upload), and AI summarization.

Key findings indicate a strong reception for the core value proposition. The system achieved a **System Usability Scale (SUS) score of 76.9**, positioning it in the "Good" category (Grade B). The **Technology Acceptance Model (TAM)** analysis revealed high Perceived Usefulness ($\mu=4.46$), suggesting that students clearly recognize the academic benefit of automated note-taking. However, ISO 25010 quality metrics highlighted **Performance Efficiency ($\mu=3.85$)** as a specific area for improvement, primarily due to processing latency for long audio files.

Overall, the study recommends immediate deployment of the beta version, contingent on backend optimizations to reduce summarization turnaround time.

## 2. Methodology Recap

The evaluation strategy, detailed in the *Survey Framework & Evaluation Methodology (SURVEY-FRAMEWORK-007)*, utilized a hybrid approach triangulating three academic frameworks:

1.  **Technology Acceptance Model (TAM):** To predict behavioral intention to adopt.
2.  **System Usability Scale (SUS):** To provide a standardized industry benchmark for usability.
3.  **ISO/IEC 25010:** To audit specific software quality characteristics (Functional Suitability, Performance, Security, etc.).

**Data Collection:**  
Respondents completed a structured Google Forms questionnaire after performing a set of standardized tasks (Record $\rightarrow$ Upload PPT $\rightarrow$ View Summary). The small sample size (N=13) is acknowledged as a limitation; while insufficient for broad generalization, it provides significant diagnostic power for identifying usability hurdles and major functional defects in this early phase.

## 3. Demographic Profile

The respondent pool consisted of Filipino college students fitting the primary user persona defined in the Project Synthesis.

**Table 1: Respondent Demographics (N=13)**

| Category | Group | Count | Percentage |
| :--- | :--- | :--- | :--- |
| **Age** | 18 - 20 | 2 | 15.4% |
| | 21 - 23 | 9 | 69.2% |
| | 24 - 26 | 2 | 15.4% |
| **Year Level** | 3rd Year | 7 | 53.8% |
| | 4th Year | 5 | 38.5% |
| | Graduate Student | 1 | 7.7% |
| **Academic Program** | Engineering / CS | 10 | 76.9% |
| | Business / Arts | 3 | 23.1% |
| **Device Ownership** | Android User | 13 | 100% |
| **Note-Taking Frequency** | "Most Lectures" | 11 | 84.6% |

**Analysis:** The dominance of Engineering/CS students (76.9%) suggests the feedback may be tech-literate, potentially skewing "Ease of Use" scores slightly higher than a general population. However, the high frequency of existing note-taking habits confirms that the sample is relevant to the problem space.

## 4. Technology Acceptance Model (TAM) Results

The TAM constructs measured the users' intention to integrate AudioScholar into their study habits. Responses were recorded on a 5-point Likert scale (5 = Strongly Agree).

**Table 2: TAM Construct Scores**

| Construct | Mean Score ($\mu$) | Standard Deviation ($\sigma$) | Interpretation |
| :--- | :--- | :--- | :--- |
| **Perceived Usefulness (PU)** | **4.46** | 0.52 | **High** |
| **Perceived Ease of Use (PEOU)** | **4.15** | 0.68 | **Moderate-High** |
| **Attitude Toward Using (ATU)** | **4.38** | 0.55 | **High** |
| **Behavioral Intention (BI)** | **4.31** | 0.61 | **High** |

**Interpretation:**
*   **Gap Analysis:** The score for PU (4.46) is notably higher than PEOU (4.15). This indicates a "Utility-First" adoption pattern: users are willing to tolerate minor usability frictions (such as waiting for processing) because the perceived value of the resulting notes is significant.
*   **Correlation:** A positive correlation was observed between PEOU and ATU. Respondents who rated the interface as intuitive were more likely to express excitement about using the tool, validating Davis's (1989) theory that ease of use is a prerequisite for positive attitude.

## 5. System Usability Scale (SUS) Analysis

The SUS provides a global view of subjective usability.

**Calculation:**
*   Sum of converted responses: 400
*   Average raw score per user: 30.77
*   **Final SUS Score:** $30.77 \times 2.5 =$ **76.9**

**Table 3: SUS Score Breakdown**

| Metric | Result | Benchmark |
| :--- | :--- | :--- |
| **Score** | **76.9 / 100** | Industry Avg: 68.0 |
| **Grade** | **B** | "Good" |
| **Adjective Rating** | **Good** | Acceptable |

**Item Analysis:**
*   **Strengths:**
    *   *Item 7 (Learnability):* "I would imagine that most people would learn to use AudioScholar very quickly" averaged **4.5/5**.
    *   *Item 5 (Integration):* "I found the various functions well integrated" averaged **4.3/5**.
*   **Weaknesses:**
    *   *Item 10 (Learning Curve):* "I needed to learn a lot of things before I could get going" received a higher-than-ideal average (2.4/5), likely due to the novel concept of "Context Injection" (uploading PPTs) which requires explanation.

## 6. ISO 25010 Quality Assessment

This section details the technical audit based on specific software characteristics.

**Figure 1: ISO 25010 Quality Radar (Data Summary)**

| Quality Characteristic | Mean Score ($\mu$) | Key Insight |
| :--- | :--- | :--- |
| **Functional Suitability** | **4.38** | Core AI summarization is highly effective. |
| **Performance Efficiency** | **3.85** | **Lowest Score.** Latency concerns during upload/processing. |
| **Usability** | **4.42** | UI is clean, modern, and accessible. |
| **Reliability** | **4.08** | Solid offline recording; occasional sync retry needed. |
| **Security** | **4.15** | Google/GitHub login builds significant trust. |
| **Maintainability** | N/A | Not evaluated by end-users. |
| **Portability** | **4.23** | Consistent experience across Mobile and Web. |

**Strengths & Weaknesses:**
*   **Strength (Usability - 4.42):** The "One-Tap Record" feature was universally praised. The Material Design implementation on Android resonated well with users.
*   **Weakness (Performance - 3.85):** Users noted that while the app is responsive, the server-side processing for the AI summary (Gemini API) felt slow for lectures exceeding 45 minutes, sometimes taking 10+ minutes to return results.

## 7. Feature Evaluation Results

Respondents ranked specific features based on satisfaction.

**Ranking of Key Features:**
1.  **AI Summarization ($\mu=4.62$):** The flagship feature. Users were impressed by the accuracy of the key points extraction.
2.  **Audio Recording Quality ($\mu=4.54$):** Clear audio capture even in lecture hall environments.
3.  **User Notes Feature ($\mu=4.31$):** Viewed as a valuable tool for adding personal annotations to recordings.
4.  **Context Injection / PPT Upload ($\mu=4.15$):** Highly valued, though some users found the upload process strictly tied to recording slightly restrictive.
5.  **Glossary Generation ($\mu=4.00$):** Useful, but sometimes defined terms that were too basic.
6.  **YouTube Recommendations ($\mu=3.69$):** **Lowest ranked.** While innovative, some recommendations were tangential or too generic compared to the specific lecture content.

## 8. Open-Ended Response Analysis

Qualitative feedback was analyzed using thematic coding.

**Theme 1: "Time-Saving Efficiency" (Positive)**
*   *Quote:* "This will literally save me hours of re-listening to recordings. The summary gets straight to the point."
*   *Quote:* "I like that I can add my own notes to specific recordings. It helps me personalize my study materials."

**Theme 2: "Processing Anxiety" (Constructive)**
*   *Quote:* "When the status says 'Processing', I'm not sure if it froze or if it's just working. A progress bar would be nice."
*   *Quote:* "Uploading the PPT took a while on the school WiFi."

**Theme 3: "Feature Requests"**
*   *Quote:* "Can we edit the summary manually? sometimes the AI misses a specific formula."
*   *Quote:* "I wish I could record in the background without Premium."

## 9. Discussion

The results strongly validate the **Project Synthesis** hypothesis that students struggle with cognitive load during lectures and seek automated solutions.

*   **Alignment with TAM:** The high PU score (4.46) suggests that AudioScholar solves a genuine "pain point." Unlike novelty apps, this tool addresses a core academic need. The moderate-high PEOU score (4.15) indicates that while the technology is advanced, the interface successfully abstracts the complexity of the Gemini AI and Cloud Storage interactions.
*   **Comparison to Benchmarks:** With a SUS score of 76.9, AudioScholar outperforms the average for "Cellular Telephone" interfaces (Avg: 72) and approaches "B2C E-commerce" standards (Avg: 78). This is a significant achievement for an academic prototype.
*   **The Latency Trade-off:** The lower Performance Efficiency score (3.85) highlights the trade-off inherent in using high-fidelity LLMs (Gemini Pro). Users perceive the wait time as a friction point. However, the high Satisfaction with the output (4.62) suggests they consider the wait "worth it."

## 10. Recommendations

Based on the data, the following actions are recommended:

**For Development Team:**
1.  **Optimize Processing Feedback:** Implement a granular progress bar or "step indicator" (e.g., "Transcribing...", "Summarizing...", "Formatting...") to reduce user anxiety during the <15 min wait times.
2.  **Refine Recommendations Algorithm:** Adjust the search query parameters sent to the YouTube API to prioritize academic channels over general entertainment to improve the feature's relevance score (currently 3.69).
3.  **Implement 'Draft' Summaries:** Allow users to see a partial transcript while the full summary is generating to improve perceived performance.

**For Implementation/Educators:**
1.  **WiFi Infrastructure:** Emphasize the need for stable uploads.
2.  **Pedagogical Integration:** Encourage students to review the *Context Injection* uploads before class to ensure the AI has the best vocabulary context.

**For Future Research:**
1.  **Longitudinal Study:** Conduct a semester-long study to measure actual grade improvement, moving beyond *perceived* usefulness.
2.  **iOS Expansion:** 100% of current respondents were Android users; expanding to iOS/Web-mobile is critical for total classroom coverage.

## 11. Conclusion

AudioScholar demonstrates high potential as an educational tool. The study confirms that the system effectively addresses the problem of inefficient note-taking, evidenced by high TAM scores and a "Good" SUS rating. While minor performance bottlenecks regarding processing speed exist, they do not significantly detract from the user's intention to adopt the technology. The system is deemed **functionally suitable and highly usable**, clearing the path for wider beta testing and eventual full-scale deployment.

---

## Appendices

### Appendix A: Raw Data Summary (Means)

| Item Code | Mean ($\mu$) | Item Code | Mean ($\mu$) |
| :--- | :--- | :--- | :--- |
| **TAM-PU (B1-B5)** | **4.46** | **ISO-Func (D1-D3)** | **4.38** |
| **TAM-PEOU (B6-B10)** | **4.15** | **ISO-Perf (D4-D6)** | **3.85** |
| **TAM-ATU** | **4.38** | **ISO-Use (D7-D9)** | **4.42** |
| **TAM-BI** | **4.31** | **ISO-Rel (D10-D11)**| **4.08** |
| | | **ISO-Sec (D12-D13)**| **4.15** |

### Appendix B: SUS Scoring Formula Used
*   $Score = \sum(Odd - 1) + \sum(5 - Even) \times 2.5$
*   Benchmark: 68 (Average), 80.3 (Excellent).

### Appendix C: Framework Citations
1.  **Brooke, J.** (1996). SUS: A 'quick and dirty' usability scale.
2.  **Davis, F. D.** (1989). Perceived Usefulness, Perceived Ease of Use, and User Acceptance.
3.  **ISO/IEC.** (2011). ISO/IEC 25010:2011 Systems and software quality models.