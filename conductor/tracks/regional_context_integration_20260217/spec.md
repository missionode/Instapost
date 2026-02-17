# Specification - Regional Context Integration

## Overview
This track enhances the geographical context provided to the AI. We will update the "Location Details" field to explicitly include City and State. This data will be used to refine the "Model Casting Nuance," ensuring that the AI-generated models and their styling align subtly with the specific South Asian Indian cultural background of the specified region.

## Functional Requirements

### 1. UI Update (Location Details)
- Update the label and placeholder for the `location_details` field in the "Brand & Contact Details" section.
- New Label: "Location (City, State)"
- New Placeholder: "e.g., Thiruvananthapuram, Kerala"

### 2. Contextual Inheritance
- The engine will treat the `location_details` as the regional source.
- Festive Mode will automatically inherit this data to refine cultural authenticity.

### 3. AI Blueprint Integration (Model Casting Nuance)
- Hardcode the primary model identity as "South Asian Indian".
- Inject a directive into the `model_direction` that instructs the AI to:
    - "Subtly align model features, skin tones, and regional styling with the specific South Asian Indian cultural background of [City, State], India."
    - This ensures the poster feels authentic to the brand's primary region.

## Technical Changes
- **index.html**: Update the `location_details` input label and placeholder.
- **engine.js**: Add logic to parse location components and inject the casting nuance directive.

## Acceptance Criteria
- [ ] UI explicitly asks for City and State.
- [ ] Generated prompts contain a specific directive linking model features to the provided South Asian Indian regional context.
- [ ] Festive mode prompts correctly include the regional nuance inherited from the location field.
