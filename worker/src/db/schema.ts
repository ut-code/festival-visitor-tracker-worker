import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// README: when changing this, you must also change ../share/schema.ts, view/src/db/schema.ts, and view/src/share/schema.ts
export const visitsTable = sqliteTable("visits", {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull(),
  kind: text().notNull(),
  at: integer({ mode: "timestamp" }).notNull(),
});
