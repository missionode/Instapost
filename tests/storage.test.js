const storage = require('../storage.js');

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveBrandData should save data to localStorage', () => {
    const data = { brand: 'Test Brand', hook: 'Test Hook' };
    storage.saveBrandData(data);
    const saved = JSON.parse(localStorage.getItem('instapost_brand_data'));
    expect(saved.brand).toBe('Test Brand');
  });

  test('loadBrandData should retrieve data from localStorage', () => {
    localStorage.setItem('instapost_brand_data', JSON.stringify({ brand: 'Saved' }));
    const data = storage.loadBrandData();
    expect(data.brand).toBe('Saved');
  });

  test('loadBrandData should return null if no data exists', () => {
    const data = storage.loadBrandData();
    expect(data).toBeNull();
  });
});
