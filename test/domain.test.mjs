import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, resolveRoute, searchProducts, products } from '../public/domain.js';

test('formats German euro prices and marks unknown preview prices', () => {
  assert.match(formatPrice(21.95), /21,95/);
  assert.equal(formatPrice(null), 'Preis vor Livegang bestätigen');
});

test('finds products by name and compatibility text', () => {
  assert.equal(searchProducts('MOTO').some((p) => p.slug === 'headblade-moto'), true);
  assert.equal(searchProducts('HB6').some((p) => p.slug === 'klingenset-6blade'), true);
});

test('resolves product detail routes and rejects unknown products', () => {
  assert.deepEqual(resolveRoute('/produkt/headblade-moto'), { kind: 'product', slug: 'headblade-moto' });
  assert.deepEqual(resolveRoute('/produkt/gibt-es-nicht'), { kind: 'not-found' });
});

test('review build exposes no live checkout', () => {
  assert.deepEqual(resolveRoute('/checkout'), { kind: 'review-only' });
  assert.ok(products.length >= 8);
});
