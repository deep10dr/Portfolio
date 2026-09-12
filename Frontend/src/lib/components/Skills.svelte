<script>
	import { fade, scale } from 'svelte/transition';
	import {
		Boxes,
		LayoutGrid,
		Cpu,
		Globe,
		Server,
		Database,
		Container,
		Layers
	} from '@lucide/svelte';

	// View mode state: 'bento' (Bento Architecture) or 'grid' (Quick Grid)
	let viewMode = $state('bento');

	// Bento architecture domains structured strictly by resume categories
	const bentoDomains = [
		{
			id: 'languages',
			category: 'Languages',
			title: 'Programming Languages',
			subtitle: 'Systems programming, concurrency & scripting',
			icon: Cpu,
			badge: 'Foundation',
			items: [
				{
					name: 'Go',
					role: 'Systems & Backend',
					icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
					highlight: true
				},
				{
					name: 'Rust',
					role: 'Memory Safety / Systems',
					icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968358.png',
					highlight: true
				},
				{
					name: 'Python',
					role: 'AI / Automation',
					icon: 'https://cdn-icons-png.flaticon.com/128/1822/1822899.png'
				},
				{
					name: 'Java',
					role: 'OOP & DSA',
					icon: 'https://cdn-icons-png.flaticon.com/128/226/226777.png'
				},
				{
					name: 'C',
					role: 'Pointers & Memory',
					icon: 'https://img.icons8.com/?size=96&id=40670&format=png'
				}
			]
		},
		{
			id: 'frontend',
			category: 'Frontend',
			title: 'Frontend & Web',
			subtitle: 'Component-driven UIs, SSR & responsive styling',
			icon: Globe,
			badge: 'Interface Layer',
			items: [
				{
					name: 'React.js',
					role: 'UI Library',
					icon: 'https://cdn-icons-png.flaticon.com/128/1172/1172027.png'
				},
				{
					name: 'Next.js',
					role: 'SSR & SSG',
					icon: 'https://img.icons8.com/?size=96&id=r2OarXWQc3mA&format=png'
				},
				{
					name: 'SvelteKit',
					role: 'Compiler Framework',
					icon: 'https://img.icons8.com/?size=96&id=dJjTWMogzFzg&format=png'
				},
				{
					name: 'Tailwind CSS',
					role: 'Utility Styling',
					icon: '/icons/tailwind-css.png'
				}
			]
		},
		{
			id: 'backend',
			category: 'Backend',
			title: 'Backend & APIs',
			subtitle: 'REST APIs, middleware & service pipelines',
			icon: Server,
			badge: 'Service Layer',
			items: [
				{
					name: 'Go',
					role: 'Concurrent Microservices',
					icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
					highlight: true
				},
				{
					name: 'FastAPI',
					role: 'Async Python APIs',
					icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'
				},
				{
					name: 'Node.js',
					role: 'Event-Driven Runtime',
					icon: '/icons/node.png'
				},
				{
					name: 'Express.js',
					role: 'REST Routing',
					icon: '/icons/ex.png'
				}
			]
		},
		{
			id: 'database',
			category: 'Database & Storage',
			title: 'Database & Storage',
			subtitle: 'Relational, S3 object, document & vector data',
			icon: Database,
			badge: 'Persistence Layer',
			items: [
				{
					name: 'PostgreSQL',
					role: 'ACID Relational',
					icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968342.png',
					highlight: true
				},
				{
					name: 'MinIO',
					role: 'S3 Object Storage',
					icon: 'https://min.io/resources/img/logo/MINIO_Bird.png',
					highlight: true
				},
				{
					name: 'SQLite',
					role: 'Embedded SQL',
					icon: 'https://img.icons8.com/?size=96&id=V5cGWgDYhP4b&format=png'
				},
				{
					name: 'Supabase',
					role: 'Postgres & RLS Auth',
					icon: '/icons/supabase.png'
				},
				{
					name: 'MongoDB',
					role: 'Document Store',
					icon: '/icons/mongoDb.png'
				},
				{
					name: 'Pinecone',
					role: 'Vector Search',
					icon: '/icons/Pinecone.png'
				}
			]
		},
		{
			id: 'devops',
			category: 'DevOps & Tools',
			title: 'DevOps & Platform',
			subtitle: 'Containerization, version control & environments',
			icon: Container,
			badge: 'Platform Layer',
			items: [
				{
					name: 'Docker',
					role: 'Multi-Container Stack',
					icon: 'https://cdn-icons-png.flaticon.com/128/919/919853.png',
					highlight: true
				},
				{
					name: 'Git',
					role: 'Distributed VCS',
					icon: 'https://cdn-icons-png.flaticon.com/128/5968/5968853.png'
				},
				{
					name: 'GitHub',
					role: 'Actions & Collab',
					icon: 'https://cdn-icons-png.flaticon.com/128/4926/4926624.png'
				},
				{
					name: 'VS Code',
					role: 'Primary IDE',
					icon: '/icons/vs.png'
				},
				{
					name: 'Jupyter',
					role: 'Prototyping & EDA',
					icon: '/icons/jupyter.png'
				}
			]
		},
		{
			id: 'aiml',
			category: 'AI & ML',
			title: 'AI & Machine Learning',
			subtitle: 'RAG pipelines, audio models & facial matching',
			icon: Layers,
			badge: 'Inference Layer',
			items: [
				{
					name: 'LangChain',
					role: 'RAG Orchestration',
					icon: '/icons/Langchain.png'
				},
				{
					name: 'Mistral LLM',
					role: 'Local/API Inference',
					icon: 'https://cdn-icons-png.flaticon.com/128/8637/8637106.png'
				},
				{
					name: 'Whisper',
					role: 'Speech Recognition',
					icon: 'https://cdn-icons-png.flaticon.com/128/9485/9485901.png'
				},
				{
					name: 'Hugging Face',
					role: 'Embeddings & Models',
					icon: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg'
				},
				{
					name: 'DeepFace',
					role: 'Facial Verification',
					icon: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'
				},
				{
					name: 'FFmpeg',
					role: 'Media Preprocessing',
					icon: 'https://img.icons8.com/?size=96&id=Z4q7aB06g1tT&format=png'
				}
			]
		}
	];

	// Flat skills list for the Quick Grid view (with explicit category matching)
	const flatSkills = bentoDomains.flatMap((domain) =>
		domain.items.map((item) => ({
			name: item.name,
			category: domain.category,
			role: item.role,
			icon: item.icon,
			highlight: item.highlight
		}))
	);

	const gridCategories = [
		'All',
		'Languages',
		'Frontend',
		'Backend',
		'Database & Storage',
		'DevOps & Tools',
		'AI & ML'
	];

	let selectedGridCategory = $state('All');

	let filteredGridSkills = $derived(
		selectedGridCategory === 'All'
			? flatSkills
			: flatSkills.filter((skill) => skill.category === selectedGridCategory)
	);
</script>

<div
	id="skills"
	class="min-h-screen py-20 px-4 sm:px-6 lg:px-10 flex flex-col items-center justify-center text-[#4C1A0F]"
>
	<div class="max-w-6xl w-full space-y-7">
		<!-- Section Header with Right Edge Floating View Switcher -->
		<div class="relative w-full text-center">
			<h2
				class="text-4xl md:text-5xl font-bold text-[#44A4D8] border-b-4 border-[#F68E0B] inline-block pb-2"
			>
				Technologies
			</h2>

			<!-- Floating View Switcher on Right Edge -->
			<div
				class="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 mt-4 md:mt-0 flex justify-center"
			>
				<div
					class="inline-flex p-1 rounded-2xl bg-white/95 border-2 border-[#44A4D8]/25 shadow-md gap-1"
				>
					<button
						onclick={() => (viewMode = 'bento')}
						title="Bento Architecture View"
						aria-label="Bento Architecture View"
						class="p-2 rounded-xl transition-all duration-200 cursor-pointer {viewMode ===
						'bento'
							? 'bg-[#F68E0B] text-white shadow-sm'
							: 'text-[#4C1A0F] hover:text-[#44A4D8] bg-transparent'}"
					>
						<Boxes size={18} />
					</button>
					<button
						onclick={() => (viewMode = 'grid')}
						title="Quick Grid View"
						aria-label="Quick Grid View"
						class="p-2 rounded-xl transition-all duration-200 cursor-pointer {viewMode ===
						'grid'
							? 'bg-[#F68E0B] text-white shadow-sm'
							: 'text-[#4C1A0F] hover:text-[#44A4D8] bg-transparent'}"
					>
						<LayoutGrid size={18} />
					</button>
				</div>
			</div>
		</div>

		<!-- MODE 1: BENTO ARCHITECTURE VIEW -->
		{#if viewMode === 'bento'}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
				in:fade={{ duration: 250 }}
			>
				{#each bentoDomains as domain}
					{@const IconComponent = domain.icon}
					<div
						class="bg-[#FCF1D4]/80 backdrop-blur-md rounded-3xl p-5 border-2 border-[#44A4D8]/20 shadow-sm hover:border-[#F68E0B] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
					>
						<div>
							<!-- Bento Box Header -->
							<div class="flex items-center justify-between gap-3 mb-2">
								<div class="flex items-center gap-2.5">
									<div
										class="w-10 h-10 rounded-xl bg-white text-[#44A4D8] border border-[#44A4D8]/20 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#F68E0B] group-hover:text-white transition-colors"
									>
										<IconComponent size={20} />
									</div>
									<div>
										<h3 class="font-bold text-base text-[#4C1A0F] leading-tight">
											{domain.title}
										</h3>
										<p class="text-[11px] text-[#4A8EAC] font-medium mt-0.5">
											{domain.subtitle}
										</p>
									</div>
								</div>
								<span
									class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F7BBAB]/50 text-[#4C1A0F] border border-[#F7BBAB] shrink-0"
								>
									{domain.badge}
								</span>
							</div>

							<!-- Technology Badges Inside Bento Box -->
							<div class="grid grid-cols-2 gap-2 mt-4">
								{#each domain.items as item}
									<div
										class="flex items-center gap-2.5 p-2 rounded-xl bg-white/95 border {item.highlight
											? 'border-[#F68E0B]/50 ring-1 ring-[#F68E0B]/30'
											: 'border-[#44A4D8]/15'} shadow-2xs hover:border-[#F68E0B] hover:scale-102 transition-all cursor-default"
									>
										<div
											class="w-8 h-8 rounded-lg bg-[#FCF1D4]/60 border border-[#44A4D8]/15 flex items-center justify-center p-1.5 shrink-0"
										>
											<img
												src={item.icon}
												alt={item.name}
												class="w-full h-full object-contain"
												loading="lazy"
												decoding="async"
											/>
										</div>
										<div class="min-w-0 flex-1">
											<h4 class="font-bold text-xs text-[#4C1A0F] truncate">{item.name}</h4>
											<p class="text-[10px] text-[#4A8EAC] font-medium truncate">{item.role}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>

		<!-- MODE 2: QUICK GRID VIEW (Clean Categories, No Search Bar) -->
		{:else}
			<div class="space-y-5" in:fade={{ duration: 250 }}>
				<!-- Clean Centered Category Pills -->
				<div class="flex items-center justify-center">
					<div
						class="flex flex-wrap items-center justify-center gap-1.5 bg-[#FCF1D4]/85 backdrop-blur-md p-2.5 rounded-2xl border-2 border-[#44A4D8]/20 shadow-sm"
					>
						{#each gridCategories as cat}
							<button
								onclick={() => (selectedGridCategory = cat)}
								class="px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer {selectedGridCategory ===
								cat
									? 'bg-[#F68E0B] text-white shadow-sm'
									: 'bg-white/80 text-[#4C1A0F] hover:bg-[#44A4D8]/15 hover:text-[#44A4D8]'}"
							>
								{cat}
							</button>
						{/each}
					</div>
				</div>

				<!-- Quick Grid Cards -->
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
					{#each filteredGridSkills as skill (skill.name + skill.role)}
						<div
							class="flex items-center gap-3 bg-white/95 rounded-2xl p-3.5 border-2 {skill.highlight
								? 'border-[#F68E0B]/40'
								: 'border-[#44A4D8]/15'} shadow-xs hover:border-[#F68E0B] hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-default"
							in:scale={{ duration: 200, start: 0.95 }}
						>
							<div
								class="w-11 h-11 rounded-xl bg-[#FCF1D4]/60 border border-[#44A4D8]/20 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform"
							>
								<img
									src={skill.icon}
									alt={skill.name}
									class="w-full h-full object-contain"
									loading="lazy"
									decoding="async"
								/>
							</div>

							<div class="min-w-0 flex-1">
								<h3
									class="font-bold text-sm md:text-base text-[#4C1A0F] truncate group-hover:text-[#44A4D8] transition-colors"
								>
									{skill.name}
								</h3>
								<p class="text-[11px] md:text-xs text-[#4A8EAC] font-semibold truncate mt-0.5">
									{skill.category}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
