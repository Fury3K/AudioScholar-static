# Util Module

## 1. Module Overview

The Util module provides general-purpose, cross-cutting utility classes and helper functions that can be reused throughout the AudioScholar backend. Its primary role is to encapsulate common logic that is not specific to any single business domain, thereby promoting code reuse and reducing redundancy. This module enhances the robustness and reliability of the application by offering standardized solutions for common operational challenges, such as handling transient failures in task execution.

## 2. Key Classes & Components

| Class / Component | Description |
| --- | --- |
| [`RobustTaskExecutor.java`](../src/main/java/edu/cit/audioscholar/util/RobustTaskExecutor.java) | A Spring component designed to execute tasks with a resilient, infinite retry mechanism, ensuring that critical operations eventually succeed despite transient errors. |

## 3. Responsibilities & Logic Flow

**Key Responsibilities:**
- To provide a mechanism for executing critical tasks that must eventually complete, even if they encounter repeated failures.
- To handle exceptions gracefully during task execution, preventing process termination.
- To implement an exponential backoff strategy for retries to avoid overwhelming external services or resources.

**Example Workflow: Executing a Resilient Task**
1.  **Step 1:** A service component injects the `RobustTaskExecutor` and calls one of its `executeWithInfiniteRetry` methods, passing a task (as a `Supplier` or `Runnable`), a `contextId` for logging, and a `taskDescription`.
2.  **Step 2:** The executor enters an infinite loop and attempts to execute the task.
3.  **Step 3:** If the task succeeds, its result is returned (or the method completes if it's a `void` task), and the loop terminates.
4.  **Step 4:** If the task throws an `Exception`, the executor catches it, logs the error with the context ID, and calculates a wait time.
5.  **Step 5:** The executing thread sleeps for a calculated delay. The delay starts at 2 seconds and doubles after each failure, up to a maximum of 60 seconds.
6.  **Step 6:** The loop continues, and the task is retried. This process repeats indefinitely until the task succeeds.

## 4. Dependencies

**Internal Dependencies:**
- This module has **no dependencies** on other modules within the project, ensuring it remains a self-contained and highly reusable utility.

**External Dependencies:**
- **SLF4J (Simple Logging Facade for Java)**: Used for structured logging of task failures and retry attempts.
- **Spring Framework**: The `RobustTaskExecutor` is annotated with `@Component`, allowing it to be managed by the Spring IoC container and injected into other services.

## 5. Configuration

This module does not require any specific external configuration from `application.properties` or environment variables. The retry behavior (initial delay, max delay, and backoff factor) is hardcoded within the `RobustTaskExecutor` class.