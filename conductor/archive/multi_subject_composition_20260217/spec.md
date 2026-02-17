# Specification - Multi-Subject Composition System

## Overview
This track enhances the engine to handle multiple models and garment categories (Men, Women, Kids, Unisex). It introduces a "Group Mode" that adapts the grid system when multiple subjects are selected, ensuring balanced compositions for family or collection-based festive posters.

## Functional Requirements

### 1. Subject Category Selection
- Add checkboxes for **Men, Women, Kids, Unisex** within the "Festive Spotlight" and "Artisan Dress" sections.
- These selections act as "Subject Directives" for the AI model generation.

### 2. "Group Mode" Logic
- **Trigger:** Automatically activated if more than one category is checked (e.g., Men + Women) OR if multiple URLs are detected in the Artisan input.
- **Grid Adaptation:** In Group Mode, the engine overrides the "Asymmetrical 2-of-3" rule and utilizes **all 3 columns** for the Hero block to accommodate the group.
- **Composition Directive:** Instruct the AI to arrange subjects in a "Harmonious Group Stance," ensuring all garments remain visible and distinct.

### 3. Artisan Multi-Reference Mapping
- If the user provides multiple comma-separated URLs in the "Dress Reference URL" field, the engine treats each as a specific reference for the selected categories.
- **Constraint Hardening:** Apply "Artisan Fidelity" rules to each individual reference within the group.

### 4. Festive Subject Context
- When in Festive mode, selected categories influence the attire:
    - **Men:** "Opulent Traditional Kurta/Sherwani"
    - **Women:** "High-Fashion Saree/Lehenga"
    - **Kids:** "Coordinated Festive Mini-wear"

## Technical Changes
- **index.html**: Add category checkboxes to the Festive and Artisan input areas.
- **engine.js**: Update `deriveGridStrategy` to handle Group Mode (3-column hero). Update `generatePromptText` to map categories to model directions.
- **main.js**: Ensure checkbox states are captured and passed correctly to the engine.

## Acceptance Criteria
- [ ] UI shows gender/age checkboxes in Festive and Artisan modes.
- [ ] Selecting multiple categories triggers "Group Mode" in the JSON blueprint.
- [ ] Group Mode utilizes all 3 columns for the Hero block.
- [ ] Prompt correctly describes multiple models based on the selection.
