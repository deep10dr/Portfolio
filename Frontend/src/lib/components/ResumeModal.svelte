<script>
	import { fade, scale } from 'svelte/transition';
	import { X, Download, ExternalLink, FileText, Check } from '@lucide/svelte';
	import { isResumeOpen, closeResume, downloadResume } from '$lib/resumeModal.svelte.js';
	import { success } from '$lib/toast.svelte.js';

	let isOpen = $derived(isResumeOpen());
	let isDownloading = $state(false);

	function handleDownload() {
		isDownloading = true;
		downloadResume();
		success('Downloading Deepak_Resume.pdf...');
		setTimeout(() => {
			isDownloading = false;
		}, 2000);
	}

	function handleBackdropClick(e) {
		if (e.target === e.currentTarget) {
			closeResume();
		}
	}

	$effect(() => {
		if (isOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = originalOverflow;
			};
		}
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (isOpen && e.key === 'Escape') closeResume();
	}}
/>

{#if isOpen}
	<!-- Modal Backdrop Overlay -->
	<div
		class="fixed inset-0 z-[9998] bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 150 }}
		onclick={handleBackdropClick}
		onkeydown={(e) => {
			if (e.key === 'Escape') closeResume();
		}}
		role="dialog"
		aria-modal="true"
		aria-label="Resume PDF Viewer"
		tabindex="-1"
	>
		<!-- Modal Window Container -->
		<div
			class="relative w-full max-w-5xl h-[88vh] bg-[#FCF6DC] rounded-2xl md:rounded-3xl shadow-2xl border-2 border-[#44A4D8]/30 flex flex-col overflow-hidden text-[#4C1A0F]"
			in:scale={{ duration: 220, start: 0.95 }}
			out:scale={{ duration: 160, start: 0.98 }}
		>
			<!-- Modal Header Bar -->
			<div
				class="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/95 border-b border-[#44A4D8]/20 shrink-0"
			>
				<!-- Document Title & Meta -->
				<div class="flex items-center gap-3">
					<div
						class="w-9 h-9 rounded-xl bg-[#F68E0B]/15 border border-[#F68E0B]/30 text-[#F68E0B] flex items-center justify-center shrink-0 shadow-xs"
					>
						<FileText size={18} />
					</div>
					<div>
						<div class="flex items-center gap-2">
							<h3 class="font-extrabold text-sm sm:text-base text-[#4C1A0F] tracking-tight">
								Deepak_Resume.pdf
							</h3>
							<span
								class="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#44A4D8]/15 text-[#4A8EAC] px-2 py-0.5 rounded-md"
							>
								PDF Preview
							</span>
						</div>
						<p class="text-xs text-[#4C1A0F]/65 font-medium hidden sm:block">
							Software Engineer • B.E. Computer Science and Engineering
						</p>
					</div>
				</div>

				<!-- Header Controls -->
				<div class="flex items-center gap-2">
					<!-- Download Button -->
					<button
						onclick={handleDownload}
						class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#F68E0B] hover:bg-[#EE7B48] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer border-none"
						title="Download Resume as PDF file"
					>
						{#if isDownloading}
							<Check size={15} />
							<span>Downloaded</span>
						{:else}
							<Download size={15} />
							<span>Download</span>
						{/if}
					</button>

					<!-- Open in New Tab Button -->
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#44A4D8]/10 text-[#4C1A0F] border border-[#44A4D8]/30 text-xs sm:text-sm font-semibold transition cursor-pointer no-underline"
						title="Open PDF in a new browser tab"
					>
						<ExternalLink size={15} />
						<span>New Tab</span>
					</a>

					<!-- Close Button -->
					<button
						onclick={closeResume}
						class="w-9 h-9 rounded-xl bg-white/80 hover:bg-red-500/10 text-[#4C1A0F]/70 hover:text-red-600 border border-[#4C1A0F]/15 hover:border-red-400/40 transition flex items-center justify-center cursor-pointer ml-1"
						aria-label="Close resume viewer"
						title="Close (Esc)"
					>
						<X size={18} />
					</button>
				</div>
			</div>

			<!-- Modal Body: Embedded PDF Viewer -->
			<div class="flex-1 w-full bg-[#1E293B] relative overflow-hidden flex flex-col">
				<iframe
					src="/resume.pdf#view=FitH"
					title="Deepak S - Resume Preview"
					class="w-full h-full border-none bg-white"
				></iframe>
			</div>

			<!-- Modal Footer: Helper Info Bar -->
			<div
				class="px-4 py-2 bg-white/95 border-t border-[#44A4D8]/20 flex items-center justify-between text-xs text-[#4C1A0F]/70 font-medium shrink-0"
			>
				<span class="flex items-center gap-1.5">
					<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
					<span>Ready to view and download</span>
				</span>
				<div class="flex items-center gap-3">
					<a
						href="/resume.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="sm:hidden text-[#44A4D8] font-bold flex items-center gap-1 no-underline"
					>
						<ExternalLink size={13} />
						<span>Open Tab</span>
					</a>
					<button
						onclick={closeResume}
						class="text-[#4C1A0F]/60 hover:text-[#4C1A0F] bg-transparent border-none cursor-pointer font-semibold"
					>
						Press <kbd class="px-1.5 py-0.5 rounded bg-black/5 border border-black/10 font-mono text-[10px]">Esc</kbd> to close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
