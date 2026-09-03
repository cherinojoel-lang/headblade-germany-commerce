import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../public/', import.meta.url);
const required = ['index.html', 'app.js', 'domain.js', 'render.js', 'styles.css', 'robots.txt'];
for (const file of required) {
  const content = await readFile(new URL(file, root), 'utf8');
  if (!content.trim()) throw new Error(`${file} is empty`);
}
const index = await readFile(new URL('index.html', root), 'utf8');
if (!/noindex,nofollow/.test(index)) throw new Error('Preview must be noindex,nofollow');
const robots = await readFile(new URL('robots.txt', root), 'utf8');
if (!/Disallow:\s*\//.test(robots)) throw new Error('robots.txt must disallow crawling');
const render = await readFile(new URL('render.js', root), 'utf8');
if (/type=["'](?:email|text|tel|password)|<form\b/i.test(render)) throw new Error('Review build must not collect form data');
if (/paypal|stripe|klarna|checkout\.com/i.test(render)) throw new Error('Payment provider found in review renderer');
const entries = await readdir(root);
console.log(`VALIDATION_OK files=${entries.length} noindex=yes forms=none payment_providers=none`);
