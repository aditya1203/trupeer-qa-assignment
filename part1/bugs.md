# Trupeer – Exploratory Testing Bug Report

## Test Environment

- Application: Trupeer
- Browser: Google Chrome 151.x
- Operating System: Windows 11
- Testing Type: Exploratory Testing
- Tester: Aditya Gupta

---

# BUG-001 – "Add Scenes" Control Is Not Clickable

### Severity
Medium

### Description

The "Add scenes" control displayed at the bottom of the video editor
is visible to the user, but clicking the control does not open the
scene-selection or add-scene interface.

### Steps to Reproduce

1. Log in to Trupeer.
2. Open an existing video containing a transcript/script.
3. Navigate to the video editor.
4. Locate the "Add scenes" control displayed below the video/editor.
5. Click the "+" icon.
6. Click the "Add scenes" text.
7. Observe the application behavior.

### Expected Behavior

Clicking "Add scenes" should open the interface or controls required
to add a new scene to the video.

### Actual Behavior

The "Add scenes" control is visible, but clicking the "+" icon or
"Add scenes" text does not trigger any visible action.

### Impact

Users cannot add additional scenes through the visible "Add scenes"
control, which limits the video editing workflow.

### Environment

- Browser: Google Chrome 151.x
- OS: Windows 11

---

# BUG-002 – Nonsensical AI Prompt Does Not Provide User Feedback

### Severity
Medium

### Description

When a meaningless prompt such as `ABCD Q 123` is submitted to
"Modify Script with AI", the application returns the original script
without providing feedback that the prompt could not be interpreted.

### Steps to Reproduce

1. Log in to Trupeer.
2. Open an existing video containing a transcript/script.
3. Navigate to the Script section.
4. Open "Modify Script with AI".
5. Enter a meaningless prompt such as `ABCD Q 123`.
6. Submit the prompt.
7. Observe the generated script and UI feedback.

### Expected Behavior

The application should provide meaningful feedback when the submitted
prompt cannot be interpreted.

For example, it could:

- Inform the user that the prompt is not actionable, or
- Ask the user to provide a valid modification instruction.

### Actual Behavior

The request is processed, but the resulting script is effectively
unchanged from the original script and no validation or explanatory
feedback is presented to the user.

### Impact

The user cannot determine whether the prompt was rejected, ignored,
or successfully processed.

### Environment

- Browser: Google Chrome 151.x
- OS: Windows 11

---

# BUG-003 – Empty AI Prompt Can Be Submitted

### Severity
Medium

### Description

The "Modify Script with AI" workflow allows the user to submit an
empty prompt. Instead of preventing the submission, the application
processes the request and produces modified script content.

### Steps to Reproduce

1. Log in to Trupeer.
2. Open an existing video containing a transcript/script.
3. Navigate to the Script section.
4. Open "Modify Script with AI".
5. Leave the prompt field completely empty.
6. Submit the request.
7. Observe the resulting script.

### Expected Behavior

The application should validate the prompt before submission and
prevent an empty request.

For example, it could display:

> "Please enter a prompt."

### Actual Behavior

The empty prompt is accepted and the application generates script
content despite the absence of a user instruction.

### Impact

Users can unintentionally trigger an AI script modification without
providing an instruction. This may also consume AI processing or
usage unnecessarily.

### Environment

- Browser: Google Chrome 151.x
- OS: Windows 11

---

## Additional Exploratory Testing

The following scenarios were also tested and behaved as expected:

| Scenario | Result |
|---|---|
| 300-word AI prompt | Accepted |
| 301-word AI prompt | Rejected |
| Revert AI script changes | Working as expected |
| AI script modification with valid prompt | Working as expected |
| Background change | Working as expected |

No additional reproducible functional defects were identified during
the exploratory testing session.