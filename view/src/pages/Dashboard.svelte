<script lang="ts">
	import TotalVisits from '~/components/TotalVisits.svelte';
	import Line from '~/components/charts/Line.svelte';
	import PieChart from '~/components/charts/PieChart.svelte';
	import type { Visit } from '~/db/schema';
	import { HOUR, MINUTE } from '~/lib/consts';
	import { groupBy, groupByTime, stairs } from '~/lib/utils';
	import type { Kind } from '~/share/schema';

	const URL_LABELS = new Map([
		['keiba.utcode.net', '競馬 AI'],
		['maze.utcode.net', 'はじプロ/迷路'],
		['blosite.utcode.net', 'Blosite'],
		['mahjong.utcode.net', '一人麻雀'],
		['othello.utcode.net', 'オセロ'],
		['security.utcode.net', 'セキュリティ']
	]);

	type Props = {
		data: Visit[];
		last: Date;
		start: Date;
		kind: Kind | 'all';
	};
	const { data, last, start }: Props = $props();
	function clamp(target: number, min: number, max: number) {
		return Math.min(Math.max(target, min), max);
	}
	const duration = $derived(last?.getTime() - start?.getTime());

	const SAMPLING_RATE = 30 * MINUTE;
	const SAMPLING_COUNT = $derived(clamp(duration / SAMPLING_RATE, 24, 120));
	const sanitizedData = $derived(
		data.map((item) => {
			const sanitized = item.url.split('://')[1]?.split('/')[0];
			if (!sanitized) return item;
			return {
				...item,
				url: sanitized
			};
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

	const titles = $derived(
		stairs(SAMPLING_COUNT, SAMPLING_RATE).map((v) => new Date(v + start.getTime()))
	);
	const linedata = $derived(
		grouped.map((e) => ({
			name: URL_LABELS.get(e.key) ?? e.key,
			data: groupByTime(
				last,
				start,
				e.val.map((i) => i.at),
				SAMPLING_COUNT
			)
		}))
	);
</script>

<main class="mt-4">
	<TotalVisits total={data.length} {duration} />
	<PieChart dataset={piedata} />

	<Line dataset={linedata} {titles} />
</main>

<style>
	main {
		min-height: 100%;
	}
</style>
