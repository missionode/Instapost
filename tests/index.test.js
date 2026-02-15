const fs = require('fs');
const path = require('path');

describe('index.html structure', () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  });

  test('should have a DOCTYPE html', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i);
  });

  test('should have a lang attribute set to en', () => {
    expect(html).toMatch(/<html lang="en">/i);
  });

  test('should link to Bootstrap 5 CSS CDN', () => {
    expect(html).toMatch(/https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5/);
  });

  test('should have a title tag with Instapost', () => {
    expect(html).toMatch(/<title>Instapost<\/title>/i);
  });
});
