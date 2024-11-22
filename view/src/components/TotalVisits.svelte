<script lang="ts">
	const { total, perDay }: { total: number; perDay: number } = $props();
</script>

<div class="card card-compact inline-block w-96 bg-base-100 align-top shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Total Visits</h2>
		<span class="text-xl">{total}</span>
		<hr />
		<span class="text-xl">
			{perDay.toFixed(1)} / day
		</span>
	</div>
</div>
