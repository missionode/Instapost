# Specification - Wardrobe Override Risk Mitigation

## Overview
This track aims to fix the "wardrobe override risk" where AI image generators sometimes re-interpret or change the dress from the reference image due to competing style pressures (cinematic lighting, fabric effects, etc.). We will implement a multi-layered "Wardrobe Lock" strategy across all prompt styles.

## Functional Requirements

### 1. Global Priority & Wardrobe Lock (Step 1)
- Inject a `GLOBAL_RENDER_PRIORITY` block immediately after `creative_type` to establish `WARDROBE_FIDELITY` as the highest priority.
- Inject a `WARDROBE_LOCK` block containing strict visual fidelity rules, negative constraints (no color/fabric/pattern changes), and a failure condition.
- The `WARDROBE_LOCK` must dynamically include the `dress_reference` URL provided by the user.

### 2. Model Direction Hardening (Step 2)
- Update the `wardrobe_source` field within the `model_direction` section.
- Replace the existing text with "EXACT GARMENT LOCK" language, emphasizing pixel-level fidelity and overriding all other aesthetic instructions.

### 3. Visual Anchoring (Step 4)
- Append a `garment_focus` directive to the `visual_elements` section.
- This ensures the dress remains unobstructed by effects like the "curtain reveal" or foreground overlays.

### 4. Negative Guardrails (Step 3)
- Add an `anti_drift_rules` array to the `finish` section of the JSON prompt.
- Explicitly prohibit redesigning, restyling, or substituting the garment.

### 5. Conditional Logic Preservation
- These "Lock" features should apply to all styles when a `dress_reference` is provided.
- Maintain the existing exception for `festive_mode`, where thematic consistency is prioritized over the manual reference.

## Non-Functional Requirements
- **JSON Validity**: The generated prompt must remain a valid, parseable JSON structure.
- **Style Agnostic**: The hardening logic must be integrated into the core `generatePromptText` logic so it automatically applies to all templates (Luxury, Indian Traditional, Royal Heritage, etc.).

## Acceptance Criteria
- [ ] The generated prompt JSON contains the `GLOBAL_RENDER_PRIORITY` and `WARDROBE_LOCK` blocks.
- [ ] The `wardrobe_source` contains the "EXACT GARMENT LOCK" string.
- [ ] The `visual_elements` section includes `garment_focus`.
- [ ] The `finish` section includes `anti_drift_rules`.
- [ ] All existing tests in `tests/engine.test.js` pass, and new tests verify the presence of the lock logic.
