<script lang="ts">
	import Loaded from './loaded.svelte';
	import { HOUR, DAY } from '~/lib/consts';
	import * as v from 'valibot';
	import { type Kind, visit } from '~/share/schema';
	const visits = fetch('/visits', { headers: { 'Api-Version': '2' } })
		.then((res) => res.json())
		.then((val) => {
			const parsed = v.safeParse(v.array(visit), val);
			if (!parsed.success) {
				console.error('error:', parsed.issues, 'got:', val);
				throw new Error('parse error -- see console for actual error');
			}
			return parsed.output;
		})
		.then((val) => {
			lastFetch = new Date();
			return val;
		});

	let kind: Kind | 'all' = $state('all');
	let duration: number = $state(12 * HOUR);
	let lastFetch: Date = $state(new Date());
</script>

<header>
	<select name="duration" bind:value={duration} class="select select-bordered w-full max-w-sm">
		<option value={3 * HOUR}>3 hours</option>
		<option value={6 * HOUR}>6 hours</option>
		<option selected value={12 * HOUR}>12 hours</option>
		<option value={1 * DAY}>1 day</option>
		<option value={3 * DAY}>3 days</option>
		<option value={6 * DAY}>6 days</option>
	</select>
	<select name="kind" bind:value={kind} class="select select-bordered w-full max-w-sm">
		<option value="all">All</option>
		<option value="festival">Festival</option>
	</select>
</header>
{#await visits}
	<div class="flex h-full items-center justify-center text-center">
		<span class="loading loading-bars loading-lg"></span>
	</div>
{:then visits}
	<Loaded {visits} {duration} {lastFetch} {kind} />
{:catch err}
	error: {err.message}
{/await}
