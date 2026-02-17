# Specification - Format Selector UI Polish

## Overview
This track focuses on transforming the "Select Output Format" section into a premium, mobile-optimized experience. We will replace the standard button group with a 3-column grid of "Format Tiles" that use platform-specific icons and high-contrast active states to provide immediate visual feedback.

## Functional Requirements

### 1. Visual Format Tiles (3-Column Grid)
- **Layout:** A responsive 3-column row that stays within mobile screen bounds (no horizontal overflow).
- **Components:** Each tile contains:
    - **Contextual Icon:** (e.g., Square Post -> `bi-square`, Portrait -> `bi-rectangle`, Story/Reel -> `bi-phone`).
    - **Format Label:** (e.g., "Square", "Portrait", "Reel").
    - **Aspect Ratio Subtitle:** (e.g., "1:1", "4:5", "9:16").

### 2. High-Contrast Active States
- **Selected State:** Use the primary "Action Color" (Electric Blue) for the entire tile background when active.
- **Unselected State:** Clean white background with a subtle 1px gray border.
- **Transition:** Smooth color fade on selection.

### 3. Mobile Optimization
- **Touch Targets:** Each tile will have a minimum height of 80px to ensure easy tapping on small screens.
- **Typography:** Use "Inter" with bold labels and smaller, muted subtitles for clear hierarchy.

## Technical Changes
- **index.html**: Restructure the Section 4 HTML to use a grid of custom labels and radio inputs.
- **style.css**: Add styling for `.format-tile`, including active states and responsive grid adjustments.
- **main.js**: No changes needed (already handles radio values correctly).

## Acceptance Criteria
- [ ] Format selector is a 3-column grid on both mobile and desktop.
- [ ] Active tiles are highlighted in Electric Blue.
- [ ] Icons and subtitles are clearly visible within the tiles.
- [ ] No horizontal scrolling occurs on a 375px wide (iPhone SE) viewport.
