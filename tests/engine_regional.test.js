const engine = require('../engine.js');

describe('Regional Context Integration', () => {
    const baseData = {
        brand: 'Vedah',
        hook: 'NEW ARRIVAL',
        creative_type: 'Portrait Post',
        location_details: 'Thiruvananthapuram, Kerala'
    };

    test('should include hardcoded South Asian Indian identity in model appearance', () => {
        const prompt = engine.generatePromptText(baseData);
        expect(prompt).toMatch(/"appearance": "South Asian Indian celebrity-like professional models"/i);
    });

    test('should inject dynamic regional casting directive based on City and State', () => {
        const prompt = engine.generatePromptText(baseData);
        expect(prompt).toMatch(/"regional_casting_nuance": "Subtly align model features, skin tones, and regional styling with the specific South Asian Indian cultural background of Thiruvananthapuram, Kerala, India."/i);
    });

    test('should handle empty location details gracefully with default India context', () => {
        const sparseData = { ...baseData, location_details: '' };
        const prompt = engine.generatePromptText(sparseData);
        expect(prompt).toMatch(/South Asian Indian cultural background of India/i);
    });
});
