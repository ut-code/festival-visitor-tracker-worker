import { defineConfig } from "drizzle-kit";
import { unwrap } from "./src/utils";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "sqlite",
	driver: "d1-http",
	dbCredentials: {
		accountId: unwrap(process.env.CLOUDFLARE_ACCOUNT_ID),
		databaseId: unwrap(process.env.CLOUDFLARE_DATABASE_ID),
		token: unwrap(process.env.CLOUDFLARE_D1_TOKEN),
	},
});
