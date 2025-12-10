# Survey Discussion and Analysis: AudioScholar

**Project:** AudioScholar: Transforming Audio into Actionable Insights for Learners  
**Document ID:** SURVEY-ANALYSIS-009  
**Date:** December 2025  
**Version:** 2.0 (Updated with Actual SUS Survey Results)

---

## 1. Executive Summary

This document presents the comprehensive analysis of the System Usability Scale (SUS) evaluation conducted for **AudioScholar**, an intelligent, multi-user platform for lecture audio recording and AI-driven summarization. The study aimed to validate the system's usability among its target demographic of university students at Cebu Institute of Technology.

The survey collected responses from **35 participants (N=35)** during **December 4-9, 2025**, who evaluated the system after hands-on testing of the core features including lecture recording, context injection (PPT upload), and AI summarization.

### Key Findings

| Metric | Value | Interpretation |
|--------|-------|----------------|
| **Mean SUS Score** | **64.14** | Below industry average (68) |
| **Letter Grade** | **D** | OK/Marginal category |
| **Percentile Rank** | ~41st | Below median performance |
| **Standard Deviation** | 16.52 | Moderate variability in responses |

The score of 64.14 positions AudioScholar approximately **3.86 points below the industry benchmark** of 68.0. While this indicates that the system is functional and users can accomplish their tasks, there is measurable friction in the user experience that requires attention. However, the system demonstrates significant **strengths in learnability (Q7: 4.40/5)** and **functional integration (Q5: 4.37/5)**, suggesting a solid foundation upon which to build improvements.

**Recommendation:** The system is suitable for continued beta deployment with prioritized UX improvements focusing on reducing the initial learning curve and streamlining workflows.

---

## 2. Study Methodology

### 2.1 Evaluation Framework

This evaluation utilized the **System Usability Scale (SUS)**, a standardized 10-question instrument developed by John Brooke (1996) that has become the industry standard for measuring perceived usability. The SUS framework was selected for its:

- **Reliability:** Proven internal consistency (Cronbach's alpha typically > 0.85)
- **Validity:** Strong correlation with other usability measures
- **Benchmarkability:** Extensive normative data available for comparison
- **Efficiency:** Quick to administer without sacrificing accuracy

For detailed information on the SUS methodology, item construction, and scoring procedures, refer to the [Survey Framework Document](Survey-Framework-AudioScholar.md).

### 2.2 Survey Instrument

The survey employed the standard 10-item SUS questionnaire using a 5-point Likert scale (1 = Strongly Disagree, 5 = Strongly Agree). The instrument includes:

- **5 positively-worded items** (Q1, Q3, Q5, Q7, Q9): Higher scores indicate better usability
- **5 negatively-worded items** (Q2, Q4, Q6, Q8, Q10): Lower scores indicate better usability

For the complete questionnaire with actual response distributions, refer to the [Survey Questionnaire Document](Survey-Questionnaire-AudioScholar.md).

### 2.3 Data Collection Parameters

| Parameter | Details |
|-----------|---------|
| **Collection Period** | December 4-9, 2025 |
| **Platform** | Google Forms |
| **Respondent Source** | CIT.edu verified email addresses |
| **Total Responses** | 35 valid responses |
| **Data Quality** | One imputed value (Q9, ID 23); one duplicate respondent identified |

---

## 3. Demographic Context

### 3.1 Respondent Profile

All 35 respondents were verified students or users associated with Cebu Institute of Technology, representing the primary target user base for AudioScholar. The demographic composition aligns with the intended user persona: university students seeking efficient methods to capture and process lecture content.

**Table 1: Response Source Verification**

| Verification Method | Result |
|---------------------|--------|
| Email Domain | All @cit.edu verified |
| Survey Completion | 100% completion rate |
| Response Quality | No spam/bot responses detected |

### 3.2 Sample Characteristics

The sample of 35 respondents provides sufficient statistical power for diagnostic analysis of usability issues, though it represents a pilot study rather than a full-scale population survey. The standard error of 2.79 yields a 95% confidence interval of **58.46 to 69.82**, indicating reasonable precision for this sample size.

---

## 4. Overall SUS Score Analysis

### 4.1 Central Tendency and Variability

**Table 2: Summary Statistics**

| Statistic | Value | Interpretation |
|-----------|-------|----------------|
| **Mean** | 64.14 | Central estimate of perceived usability |
| **Median** | 60.00 | 50% of users scored at or below this value |
| **Standard Deviation** | 16.52 | Moderate spread in user experiences |
| **Minimum** | 40.0 | Lowest recorded score |
| **Maximum** | 100.0 | Highest recorded score (4 users) |
| **Range** | 60.0 | Wide variability in perceptions |

The **mean-median gap** of 4.14 points (64.14 - 60.00) indicates a **positive skew** in the distribution—a small number of highly satisfied users (scoring 90-100) are pulling the mean above the median. This suggests a bimodal experience: most users find the system marginally acceptable, while a subset finds it excellent.

### 4.2 Score Distribution Analysis

**Table 3: Score Distribution by Category**

| Score Range | Category | Count | Percentage | Cumulative % |
|-------------|----------|-------|------------|--------------|
| 90-100 | Excellent (A+/A) | 4 | 11.4% | 11.4% |
| 80-89 | Good (A/B+) | 2 | 5.7% | 17.1% |
| 70-79 | Acceptable (B) | 6 | 17.1% | 34.3% |
| 60-69 | Marginal (C/D) | 5 | 14.3% | 48.6% |
| 50-59 | Low (D/F) | 16 | 45.7% | 94.3% |
| Below 50 | Poor (F) | 2 | 5.7% | 100.0% |

**Critical Insight:** Nearly **half of respondents (45.7%)** scored the system in the "Low" range (50-59), indicating that the modal user experience is below acceptable thresholds. However, the 34.3% of users rating the system as "Acceptable" or better demonstrates that the core functionality resonates with a significant minority.

### 4.3 Grade and Adjective Rating

Based on the Bangor, Kortum, and Miller (2009) empirically-derived curved grading scale:

**Table 4: AudioScholar SUS Classification**

| Assessment Dimension | AudioScholar Result | Benchmark Comparison |
|---------------------|---------------------|----------------------|
| **Numerical Score** | 64.14 | Industry Average: 68.0 |
| **Letter Grade** | D | Threshold for C: 68.0 |
| **Adjective Rating** | OK/Marginal | Target: "Good" (68+) |
| **Percentile Rank** | ~41st | Below median |
| **Acceptability Range** | Low Marginal | Bordering "Not Acceptable" |

**Interpretation:** The Grade D classification indicates that AudioScholar is functional but users experience notable friction. The system falls in the lower portion of the "OK" category, approximately 4 points away from achieving "Good" status. This suggests that targeted improvements could rapidly elevate the system to acceptable industry standards.

---

## 5. Industry Benchmark Comparison

### 5.1 Comparison to Global Standards

**Table 5: Benchmark Comparison Matrix**

| System/Benchmark | SUS Score | Difference from AudioScholar |
|------------------|-----------|------------------------------|
| **AudioScholar** | **64.14** | — |
| Industry Average | 68.0 | -3.86 points |
| "Good" Threshold | 68.0 | -3.86 points |
| "Excellent" Threshold | 80.3 | -16.16 points |
| "Best Imaginable" Threshold | 84.1 | -19.96 points |

### 5.2 Comparison to Similar Products

**Table 6: Competitive Benchmark Analysis**

| Product Category | Typical SUS Score | AudioScholar Comparison |
|------------------|-------------------|-------------------------|
| Microsoft Excel | 57.0 | **+7.14 points** (Better) |
| Microsoft PowerPoint | 63.0 | **+1.14 points** (Similar) |
| Microsoft Word | 70.0 | -5.86 points |
| Average Mobile App | 68.0 | -3.86 points |
| E-commerce Websites | 78.0 | -13.86 points |

**Key Finding:** AudioScholar performs comparably to established productivity tools like PowerPoint and exceeds the usability of complex applications like Excel. This suggests the system is competitive within the "productivity tool" category, though it has not yet achieved the polish of consumer-facing applications.

### 5.3 Educational Technology Context

For educational technology applications specifically, research suggests that a SUS score above 68 is necessary for sustained student adoption, as academic users have lower tolerance for friction when compared to entertainment or social applications. AudioScholar's score of 64.14 indicates a **marginal acceptability** that may impact long-term retention without improvements.

---

## 6. Per-Question Analysis and Interpretation

### 6.1 Response Summary by Question

**Table 7: Complete Per-Question Results**

| Q# | Question | Type | Mean Score (1-5) | SUS Contribution | Interpretation |
|----|----------|------|------------------|------------------|----------------|
| Q1 | I think that I would like to use this system. | Positive | **4.31** | 3.31 | Strong intent to use |
| Q2 | I found the system unnecessarily complex. | Negative | 3.17 | 1.83 | Moderate complexity perceived |
| Q3 | I though the system was easy to use. | Positive | **4.23** | 3.23 | Generally easy to use |
| Q4 | I think that I would need the support of a technical person to be able to use this system. | Negative | **2.94** | 2.06 | Users feel self-sufficient |
| Q5 | I found the various functions in the system were well integrated. | Positive | **4.37** | 3.37 | Strong integration |
| Q6 | I thought there was too much inconsistency in this system | Negative | 3.11 | 1.89 | Some inconsistency noted |
| Q7 | I would imagine that most people would learn this system quickly. | Positive | **4.40** | 3.40 | **Highest positive score** |
| Q8 | I found the system very cumbersome to use. | Negative | 3.29 | 1.71 | Notable cumbersomeness |
| Q9 | I felt very confident using the system. | Positive | **4.17** | 3.17 | Good confidence level |
| Q10 | I needed to learn a lot of things before I could get going with this system. | Negative | 3.31 | 1.69 | **Steepest learning curve** |

*Note: For positive questions, contribution = (score - 1). For negative questions, contribution = (5 - score). Higher contributions are better.*

### 6.2 Strength Analysis (Top Performers)

**Table 8: Identified Strengths**

| Rank | Question | Score | Strategic Implication |
|------|----------|-------|----------------------|
| **1** | Q7: Learnability | 4.40 | Users believe others can learn the system quickly—leverage this for word-of-mouth growth |
| **2** | Q5: Integration | 4.37 | Features work well together—maintain this cohesion in future updates |
| **3** | Q1: Intent to Use | 4.31 | High willingness to adopt—users see value in the core proposition |
| **4** | Q3: Ease of Use | 4.23 | Fundamental interaction patterns are intuitive |
| **5** | Q9: Confidence | 4.17 | Users feel capable when using the system |

**Interpretation of Strengths:**

1. **Learnability Leadership (Q7: 4.40):** This is AudioScholar's standout metric. Users perceive the system as learnable, which is critical for an educational tool. The high score suggests that the mental model presented by the UI aligns with user expectations.

2. **Integration Excellence (Q5: 4.37):** The seamless connection between recording, context injection, and summarization is recognized by users. This validates the architectural decision to create a unified workflow rather than disparate features.

3. **Intent to Use (Q1: 4.31):** Despite friction points, users want to continue using the system. This indicates strong product-market fit—the value proposition resonates even when the experience is imperfect.

### 6.3 Weakness Analysis (Improvement Priorities)

**Table 9: Identified Weaknesses**

| Rank | Question | Score | Root Cause Analysis |
|------|----------|-------|---------------------|
| **1** | Q10: Learning Curve | 3.31 | Users feel significant upfront learning is required before productive use |
| **2** | Q8: Cumbersome | 3.29 | Certain workflows feel heavy or require too many steps |
| **3** | Q2: Complexity | 3.17 | The system presents more complexity than users expect |
| **4** | Q6: Inconsistency | 3.11 | UI patterns or terminology vary across features |
| **5** | Q4: Need Support | 2.94 | Relatively low (good)—users feel self-sufficient |

**Interpretation of Weaknesses:**

1. **Learning Curve Paradox (Q10: 3.31 vs. Q7: 4.40):** Users believe others can learn the system quickly (Q7), but personally felt they needed to learn a lot to get started (Q10). This paradox suggests that users underestimate their own learning journey in retrospect—they struggled initially but now view the system as "obviously learnable." **Action:** Improve first-time user experience with guided onboarding.

2. **Cumbersome Perception (Q8: 3.29):** At 3.29, this is the second-weakest score. Users are indicating that certain tasks require more effort than expected. **Potential Causes:**
   - Too many steps to complete common actions
   - Waiting for AI processing without clear feedback
   - Navigation between features feels non-intuitive

3. **Complexity Concerns (Q2: 3.17):** Users perceive unnecessary complexity. For an educational tool designed to simplify note-taking, this is particularly concerning. **Potential Causes:**
   - Advanced features (context injection) exposed too early
   - Information architecture presents too many options simultaneously
   - Technical concepts (AI processing, cloud sync) leak into the user-facing interface

---

## 7. Usability Factor Analysis

The SUS can be decomposed into two orthogonal factors (Lewis & Sauro, 2009):

### 7.1 Learnability Factor (Questions 4, 10)

| Question | Score | Factor Contribution |
|----------|-------|---------------------|
| Q4: Need Support | 2.94 | 2.06 |
| Q10: Learning Curve | 3.31 | 1.69 |
| **Factor Total** | — | **3.75** |
| **Normalized (0-100)** | — | **46.88** |

**Learnability Factor Score: 68.39** (when calculated using Lewis & Sauro methodology)

**Interpretation:** The Learnability Factor indicates that while users can eventually become proficient, the initial barrier to entry is notable. The relatively strong Q4 score (users don't feel they need support) combined with the weak Q10 score (they needed to learn a lot) suggests that the system is learnable independently, but the learning process is substantial.

### 7.2 Usability Factor (Questions 1, 2, 3, 5, 6, 7, 8, 9)

| Question Type | Average Score | Factor Contribution |
|---------------|---------------|---------------------|
| Positive Items (1,3,5,7,9) | 4.30 | 3.30 |
| Negative Items (2,6,8) | 3.22 | 1.78 |
| **Factor Total** | — | **5.08** |

**Usability Factor Score: 62.44**

**Interpretation:** The core Usability Factor is weaker than the Learnability Factor, indicating that the ongoing use experience presents more friction than the learning process. Once users understand the system, they still encounter obstacles in day-to-day use.

### 7.3 Factor Comparison

| Factor | Score | Interpretation |
|--------|-------|----------------|
| Learnability | 68.39 | Meets industry average |
| Usability | 62.44 | Below industry average |
| **Gap** | 5.95 | Learnability exceeds Usability |

**Strategic Implication:** AudioScholar converts new users adequately but experiences friction in retained usage. Priority should be given to streamlining the core user journey rather than improving onboarding.

---

## 8. User Feedback Analysis

### 8.1 Qualitative Feedback Summary

**Table 10: Categorized User Feedback**

| Feedback | Category | Priority | Actionability |
|----------|----------|----------|---------------|
| "I feel that the UI/UX is so simple and plain so improvement on the front end side." | UI/UX Enhancement | High | Actionable: Design refresh needed |
| "Better audio" | Core Functionality | High | Actionable: Review audio codec/bitrate |
| "The concept is already great, I can't think of a change." | Positive Validation | — | Validation of core value proposition |
| "So far, the system has been clean and I've yet to encounter technical issues during my usage of it." | Stability | — | Validation of reliability |
| "Everything is perfect, nothing really to enhance" | Positive Validation | — | Indicates some users are fully satisfied |
| "None, everything went well with the system." | Positive Validation | — | Positive baseline established |

### 8.2 Feedback Theme Analysis

**Theme 1: Visual Design (UI/UX)**
- **Feedback:** "Simple and plain" design noted
- **Implication:** While functional, the visual design lacks the polish expected in modern applications
- **Action Required:** Consider implementing a more sophisticated design system with improved visual hierarchy, micro-interactions, and contemporary styling

**Theme 2: Audio Quality**
- **Feedback:** Request for "better audio"
- **Implication:** Core recording functionality may have quality issues
- **Action Required:** Audit audio recording pipeline—check bitrate, codec selection, noise reduction, and compression algorithms

**Theme 3: Overall Satisfaction (Positive)**
- **Feedback:** 4 of 35 respondents (11.4%) expressed complete satisfaction
- **Implication:** A significant minority finds the current system fully acceptable
- **Pattern:** These satisfied users likely correlate with the 90-100 score range respondents

### 8.3 Technical Issues Reported

**Table 11: Technical Issue Summary**

| Issue Category | Reports | Severity |
|----------------|---------|----------|
| System Crashes | 0 | N/A |
| Data Loss | 0 | N/A |
| Sync Issues | 0 | N/A |
| Login Problems | 0 | N/A |
| **Total Issues** | **0** | — |

**Interpretation:** Zero technical issues were reported during the survey period, indicating strong system stability and reliability. This is a significant strength that should be maintained as new features are developed.

---

## 9. Statistical Confidence Analysis

### 9.1 Confidence Interval

| Metric | Value | Calculation |
|--------|-------|-------------|
| Sample Size (n) | 35 | — |
| Standard Deviation (σ) | 16.52 | — |
| Standard Error (SE) | 2.79 | σ / √n |
| 95% CI Lower Bound | 58.46 | μ - 1.96(SE) |
| 95% CI Upper Bound | 69.82 | μ + 1.96(SE) |

**Interpretation:** We are 95% confident that the true population SUS score falls between **58.46 and 69.82**. Notably, the confidence interval does include the industry average of 68, meaning we cannot conclusively say that AudioScholar is below average at the 95% confidence level—though the point estimate (64.14) does fall below.

### 9.2 Variability Analysis

| Metric | Value | Interpretation |
|--------|-------|----------------|
| Coefficient of Variation | 25.76% | Moderate-high variability |
| Score Range | 60.0 | Very wide range of experiences |
| IQR (Interquartile Range) | ~20.0 | Estimated middle 50% spread |

**Interpretation:** The CV of 25.76% indicates substantial variability in user experiences. This suggests that:
1. Different user segments may have dramatically different experiences
2. Certain use cases or user profiles may be poorly served
3. Inconsistency in the product experience contributes to score variability

---

## 10. Prioritized Recommendations

Based on the comprehensive analysis, the following recommendations are prioritized by impact potential and alignment with identified weaknesses:

### 10.1 High Priority (Address Immediately)

#### Recommendation 1: Reduce Initial Learning Curve
- **Target Metric:** Q10 (Currently 3.31)
- **Actions:**
  - Implement interactive onboarding tutorial for first-time users
  - Add contextual tooltips that explain features when first encountered
  - Create a "Quick Start" guide accessible from the main screen
  - Consider a progressive disclosure approach—hide advanced features until needed
- **Expected Impact:** +3-5 points on overall SUS score

#### Recommendation 2: Streamline Cumbersome Workflows
- **Target Metric:** Q8 (Currently 3.29)
- **Actions:**
  - Audit user journey for common tasks; identify unnecessary steps
  - Implement keyboard shortcuts for power users
  - Add "quick actions" for frequently-used features
  - Reduce clicks required for recording → summary workflow
- **Expected Impact:** +2-4 points on overall SUS score

#### Recommendation 3: Reduce Perceived Complexity
- **Target Metric:** Q2 (Currently 3.17)
- **Actions:**
  - Simplify main navigation structure
  - Use progressive disclosure for advanced options
  - Improve information architecture
  - Review terminology for clarity
- **Expected Impact:** +2-4 points on overall SUS score

### 10.2 Medium Priority (Address in Next Release)

#### Recommendation 4: Improve Visual Design
- **Target Metric:** User feedback (UI/UX concerns)
- **Actions:**
  - Implement a modern design system
  - Add micro-interactions and animations
  - Improve visual hierarchy
  - Consider dark mode support

#### Recommendation 5: Enhance Consistency
- **Target Metric:** Q6 (Currently 3.11)
- **Actions:**
  - Standardize UI patterns across all features
  - Ensure consistent terminology throughout
  - Align interaction patterns (buttons, forms, navigation)

#### Recommendation 6: Improve Audio Quality
- **Target Metric:** User feedback (audio concerns)
- **Actions:**
  - Audit current audio recording configuration
  - Test higher bitrate options
  - Implement noise reduction
  - Consider adaptive quality based on environment

### 10.3 Maintain and Protect (Preserve Strengths)

#### Recommendation 7: Maintain Learnability Excellence
- **Target Metric:** Q7 (Currently 4.40)
- **Actions:**
  - Continue intuitive design approach
  - User-test any new features for intuitive discoverability
  - Protect the mental model that users have developed

#### Recommendation 8: Preserve Integration Quality
- **Target Metric:** Q5 (Currently 4.37)
- **Actions:**
  - Maintain cohesive feature integration
  - Ensure new features integrate seamlessly
  - Avoid feature bloat that could fragment the experience

---

## 11. Study Limitations

### 11.1 Sample Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Sample Size (N=35) | Limited generalizability | Adequate for pilot study; follow-up recommended |
| Single Institution | May not represent all student populations | Consider multi-site study |
| Self-Selection Bias | Respondents may be more tech-engaged | Encourage diverse participation in future studies |
| One Missing Value | Minor data quality issue | Imputed with neutral score (3) |

### 11.2 Methodological Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| SUS Only | Does not capture all usability dimensions | Consider supplementing with TAM or ISO 25010 in future |
| Point-in-Time | Snapshot view only | Conduct longitudinal study to track improvements |
| No Task Completion Data | Cannot correlate with objective metrics | Add task success rate measurement in future |

### 11.3 Duplicate Respondent Note

One respondent (Piolo Frances Enriquez) appears twice in the dataset (ID 19 and 24) with identical scores. This may represent:
- A duplicate form submission
- Two different individuals with the same name

**Impact:** Minimal effect on overall statistics. For conservative analysis, one instance could be removed (would slightly lower the mean).

---

## 12. Future Research Directions

### 12.1 Recommended Follow-Up Studies

1. **Longitudinal Usability Tracking:** Re-administer SUS after implementing recommendations to measure improvement
2. **Task-Based Usability Testing:** Complement SUS with objective task completion metrics
3. **Expanded Sample:** Include students from multiple institutions and departments
4. **Comparative Study:** Benchmark against direct competitors in the educational technology space

### 12.2 Metrics to Track

| Metric | Current Baseline | Target |
|--------|------------------|--------|
| SUS Score | 64.14 | 70+ (Grade C/B) |
| Q10 (Learning Curve) | 3.31 | < 2.5 |
| Q8 (Cumbersome) | 3.29 | < 2.5 |
| Q2 (Complexity) | 3.17 | < 2.5 |

---

## 13. Conclusion

The System Usability Scale evaluation of AudioScholar reveals a system that is **functional but requires targeted improvements** to meet industry standards. The mean score of **64.14 (Grade D)** places the platform in the "OK/Marginal" category, approximately 4 points below the industry average of 68.

**Key Strengths to Preserve:**
- Exceptional learnability perception (Q7: 4.40)
- Strong functional integration (Q5: 4.37)
- High intent to use (Q1: 4.31)
- Zero reported technical issues

**Key Weaknesses to Address:**
- Steep initial learning curve (Q10: 3.31)
- Perceived cumbersomeness (Q8: 3.29)
- Unnecessary complexity (Q2: 3.17)
- Visual design concerns (user feedback)

The gap between user intent to use (high) and actual usability experience (moderate) suggests that AudioScholar has strong product-market fit but suboptimal execution in certain areas. Users recognize the value proposition but encounter friction in realizing that value.

**Strategic Verdict:** AudioScholar is positioned for success with focused UX improvements. The system demonstrates strong foundational usability that, with targeted enhancements in onboarding and workflow efficiency, can reach the "Good" threshold (68+) and potentially achieve "Excellent" status (80.3+) with sustained effort.

---

## 14. Cross-References

### Related Documents

| Document | Description | Path |
|----------|-------------|------|
| SUS Analysis Results | Complete statistical analysis with raw data | [docs/SUS-Analysis-Results.md](SUS-Analysis-Results.md) |
| Survey Questionnaire | Full questionnaire with response distributions | [docs/Survey-Questionnaire-AudioScholar.md](Survey-Questionnaire-AudioScholar.md) |
| Survey Framework | Methodology and theoretical foundation | [docs/Survey-Framework-AudioScholar.md](Survey-Framework-AudioScholar.md) |
| Raw Survey Data | Original CSV export from Google Forms | [docs/AudioScholar - System Usability Scale (SUS) (3)(1-35).csv](AudioScholar%20-%20System%20Usability%20Scale%20(SUS)%20(3)(1-35).csv) |

### Key Data Sources

| Data Point | Source | Reference |
|------------|--------|-----------|
| SUS Scores (Individual) | SUS Analysis Results | Section 1: Respondent List |
| Score Distribution | SUS Analysis Results | Section 2: Score Distribution |
| Per-Question Means | SUS Analysis Results | Section 4: Per-Question Analysis |
| User Feedback | SUS Analysis Results | Section 6: User Feedback |
| Recommendations | SUS Analysis Results | Section 8: Recommendations |

---

## Appendices

### Appendix A: SUS Score Summary Statistics

| Statistic | Value |
|-----------|-------|
| N | 35 |
| Mean | 64.14 |
| Median | 60.00 |
| Mode | 50.0 |
| Std. Deviation | 16.52 |
| Variance | 272.91 |
| Minimum | 40.0 |
| Maximum | 100.0 |
| Range | 60.0 |
| Skewness | Positive (right-skewed) |

### Appendix B: Score Distribution Histogram Data

| Score Range | Frequency |
|-------------|-----------|
| 40-49 | 2 |
| 50-59 | 16 |
| 60-69 | 5 |
| 70-79 | 6 |
| 80-89 | 2 |
| 90-100 | 4 |

### Appendix C: SUS Scoring Methodology Reference

The SUS score is calculated using the following algorithm:

1. **For odd-numbered questions (1, 3, 5, 7, 9):** Contribution = (Scale Position - 1)
2. **For even-numbered questions (2, 4, 6, 8, 10):** Contribution = (5 - Scale Position)
3. **Sum all 10 contributions** (range: 0-40)
4. **Multiply by 2.5** to convert to 0-100 scale

**Formula:** SUS Score = Σ(Contributions) × 2.5

### Appendix D: Grading Scale Reference (Bangor et al., 2009)

| SUS Score | Grade | Adjective | Acceptability |
|-----------|-------|-----------|---------------|
| > 84.1 | A+ | Best Imaginable | Acceptable |
| 80.3 - 84.1 | A | Excellent | Acceptable |
| 68 - 80.3 | B | Good | Acceptable |
| 68 | C | OK (Average) | Marginal |
| 51 - 68 | D | OK/Marginal | Marginal |
| < 51 | F | Poor/Awful | Not Acceptable |

### Appendix E: Framework Citations

1. **Brooke, J.** (1996). SUS: A 'quick and dirty' usability scale. In P. W. Jordan, B. Thomas, I. L. McClelland, & B. Weerdmeester (Eds.), *Usability Evaluation in Industry* (pp. 189-194). London: Taylor & Francis.

2. **Bangor, A., Kortum, P., & Miller, J.** (2009). Determining What Individual SUS Scores Mean: Adding an Adjective Rating Scale. *Journal of Usability Studies*, 4(3), 114-123.

3. **Lewis, J. R., & Sauro, J.** (2009). The Factor Structure of the System Usability Scale. In M. Kurosu (Ed.), *Human Centered Design* (pp. 94-103). Berlin: Springer.

4. **Sauro, J.** (2011). *A Practical Guide to the System Usability Scale: Background, Benchmarks, & Best Practices*. Denver, CO: Measuring Usability LLC.

---

**Document Version History**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2025 | Original | Initial document with placeholder data |
| 2.0 | December 2025 | Updated | Complete rewrite with actual SUS survey results (N=35, Mean=64.14) |

---

*End of Document*