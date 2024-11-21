import { drizzle } from 'drizzle-orm/d1';
import { visitsTable } from '~/db/schema';
import type { ServerLoad } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const GET: ServerLoad = ({ params, platform }) => {
	const duration = Number.parseInt(params.duration ?? '') || 3;
	const threshold = new Date(new Date().getTime() + duration * MS_PER_DAY);
	const kind = params.kind ?? 'all';

	return {
		visits: (async () => {
			if (!platform) return [];
			const db = drizzle(platform.env.DB);
			return await db
				.select()
				.from(visitsTable)
				.where(
					and(
						eq(visitsTable.kind, kind !== 'all' ? kind : visitsTable.kind),
						gte(visitsTable.at, threshold)
					)
				)
				.all();
		})()
	};
};
