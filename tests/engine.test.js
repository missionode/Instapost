const engine = require('../engine.js');

describe('Prompt Generation Engine', () => {
  test('generatePromptText should include brand and hook', () => {
    const data = {
        brand: 'Javitri',
        hook: 'NEW ARRIVAL',
        design_type: 'luxury instagram poster',
        event_offer: '50% OFF',
        location_details: 'Mumbai',
        social_handles: '@javitri'
    };
    const prompt = engine.generatePromptText(data);
    expect(prompt).toMatch(/Javitri/);
    expect(prompt).toMatch(/NEW ARRIVAL/i);
  });

  test('generatePromptText should include style-specific keywords for luxury style', () => {
    const data = {
        design_type: 'luxury instagram poster',
        brand: 'Test',
        hook: 'Test',
        event_offer: 'Test',
        location_details: 'Test',
        social_handles: 'Test'
    };
    const prompt = engine.generatePromptText(data);
    expect(prompt).toMatch(/cinematic/i);
    expect(prompt).toMatch(/gold/i);
    expect(prompt).toMatch(/South Asian/i);
  });

  test('generatePromptText should handle missing contact fields gracefully', () => {
    const data = {
        design_type: 'fashion editorial',
        brand: 'Test',
        hook: 'Test',
        event_offer: 'Test',
        location_details: 'Test',
        social_handles: 'Test'
    };
    const prompt = engine.generatePromptText(data);
    expect(prompt).toMatch(/Contact: ""/); // No fields filled
  });
});
