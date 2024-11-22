<script lang="ts">
	const { total, duration }: { total: number; duration: number } = $props();
	const MS_PER_HOUR = 60 * 60 * 1000;
	const MS_PER_DAY = 24 * 60 * 60 * 1000;
	const perHour = $derived(total / (duration / MS_PER_HOUR));
	const perDay = $derived(total / (duration / MS_PER_DAY));
</script>

<div class="card card-compact inline-block w-96 bg-base-100 align-top shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Total Visits</h2>
		<span class="text-xl">{total}</span>
		<hr />
		<span class="text-xl">
			{perHour.toFixed(1)} / Hour, {perDay.toFixed(1)} / Day
		</span>
	</div>
</div>
