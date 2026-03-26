export type ExtensionHookName = "onStartup" | "onShutdown";

export type ExtensionHook = (payload?: unknown) => Promise<void> | void;

export type ExtensionCatalogStep = {
  key: string;
  title: string;
  step_type?: string;
  category?: string;
  description?: string;
  guidance?: string;
  inputs?: Array<{ key: string; label?: string; description?: string }>;
  outputs?: Array<{ key: string; label?: string; description?: string }>;
  produces?: string[];
  consumes?: string[];
  consumes_any_of?: string[][];
  allowed_next_step_keys?: string[];
  executor_kind?: string;
  license_feature?: string;
};

export type ExtensionCatalogWorkflow = {
  id: string;
  title: string;
  description?: string;
  summary?: string;
  help_text?: string;
  domain?: string;
  step_keys?: string[];
  license_feature?: string;
};

export type ExtensionCatalogTemplate = {
  id: string;
  title: string;
  summary?: string;
  help_text?: string;
  best_for?: string;
  domain?: string;
  type?: string;
  mode?: string;
  schedule?: string;
  ai_assisted?: boolean;
  evidence_threshold?: number;
  confidence_threshold?: number;
  allowed_actions?: string[];
  workflow_id?: string;
  enabled_step_keys?: string[];
  approval_channel?: string;
  approval_target?: string;
  goal?: string;
  watch_for?: string;
  owner_role?: string;
  due_window_hours?: number;
  business_context?: string;
  escalation_guidance?: string;
  scope?: Record<string, unknown>;
  tags?: string[];
  license_feature?: string;
};

export type ExtensionAgentCatalog = {
  steps?: ExtensionCatalogStep[];
  workflows?: ExtensionCatalogWorkflow[];
  templates?: ExtensionCatalogTemplate[];
};

export type ExtensionStepExecutorInput = {
  agent?: Record<string, unknown>;
  step?: Record<string, unknown>;
  workflowState?: Record<string, unknown>;
  workflow_state?: Record<string, unknown>;
  [key: string]: unknown;
};

export type ExtensionStepExecutorResult = {
  handled?: boolean;
  status?: string;
  summary?: string;
  outputPayload?: Record<string, unknown>;
  workflowStatePatch?: Record<string, unknown>;
};

export type ExtensionStepExecutor = {
  key: string;
  title?: string;
  executor_kind?: string;
  step_keys?: string[];
  step_types?: string[];
  execute: (input: ExtensionStepExecutorInput) => Promise<ExtensionStepExecutorResult> | ExtensionStepExecutorResult;
};

export type ExtensionManifest = {
  name: string;
  version?: string;
  description?: string;
  extension_type?: string;
  license_feature?: string;
  hooks?: Partial<Record<ExtensionHookName, ExtensionHook>>;
  agent_catalog?: ExtensionAgentCatalog;
  step_executors?: ExtensionStepExecutor[];
};
