import { drizzle } from "drizzle-orm/d1";
import { env } from "$env/dynamic/private";
if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const client = createClient({ url: env.DATABASE_URL });
export const db = drizzle(client);
