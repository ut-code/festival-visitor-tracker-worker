<script lang="ts">
	import type { Visit } from '~/db/schema';
	import Dashboard from '~/pages/Dashboard.svelte';
	import type { Kind } from '~/share/schema';
	type Props = { last: Date; start: Date; visits: Visit[]; kind: Kind | 'all' };
	const { start, last, visits, kind }: Props = $props();

	let data: Promise<Visit[]> = $state(new Promise((resolve) => resolve(visits)));

	$effect(() => {
		console.log('start:', start, 'last:', last);
		const startTime = start?.getTime();
		const lastTime = last?.getTime();
		const filtered = visits.filter(
			(visit) =>
				(kind === 'all' || visit.kind === kind) &&
				visit.at.getTime() > startTime &&
				visit.at.getTime() < lastTime
		);
		data = new Promise((resolve) => {
			setTimeout(() => {
				resolve(filtered);
			}, 10);
		});
	});
</script>

{#await data}
	<div class="flex h-full items-center justify-center text-center">
		<span class="loading loading-bars loading-lg"></span>
	</div>
{:then visits}
	<Dashboard data={visits} {start} {kind} {last} />
{/await}
