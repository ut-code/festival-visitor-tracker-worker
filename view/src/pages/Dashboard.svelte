<script lang="ts">
	import TotalVisits from '~/components/TotalVisits.svelte';
	import Line from '~/components/charts/Line.svelte';
	import PieChart from '~/components/charts/PieChart.svelte';
	import type { Visit } from '~/db/schema';
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
			const sanitized = item.url.split('://')[1]?.split('/')[0];
			if (sanitized) item.url = sanitized;
			return item;
		})
	);

	const grouped = $derived(
		groupBy(sanitizedData, (item) => {
			return item.url;
		}).sort((a, b) => {
			return b.val.length - a.val.length;
		})
	);
	const piedata = $derived(
		grouped.map((group) => {
			return {
				label: URL_LABELS.get(group.key) ?? group.key,
				data: group.val.length
			};
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

<main class="mt-4">
	<TotalVisits total={data.length} perDay={data.length / duration} />
	<PieChart dataset={piedata} />

	<Line dataset={linedata} {titles} />
</main>

<style>
	main {
		min-height: 100%;
	}
</style>
