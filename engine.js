const styleTemplates = {
    "luxury instagram poster": {
        aesthetic: "cinematic, premium, warm commercial",
        mood: "celebratory, elegant, inviting",
        colors: {
            primary: "deep rich red",
            secondary: "warm gold accents",
            background: "soft warm gradient with subtle haze",
            lighting: "warm cinematic glow"
        },
        composition: {
            structure: "top hook area, hero model focus center, bottom information block",
            depth: "multi-layered with foreground, midground, and background separation",
            focus: "strong central luxury focal point with clear text safe zones",
            safe_margins: "generous padding to protect readability on mobile"
        },
        visual_elements: {
            hero: "flowing luxury fabric curtain reveal effect",
            background: "soft atmospheric city silhouette or abstract depth backdrop",
            midground: "premium storefront or luxury environment",
            foreground: "subtle crowd or ambient silhouettes (low distraction)",
            accents: "minimal gold ribbon or celebratory accents"
        },
        model: {
            appearance: "South Asian Indian celebrity-like professional model",
            pose: "confident luxury poses, elegant posture, fashion editorial feel",
            expression: "warm, premium, approachable confidence",
            lighting: "soft cinematic key light with gentle rim highlight"
        },
        typography: {
            hook: "bold elegant serif, highest visual priority",
            brand: "clean premium wordmark style",
            details: "modern highly readable sans-serif",
            hierarchy: "hook > brand > offer > event details > contact > instagram",
            alignment: "centered and visually balanced",
            readability: "minimum 7:1 contrast ratio (WCAG AAA), mobile-first legibility, use text backplates if needed"
        }
    },
    "indian traditional": {
        aesthetic: "vibrant, ethnic, heritage-focused",
        mood: "joyful, cultural, authentic",
        colors: {
            primary: "vibrant saffron and emerald green",
            secondary: "burnished gold and vermilion",
            background: "intricate temple carvings or traditional courtyard",
            lighting: "golden hour sunlight, soft diya glow"
        },
        composition: {
            structure: "symmetrical heritage layout, centered hero, decorative border elements",
            depth: "layered foreground with floral marigold accents",
            focus: "cultural authenticity and intricate garment detailing",
            safe_margins: "traditional safe zones for text"
        },
        visual_elements: {
            hero: "ornate architectural archway (jharokha)",
            background: "historic Indian palace courtyard or fort wall",
            midground: "brass lamps, flower garlands (gendas), and silk drapes",
            foreground: "defocused marigold petals or incense haze",
            accents: "mandala patterns and traditional ethnic motifs"
        },
        model: {
            appearance: "traditional South Asian model, graceful and dignified",
            pose: "classical dance-inspired posture or elegant sitting pose",
            expression: "serene, smiling, and welcoming",
            lighting: "warm side-lighting highlighting jewelry sparkle"
        },
        typography: {
            hook: "ornate display serif with ethnic flair",
            brand: "classic calligraphic style wordmark",
            details: "clean legible sans-serif",
            hierarchy: "hook > brand > details > contact > instagram",
            alignment: "centered with decorative dividers",
            readability: "high contrast against textured backgrounds"
        }
    },
    "royal heritage": {
        aesthetic: "majestic, opulent, aristocratic",
        mood: "grand, powerful, timeless",
        colors: {
            primary: "royal navy and velvet purple",
            secondary: "antique gold and silver filigree",
            background: "grand palace ballroom or majestic throne room",
            lighting: "dramatic chandelier lighting, majestic shadows"
        },
        composition: {
            structure: "grand symmetrical composition, high-angle power perspective",
            depth: "vast architectural depth with long corridors",
            focus: "majestic presence and opulent luxury",
            safe_margins: "regal spaciousness"
        },
        visual_elements: {
            hero: "grand marble staircase or velvet throne",
            background: "baroque or mughal architectural grandeur",
            midground: "crystal chandeliers, oil paintings, and gold statues",
            foreground: "soft velvet curtain edges",
            accents: "royal crests and vintage filigree borders"
        },
        model: {
            appearance: "aristocratic presence, royal demeanor",
            pose: "stately and authoritative posture, majestic gaze",
            expression: "composed, confident, and high-status",
            lighting: "dramatic spotlighting with royal rim highlights"
        },
        typography: {
            hook: "stately high-contrast serif (didone style)",
            brand: "embossed-look gold wordmark",
            details: "refined copperplate gothic",
            hierarchy: "brand > hook > event > contact > instagram",
            alignment: "perfectly centered and formal",
            readability: "luxurious contrast and spacing"
        }
    },
    "classic elegance": {
        aesthetic: "sophisticated, refined, timeless",
        mood: "quiet luxury, poised, professional",
        colors: {
            primary: "champagne and charcoal gray",
            secondary: "soft pearl white and silver",
            background: "minimalist high-end hotel lobby or clean studio",
            lighting: "soft diffused wrap-around lighting"
        },
        composition: {
            structure: "balanced minimalist layout, clean lines, rule of thirds",
            depth: "subtle depth with soft focus background",
            focus: "sophistication and refined professional quality",
            safe_margins: "generous white space for a premium feel"
        },
        visual_elements: {
            hero: "clean architectural lines or fine furniture",
            background: "modern luxury interior or soft bokeh studio",
            midground: "fresh white lilies or minimalist art",
            foreground: "clean and uncluttered",
            accents: "subtle pinstripes or thin silver lines"
        },
        model: {
            appearance: "poised professional model, sophisticated look",
            pose: "natural yet refined posture, effortless grace",
            expression: "softly confident and approachable",
            lighting: "flawless beauty lighting, soft shadows"
        },
        typography: {
            hook: "modern sophisticated sans-serif with wide tracking",
            brand: "timeless high-fashion serif wordmark",
            details: "lightweight legible grotesque",
            hierarchy: "brand > hook > details > contact > instagram",
            alignment: "balanced and airy",
            readability: "perfect clarity and elegant spacing"
        }
    },
    "fashion editorial": {
        aesthetic: "high-end, artistic, minimalist",
        mood: "mysterious, avant-garde, sophisticated",
        colors: {
            primary: "stark black and white",
            secondary: "high-contrast shadows",
            background: "clean minimalist studio backdrop",
            lighting: "dramatic chiaroscuro, sharp directional light"
        },
        composition: {
            structure: "asymmetrical layout, focus on silhouette, negative space priority",
            depth: "shallow depth with compressed perspective",
            focus: "artistic focal point, off-center positioning",
            safe_margins: "minimalist breathing room"
        },
        visual_elements: {
            hero: "sharp architectural clothing lines",
            background: "uncluttered high-fashion studio",
            midground: "minimalist props or geometric shapes",
            foreground: "sharp focus on fabric texture",
            accents: "no distraction, focus on form"
        },
        model: {
            appearance: "high-fashion editorial model",
            pose: "avant-garde poses, experimental posture",
            expression: "neutral, bold, or mysterious",
            lighting: "harsh high-contrast lighting"
        },
        typography: {
            hook: "ultra-thin sophisticated serif",
            brand: "minimalist signature wordmark",
            details: "compact vertical text alignment",
            hierarchy: "brand > hook > event > contact > instagram",
            alignment: "asymmetrical yet balanced",
            readability: "high-contrast legibility, sharp focus on typography"
        }
    },
    "product launch": {
        aesthetic: "bold, high-energy, commercial",
        mood: "exciting, urgent, professional",
        colors: {
            primary: "vibrant brand-specific colors",
            secondary: "bright saturated accents",
            background: "clean dynamic product stage",
            lighting: "bright studio key light, no harsh shadows"
        },
        composition: {
            structure: "centered product focus, symmetrical layout, clear CTA zones",
            depth: "dynamic multi-level product presentation",
            focus: "uninterrupted product visibility",
            safe_margins: "utility-focused padding for ad placement"
        },
        visual_elements: {
            hero: "dynamic floating product or exploded view",
            background: "modern tech-inspired or clean retail environment",
            midground: "brand-colored particles or light streaks",
            foreground: "high-clarity product features",
            accents: "bold graphic stickers or launch badges"
        },
        model: {
            appearance: "approachable professional business model",
            pose: "friendly, confident, presenting the product",
            expression: "enthusiastic and welcoming",
            lighting: "soft wrap-around studio lighting"
        },
        typography: {
            hook: "heavy impact sans-serif",
            brand: "bold logo-centric placement",
            details: "clear informational bullet points",
            hierarchy: "offer > hook > brand > contact > instagram",
            alignment: "centered for immediate impact",
            readability: "maximum contrast for rapid scanning, bold legibility"
        }
    },
    "streetwear hype": {
        aesthetic: "vibrant, high-contrast, urban",
        mood: "edgy, energetic, influential",
        colors: {
            primary: "electric blue or neon green",
            secondary: "stark black or reflective silver",
            background: "gritty city street or concrete studio",
            lighting: "neon glow, flickering street lights, or high-noon sun"
        },
        composition: {
            structure: "dynamic low-angle shot, fragmented layout, layered textures",
            depth: "complex urban layering with graffiti and street elements",
            focus: "aggressive focus on model and lifestyle attitude",
            safe_margins: "oversized, experimental padding"
        },
        visual_elements: {
            hero: "bold streetwear silhouettes, oversized garments",
            background: "vibrant graffiti wall or underground subway station",
            midground: "skateboards, speakers, or urban furniture",
            foreground: "glitch effects or lens flare",
            accents: "bold caution tapes or digital glitch overlays"
        },
        model: {
            appearance: "urban trendsetter, influential streetwear model",
            pose: "low-angle power pose, relaxed yet high-energy",
            expression: "cool, detached, or fierce confidence",
            lighting: "dramatic neon rim light, high-contrast urban shadows"
        },
        typography: {
            hook: "distorted or bold slab-serif",
            brand: "streetwear wordmark with sticker-effect",
            details: "monospace tech-style fonts",
            hierarchy: "hook > offer > instagram",
            alignment: "dynamic, off-kilter, or justified",
            readability: "high-contrast neon legibility, bold visibility"
        }
    },
    "minimalist lifestyle": {
        aesthetic: "clean, airy, natural",
        mood: "calm, authentic, peaceful",
        colors: {
            primary: "soft earth tones, beige, or off-white",
            secondary: "muted sage green or warm wood",
            background: "sun-drenched minimalist interior",
            lighting: "soft natural sunlight, golden hour glow"
        },
        composition: {
            structure: "open-concept layout, rule of thirds, breathable space",
            depth: "natural layering with plants and soft textures",
            focus: "gentle focus on authentic human connection or lifestyle moments",
            safe_margins: "wide, airy margins for a spacious feel"
        },
        visual_elements: {
            hero: "natural linen fabrics, soft knitwear",
            background: "airy room with large windows and indoor plants",
            midground: "minimalist ceramic decor or books",
            foreground: "soft out-of-focus foliage",
            accents: "subtle light rays or dust motes"
        },
        model: {
            appearance: "authentic, relatable, everyday person",
            pose: "candid, relaxed, natural movement",
            expression: "soft smile, peaceful, or content",
            lighting: "diffused natural window light, warm and soft"
        },
        typography: {
            hook: "elegant minimalist sans-serif with wide tracking",
            brand: "subtle lowercase wordmark",
            details: "lightweight serif for secondary info",
            hierarchy: "brand > hook > details > contact > instagram",
            alignment: "centered or left-aligned with ample white space",
            readability: "soft contrast legibility, focus on breathing room"
        }
    },
    "auto": {
        aesthetic: "mimic the reference image style exactly",
        mood: "matched to reference image",
        colors: {
            primary: "detect from reference",
            secondary: "detect from reference",
            background: "match reference background style",
            lighting: "match reference lighting conditions"
        },
        composition: {
            structure: "replicate the structural layout of the reference image",
            depth: "match reference depth and layering",
            focus: "match reference focal points",
            safe_margins: "standard commercial margins"
        },
        visual_elements: {
            hero: "replicate elements from reference",
            background: "mimic reference backdrop",
            midground: "match reference props and environment",
            foreground: "match reference foreground elements",
            accents: "match reference decorative details"
        },
        model: {
            appearance: "match reference model ethnicity and style",
            pose: "match reference posture",
            expression: "match reference expression",
            lighting: "replicate reference model lighting"
        },
        typography: {
            hook: "match reference typographic style and weight",
            brand: "premium wordmark matching reference aesthetic",
            details: "clean legible sans-serif",
            hierarchy: "replicate reference content hierarchy",
            alignment: "centered or matched to reference",
            readability: "maintain high contrast while matching reference vibe"
        }
    }
};

const creativeTypeDimensions = {
    "Square Post": "1080 x 1080 px (1:1 aspect ratio)",
    "Portrait Post": "1080 x 1350 px (4:5 aspect ratio)",
    "Reel/Story": "1080 x 1920 px (9:16 aspect ratio)"
};

function generatePromptText(data) {
    // Health Check: Ensure basic data structure exists
    if (!data) return "Error: No input data provided.";
    
    const selectedStyle = data.design_type || "luxury instagram poster";
    const style = styleTemplates[selectedStyle] || styleTemplates["luxury instagram poster"];
    const dimensions = creativeTypeDimensions[data.creative_type] || creativeTypeDimensions["Square Post"];
    
    // Grid-based icon generation instructions
    const iconGridSystem = "Utilize a uniform grid-based vector icon system (24x24px scale) for all contact symbols and the Instagram glyph to ensure visual consistency and perfect alignment.";
    
    const contactIcons = [];
    if (data.phone) contactIcons.push(`Phone glyph (Grid-aligned): ${data.phone}`);
    if (data.whatsapp) contactIcons.push(`WhatsApp glyph (Grid-aligned): ${data.whatsapp}`);
    if (data.email) contactIcons.push(`Email glyph (Grid-aligned): ${data.email}`);
    const contactStr = contactIcons.join(' | ') || "None provided";

    // Dress Reference Handling with Festive Mode prioritization
    let wardrobeSource;
    if (data.festive_mode === 'on' && data.festive_info) {
        wardrobeSource = `PRIORITY: Apply authentic and opulent ${data.festive_info} festive attire to the model. Ensure the clothing perfectly matches the cultural and seasonal significance of the occasion. (Note: Override manual reference if necessary for superior thematic consistency).`;
    } else {
        wardrobeSource = `MANDATORY: Use the exact dress and material from the original uploaded image reference provided ${data.dress_reference ? `(${data.dress_reference})` : ''}. DO NOT alter the style, color, texture, or design. Absolute 1:1 fidelity required. The model must wear the identical garment from the reference image without any modifications.`;
    }

    // Festive Mode Logic
    let festiveInstruction = "";
    if (data.festive_mode === 'on' && data.festive_info) {
        festiveInstruction = `\n  "FESTIVE_SEASONAL_OPTIMIZATION": {
    "occasion": "${data.festive_info}",
    "directive": "Infuse the design with authentic elements of ${data.festive_info}. Adjust the lighting, background decor, and overall color grading to create the best possible festive/seasonal poster. Add subtle decorative accents (e.g., lights, flowers, or seasonal motifs) that complement the ${data.festive_info} vibe while maintaining the ${selectedStyle} aesthetic."
  },`;
    }

    const autoModeInstruction = selectedStyle === "auto" 
        ? `\n  "EXPERIMENTAL_AUTO_MODE_DIRECTIVE": "Analyze the provided reference image ${data.dress_reference ? `(${data.dress_reference})` : ''} and reverse-engineer its visual style, lighting, color palette, and composition. Replicate this detected style exactly for the new creative while inserting the new content provided.",`
        : "";

    return `Create a high-fidelity image based on the JSON-BASED DESIGN SPECIFICATION:
{
  "creative_type": "${data.creative_type || 'Social Media Post'}",${festiveInstruction}${autoModeInstruction}
  "dimensions": "${dimensions}",
  "aspect_ratio_constraint": "Strictly maintain the ${data.creative_type === 'Square Post' ? '1:1' : data.creative_type === 'Portrait Post' ? '4:5' : '9:16'} aspect ratio without cropping essential elements",
  "design_style_template": "${selectedStyle}",
  "style": {
    "aesthetic": "${style.aesthetic}",
    "mood": "${style.mood}",
    "color_palette": {
      "primary": "${style.colors.primary}",
      "secondary": "${style.colors.secondary}",
      "background": "${style.colors.background}",
      "lighting": "${style.colors.lighting}",
      "contrast_standard": "WCAG AAA minimum 7:1 for all readable text"
    },
    "composition": {
      "layout": "${data.creative_type || 'Standard'} format",
      "structure": "${style.composition.structure}",
      "depth": "${style.composition.depth}",
      "focus": "${style.composition.focus}",
      "safe_margins": "${style.composition.safe_margins}"
    },
    "visual_elements": {
      "hero_element": "${style.visual_elements.hero}",
      "background_style": "${style.visual_elements.background}",
      "midground": "${style.visual_elements.midground}",
      "foreground": "${style.visual_elements.foreground}",
      "decor_accents": "${style.visual_elements.accents}",
      "icon_standard": "${iconGridSystem}"
    },
    "model_direction": {
      "appearance": "${style.model.appearance}",
      "pose_style": "${style.model.pose}",
      "expression": "${style.model.expression}",
      "wardrobe_source": "${wardrobeSource}",
      "lighting_on_model": "${style.model.lighting}",
      "focus_priority": "model supports design, does not overpower text readability"
    },
    "typography_style": {
      "hook": "${style.typography.hook}",
      "brand": "${style.typography.brand}",
      "details": "${style.typography.details}",
      "hierarchy": "${style.typography.hierarchy}",
      "alignment": "${style.typography.alignment}",
      "readability_rules": {
        "contrast_ratio": "${style.typography.readability}",
        "avoid_busy_backgrounds": true,
        "use_text_backplates_if_needed": true,
        "mobile_first_legibility": true
      }
    },
    "finish": {
      "quality": "photorealistic and original-looking",
      "sharpness": "high clarity with shallow depth of field",
      "overall_feel": "premium cinematic digital marketing asset optimized for ${data.creative_type || 'social media'}"
    }
  },
      "content_placeholders": {
      "hook": "${data.ai_content_mode === 'on' ? 'GENERATE_AI_HOOK: Create a high-conversion attention-grabbing headline based on the brand and style.' : (data.hook || 'Headline').toUpperCase()}",
      "brand": "${data.brand || 'Brand Name'}",
      "event_offer": "${data.ai_content_mode === 'on' ? 'GENERATE_AI_OFFER: Create a compelling promotional offer or announcement matching the aesthetic.' : (data.event_offer || 'Promotional Offer')}",
      "location_details": "${data.location_details || 'Location'}",
      "contact_details": "${contactStr}",
      "instagram_handle": "${data.social_handles || '@handle'} with grid-aligned Instagram glyph"
    }
  }`;}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePromptText };
}
