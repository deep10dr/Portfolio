<script>
	import { Download, Terminal, GraduationCap, MapPin, Cpu } from '@lucide/svelte';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';

	function handleDownload() {
		const link = document.createElement('a');
		link.href = '/resume.pdf';
		link.download = 'Deepak_Resume.pdf';
		link.click();
	}

	const coreTools = [
		{ name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
		{ name: 'Python', icon: 'https://cdn-icons-png.flaticon.com/128/1822/1822899.png' },
		{ name: 'React', icon: 'https://cdn-icons-png.flaticon.com/128/1172/1172027.png' },
		{ name: 'Next.js', icon: 'https://img.icons8.com/?size=96&id=r2OarXWQc3mA&format=png' },
		{ name: 'PostgreSQL', icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968342.png' },
		{ name: 'Docker', icon: 'https://cdn-icons-png.flaticon.com/128/919/919853.png' },
		{ name: 'MinIO', icon: 'https://min.io/resources/img/logo/MINIO_Bird.png' }
	];
</script>

<div
	id="about"
	class="min-h-screen text-[#4C1A0F] flex flex-col items-center justify-center px-6 py-20"
>
	<div class="max-w-4xl w-full space-y-6">
		<!-- Section Heading -->
		<div class="text-center md:text-left">
			<h2
				class="text-3xl md:text-4xl font-bold text-[#44A4D8] border-b-4 border-[#F68E0B] inline-block pb-1.5"
			>
				About Me
			</h2>
		</div>

		<!-- Card Container -->
		<div
			class="bg-[#FCF1D4]/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl border-2 border-[#44A4D8]/20 space-y-5"
		>
			<!-- Greeting -->
			<div class="flex items-center gap-2.5">
				<div class="p-1.5 rounded-lg bg-[#F68E0B]/20 text-[#F68E0B]">
					<Terminal size={22} />
				</div>
				<h3 class="text-xl md:text-2xl font-bold text-[#4C1A0F] flex items-center gap-2">
					Hey, I’m <span class="bg-gradient-to-r from-[#F68E0B] to-[#EE7B48] bg-clip-text text-transparent">Deepak</span>
					<DuckIcon size={24} class="inline-block" />
				</h3>
			</div>

			<!-- Paragraph 1 -->
			<p class="text-base md:text-lg leading-relaxed text-[#4C1A0F]/90">
				I’m a Software Engineer who spends a questionable amount of time asking
				<span
					class="font-semibold px-2 py-0.5 rounded-md bg-gradient-to-r from-[#F68E0B]/20 to-[#F7BBAB]/40 text-[#4C1A0F] border border-[#F68E0B]/30 shadow-xs inline-block"
				>
					“What happens under the hood?”
				</span>
				and then actually trying to find out.
			</p>

			<!-- Paragraph 2 -->
			<p class="text-base md:text-lg leading-relaxed text-[#4C1A0F]/90">
				I like building things — sometimes useful, sometimes experimental, and occasionally
				something that makes me wonder why I started it in the first place.
			</p>

			<!-- Paragraph 3 with Visual Technology Chips -->
			<div class="text-base md:text-lg leading-relaxed text-[#4C1A0F]/90">
				I work mostly around
				<span class="font-semibold text-[#44A4D8] bg-[#44A4D8]/10 px-2 py-0.5 rounded-md">
					backend development, web technologies, and systems
				</span>, using tools like:
				<div class="flex flex-wrap gap-2 my-2.5">
					{#each coreTools as tool}
						<span
							class="inline-flex items-center gap-1.5 px-3 py-1 text-xs md:text-sm font-semibold rounded-lg bg-white/95 text-[#4C1A0F] border border-[#44A4D8]/30 shadow-xs hover:border-[#F68E0B] hover:scale-105 transition-all duration-200"
						>
							<img src={tool.icon} alt={tool.name} class="w-4 h-4 object-contain" />
							{tool.name}
						</span>
					{/each}
				</div>
				These days, I’m also getting deeper into
				<span
					class="font-semibold px-2 py-0.5 rounded-md bg-gradient-to-r from-[#F7BBAB]/50 to-[#F68E0B]/20 text-[#4C1A0F] border border-[#F7BBAB] inline-block"
				>
					Rust and systems programming
				</span>, because apparently knowing how things work at the application level wasn’t enough. 😄
			</div>

			<!-- Paragraph 4 -->
			<p class="text-base md:text-lg leading-relaxed text-[#4C1A0F]/90">
				I enjoy
				<span class="font-bold underline decoration-[#F68E0B] decoration-2 underline-offset-4">
					learning by building
				</span>
				rather than just collecting certificates and watching endless tutorials. If something catches
				my curiosity, I’ll probably try to build it, break it, fix it, and learn something along the way.
			</p>

			<!-- Journey Callout Banner -->
			<div
				class="p-4 md:p-5 rounded-xl bg-gradient-to-r from-[#F68E0B]/15 via-[#F7BBAB]/25 to-[#44A4D8]/15 border-l-4 border-[#F68E0B] shadow-xs"
			>
				<p class="text-sm md:text-base font-medium text-[#4C1A0F] leading-relaxed">
					This portfolio is basically a record of that journey —
					<span class="font-bold text-[#F68E0B]">
						the things I build, the things I learn, and the things I break while learning.
					</span>
				</p>
			</div>

			<!-- Quick Highlights Strip (4-Item Grid) -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 text-xs font-semibold text-[#4C1A0F]/80">
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#44A4D8]/20 shadow-2xs">
					<GraduationCap size={16} class="text-[#44A4D8] shrink-0" />
					<span class="truncate">B.E. CSE (2022–2026)</span>
				</div>
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#44A4D8]/20 shadow-2xs">
					<Cpu size={16} class="text-[#F68E0B] shrink-0" />
					<span class="truncate">Self-Hosted Systems</span>
				</div>
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#44A4D8]/20 shadow-2xs">
					<DuckIcon size={16} class="shrink-0" />
					<span class="truncate">Rubber Duck Debugging</span>
				</div>
				<div class="flex items-center gap-2 p-2.5 rounded-xl bg-white/80 border border-[#44A4D8]/20 shadow-2xs">
					<MapPin size={16} class="text-[#4A8EAC] shrink-0" />
					<span class="truncate">Salem, Tamil Nadu</span>
				</div>
			</div>

			<!-- Resume Button -->
			<div class="pt-2 flex items-center">
				<button
					onclick={handleDownload}
					class="inline-flex items-center gap-2 bg-[#F68E0B] hover:bg-[#EE7B48] text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F68E0B]/40 text-sm md:text-base border-none"
				>
					<Download size={18} />
					<span>Download Resume (PDF)</span>
				</button>
			</div>
		</div>
	</div>
</div>
