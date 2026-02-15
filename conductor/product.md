# Initial Concept
The project is "Instapost", a tool to generate dynamic luxury Instagram posters based on a specific JSON-defined style.

Key Features:
- A form to input dynamic content:
    - `design_type` (including **Auto Mode** and various regional/aesthetic styles like Indian, Royal, etc.)
    - `dress_reference` (Specific outfit reference with strict 1:1 fidelity mandate)
    - `creative_type` (Square, Portrait, Reel/Story)
    - `content`: Hook, Brand, Event/Offer (with **AI Content Generation** options), Location, Contact (Phone, WhatsApp, Email), and Instagram Handle.
- **Advanced Features:**
    - **Auto Mode:** Automatically mimics the style of an uploaded reference image.
    - **Festive/Seasonal Mode:** Optimizes decor and mood for specific occasions (Diwali, Christmas, etc.).
- Prompt Generation: The form generates a complex, structured prompt for an AI (likely image gen) based on the inputs and a pre-defined "luxury instagram poster" style (cinematic, premium, South Asian Indian model, specific color palettes, etc.).
- Persistence: Use `localStorage` to remember semi-static fields like Hook, Brand, Location Details, and Social Handles.
- Data Management: Options to download and upload the database (likely the configuration/content data) at the bottom of the form.
