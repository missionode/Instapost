# Initial Concept
The project is "Instapost", a tool to generate dynamic luxury Instagram posters based on a specific JSON-defined style.

Key Features:
- A form to input dynamic content:
    - `design_type` (e.g., "luxury instagram poster")
    - `dress_reference` (file/link for outfit/material)
    - `content`: Hook, Brand, Event/Offer, Location Details, Contact Details, Social Handles.
- Prompt Generation: The form generates a complex, structured prompt for an AI (likely image gen) based on the inputs and a pre-defined "luxury instagram poster" style (cinematic, premium, South Asian Indian model, specific color palettes, etc.).
- Persistence: Use `localStorage` to remember semi-static fields like Hook, Brand, Location Details, and Social Handles.
- Data Management: Options to download and upload the database (likely the configuration/content data) at the bottom of the form.
