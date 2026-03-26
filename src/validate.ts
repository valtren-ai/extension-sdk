import type {
  ExtensionAgentCatalog,
  ExtensionCatalogStep,
  ExtensionCatalogTemplate,
  ExtensionCatalogWorkflow,
  ExtensionManifest,
  ExtensionStepExecutor,
} from "./types.js";

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function asArray<T>(value: T[] | undefined | null) {
  return Array.isArray(value) ? value : [];
}

function unique(items: string[]) {
  return Array.from(new Set(items));
}

export function validateAgentCatalog(catalog: ExtensionAgentCatalog | undefined | null): string[] {
  if (!catalog) return [];
  const errors: string[] = [];

  const steps = asArray(catalog.steps);
  const workflows = asArray(catalog.workflows);
  const templates = asArray(catalog.templates);

  const stepKeys = unique(steps.map((item) => String(item?.key || "").trim()).filter(Boolean));
  const workflowIds = unique(workflows.map((item) => String(item?.id || "").trim()).filter(Boolean));

  steps.forEach((step: ExtensionCatalogStep, index) => {
    if (!hasText(step.key)) errors.push(`agent_catalog.steps[${index}].key is required`);
    if (!hasText(step.title)) errors.push(`agent_catalog.steps[${index}].title is required`);
  });

  workflows.forEach((workflow: ExtensionCatalogWorkflow, index) => {
    if (!hasText(workflow.id)) errors.push(`agent_catalog.workflows[${index}].id is required`);
    if (!hasText(workflow.title)) errors.push(`agent_catalog.workflows[${index}].title is required`);
    asArray(workflow.step_keys).forEach((stepKey) => {
      if (!stepKeys.includes(String(stepKey))) {
        errors.push(`agent_catalog.workflows[${index}] references unknown step key "${stepKey}"`);
      }
    });
  });

  templates.forEach((template: ExtensionCatalogTemplate, index) => {
    if (!hasText(template.id)) errors.push(`agent_catalog.templates[${index}].id is required`);
    if (!hasText(template.title)) errors.push(`agent_catalog.templates[${index}].title is required`);
    if (hasText(template.workflow_id) && !workflowIds.includes(String(template.workflow_id))) {
      errors.push(`agent_catalog.templates[${index}] references unknown workflow_id "${template.workflow_id}"`);
    }
    asArray(template.enabled_step_keys).forEach((stepKey) => {
      if (!stepKeys.includes(String(stepKey))) {
        errors.push(`agent_catalog.templates[${index}] references unknown step key "${stepKey}"`);
      }
    });
  });

  return errors;
}

export function validateStepExecutors(stepExecutors: ExtensionStepExecutor[] | undefined | null): string[] {
  const errors: string[] = [];
  asArray(stepExecutors).forEach((executor, index) => {
    if (!hasText(executor.key)) errors.push(`step_executors[${index}].key is required`);
    if (typeof executor.execute !== "function") errors.push(`step_executors[${index}].execute must be a function`);
  });
  return errors;
}

export function validateExtensionManifest(manifest: ExtensionManifest): string[] {
  const errors: string[] = [];
  if (!manifest || typeof manifest !== "object") {
    return ["Extension manifest must be an object"];
  }
  if (!hasText(manifest.name)) errors.push("name is required");
  errors.push(...validateAgentCatalog(manifest.agent_catalog));
  errors.push(...validateStepExecutors(manifest.step_executors));
  return errors;
}

export function ensureValidExtensionManifest(manifest: ExtensionManifest): ExtensionManifest {
  const errors = validateExtensionManifest(manifest);
  if (errors.length) {
    throw new Error(`Invalid Valtren AI extension manifest:\n- ${errors.join("\n- ")}`);
  }
  return manifest;
}
