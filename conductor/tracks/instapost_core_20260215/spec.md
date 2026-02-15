# Specification - Instapost Core

## Overview
This track focuses on building the primary functional prototype of Instapost. It includes a responsive web form for capturing user input, a logic engine for generating structured AI prompts, and a persistence layer using `localStorage`.

## Functional Requirements
- **Dynamic Form:**
    - Fields: Design Type (Text/Select), Dress Reference (Text/File Link), Content (Hook, Brand, Event/Offer, Location Details, Contact Details, Social Handles).
    - Validation: Required fields check.
- **Persistence:**
    - Automatically save and load semi-static fields (Hook, Brand, Location, Social Handles) using `localStorage`.
- **Prompt Generation Engine:**
    - A JavaScript function that combines user input with the pre-defined "Luxury South Asian" style template.
    - Template includes: Cinematic aesthetic, warm gold accents, South Asian model direction, and specific typography rules.
    - Output: A formatted string ready for copying to an AI image generator.
- **Data Management:**
    - "Download Database" button: Exports current `localStorage` data as a JSON file.
    - "Upload Database" button: Imports a JSON file to populate `localStorage`.

## Technical Requirements
- **Framework:** Vanilla JavaScript, HTML5, CSS3.
- **UI:** Bootstrap 5 (CDN) for responsiveness and basic components.
- **Aesthetics:** Mobile-first, clean, and professional.
- **Persistence:** Browser `localStorage` API.

## Design Constraints
- Maintain WCAG AAA minimum 7:1 contrast for all readable text in the app.
- Mobile-first layout optimized for vertical scrolling.
