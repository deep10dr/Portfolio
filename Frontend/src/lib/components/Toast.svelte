<script>
	import { X } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { getToasts, removeToast } from '$lib/toast.svelte.js';

	let toasts = $derived(getToasts());
</script>

<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3">
	{#each toasts as t (t.id)}
		<div
			class="flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-medium backdrop-blur-md {t.type ===
			'success'
				? 'bg-[#44A4D8] border border-white/20'
				: 'bg-[#A2321D] border border-white/20'}"
			in:fly={{ y: 40, duration: 300 }}
			out:fade={{ duration: 200 }}
		>
			<span>{t.message}</span>
			<button
				onclick={() => removeToast(t.id)}
				aria-label="Dismiss notification"
				class="bg-transparent border-none text-white/80 hover:text-white cursor-pointer ml-2"
			>
				<X size={16} />
			</button>
		</div>
	{/each}
</div>
