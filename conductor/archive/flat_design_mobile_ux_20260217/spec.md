# Specification - Flat Design & Mobile UX Polish

## Overview
This track focuses on a comprehensive visual overhaul of the Instapost UI. We will transition from a serified, shaded aesthetic to a modern "Flat Design" system. The goal is to maximize mobile readability, improve touch accessibility, and streamline the user flow using a high-contrast, minimalist approach.

## Functional Requirements

### 1. Flat Design Visual System
- **Typography:** Switch to a 100% Sans-Serif strategy using 'Inter' for all elements (Titles, Headings, Labels, Inputs, and Buttons).
- **Styling:** Eliminate heavy shadows, gradients (except for the primary action button), and deep borders. Use solid backgrounds, sharp corners (with subtle 8px-12px rounding), and high-contrast light grays.
- **Color Palette:**
    - Background: Off-white/Light Gray (#F8F9FA).
    - Containers: Pure White (#FFFFFF) with 1px light borders.
    - Primary Action: Electric Blue (#0D6EFD).
    - Secondary Action: Subtle Gray (#E9ECEF).

### 2. Mobile-First Component Optimization
- **Horizontal Action Bars:** Relocate switches (AI Copywriting, Logo Integration) into dedicated horizontal utility bars positioned immediately above their respective sections.
- **Touch Targets:** Ensure all buttons, checkboxes, and radio buttons have a minimum touch area of 44x44px.
- **Input Refinement:** Use large, airy input fields with clear "Inter" labels.

### 3. Layout Re-organization
- Maintain the "Single-Point Entry" logic but present it in a "Focus Mode" UI where the active design anchor is the primary visual focus.
- Re-order sections to ensure the most critical marketing content is easily reachable.

## Technical Changes
- **index.html**: Update font links, restructure toggle placements, and apply new CSS classes.
- **style.css**: Rewrite CSS to implement the Flat Design system, removing legacy serif styles and heavy shadows.
- **main.js**: Ensure UI element selectors are updated if any IDs change during restructuring.

## Acceptance Criteria
- [ ] Application uses 'Inter' for all text elements.
- [ ] No serifs ('Cinzel') are visible in the UI.
- [ ] Toggles are organized in horizontal bars.
- [ ] UI is fully responsive and feels "app-like" on mobile devices.
- [ ] High-contrast accessibility standards (WCAG) are maintained or improved.
