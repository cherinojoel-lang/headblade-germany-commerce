export const categories = [
  { id: 'angebote', name: 'Angebote & Bundles', path: '/angebote', description: 'Starter-Sets und rabattierte Kombinationen.' },
  { id: 'rasierer', name: 'Rasierer', path: '/rasierer', description: 'HeadBlade MOTO, ATX und ausgewählte Varianten.' },
  { id: 'klingen', name: 'Klingen & Zubehör', path: '/klingen-zubehoer', description: 'HB4/HB6 Nachfüllklingen und Zubehör.' },
  { id: 'pflege', name: 'Pflege', path: '/pflege', description: 'Gleitmittel und Pflege rund um die Kopfrasur.' },
  { id: 'lifestyle', name: 'Lifestyle', path: '/lifestyle', description: 'Cases und ergänzendes Zubehör.' },
];

const motoImage = 'https://www.headblade.info/images/product_images/info_images/moto_package_nb_shadow_350x350.png';
const motoDetail = 'https://www.headblade.info/images/product_images/info_images/moto_fire_shdw_350x350.gif';
const bladeImage = 'https://www.headblade.info/images/product_images/info_images/hb4_blade_closeup_2013_2_350x350.jpg';
const slickImage = 'https://www.headblade.info/images/product_images/popup_images/5oz-headslick-mentholated-shave-cream-5oz-214356.jpg';

export const products = [
  {
    slug: 'headblade-moto', name: 'HeadBlade MOTO', price: 21.95, compareAtPrice: null,
    categories: ['rasierer'], compatibility: 'HB4; laut HeadBlade auch HB6-kompatibel',
    image: motoImage, detailImage: motoDetail, badge: 'Kernprodukt',
    short: 'Der MOTO folgt mit seiner beweglichen Konstruktion der Kontur des Kopfes.',
    benefits: ['Für die Kopfrasur entwickelt', 'Bewegliche Führung entlang der Kopfform', 'Nachfüllbares Klingensystem'],
    keywords: ['headblade', 'moto', 'kopfrasierer', 'hb4', 'hb6'],
  },
  {
    slug: 'headblade-atx-package', name: 'ATX Package inkl. HB4', price: 34.90, compareAtPrice: null,
    categories: ['rasierer', 'angebote'], compatibility: 'ATX mit HB4-Klingen', image: motoImage,
    short: 'ATX-Paket mit Vorrat an HB4-Klingen.', benefits: ['Einsteigerpaket', 'HB4-System', 'Direkt kombinierbar mit Pflege'],
    keywords: ['atx', 'package', 'hb4', 'starter'],
  },
  {
    slug: 'atx-pink', name: 'ATX pink – limitiert', price: 19.95, compareAtPrice: 21.95,
    categories: ['rasierer', 'angebote'], compatibility: 'ATX mit HB4-Klingen', image: motoImage, badge: 'Limitiert',
    short: 'Limitierte ATX-Farbvariante aus dem aktuellen deutschen Sortiment.', benefits: ['Limitierte Variante', 'HB4-System', 'Reduzierter Preis'],
    keywords: ['atx', 'pink', 'limitiert'],
  },
  {
    slug: 'klingenset-4blade', name: 'Klingenset 4Blade (HB4)', price: 14.95, compareAtPrice: null,
    categories: ['klingen'], compatibility: 'MOTO, ATX und weitere HeadBlade-Modelle', image: bladeImage, badge: 'Bestseller',
    short: 'Vier-Klingen-Nachfüllsystem für HeadBlade-Rasierer.', benefits: ['Vier-Klingen-System', 'Nachfüllset', 'Für MOTO und ATX'],
    keywords: ['hb4', '4blade', 'klingen', 'nachfüllklingen'],
  },
  {
    slug: 'klingenset-6blade', name: 'Klingenset 6Blade (HB6)', price: 16.95, compareAtPrice: null,
    categories: ['klingen'], compatibility: 'HB6-System; teils per Adapter mit weiteren Modellen nutzbar', image: bladeImage,
    short: 'Sechs-Klingen-Nachfüllsystem für kompatible HeadBlade-Rasierer.', benefits: ['Sechs-Klingen-System', 'Nachfüllset', 'Adapterfähig'],
    keywords: ['hb6', '6blade', 'klingen'],
  },
  {
    slug: '4blade-4plus1', name: '4Blade – 4 kaufen, 1 gratis', price: 59.80, compareAtPrice: null,
    categories: ['klingen', 'angebote'], compatibility: 'HB4-System', image: bladeImage, badge: 'Vorratspaket',
    short: 'HB4-Vorratspaket aus dem aktuellen deutschen Shop.', benefits: ['Vorratspaket', 'HB4-System', 'Paketpreis'],
    keywords: ['hb4', '4blade', '4+1', 'vorrat'],
  },
  {
    slug: '6blade-4plus1', name: '6Blade – 4 kaufen, 1 gratis', price: 67.80, compareAtPrice: null,
    categories: ['klingen', 'angebote'], compatibility: 'HB6-System', image: bladeImage, badge: 'Vorratspaket',
    short: 'HB6-Vorratspaket aus dem aktuellen deutschen Shop.', benefits: ['Vorratspaket', 'HB6-System', 'Paketpreis'],
    keywords: ['hb6', '6blade', '4+1', 'vorrat'],
  },
  {
    slug: 'moto-slick-bundle', name: 'MOTO + HeadSlick', price: 32.90, compareAtPrice: 37.90,
    categories: ['rasierer', 'pflege', 'angebote'], compatibility: 'MOTO plus Rasiercreme', image: slickImage, badge: 'Bundle',
    short: 'MOTO und HeadSlick als gemeinsames Starter-Bundle.', benefits: ['Rasierer + Pflege', 'Paketpreis', 'Für den Einstieg gedacht'],
    keywords: ['moto', 'headslick', 'slick', 'bundle'],
  },
  {
    slug: 'headslick-5oz', name: 'HeadSlick ShaveCream 5oz', price: 13.95, compareAtPrice: null,
    categories: ['pflege'], compatibility: 'Pflegeprodukt für die Kopfrasur', image: slickImage,
    short: 'Wasserlösliche Rasiercreme mit Menthol für die Kopfrasur.', benefits: ['Wasserlöslich', 'Für die Kopfrasur entwickelt', 'Menthol-Effekt'],
    keywords: ['headslick', 'slick', 'rasiercreme', 'pflege'],
  },
  {
    slug: 'moto-headcase', name: 'MOTO HeadCase', price: 6.95, compareAtPrice: null,
    categories: ['lifestyle', 'klingen'], compatibility: 'Aufbewahrung für MOTO', image: motoImage,
    short: 'Kompakte Aufbewahrung für den HeadBlade MOTO.', benefits: ['Transport', 'Schutz', 'Passend zum MOTO'],
    keywords: ['moto', 'headcase', 'case', 'zubehör'],
  },
];

export function formatPrice(value) {
  if (value === null || value === undefined) return 'Preis vor Livegang bestätigen';
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
}

export function getProduct(slug) {
  return products.find((product) => product.slug === slug);
}

export function searchProducts(query, list = products) {
  const q = String(query ?? '').trim().toLowerCase();
  if (!q) return list;
  return list.filter((product) => [product.name, product.short, product.compatibility, ...(product.keywords ?? [])]
    .join(' ').toLowerCase().includes(q));
}

export function productsByCategory(category) {
  return products.filter((product) => product.categories.includes(category));
}

export function resolveRoute(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  if (path === '/checkout' || path === '/warenkorb') return { kind: 'review-only' };
  if (path === '/') return { kind: 'home' };
  if (path === '/produkte') return { kind: 'catalog' };
  if (path === '/finder') return { kind: 'finder' };
  if (path === '/anleitungen') return { kind: 'guide' };
  if (path === '/impressum') return { kind: 'legal', page: 'impressum' };
  if (path === '/datenschutz') return { kind: 'legal', page: 'datenschutz' };
  const category = categories.find((item) => item.path === path);
  if (category) return { kind: 'category', category: category.id };
  if (path.startsWith('/produkt/')) {
    const slug = decodeURIComponent(path.slice('/produkt/'.length));
    return getProduct(slug) ? { kind: 'product', slug } : { kind: 'not-found' };
  }
  return { kind: 'not-found' };
}
