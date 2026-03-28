#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const templatesRoot = path.join(packageRoot, 'templates');

function parseArgs(argv) {
  const args = argv.slice(2);
  let name = null;
  let runtime = 'node-pack';
  let outDir = null;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg.startsWith('--') && !name) {
      name = arg;
      continue;
    }
    if (arg === '--runtime') {
      runtime = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--dir') {
      outDir = args[i + 1];
      i += 1;
      continue;
    }
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }
  }

  if (!name) {
    printHelp();
    process.exit(1);
  }

  return { name, runtime, outDir: outDir || path.resolve(process.cwd(), name) };
}

function printHelp() {
  console.log(`Create a Valtren AI extension scaffold.\n\nUsage:\n  create-valtren-extension <name> [--runtime <runtime>] [--dir <output-dir>]\n\nSupported runtimes:\n  node-pack\n  org-zip-node\n  org-zip-python\n  sidecar-python\n  sidecar-java\n  sidecar-dotnet\n`);
}

function toLabel(name) {
  return name
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function replaceTokens(content, vars) {
  return content
    .replaceAll('__NAME__', vars.name)
    .replaceAll('__LABEL__', vars.label);
}

function copyDir(src, dest, vars) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const renderedName = replaceTokens(entry.name, vars);
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, renderedName);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, vars);
    } else {
      const content = fs.readFileSync(srcPath, 'utf8');
      fs.writeFileSync(destPath, replaceTokens(content, vars), 'utf8');
    }
  }
}

const { name, runtime, outDir } = parseArgs(process.argv);
const templateDir = path.join(templatesRoot, runtime);
if (!fs.existsSync(templateDir)) {
  console.error(`Unknown runtime template: ${runtime}`);
  process.exit(1);
}
if (fs.existsSync(outDir) && fs.readdirSync(outDir).length > 0) {
  console.error(`Output directory already exists and is not empty: ${outDir}`);
  process.exit(1);
}

const vars = { name, label: toLabel(name) };
copyDir(templateDir, outDir, vars);
console.log(`Created ${runtime} scaffold at ${outDir}`);
console.log('Next steps:');
console.log('1. Replace the placeholder descriptions and business logic.');
console.log('2. Read the versioning, testing, and security guides in valtren-ai/extension-examples.');
console.log('3. Add health or smoke-test coverage before your first real release.');
