<script>
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import InstagramIcon from '$lib/icons/InstagramIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import LeetcodeIcon from '$lib/icons/LeetcodeIcon.svelte';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';
	import { ArrowRight, Mail } from '@lucide/svelte';

	const words = ["Hello, I'm Deepak S 👋", "Hi, I'm Deepak S 👋", "Hey, I'm Deepak S 👋"];
	let currentWordIndex = $state(0);
	let displayText = $state('');
	let isDeleting = $state(false);
	let charIndex = $state(0);

	$effect(() => {
		const currentWord = words[currentWordIndex];
		let timeout;

		if (!isDeleting && charIndex < currentWord.length) {
			timeout = setTimeout(() => {
				displayText = displayText + currentWord.charAt(charIndex);
				charIndex++;
			}, 100);
		} else if (isDeleting && charIndex > 0) {
			timeout = setTimeout(() => {
				displayText = displayText.slice(0, -1);
				charIndex--;
			}, 50);
		} else if (!isDeleting && charIndex === currentWord.length) {
			timeout = setTimeout(() => {
				isDeleting = true;
			}, 1000);
		} else if (isDeleting && charIndex === 0) {
			isDeleting = false;
			currentWordIndex = (currentWordIndex + 1) % words.length;
		}

		return () => clearTimeout(timeout);
	});
</script>

<div
	id="hero"
	class="min-h-screen w-full flex items-center justify-center px-6 py-20 md:py-0 overflow-hidden"
>
	<div
		class="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 pt-16 md:pt-10"
	>
		<!-- Profile Image Container with Floating Layer Badges -->
		<div class="shrink-0 relative group">
			<!-- Subtle Ambient Glow -->
			<div
				class="absolute -inset-2 rounded-4xl bg-gradient-to-r from-[#44A4D8]/30 via-[#F68E0B]/20 to-[#F7BBAB]/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"
			></div>

			<div
				class="relative w-56 h-70 sm:w-68 sm:h-82 md:w-76 md:h-92 rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white"
			>
				<img
					src="/images/profile.jpeg"
					alt="Deepak S"
					width="304"
					height="368"
					fetchpriority="high"
					loading="eager"
					decoding="async"
					class="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-105"
				/>
			</div>

			<!-- Floating Badge: Top Left -->
			<div
				class="absolute -top-3 -left-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#44A4D8]/30 shadow-lg text-xs font-bold text-[#4C1A0F] transform -rotate-3 hover:rotate-0 transition-transform"
			>
				<span>⚡</span>
				<span>Go & Systems</span>
			</div>

			<!-- Floating Badge: Bottom Right -->
			<div
				class="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#F68E0B]/30 shadow-lg text-xs font-bold text-[#4C1A0F] transform rotate-3 hover:rotate-0 transition-transform"
			>
				<span>🐳</span>
				<span>Docker & MinIO</span>
			</div>
		</div>

		<!-- Introduction Details -->
		<div class="w-full md:w-[55%] text-center md:text-left text-[#4C1A0F] space-y-4">


			<!-- Typing Title -->
			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
				{displayText}<span class="animate-pulse text-[#F68E0B]">|</span>
			</h1>

			<!-- Subtitle -->
			<p class="text-base sm:text-lg lg:text-xl text-[#4A8EAC] font-semibold">
				Software Engineer | Web Development & DevOps | Systems Enthusiast
			</p>

			<!-- Brief Bio Line -->
			<p class="text-sm md:text-base text-[#4C1A0F]/75 leading-relaxed max-w-lg">
				Building practical solutions, exploring low-level internals, and self-hosting lightweight systems with Go, Python, and Docker.
			</p>

			<!-- Social Icons inside Elevated Glass Circles -->
			<div class="flex gap-3.5 items-center justify-center md:justify-start pt-1">
				<a
					href="https://www.linkedin.com/in/deepak-s-dr"
					target="_blank"
					rel="noopener noreferrer"
					title="LinkedIn Profile"
					aria-label="LinkedIn"
					class="w-10 h-10 rounded-xl bg-white/90 border border-[#44A4D8]/25 shadow-xs flex items-center justify-center text-[#44A4D8] hover:bg-[#44A4D8] hover:text-white hover:scale-110 hover:shadow-md transition-all duration-200"
				>
					<LinkedinIcon size={20} />
				</a>
				<a
					href="https://github.com/deep10dr/"
					target="_blank"
					rel="noopener noreferrer"
					title="GitHub Profile"
					aria-label="GitHub"
					class="w-10 h-10 rounded-xl bg-white/90 border border-[#44A4D8]/25 shadow-xs flex items-center justify-center text-[#44A4D8] hover:bg-[#44A4D8] hover:text-white hover:scale-110 hover:shadow-md transition-all duration-200"
				>
					<GithubIcon size={20} />
				</a>
				<a
					href="https://leetcode.com/u/deepdr10/"
					target="_blank"
					rel="noopener noreferrer"
					title="LeetCode Profile"
					aria-label="LeetCode"
					class="w-10 h-10 rounded-xl bg-white/90 border border-[#F68E0B]/25 shadow-xs flex items-center justify-center text-[#F68E0B] hover:bg-[#F68E0B] hover:text-white hover:scale-110 hover:shadow-md transition-all duration-200"
				>
					<LeetcodeIcon size={20} />
				</a>
				<a
					href="https://www.instagram.com/deep_dr_46/"
					target="_blank"
					rel="noopener noreferrer"
					title="Instagram Profile"
					aria-label="Instagram"
					class="w-10 h-10 rounded-xl bg-white/90 border border-[#44A4D8]/25 shadow-xs flex items-center justify-center text-[#44A4D8] hover:bg-[#44A4D8] hover:text-white hover:scale-110 hover:shadow-md transition-all duration-200"
				>
					<InstagramIcon size={20} />
				</a>
			</div>

			<!-- Dual Action Buttons -->
			<div class="flex flex-wrap gap-3.5 items-center justify-center md:justify-start pt-2">
				<button
					onclick={() =>
						document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
					class="inline-flex items-center gap-2 bg-[#F68E0B] hover:bg-[#EE7B48] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-bold text-sm cursor-pointer border-none"
				>
					<span>View My Work</span>
					<ArrowRight size={16} />
				</button>

				<button
					onclick={() =>
						document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
					class="inline-flex items-center gap-2 bg-white/90 hover:bg-[#44A4D8] hover:text-white text-[#4C1A0F] border border-[#44A4D8]/30 px-6 py-3 rounded-full shadow-xs hover:shadow-md hover:scale-105 transition-all duration-200 font-bold text-sm cursor-pointer"
				>
					<Mail size={16} />
					<span>Get In Touch</span>
				</button>
			</div>
		</div>
	</div>
</div>
