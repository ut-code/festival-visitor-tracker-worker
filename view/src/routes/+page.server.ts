import type { PageServerLoad } from './$types';
import { visitsTable } from '../schema';
import { drizzle } from 'drizzle-orm/d1';

export const load: PageServerLoad = ({ platform }) => {
	if (!platform) return;
	const db = drizzle(platform.env.DB);
	const data = db.select().from(visitsTable).execute();
	return data;
};
