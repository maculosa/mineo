import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');

const aliasMap = {
  '@/components/': 'components/',
  '@/composables/': 'composables/',
  '@/lib/': 'lib/',
};

function computeRelativePath(fromDir, toPath) {
  const relative = path.relative(fromDir, toPath);
  return './' + relative.replace(/\\/g, '/');
}

function processFile(filePath) {
  if (!filePath.endsWith('.vue') && !filePath.endsWith('.ts')) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  const fileDir = path.dirname(filePath);
  let modified = false;

  for (const [alias, subPath] of Object.entries(aliasMap)) {
    const regex = new RegExp(`from\\s+['"]${alias.replace('/', '\\/')}([^'"]+)['"]`, 'g');
    content = content.replace(regex, (match, importPath) => {
      const targetPath = path.join(srcDir, subPath, importPath);
      const relativePath = computeRelativePath(fileDir, targetPath);
      modified = true;
      return `from '${relativePath}'`;
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${path.relative(__dirname, filePath)}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      walkDir(fullPath);
    } else if (entry.isFile()) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Import fix complete.');