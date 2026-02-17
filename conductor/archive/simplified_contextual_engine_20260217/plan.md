# Implementation Plan - Simplified Contextual Engine

This plan refactors the prompt engine to a context-aware "Blueprint" system, removing rigid templates and prioritizing semantic content and reference images.

## Phase 1: Engine Refactoring [checkpoint: ]
- [x] Task: Remove `styleTemplates` and refactor `engine.js` to use a dynamic `deriveContextualAesthetic` function. (a26137b)
- [x] Task: Implement the "Contextual Hierarchy" (Festive > Reference > Content > Default). (a26137b)
- [x] Task: Implement "Blueprint" prompt generation (Switching from hardcoded values to semantic descriptors). (a26137b)
- [x] Task: Ensure "Wardrobe Lock" logic remains but is adapted to the new Blueprint structure. (a26137b)
- [x] Task: Write tests in `engine.test.js` to verify aesthetic derivation from various inputs (e.g., Festival only, Content only). (a26137b)
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Engine Refactoring' (Protocol in workflow.md)

## Phase 2: UI & Integration [checkpoint: ]
- [x] Task: Update `index.html` to remove or hide the "Design Style" dropdown. (d794737)
- [x] Task: Update `main.js` to handle the removal of the style field. (d794737)
- [x] Task: Verify that `localStorage` still works for the remaining fields. (d794737)
- [x] Task: Final end-to-end verification of prompt quality and 1:1 garment fidelity (V2 language). (d794737)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UI & Integration' (Protocol in workflow.md)

## Phase 3: Surgical Refinements for 9.5+ Score [checkpoint: ]
- [x] Task: Implement Upgrade 1: Embroidery Protection Clause (density and motif spacing). (2a3cb80)
- [x] Task: Implement Upgrade 2: Mannequin & Catalog Artifact Suppression (negative constraints). (2a3cb80)
- [x] Task: Implement Upgrade 3: Pose Physics Optimization (Natural stance vs. Aggressive editorial). (2a3cb80)
- [x] Task: Harmonize Wardrobe Lock and Model Direction to reduce "authority noise". (2a3cb80)
- [x] Task: Verify refinements with updated tests in `engine.test.js`. (2a3cb80)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Surgical Refinements' (Protocol in workflow.md)

## Phase 4: UI Refinement - Tabbed Aesthetic Selection [checkpoint: ]
- [x] Task: Implement Bootstrap 5 Tabbed interface in `index.html` (Festive, Reference, Content). (c053056)
- [x] Task: Re-organize form fields into corresponding tab panes and a shared footer section. (c053056)
- [x] Task: Update `main.js` to ensure the generator prioritizes the *active tab's* data. (c053056)
- [x] Task: Update `index.test.js` to verify the presence of tab navigation. (c053056)
- [x] Task: Final end-to-end verification of the tabbed workflow. (c053056)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: UI Refinement' (Protocol in workflow.md)

## Phase 5: UI Refinement - The Priority Anchor Logic [checkpoint: ]
- [x] Task: Move `hook` and `event_offer` fields out of tabs and into a persistent "Marketing Content" section. (ba2bf57)
- [x] Task: Rename Tabs to: "1. Festive Spotlight", "2. Artisan Spotlight (The Dress)", and "3. AI's Choice (Full Auto)". (ba2bf57)
- [x] Task: Update `main.js` to strictly enforce mutual exclusivity (If Festive Tab active, ignore URL; if URL active, ignore Festival). (ba2bf57)
- [x] Task: Update `index.test.js` to verify the new persistent content fields and renamed tabs. (ba2bf57)
- [x] Task: Final end-to-end verification of the "Priority Triangle" workflow. (ba2bf57)
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Priority Anchor Logic' (Protocol in workflow.md)

## Phase 6: UI Refinement - Surgical Single-Point Entry [checkpoint: ]
- [x] Task: Replace Tabs with a "Design Anchor" Button Group/Segmented Control. (261a835)
- [x] Task: Create a dynamic "Anchor Input" area that switches visibility between Festive and URL inputs. (261a835)
- [x] Task: Update `main.js` to clear inactive anchor fields whenever the mode is switched. (261a835)
- [x] Task: Enhance visual feedback (e.g., active mode highlighting) to reinforce the "One Anchor" rule. (261a835)
- [x] Task: Final verification of UI/UX and engine alignment. (261a835)
- [ ] Task: Conductor - User Manual Verification 'Phase 6: Single-Point Entry' (Protocol in workflow.md)
