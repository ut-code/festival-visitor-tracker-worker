<script lang="ts">
	import type { Visit } from '~/db/schema';
	import TotalVisits from '~/components/TotalVisits.svelte';
	import Line from '~/components/charts/Line.svelte';
	import { groupBy, groupByHour } from '~/lib/utils';
	import type { Kind } from '~/share/schema';

	type Props = {
		data: Visit[];
		duration: number;
		lastFetch: Date;
		kind: Kind | 'all';
	};
	const { data, duration, lastFetch }: Props = $props();
	const grouped = $derived(groupBy(data, (item) => item.url));
	const titles = $derived(groupByHour(lastFetch, grouped[0].val).map((v) => v[1]));
	const linedata = $derived(
		grouped.map((e) => ({
			name: URL_LABELS.get(e.key) ?? e.key,
			data: groupByHour(lastFetch, e.val).map((row) => row[0])
		}))
	);

	const URL_LABELS = new Map([
		['https://keiba.utcode.net/', 'keiba'],
		['https://maze.utcode.net/', 'maze'],
		['https://blosite.utcode.net/', 'blosite'],
		['https://mahjong.utcode.net/', 'mahjong'],
		['https://othello.utcode.net/', 'othello'],
		['https://security.utcode.net/', 'security']
	]);
</script>

<Line dataset={linedata} {titles} />

<TotalVisits total={data.length} perDay={data.length / duration} />
