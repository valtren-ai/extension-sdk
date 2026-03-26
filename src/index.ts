export { defineExtension } from "./manifest.js";
export {
  ensureValidExtensionManifest,
  validateAgentCatalog,
  validateExtensionManifest,
  validateStepExecutors,
} from "./validate.js";
export type {
  ExtensionAgentCatalog,
  ExtensionCatalogStep,
  ExtensionCatalogTemplate,
  ExtensionCatalogWorkflow,
  ExtensionManifest,
  ExtensionStepExecutor,
  ExtensionStepExecutorInput,
  ExtensionStepExecutorResult,
} from "./types.js";
