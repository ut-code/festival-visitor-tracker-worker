<script lang="ts">
	import Dashboard from '~/pages/Dashboard.svelte';
	import { data } from './data';
	import { DAY } from '~/lib/consts';
	const duration = 3 * DAY;
</script>

<Dashboard {data} lastFetch={new Date()} {duration} kind="festival" />
