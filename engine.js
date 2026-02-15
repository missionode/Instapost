const styleTemplates = {
    "luxury instagram poster": {
        aesthetic: "cinematic, premium, warm commercial",
        mood: "celebratory, elegant, inviting",
        lighting: "warm cinematic glow, gentle rim highlight",
        color_palette: "deep rich red with warm gold accents, soft warm gradient backdrop",
        composition: "vertical instagram poster, hero model focus center, multi-layered depth",
        visual_elements: "flowing luxury fabric curtain reveal, premium storefront background",
        model_direction: "South Asian Indian celebrity-like professional model, confident luxury poses, elegant posture",
        typography: "bold elegant serif hook, clean premium brand wordmark, modern readable sans-serif details"
    },
    "fashion editorial": {
        aesthetic: "high-end, artistic, minimalist",
        mood: "mysterious, avant-garde, sophisticated",
        lighting: "dramatic chiaroscuro, sharp shadows, high contrast",
        color_palette: "monochromatic with a single bold accent color, stark white or deep black backdrop",
        composition: "asymmetrical, focus on silhouette and negative space",
        visual_elements: "abstract geometric shapes, architectural elements",
        model_direction: "editorial high-fashion model, experimental poses, neutral expression",
        typography: "ultra-thin serif hook, minimalist brand signature, vertical text alignments"
    },
    "product launch": {
        aesthetic: "bold, high-energy, commercial",
        mood: "exciting, urgent, professional",
        lighting: "bright studio lighting, pop of color, no harsh shadows",
        color_palette: "vibrant brand colors, clean solid backdrop",
        composition: "centered product focus, clear call-to-action zones, symmetry",
        visual_elements: "dynamic particles, product exploded view or premium packaging",
        model_direction: "approachable professional model, friendly and confident, holding product",
        typography: "heavy impact sans-serif hook, bold brand logo, clear promotional text"
    }
};

function generatePromptText(data) {
    const style = styleTemplates[data.design_type] || styleTemplates["luxury instagram poster"];
    
    let contactInfo = [];
    if (data.phone) contactInfo.push(`Phone: ${data.phone}`);
    if (data.whatsapp) contactInfo.push(`WhatsApp: ${data.whatsapp}`);
    if (data.email) contactInfo.push(`Email: ${data.email}`);
    const contactStr = contactInfo.join(', ');

    return `Create a ${style.aesthetic} ${data.design_type}. 
Mood: ${style.mood}. 
Lighting: ${style.lighting}. 
Color Palette: ${style.color_palette}.
Composition: ${style.composition}. 
Visual Elements: ${style.visual_elements}.
Model Direction: ${style.model_direction}. 
The model should be wearing ${data.dress_reference || 'luxury traditional attire'}.
Typography Style: ${style.typography}.

Content to include in the design:
- Primary Hook: "${data.hook.toUpperCase()}" (Highest visual priority)
- Brand Name: "${data.brand}"
- Promotion: "${data.event_offer}"
- Location: "${data.location_details}"
- Contact: "${contactStr}"
- Social: "${data.social_handles}"

Quality: Photorealistic, 8k resolution, highly detailed, sharp focus, shallow depth of field, premium retail launch advertisement optimized for Instagram.`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePromptText };
}
