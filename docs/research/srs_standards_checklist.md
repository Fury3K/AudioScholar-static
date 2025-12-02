# SRS Standards Audit Checklist
**Based on IEEE 830 and ISO/IEC/IEEE 29148 Best Practices**

This checklist is designed to audit Software Requirements Specification (SRS) documents for professional quality, structural integrity, and industry standard compliance.

## 1. Document Structure Compliance (IEEE 830 / ISO 29148)
Does the document follow the standard hierarchical structure?

- [ ] **1. Introduction**
    - [ ] **Purpose:** clearly defines the purpose of the SRS and intended audience.
    - [ ] **Scope:** explicitly states what the software will AND will not do (boundaries).
    - [ ] **Definitions/Acronyms:** defines all technical terms and abbreviations used.
- [ ] **2. Overall Description** (High-level view, no specific requirements yet)
    - [ ] **Product Perspective:** relationship to other systems/projects.
    - [ ] **User Characteristics:** demographics, technical expertise of users.
    - [ ] **Constraints:** hardware, regulatory, or policy limitations.
    - [ ] **Assumptions and Dependencies:** factors outside the project's control.
- [ ] **3. Specific Requirements** (The core "shall" statements)
    - [ ] **Functional Requirements:** organized logically (by feature, user class, or mode).
    - [ ] **External Interface Requirements:** User, Hardware, Software, Communications interfaces.
    - [ ] **Quality Attributes (Non-functional):** Performance, Security, Reliability, Maintainability.
- [ ] **4. Appendices (Optional):** Material not part of the requirements but helpful (e.g., input/output formats).

## 2. Requirement Quality (The "Shall" Test)
Evaluate individual requirements against these criteria.

- [ ] **Correctness:** Does every requirement accurately reflect a stakeholder need?
- [ ] **Unambiguity:** Is every requirement susceptible to only ONE interpretation?
    - *Fail example:* "The system shall be user-friendly." (Subjective)
    - *Pass example:* "The system shall allow a user to complete the signup flow in fewer than 4 clicks."
- [ ] **Completeness:** Are all scenarios (including error states) covered?
    - [ ] Are "TBD" (To Be Determined) items minimized or nonexistent?
- [ ] **Consistency:** Do any requirements conflict with others?
    - [ ] (e.g., Req A says "Blue background" and Req B says "Red background").
- [ ] **Verifiability (Testability):** Can a test case be written to definitively pass/fail this?
    - [ ] Are metrics used instead of vague adjectives (fast, robust, reliable)?
- [ ] **Implementation Independence:** Does it state *what* is needed, not *how* to build it?
    - [ ] *Fail:* "Use a React `useEffect` hook to fetch data."
    - [ ] *Pass:* "The system shall refresh the data display every 30 seconds."
- [ ] **Traceability:** Does every requirement have a unique identifier (e.g., `FR-001`, `REQ-AUTH-02`)?

## 3. "Bloat" & Professionalism Indicators
Check for signs of unprofessional or difficult-to-maintain documentation.

- [ ] **No Implementation Leakage:** Is the document free of specific code snippets, database schemas, or UI styling details (unless they are explicit design constraints)?
- [ ] **Conciseness:** Are requirements written in simple, active voice sentences?
    - [ ] Avoid: "The user should be able to... " -> Use: "The system shall..."
- [ ] **No Redundancy:** Is information stated only once? (Duplication leads to inconsistency when updating).
- [ ] **Separation of Concerns:** Are functional requirements clearly separated from non-functional ones?
- [ ] **Passive Voice Avoidance:** Is the actor clearly defined?
    - *Avoid:* "The data is saved."
    - *Prefer:* "The System shall save the data."

## 4. Mobile-Specific Considerations (If applicable)
- [ ] **Permissions:** Are required device permissions (Camera, Location, etc.) explicitly listed as requirements?
- [ ] **Offline Behavior:** Is system behavior defined when network connectivity is lost?
- [ ] **Orientation/State:** Are requirements for landscape/portrait or background state handling defined?

## 5. Summary Audit Result
- [ ] **PASS:** Ready for development/QA.
- [ ] **NEEDS REVISION:** Critical ambiguities or structural issues found.