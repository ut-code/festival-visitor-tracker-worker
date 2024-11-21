import type { Visit } from '~/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ fetch }) => {
	return {
		visits: fetch('/visits').then((res) => res.json() as Promise<Visit[]>)
	};
};
