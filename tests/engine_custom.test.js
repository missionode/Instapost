const { generatePromptText } = require('../engine.js');

describe('Artisan Custom Instructions', () => {
  test('should include custom_aesthetic_notes in the design_blueprint', () => {
    const data = {
      brand: 'Vedah',
      creative_type: 'Square Post',
      anchor_mode: 'artisan',
      artisan_custom_instructions: 'Soft golden hour lighting, cinematic bokeh'
    };
    
    const prompt = generatePromptText(data);
    expect(prompt).toContain('"custom_aesthetic_notes": "Soft golden hour lighting, cinematic bokeh"');
  });

  test('should include constraint hierarchy warning for custom instructions', () => {
    const data = {
      brand: 'Vedah',
      creative_type: 'Square Post',
      anchor_mode: 'artisan',
      artisan_custom_instructions: 'Soft lighting',
      dress_reference: 'http://example.com/dress.jpg'
    };
    
    const prompt = generatePromptText(data);
    expect(prompt).toMatch(/custom_aesthetic_notes[\s\S]*MUST NOT override WARDROBE_LOCK/i);
  });
});
