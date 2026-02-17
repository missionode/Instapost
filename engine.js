const creativeTypeDimensions = {
    "Square Post": { 
        size: "1080 x 1080 px (1:1)", 
        scale: "Balanced centered scaling",
        block_heights: { header: "20%", hero: "60%", footer: "20%" }
    },
    "Portrait Post": { 
        size: "1080 x 1350 px (4:5)", 
        scale: "Vertical emphasis with larger Hook area",
        block_heights: { header: "20%", hero: "60%", footer: "20%" }
    },
    "Reel/Story": { 
        size: "1080 x 1920 px (9:16)", 
        scale: "Dynamic vertical scaling, prioritized top-third Hook placement",
        block_heights: { header: "25%", hero: "50%", footer: "25%" } // More breathing room for UI
    }
};

function toTitleCase(str) {
    if (!str) return '';
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function toSentenceCase(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function isGroupMode(data) {
    // 1. Check Festive/Auto Mode subjects
    const subjects = ['subject_men', 'subject_women', 'subject_kids'];
    const count = subjects.filter(cat => data[cat] === 'on' || data[cat] === true).length;
    
    // 2. Check Artisan Collection size
    const artisanCount = data.artisan_collection ? data.artisan_collection.length : 0;
    
    // 3. Fallback to comma detection if structured data is missing
    const hasMultipleUrls = !!(data.dress_reference && data.dress_reference.includes(','));
    
    return count > 1 || artisanCount > 1 || hasMultipleUrls;
}

function deriveGridStrategy(data) {
    const groupMode = isGroupMode(data);
    
    let negativeSpaceAnchor = groupMode ? "None (Full Width Group)" : 3;
    let activeColumns = groupMode ? [1, 2, 3] : [1, 2];

    return {
        spatial_rule: "Rule of Thirds / Asymmetrical 2-of-3",
        group_mode: groupMode,
        active_columns: activeColumns,
        negative_space_anchor: negativeSpaceAnchor,
        grid_logic: groupMode 
            ? "Full-width Hero block utilized to accommodate multiple subjects in a balanced group composition."
            : "Content utilizes exactly 2 columns; 1 column remains mandatory empty negative space to ensure high-fashion editorial breathing room.",
        micro_grid: {
            footer: {
                columns: 3,
                logic: "Distribute contact details across a 3-column sub-grid. Implement content-aware wrapping for long strings (emails/locations)."
            }
        }
    };
}

function deriveContextualAesthetic(data) {
    if (data.festive_mode === 'on' && data.festive_info) {
        return {
            context: `${data.festive_info} Festive Celebration`,
            aesthetic: `Authentic ${data.festive_info} thematic elements. Shot on 35mm lens for wide environmental context, f/2.8 for gentle background separation. Warm atmospheric lighting with localized festive glow.`,
            mood: "festive, celebratory, warm, and inviting",
            colors: "rich traditional tones with warm celebratory highlights"
        };
    }

    if (data.dress_reference) {
        return {
            context: "Visual Anchor Reference Matching",
            aesthetic: "High-end editorial fashion photography. Match the specific lighting rig, lens compression, and color grade of the reference. Razor-sharp focus on garment textures.",
            mood: "Synchronized with reference image aesthetic",
            colors: "Derived from reference image palette"
        };
    }

    if (data.hook || data.event_offer) {
        const contextSubject = (data.hook || data.event_offer).toUpperCase();
        return {
            context: `Retail Commercial - ${contextSubject}`,
            aesthetic: "Clean commercial studio photography. Shot on 50mm prime lens, f/8 for deep focus. High-key lighting with soft commercial shadows and high-contrast product clarity.",
            mood: "High-energy, commercial, inviting",
            colors: "vibrant brand-centric colors with bright saturated accents"
        };
    }

    return {
        context: "Premium Minimalist Branding",
        aesthetic: "Minimalist luxury editorial. Shot on 85mm f/1.2 lens for creamy bokeh and compression. Soft natural window lighting, airy highlights, and deep focus on fine material textures.",
        mood: "Elegant, quiet luxury, sophisticated",
        colors: "Soft neutral earth tones with refined highlights"
    };
}

function generatePromptText(data) {
    if (!data) return "Error: No input data provided.";
    
    const dim = creativeTypeDimensions[data.creative_type] || creativeTypeDimensions["Square Post"];
    const aesthetic = deriveContextualAesthetic(data);
    const grid = deriveGridStrategy(data);
    
    const iconGridSystem = "Utilize a uniform grid-based vector icon system (24x24px scale) for all contact symbols and the Instagram glyph to ensure visual consistency and perfect alignment.";
    
    const contactIcons = [];
    if (data.phone) contactIcons.push(`Phone glyph: ${data.phone}`);
    if (data.whatsapp) contactIcons.push(`WhatsApp glyph: ${data.whatsapp}`);
    if (data.email) contactIcons.push(`Email glyph: ${data.email}`);
    const contactStr = contactIcons.join(' | ') || "";

    // Subject mapping (Aggregate from active anchor)
    const selectedSubjects = [];
    const mode = data.anchor_mode;
    if (mode === 'festive' || mode === 'ai') {
        if (data.subject_men === 'on' || data.subject_men === true) selectedSubjects.push("Men");
        if (data.subject_women === 'on' || data.subject_women === true) selectedSubjects.push("Women");
        if (data.subject_kids === 'on' || data.subject_kids === true) selectedSubjects.push("Kids");
    } else if (data.artisan_collection && data.artisan_collection.length > 0) {
        data.artisan_collection.forEach(item => {
            if (!selectedSubjects.includes(item.subject)) selectedSubjects.push(item.subject);
        });
    } else if (data.dress_reference) {
        // Fallback for simple single-URL Artisan mode
        selectedSubjects.push("Women"); // Default fallback
    }
    
    const subjectList = selectedSubjects.length > 0 ? selectedSubjects.join(' and ') : "Professional South Asian Indian model";

    // Regional Casting Nuance
    const region = data.location_details ? `${data.location_details}, India` : "India";
    const regionalCastingDirective = `Subtly align model features, skin tones, and regional styling with the specific South Asian Indian cultural background of ${region}.`;

    // Artisan Mapping Directive
    let collectionMappingDirective = "";
    if (data.artisan_collection && data.artisan_collection.length > 1) {
        const mappings = data.artisan_collection.map(item => `Model: ${item.subject} -> URL: ${item.url}`).join(' | ');
        collectionMappingDirective = `\n  "ARTISAN_COLLECTION_MAPPING": "${mappings}",`;
    }

    // Wardrobe Lock Strategy Integration
    let wardrobeLockBlock = "";
    let globalPriorityBlock = "";
    let antiDriftRules = "";
    let garmentFocus = "";

        // Dress Reference Handling
        let wardrobeSource;
        if ((data.anchor_mode === 'festive' && data.festive_info) || data.anchor_mode === 'ai') {
            const attireDirectives = [];
            if (selectedSubjects.includes("Men")) attireDirectives.push("Opulent Traditional Kurta/Sherwani");
            if (selectedSubjects.includes("Women")) attireDirectives.push("High-Fashion Saree/Lehenga");
            if (selectedSubjects.includes("Kids")) attireDirectives.push("Coordinated Festive Mini-wear");
            
            const attireText = attireDirectives.length > 0 ? attireDirectives.join(', ') : "Authentic Festive Attire";
            const contextNote = data.anchor_mode === 'festive' ? `matches the cultural and seasonal significance of ${data.festive_info}` : "aligns with the derived marketing context";
            
            wardrobeSource = `PRIORITY: Apply ${attireText} to the models. Ensure the clothing perfectly ${contextNote}. (Note: This mode prioritizes thematic consistency over manual reference).`;
        } else {                const isDirectUpload = data.artisan_direct_upload === 'on' || data.artisan_direct_upload === true;
                const refLabel = isDirectUpload && !data.dress_reference ? "image uploaded" : (data.dress_reference || "");
                const refText = refLabel ? `(Reference: ${refLabel})` : '';
                
                if (refLabel) {
                    globalPriorityBlock = `\n  "GLOBAL_RENDER_PRIORITY": {    "order_of_importance": [
      "WARDROBE_FIDELITY",
      "FACE_REALISM",
      "TEXT_READABILITY",
      "SCENE_STYLING"
    ],
    "rule": "Higher priority items override lower priority styling instructions."
  },`;

            wardrobeLockBlock = `${collectionMappingDirective}\n  "WARDROBE_LOCK": {
    "priority": "MAXIMUM — ANCHOR TO REFERENCE",
    "rule": "The model(s) MUST wear garments with strict visual consistency to the reference image(s). This is the primary visual anchor for the generation. Transfer the garment from the reference image onto live models. MANDATORY: Ignore and suppress all mannequin parts, studio backgrounds, or catalog-style environments from the source. The background MUST be derived from the 'design_blueprint' context, not the reference image.",
    "artisan_fidelity_requirements": {
      "micro_patterns": "Preserve micro-level embroidery density and motif spacing; do not simplify patterns.",
      "fabric_physics": "Maintain the specific garment structure, cut, and drape physics of the original material.",
      "color_accuracy": "Maintain exact color palette and hue from reference without adaptive shifting."
    },
    "reference_image": "${data.dress_reference || (isDirectUpload ? 'image uploaded' : '')}",
    "anchored_attributes": {
      "color_fidelity": "Maintain exact color palette and hue from reference",
      "silhouette": "Preserve the specific garment structure, cut, and drape",
      "surface_details": "Replicate the pattern type, embroidery style, and fabric texture exactly."
    },
    "hard_constraints": [
      "do not change primary color",
      "do not alter garment silhouette",
      "do not substitute pattern style",
      "do not add extraneous stylistic embellishments",
      "forbid flat catalog lighting",
      "forbid mannequin posture",
      "forbid product-only framing",
      "forbid usage of reference image background"
    ],
    "hard_failure_rule": "If the system cannot maintain ≥95% visual fidelity to the reference garment, the generation must be aborted rather than approximated."
  },`;

            wardrobeSource = `STRICT VISUAL CONSISTENCY LOCK: The model(s) must wear garment(s) that are visually identical in color, silhouette, and micro-level embroidery pattern to the reference image(s). MANDATORY: Suppress the background from the reference image. If ≥95% visual fidelity cannot be maintained, abort. ${refText}`;

            antiDriftRules = `\n      "anti_drift_rules": [
        "do not redesign the outfit",
        "do not restyle the garment",
        "do not substitute similar but different dresses",
        "do not simplify the core embroidery or pattern structure",
        "preserve the original garment silhouette and fabric drape physics"
      ],`;

            garmentFocus = `\n      "garment_focus": "The garment(s) must be the primary focal point, clearly visible and unobstructed. Deprioritize environmental effects (like fabric overlays or haze) that obscure the garment's original color and detail. Suppress all mannequin or catalog artifacts from the reference.",`;
        } else {
            wardrobeSource = `MANDATORY: Use the exact dress and material from the original uploaded image reference provided ${refText}. DO NOT alter the style, color, texture, or design. Absolute 1:1 fidelity required. The model must wear the identical garment from the reference image without any modifications.`;
        }
    }

    // Logo Logic
    let logoInstruction = "";
    const isLogoEnabled = data.enable_logo === 'on' || data.enable_logo === true;
    const hasLogoData = data.logo_light || data.logo_dark;

    if (isLogoEnabled && hasLogoData) {
        logoInstruction = `\n  "LOGO_INTEGRATION": {
    "is_logo_mandatory": true,
    "light_version": "${data.logo_light || 'None provided'}",
    "dark_version": "${data.logo_dark || 'None provided'}",
    "usage_rule": "Select the version with maximum contrast against the generated background. Use 'Light Logo' for Dark/Rich backgrounds and 'Dark Logo' for Light/Airy backgrounds.",
    "sizing_rule": "Scale the logo proportionally based on height to occupy a very subtle 5-8% of the header block height. The logo must feel like a discrete luxury watermark, not a primary graphic element.",
    "alignment_strategy": "The AI must dynamically determine the optimal horizontal placement (Left, Center, or Right) within the header block to achieve maximum aesthetic balance against the model's position and negative space. Do not force-center if an asymmetrical placement feels more premium.",
    "rendering_instruction": "Maintain absolute aspect ratio. Ensure clear negative space around the logo (padding equal to 150% of logo height) for visibility. If a logo is provided, it MUST be the primary brand identifier; do not generate the brand name in text if the logo is present."
  },`;
    }

    // Capitalization handling
    const brandName = toTitleCase(data.brand || 'Brand Name');
    
    // Robust check for AI Content Mode
    const isAICopyActive = data.ai_content_mode === 'on' || data.ai_content_mode === true;
    
    // Explicitly derive final text for placeholders
    const finalHook = isAICopyActive 
        ? 'MANDATORY: Generate a conversion-optimized luxury fashion headline (HOOK). Do not use generic placeholders. Must align with branding.' 
        : (data.hook || 'Headline').toUpperCase();

    const finalOffer = isAICopyActive 
        ? 'MANDATORY: Generate a high-impact promotional offer or event detail. Do not use generic phrases like "Visit our boutique" unless specifically appropriate. Must be punchy.' 
        : toSentenceCase(data.event_offer || 'Promotional Offer');

    return `Create a high-fidelity image based on the JSON-BASED DESIGN SPECIFICATION:
{
  "creative_type": "${data.creative_type || 'Social Media Post'}",${globalPriorityBlock}${wardrobeLockBlock}${logoInstruction}
  "dimensions": "${dim.size}",
  "aspect_ratio_constraint": "Strictly maintain aspect ratio without cropping",
  "composition_grid": {
    "spatial_rule": "${grid.spatial_rule}",
    "group_mode": ${grid.group_mode},
    "active_columns": [${grid.active_columns.join(', ')}],
    "negative_space_anchor": "${grid.negative_space_anchor}",
    "block_heights": {
      "header": "${dim.block_heights.header}",
      "hero": "${dim.block_heights.hero}",
      "footer": "${dim.block_heights.footer}"
    },
    "logic": "${grid.grid_logic}",
    "micro_grid": {
      "footer_columns": ${grid.micro_grid.footer.columns},
      "footer_logic": "${grid.micro_grid.footer.logic}"
    }
  },
  "design_blueprint": {
    "context": "${aesthetic.context}",
    "mood": "${aesthetic.mood}",
    "aesthetic_directives": "${aesthetic.aesthetic}",
    "color_strategy": "${aesthetic.colors}",
    "custom_aesthetic_notes": "${data.custom_styling || ''}",
    "note": "Custom aesthetic notes are supplementary enrichment and MUST NOT override WARDROBE_LOCK or micro-level embroidery protection."
  },
  "layout_standards": {
    "header_block": {
      "content": "Brand Identity and Attention Hook",
      "alignment": "Top-aligned. Position elements dynamically to balance against the model's stance. Utilize asymmetrical alignment if it enhances the high-fashion editorial feel."
    },
    "hero_block": {
      "content": "Primary Model(s) and Garment Focus",
      "alignment": "${grid.group_mode ? 'Harmonious group composition spanning all active columns' : 'Central vertical focus, maintain negative space anchor'}",
      "protection": "Ensure hero element remains unobstructed by text or effects"
    },
    "footer_block": {
      "content": "Marketing Offer and Contact Details",
      "alignment": "Bottom-aligned, utilize sub-grid for data points",
      "wrapping_rules": "Content-aware wrapping: long strings must wrap within column bounds or span maximum 2 columns."
    }
  },
  "style": {
    "visual_elements": {
      "hero_element": "${grid.group_mode ? 'Group of professional South Asian Indian models (' + subjectList + ') in a harmonious stance' : 'Live professional South Asian Indian model (' + subjectList + ') with natural high-fashion stance'}",${garmentFocus}
      "background_strategy": "Generate a dynamic, context-aware environment that aligns with the '${aesthetic.context}' blueprint. Utilize shallow depth-of-field (bokeh) to maintain focus on the hero. The background must be an original composition derived by AI, not a replica of any reference.",
      "icon_standard": "${iconGridSystem}"
    },
    "model_direction": {
      "appearance": "South Asian Indian celebrity-like professional models. Capture hyper-detailed skin textures, fine facial features, and realistic hair flyaways.",
      "regional_casting_nuance": "${regionalCastingDirective}",
      "camera_specs": "Shot on high-end full-frame camera. 85mm prime lens for single subjects (portrait compression) or 35mm for groups. Razor-sharp eye focus.",
      "pose_style": "${grid.group_mode ? 'Harmonious group stance, balanced distribution, realistic fabric fall' : 'Natural high-fashion stance with realistic fabric fall. Maintain poise while prioritizing correct garment drape physics.'}",
      "expression": "Warm, premium, approachable confidence",
      "wardrobe_source": "${wardrobeSource}"
    },
    "typography_style": {
      "hierarchy": "logo > hook > brand > offer > event details > contact > instagram",
      "alignment": "Balanced asymmetrical alignment based on active grid columns",
      "responsive_scaling": "${dim.scale}",
      "readability_rules": {
        "contrast_ratio": "minimum 7:1 contrast ratio (WCAG AAA)",
        "mobile_first_legibility": true
      }
    },
    "finish": {
      "quality": "Analog film-like fidelity with modern digital clarity. Zero AI-plasticity. Hyper-realistic fabric micro-textures and visible material grains.",
      "overall_feel": "Premium cinematic fashion campaign shot for ${data.creative_type}"
    }
  },
  "content_placeholders": {
    "brand_logo": "${(data.logo_light || data.logo_dark || data.logo_direct_upload) ? 'RENDER_PROVIDED_LOGO' : 'RENDER_BRAND_NAME_AS_TEXT'}",
    "hook": "${finalHook}",
    "brand_name": "${brandName}",
    "event_offer": "${finalOffer}",
    "location_details": "${data.location_details || 'Location'}",
    "contact_details": "${contactStr}",
    "instagram_handle": "${data.social_handles || '@handle'} with grid-aligned Instagram glyph"
  }
}`;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePromptText };
}
