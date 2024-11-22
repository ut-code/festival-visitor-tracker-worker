<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { dataset: { name: string; data: number[] }[]; titles: Date[] };
	const { dataset, titles }: Props = $props();
	onMount(() => {
		console.log(titles);
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
			categories: titles.map((title) => title.toISOString())
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm'
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
