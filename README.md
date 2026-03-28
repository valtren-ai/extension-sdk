# Valtren AI Extension SDK

[![npm version](https://img.shields.io/npm/v/%40valtren-ai%2Fextension-sdk)](https://www.npmjs.com/package/@valtren-ai/extension-sdk)
[![CI](https://github.com/valtren-ai/extension-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/valtren-ai/extension-sdk/actions/workflows/ci.yml)
[![Publish SDK](https://github.com/valtren-ai/extension-sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/valtren-ai/extension-sdk/actions/workflows/publish.yml)

Types, helpers, validators, and scaffolds for building Valtren AI extensions.

## Purpose

This SDK helps extension authors build on top of Valtren AI without guessing extension shapes by hand.

The first version focuses on:

- extension manifest types
- agent catalog contribution types
- step executor types
- lightweight validation helpers
- helper functions for building extension manifests

## What this SDK does not own

This SDK does not replace Valtren AI core runtime logic.

Valtren AI core still owns:

- workflow execution
- approvals
- queueing
- governance
- observability
- licensing
- runtime loading

This SDK only helps extension authors produce well-formed extension packages.

## Initial package surface

- `defineExtension(...)`
- `types`
- `validateExtensionManifest(...)`
- `validateAgentCatalog(...)`

## Scaffold a new extension

Create a starter extension with the built-in CLI:

```bash
npx create-valtren-extension my-extension --runtime node-pack
```

If you prefer, you can also call the SDK package directly:

```bash
npx @valtren-ai/extension-sdk create-valtren-extension my-extension --runtime node-pack
```

Supported runtime templates:

- `node-pack`
- `org-zip-node`
- `org-zip-python`
- `sidecar-python`
- `sidecar-java`
- `sidecar-dotnet`

You can also choose a target directory:

```bash
npx create-valtren-extension my-extension --runtime org-zip-python --dir ./extensions/my-extension
```

Direct SDK-package equivalent:

```bash
npx @valtren-ai/extension-sdk create-valtren-extension my-extension --runtime org-zip-python --dir ./extensions/my-extension
```

The generated scaffold is intentionally small. After scaffolding:

- replace placeholder descriptions and logic
- read the guides in `valtren-ai/extension-examples`
- add health, smoke-test, versioning, and rollback notes before production rollout

## Build and publish

This package is set up as an ESM SDK with a standard TypeScript build pipeline.

Typical commands:

```bash
npm install
npm run build
```

Build output is emitted to:

```text
dist/
```

Consumers should import from:

```ts
import { defineExtension, validateExtensionManifest } from "@valtren-ai/extension-sdk";
```

Install from npm:

```bash
npm install @valtren-ai/extension-sdk@^0.2.0
```

Shorthand scaffold package:

```bash
npm install -g create-valtren-extension
```

## Publishing

Recommended first release flow:

1. add `NPM_TOKEN` as a GitHub Actions secret
2. create a version tag such as `v0.2.0`
3. push the tag
4. let the publish workflow release the package to npm

## Intended users

- customer extension teams
- implementation partners
- internal Valtren AI extension authors

## Related repositories

- `valtren-ai/core`
  - licensed core platform

- `valtren-ai/extension-examples`
  - public extension examples from hello world to advanced packs

## License

MIT
