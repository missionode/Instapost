const engine = require('../engine.js');

describe('Multi-Subject Composition System', () => {
    const baseData = {
        brand: 'Vedah',
        hook: 'FAMILY COLLECTION',
        creative_type: 'Portrait Post',
        location_details: 'Thiruvananthapuram'
    };

    test('should detect Group Mode when multiple categories are selected', () => {
        const groupData = {
            ...baseData,
            subject_men: 'on',
            subject_women: 'on'
        };
        const prompt = engine.generatePromptText(groupData);
        expect(prompt).toMatch(/"group_mode": true/i);
        expect(prompt).toMatch(/"active_columns": \[1, 2, 3\]/); // Grid expansion
    });

    test('should detect Group Mode when multiple URLs are provided', () => {
        const multiUrlData = {
            ...baseData,
            dress_reference: 'https://example.com/dress1.jpg, https://example.com/dress2.jpg',
            subject_women: 'on'
        };
        const prompt = engine.generatePromptText(multiUrlData);
        expect(prompt).toMatch(/"group_mode": true/i);
        expect(prompt).toMatch(/"active_columns": \[1, 2, 3\]/);
    });

    test('should include category-specific attire directives in Festive Mode', () => {
        const festiveGroupData = {
            ...baseData,
            festive_mode: 'on',
            festive_info: 'Diwali',
            subject_men: 'on',
            subject_kids: 'on'
        };
        const prompt = engine.generatePromptText(festiveGroupData);
        expect(prompt).toMatch(/Opulent Traditional Kurta\/Sherwani/i);
        expect(prompt).toMatch(/Coordinated Festive Mini-wear/i);
    });

    test('should apply Individual Artisan Fidelity to multiple references', () => {
        const multiArtisanData = {
            ...baseData,
            dress_reference: 'https://example.com/men.jpg, https://example.com/women.jpg',
            subject_men: 'on',
            subject_women: 'on'
        };
        const prompt = engine.generatePromptText(multiArtisanData);
        expect(prompt).toMatch(/https:\/\/example\.com\/men\.jpg/);
        expect(prompt).toMatch(/https:\/\/example\.com\/women\.jpg/);
        expect(prompt).toMatch(/Artisan Fidelity rules to each individual reference/i);
    });
});
