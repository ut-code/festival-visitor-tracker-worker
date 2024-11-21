import type { InferSelectModel } from 'drizzle-orm';
import { int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const visitsTable = sqliteTable('visits', {
	id: int('id').primaryKey({ autoIncrement: true }),
	url: text('url').notNull(),
	kind: text('kind').default('festival'),
	at: integer('at', { mode: 'timestamp' }).notNull()
});

export type Visit = InferSelectModel<typeof visitsTable>;
