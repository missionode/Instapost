# Implementation Plan - Flat Design & Mobile UX Polish

This plan outlines the steps to transition the Instapost UI to a modern Flat Design system optimized for mobile first.

## Phase 1: Foundation & Typography [checkpoint: ]
- [ ] Task: Update `index.html` to remove 'Cinzel' and ensure 'Inter' is the only primary font.
- [ ] Task: Update `style.css` to set 'Inter' as the global font and remove all legacy serif styles.
- [ ] Task: Implement the core Flat Design color palette (backgrounds, border colors).
- [ ] Task: Verify that all headings and labels are correctly styled in 'Inter'.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation' (Protocol in workflow.md)

## Phase 2: Component Refinement & Action Bars [checkpoint: ]
- [ ] Task: Refactor `index.html` to move switches (AI Mode, Logo) into Horizontal Action Bars.
- [ ] Task: Enhance touch targets for all interactive elements (minimum 44px).
- [ ] Task: Stylize input fields and select boxes for a clean, flat appearance.
- [ ] Task: Update `main.js` if any element IDs or structural selectors were changed.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Component Refinement' (Protocol in workflow.md)

## Phase 3: Layout Polish & Verification [checkpoint: ]
- [ ] Task: Apply final Flat Design styling to cards, buttons, and the prompt output area.
- [ ] Task: Ensure WCAG high-contrast standards are met for all text/background combinations.
- [ ] Task: Perform a comprehensive end-to-end verification on mobile-sized viewports.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final UX Polish' (Protocol in workflow.md)
