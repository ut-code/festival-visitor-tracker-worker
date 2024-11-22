<script lang="ts">
	const { total, duration }: { total: number; duration: number } = $props();
	import { HOUR, DAY } from '$lib/consts';
	const perHour = $derived(total / (duration / HOUR));
	const perDay = $derived(total / (duration / DAY));
</script>

<div class="card card-compact inline-block w-96 max-w-[90vw] bg-base-100 align-top shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Total Visits</h2>
		<span class="text-xl">{total}</span>
		<hr />
		<span class="text-xl">
			{perHour.toFixed(1)} / Hour, {perDay.toFixed(1)} / Day
		</span>
	</div>
</div>
