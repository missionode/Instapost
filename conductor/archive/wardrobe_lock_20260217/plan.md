# Implementation Plan - Wardrobe Override Risk Mitigation

This plan outlines the steps to harden the prompt generation engine against "wardrobe override" risks, ensuring 1:1 visual fidelity for garment references across all styles.

## Phase 1: Test Preparation & Core Logic [checkpoint: ]
- [x] Task: Write failing tests for Wardrobe Lock integration in `engine.test.js`
- [x] Task: Implement Global Priority and Wardrobe Lock blocks (Step 1) (4ad836c)
- [x] Task: Update Model Direction with "EXACT GARMENT LOCK" (Step 2) (4ad836c)
- [x] Task: Integrate Negative Guardrails into the `finish` section (Step 3) (4ad836c)
- [x] Task: Add Visual Anchoring to `visual_elements` (Step 4) (4ad836c)
- [x] Task: Verify that all tests pass and coverage is maintained (>80%) (4ad836c)
- [x] Task: Refine Wardrobe Lock failure condition to be more descriptive (4ad836c)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test Preparation & Core Logic' (Protocol in workflow.md)

## Phase 2: Refinement & Regression Testing [checkpoint: ]
- [ ] Task: Verify `festive_mode` still correctly prioritizes thematic attire over manual reference
- [ ] Task: Verify all existing style templates (Indian, Royal, etc.) correctly inherit the lock logic
- [ ] Task: Final end-to-end verification of the generated JSON structure
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Refinement & Regression Testing' (Protocol in workflow.md)

## Phase 3: Wardrobe Lock V2 - Realistic High-Fidelity [checkpoint: ]
- [x] Task: Update `engine.js` to replace "Pixel-level fidelity" with "Strict Visual Consistency" (4ad836c)
- [x] Task: Implement "Attribute Anchoring" (explicitly listing Color, Silhouette, and Pattern preservation) (4ad836c)
- [x] Task: Strengthen `garment_focus` to explicitly override scene effects (like curtain reveal) on the garment area (4ad836c)
- [x] Task: Update failure condition to reflect "Visual Identity" rather than "Pixel-Perfect" match (4ad836c)
- [x] Task: Verify V2 prompt structure with new tests in `engine.test.js` (4ad836c)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Wardrobe Lock V2' (Protocol in workflow.md)
