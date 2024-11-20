import { drizzle } from 'drizzle-orm/d1';
import { visitsTable } from '../schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ platform }) => {
	return {
		visits: (async () => {
			if (!platform) return [];
			const db = drizzle(platform.env.DB);
			return await db.select().from(visitsTable).all();
		})()
	};
};
