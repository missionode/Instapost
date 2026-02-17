# Initial Concept
The project is "Instapost", a context-aware tool to generate high-fidelity luxury Instagram posters using a dynamic semantic blueprint system.

Key Features:
- **Intent-Driven Three-Tabbed UI:** Users select their creative starting point:
    - **Festive Vibes:** Prioritizes cultural and seasonal authenticity.
    - **Dress Reference:** Anchors the entire aesthetic to a specific garment for 1:1 fidelity.
    - **Content Mode:** Derives style automatically from hooks and headlines.
- **Advanced Contextual Engine:**
    - **Semantic Blueprinting:** Replaced rigid style templates with a dynamic hierarchy (Festive > Reference > Content) that generates a descriptive "Design Blueprint" for the AI.
    - **Artisan Fidelity (1:1 Wardrobe Lock):** Advanced prompt hardening to ensure the model wears the exact garment from the reference image, preserving micro-level embroidery and fabric drape while ignoring source artifacts like mannequins.
    - **Automated Aesthetic Derivation:** Intelligent fallback to premium minimalist defaults if context is sparse.
- Prompt Generation: The form generates a complex, structured JSON prompt for an AI image generator based on the selected mode and provided details.
- Persistence: Use `localStorage` to remember semi-static fields like Brand, Location Details, and Social Handles.
- Data Management: Options to download and upload the database at the bottom of the form.
