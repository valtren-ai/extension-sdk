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
