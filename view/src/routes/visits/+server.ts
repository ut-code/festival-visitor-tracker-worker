import type { ServerLoad } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { visitsTable } from '~/db/schema';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const GET: ServerLoad = async ({ params, platform }) => {
	const duration = Number.parseInt(params.duration ?? '') || 3;
	const threshold = new Date(new Date().getTime() + duration * MS_PER_DAY);
	const kind = params.kind ?? 'all';

	if (!platform) return new Response('platform not found');
	const db = drizzle(platform.env.DB);
	const resp = await db
		.select()
		.from(visitsTable)
		.where(
			and(
				eq(visitsTable.kind, kind !== 'all' ? kind : visitsTable.kind),
				gte(visitsTable.at, threshold)
			)
		)
		.all();
	return new Response(JSON.stringify(resp));
};
