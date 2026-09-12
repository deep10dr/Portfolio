<script>
	import { fade, scale, fly } from 'svelte/transition';
	import {
		Home,
		User,
		Boxes,
		Layers,
		Mail,
		ChevronDown,
		Menu,
		X,
		FileText,
		ArrowUp
	} from '@lucide/svelte';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';

	let isMenuOpen = $state(false);
	let isQuickNavOpen = $state(false);
	let activeSection = $state('hero');
	let scrollY = $state(0);

	const navLinks = [
		{ to: 'hero', label: 'Home', icon: Home, number: '01' },
		{ to: 'about', label: 'About', icon: User, number: '02' },
		{ to: 'skills', label: 'Technologies', icon: Boxes, number: '03' },
		{ to: 'projects', label: 'Projects', icon: Layers, number: '04' },
		{ to: 'contact', label: 'Contact', icon: Mail, number: '05' }
	];

	// In the Home/Hero section near top of page
	let isHomeSection = $derived(activeSection === 'hero' && scrollY < 120);

	// Active section meta info
	let currentMeta = $derived(
		navLinks.find((l) => l.to === activeSection) || navLinks[0]
	);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
			activeSection = id;
		}
		isMenuOpen = false;
		isQuickNavOpen = false;
	}

	$effect(() => {
		function handleResize() {
			if (window.innerWidth >= 768) isMenuOpen = false;
		}
		window.addEventListener('resize', handleResize);

		// IntersectionObserver to dynamically highlight current section
		const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
		const observerOptions = {
			root: null,
			rootMargin: '-30% 0px -40% 0px',
			threshold: 0
		};

		const observer = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					activeSection = entry.target.id;
				}
			}
		}, observerOptions);

		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}

		function handleClickOutside(e) {
			const target = e.target;
			if (!target?.closest?.('#circle-nav-container')) {
				isQuickNavOpen = false;
			}
		}
		window.addEventListener('click', handleClickOutside);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('click', handleClickOutside);
			observer.disconnect();
		};
	});
</script>

<svelte:window bind:scrollY />

<!-- CASE 1: FULL NAVBAR (At Home/Hero Section) -->
{#if isHomeSection}
	<header
		class="fixed top-3 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 transition-all duration-300"
		in:fly={{ y: -20, duration: 300 }}
		out:fade={{ duration: 150 }}
	>
		<nav
			class="bg-white/85 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(76,26,15,0.08)] rounded-2xl px-5 py-2.5 flex justify-between items-center transition-all duration-300"
		>
			<!-- Brand Logo -->
			<button
				onclick={() => scrollTo('hero')}
				class="flex items-center gap-2 cursor-pointer select-none bg-transparent border-none text-[#4C1A0F] font-black text-xl tracking-tight group"
			>
				<span
					class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#44A4D8] to-[#4A8EAC] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform"
				>
					<span class="text-sm font-black">D</span>
				</span>
				<span class="font-extrabold tracking-tight">
					Deepak<span class="text-[#F68E0B]">.</span>
				</span>
				<DuckIcon
					size={18}
					class="hidden sm:inline-block opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300"
				/>
			</button>

			<!-- Desktop Navigation Links -->
			<div class="hidden md:flex items-center gap-1.5 font-semibold text-sm">
				{#each navLinks as link}
					<button
						onclick={() => scrollTo(link.to)}
						class="cursor-pointer px-3.5 py-1.5 rounded-xl transition-all duration-200 border-none {activeSection ===
						link.to
							? 'bg-[#F68E0B] text-white font-bold shadow-xs'
							: 'text-[#4C1A0F]/80 hover:text-[#44A4D8] hover:bg-[#44A4D8]/10 bg-transparent'}"
					>
						{link.label}
					</button>
				{/each}
			</div>

			<!-- Right Side Resume Quick Link (Desktop) -->
			<div class="hidden md:flex items-center gap-3">
				<a
					href="/resume.pdf"
					download="Deepak_Resume.pdf"
					class="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-[#44A4D8]/15 text-[#44A4D8] hover:bg-[#44A4D8] hover:text-white transition-all duration-200 border border-[#44A4D8]/25 shadow-2xs"
				>
					<FileText size={14} />
					<span>Resume</span>
				</a>
			</div>

			<!-- Mobile Menu Toggle Button -->
			<button
				class="md:hidden text-2xl focus:outline-none cursor-pointer text-[#4C1A0F] p-1.5 rounded-xl hover:bg-black/5 transition bg-transparent border-none"
				onclick={toggleMenu}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</nav>

		<!-- Mobile Dropdown Menu -->
		{#if isMenuOpen}
			<div
				class="bg-white/95 backdrop-blur-xl md:hidden mt-2 rounded-2xl p-4 shadow-xl border border-white/80 flex flex-col space-y-2 transition-all duration-300"
			>
				{#each navLinks as link}
					<button
						onclick={() => scrollTo(link.to)}
						class="w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 border-none font-semibold text-sm {activeSection ===
						link.to
							? 'bg-[#F68E0B] text-white shadow-xs font-bold'
							: 'text-[#4C1A0F]/80 bg-transparent hover:bg-[#44A4D8]/10'}"
					>
						{link.label}
					</button>
				{/each}
				<div class="pt-2 border-t border-[#4C1A0F]/10">
					<a
						href="/resume.pdf"
						download="Deepak_Resume.pdf"
						class="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#44A4D8] text-white font-bold text-xs shadow-xs"
					>
						<FileText size={14} />
						<span>Download Resume</span>
					</a>
				</div>
			</div>
		{/if}
	</header>

<!-- CASE 2: SHRUNK INTO CIRCLE AT TOP-LEFT (While scrolling or except home section) -->
{:else}
	{@const CurrentIcon = currentMeta.icon}
	<div
		id="circle-nav-container"
		class="fixed top-4 left-4 sm:left-6 z-50 flex items-center gap-2 select-none"
		in:fly={{ x: -25, duration: 250 }}
		out:fade={{ duration: 150 }}
	>
		<!-- Left Top Circle Widget -->
		<button
			onclick={(e) => {
				e.stopPropagation();
				isQuickNavOpen = !isQuickNavOpen;
			}}
			class="relative w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl border-2 border-[#44A4D8] shadow-xl flex items-center justify-center text-[#44A4D8] hover:border-[#F68E0B] hover:text-[#F68E0B] hover:scale-105 transition-all duration-300 cursor-pointer group"
			title="Current Section: {currentMeta.label} (Click for menu)"
			aria-label="Current Section: {currentMeta.label}"
		>
			<CurrentIcon size={20} class="group-hover:scale-110 transition-transform" />
			<!-- Mini Active Glow Ping -->
			<span
				class="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#F68E0B] border-2 border-white animate-pulse"
			></span>
		</button>

		<!-- Section Name Pill attached to circle -->
		<button
			onclick={(e) => {
				e.stopPropagation();
				isQuickNavOpen = !isQuickNavOpen;
			}}
			class="bg-white/90 backdrop-blur-xl border border-[#44A4D8]/30 shadow-md px-3.5 py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4C1A0F] hover:border-[#F68E0B] hover:text-[#F68E0B] transition-all cursor-pointer group"
			title="Current: {currentMeta.label}. Click to switch sections."
		>
			<span
				class="text-[10px] font-extrabold uppercase tracking-wider text-[#44A4D8] bg-[#44A4D8]/10 px-1.5 py-0.5 rounded-md"
			>
				{currentMeta.number}
			</span>
			<span>{currentMeta.label}</span>
			<ChevronDown
				size={14}
				class="text-[#4C1A0F]/60 group-hover:text-[#F68E0B] transition-transform duration-200 {isQuickNavOpen
					? 'rotate-180'
					: ''}"
			/>
		</button>

		<!-- Quick Nav Dropdown Menu -->
		{#if isQuickNavOpen}
			<div
				class="absolute top-14 left-0 w-60 bg-white/95 backdrop-blur-2xl rounded-2xl p-2.5 shadow-2xl border-2 border-[#44A4D8]/30 space-y-1 z-50 text-[#4C1A0F]"
				in:scale={{ duration: 180, start: 0.95 }}
				out:fade={{ duration: 120 }}
			>
				<div
					class="px-3 py-1.5 border-b border-[#4C1A0F]/10 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-[#4A8EAC]"
				>
					<span class="flex items-center gap-1.5">
						<DuckIcon size={14} />
						<span>Section {currentMeta.number} / 05</span>
					</span>
					<span class="text-[#F68E0B] font-bold">Quick Jump</span>
				</div>

				{#each navLinks as link}
					{@const IconComponent = link.icon}
					<button
						onclick={() => scrollTo(link.to)}
						class="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer border-none {activeSection ===
						link.to
							? 'bg-[#F68E0B] text-white shadow-xs font-bold'
							: 'hover:bg-[#44A4D8]/15 text-[#4C1A0F] bg-transparent'}"
					>
						<div class="flex items-center gap-2.5">
							<IconComponent
								size={16}
								class={activeSection === link.to ? 'text-white' : 'text-[#44A4D8]'}
							/>
							<span>{link.label}</span>
						</div>
						{#if activeSection === link.to}
							<span
								class="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-1.5 py-0.5 rounded"
							>
								Here
							</span>
						{/if}
					</button>
				{/each}

				<div class="pt-2 border-t border-[#4C1A0F]/10 flex items-center gap-2">
					<a
						href="/resume.pdf"
						download="Deepak_Resume.pdf"
						class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#44A4D8] hover:bg-[#4A8EAC] text-white font-bold text-xs shadow-xs transition"
					>
						<FileText size={13} />
						<span>Resume</span>
					</a>
					<button
						onclick={() => scrollTo('hero')}
						title="Back to Top"
						class="p-2 rounded-xl bg-[#FCF1D4] hover:bg-[#F68E0B] text-[#4C1A0F] hover:text-white border border-[#44A4D8]/20 transition cursor-pointer"
					>
						<ArrowUp size={15} />
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

