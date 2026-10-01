# HeadBlade Germany Commerce: Google Ecosystem & Fullstack Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementierung eines vollständigen, DSGVO- und Google-Shopping-konformen Ökosystems (Google Merchant Center RSS 2.0 XML Feed, erweiterte Schema.org Product- und ReturnPolicy-Metadaten, GA4 DTC Enhanced E-Commerce Funnel inklusive Abo-Replenishment-Parametern, Google Ads Dynamic Remarketing und SHA-256 Enhanced Conversions) für HeadBlade Deutschland.

**Architecture:** Astro 5 Static/SSR mit TypeScript 5 und Tailwind CSS. Der Google Merchant Center Feed wird über einen typsicheren RSS 2.0 XML Generator betrieben. Alle Produkt- und Kategorie-Seiten erhalten semantisch valide JSON-LD-Graph-Strukturen (`Product`, `Offer`, `MerchantReturnPolicy`, `ShippingDetails`). Der GA4-Event-Bus synchronisiert Warenkorb- und Checkout-Ereignisse mit Google Tag Manager.

**Tech Stack:** Astro 5, TypeScript 5, Tailwind CSS, Vitest 4, Google Merchant Center RSS 2.0 Spezifikation, Google Consent Mode v2, Google Tag Manager / GA4 Enhanced E-Commerce, Schema.org (Product, Offer, AggregateRating).

## Global Constraints

- Keine direkten Root-Dateien in `$HOME` (Zero-Root-Pollution).
- Vollständige Typsicherheit ohne `any` oder ungetypte Feed-Objekte.
- Google Merchant Center Konformität: Alle Pflichtfelder (`g:id`, `g:title`, `g:description`, `g:link`, `g:image_link`, `g:availability`, `g:price`, `g:brand`, `g:gtin`, `g:condition`) müssen valide Werte liefern.
- Keine Platzhalter, kein `// TODO`, kein Pseudocode.
- 100% DSGVO-Konformität: Consent Mode v2 steuert Tracking und Remarketing-Pixel.
- Test-First (TDD): Jeder Task verfügt über automatisierte Vitest-Tests mit 100% Pass-Rate.
- Alle Kommunikations- und UI-Texte sind auf professionellem Hochdeutsch verfasst.

---

### Task 1: Google Merchant Center RSS 2.0 XML Feed Generator

**Files:**
- Create: `src/lib/feeds/google-merchant.ts`
- Create: `src/pages/api/feed/google-merchant.xml.ts`
- Test: `test/google-merchant-feed.test.ts`

**Interfaces:**
- Consumes: `Product` catalog items from `src/data/products.json` or catalog domain
- Produces: `generateMerchantXml(baseUrl: string, products: FeedProductItem[]): string`

```typescript
export interface FeedProductItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  priceEur: number;
  gtin?: string;
  mpn?: string;
  brand: string;
  googleProductCategory?: string;
  isSubscriptionEligible?: boolean;
}
```

- [ ] **Step 1: Write the failing test**

```typescript
// test/google-merchant-feed.test.ts
import { describe, it, expect } from 'vitest';
import { generateMerchantXml } from '../src/lib/feeds/google-merchant';

describe('Google Merchant Center RSS 2.0 Feed Generator', () => {
  it('generates valid Google Merchant XML RSS 2.0 feed with namespace and items', () => {
    const xml = generateMerchantXml('https://headblade.de', [
      {
        id: 'hb-moto-razor',
        title: 'HeadBlade MOTO Kopfrasierer',
        description: 'Innovativer Rasierer mit Rollkugel-Technologie für eine perfekte Kopfglatze.',
        link: 'https://headblade.de/produkt/headblade-moto',
        imageLink: 'https://headblade.de/images/products/moto-1.webp',
        availability: 'in_stock',
        priceEur: 24.95,
        gtin: '0854382001019',
        mpn: 'HB-MOTO-01',
        brand: 'HeadBlade',
        googleProductCategory: 'Health & Beauty > Personal Care > Shaving & Grooming'
      }
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">');
    expect(xml).toContain('<title>HeadBlade Deutschland Produkt-Feed</title>');
    expect(xml).toContain('<g:id>hb-moto-razor</g:id>');
    expect(xml).toContain('<g:title>HeadBlade MOTO Kopfrasierer</g:title>');
    expect(xml).toContain('<g:price>24.95 EUR</g:price>');
    expect(xml).toContain('<g:availability>in_stock</g:availability>');
    expect(xml).toContain('<g:brand>HeadBlade</g:brand>');
    expect(xml).toContain('<g:condition>new</g:condition>');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/google-merchant-feed.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/feeds/google-merchant.ts
export interface FeedProductItem {
  id: string;
  title: string;
  description: string;
  link: string;
  imageLink: string;
  availability: 'in_stock' | 'out_of_stock' | 'preorder';
  priceEur: number;
  gtin?: string;
  mpn?: string;
  brand: string;
  googleProductCategory?: string;
  isSubscriptionEligible?: boolean;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function generateMerchantXml(baseUrl: string, products: FeedProductItem[]): string {
  const itemsXml = products.map(p => {
    const formattedPrice = `${p.priceEur.toFixed(2)} EUR`;
    return `    <item>
      <g:id>${escapeXml(p.id)}</g:id>
      <g:title>${escapeXml(p.title)}</g:title>
      <g:description>${escapeXml(p.description)}</g:description>
      <g:link>${escapeXml(p.link)}</g:link>
      <g:image_link>${escapeXml(p.imageLink)}</g:image_link>
      <g:availability>${p.availability}</g:availability>
      <g:price>${formattedPrice}</g:price>
      <g:brand>${escapeXml(p.brand)}</g:brand>
      <g:condition>new</g:condition>
      ${p.gtin ? `<g:gtin>${escapeXml(p.gtin)}</g:gtin>` : ''}
      ${p.mpn ? `<g:mpn>${escapeXml(p.mpn)}</g:mpn>` : ''}
      ${p.googleProductCategory ? `<g:google_product_category>${escapeXml(p.googleProductCategory)}</g:google_product_category>` : ''}
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>DHL Standard</g:service>
        <g:price>3.90 EUR</g:price>
      </g:shipping>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>HeadBlade Deutschland Produkt-Feed</title>
    <link>${baseUrl}</link>
    <description>Offizieller Produktkatalog für Google Shopping und Google Merchant Center</description>
${itemsXml}
  </channel>
</rss>`;
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/google-merchant-feed.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/feeds/google-merchant.ts test/google-merchant-feed.test.ts
git commit -m "feat(feeds): add Google Merchant Center RSS 2.0 XML generator"
```

---

### Task 2: Advanced E-Commerce Structured Data (Product & Return Policy Schema)

**Files:**
- Create: `src/lib/seo/product-schema.ts`
- Modify: `src/pages/produkt/[slug].astro`
- Test: `test/product-schema.test.ts`

**Interfaces:**
- Produces: `generateProductJsonLd(product: ProductDetails): Record<string, any>`

```typescript
export interface ProductDetails {
  id: string;
  name: string;
  sku: string;
  gtin: string;
  description: string;
  images: string[];
  priceEur: number;
  inStock: boolean;
  ratingValue: number;
  reviewCount: number;
  subscriptionDiscountPercent?: number;
}
```

- [ ] **Step 1: Write failing test**

```typescript
// test/product-schema.test.ts
import { describe, it, expect } from 'vitest';
import { generateProductJsonLd } from '../src/lib/seo/product-schema';

describe('Advanced Product JSON-LD Schema Generator', () => {
  it('generates schema.org/Product with Offer, AggregateRating and MerchantReturnPolicy', () => {
    const jsonLd = generateProductJsonLd({
      id: 'moto-razor',
      name: 'HeadBlade MOTO Rasierer',
      sku: 'HB-MOTO-01',
      gtin: '0854382001019',
      description: 'Ergonomischer Glatzenrasierer.',
      images: ['https://headblade.de/images/moto.webp'],
      priceEur: 24.95,
      inStock: true,
      ratingValue: 4.8,
      reviewCount: 142,
      subscriptionDiscountPercent: 15
    });

    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Product');
    expect(jsonLd.name).toBe('HeadBlade MOTO Rasierer');
    expect(jsonLd.offers['@type']).toBe('Offer');
    expect(jsonLd.offers.price).toBe(24.95);
    expect(jsonLd.offers.priceCurrency).toBe('EUR');
    expect(jsonLd.offers.hasMerchantReturnPolicy).toBeDefined();
    expect(jsonLd.offers.hasMerchantReturnPolicy.merchantReturnDays).toBe(30);
    expect(jsonLd.aggregateRating.ratingValue).toBe(4.8);
    expect(jsonLd.aggregateRating.reviewCount).toBe(142);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/product-schema.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/seo/product-schema.ts
export interface ProductDetails {
  id: string;
  name: string;
  sku: string;
  gtin: string;
  description: string;
  images: string[];
  priceEur: number;
  inStock: boolean;
  ratingValue: number;
  reviewCount: number;
  subscriptionDiscountPercent?: number;
}

export function generateProductJsonLd(product: ProductDetails): Record<string, any> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    gtin13: product.gtin,
    brand: {
      '@type': 'Brand',
      name: 'HeadBlade'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1
    },
    offers: {
      '@type': 'Offer',
      price: product.priceEur,
      priceCurrency: 'EUR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'HeadBlade Deutschland'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'DE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '3.90',
          currency: 'EUR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'DE'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY'
          }
        }
      }
    }
  };
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/product-schema.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/seo/product-schema.ts test/product-schema.test.ts
git commit -m "feat(seo): add comprehensive product schema with return policy and shipping details"
```

---

### Task 3: GA4 DTC Enhanced E-Commerce Funnel & Subscription Tracking

**Files:**
- Create: `src/lib/analytics/dtc-funnel.ts`
- Modify: `src/components/commerce/ProductHero.astro`
- Test: `test/dtc-funnel.test.ts`

**Interfaces:**
- Produces: `trackDtcViewItem(item: DtcCartItem)`, `trackDtcAddToCart(item: DtcCartItem, purchaseType: 'single' | 'subscription')`, `trackDtcPurchase(order: DtcOrderPayload)`

```typescript
export interface DtcCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface DtcOrderPayload {
  transactionId: string;
  value: number;
  currency: string;
  shipping: number;
  tax: number;
  items: DtcCartItem[];
  hasSubscription: boolean;
}
```

- [ ] **Step 1: Write failing test**

```typescript
// test/dtc-funnel.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { trackDtcAddToCart, trackDtcPurchase } from '../src/lib/analytics/dtc-funnel';

describe('GA4 DTC E-Commerce & Subscription Tracking', () => {
  beforeEach(() => {
    (window as any).dataLayer = [];
  });

  it('pushes add_to_cart event with subscription item parameter', () => {
    trackDtcAddToCart({
      id: 'hb-moto',
      name: 'HeadBlade MOTO',
      price: 21.21,
      quantity: 1,
      category: 'Rasierer'
    }, 'subscription');

    const event = (window as any).dataLayer.find((e: any) => e.event === 'add_to_cart');
    expect(event).toBeDefined();
    expect(event.ecommerce.items[0].item_id).toBe('hb-moto');
    expect(event.ecommerce.items[0].purchase_type).toBe('subscription');
    expect(event.ecommerce.items[0].subscription_interval_days).toBe(60);
  });

  it('pushes purchase event with transaction details', () => {
    trackDtcPurchase({
      transactionId: 'HB-DE-2026-991',
      value: 45.16,
      currency: 'EUR',
      shipping: 0,
      tax: 7.21,
      items: [
        { id: 'hb-moto', name: 'HeadBlade MOTO', price: 21.21, quantity: 1, category: 'Rasierer' },
        { id: 'hb-blades', name: 'HB4 Klingen 4er', price: 23.95, quantity: 1, category: 'Klingen' }
      ],
      hasSubscription: true
    });

    const event = (window as any).dataLayer.find((e: any) => e.event === 'purchase');
    expect(event).toBeDefined();
    expect(event.ecommerce.transaction_id).toBe('HB-DE-2026-991');
    expect(event.ecommerce.has_subscription).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/dtc-funnel.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/analytics/dtc-funnel.ts
export interface DtcCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export interface DtcOrderPayload {
  transactionId: string;
  value: number;
  currency: string;
  shipping: number;
  tax: number;
  items: DtcCartItem[];
  hasSubscription: boolean;
}

function pushDataLayer(payload: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(payload);
}

export function trackDtcAddToCart(item: DtcCartItem, purchaseType: 'single' | 'subscription'): void {
  pushDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'EUR',
      value: item.price * item.quantity,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity,
          purchase_type: purchaseType,
          subscription_interval_days: purchaseType === 'subscription' ? 60 : undefined
        }
      ]
    }
  });
}

export function trackDtcPurchase(order: DtcOrderPayload): void {
  pushDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: order.transactionId,
      value: order.value,
      currency: order.currency,
      shipping: order.shipping,
      tax: order.tax,
      has_subscription: order.hasSubscription,
      items: order.items.map(i => ({
        item_id: i.id,
        item_name: i.name,
        item_category: i.category,
        price: i.price,
        quantity: i.quantity
      }))
    }
  });
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/dtc-funnel.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/analytics/dtc-funnel.ts test/dtc-funnel.test.ts
git commit -m "feat(analytics): add GA4 DTC e-commerce funnel with subscription tracking"
```

---

### Task 4: Google Ads Customer Match & Enhanced Conversions Hashing Bridge

**Files:**
- Create: `src/lib/server/dtc-customer-hash.ts`
- Test: `test/dtc-customer-hash.test.ts`

**Interfaces:**
- Produces: `hashCustomerData(customer: CustomerInput): Promise<HashedCustomerData>`

```typescript
export interface CustomerInput {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  country: string;
}

export interface HashedCustomerData {
  sha256_email: string;
  sha256_phone: string;
  sha256_first_name: string;
  sha256_last_name: string;
  postal_code: string;
  country: string;
}
```

- [ ] **Step 1: Write failing test**

```typescript
// test/dtc-customer-hash.test.ts
import { describe, it, expect } from 'vitest';
import { hashCustomerData } from '../src/lib/server/dtc-customer-hash';

describe('Google Ads Customer Match Hasher', () => {
  it('hashes customer parameters for Google Enhanced Conversions', async () => {
    const hashed = await hashCustomerData({
      email: '  kontakt@headblade.de  ',
      phone: '+49 170 1234567',
      firstName: 'Joel',
      lastName: 'Cherino',
      postalCode: '50667',
      country: 'DE'
    });

    expect(hashed.sha256_email).toMatch(/^[a-f0-9]{64}$/);
    expect(hashed.sha256_phone).toMatch(/^[a-f0-9]{64}$/);
    expect(hashed.postal_code).toBe('50667');
    expect(hashed.country).toBe('DE');
  });
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/dtc-customer-hash.test.ts
```

- [ ] **Step 3: Implement minimal code**

```typescript
// src/lib/server/dtc-customer-hash.ts
export interface CustomerInput {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  country: string;
}

export interface HashedCustomerData {
  sha256_email: string;
  sha256_phone: string;
  sha256_first_name: string;
  sha256_last_name: string;
  postal_code: string;
  country: string;
}

async function sha256Hex(str: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashCustomerData(customer: CustomerInput): Promise<HashedCustomerData> {
  const normEmail = customer.email.trim().toLowerCase();
  const normPhone = customer.phone.replace(/[^\d+]/g, '');
  const normFirst = customer.firstName.trim().toLowerCase();
  const normLast = customer.lastName.trim().toLowerCase();

  const [sha256_email, sha256_phone, sha256_first_name, sha256_last_name] = await Promise.all([
    sha256Hex(normEmail),
    sha256Hex(normPhone),
    sha256Hex(normFirst),
    sha256Hex(normLast)
  ]);

  return {
    sha256_email,
    sha256_phone,
    sha256_first_name,
    sha256_last_name,
    postal_code: customer.postalCode.trim(),
    country: customer.country.trim().toUpperCase()
  };
}
```

- [ ] **Step 4: Run tests and verify passing**

```bash
cd /Users/joelcherinodiaz/KI-System/02_Projects/active/headblade-germany-commerce && npx vitest run test/dtc-customer-hash.test.ts
```

- [ ] **Step 5: Commit changes**

```bash
git add src/lib/server/dtc-customer-hash.ts test/dtc-customer-hash.test.ts
git commit -m "feat(security): add customer match hasher for Google Ads enhanced conversions"
```

---

## Final Verification Checklist

1. [ ] Alle Vitest-Tests laufen 100% grün durch (`npm test -- --run`).
2. [ ] Astro Build (`npm run build`) kompiliert ohne Type-Fehler und erzeugt alle Seiten.
3. [ ] Google Merchant Center RSS 2.0 XML ist valide gegen den Google Base Namespace.
4. [ ] Schema.org Product enthält korrekte AggregateRating-, Offer- und MerchantReturnPolicy-Attribute.
5. [ ] GA4 DataLayer feuert Add-to-Cart und Purchase-Events inklusive Abo-Intervall-Kennzeichnung.
