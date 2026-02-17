const creativeTypeDimensions = {
    "Square Post": { size: "1080 x 1080 px (1:1)", scale: "Balanced centered scaling" },
    "Portrait Post": { size: "1080 x 1350 px (4:5)", scale: "Vertical emphasis with larger Hook area" },
    "Reel/Story": { size: "1080 x 1920 px (9:16)", scale: "Dynamic vertical scaling, prioritized top-third Hook placement" }
};

function toTitleCase(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function toSentenceCase(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function deriveContextualAesthetic(data) {
    // 1. Festive/Seasonal Mode (Highest Override)
    if (data.festive_mode === 'on' && data.festive_info) {
        return {
            context: `${data.festive_info} Festive Celebration`,
            aesthetic: `Authentic ${data.festive_info} thematic elements, cultural decor, and seasonal atmospheric lighting.`,
            mood: "festive, celebratory, warm, and inviting",
            colors: "rich traditional tones with warm celebratory highlights"
        };
    }

    // 2. Reference Image (Visual Anchor)
    if (data.dress_reference) {
        return {
            context: "Visual Anchor Reference Matching",
            aesthetic: "Reverse-engineer and replicate the visual style, lighting, color palette, and composition of the provided reference image.",
            mood: "Synchronized with reference image aesthetic",
            colors: "Derived from reference image palette"
        };
    }

    // 3. Semantic Content Analysis
    if (data.hook || data.event_offer) {
        const contextSubject = (data.hook || data.event_offer).toUpperCase();
        return {
            context: `Retail Commercial - ${contextSubject}`,
            aesthetic: "Bold commercial layout with high-impact product presentation and clean modern lines.",
            mood: "High-energy, commercial, inviting",
            colors: "vibrant brand-centric colors with bright saturated accents"
        };
    }

    // 4. AI Baseline (Default)
    return {
        context: "Premium Minimalist Branding",
        aesthetic: "Clean, airy, and sophisticated minimalist layout with a focus on high-end luxury lifestyle vibes.",
        mood: "Elegant, quiet luxury, sophisticated",
        colors: "Soft neutral earth tones with refined highlights"
    };
}

function generatePromptText(data) {
    if (!data) return "Error: No input data provided.";
    
    const dim = creativeTypeDimensions[data.creative_type] || creativeTypeDimensions["Square Post"];
    const aesthetic = deriveContextualAesthetic(data);
    
    const iconGridSystem = "Utilize a uniform grid-based vector icon system (24x24px scale) for all contact symbols and the Instagram glyph to ensure visual consistency and perfect alignment.";
    
    const contactIcons = [];
    if (data.phone) contactIcons.push(`Phone glyph: ${data.phone}`);
    if (data.whatsapp) contactIcons.push(`WhatsApp glyph: ${data.whatsapp}`);
    if (data.email) contactIcons.push(`Email glyph: ${data.email}`);
    const contactStr = contactIcons.join(' | ') || "";

    // Wardrobe Lock Strategy Integration (V2)
    let wardrobeLockBlock = "";
    let globalPriorityBlock = "";
    let antiDriftRules = "";
    let garmentFocus = "";

    // Dress Reference Handling
    let wardrobeSource;
    if (data.festive_mode === 'on' && data.festive_info) {
        wardrobeSource = `PRIORITY: Apply authentic and opulent ${data.festive_info} festive attire to the model. Ensure the clothing perfectly matches the cultural and seasonal significance of the occasion. (Note: This mode prioritizes thematic consistency over manual reference).`;
    } else {
        const refText = data.dress_reference ? `(Reference: ${data.dress_reference})` : '';
        
        if (data.dress_reference) {
            globalPriorityBlock = `\n  "GLOBAL_RENDER_PRIORITY": {
    "order_of_importance": [
      "WARDROBE_FIDELITY",
      "FACE_REALISM",
      "TEXT_READABILITY",
      "SCENE_STYLING"
    ],
    "rule": "Higher priority items override lower priority styling instructions."
  },`;

            wardrobeLockBlock = `\n  "WARDROBE_LOCK": {
    "priority": "MAXIMUM — ANCHOR TO REFERENCE",
    "rule": "The model MUST wear a garment with strict visual consistency to the reference image. This is the primary visual anchor for the generation. Transfer the garment from the reference image onto a live model, ignoring mannequin or studio background elements from the source.",
    "reference_image": "${data.dress_reference}",
    "anchored_attributes": {
      "color_fidelity": "Maintain exact color palette and hue from reference",
      "silhouette": "Preserve the specific garment structure, cut, and drape",
      "surface_details": "Replicate the pattern type, embroidery style, and fabric texture exactly. Preserve micro-level embroidery density and motif spacing; do not simplify patterns."
    },
    "hard_constraints": [
      "do not change primary color",
      "do not alter garment silhouette",
      "do not substitute pattern style",
      "do not add extraneous stylistic embellishments",
      "forbid flat catalog lighting",
      "forbid mannequin posture",
      "forbid product-only framing"
    ],
    "failure_condition": "If high visual identity cannot be maintained, abort generation and inform the user that the reference garment attributes (color/silhouette) are too complex for the current model to replicate faithfully."
  },`;

            wardrobeSource = `STRICT VISUAL CONSISTENCY LOCK: The model must wear a garment that is visually identical in color, silhouette, and micro-level embroidery pattern to the reference image. This requirement anchors the generation and overrides competing cinematic or lighting effects. ${refText}`;

            antiDriftRules = `\n      "anti_drift_rules": [
        "do not redesign the outfit",
        "do not restyle the garment",
        "do not substitute similar but different dresses",
        "do not simplify the core embroidery or pattern structure",
        "preserve the original garment silhouette and fabric drape physics"
      ],`;

            garmentFocus = `\n      "garment_focus": "The garment must be the primary focal point, clearly visible and unobstructed. Deprioritize environmental effects (like fabric overlays or haze) that obscure the garment's original color and detail. Suppress all mannequin or catalog artifacts from the reference.",`;
        } else {
            wardrobeSource = `MANDATORY: Use the exact dress and material from the original uploaded image reference provided ${refText}. DO NOT alter the style, color, texture, or design. Absolute 1:1 fidelity required. The model must wear the identical garment from the reference image without any modifications.`;
        }
    }

    const autoModeInstruction = data.design_type === "auto" 
        ? `\n  "EXPERIMENTAL_AUTO_MODE_DIRECTIVE": "Analyze reference image and reverse-engineer its visual style, lighting, color palette, and composition.",`
        : "";

    // Logo Logic
    let logoInstruction = "";
    if (data.enable_logo === 'on' && (data.logo_light || data.logo_dark)) {
        logoInstruction = `\n  "LOGO_INTEGRATION": {
    "is_logo_mandatory": true,
    "light_version": "${data.logo_light || 'None provided'}",
    "dark_version": "${data.logo_dark || 'None provided'}",
    "usage_rule": "Select the version with maximum contrast against the generated background (Light for Dark/Rich, Dark for Light/Airy).",
    "positioning_and_scale": {
      "Square Post": {
        "position": "Centered top-third or bottom-center (Y-axis offset: 5%)",
        "constraints": "Width: 15-20% of total width | Max Height: 8% of total height"
      },
      "Portrait Post": {
        "position": "Top-left corner or bottom-center (Safe margin: 40px from edge)",
        "constraints": "Width: 12-15% of total width | Max Height: 6% of total height"
      },
      "Reel/Story": {
        "position": "Top center (10% from top edge) or bottom center (30% from bottom edge to avoid UI overlays)",
        "constraints": "Width: 18-22% of total width | Max Height: 5% of total height"
      }
    },
    "rendering_instruction": "Maintain absolute aspect ratio. Do not stretch or distort. Ensure clear negative space around the logo for visibility. The logo MUST be visible and identifiable."
  },`;
    }

    // Capitalization handling
    const brandName = toTitleCase(data.brand || 'Brand Name');
    const hookText = data.ai_content_mode === 'on' ? 'GENERATE_AI_HOOK' : (data.hook || 'Headline').toUpperCase();
    const offerText = data.ai_content_mode === 'on' ? 'GENERATE_AI_OFFER' : toSentenceCase(data.event_offer || 'Promotional Offer');

    return `Create a high-fidelity image based on the JSON-BASED DESIGN SPECIFICATION:
{
  "creative_type": "${data.creative_type || 'Social Media Post'}",${globalPriorityBlock}${wardrobeLockBlock}${autoModeInstruction}${logoInstruction}
  "dimensions": "${dim.size}",
  "aspect_ratio_constraint": "Strictly maintain aspect ratio without cropping",
  "layout_standards": {
    "alignment": "Centered and visually balanced alignment",
    "safe_zones": "Strict 10% inner padding from all edges to ensure mobile readability",
    "placement_logic": "Strategic Top-Mid-Bottom stack: Hook (Top), Hero Model (Center), Brand & Info (Bottom)"
  },
  "design_blueprint": {
    "context": "${aesthetic.context}",
    "mood": "${aesthetic.mood}",
    "aesthetic_directives": "${aesthetic.aesthetic}",
    "color_strategy": "${aesthetic.colors}"
  },
  "style": {
    "visual_elements": {
      "hero_element": "Live professional South Asian model with natural high-fashion stance",${garmentFocus}
      "background_strategy": "Create a high-end environment that perfectly matches the blueprint context",
      "icon_standard": "${iconGridSystem}"
    },
    "model_direction": {
      "appearance": "South Asian Indian celebrity-like professional model",
      "pose_style": "Natural high-fashion stance with realistic fabric fall. Maintain poise while prioritizing correct garment drape physics.",
      "expression": "Warm, premium, approachable confidence",
      "wardrobe_source": "${wardrobeSource}"
    },
    "typography_style": {
      "hierarchy": "logo > hook > brand > offer > event details > contact > instagram",
      "alignment": "Centered and visually balanced alignment",
      "responsive_scaling": "${dim.scale}",
      "readability_rules": {
        "contrast_ratio": "minimum 7:1 contrast ratio (WCAG AAA)",
        "mobile_first_legibility": true
      }
    },
    "finish": {
      "quality": "photorealistic and original-looking",${antiDriftRules}
      "overall_feel": "premium cinematic digital marketing asset optimized for ${data.creative_type}"
    }
  },
  "content_placeholders": {
    "brand_logo": "${(data.logo_light || data.logo_dark) ? 'RENDER_PROVIDED_LOGO' : 'RENDER_BRAND_NAME_AS_TEXT'}",
    "hook": "${hookText}",
    "brand_name": "${brandName}",
    "event_offer": "${offerText}",
    "location_details": "${data.location_details || 'Location'}",
    "contact_details": "${contactStr}",
    "instagram_handle": "${data.social_handles || '@handle'} with grid-aligned Instagram glyph"
  }
}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePromptText };
}
