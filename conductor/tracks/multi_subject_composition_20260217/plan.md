# Implementation Plan - Multi-Subject Composition System

This plan outlines the steps to implement a multi-subject layout system, allowing for group compositions and category-specific (Men, Women, Kids) garment mapping.

## Phase 1: Engine Logic & Group Mode [checkpoint: ]
- [x] Task: Create failing tests for multi-subject and group mode logic in `tests/engine_subjects.test.js`. (62149e3)
- [x] Task: Update `engine.js` to detect "Group Mode" based on categories or multiple URLs. (62149e3)
- [x] Task: Modify `deriveGridStrategy` to expand the Hero block to 3 columns when in Group Mode. (62149e3)
- [x] Task: Implement category-specific attire directives (Men/Women/Kids) in the prompt engine. (62149e3)
- [x] Task: Verify that all tests pass and coverage is maintained (>80%). (62149e3)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Engine Logic & Group Mode' (Protocol in workflow.md)

## Phase 2: UI Integration & Persistence [checkpoint: ]
- [x] Task: Add gender/category checkboxes to the "Festive" and "Artisan" sections in `index.html`. (dbc78ed)
- [x] Task: Update `main.js` to capture checkbox states and handle comma-separated URL parsing. (dbc78ed)
- [x] Task: Ensure `localStorage` correctly persists the new category selections. (dbc78ed)
- [x] Task: Final end-to-end verification of the group composition blueprint output. (dbc78ed)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI Integration & Persistence' (Protocol in workflow.md)

## Phase 3: UI Refinement - Artisan Collection Builder [checkpoint: ]
- [x] Task: Implement dynamic row system in Artisan Mode (URL + Subject Select). (b1ee8b4)
- [x] Task: Add "Add Another Model" and "Remove" buttons for the Artisan list. (b1ee8b4)
- [x] Task: Update `main.js` to gather Artisan data as an array of objects `{url, subject}`. (b1ee8b4)
- [x] Task: Update `engine.js` to parse this structured collection data for mapping and group mode detection. (b1ee8b4)
- [x] Task: Final end-to-end verification of the "Collection Mapping" workflow. (b1ee8b4)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Collection Builder' (Protocol in workflow.md)
