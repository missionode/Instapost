# Specification - Simplified Contextual Engine

## Overview
This track fundamentally refactors the `engine.js` prompt generation logic. We are moving away from rigid, hardcoded style templates (Royal, Indian, etc.) that competed with the AI's creativity. The new engine will dynamically construct a "Design Blueprint" based on the user's content and reference image, allowing the AI generator to make coherent aesthetic decisions.

## Functional Requirements

### 1. Removal of Hardcoded Style Templates
- Eliminate the `styleTemplates` object and the "Design Style" selection requirement from the engine logic.
- The UI should be simplified to remove the style dropdown, defaulting all logic to a context-aware "Auto" mode.

### 2. Contextual Hierarchy Logic
The engine will determine the visual aesthetic using the following priority:
1.  **Festive/Seasonal Mode (Highest Override):** If enabled, the engine derives the vibe, decor, and lighting strictly from the `festive_info`.
2.  **Reference Image (Visual Anchor):** If a `dress_reference` is provided, the engine anchors the aesthetic (colors, mood, background) to match the reference image.
3.  **Semantic Content Analysis:** If no image/festival is present, the engine analyzes the `hook` and `event_offer` to derive a relevant industry aesthetic (e.g., "50% Off Sale" -> Commercial/Bold, "Grand Opening" -> Opulent/Welcoming).
4.  **AI Baseline:** If all else is empty, the engine generates a high-end premium minimalist blueprint.

### 3. Semantic Blueprint Structure
- The generated prompt will transition to a "Blueprint" format. Instead of prescribing "deep rich red," it will describe the **Context** (e.g., "Luxury Fashion Retail"), **Mood** (e.g., "Sophisticated and Poised"), and **Visual Anchors**.
- **Layout & Typography Guardrails:** Maintain strict JSON blocks for `layout_standards`, `safe_zones`, `logo_integration`, and `typography_style` to ensure the final output remains a functional marketing asset.

### 4. Wardrobe Fidelity (V2 Integration)
- Maintain the "Strict Visual Consistency Lock" logic.
- **Visual Identity over Geometric Tracing:** The lock applies to the *material identity* (color, pattern, fabric). The AI is free to adapt the drape to fit a dynamic human pose.
- **Reference Source Independence:** Explicitly instruct the AI to transfer the garment from the reference (even if on a mannequin or flat-lay) onto a live model, ignoring mannequin/background elements from the source.

## Technical Changes
- **engine.js**: Remove `styleTemplates`. Implement a `deriveContextualAesthetic(data)` function to handle the new hierarchy.
- **UI**: Hide/Remove the `design_type` selector.

## Acceptance Criteria
- [ ] Prompt generation works without a `design_type` input.
- [ ] Festive mode correctly overrides the aesthetic when enabled.
- [ ] Prompts contain specific "Blueprint" instructions derived from content when no image is provided.
- [ ] Logo placement and safe zone logic remains intact and functional.
