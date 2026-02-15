const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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

  test('should link to style.css', () => {
    expect(html).toMatch(/<link href="style.css" rel="stylesheet">/);
  });

  test('should have a title tag with Instapost', () => {
    expect(html).toMatch(/<title>Instapost<\/title>/i);
  });
});

describe('index.html form elements', () => {
  const { JSDOM } = require('jsdom');
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test('should have a form with id "instapost-form"', () => {
    expect(document.getElementById('instapost-form')).toBeTruthy();
  });

  test('should have a design_type input/select', () => {
    expect(document.querySelector('[name="design_type"]')).toBeTruthy();
  });

  test('should have a style description area', () => {
    expect(document.getElementById('style-description')).toBeTruthy();
  });

  test('should have a dress_reference input', () => {
    expect(document.querySelector('[name="dress_reference"]')).toBeTruthy();
  });

  test('should have content fields: hook, brand, event_offer, location_details, social_handles', () => {
    expect(document.querySelector('[name="hook"]')).toBeTruthy();
    expect(document.querySelector('[name="brand"]')).toBeTruthy();
    expect(document.querySelector('[name="event_offer"]')).toBeTruthy();
    expect(document.querySelector('[name="location_details"]')).toBeTruthy();
    expect(document.querySelector('[name="social_handles"]')).toBeTruthy();
  });

  test('should have separate contact fields: phone, whatsapp, email', () => {
    expect(document.querySelector('[name="phone"]')).toBeTruthy();
    expect(document.querySelector('[name="whatsapp"]')).toBeTruthy();
    expect(document.querySelector('[name="email"]')).toBeTruthy();
  });

  test('should have a "Generate Prompt" button', () => {
    expect(document.getElementById('generate-btn')).toBeTruthy();
  });

  test('should have an output area for the prompt', () => {
    expect(document.getElementById('prompt-output')).toBeTruthy();
  });

  test('should have data management buttons: download and upload', () => {
    expect(document.getElementById('download-db-btn')).toBeTruthy();
    expect(document.getElementById('upload-db-btn')).toBeTruthy();
  });
});
