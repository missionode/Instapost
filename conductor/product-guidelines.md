# Product Guidelines - Instapost

## User Experience (UX) & Interface (UI)
- **Mobile-First Design:** The application must be fully responsive and optimized for mobile users, ensuring that all form inputs and generated prompts are easily readable.
- **Clean Aesthetic:** Use a minimalist, professional design to ensure the user can focus on content creation without distraction.
- **Dynamic Interaction:** Provide immediate feedback on form inputs and style selections.

## Data & Persistence
- **Local-First Privacy:** All user data, including brand settings and semi-static fields, must be stored exclusively in `localStorage`.
- **User Ownership:** Users are responsible for their own data. The application provides "Download" and "Upload" features to allow users to back up and restore their configurations manually.
- **No Backend Requirement:** The application should function as a standalone client-side tool to minimize latency and maximize privacy.

## Content & Tone
- **Direct & Minimalist:** Use concise labels and feedback messages. Avoid unnecessary conversational filler to keep the interface fast and efficient.
- **Precision:** Ensure that generated prompts strictly adhere to the technical requirements (WCAG contrast, cinematic lighting, etc.) specified in the design templates.

## Accessibility
- **WCAG Compliance:** Maintain a minimum 7:1 contrast ratio for all text elements in the application itself, mirroring the requirements for the generated posters.
