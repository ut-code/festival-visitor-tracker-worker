import type { ServerLoad } from '@sveltejs/kit';
import { and, eq, gte } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { visitsTable } from '~/db/schema';
import { DAY } from '~/lib/consts';

export const GET: ServerLoad = async ({ request, url, platform }) => {
	const apiVersion = request.headers.get('Api-Version') ?? '1';
	if (!platform) return new Response('platform not found', { status: 500 });

	switch (apiVersion) {
		case '1': {
			// Old, Deprecated API. TODO: remove this
			const duration = Number.parseInt(url.searchParams.get('duration') ?? '');
			if (!duration)
				return new Response(
					`{"error": "failed to parse ${url.searchParams.get('duration')} to number"}`
				);
			const threshold = new Date(new Date().getTime() - duration);
			const kind = url.searchParams.get('kind') ?? 'all';

			const db = drizzle(platform.env.DB);
			const result = await db
				.select()
				.from(visitsTable)
				.where(
					and(
						eq(visitsTable.kind, kind !== 'all' ? kind : visitsTable.kind),
						gte(visitsTable.at, threshold)
					)
				)
				.all();
			return new Response(JSON.stringify(result));
		}
		case '2': {
			const FETCH_VISIT_THRESHOLD = new Date(new Date().getTime() - 12 * DAY);
			const db = drizzle(platform.env.DB);
			const result = await db
				.select()
				.from(visitsTable)
				.where(gte(visitsTable.at, FETCH_VISIT_THRESHOLD))
				.all();
			return new Response(JSON.stringify(result));
		}
		default: {
			return new Response(JSON.stringify({ error: 'invalid api version', got: apiVersion }), {
				status: 400
			});
		}
	}
};
