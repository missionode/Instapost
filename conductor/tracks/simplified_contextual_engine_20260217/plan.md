# Implementation Plan - Simplified Contextual Engine

This plan refactors the prompt engine to a context-aware "Blueprint" system, removing rigid templates and prioritizing semantic content and reference images.

## Phase 1: Engine Refactoring [checkpoint: ]
- [ ] Task: Remove `styleTemplates` and refactor `engine.js` to use a dynamic `deriveContextualAesthetic` function.
- [ ] Task: Implement the "Contextual Hierarchy" (Festive > Reference > Content > Default).
- [ ] Task: Implement "Blueprint" prompt generation (Switching from hardcoded values to semantic descriptors).
- [ ] Task: Ensure "Wardrobe Lock" logic remains but is adapted to the new Blueprint structure.
- [ ] Task: Write tests in `engine.test.js` to verify aesthetic derivation from various inputs (e.g., Festival only, Content only).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Engine Refactoring' (Protocol in workflow.md)

## Phase 2: UI & Integration [checkpoint: ]
- [ ] Task: Update `index.html` to remove or hide the "Design Style" dropdown.
- [ ] Task: Update `main.js` to handle the removal of the style field.
- [ ] Task: Verify that `localStorage` still works for the remaining fields.
- [ ] Task: Final end-to-end verification of prompt quality and 1:1 garment fidelity (V2 language).
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI & Integration' (Protocol in workflow.md)
