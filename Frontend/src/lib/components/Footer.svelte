<script>
	import { ChevronUp, Plus, Minus, MapPin, Mail, Phone } from '@lucide/svelte';
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import LeetcodeIcon from '$lib/icons/LeetcodeIcon.svelte';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';

	let isOpen1 = $state(false);
	let isOpen3 = $state(false);

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

<footer class="bg-[#4A8EAC] text-[#FCF6DC] pt-14 pb-8 mt-16 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden">
	<!-- Top Subtle Accent Gradient Line -->
	<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#44A4D8] via-[#F68E0B] to-[#F7BBAB]"></div>

	<div class="max-w-6xl mx-auto px-6">
		<div class="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
			<!-- Column 1: Brand & Tagline (5 cols) -->
			<div class="md:col-span-5 space-y-4">
				<button
					onclick={() => scrollTo('hero')}
					class="flex items-center gap-2 cursor-pointer select-none bg-transparent border-none text-white font-black text-2xl tracking-tight text-left p-0"
				>
					<span
						class="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30 shadow-xs"
					>
						<span class="text-base font-black">D</span>
					</span>
					<span class="font-extrabold tracking-tight">
						Deepak<span class="text-[#F68E0B]">.</span>
					</span>
				</button>

				<p class="text-[#FCF6DC]/90 text-sm leading-relaxed max-w-sm font-medium">
					Software Engineer passionate about Web Development, DevOps, and Systems-level programming.
					Building practical solutions, exploring new technologies, and learning by breaking things.
				</p>

				<!-- Social Icon Pills -->
				<div class="flex items-center gap-2.5 pt-2">
					<a
						href="https://www.linkedin.com/in/deepak-s-dr"
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn"
						aria-label="LinkedIn"
						class="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F68E0B] text-[#FCF6DC] hover:text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
					>
						<LinkedinIcon size={18} />
					</a>
					<a
						href="https://github.com/deep10dr/"
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub"
						aria-label="GitHub"
						class="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F68E0B] text-[#FCF6DC] hover:text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
					>
						<GithubIcon size={18} />
					</a>
					<a
						href="https://leetcode.com/u/deepdr10/"
						target="_blank"
						rel="noopener noreferrer"
						title="LeetCode"
						aria-label="LeetCode"
						class="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F68E0B] text-[#FCF6DC] hover:text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
					>
						<LeetcodeIcon size={18} />
					</a>
					<a
						href="https://www.instagram.com/deep_dr_46"
						target="_blank"
						rel="noopener noreferrer"
						title="Instagram"
						aria-label="Instagram"
						class="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#F68E0B] text-[#FCF6DC] hover:text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
					>
						<InstagramIcon size={18} />
					</a>
				</div>
			</div>

			<!-- Column 2: Quick Links (3 cols) -->
			<div class="md:col-span-3 space-y-3">
				<button
					onclick={() => (isOpen1 = !isOpen1)}
					class="flex justify-between items-center cursor-pointer w-full bg-transparent border-none text-inherit text-left p-0"
				>
					<h3 class="text-lg font-bold text-white uppercase tracking-wider">Navigation</h3>
					<div class="md:hidden">
						{#if isOpen1}
							<Minus size={18} />
						{:else}
							<Plus size={18} />
						{/if}
					</div>
				</button>
				<ul
					class="{isOpen1
						? 'flex'
						: 'hidden'} md:flex flex-col space-y-2.5 list-none p-0 m-0 text-sm font-medium text-[#FCF6DC]/90"
				>
					<li>
						<button
							onclick={() => scrollTo('hero')}
							class="hover:text-[#F68E0B] transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-inherit"
						>
							Home
						</button>
					</li>
					<li>
						<button
							onclick={() => scrollTo('about')}
							class="hover:text-[#F68E0B] transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-inherit"
						>
							About Me
						</button>
					</li>
					<li>
						<button
							onclick={() => scrollTo('skills')}
							class="hover:text-[#F68E0B] transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-inherit"
						>
							Technologies
						</button>
					</li>
					<li>
						<button
							onclick={() => scrollTo('projects')}
							class="hover:text-[#F68E0B] transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-inherit"
						>
							Projects
						</button>
					</li>
					<li>
						<button
							onclick={() => scrollTo('contact')}
							class="hover:text-[#F68E0B] transition-colors cursor-pointer bg-transparent border-none text-left p-0 text-inherit"
						>
							Contact
						</button>
					</li>
				</ul>
			</div>

			<!-- Column 3: Contact Summary (4 cols) -->
			<div class="md:col-span-4 space-y-3">
				<button
					onclick={() => (isOpen3 = !isOpen3)}
					class="flex justify-between items-center cursor-pointer w-full bg-transparent border-none text-inherit text-left p-0"
				>
					<h3 class="text-lg font-bold text-white uppercase tracking-wider">Contact Info</h3>
					<div class="md:hidden">
						{#if isOpen3}
							<Minus size={18} />
						{:else}
							<Plus size={18} />
						{/if}
					</div>
				</button>
				<ul
					class="{isOpen3
						? 'flex'
						: 'hidden'} md:flex flex-col space-y-3 list-none p-0 m-0 text-sm text-[#FCF6DC]/90"
				>
					<li class="flex items-center gap-2.5">
						<MapPin size={16} class="text-[#F68E0B] shrink-0" />
						<span>Salem, Tamil Nadu, India</span>
					</li>
					<li class="flex items-center gap-2.5">
						<Mail size={16} class="text-[#F68E0B] shrink-0" />
						<a
							href="mailto:deepakofficial81@gmail.com"
							class="hover:text-[#F68E0B] transition-colors break-all"
						>
							deepakofficial81@gmail.com
						</a>
					</li>
					<li class="flex items-center gap-2.5">
						<Phone size={16} class="text-[#F68E0B] shrink-0" />
						<a href="tel:+918015744859" class="hover:text-[#F68E0B] transition-colors">
							+91 8015744859
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Footer Bottom Strip -->
		<div
			class="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#FCF6DC]/80"
		>
			<div class="flex items-center gap-2">
				<DuckIcon size={18} class="drop-shadow-xs inline-block" />
				<span>Built with SvelteKit, Tailwind CSS & Rubber Duck Debugging</span>
			</div>

			<p class="m-0 text-center sm:text-left">
				&copy; {new Date().getFullYear()} Deepak. All Rights Reserved.
			</p>

			<!-- Back to Top Button -->
			<div>
				<button
					onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					aria-label="Back to top"
					title="Back to top"
					class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-[#F68E0B] text-white transition duration-300 border border-white/25 cursor-pointer shadow-xs hover:scale-105"
				>
					<span class="text-xs font-bold">Top</span>
					<ChevronUp size={16} />
				</button>
			</div>
		</div>
	</div>
</footer>
