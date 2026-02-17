const engine = require('../engine.js');

describe('Logo Integration', () => {
    test('should include LOGO_INTEGRATION when enabled and logos provided', () => {
        const data = {
            brand: 'Test Brand',
            enable_logo: 'on',
            logo_light: 'https://example.com/light.png',
            logo_dark: 'https://example.com/dark.png',
            creative_type: 'Square Post'
        };
        const prompt = engine.generatePromptText(data);
        expect(prompt).toMatch(/"LOGO_INTEGRATION"/);
        expect(prompt).toMatch(/https:\/\/example\.com\/light\.png/);
        expect(prompt).toMatch(/https:\/\/example\.com\/dark\.png/);
    });
});
