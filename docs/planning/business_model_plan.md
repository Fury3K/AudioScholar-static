# Business Model & Feature Restriction Plan (Frontend-Only Enforcement)

## Executive Summary
This document outlines the revised business model for AudioScholar, specifically tailored for a **Frontend-Only** enforcement strategy. To avoid complex backend logic changes or API modifications, restrictions will focus strictly on **Quantity Limits** (number of files, duration) and **Access Control** (hiding/disabling UI elements). The backend remains agnostic to the user's tier regarding data processing; the mobile app simply prevents the Free user from initiating expensive or advanced actions. The model remains a 2-Tier system: **Free vs. Premium (₱199/mo)**.

---

## 1. Pricing Strategy

We maintain the 2-Tier model to keep the value proposition clear and implementation simple.

### Tier 1: AudioScholar Free (₱0 / month)
**Target:** Casual users, trial users.
*   **Philosophy:** "Limited Capacity." Users can use the full power of the AI for a very small number of files. This proves the quality without incurring sustainable server costs.
*   **Key Constraints:** strict limits on *how many* recordings can be kept and *how long* they can be.

### Tier 2: AudioScholar Premium (₱199 / month)
**Target:** Students, Serious Learners.
*   **Value Proposition:** "Remove Limits." Record as much as you want, for as long as you want, and access export tools.
*   **Pricing:** ₱199/month (Aligned with local subscription standards like Spotify/Netflix).

---

## 2. Feature Matrix (Quantity & Access)

Restrictions are defined by what the App allows the user to *initiate* or *store* locally, based on confirmed UI capabilities.

| Feature Category | Feature | Free Tier | Premium Tier (₱199) |
| :--- | :--- | :--- | :--- |
| **Core Recording** | **Local Recording Capacity** | 🔒 **Max 3 Files** stored locally.<br>*(Must delete old files to record new ones)* | ✅ **Unlimited** |
| | **Recording Duration** | 🔒 **Max 15 Minutes** per file.<br>*(Auto-stop applied by App)* | ✅ **Unlimited** |
| **AI Processing** | **Summarization** | ✅ **Included** (for the 3 allowed files) | ✅ **Included** |
| | **Key Points & Topics** | ✅ **Included** | ✅ **Included** |
| | **YouTube Recommendations** | 🔒 **Locked** (Section Hidden/Disabled in Resources Tab) | ✅ **Included** |
| | **Glossary** | ✅ **Included** | ✅ **Included** |
| **Tools** | **PowerPoint/PDF Attachment** | 🔒 **Locked** (Button Disabled) | ✅ **Included** |
| **System** | **Cloud Sync** | 🔒 **Disabled** (Cloud Tab Locked/Empty) | ✅ **Included** |

---

## 3. Frontend Implementation Strategy

The enforcement logic resides entirely in the mobile application's UI and State Management layers.

### A. Global Premium State
The app uses a `PremiumStatusManager` (already existing) that holds a simple boolean: `isPremium`.
*   **Source:** Derived from User Role in local storage / User Profile API response.
*   **Fallback:** Defaults to `false` (Free) if offline or checking fails.

### B. "Quantity" Limit Implementation
**1. Max 3 Local Files (The "Slot" System)**
*   **Location:** `RecordingViewModel` / `LibraryViewModel`
*   **Logic:** Before starting a new recording or importing a file, check `localDatabase.recordingDao().count()`.
*   **Check:**
    ```kotlin
    if (!isPremium && localRecordingCount >= 3) {
        showUpgradeDialog("Free users can only keep 3 recordings. Delete one or Upgrade.")
        return // Block action
    }
    ```

**2. Max 15 Minute Duration**
*   **Location:** `RecordingService`
*   **Logic:** Start a timer when recording begins.
*   **Check:**
    ```kotlin
    if (!isPremium && duration >= 15.minutes) {
        stopRecording()
        showToast("Free limit reached (15 mins). Recording saved.")
    }
    ```

### C. "Access" Limit Implementation (UI Locking)
**1. Button Hiding/Disabling (Attachments)**
*   **Location:** `RecordingDetailsScreen` (Resources Tab)
*   **Logic:** Disable the "Attach PowerPoint" button.
*   **Example:**
    ```kotlin
    if (isPremium) {
        IconButton(onClick = { attachPpt() }) { Icon(Icons.AttachFile) }
    } else {
        IconButton(onClick = { navToSubscription() }) { Icon(Icons.Lock) }
    }
    ```

**2. Section Locking (YouTube Recommendations)**
*   **Location:** `RecordingDetailsScreen` (Resources Tab)
*   **Logic:** Hide the `YouTubeRecommendationCard` or replace it with a "Premium Feature" banner.

**3. Tab Locking (Cloud Sync)**
*   **Location:** `LibraryScreen`
*   **Logic:** When the user clicks the "Cloud" tab, show a "Sync is a Premium Feature" overlay instead of the `CloudRecordingListItem` list.

---

## 4. Migration & Edge Cases

*   **Existing Free Users with >3 Files:**
    *   **Policy:** They keep their files (read-only), but cannot *create new ones* until they delete down to below 3 or upgrade.
    *   **Implementation:** The check is strictly on *creation* (Record/Import) of new data.
*   **Uninstall/Reinstall:**
    *   Since limits are local database counts, reinstalling (wiping DB) resets the counter to 0. This is an acceptable loophole for a "Frontend-Only" MVP.

---

## 5. Artifacts Produced
*   `docs/planning/business_model_plan.md`