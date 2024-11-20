import { defineConfig } from "drizzle-kit";
import { unwrap } from "share/lib/utils";

export default defineConfig({
  out: "./drizzle",
  schema: "../share/lib/db/schema.ts",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: unwrap(process.env.CLOUDFLARE_ACCOUNT_ID),
    databaseId: unwrap(process.env.CLOUDFLARE_DATABASE_ID),
    token: unwrap(process.env.CLOUDFLARE_D1_TOKEN),
  },
});
