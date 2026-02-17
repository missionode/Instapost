# Specification - Artisan Custom Instructions

## Overview
This track adds a "Custom Styling/Directives" field to the Artisan section. This allows users to provide specific aesthetic or compositional instructions (e.g., "Add soft evening shadows," "Close-up shot focusing on embroidery") that enrich the design blueprint without compromising the core Artisan Fidelity rules.

## Functional Requirements

### 1. UI Implementation (Artisan Section)
- Add a new `textarea` field inside the Artisan input card, below the Collection Builder.
- **Label:** "Custom Styling Directives (Optional)"
- **Placeholder:** "e.g., Soft golden hour lighting, cinematic bokeh background, model looking slightly away..."
- **Instructional Note:** "Provide additional aesthetic or compositional notes to enrich the AI blueprint."

### 2. Engine Integration (Aesthetic Enrichment)
- Update `engine.js` to capture the `artisan_custom_instructions` field.
- **Blueprint Injection:** Add a new key `"custom_aesthetic_notes"` to the `design_blueprint` object in the JSON output.
- **Constraint Hierachy:** Explicitly state in the prompt that these notes should be treated as supplementary aesthetic enrichment and MUST NOT override the `WARDROBE_LOCK` or micro-level embroidery protection.

### 3. Data Persistence
- Ensure the custom instructions are saved to `localStorage` and included in the export/import JSON.

## Technical Changes
- **index.html**: Add the `textarea` and instructional labels.
- **engine.js**: Update `generatePromptText` to include the custom notes in the blueprint.
- **storage.js**: Add the new field to the brand data persistence logic.

## Acceptance Criteria
- [ ] Artisan section contains a "Custom Styling Directives" text area.
- [ ] Placeholder and instructions are clearly visible.
- [ ] Generated JSON blueprints include the `custom_aesthetic_notes` field.
- [ ] Custom instructions are persisted correctly in `localStorage`.
