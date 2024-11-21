<script lang="ts">
	import type { Visit } from '~/share/schema';
	type Props = {
		values: Map<string, Visit[]>;
	};
	const { values }: Props = $props();
	const data = $derived(lengths(values));

	function lengths(src: Map<string, unknown[]>): Map<string, number> {
		const dst = new Map<string, number>();
		for (const [key, _] of src) {
			const entry = dst.get(key);
			if (!entry) dst.set(key, 1);
			else dst.set(key, entry + 1);
		}
		return dst;
	}
	import { Chart, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
	import 'chart.js/auto';

	let chartData: ChartData<'line', number[], string>;
	let options: ChartOptions<'line'>;

	Chart.register(Tooltip);

	let canvasElem: HTMLCanvasElement;
	let chart: Chart;

	$effect(() => {
		chart = new Chart(canvasElem, {
			type: 'line',
			data: chartData,
			options
		});

		return () => {
			chart.destroy();
		};
	});

	$effect(() => {
		if (chart) {
			chart.data = chartData;
			chart.update();
		}
	});
</script>
