# Trupeer QA Engineer Assignment

End-to-end QA automation project for testing the Trupeer application using
Playwright and AI-augmented testing with an LLM-based evaluation layer.

---

## Project Overview

This repository contains the implementation for all three parts of the
Trupeer QA Engineer assignment:

- **Part 1** – Exploratory Testing & Bug Reporting
- **Part 2** – E2E Test Automation using Playwright
- **Part 3** – AI-Augmented Testing using an LLM as a test oracle

The project demonstrates both traditional deterministic UI automation and
semantic validation of non-deterministic AI-generated content.

---

## Project Structure

```text
trupeer-qa-assignment/
│
├── part1/
│   └── bugs.md
│
├── part2/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── Dashboard.js
│   │   └── EditorPage.js
│   │
│   ├── tests/
│   │   ├── Login.spec.js
│   │   ├── Dashboard.spec.js
│   │   ├── EditorPage.spec.js
│   │   ├── EditorBackgroundChange.spec.js
│   │   └── EditorNegative.spec.js
│   │
│   └── README.md
│
├── part3/
│   ├── services/
│   │   └── LLMJudge.js
│   │
│   ├── tests/
│   │   └── AIRewriteJudge.spec.js
│   │
│   ├── test-judge.js
│   ├── ai-evaluation-report.json
│   └── README.md
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md



Prerequisites

Make sure the following are installed:

Node.js
npm
Playwright
A Trupeer account
A Trupeer video containing a generated transcript/script
A Groq API key for Part 3
Installation

Clone the repository and install the project dependencies:

npm install

Install the Playwright browsers:

npx playwright install
Environment Variables

Create a .env file in the project root:

TRUPEER_EMAIL=your-trupeer-email
TRUPEER_PASSWORD=your-trupeer-password
GROQ_API_KEY=your-groq-api-key

Credentials and API keys are read from environment variables and are not
hardcoded in the tests.

The .env file should not be committed to the repository.

Part 1 – Exploratory Testing

Part 1 contains exploratory testing results and identified defects.

Location:

part1/bugs.md

The bug report includes:

Steps to reproduce
Expected behavior
Actual behavior
Severity
Browser and operating system information
Part 2 – E2E Test Automation

Part 2 uses Playwright and the Page Object Model to automate key Trupeer
workflows.

Detailed documentation:

part2/README.md

Coverage includes:

Login
Dashboard navigation
Editor loading
AI script modification
Background change
Negative AI prompt testing
Part 3 – AI-Augmented Testing

Part 3 integrates an LLM into the test infrastructure to evaluate
non-deterministic AI-generated scripts.

The test sends the following to the LLM judge:

Original script
User prompt
AI-generated script

The LLM evaluates the generated script using a structured QA rubric.

Detailed documentation:

part3/README.md

The evaluation covers:

Intent match
Coherence and grammar
Information preservation
Meaningful change

The evaluation produces structured JSON containing:

Per-criterion pass/fail
Confidence score
Evaluation summary
Overall result
Running the Project
Install dependencies
npm install
Install Playwright browsers
npx playwright install
Run all Playwright tests
npx playwright test
Run tests with browser visible
npx playwright test --headed
Run Part 2
npx playwright test part2/tests
Run Part 3
npm run validate
List available tests
npx playwright test --list
View Playwright HTML report
npx playwright show-report
Reports
Playwright HTML Report

Playwright generates an HTML report containing:

Test results
Assertions
Execution details
Screenshots for failures
Videos for failures
Trace information

Open it with:

npx playwright show-report
AI Evaluation Report

Part 3 generates:

part3/ai-evaluation-report.json

The report contains:

Execution timestamp
Total prompts
Passed prompts
Failed prompts
Overall result
Overall confidence
Per-prompt evaluation
Per-criterion results
LLM evaluation summary
Known Test Environment Considerations

The tests use a shared Trupeer account and an existing video containing
a generated transcript/script.

The Trupeer editor is stateful, and multiple tests may modify the same
video.

As a result, state-changing tests may affect subsequent tests when the
entire suite is executed together.

Individual tests may therefore be more reliable when executed independently.

This is a test-data/state-isolation consideration rather than a
Playwright synchronization issue.

CI Gating Consideration

The LLM judge should not be treated as an absolute source of truth.

A potential CI gating strategy would require:

overallPass = true
Confidence >= 0.90
All critical evaluation criteria = true

Lower-confidence results can be reported as warnings or routed for human
review.

If the LLM judge disagrees with a human reviewer, the human review should
take precedence.

Such disagreements can be recorded and used to improve the evaluation
rubric, prompts, confidence thresholds, and CI gating strategy.

Technologies Used
JavaScript
Node.js
Playwright
Page Object Model
Groq API
LLM-based semantic evaluation
dotenv
JSON reporting
Documentation

Detailed documentation is available in:

part2/README.md
part3/README.md
Author

Aditya Gupta