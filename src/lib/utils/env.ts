type EnvGroup<T extends Record<string, string>> =
  | {
      enabled: false;
      values: Partial<Record<keyof T, string>>;
    }
  | {
      enabled: true;
      values: Record<keyof T, string>;
    };

function read(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function optionalEnv(name: string): string | undefined {
  return read(name);
}

export function optionalBooleanEnv(name: string): boolean | undefined {
  const value = optionalEnv(name);

  if (!value) {
    return undefined;
  }

  if (["1", "true", "yes", "on"].includes(value.toLowerCase())) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(value.toLowerCase())) {
    return false;
  }

  throw new Error(`${name} must be a boolean value: true, false, 1, 0, yes, no, on, or off.`);
}

export function requiredEnv(name: string): string {
  const value = read(name);

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function optionalEnvGroup<T extends Record<string, string>>(
  label: string,
  keys: T
): EnvGroup<T> {
  const values = Object.fromEntries(
    Object.entries(keys).map(([alias, envName]) => [alias, optionalEnv(envName)])
  ) as Partial<Record<keyof T, string>>;

  const provided = Object.values(values).filter(Boolean);
  if (provided.length === 0) {
    return { enabled: false, values };
  }

  const missing = (Object.keys(keys) as Array<keyof T>)
    .filter((alias) => !values[alias])
    .map((alias) => keys[alias]);

  if (missing.length > 0) {
    throw new Error(`${label} is partially configured. Missing: ${missing.join(", ")}`);
  }

  return { enabled: true, values: values as Record<keyof T, string> };
}

export function requiredEnvGroup<T extends Record<string, string>>(
  label: string,
  keys: T
): Record<keyof T, string> {
  const values = Object.fromEntries(
    Object.entries(keys).map(([alias, envName]) => [alias, optionalEnv(envName)])
  ) as Partial<Record<keyof T, string>>;

  const missing = (Object.keys(keys) as Array<keyof T>)
    .filter((alias) => !values[alias])
    .map((alias) => keys[alias]);

  if (missing.length > 0) {
    throw new Error(`${label} is missing required environment variables: ${missing.join(", ")}`);
  }

  return values as Record<keyof T, string>;
}

export function requiredIntegerEnv(name: string): number {
  const value = requiredEnv(name);
  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new Error(`${name} must be an integer.`);
  }

  return parsed;
}
