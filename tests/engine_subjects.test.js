const engine = require('../engine.js');

describe('Multi-Subject Composition System (Collection Builder)', () => {
    const baseData = {
        brand: 'Vedah',
        hook: 'FAMILY COLLECTION',
        creative_type: 'Portrait Post',
        location_details: 'Thiruvananthapuram'
    };

    test('should detect Group Mode when multiple categories are selected in Festive', () => {
        const groupData = {
            ...baseData,
            festive_mode: 'on',
            festive_subject_men: 'on',
            festive_subject_women: 'on'
        };
        const prompt = engine.generatePromptText(groupData);
        expect(prompt).toMatch(/"group_mode": true/i);
        expect(prompt).toMatch(/"active_columns": \[1, 2, 3\]/);
    });

    test('should detect Group Mode when Artisan Collection has multiple items', () => {
        const multiArtisanData = {
            ...baseData,
            artisan_collection: [
                { url: 'https://example.com/dress1.jpg', subject: 'Women' },
                { url: 'https://example.com/dress2.jpg', subject: 'Men' }
            ],
            dress_reference: 'https://example.com/dress1.jpg, https://example.com/dress2.jpg'
        };
        const prompt = engine.generatePromptText(multiArtisanData);
        expect(prompt).toMatch(/"group_mode": true/i);
        expect(prompt).toMatch(/"ARTISAN_COLLECTION_MAPPING":/);
        expect(prompt).toMatch(/Model: Women -> URL: https:\/\/example\.com\/dress1\.jpg/);
    });

    test('should include category-specific attire directives in Festive Mode', () => {
        const festiveGroupData = {
            ...baseData,
            festive_mode: 'on',
            festive_info: 'Diwali',
            festive_subject_men: 'on',
            festive_subject_kids: 'on'
        };
        const prompt = engine.generatePromptText(festiveGroupData);
        expect(prompt).toMatch(/Opulent Traditional Kurta\/Sherwani/i);
        expect(prompt).toMatch(/Coordinated Festive Mini-wear/i);
    });

    test('should apply Individual Artisan Fidelity rules using collection mapping', () => {
        const multiArtisanData = {
            ...baseData,
            artisan_collection: [
                { url: 'https://example.com/men.jpg', subject: 'Men' },
                { url: 'https://example.com/women.jpg', subject: 'Women' }
            ],
            dress_reference: 'https://example.com/men.jpg, https://example.com/women.jpg'
        };
        const prompt = engine.generatePromptText(multiArtisanData);
        expect(prompt).toMatch(/Apply Artisan Fidelity rules to each individual reference provided in the collection mapping/i);
    });
});
