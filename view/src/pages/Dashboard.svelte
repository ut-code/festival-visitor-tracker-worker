<script lang="ts">
	import type { Visit } from '~/db/schema';
	import TotalVisits from '~/components/TotalVisits.svelte';
	import Line from '~/components/charts/Line.svelte';
	import { groupBy, groupByHour } from '~/lib/utils';
	import type { Kind } from '~/share/schema';

	const URL_LABELS = new Map([
		['keiba.utcode.net', 'keiba'],
		['maze.utcode.net', 'maze'],
		['blosite.utcode.net', 'blosite'],
		['mahjong.utcode.net', 'mahjong'],
		['othello.utcode.net', 'othello'],
		['security.utcode.net', 'security']
	]);

	type Props = {
		data: Visit[];
		duration: number;
		lastFetch: Date;
		kind: Kind | 'all';
	};
	const { data, duration, lastFetch }: Props = $props();
	const sanitizedData = $derived(
		data.map((item) => {
			const url = new URL(item.url);
			item.url = url.origin; // sanitize URL s.t. it: - removes trailing URL - deletes HTTP / HTTPS
			return item;
		})
	);
	const grouped = $derived(
		groupBy(sanitizedData, (item) => {
			return item.url;
		})
	);
	const titles = $derived(groupByHour(lastFetch, grouped[0].val).map((v) => v[1]));
	const linedata = $derived(
		grouped.map((e) => ({
			name: URL_LABELS.get(e.key) ?? e.key,
			data: groupByHour(lastFetch, e.val).map((row) => row[0])
		}))
	);
</script>

<Line dataset={linedata} {titles} />

<TotalVisits total={data.length} perDay={data.length / duration} />
