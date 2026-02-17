const engine = require('../engine.js');

describe('Structural Layout & Grid System', () => {
    const baseData = {
        brand: 'Vedah',
        hook: 'NEW ARRIVAL',
        event_offer: '50% OFF',
        creative_type: 'Portrait Post',
        location_details: 'Thiruvananthapuram',
        social_handles: '@vedah'
    };

    test('should include composition_grid with macro-grid rules', () => {
        const prompt = engine.generatePromptText(baseData);
        expect(prompt).toMatch(/"composition_grid"/i);
        expect(prompt).toMatch(/"spatial_rule": "Rule of Thirds \/ Asymmetrical 2-of-3"/i);
    });

    test('should implement asymmetrical 2-of-3 column logic', () => {
        const prompt = engine.generatePromptText(baseData);
        // Should have active_columns and negative_space_anchor
        expect(prompt).toMatch(/"active_columns": \[/);
        expect(prompt).toMatch(/"negative_space_anchor":/);
        
        // Ensure active columns are exactly 2
        const match = prompt.match(/"active_columns": \[(\d+), (\d+)\]/);
        expect(match).toBeTruthy();
        const col1 = parseInt(match[1]);
        const col2 = parseInt(match[2]);
        expect(col1).not.toBe(col2);
    });

    test('should handle block-specific layout standards', () => {
        const prompt = engine.generatePromptText(baseData);
        expect(prompt).toMatch(/"header_block"/i);
        expect(prompt).toMatch(/"hero_block"/i);
        expect(prompt).toMatch(/"footer_block"/i);
    });

    test('should adjust grid strategy for Reel/Story format', () => {
        const reelData = { ...baseData, creative_type: 'Reel/Story' };
        const prompt = engine.generatePromptText(reelData);
        expect(prompt).toMatch(/"creative_type": "Reel\/Story"/);
        // Reel should have different block height distribution (to avoid UI)
        expect(prompt).toMatch(/"block_heights"/);
    });
});
