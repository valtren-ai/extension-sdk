# Valtren AI Extension SDK

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
npm install @valtren-ai/extension-sdk@^0.1.0
```

## Publishing

Recommended first release flow:

1. add `NPM_TOKEN` as a GitHub Actions secret
2. create a version tag such as `v0.1.0`
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
