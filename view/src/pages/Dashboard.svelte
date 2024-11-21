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
	const linedata = $derived(
		grouped.map((e) => ({
			key: e.key,
			val: groupByHour(lastFetch, e.val)
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

<TotalVisits total={data.length} perDay={data.length / duration} />

<Line
	data={{
		datasets: linedata.map((entry) => ({
			label: URL_LABELS.get(entry.key) ?? entry.key,
			data: entry.val
		}))
	}}
	height="600px"
	class="h-[600px]"
	options={{}}
/>
