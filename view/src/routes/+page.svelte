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
				console.error(val, parsed.issues);
				throw new Error(parsed.issues.toString());
			}
			return parsed.output;
		});

	let kind: Kind | 'all' = $state('all');
	let duration: number = $state(12 * HOUR);
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
	let last: Date = $state(today);
	console.log(last);
	let start: Date = $state(new Date(today.getTime() - 1 * DAY));
	console.log(start);
</script>

<header>
	Since: <input class="" type="date" bind:value={start} />
	To: <input class="" type="date" bind:value={last} />
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
	<Loaded {visits} {duration} {last} {start} {kind} />
{:catch err}
	error: {err.message}
{/await}
