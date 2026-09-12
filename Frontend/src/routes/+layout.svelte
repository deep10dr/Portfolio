<script>
	import '$lib/app.css';
	import Toast from '$lib/components/Toast.svelte';
	import DuckGuide from '$lib/components/DuckGuide.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Deepak's Portfolio</title>
</svelte:head>

<Toast />
<DuckGuide />
{@render children()}
