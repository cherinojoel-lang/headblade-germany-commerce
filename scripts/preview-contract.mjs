const EXACT_ROBOTS = "noindex,nofollow,noarchive,nosnippet";
const DATA_COLLECTION = /<form\b|type=["'](?:email|tel|password)["']/i;
const PAYMENT_PROVIDER = /paypal|stripe|klarna|checkout\.com/i;
const TRANSACTIONAL_COPY = /jetzt bezahlen|bestellung absenden/i;

export function validateHtml(html, label = "document") {
  if (!String(html).includes(EXACT_ROBOTS)) {
    throw new Error(`Missing immutable preview robots/noindex directive: ${label}`);
  }
  if (DATA_COLLECTION.test(html)) {
    throw new Error(`Form or customer-data collection detected: ${label}`);
  }
  if (PAYMENT_PROVIDER.test(html) || TRANSACTIONAL_COPY.test(html)) {
    throw new Error(`Payment or transactional behavior detected: ${label}`);
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
}

export { EXACT_ROBOTS };
