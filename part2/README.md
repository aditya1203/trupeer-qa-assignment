# Part 2 – E2E Test Automation

Playwright-based end-to-end automation for the Trupeer application.

The tests use the **Page Object Model (POM)** to separate page interactions
and selectors from test logic.

---

## Test Coverage

### 1. Login

Verifies that a valid user can:

- Open Trupeer
- Navigate to the login page
- Enter valid credentials
- Log in successfully
- Reach the dashboard

Test:

```text
tests/Login.spec.js

2. Dashboard Navigation

Verifies that the user can open an existing video from the dashboard.

Test:

tests/Dashboard.spec.js
3. Editor Loading and AI Script Modification

Verifies that:

The video editor loads successfully
Script, Music, and Visuals tabs are available
The script panel is displayed
The preview canvas is available
The AI script modification feature can be opened
A prompt can be submitted
Trupeer generates a modified script
The generated script is displayed
The generated script differs from the original script

Test:

tests/EditorPage.spec.js
4. Background Change

Verifies that changing the editor background produces a visual change
in the preview canvas.

The test captures the canvas before and after the background change and
compares the resulting screenshots.

Test:

tests/EditorBackgroundChange.spec.js
5. Negative AI Prompt

Verifies the behavior of the AI script modification feature when a
meaningless or nonsensical prompt is submitted.

The test captures the original script and verifies that the application
does not incorrectly treat an invalid prompt as a meaningful modification.

Test:

tests/EditorNegative.spec.js
Page Object Model

The project uses three page objects:

pages/
│
├── LoginPage.js
├── Dashboard.js
└── EditorPage.js
LoginPage

Contains:

Login navigation
Email input
Password input
Login action
Popup handling
DashboardPage

Contains:

Video selection
Dashboard navigation
EditorPage

Contains:

Editor verification
Script extraction
AI script modification
Keep changes
Revert script
Discard changes
Preview canvas

Test Design

The test logic is separated from page-specific selectors and interactions.

Test
 │
 ├── LoginPage
 │
 ├── DashboardPage
 │
 └── EditorPage

This improves:

Maintainability
Reusability
Readability
Selector management
Separation of concerns
Assertions

Deterministic behavior is validated using Playwright assertions.

For example:

expect(modifiedScript).not.toBe(originalScript);

The test verifies that the AI modification actually changes the script
rather than expecting one specific generated string.

Running Part 2

From the project root:

Install dependencies
npm install
Install Playwright browsers
npx playwright install


Run all Part 2 tests
npx playwright test part2/tests
Run with browser visible
npx playwright test part2/tests --headed
Run a specific test
npx playwright test part2/tests/Login.spec.js

Example:

npx playwright test part2/tests/EditorPage.spec.js --headed
List tests
npx playwright test --list
View HTML report
npx playwright show-report
Environment Variables

Create a .env file in the project root:

TRUPEER_EMAIL=your-trupeer-email
TRUPEER_PASSWORD=your-trupeer-password

Credentials are read from environment variables and are not hardcoded
in the test files.

Test Data and State Consideration

The tests use a shared Trupeer account and an existing video containing
a generated transcript/script.

The editor is stateful, and tests that modify the same video can affect
the state seen by subsequent tests.

For this reason, individual tests may be more reliable when executed
independently.

In a production automation framework, test-data isolation or dedicated
test videos would be preferred.

Configuration

Playwright configuration is maintained in:

playwright.config.js

The configuration controls:

Test directory
Global timeout
Expect timeout
Browser behavior
Viewport
Screenshots
Videos
Traces
HTML reporting