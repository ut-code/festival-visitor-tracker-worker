<script lang="ts">
	import Line from '~/components/charts/Line.svelte';
	import { data } from './data';
	import { groupBy, groupByHour } from '~/lib/utils';

	const URL_LABELS = new Map([
		['https://keiba.utcode.net/', 'keiba'],
		['https://maze.utcode.net/', 'maze'],
		['https://blosite.utcode.net/', 'blosite'],
		['https://mahjong.utcode.net/', 'mahjong'],
		['https://othello.utcode.net/', 'othello'],
		['https://security.utcode.net/', 'security']
	]);
	const grouped = $derived(groupBy(data, (item) => item.url));
	const now = new Date();
	const titles = $derived(groupByHour(now, grouped[0].val).map((v) => v[1]));
	const linedata = $derived(
		grouped.map((e) => ({
			name: URL_LABELS.get(e.key) ?? e.key,
			data: groupByHour(now, e.val).map((v) => v[0])
		}))
	);
</script>

<Line dataset={linedata} {titles} />
