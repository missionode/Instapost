# Implementation Plan - Wardrobe Override Risk Mitigation

This plan outlines the steps to harden the prompt generation engine against "wardrobe override" risks, ensuring 1:1 visual fidelity for garment references across all styles.

## Phase 1: Test Preparation & Core Logic [checkpoint: ]
- [ ] Task: Write failing tests for Wardrobe Lock integration in `engine.test.js`
    - [ ] Test that `GLOBAL_RENDER_PRIORITY` is present and prioritized.
    - [ ] Test that `WARDROBE_LOCK` contains the correct `dress_reference` and hard constraints.
    - [ ] Test that `wardrobe_source` uses the "EXACT GARMENT LOCK" language.
    - [ ] Test that `visual_elements` includes `garment_focus`.
    - [ ] Test that `finish` includes `anti_drift_rules`.
- [ ] Task: Implement Global Priority and Wardrobe Lock blocks (Step 1)
- [ ] Task: Update Model Direction with "EXACT GARMENT LOCK" (Step 2)
- [ ] Task: Integrate Negative Guardrails into the `finish` section (Step 3)
- [ ] Task: Add Visual Anchoring to `visual_elements` (Step 4)
- [ ] Task: Verify that all tests pass and coverage is maintained (>80%)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test Preparation & Core Logic' (Protocol in workflow.md)

## Phase 2: Refinement & Regression Testing [checkpoint: ]
- [ ] Task: Verify `festive_mode` still correctly prioritizes thematic attire over manual reference
- [ ] Task: Verify all existing style templates (Indian, Royal, etc.) correctly inherit the lock logic
- [ ] Task: Final end-to-end verification of the generated JSON structure
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Refinement & Regression Testing' (Protocol in workflow.md)
