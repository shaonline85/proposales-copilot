const requiredEnvKeys = ["PROPOSALES_API_URL", "PROPOSALES_API_KEY"] as const;

export function getProposalesConfig() {
  const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]?.trim());

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingKeys.join(", ")}. Add them to your .env.local file.`
    );
  }

  const baseUrl = process.env.PROPOSALES_API_URL!.trim().replace(/\/$/, "");

  return {
    baseUrl,
    apiKey: process.env.PROPOSALES_API_KEY!.trim(),
  };
}
