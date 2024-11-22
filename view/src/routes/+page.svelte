<script lang="ts">
	import * as v from 'valibot';
	import Dashboard from '~/pages/Dashboard.svelte';
	import { type Kind, visit } from '~/share/schema';
	import type { PageData } from './$types';
	type Props = { data: PageData };
	const { data }: Props = $props();
	let visits = $state(data.visits);

	let kind: Kind | 'all' = $state('all');
	let duration: number = $state(3);
	let lastFetch: Date = $state(new Date());
	$effect(() => {
		visits = fetch(`/visits?kind=${kind}&duration=${duration}`)
			.then((res) => res.json())
			.then((val) => {
				const parsed = v.safeParse(v.array(visit), val);
				if (!parsed.success) {
					console.error(val, parsed.issues);
					throw new Error();
				}
				return parsed.output;
			})
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
	error: {err.message}
{/await}
