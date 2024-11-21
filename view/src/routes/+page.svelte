<script lang="ts">
	import Dashboard from '@pages/Dashboard.svelte';
	import type { PageData } from './$types';
	type Props = { data: PageData };
	const { data }: Props = $props();
</script>

{#await data.visits}
	Loading...
{:then data}
	<Dashboard {data} />
{:catch err}
	error: {err}
{/await}
