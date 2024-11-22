<script lang="ts">
	import Dashboard from '~/pages/Dashboard.svelte';
	import { data } from './data';
</script>

<Dashboard {data} lastFetch={new Date()} duration={3} kind="festival" />
