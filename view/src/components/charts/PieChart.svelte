<script lang="ts">
	import { onMount } from 'svelte';
	type Props = {
		dataset: { data: number; label: string }[];
	};
	const { dataset }: Props = $props();
	const series = $derived(dataset.map((entry) => entry.data));
	const labels = $derived(dataset.map((entry) => entry.label));
	const options = $derived({
		chart: {
			height: 300,
			type: 'donut'
		},
		series,
		labels,
		dataLabels: {
			enabled: true,
			formatter: (pc: number) => `${Math.floor(pc)}%`,
			dropShadow: {}
		}
	});
	onMount(async () => {
		const { default: ApexCharts } = await import('apexcharts');
		const chart = new ApexCharts(document.querySelector('#chart-pie'), options);
		await chart.render();
		console.log('rendered');
	});
</script>

<span class="inline-block" id="chart-pie"></span>
