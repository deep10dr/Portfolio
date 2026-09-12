<script>
	import { fly, fade, scale } from 'svelte/transition';
	import {
		X,
		ChevronRight,
		ChevronLeft,
		Volume2,
		VolumeX,
		Sparkles,
		Check,
		ArrowRight,
		Trophy
	} from '@lucide/svelte';
	import { success } from '$lib/toast.svelte.js';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';

	let soundEnabled = $state(true);

	// Web Audio synthetic playful cartoon quack
	function playQuack() {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!AudioContextClass) return;
			const ctx = new AudioContextClass();
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'sawtooth';
			const now = ctx.currentTime;
			osc.frequency.setValueAtTime(320, now);
			osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

			gain.gain.setValueAtTime(0.12, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + 0.18);
		} catch {}
	}

	// Sections configuration with context-specific actions
	const tourSections = [
		{
			id: 'hero',
			title: 'Welcome & Introduction',
			badge: '1 / 5',
			message:
				"Quack! 👋 I'm Deepak's Debugging Duck. Deepak is a Software Engineer focused on backend development, systems, and modern web apps.",
			tip: 'Tip: Check out his GitHub & LeetCode profiles or download his resume!',
			actionLabel: '📄 Download Resume',
			action: () => {
				const link = document.createElement('a');
				link.href = '/resume.pdf';
				link.download = 'Deepak_Resume.pdf';
				link.click();
				success('Downloading Deepak_Resume.pdf');
			}
		},
		{
			id: 'about',
			title: 'About Me',
			badge: '2 / 5',
			message:
				"Here's what drives Deepak: asking “What happens under the hood?” and learning by breaking & building things!",
			tip: 'Tip: Look at the visual chips highlighting his core technologies.',
			actionLabel: '🛠️ Technologies',
			action: () => {
				document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'skills',
			title: 'Technologies',
			badge: '3 / 5',
			message:
				'Look at his tech architecture! Switch between the Bento Architecture view and the Quick Grid view using the toggle on the right edge.',
			tip: 'Tip: Click the floating toggle on the right edge to switch views!',
			actionLabel: '💼 Projects',
			action: () => {
				document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'projects',
			title: 'Projects',
			badge: '4 / 5',
			message:
				'Explore DeepPhotos (self-hosted on Docker & MinIO), Face Finder, and more! Switch to Spotlight mode for detailed architecture struggles.',
			tip: 'Tip: Use the Grid/Spotlight toggle on the top right to see technical challenges.',
			actionLabel: '📬 Contact',
			action: () => {
				document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'contact',
			title: 'Contact',
			badge: '5 / 5',
			message:
				'Have an idea, project, or opportunity? Drop a message here — it delivers directly to Deepak’s inbox via automated SMTP!',
			tip: 'Tip: Fill out the form or copy his email with 1-click!',
			actionLabel: '📋 Copy Email',
			action: () => {
				navigator.clipboard.writeText('deepakofficial81@gmail.com');
				success('Email copied: deepakofficial81@gmail.com');
			}
		}
	];

	let isTourEnabled = $state(true);
	let isBubbleOpen = $state(true);
	let currentSectionId = $state('hero');
	let visitedSections = $state(new Set(['hero']));

	// Exploration completion percentage
	let progressPercent = $derived(
		Math.round((visitedSections.size / tourSections.length) * 100)
	);

	// Cookie & LocalStorage helpers
	function getCookie(name) {
		if (typeof document === 'undefined') return null;
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
		return null;
	}

	function setCookie(name, val, days = 365) {
		if (typeof document === 'undefined') return;
		const maxAge = days * 24 * 60 * 60;
		document.cookie = `${name}=${val}; path=/; max-age=${maxAge}; SameSite=Lax`;
		try {
			localStorage.setItem(name, val);
		} catch {}
	}

	$effect(() => {
		const cookieVal = getCookie('duck_tour_enabled');
		let localVal = null;
		try {
			localVal = localStorage.getItem('duck_tour_enabled');
		} catch {}

		if (cookieVal === 'false' || localVal === 'false') {
			isTourEnabled = false;
			isBubbleOpen = false;
		} else {
			isTourEnabled = true;
			isBubbleOpen = true;
		}

		// Scroll observer to update current section and record visited progress
		const observerOptions = {
			root: null,
			rootMargin: '-30% 0px -40% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					currentSectionId = entry.target.id;
					visitedSections = new Set([...visitedSections, entry.target.id]);
					if (isTourEnabled) {
						isBubbleOpen = true;
					}
				}
			}
		}, observerOptions);

		for (const sec of tourSections) {
			const el = document.getElementById(sec.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	});

	function toggleTour() {
		isTourEnabled = !isTourEnabled;
		isBubbleOpen = isTourEnabled;
		if (isTourEnabled) playQuack();
		setCookie('duck_tour_enabled', isTourEnabled ? 'true' : 'false', 365);
	}

	function jumpToPrevSection() {
		const currentIndex = tourSections.findIndex((s) => s.id === currentSectionId);
		const prevIndex = (currentIndex - 1 + tourSections.length) % tourSections.length;
		const prevSec = tourSections[prevIndex];
		const el = document.getElementById(prevSec.id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			currentSectionId = prevSec.id;
			isBubbleOpen = true;
			playQuack();
		}
	}

	function jumpToNextSection() {
		const currentIndex = tourSections.findIndex((s) => s.id === currentSectionId);
		const nextIndex = (currentIndex + 1) % tourSections.length;
		const nextSec = tourSections[nextIndex];
		const el = document.getElementById(nextSec.id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			currentSectionId = nextSec.id;
			isBubbleOpen = true;
			playQuack();
		}
	}

	function handleDuckClick() {
		playQuack();
		if (!isTourEnabled) {
			toggleTour();
		} else {
			isBubbleOpen = !isBubbleOpen;
		}
	}

	let currentSection = $derived(
		tourSections.find((s) => s.id === currentSectionId) || tourSections[0]
	);
</script>

<!-- RUBBER DUCK COMPANION CONTAINER (Fixed at bottom right) -->
<div class="fixed bottom-5 right-5 z-[9990] flex flex-col items-end gap-3 pointer-events-none">
	<!-- DUCK SPEECH BUBBLE -->
	{#if isTourEnabled && isBubbleOpen}
		<div
			class="pointer-events-auto max-w-xs sm:max-w-sm w-full bg-[#FCF6DC] rounded-3xl p-4.5 border-2 border-[#44A4D8]/30 shadow-2xl space-y-3 text-[#4C1A0F] relative"
			in:fly={{ y: 20, duration: 250 }}
			out:fade={{ duration: 150 }}
		>
			<!-- Top Decorative Color Strip -->
			<div
				class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#44A4D8] via-[#F68E0B] to-[#44A4D8] rounded-t-3xl"
			></div>

			<!-- Speech Bubble Header with Sound & Close -->
			<div class="flex items-center justify-between gap-2 pt-1 border-b border-[#4C1A0F]/10 pb-2">
				<div class="flex items-center gap-1.5">
					<DuckIcon size={18} class="shrink-0" />
					<span class="text-xs font-extrabold uppercase tracking-wider text-[#44A4D8]">
						{currentSection.badge}
					</span>
					<span class="text-[11px] font-semibold text-[#4A8EAC] truncate max-w-[130px]">
						• {currentSection.title}
					</span>
				</div>

				<div class="flex items-center gap-1">
					<!-- Sound Toggle -->
					<button
						onclick={() => (soundEnabled = !soundEnabled)}
						title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
						aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
						class="p-1 rounded-md text-[#4C1A0F]/55 hover:text-[#F68E0B] hover:bg-black/5 cursor-pointer border-none bg-transparent"
					>
						{#if soundEnabled}
							<Volume2 size={15} />
						{:else}
							<VolumeX size={15} />
						{/if}
					</button>

					<!-- Close Bubble -->
					<button
						onclick={() => (isBubbleOpen = false)}
						title="Minimize speech bubble"
						aria-label="Minimize speech bubble"
						class="p-1 rounded-md text-[#4C1A0F]/55 hover:text-[#4C1A0F] hover:bg-black/5 cursor-pointer border-none bg-transparent"
					>
						<X size={15} />
					</button>
				</div>
			</div>

			<!-- Exploration Progress Bar -->
			<div class="space-y-1">
				<div class="flex items-center justify-between text-[10px] font-bold text-[#4A8EAC]">
					<span class="flex items-center gap-1">
						{#if visitedSections.size === 5}
							<Trophy size={12} class="text-[#F68E0B]" />
							<span class="text-[#F68E0B]">Portfolio Fully Explored!</span>
						{:else}
							<span>Progress: {visitedSections.size}/5 Visited</span>
						{/if}
					</span>
					<span>{progressPercent}%</span>
				</div>
				<div class="w-full h-1.5 rounded-full bg-[#FCF1D4] border border-[#44A4D8]/20 overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-[#44A4D8] to-[#F68E0B] transition-all duration-500 rounded-full"
						style="width: {progressPercent}%"
					></div>
				</div>
			</div>

			<!-- Speech Message -->
			<p class="text-xs sm:text-sm text-[#4C1A0F]/90 leading-relaxed font-medium">
				{currentSection.message}
			</p>

			<!-- Helpful Tip Callout -->
			<div
				class="p-2 rounded-xl bg-[#FCF1D4] border border-[#F68E0B]/25 text-[11px] text-[#4C1A0F]/80 flex items-center gap-1.5"
			>
				<Sparkles size={13} class="text-[#F68E0B] shrink-0" />
				<span>{currentSection.tip}</span>
			</div>

			<!-- Context Direct Action Button -->
			{#if currentSection.actionLabel}
				<div class="pt-0.5">
					<button
						onclick={currentSection.action}
						class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/95 hover:bg-[#F68E0B] text-[#4C1A0F] hover:text-white border border-[#44A4D8]/30 hover:border-transparent text-xs font-bold transition shadow-xs cursor-pointer"
					>
						<span>{currentSection.actionLabel}</span>
						<ArrowRight size={13} />
					</button>
				</div>
			{/if}

			<!-- Guided Controls Row -->
			<div class="flex items-center justify-between gap-2 pt-1 border-t border-[#4C1A0F]/10">
				<button
					onclick={toggleTour}
					title="Disable Duck Tour"
					class="inline-flex items-center gap-1 text-[11px] text-[#4C1A0F]/55 hover:text-[#A2321D] font-medium transition cursor-pointer border-none bg-transparent"
				>
					<VolumeX size={13} />
					<span>Mute Duck</span>
				</button>

				<div class="flex items-center gap-1.5">
					<button
						onclick={jumpToPrevSection}
						aria-label="Previous section"
						title="Previous section"
						class="p-1.5 rounded-full bg-white hover:bg-[#FCF1D4] text-[#4C1A0F] border border-[#44A4D8]/20 transition cursor-pointer"
					>
						<ChevronLeft size={14} />
					</button>
					<button
						onclick={jumpToNextSection}
						class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F68E0B] hover:bg-[#EE7B48] text-white font-bold text-xs transition shadow-xs cursor-pointer border-none"
					>
						<span>Next</span>
						<ChevronRight size={14} />
					</button>
				</div>
			</div>

			<!-- Cartoon Speech Tail pointing towards the duck -->
			<div
				class="absolute -bottom-2 right-8 w-4 h-4 bg-[#FCF6DC] border-r-2 border-b-2 border-[#44A4D8]/30 transform rotate-45 pointer-events-none"
			></div>
		</div>
	{/if}

	<!-- INTERACTIVE RUBBER DUCK MASCOT BUTTON -->
	<div class="pointer-events-auto flex items-center gap-2">
		<!-- Mini Status Pill when tour is disabled/collapsed -->
		{#if !isTourEnabled}
			<button
				onclick={toggleTour}
				class="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#44A4D8]/30 shadow-md text-[11px] font-bold text-[#4C1A0F] hover:border-[#F68E0B] hover:text-[#F68E0B] transition cursor-pointer flex items-center gap-1.5"
				in:fade={{ duration: 150 }}
			>
				<span>😴 Duck Asleep</span>
				<span class="text-[#F68E0B]">(Wake Up)</span>
			</button>
		{:else if !isBubbleOpen}
			<button
				onclick={() => {
					isBubbleOpen = true;
					playQuack();
				}}
				class="px-3 py-1.5 rounded-full bg-[#F68E0B] text-white shadow-md text-[11px] font-bold transition hover:bg-[#EE7B48] cursor-pointer flex items-center gap-1.5"
				in:fade={{ duration: 150 }}
			>
				<DuckIcon size={15} class="shrink-0" />
				<span>Quack! ({currentSection.badge})</span>
			</button>
		{/if}

		<!-- The Duck Avatar with Floating Animation -->
		<button
			onclick={handleDuckClick}
			title={isTourEnabled ? 'Click to quack / toggle bubble' : 'Click to wake up duck guide'}
			aria-label="Duck Guide Mascot"
			class="duck-float relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FCF1D4] to-white border-3 {isTourEnabled
				? 'border-[#F68E0B] shadow-xl hover:scale-110 active:scale-95'
				: 'border-gray-300 opacity-70 hover:opacity-100'} p-1.5 transition-all duration-300 cursor-pointer flex items-center justify-center group"
		>
			<!-- Cute Custom Rubber Duck SVG with Developer Glasses -->
			<svg
				viewBox="0 0 100 100"
				class="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:rotate-6 group-active:-rotate-6"
			>
				<!-- Duck Body -->
				<path
					d="M20 62 Q18 85 52 85 Q85 85 92 68 Q95 60 88 56 Q80 52 75 55 Q70 42 60 32 Q45 20 32 30 Q22 38 25 50 Q20 54 20 62 Z"
					fill="#FBBF24"
					stroke="#F59E0B"
					stroke-width="2.5"
				/>
				<!-- Duck Wing -->
				<path
					d="M36 63 Q46 54 62 61 Q70 66 60 75 Q44 78 36 63 Z"
					fill="#F59E0B"
					opacity="0.8"
				/>
				<!-- Orange Beak -->
				<path d="M26 40 Q8 43 12 49 Q20 54 28 49 Z" fill="#F97316" />
				<!-- Cute Blush -->
				<circle cx="38" cy="43" r="3.5" fill="#F87171" opacity="0.65" />
				<!-- Eye -->
				<circle cx="34" cy="35" r="4.5" fill="#1E293B" />
				<circle cx="35.5" cy="33.5" r="1.5" fill="#FFFFFF" />
				<!-- Developer Glasses -->
				<rect
					x="28"
					y="30"
					width="12"
					height="10"
					rx="3"
					fill="none"
					stroke="#4C1A0F"
					stroke-width="2"
				/>
				<line x1="40" y1="35" x2="45" y2="36" stroke="#4C1A0F" stroke-width="2" />
			</svg>

			<!-- Active Ping Indicator -->
			{#if isTourEnabled}
				<span
					class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F68E0B] border-2 border-white animate-pulse"
				></span>
			{/if}
		</button>
	</div>
</div>

<style>
	@keyframes duckBob {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-4px) rotate(2deg);
		}
	}
	.duck-float {
		animation: duckBob 3.5s ease-in-out infinite;
	}
</style>

