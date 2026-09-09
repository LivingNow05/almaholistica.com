import fs from 'node:fs';
import path from 'node:path';

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles('dist');
console.log('Scanning HTML files for internal links:', htmlFiles.length);

const brokenLinks = new Map();
let totalLinksChecked = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const linkMatches = [...content.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);
  for (const href of linkMatches) {
    if (href === '' || href === '/') continue;
    if (href === '/sitemap-index.xml') continue; // M5 XML endpoint
    totalLinksChecked++;
    const target1 = path.join('dist', href, 'index.html');
    const target2 = path.join('dist', href + '.html');
    const target3 = path.join('dist', href);
    if (!fs.existsSync(target1) && !fs.existsSync(target2) && !fs.existsSync(target3)) {
      brokenLinks.set(href, (brokenLinks.get(href) || 0) + 1);
    }
  }
}

console.log('Total internal links checked:', totalLinksChecked);
console.log('Broken internal links count:', brokenLinks.size);
if (brokenLinks.size > 0) {
  console.log('Broken links detail:', Object.fromEntries(brokenLinks));
  process.exit(1);
} else {
  console.log('VERIFIED: 0 broken internal links in entire build output!');
}
