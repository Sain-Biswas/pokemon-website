import { z } from "zod/v4";

const environmentVariablesSchema = z.object({
  DATABASE_URL: z.string().default("file:pokemon.db"),
  NODE_ENV: z.enum(["development", "production", "testing"]),
});

const envParsed = environmentVariablesSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error(envParsed.error);
  process.exit(1);
}

const environmentVariables = envParsed.data;

export default environmentVariables;

export type TEnvironmentVariables = z.infer<typeof environmentVariablesSchema>;
