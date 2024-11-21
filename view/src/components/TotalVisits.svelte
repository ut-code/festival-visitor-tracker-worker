<script lang="ts">
	const { total, perDay }: { total: number; perDay: number } = $props();
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Total Visits</h2>
		<span class="text-xl">{total}</span>
		<hr />
		<span class="text-xl">
			{perDay} / day
		</span>
	</div>
</div>
