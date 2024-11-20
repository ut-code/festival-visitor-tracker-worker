import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visitsTable = sqliteTable("visits", {
	id: int().primaryKey({ autoIncrement: true }),
	url: text().notNull(),
	at: integer({ mode: "timestamp" }).notNull(),
});
