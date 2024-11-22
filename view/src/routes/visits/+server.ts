import type { ServerLoad } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { visitsTable } from '~/db/schema';

export const GET: ServerLoad = async ({ url, platform }) => {
	const duration = Number.parseInt(url.searchParams.get('duration') ?? '');
	if (!duration)
		return new Response(
			`{"error": "failed to parse ${url.searchParams.get('duration')} to number"}`
		);
	const threshold = new Date(new Date().getTime() - duration);
	const kind = url.searchParams.get('kind') ?? 'all';

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
