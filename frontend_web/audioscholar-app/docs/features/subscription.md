# Subscription System

The Subscription System allows users to upgrade their accounts to unlock premium features. It includes a multi-step flow from plan selection to payment and checkout.

## Overview

-   **Tiers:** Basic (Free) and Premium (Paid).
-   **Payment Methods:** Credit/Debit Card and E-Wallet (GCash/PayMaya).
-   **Integration:**
    -   Frontend handles the UI and temporary storage of payment details.
    -   Backend (`api/users/:id/role`) is called to update the user's role upon successful "payment" (Mocked).

## Workflow

### 1. Plan Selection
**File:** `src/pages/Subscription/SubscriptionTierPage.jsx`
**Route:** `/subscribe`

-   Displays available plans (Basic vs. Premium) with features and pricing.
-   **Basic:** Free, default for new users.
-   **Premium:** ₱150/month. Adds background recording, cloud sync, etc.
-   **Action:** Selecting "Premium" saves the choice to `localStorage` (`selectedTier`) and redirects to `/payment`.

### 2. Payment Method Selection
**File:** `src/pages/Subscription/PaymentMethodPage.jsx`
**Route:** `/payment`

-   Users choose between:
    -   **Card:** Visa/Mastercard/Amex.
    -   **E-Wallet:** GCash/PayMaya.
-   **Components:**
    -   `CardPaymentForm`: Validates card number (Luhn algorithm logic simplified), expiry, CVV.
    -   `EWalletPaymentForm`: Validates 10-digit PH mobile number.
-   **Action:** Valid forms save details to `localStorage` (`paymentDetails`, `paymentMethod`) and redirect to `/checkout`.

### 3. Checkout & Confirmation
**File:** `src/pages/Subscription/CheckoutPage.jsx`
**Route:** `/checkout`

-   **Review:** Displays selected plan, price, and payment method summary.
-   **Confirmation:**
    -   Clicking "Confirm and Pay" simulates a payment process (1.5s delay).
    -   On success, it calls `PUT api/users/:id/role` to update the user's role to `ROLE_PREMIUM`.
    -   A success modal confirms the upgrade and links to the user profile.
-   **Error Handling:** Handles API failures (e.g., auth issues) and displays appropriate error messages.

## Data Persistence

-   **Temporary:** `localStorage` is used to persist `selectedTier` and `paymentDetails` between steps in the funnel. These are cleared upon successful checkout.
-   **Permanent:** The user's role in the database is the source of truth for their subscription status.