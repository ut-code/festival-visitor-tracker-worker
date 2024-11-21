<script lang="ts">
	import Dashboard from '~/pages/Dashboard.svelte';
	import type { PageData } from './$types';
	import type { Kind } from '~/share/schema';
	import type { Visit } from '~/db/schema';
	type Props = { data: PageData };
	const { data }: Props = $props();
	let visits = $state(data.visits);

	let kind: Kind | 'all' = $state('all');
	let duration: number = $state(3);
	let lastFetch: Date = $state(new Date());
	$effect(() => {
		visits = fetch(`/visits?kind=${kind}&duration=${duration}`)
			.then((res) => res.json() as Promise<Visit[]>)
			.then((val) => {
				lastFetch = new Date();
				return val;
			});
	});
</script>

<header>
	<select name="duration" bind:value={duration} class="select w-full max-w-sm">
		<option value={1}>1 days</option>
		<option value={3}>3 days</option>
		<option value={5}>5 days</option>
		<option value={90}>3 Months</option>
		<option value={370}>1 Year</option>
	</select>
	<select name="kind" bind:value={kind} class="select w-full max-w-sm">
		<option value="all">All</option>
		<option value="festival">Festival</option>
	</select>
</header>
{#await visits}
	Loading...
{:then visits}
	<Dashboard data={visits} {duration} {kind} {lastFetch} />
{:catch err}
	error: {err}
{/await}
