import test from 'node:test';
import assert from 'node:assert/strict';
import { renderHome, renderProduct, renderReviewOnly } from '../public/render.js';
import { getProduct } from '../public/domain.js';

test('home renders the review guard and core product CTA', () => {
  const html = renderHome();
  assert.match(html, /Konzept-Demo/);
  assert.match(html, /HeadBlade MOTO/);
  assert.match(html, /MOTO ansehen/);
});

test('product rendering never presents a live buy or payment action', () => {
  const html = renderProduct(getProduct('headblade-moto'));
  assert.match(html, /Review-Preview/);
  assert.doesNotMatch(html, /Jetzt bezahlen|PayPal|Kreditkarte|Bestellung absenden/i);
});

test('checkout path is explicitly blocked in review mode', () => {
  const html = renderReviewOnly();
  assert.match(html, /Checkout ist in dieser Preview deaktiviert/);
});
