const engine = require('../engine.js');

describe('Simplified Contextual Engine (Blueprint)', () => {
    const baseData = {
        brand: 'Vedah',
        hook: 'NEW ARRIVAL',
        event_offer: '50% OFF',
        creative_type: 'Portrait Post',
        location_details: 'Thiruvananthapuram',
        social_handles: '@vedah'
    };

    test('should prioritize Festive Mode vibe over everything else', () => {
        const festiveData = {
            ...baseData,
            festive_mode: 'on',
            festive_info: 'Diwali',
            dress_reference: 'https://example.com/dress.jpg'
        };
        const prompt = engine.generatePromptText(festiveData);
        expect(prompt).toMatch(/"context": "Diwali/i);
        expect(prompt).toMatch(/"mood": "festive, celebratory, warm/i);
        // Should NOT have the Wardrobe Lock V2 specific "Strict Visual Consistency" in the source if festive prioritizes thematic
        // Wait, the spec says "Note: This mode prioritizes thematic consistency over manual reference"
        expect(prompt).toMatch(/PRIORITY: Apply authentic and opulent Diwali festive attire/i);
    });

    test('should anchor aesthetic to Reference Image if festive mode is off', () => {
        const refData = {
            ...baseData,
            dress_reference: 'https://example.com/dress.jpg'
        };
        const prompt = engine.generatePromptText(refData);
        expect(prompt).toMatch(/"context": "Visual Anchor Reference Matching"/i);
        expect(prompt).toMatch(/"WARDROBE_LOCK"/);
        expect(prompt).toMatch(/STRICT VISUAL CONSISTENCY LOCK/i);
        expect(prompt).toMatch(/Preserve micro-level embroidery density/i);
        expect(prompt).toMatch(/forbid mannequin posture/i);
        expect(prompt).toMatch(/natural high-fashion stance/i);
    });

    test('should derive aesthetic from Content (Hook/Offer) if no image/festival', () => {
        const contentData = {
            ...baseData,
            hook: 'SUMMER SALE',
            event_offer: 'Flat 20% Off'
        };
        const prompt = engine.generatePromptText(contentData);
        expect(prompt).toMatch(/"context": "Retail Commercial - SUMMER SALE"/i);
        expect(prompt).toMatch(/"mood": "High-energy, commercial, inviting"/i);
    });

    test('should fallback to Premium Minimalist if all context is sparse', () => {
        const minimalData = {
            brand: 'Minimalist',
            creative_type: 'Square Post'
        };
        const prompt = engine.generatePromptText(minimalData);
        expect(prompt).toMatch(/"context": "Premium Minimalist Branding"/i);
        expect(prompt).toMatch(/"mood": "Elegant, quiet luxury, sophisticated"/i);
    });

    test('should maintain Layout & Typography Guardrails', () => {
        const prompt = engine.generatePromptText(baseData);
        expect(prompt).toMatch(/"composition_grid"/);
        expect(prompt).toMatch(/"block_heights"/);
        expect(prompt).toMatch(/"typography_style"/);
    });
});
