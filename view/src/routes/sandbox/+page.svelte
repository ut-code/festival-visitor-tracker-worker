<script lang="ts">
	import Dashboard from '~/pages/Dashboard.svelte';
	import { data } from './data';
	import { DAY } from '~/lib/consts';
	const last = new Date();
	const start = new Date(last.getTime() - 3 * DAY);
</script>

<Dashboard {data} {last} {start} kind="festival" />
