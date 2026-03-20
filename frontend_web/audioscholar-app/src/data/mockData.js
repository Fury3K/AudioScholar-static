// Mock data for the static portfolio version of AudioScholar
// This replaces all backend API calls with realistic demo data

export const DEMO_USER = {
  uid: 'demo-user-001',
  firstName: 'Alex',
  lastName: 'Rivera',
  email: 'alex.rivera@demo.audioscholar.com',
  profileImageUrl: null,
  roles: ['ROLE_USER', 'ROLE_PREMIUM', 'ROLE_ADMIN'],
  createdAt: { seconds: 1700000000 },
};

const now = Math.floor(Date.now() / 1000);
const oneDay = 86400;
const oneWeek = oneDay * 7;

export const DEMO_RECORDINGS = [
  {
    id: 'rec-001',
    recordingId: 'rec-001',
    title: 'Introduction to Machine Learning',
    description: 'CS 4301 - Lecture covering supervised and unsupervised learning fundamentals',
    status: 'COMPLETED',
    isFavorite: true,
    favoriteCount: 3,
    durationSeconds: 2847,
    uploadTimestamp: { seconds: now - oneDay * 0.5 },
    storageUrl: null,
    audioUrl: null,
    transcriptText: `Good morning everyone, welcome to CS 4301. Today we're going to be covering the fundamentals of machine learning.

Machine learning is a subset of artificial intelligence that focuses on building systems that learn from data. Instead of being explicitly programmed to perform a task, these systems use algorithms to parse data, learn from it, and then make a determination or prediction.

There are three main types of machine learning:

First, supervised learning. This is where the algorithm learns from labeled training data. You give it inputs and the correct outputs, and it learns the mapping function. Common examples include classification and regression problems. For instance, spam detection in email - you have emails labeled as spam or not spam, and the algorithm learns to classify new emails.

Second, unsupervised learning. Here, the algorithm works with unlabeled data. It tries to find hidden patterns or intrinsic structures in the input data. Clustering is a common unsupervised learning technique. Think of customer segmentation - grouping customers based on purchasing behavior without predefined categories.

Third, reinforcement learning. This involves an agent that learns to make decisions by taking actions in an environment to maximize some notion of cumulative reward. Think of how AlphaGo learned to play Go by playing millions of games against itself.

Let's dive deeper into supervised learning algorithms. The simplest is linear regression, which models the relationship between a dependent variable and one or more independent variables using a linear equation. The goal is to find the best-fitting line through the data points.

Decision trees are another popular method. They work by splitting the data into subsets based on feature values, creating a tree-like structure of decisions. Random forests improve on this by creating many decision trees and combining their predictions.

Neural networks, inspired by biological neural networks, consist of layers of interconnected nodes. Each connection has a weight that gets adjusted during training. Deep learning uses neural networks with many layers, enabling the learning of complex patterns.

For evaluation, we use metrics like accuracy, precision, recall, and F1-score for classification problems, and mean squared error or R-squared for regression problems.

Remember, the key challenge in machine learning is avoiding overfitting - when a model learns the training data too well and performs poorly on new, unseen data. Techniques like cross-validation, regularization, and proper train-test splits help address this.

That's our overview for today. Next lecture, we'll implement our first machine learning model in Python using scikit-learn. Please read chapters 3 and 4 before next class.`,
  },
  {
    id: 'rec-002',
    recordingId: 'rec-002',
    title: 'Database Normalization & SQL Optimization',
    description: 'CS 3320 - Normal forms, query optimization techniques, and indexing strategies',
    status: 'COMPLETED',
    isFavorite: false,
    favoriteCount: 1,
    durationSeconds: 3612,
    uploadTimestamp: { seconds: now - oneDay * 2 },
    storageUrl: null,
    audioUrl: null,
    transcriptText: `Welcome to today's lecture on database normalization and SQL optimization. These are critical concepts for any software engineer working with relational databases.

Database normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. Let's walk through the normal forms.

First Normal Form, or 1NF, requires that each table cell contains a single value, and each record is unique. No repeating groups or arrays.

Second Normal Form builds on 1NF by requiring that all non-key attributes are fully dependent on the primary key. This eliminates partial dependencies.

Third Normal Form goes further - all attributes must depend only on the primary key, not on other non-key attributes. This eliminates transitive dependencies.

Now let's talk about SQL optimization. Query performance is crucial in production systems handling millions of requests.

Indexing is your first line of defense. B-tree indexes are the most common and work well for equality and range queries. Hash indexes are faster for equality comparisons but don't support range queries.

When writing queries, avoid SELECT * - only request the columns you need. Use JOINs instead of subqueries when possible, as the query optimizer can usually handle them better.

EXPLAIN ANALYZE is your best friend for understanding query performance. It shows you the execution plan and actual timing for each step.

Remember to consider the cardinality of your data when designing indexes. A column with only two unique values might not benefit from an index as much as one with thousands of unique values.`,
  },
  {
    id: 'rec-003',
    recordingId: 'rec-003',
    title: 'React Hooks & State Management Patterns',
    description: 'Web Development - Deep dive into useState, useEffect, useContext, and custom hooks',
    status: 'COMPLETED',
    isFavorite: true,
    favoriteCount: 5,
    durationSeconds: 2156,
    uploadTimestamp: { seconds: now - oneDay * 4 },
    storageUrl: null,
    audioUrl: null,
    transcriptText: `Today we're going to explore React Hooks in depth. Hooks were introduced in React 16.8 and they've fundamentally changed how we write React components.

The most basic hook is useState. It lets you add state to functional components. When you call useState, it returns an array with two elements: the current state value and a function to update it.

useEffect is used for side effects - things like data fetching, subscriptions, or manually changing the DOM. It runs after every render by default, but you can control when it runs by providing a dependency array.

useContext allows you to subscribe to React context without introducing nesting. Combined with useReducer, you can create a powerful state management solution without external libraries like Redux.

Custom hooks are where the real power lies. They let you extract component logic into reusable functions. The convention is to start their names with "use" so that React knows they follow the rules of hooks.

For state management at scale, consider patterns like the Context + Reducer pattern for moderate complexity, or libraries like Zustand or Jotai for more complex applications. Redux Toolkit has also simplified Redux significantly.`,
  },
  {
    id: 'rec-004',
    recordingId: 'rec-004',
    title: 'Operating Systems - Process Scheduling',
    description: 'CS 3502 - CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority Scheduling',
    status: 'COMPLETED',
    isFavorite: false,
    favoriteCount: 0,
    durationSeconds: 4023,
    uploadTimestamp: { seconds: now - oneWeek * 2 },
    storageUrl: null,
    audioUrl: null,
    transcriptText: `Let's continue our discussion of process scheduling in operating systems. The CPU scheduler is responsible for deciding which process in the ready queue gets to execute next.

First Come First Served is the simplest algorithm. Processes are executed in the order they arrive. While fair, it can lead to the convoy effect where short processes wait behind long ones.

Shortest Job First selects the process with the smallest execution time. It's optimal in terms of average waiting time but requires knowing the burst time in advance, which isn't always possible.

Round Robin assigns a fixed time quantum to each process. When a process's quantum expires, it goes to the back of the ready queue. This ensures fairness and is commonly used in time-sharing systems. The choice of quantum size is critical - too small causes excessive context switching, too large and it degenerates into FCFS.

Priority Scheduling assigns a priority to each process. The CPU is allocated to the process with the highest priority. The main issue is starvation - low priority processes may never execute. Aging is a technique to solve this by gradually increasing the priority of waiting processes.`,
  },
  {
    id: 'rec-005',
    recordingId: 'rec-005',
    title: 'Software Engineering - Agile Methodologies',
    description: 'SE 4485 - Scrum framework, sprint planning, and continuous integration practices',
    status: 'COMPLETED',
    isFavorite: false,
    favoriteCount: 2,
    durationSeconds: 1890,
    uploadTimestamp: { seconds: now - oneWeek * 3 },
    storageUrl: null,
    audioUrl: null,
    transcriptText: `Today we're covering Agile methodologies, specifically the Scrum framework that most companies use in practice.

Scrum is an iterative and incremental agile software development framework. The key roles are the Product Owner who represents stakeholders, the Scrum Master who facilitates the process, and the Development Team who does the actual work.

Work is organized into sprints, typically two to four weeks long. Each sprint begins with Sprint Planning where the team selects items from the product backlog to work on. Daily stand-ups keep everyone synchronized. At the end, Sprint Review demonstrates what was built, and Sprint Retrospective reflects on process improvements.

Continuous Integration is a practice where developers frequently merge their code changes into a shared repository. Each merge triggers an automated build and test suite, catching integration issues early. Tools like Jenkins, GitHub Actions, and GitLab CI make this straightforward to implement.`,
  },
];

export const DEMO_SUMMARIES = {
  'rec-001': {
    formattedSummaryText: `## Overview
This lecture provides a comprehensive introduction to machine learning, covering the three main paradigms: supervised learning, unsupervised learning, and reinforcement learning.

## Supervised Learning
The lecture explains how supervised learning uses **labeled training data** to learn mapping functions. Key algorithms discussed include:
- **Linear Regression** - Models relationships using linear equations to find the best-fitting line
- **Decision Trees** - Splits data into subsets based on feature values
- **Random Forests** - Ensemble method combining multiple decision trees
- **Neural Networks** - Layers of interconnected nodes inspired by biological systems

## Unsupervised Learning
Unsupervised learning works with **unlabeled data** to discover hidden patterns. The primary example given is **clustering** for customer segmentation.

## Reinforcement Learning
An agent learns through interaction with an environment, maximizing cumulative reward. **AlphaGo** is cited as a prominent example.

## Model Evaluation
Key metrics discussed:
- **Classification**: Accuracy, Precision, Recall, F1-Score
- **Regression**: Mean Squared Error, R-Squared

## Key Challenge: Overfitting
The lecture emphasizes the importance of avoiding overfitting through:
- Cross-validation
- Regularization
- Proper train-test splits`,
    keyPoints: [
      'Machine learning has three main types: supervised, unsupervised, and reinforcement learning',
      'Supervised learning requires labeled data; examples include linear regression, decision trees, and neural networks',
      'Unsupervised learning finds hidden patterns in unlabeled data through techniques like clustering',
      'Reinforcement learning uses reward-based training for sequential decision making',
      'Overfitting is a critical challenge - models may learn training data too well and fail on new data',
      'Cross-validation, regularization, and train-test splits help prevent overfitting',
      'Next class will cover practical implementation using Python scikit-learn',
    ],
    glossary: [
      { term: 'Supervised Learning', definition: 'ML paradigm where algorithms learn from labeled training data with known input-output pairs' },
      { term: 'Unsupervised Learning', definition: 'ML paradigm where algorithms find patterns in unlabeled data without predefined categories' },
      { term: 'Reinforcement Learning', definition: 'ML paradigm where an agent learns optimal actions through trial-and-error interaction with an environment' },
      { term: 'Overfitting', definition: 'When a model learns training data too well, capturing noise rather than patterns, leading to poor generalization' },
      { term: 'Cross-validation', definition: 'Technique for assessing model performance by partitioning data into training and validation subsets' },
      { term: 'Neural Network', definition: 'Computing system with interconnected nodes organized in layers, inspired by biological neural networks' },
      { term: 'Random Forest', definition: 'Ensemble learning method that creates multiple decision trees and merges their predictions' },
    ],
    topics: ['Machine Learning', 'Artificial Intelligence', 'Supervised Learning', 'Neural Networks', 'Data Science'],
  },
  'rec-002': {
    formattedSummaryText: `## Database Normalization
The lecture covers the systematic approach to organizing relational database tables to minimize redundancy.

### Normal Forms
- **1NF (First Normal Form)**: Each cell contains a single atomic value; all records are unique
- **2NF (Second Normal Form)**: Builds on 1NF; all non-key attributes fully depend on the primary key (no partial dependencies)
- **3NF (Third Normal Form)**: Builds on 2NF; no transitive dependencies between non-key attributes

## SQL Optimization Techniques

### Indexing Strategies
- **B-tree indexes**: Most common; effective for equality and range queries
- **Hash indexes**: Faster for equality comparisons but no range query support

### Query Optimization Best Practices
- Avoid \`SELECT *\` - request only needed columns
- Prefer JOINs over subqueries for better optimizer handling
- Use \`EXPLAIN ANALYZE\` to understand execution plans and timing
- Consider data cardinality when designing indexes`,
    keyPoints: [
      'Database normalization reduces redundancy and improves data integrity through progressive normal forms',
      '1NF requires atomic values and unique records; 2NF eliminates partial dependencies; 3NF eliminates transitive dependencies',
      'B-tree indexes are the most versatile, supporting both equality and range queries',
      'Always use EXPLAIN ANALYZE to understand and optimize query performance',
      'Avoid SELECT * in production queries - only fetch needed columns',
      'Column cardinality affects index effectiveness - high cardinality columns benefit more from indexing',
    ],
    glossary: [
      { term: 'Normalization', definition: 'Process of organizing database tables to reduce data redundancy and improve data integrity' },
      { term: 'Cardinality', definition: 'The number of unique values in a database column, affecting index performance' },
      { term: 'B-tree Index', definition: 'Self-balancing tree data structure that maintains sorted data for efficient insertion, deletion, and search' },
      { term: 'Transitive Dependency', definition: 'When a non-key attribute depends on another non-key attribute rather than the primary key' },
      { term: 'EXPLAIN ANALYZE', definition: 'SQL command that shows the execution plan and actual performance metrics of a query' },
    ],
    topics: ['Database Design', 'SQL', 'Query Optimization', 'Indexing', 'Data Engineering'],
  },
  'rec-003': {
    formattedSummaryText: `## React Hooks Deep Dive

### Core Hooks
- **useState**: Adds state to functional components, returns current value and setter function
- **useEffect**: Handles side effects (data fetching, subscriptions, DOM manipulation); controlled via dependency array
- **useContext**: Subscribes to React context without nesting; pairs well with useReducer

### Custom Hooks
Custom hooks extract reusable component logic into standalone functions. Convention requires names starting with "use" to follow React's rules of hooks.

### State Management Patterns at Scale
| Complexity | Recommended Approach |
|-----------|---------------------|
| Simple | useState + prop drilling |
| Moderate | Context + useReducer |
| Complex | Zustand, Jotai, or Redux Toolkit |`,
    keyPoints: [
      'React Hooks (introduced in 16.8) fundamentally changed component development patterns',
      'useState returns a state value and setter function as an array',
      'useEffect handles side effects with optional dependency array for execution control',
      'useContext + useReducer creates a powerful state management solution without external libraries',
      'Custom hooks enable extraction of reusable logic with the "use" naming convention',
      'For complex state: consider Zustand, Jotai, or Redux Toolkit over raw Context',
    ],
    glossary: [
      { term: 'React Hook', definition: 'Function that lets you use React state and lifecycle features in functional components' },
      { term: 'Side Effect', definition: 'Operations like data fetching or DOM manipulation that happen outside the normal component render flow' },
      { term: 'Dependency Array', definition: 'Array passed to useEffect that controls when the effect re-runs based on value changes' },
      { term: 'Custom Hook', definition: 'Reusable function prefixed with "use" that encapsulates component logic using other hooks' },
    ],
    topics: ['React', 'Frontend Development', 'JavaScript', 'State Management', 'Web Development'],
  },
  'rec-004': {
    formattedSummaryText: `## CPU Scheduling Algorithms

### First Come First Served (FCFS)
Simplest scheduling algorithm - processes execute in arrival order. **Drawback**: convoy effect where short processes wait behind long ones.

### Shortest Job First (SJF)
Selects process with smallest execution time. **Optimal** for average waiting time but requires advance knowledge of burst times.

### Round Robin (RR)
Assigns fixed **time quantum** to each process. Key considerations:
- Too small quantum = excessive context switching overhead
- Too large quantum = degenerates into FCFS
- Commonly used in time-sharing systems

### Priority Scheduling
CPU allocated to highest-priority process. **Starvation** is the main risk - solved by **aging** technique that gradually increases waiting process priority.`,
    keyPoints: [
      'FCFS is simplest but suffers from the convoy effect',
      'SJF is optimal for average waiting time but impractical without burst time knowledge',
      'Round Robin ensures fairness through fixed time quantum allocation',
      'Time quantum size in Round Robin critically affects performance',
      'Priority Scheduling can cause starvation; aging solves this',
    ],
    glossary: [
      { term: 'Convoy Effect', definition: 'When short processes are delayed by a long-running process ahead in the queue' },
      { term: 'Time Quantum', definition: 'Fixed time slice allocated to each process in Round Robin scheduling' },
      { term: 'Starvation', definition: 'When a process indefinitely waits for CPU time due to lower priority' },
      { term: 'Aging', definition: 'Technique that gradually increases process priority over time to prevent starvation' },
      { term: 'Context Switch', definition: 'The process of saving and restoring state when the CPU switches between processes' },
    ],
    topics: ['Operating Systems', 'CPU Scheduling', 'Process Management', 'Systems Programming'],
  },
  'rec-005': {
    formattedSummaryText: `## Agile & Scrum Framework

### Key Scrum Roles
- **Product Owner**: Represents stakeholders, manages product backlog
- **Scrum Master**: Facilitates the Scrum process, removes impediments
- **Development Team**: Cross-functional team that delivers the work

### Sprint Ceremonies
1. **Sprint Planning**: Team selects backlog items for the sprint
2. **Daily Stand-up**: Short sync meeting for team coordination
3. **Sprint Review**: Demonstrates completed work to stakeholders
4. **Sprint Retrospective**: Team reflects on process improvements

### Continuous Integration
Developers frequently merge code to a shared repository with automated builds and tests. Tools: Jenkins, GitHub Actions, GitLab CI.`,
    keyPoints: [
      'Scrum has three key roles: Product Owner, Scrum Master, and Development Team',
      'Sprints are typically 2-4 weeks long with defined ceremonies',
      'CI ensures early detection of integration issues through automated builds and tests',
      'Sprint Retrospectives drive continuous process improvement',
    ],
    glossary: [
      { term: 'Sprint', definition: 'Time-boxed iteration (typically 2-4 weeks) in which a set of work is completed' },
      { term: 'Product Backlog', definition: 'Prioritized list of features, enhancements, and fixes that constitute the project roadmap' },
      { term: 'Continuous Integration', definition: 'Practice of frequently merging code changes with automated build and test verification' },
      { term: 'Retrospective', definition: 'Sprint ceremony where the team reflects on what went well and what to improve' },
    ],
    topics: ['Software Engineering', 'Agile', 'Scrum', 'DevOps', 'Project Management'],
  },
};

export const DEMO_RECOMMENDATIONS = {
  'rec-001': [
    { videoId: 'ukzFI9rgwfU', title: 'Machine Learning for Beginners - Full Course', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/ukzFI9rgwfU/hqdefault.jpg' },
    { videoId: 'i_LwzRVP7bg', title: 'Machine Learning in 100 Seconds', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/i_LwzRVP7bg/hqdefault.jpg' },
    { videoId: 'GwIo3gDZCVQ', title: 'Neural Networks Explained', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/GwIo3gDZCVQ/hqdefault.jpg' },
    { videoId: 'aircAruvnKk', title: 'But what is a neural network? - 3Blue1Brown', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg' },
  ],
  'rec-002': [
    { videoId: 'UrYLYV7WSHM', title: 'Database Normalization - 1NF, 2NF, 3NF', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/UrYLYV7WSHM/hqdefault.jpg' },
    { videoId: 'HXV3zeQKqGY', title: 'SQL Tutorial - Full Database Course', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/HXV3zeQKqGY/hqdefault.jpg' },
    { videoId: 'BHwzDmr6d7s', title: 'SQL Query Optimization Tips', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/BHwzDmr6d7s/hqdefault.jpg' },
  ],
  'rec-003': [
    { videoId: 'TNhaISOUy6Q', title: 'React Hooks Tutorial - Full Course', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/TNhaISOUy6Q/hqdefault.jpg' },
    { videoId: 'O6P86uwfdR0', title: 'useState vs useReducer', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/O6P86uwfdR0/hqdefault.jpg' },
    { videoId: 'dpw9EHDh2bM', title: 'React State Management - Context API', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/dpw9EHDh2bM/hqdefault.jpg' },
  ],
  'rec-004': [
    { videoId: 'EWkQl0n0w5M', title: 'CPU Scheduling Algorithms Explained', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/EWkQl0n0w5M/hqdefault.jpg' },
    { videoId: '2h3eWaPx8SA', title: 'Operating Systems: Process Scheduling', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/2h3eWaPx8SA/hqdefault.jpg' },
  ],
  'rec-005': [
    { videoId: 'SWfq3dyx_NA', title: 'Agile Scrum in 10 Minutes', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/SWfq3dyx_NA/hqdefault.jpg' },
    { videoId: '9TycLR0TqFA', title: 'What is CI/CD?', thumbnailUrl: null, fallbackThumbnailUrl: 'https://i.ytimg.com/vi/9TycLR0TqFA/hqdefault.jpg' },
  ],
};

export const DEMO_NOTES = {
  'rec-001': [
    { id: 'note-001', recordingId: 'rec-001', content: '## My ML Notes\n\n- Remember: supervised = labeled data, unsupervised = unlabeled\n- **Overfitting** is the #1 pitfall - always use train/test split\n- Look into scikit-learn for next class\n- Random Forest = many decision trees combined\n\n### TODO\n- [ ] Read chapters 3 & 4\n- [ ] Set up Python environment with scikit-learn\n- [ ] Practice with Kaggle datasets', tags: ['ml', 'study'] },
  ],
  'rec-002': [],
  'rec-003': [
    { id: 'note-003', recordingId: 'rec-003', content: '## React Hooks Cheat Sheet\n\n```jsx\nconst [value, setValue] = useState(initialValue);\n\nuseEffect(() => {\n  // side effect\n  return () => cleanup();\n}, [dependencies]);\n```\n\n- Custom hooks must start with `use`\n- Context + useReducer = poor man\'s Redux\n- Check out Zustand for next project', tags: ['react', 'frontend'] },
  ],
  'rec-004': [],
  'rec-005': [],
};

export const DEMO_ADMIN_USERS = [
  { uid: 'demo-user-001', email: 'alex.rivera@demo.audioscholar.com', firstName: 'Alex', lastName: 'Rivera', roles: ['ROLE_USER', 'ROLE_PREMIUM', 'ROLE_ADMIN'], disabled: false, createdAt: '2024-06-15' },
  { uid: 'demo-user-002', email: 'maria.santos@demo.edu', firstName: 'Maria', lastName: 'Santos', roles: ['ROLE_USER', 'ROLE_PREMIUM'], disabled: false, createdAt: '2024-07-20' },
  { uid: 'demo-user-003', email: 'john.doe@demo.edu', firstName: 'John', lastName: 'Doe', roles: ['ROLE_USER'], disabled: false, createdAt: '2024-08-10' },
  { uid: 'demo-user-004', email: 'sarah.chen@demo.edu', firstName: 'Sarah', lastName: 'Chen', roles: ['ROLE_USER', 'ROLE_PREMIUM'], disabled: false, createdAt: '2024-09-01' },
  { uid: 'demo-user-005', email: 'james.wilson@demo.edu', firstName: 'James', lastName: 'Wilson', roles: ['ROLE_USER'], disabled: true, createdAt: '2024-09-15' },
  { uid: 'demo-user-006', email: 'emma.k@demo.edu', firstName: 'Emma', lastName: 'Kim', roles: ['ROLE_USER'], disabled: false, createdAt: '2024-10-01' },
  { uid: 'demo-user-007', email: 'liam.patel@demo.edu', firstName: 'Liam', lastName: 'Patel', roles: ['ROLE_USER', 'ROLE_PREMIUM'], disabled: false, createdAt: '2024-10-20' },
  { uid: 'demo-user-008', email: 'olivia.jones@demo.edu', firstName: 'Olivia', lastName: 'Jones', roles: ['ROLE_USER'], disabled: false, createdAt: '2024-11-05' },
];

export const DEMO_ADMIN_OVERVIEW = {
  totalUsers: 247,
  totalRecordings: 1832,
  totalAudioDurationMinutes: 28450,
  totalStorageUsedMB: 14200,
  activeUsersLast7Days: 89,
  newUsersLast30Days: 34,
};

export const DEMO_ADMIN_ACTIVITY = {
  uploadsPerDay: [
    { date: '2024-11-01', count: 12 },
    { date: '2024-11-02', count: 18 },
    { date: '2024-11-03', count: 8 },
    { date: '2024-11-04', count: 22 },
    { date: '2024-11-05', count: 15 },
    { date: '2024-11-06', count: 28 },
    { date: '2024-11-07', count: 19 },
  ],
  averageProcessingTimeSeconds: 145,
  successRate: 94.2,
};

export const DEMO_ADMIN_USER_DISTRIBUTION = {
  free: 178,
  premium: 69,
  admin: 3,
};

export const DEMO_ADMIN_CONTENT_ENGAGEMENT = {
  averageFavoritesPerRecording: 2.3,
  averageNotesPerRecording: 1.7,
  mostPopularTopics: ['Machine Learning', 'Web Development', 'Data Structures', 'Operating Systems', 'Software Engineering'],
  totalNotesCreated: 3114,
};
