import z from "zod/v4";

const envSchema = z.object({
  DB_CONNECTION_STRING: z.string().min(1, "DB_CONNECTION_STRING Is Required"),
  PORT: z.coerce.number().int().min(10).max(65535),
  CLIENT_URL: z.url("CLIENT_URL must contain valid URL"),
  NODE_ENV: z.enum(["produciton", "test", "development", "DEFUALT"]),
  LOG_LEVEL: z.enum(["silent", "error", "info", "debug"]).default("info"),
  APP_NAME: z.string().min(1),
});

const result = envSchema.safeParse(process.env);

if (result.error) {
  console.error("Error in .env file");
  result.error.issues.forEach((iss) => {
    console.error(`Error in field ${iss.path}, problem/issue: ${iss.code}`);
  });

  process.exit(1);
}

export default result.data;