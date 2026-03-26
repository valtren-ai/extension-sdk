import type { ExtensionManifest } from "./types.js";

export function defineExtension<T extends ExtensionManifest>(manifest: T): T {
  return manifest;
}
