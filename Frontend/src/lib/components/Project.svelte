<script>
	import { fade, scale } from 'svelte/transition';
	import {
		ChevronLeft,
		ChevronRight,
		ExternalLink,
		LayoutGrid,
		Eye,
		Sparkles
	} from '@lucide/svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';

	const projects = [
		{
			title: 'DeepPhotos',
			category: 'Featured & Systems',
			subtitle: 'Self-Hosted Photo & Document Management',
			image: '/projects/deepphotos.svg',
			description:
				'Lightweight, self-hosted photo & document management platform inspired by Google Photos. Features intuitive organization, customizable albums, password-protected encrypted vaults, and user access management.',
			tech: ['Svelte', 'Go', 'SQLite', 'MinIO', 'Docker', 'Tailwind'],
			github: 'https://github.com/deep10dr/DeepPhotos',
			demo: null,
			deployedOn: 'Docker / Self-Hosted',
			struggles:
				'Architecting a zero-dependency containerized multi-service stack with high-throughput asset streaming from MinIO.',
			progress: '100% Complete'
		},
		{
			title: 'Face Finder',
			category: 'Featured & Systems',
			subtitle: 'Real-Time Face Detection & Matching',
			image: '/projects/face.png',
			description:
				'Real-time facial recognition and detection application combining a React.js frontend with a high-performance FastAPI backend. Integrated DeepFace and FaceNet embeddings for high-accuracy facial verification.',
			tech: ['React.js', 'FastAPI', 'DeepFace', 'FaceNet'],
			github: 'https://github.com/deep10dr/FaceFinder',
			demo: 'https://face-finder-pi.vercel.app',
			deployedOn: 'Vercel + DigitalOcean',
			struggles:
				'Ensuring accurate real-time detection with minimal latency and handling diverse lighting conditions.',
			progress: '95% Complete'
		},
		{
			title: 'Needle & Knots',
			category: 'Featured & Systems',
			subtitle: 'Online Boutique & Tailoring Platform',
			image: '/projects/needle.png',
			description:
				'Full-stack e-commerce platform leveraging React.js, Tailwind CSS, and Supabase. Features end-to-end shopping workflow with real-time product filtering, promo codes, cart management, and Row Level Security (RLS).',
			tech: ['React.js', 'Tailwind CSS', 'Supabase', 'RLS'],
			github: 'https://github.com/deep10dr/Needle-Knots',
			demo: 'https://needle-knots.vercel.app/',
			deployedOn: 'Vercel + Supabase',
			struggles:
				'Managing custom tailored measurements, secure session storage, and fine-grained Supabase Row Level Security policies.',
			progress: '95% Complete'
		},
		{
			title: 'Medical Chatbot',
			category: 'AI & Healthcare',
			subtitle: 'Offline AI Healthcare Assistant',
			image: '/projects/doc.png',
			description:
				'Offline-capable voice assistant using Whisper, LangChain, Pinecone, and Mistral. Supports voice input, intent detection, RAG document search, and secure offline inference.',
			tech: ['React', 'Whisper', 'LangChain', 'Pinecone', 'Mistral'],
			github: 'https://github.com/deep10dr/Mini-project',
			demo: 'https://doc-assist-frontend.vercel.app/',
			deployedOn: 'Vercel',
			struggles:
				'Integrating offline voice recognition with Whisper and ensuring secure local inference without external API latency.',
			progress: '90% Complete'
		},
		{
			title: 'DreamSketch',
			category: 'AI & Healthcare',
			subtitle: 'Creative AI Image Generation Pipeline',
			image: '/projects/dream.png',
			description:
				'Generates high-fidelity artwork using Hugging Face diffusion models, featuring a responsive React frontend with dynamic model routing on the Express backend.',
			tech: ['React', 'Tailwind', 'Hugging Face', 'Express', 'Flux'],
			github: 'https://github.com/deep10dr/DreamSketch_Frontend',
			demo: 'https://dream-sketch-phi.vercel.app/',
			deployedOn: 'Vercel + Heroku',
			struggles:
				'Dynamically managing multi-model switching and streaming large binary image outputs efficiently.',
			progress: '85% Complete'
		},
		{
			title: 'Tragoudi',
			category: 'Web Apps',
			subtitle: 'Ad-Free Web Audio Player',
			image: '/projects/tra.png',
			description:
				'Sleek, ad-free web-based music streaming player built with React, Tailwind CSS, and Supabase. Offers customizable user playlists without streaming interruptions.',
			tech: ['React', 'Tailwind CSS', 'Supabase'],
			github: 'https://github.com/deep10dr/Tragoudi',
			demo: 'https://tragoudi.vercel.app/',
			deployedOn: 'Vercel',
			struggles:
				'Real-time synchronization of active audio queues with Supabase and managing smooth audio playback controls.',
			progress: '90% Complete'
		},
		{
			title: 'FoodNest',
			category: 'Web Apps',
			subtitle: 'Modern Food Ordering Platform',
			image: '/projects/foodnest.png',
			description:
				'Full-stack food ordering platform designed for speed and convenience with interactive category browsing, real-time cart manipulation, and order tracking.',
			tech: ['React', 'Tailwind CSS', 'Supabase'],
			github: 'https://github.com/deep10dr/FoodNest',
			demo: 'https://food-nest-two.vercel.app/',
			deployedOn: 'Vercel',
			struggles:
				'Designing an intuitive multi-step checkout workflow with instant client-side cart updates.',
			progress: '80% Complete'
		},
		{
			title: 'Palangal Nutrition Search',
			category: 'Web Apps',
			subtitle: 'Fruit Nutrition & Health Facts',
			image: '/projects/pala.png',
			description:
				'Nutrition search application utilizing RapidAPI to deliver detailed vitamin, calorie, and macro facts for fruits with instant search filtering.',
			tech: ['React', 'Bootstrap', 'Axios'],
			github: 'https://github.com/deep10dr/palankal',
			demo: 'https://palankal.netlify.app/',
			deployedOn: 'Netlify',
			struggles: 'Managing API rate-limiting headers and parsing dynamic search results gracefully.',
			progress: '100% Complete'
		},
		{
			title: 'Calculator',
			category: 'Web Apps',
			subtitle: 'Clean Arithmetic Calculator Engine',
			image: '/projects/cal.png',
			description:
				'Responsive arithmetic calculator built from scratch using HTML, CSS, and modern JavaScript, supporting standard operations with keyboard inputs.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			github: 'https://github.com/deep10dr/calculator',
			demo: 'https://deep10dr.github.io/calculator/',
			deployedOn: 'GitHub Pages',
			struggles:
				'Handling operator precedence, edge case chaining, and robust DOM keyboard event listeners.',
			progress: '100% Complete'
		}
	];

	// View mode: 'grid' (modern responsive cards) or 'spotlight' (detailed carousel)
	let projectViewMode = $state('grid');

	// Category filter for grid mode
	const projectCategories = ['All', 'Featured & Systems', 'AI & Healthcare', 'Web Apps'];
	let selectedProjectCategory = $state('All');

	let filteredProjects = $derived(
		selectedProjectCategory === 'All'
			? projects
			: projects.filter((p) => p.category === selectedProjectCategory)
	);

	// Spotlight slide index
	let currentSpotlight = $state(0);
	let activeSpotlightProject = $derived(projects[currentSpotlight]);

	function prevSpotlight() {
		currentSpotlight =
			currentSpotlight === 0 ? projects.length - 1 : currentSpotlight - 1;
	}

	function nextSpotlight() {
		currentSpotlight =
			currentSpotlight === projects.length - 1 ? 0 : currentSpotlight + 1;
	}
</script>

<div
	id="projects"
	class="min-h-screen py-24 px-4 sm:px-6 lg:px-10 text-[#4C1A0F] flex flex-col items-center justify-center"
>
	<div class="max-w-6xl w-full space-y-8">
		<!-- Section Header with Right Edge Floating View Switcher -->
		<div class="relative w-full text-center">
			<h2
				class="text-4xl md:text-5xl font-bold text-[#44A4D8] border-b-4 border-[#F68E0B] inline-block pb-2"
			>
				Projects
			</h2>

			<!-- Floating View Switcher on Right Edge -->
			<div
				class="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0 flex justify-center"
			>
				<div
					class="inline-flex p-1 rounded-2xl bg-white/95 border-2 border-[#44A4D8]/25 shadow-md gap-1"
				>
					<button
						onclick={() => (projectViewMode = 'grid')}
						title="Grid View"
						aria-label="Grid View"
						class="p-2 rounded-xl transition-all duration-200 cursor-pointer {projectViewMode ===
						'grid'
							? 'bg-[#F68E0B] text-white shadow-sm'
							: 'text-[#4C1A0F] hover:text-[#44A4D8] bg-transparent'}"
					>
						<LayoutGrid size={18} />
					</button>
					<button
						onclick={() => (projectViewMode = 'spotlight')}
						title="Spotlight Deep-Dive"
						aria-label="Spotlight Deep-Dive"
						class="p-2 rounded-xl transition-all duration-200 cursor-pointer {projectViewMode ===
						'spotlight'
							? 'bg-[#F68E0B] text-white shadow-sm'
							: 'text-[#4C1A0F] hover:text-[#44A4D8] bg-transparent'}"
					>
						<Eye size={18} />
					</button>
				</div>
			</div>
		</div>

		<!-- Clean Centered Category Filters (In Grid Mode) -->
		{#if projectViewMode === 'grid'}
			<div class="flex items-center justify-center">
				<div
					class="flex flex-wrap items-center justify-center gap-1.5 bg-[#FCF1D4]/85 backdrop-blur-md p-2.5 rounded-2xl border-2 border-[#44A4D8]/20 shadow-sm"
				>
					{#each projectCategories as cat}
						<button
							onclick={() => (selectedProjectCategory = cat)}
							class="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer {selectedProjectCategory ===
							cat
								? 'bg-[#F68E0B] text-white shadow-sm'
								: 'bg-white/80 text-[#4C1A0F] hover:bg-[#44A4D8]/15 hover:text-[#44A4D8]'}"
						>
							{cat}
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- VIEW 1: MODERN PROJECT CARDS GRID (Default) -->
		{#if projectViewMode === 'grid'}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				in:fade={{ duration: 250 }}
			>
				{#each filteredProjects as p (p.title)}
					<div
						class="bg-white/95 rounded-3xl border-2 border-[#44A4D8]/20 shadow-sm hover:border-[#F68E0B] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
						in:scale={{ duration: 250, start: 0.96 }}
					>
						<div>
							<!-- Project Preview Image Container (Clean Aspect Ratio & Framing) -->
							<div
								class="aspect-[16/10] w-full bg-[#FCF1D4]/40 border-b border-[#44A4D8]/15 p-3 flex items-center justify-center overflow-hidden relative"
							>
								<img
									src={p.image}
									alt={p.title}
									class="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
									decoding="async"
								/>
								<!-- Deployment Badge -->
								<span
									class="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#4C1A0F] border border-[#44A4D8]/30 shadow-xs backdrop-blur-xs"
								>
									{p.deployedOn}
								</span>
							</div>

							<!-- Card Info -->
							<div class="p-5 space-y-3">
								<div>
									<h3
										class="font-bold text-xl text-[#4C1A0F] group-hover:text-[#44A4D8] transition-colors leading-tight"
									>
										{p.title}
									</h3>
									<p class="text-xs text-[#4A8EAC] font-semibold mt-0.5">
										{p.subtitle}
									</p>
								</div>

								<p class="text-xs md:text-sm text-[#4C1A0F]/80 leading-relaxed line-clamp-3">
									{p.description}
								</p>

								<!-- Tech Pills -->
								<div class="flex flex-wrap gap-1.5 pt-1">
									{#each p.tech as t}
										<span
											class="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F7BBAB]/45 text-[#4C1A0F] border border-[#F7BBAB]/80"
										>
											{t}
										</span>
									{/each}
								</div>
							</div>
						</div>

						<!-- Action Links Footer -->
						<div
							class="p-5 pt-0 border-t border-[#4C1A0F]/10 mt-3 flex items-center justify-between gap-3 pt-4"
						>
							<a
								href={p.github}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white border border-[#44A4D8]/30 text-[#4C1A0F] hover:bg-[#44A4D8] hover:text-white transition-colors shadow-2xs"
							>
								<GithubIcon size={15} />
								<span>GitHub</span>
							</a>
							{#if p.demo}
								<a
									href={p.demo}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-[#F68E0B] text-white hover:bg-[#EE7B48] transition-colors shadow-xs"
								>
									<ExternalLink size={15} />
									<span>Live Demo</span>
								</a>
							{:else}
								<span
									class="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-xl bg-[#FCF1D4]/80 text-[#4C1A0F]/50 border border-[#4C1A0F]/15 cursor-not-allowed select-none"
									title="Live demo unavailable (Self-hosted or local platform)"
								>
									<span>Demo Unavailable</span>
								</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>

		<!-- VIEW 2: SPOTLIGHT DEEP-DIVE CAROUSEL -->
		{:else}
			<div class="relative w-full" in:fade={{ duration: 250 }}>
				{#key currentSpotlight}
					<div
						class="bg-[#FCF1D4]/85 backdrop-blur-md rounded-3xl border-2 border-[#44A4D8]/25 shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 lg:gap-10 items-center overflow-hidden"
						in:scale={{ duration: 300, start: 0.98 }}
					>
						<!-- Left: Project Narrative & Details -->
						<div class="w-full md:w-1/2 space-y-4">
							<div class="flex items-center justify-between">
								<span
									class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F68E0B]/20 text-[#F68E0B] border border-[#F68E0B]/40"
								>
									Project {currentSpotlight + 1} of {projects.length}
								</span>
								<span class="text-xs font-bold text-[#4A8EAC]">{activeSpotlightProject.deployedOn}</span>
							</div>

							<div>
								<h3 class="text-2xl md:text-3xl font-extrabold text-[#44A4D8]">
									{activeSpotlightProject.title}
								</h3>
								<p class="text-sm text-[#4A8EAC] font-semibold mt-1">
									{activeSpotlightProject.subtitle}
								</p>
							</div>

							<p class="text-sm md:text-base text-[#4C1A0F]/85 leading-relaxed">
								{activeSpotlightProject.description}
							</p>

							<!-- Technologies -->
							<div>
								<p class="text-xs font-bold uppercase tracking-wider text-[#4C1A0F] mb-1.5">
									Tech Stack
								</p>
								<div class="flex flex-wrap gap-1.5">
									{#each activeSpotlightProject.tech as t}
										<span
											class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F7BBAB]/50 text-[#4C1A0F] border border-[#F7BBAB]"
										>
											{t}
										</span>
									{/each}
								</div>
							</div>

							<!-- Struggles & Engineering Highlights -->
							<div class="bg-white/80 p-3.5 rounded-xl border border-[#44A4D8]/20 space-y-1">
								<p class="text-xs font-bold uppercase tracking-wider text-[#4C1A0F]">
									Engineering Challenges & Insights
								</p>
								<p class="text-xs text-[#4C1A0F]/80 leading-relaxed">
									{activeSpotlightProject.struggles}
								</p>
							</div>

							<!-- Action Buttons -->
							<div class="flex items-center gap-4 pt-2">
								<a
									href={activeSpotlightProject.github}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#44A4D8] text-[#4C1A0F] hover:text-white rounded-xl text-sm font-semibold transition border border-[#44A4D8]/30 shadow-xs"
								>
									<GithubIcon size={16} />
									<span>Source Code</span>
								</a>
								{#if activeSpotlightProject.demo}
									<a
										href={activeSpotlightProject.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F68E0B] hover:bg-[#EE7B48] text-white rounded-xl text-sm font-semibold transition shadow-md"
									>
										<ExternalLink size={16} />
										<span>Launch App</span>
									</a>
								{:else}
									<span
										class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FCF1D4]/80 text-[#4C1A0F]/50 rounded-xl text-sm font-medium border border-[#4C1A0F]/15 cursor-not-allowed select-none"
										title="Live demo unavailable (Self-hosted or local platform)"
									>
										<span>Demo Unavailable</span>
									</span>
								{/if}
							</div>
						</div>

						<!-- Right: Large Framed Preview -->
						<div class="w-full md:w-1/2 flex items-center justify-center">
							<div
								class="aspect-[16/10] w-full bg-white/70 rounded-2xl p-3 border border-[#44A4D8]/25 shadow-md flex items-center justify-center overflow-hidden"
							>
								<img
									src={activeSpotlightProject.image}
									alt={activeSpotlightProject.title}
									class="w-full h-full object-contain rounded-xl"
									loading="lazy"
									decoding="async"
								/>
							</div>
						</div>
					</div>
				{/key}

				<!-- Spotlight Navigation Controls -->
				<div class="flex items-center justify-center gap-4 mt-6">
					<button
						onclick={prevSpotlight}
						aria-label="Previous project"
						class="p-3 rounded-full bg-[#44A4D8] hover:bg-[#4A8EAC] text-white shadow-md transition-transform hover:scale-110 cursor-pointer"
					>
						<ChevronLeft size={22} />
					</button>

					<!-- Pill Indicators for Quick Project Jump -->
					<div class="flex items-center gap-1.5">
						{#each projects as _, idx}
							<button
								onclick={() => (currentSpotlight = idx)}
								aria-label="Jump to project {idx + 1}"
								class="h-2.5 rounded-full transition-all duration-300 cursor-pointer {currentSpotlight ===
								idx
									? 'w-7 bg-[#F68E0B]'
									: 'w-2.5 bg-[#44A4D8]/40 hover:bg-[#44A4D8]'}"
							></button>
						{/each}
					</div>

					<button
						onclick={nextSpotlight}
						aria-label="Next project"
						class="p-3 rounded-full bg-[#44A4D8] hover:bg-[#4A8EAC] text-white shadow-md transition-transform hover:scale-110 cursor-pointer"
					>
						<ChevronRight size={22} />
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
