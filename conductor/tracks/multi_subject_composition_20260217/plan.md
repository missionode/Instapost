# Implementation Plan - Multi-Subject Composition System

This plan outlines the steps to implement a multi-subject layout system, allowing for group compositions and category-specific (Men, Women, Kids) garment mapping.

## Phase 1: Engine Logic & Group Mode [checkpoint: ]
- [ ] Task: Create failing tests for multi-subject and group mode logic in `tests/engine_subjects.test.js`.
- [ ] Task: Update `engine.js` to detect "Group Mode" based on categories or multiple URLs.
- [ ] Task: Modify `deriveGridStrategy` to expand the Hero block to 3 columns when in Group Mode.
- [ ] Task: Implement category-specific attire directives (Men/Women/Kids) in the prompt engine.
- [ ] Task: Verify that all tests pass and coverage is maintained (>80%).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Engine Logic & Group Mode' (Protocol in workflow.md)

## Phase 2: UI Integration & Persistence [checkpoint: ]
- [ ] Task: Add gender/category checkboxes to the "Festive" and "Artisan" sections in `index.html`.
- [ ] Task: Update `main.js` to capture checkbox states and handle comma-separated URL parsing.
- [ ] Task: Ensure `localStorage` correctly persists the new category selections.
- [ ] Task: Final end-to-end verification of the group composition blueprint output.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Integration & Persistence' (Protocol in workflow.md)
