<script lang="ts">
	import { onMount } from 'svelte';
	type Props = {
		dataset: { data: number; label: string }[];
	};
	const { dataset }: Props = $props();
	const sorted = $derived(dataset.toSorted((a, b) => b.data - a.data));
	const series = $derived(sorted.map((entry) => entry.data));
	const labels = $derived(sorted.map((entry) => entry.label));
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
