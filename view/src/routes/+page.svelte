<script lang="ts">
	import { HOUR, DAY } from '~/lib/consts';
	import * as v from 'valibot';
	import Dashboard from '~/pages/Dashboard.svelte';
	import { type Kind, visit } from '~/share/schema';
	import type { PageData } from './$types';
	type Props = { data: PageData };
	const { data }: Props = $props();
	let visits = $state(data.visits);

	let kind: Kind | 'all' = $state('all');
	let duration: number = $state(12 * HOUR);
	let lastFetch: Date = $state(new Date());
	$effect(() => {
		visits = fetch(`/visits?kind=${kind}&duration=${duration}`)
			.then((res) => res.json())
			.then((val) => {
				const parsed = v.safeParse(v.array(visit), val);
				if (!parsed.success) {
					console.error(val, parsed.issues);
					throw new Error(parsed.issues.toString());
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
	<select name="duration" bind:value={duration} class="select select-bordered w-full max-w-sm">
		<option value={3 * HOUR}>3 hours</option>
		<option value={6 * HOUR}>6 hours</option>
		<option selected value={12 * HOUR}>12 hours</option>
		<option value={1 * DAY}>1 days</option>
		<option value={3 * DAY}>3 days</option>
		<option value={6 * DAY}>6 days</option>
	</select>
	<select name="kind" bind:value={kind} class="select select-bordered w-full max-w-sm">
		<option value="all">All</option>
		<option value="festival">Festival</option>
	</select>
</header>
{#await visits}
	<div class="h-full text-center">
		<span class="loading loading-bars loading-lg"></span>
	</div>
{:then visits}
	<Dashboard data={visits} {duration} {kind} {lastFetch} />
{:catch err}
	error: {err.message}
{/await}
