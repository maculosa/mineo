import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const componentNames = process.argv.slice(2);

if (componentNames.length === 0) {
  console.error('Usage: node add-component.js <component-name> [component-name ...]');
  process.exit(1);
}

console.log(`Adding components: ${componentNames.join(', ')}`);

const failedComponents = [];

for (const name of componentNames) {
  try {
    console.log(`\nAdding ${name}...`);
    execSync(`pnpm dlx shadcn-vue@latest add ${name}`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(`Failed to add ${name}, skipping...`);
    failedComponents.push(name);
  }
}

console.log('\nFixing imports...');
try {
  execSync(`node ${path.join(__dirname, 'fix-imports.js')}`, {
    cwd: rootDir,
    stdio: 'inherit',
  });
} catch (error) {
  console.error('Failed to fix imports:', error.message);
}

if (failedComponents.length > 0) {
  console.error(`\nFailed components: ${failedComponents.join(', ')}`);
  process.exit(1);
} else {
  console.log(`\nAll components added successfully!`);
}