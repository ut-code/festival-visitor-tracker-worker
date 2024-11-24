<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { dataset: { name: string; data: number[] }[]; titles: Date[] };
	const { dataset, titles }: Props = $props();
	onMount(() => {
		console.log(titles);
		console.log(dataset);
	});
	const options = {
		series: dataset,
		chart: {
			height: 350,
			type: 'area'
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'smooth'
		},
		xaxis: {
			type: 'datetime',
			// it's written in UTC time for some reason. converting to JST.
			categories: titles.map((title) =>
				new Date(title?.getTime() + 9 * 60 * 60 * 1000).toISOString()
			)
		},
		tooltip: {
			x: {
				format: 'MM/dd HH:mm'
			}
		}
	};
	onMount(async () => {
		const { default: ApexCharts } = await import('apexcharts');
		const chart = new ApexCharts(document.querySelector('#chart-line'), options);
		chart.render();
	});
</script>

<div id="chart-line"></div>
