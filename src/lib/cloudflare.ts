import { getCloudflareContext } from '@opennextjs/cloudflare';

type RuntimeEnv = Record<string, unknown>;

export function getCloudflareBinding<T>(binding: string): T | undefined {
  const env = process.env as RuntimeEnv | undefined;
  if (env && env[binding] !== undefined) {
    return env[binding] as T;
  }

  try {
    const { env: cloudflareEnv } = getCloudflareContext();
    const value = ((cloudflareEnv as unknown) as RuntimeEnv | undefined)?.[
      binding
    ];
    return value as T | undefined;
  } catch {
    return undefined;
  }
}
