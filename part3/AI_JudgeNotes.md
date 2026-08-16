

# LLM Judge Strategy

## CI Confidence Threshold

I would initially use a confidence threshold of 0.90 before
allowing the LLM judge to gate CI.

A score >= 0.90 indicates that the evaluator has high confidence
in its assessment. However, confidence alone would not determine
the result. All mandatory criteria must also pass.

For example:

- Confidence >= 0.90 + all criteria pass → PASS
- Confidence < 0.90 → REVIEW
- Any critical criterion fails → FAIL

I would initially use the LLM judge as a quality gate with a
review state rather than treating every low-confidence result
as an automatic failure.

## Human vs LLM Disagreement

The LLM judge should not be treated as an absolute source of truth.
If a human reviewer disagrees with the LLM evaluation, the human
decision should take precedence.

The disagreement should be recorded along with the original script,
prompt, AI output, LLM evaluation, and human decision.

Repeated disagreements should be analyzed to improve the evaluation
rubric or prompts. For example, if the LLM consistently marks valid
translations as failing the "meaningful change" criterion, the
rubric should be updated to make the expected transformation
prompt-specific.

The goal is to use the LLM as an automated semantic evaluator,
while retaining human review for ambiguous or low-confidence cases.