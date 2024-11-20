<script lang="ts">
	import type { PageData } from './$types';
	type Props = { data: PageData };
	const { data }: Props = $props();
</script>

{#await data.visits}
	Loading...
{:then data}
	data: {JSON.stringify(data)}
{:catch err}
	error: {err}
{/await}
