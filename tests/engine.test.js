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
    expect(prompt).toMatch(/"contact_details": ""/); // No fields filled
  });

  describe('Wardrobe Lock Integration', () => {
    const data = {
      brand: 'Javitri',
      hook: 'NEW ARRIVAL',
      design_type: 'luxury instagram poster',
      dress_reference: 'https://example.com/dress.jpg',
      creative_type: 'Square Post'
    };

    test('should include GLOBAL_RENDER_PRIORITY and WARDROBE_LOCK when dress_reference is provided', () => {
      const prompt = engine.generatePromptText(data);
      expect(prompt).toMatch(/"GLOBAL_RENDER_PRIORITY"/);
      expect(prompt).toMatch(/"WARDROBE_FIDELITY"/);
      expect(prompt).toMatch(/"WARDROBE_LOCK"/);
      expect(prompt).toMatch(/https:\/\/example\.com\/dress\.jpg/);
      expect(prompt).toMatch(/"no color change"/);
    });

    test('should include EXACT GARMENT LOCK in model_direction', () => {
      const prompt = engine.generatePromptText(data);
      expect(prompt).toMatch(/"wardrobe_source": "EXACT GARMENT LOCK: The model must wear the identical dress from the reference image with pixel-level fidelity/);
    });

    test('should include garment_focus in visual_elements', () => {
      const prompt = engine.generatePromptText(data);
      expect(prompt).toMatch(/"garment_focus": "Ensure the dress is clearly visible, well-lit, and unobstructed by foreground effects or fabric overlays."/);
    });

    test('should include anti_drift_rules in finish section', () => {
      const prompt = engine.generatePromptText(data);
      expect(prompt).toMatch(/"anti_drift_rules": \[/);
      expect(prompt).toMatch(/"do not redesign the outfit"/);
    });

    test('should NOT include wardrobe lock when dress_reference is missing (except for festive mode if applicable)', () => {
      const noRefData = { ...data, dress_reference: '' };
      const prompt = engine.generatePromptText(noRefData);
      expect(prompt).not.toMatch(/"GLOBAL_RENDER_PRIORITY"/);
      expect(prompt).not.toMatch(/"WARDROBE_LOCK"/);
    });
  });
});
