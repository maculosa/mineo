import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');
const componentsDir = path.join(srcDir, 'components');
const indexPath = path.join(srcDir, 'index.ts');

function getDirectories(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
    .map(entry => entry.name);
}

function generateIndex() {
  const components = getDirectories(componentsDir).sort();

  const exports = components.map(name => `export * from './components/${name}'`);

  const content = exports.join('\n') + '\n';

  fs.writeFileSync(indexPath, content);
  console.log(`Generated index.ts with ${components.length} component exports`);
}

generateIndex();