const EXACT_ROBOTS = "noindex,nofollow,noarchive,nosnippet";
const DATA_COLLECTION = /<form\b|type=["'](?:email|tel|password)["']/i;
const PAYMENT_PROVIDER = /paypal|stripe|klarna|checkout\.com/i;
const TRANSACTIONAL_COPY = /jetzt bezahlen|bestellung absenden/i;
const MERCHANT_SCHEMA = /"(?:offers|availability)"\s*:|"@type"\s*:\s*"Offer"/i;
const CHECKOUT_ENDPOINT = /(?:href|action)=["'][^"']*(?:\/checkout\b|\/warenkorb\b|\/cart\b)/i;

export function validateHtml(html, label = "document") {
  const text = String(html);
  if (!text.includes(EXACT_ROBOTS)) {
    throw new Error(`Missing immutable preview robots/noindex directive: ${label}`);
  }
  if (DATA_COLLECTION.test(text)) {
    throw new Error(`Form or customer-data collection detected: ${label}`);
  }
  if (PAYMENT_PROVIDER.test(text) || TRANSACTIONAL_COPY.test(text) || CHECKOUT_ENDPOINT.test(text)) {
    throw new Error(`Payment or transactional behavior detected: ${label}`);
  }
  if (MERCHANT_SCHEMA.test(text)) {
    throw new Error(`Merchant Offer structured data detected in review HTML: ${label}`);
  }
}

export function validateWrangler(source) {
  const text = String(source);
  if (/"routes?"\s*:|"custom_domain"\s*:|headblade\.info/i.test(text)) {
    throw new Error("Production routing/custom domain is forbidden in the review Worker configuration");
  }
  if (!/"name"\s*:\s*"headblade-germany-review"/.test(text)) {
    throw new Error("Unexpected Worker name for review deployment");
  }
  if (!/"directory"\s*:\s*"\.\/dist"/.test(text)) {
    throw new Error("Review Worker must serve ./dist static assets");
  }
  if (!/"workers_dev"\s*:\s*true/.test(text)) {
    throw new Error("Review Worker must remain isolated on workers.dev");
  }
  if (!/"preview_urls"\s*:\s*true/.test(text)) {
    throw new Error("Review Worker must expose version preview URLs");
  }
}

export { EXACT_ROBOTS };
