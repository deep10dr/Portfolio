<script>
	import { fly, fade, scale } from 'svelte/transition';
	import {
		X,
		Minus,
		ChevronRight,
		ChevronLeft,
		Volume2,
		VolumeX,
		Sparkles,
		Lightbulb,
		Coffee,
		Bug,
		AlertTriangle,
		Bomb,
		Flame,
		RotateCcw,
		FileText,
		Code2,
		Briefcase,
		Send,
		Copy,
		ArrowRight
	} from '@lucide/svelte';
	import { success } from '$lib/toast.svelte.js';
	import DuckIcon from '$lib/icons/DuckIcon.svelte';

	let soundEnabled = $state(true);
	let isExploding = $state(false);
	let explosionCountdown = $state(5);
	let countdownInterval = null;

	// Funny developer easter egg states
	let bugsEaten = $state(0);
	let lastBugReaction = $state(null);
	let bugTimer = null;

	let isCaffeinated = $state(false);
	let caffeineTimer = null;

	let currentWisdom = $state(null);
	let clickCount = $state(0);
	let isDizzy = $state(false);
	let dizzyTimer = null;
	let lastClickTime = 0;

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

	// Web Audio synthetic cartoon explosion sound effect
	function playExplosion() {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!AudioContextClass) return;
			const ctx = new AudioContextClass();
			const now = ctx.currentTime;

			// Sub-bass boom
			const osc1 = ctx.createOscillator();
			const gain1 = ctx.createGain();
			osc1.type = 'triangle';
			osc1.frequency.setValueAtTime(140, now);
			osc1.frequency.exponentialRampToValueAtTime(25, now + 0.9);
			gain1.gain.setValueAtTime(0.35, now);
			gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
			osc1.connect(gain1);
			gain1.connect(ctx.destination);
			osc1.start(now);
			osc1.stop(now + 0.9);

			// Noise blast burst
			const bufferSize = ctx.sampleRate * 0.4;
			const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
			const data = buffer.getChannelData(0);
			for (let i = 0; i < bufferSize; i++) {
				data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
			}
			const noise = ctx.createBufferSource();
			noise.buffer = buffer;
			const noiseGain = ctx.createGain();
			noiseGain.gain.setValueAtTime(0.28, now);
			noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
			noise.connect(noiseGain);
			noiseGain.connect(ctx.destination);
			noise.start(now);

			// Squeaky cartoon slide whistle after blast
			setTimeout(() => {
				try {
					const osc2 = ctx.createOscillator();
					const gain2 = ctx.createGain();
					const now2 = ctx.currentTime;
					osc2.type = 'sawtooth';
					osc2.frequency.setValueAtTime(550, now2);
					osc2.frequency.exponentialRampToValueAtTime(180, now2 + 0.25);
					gain2.gain.setValueAtTime(0.12, now2);
					gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.25);
					osc2.connect(gain2);
					gain2.connect(ctx.destination);
					osc2.start(now2);
					osc2.stop(now2 + 0.25);
				} catch {}
			}, 500);
		} catch {}
	}

	// Web Audio synthetic cute bug crunch / chomp sound
	function playChomp() {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!AudioContextClass) return;
			const ctx = new AudioContextClass();
			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();

			osc.type = 'square';
			osc.frequency.setValueAtTime(260, now);
			osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

			gain.gain.setValueAtTime(0.15, now);
			gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + 0.09);
		} catch {}
	}

	// Web Audio synthetic caffeine overdrive 8-bit power-up
	function playCaffeine() {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!AudioContextClass) return;
			const ctx = new AudioContextClass();
			const freqs = [392, 523.25, 659.25, 783.99, 1046.5];
			freqs.forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				const t = ctx.currentTime + idx * 0.045;
				osc.type = 'triangle';
				osc.frequency.setValueAtTime(freq, t);
				gain.gain.setValueAtTime(0.12, t);
				gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(t);
				osc.stop(t + 0.06);
			});
		} catch {}
	}

	// Web Audio synthetic gentle wisdom chime
	function playWisdom() {
		if (!soundEnabled || typeof window === 'undefined') return;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!AudioContextClass) return;
			const ctx = new AudioContextClass();
			const freqs = [523.25, 659.25, 783.99];
			freqs.forEach((freq, idx) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				const t = ctx.currentTime + idx * 0.08;
				osc.type = 'sine';
				osc.frequency.setValueAtTime(freq, t);
				gain.gain.setValueAtTime(0.12, t);
				gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
				osc.connect(gain);
				gain.connect(ctx.destination);
				osc.start(t);
				osc.stop(t + 0.25);
			});
		} catch {}
	}

	function triggerExplosion() {
		isExploding = true;
		explosionCountdown = 5;
		playExplosion();

		clearInterval(countdownInterval);
		countdownInterval = setInterval(() => {
			if (explosionCountdown > 1) {
				explosionCountdown--;
			} else {
				restoreScreen();
			}
		}, 1000);
	}

	// Funny developer duck statuses
	const duckStatuses = [
		'Judging your code',
		'Blaming the cache',
		'Waiting for npm install',
		'StackOverflow searching...',
		'Questioning CSS choices',
		'Dockerizing everything',
		'Counting memory leaks',
		'Reading raw assembly',
		'Refactoring at 3 AM',
		'Pretending to understand regex'
	];
	let currentDuckStatus = $state(duckStatuses[0]);

	// Real-time conversational chat stream (starts empty until duck is touched)
	let chatMessages = $state([]);

	function addMessage(sender, text) {
		chatMessages = [...chatMessages, { id: Math.random().toString(), sender, text }];
		if (typeof setTimeout !== 'undefined') {
			setTimeout(() => {
				const box = document.getElementById('duck-chat-stream');
				if (box) box.scrollTop = box.scrollHeight;
			}, 60);
		}
	}

	const sectionChatNotes = {
		hero: "Quack! Welcome to Deepak's portfolio. He builds backend systems that handle heavy traffic and self-hosts everything in Docker until his RAM cries for mercy. Scroll down if you dare!",
		about: "Deepak's personal coding rule: If code compiles cleanly on the first try, inspect the assembly immediately because something is definitely cursed. Also, his sleep schedule is single-threaded with 0 retries!",
		skills: "Here is his tech stack: Go, Python, Svelte, Docker, Redis, PostgreSQL... Deepak claims he understands regex without googling, but honestly, nobody actually understands regex.",
		projects: "Behold his projects! DeepPhotos is self-hosted with Docker & MinIO because why trust third-party clouds when you can overheat your own home server? Switch to Spotlight mode for real architecture battle scars!",
		contact: "Need a backend engineer, or want to send him an unhinged bug report? Drop him a message right here—it hits his phone directly faster than an uncaught exception crashes Node.js!"
	};

	let lastAnnouncedSection = 'hero';

	function restoreScreen() {
		clearInterval(countdownInterval);
		isExploding = false;
		playQuack();
		addMessage('duck', 'Phew! Apology accepted. Production hotfix deployed. Duck rage level restored to normal.');
		success('Duck calmed down! Production restored safely.');
	}

	// Senior Rubber Duck Wisdom Quotes (No Emojis)
	const duckWisdoms = [
		'“A SQL query walks into a bar, sees two tables and asks: ‘Mind if I join you?’ Bartender says: ‘Only if you have an index, otherwise you’re blocking everyone!’”',
		'“There are only 10 types of people in the world: those who understand binary, and those who get dates on Friday night.”',
		'“Documentation is like a love letter to your future self... which explains why none of us ever write it.”',
		'“Rule #1: Never deploy on a Friday. Rule #2: If you must deploy on a Friday, make sure to blame the intern.”',
		'“There are 2 hard problems in Computer Science: cache invalidation, naming things, and off-by-one errors.”',
		'“Why spend 5 minutes reading the docs when you can spend 8 hours debugging blindly in tears?”',
		'“git push --force origin main and let tomorrow’s Deepak deal with the international incident.”',
		'“If you delete all failing unit tests, your build pipeline passes with 100% velocity! Modern problems require modern solutions.”',
		'“Senior dev tip: If you never check the production server logs, there are technically zero errors occurring in production.”',
		'“CSS is totally simple! Just add !important. If it doesn’t work, add !important !important and question your career choices.”',
		'“Deepak’s backend handled 10,000 requests per second. His personal coffee intake handled 6 cups per hour.”',
		'“A QA engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999 beers. Orders a lizard. Orders -1 beers. Orders a asdfjk! The bar catches on fire.”',
		'“It’s not a memory leak, it’s just your program remembering its childhood really fondly.”',
		'“Weeks of programming can easily save you hours of planning.”',
		'“Console.log(‘HERE’), console.log(‘HERE 2’), console.log(‘WHY GOD WHY’).”',
		'“Stack Overflow went down for 15 minutes today; global tech GDP dropped by 84%.”',
		'“My code doesn’t have bugs. It just spontaneously develops undocumented surprise features.”'
	];

	function askDuckWisdom() {
		playWisdom();
		const random = duckWisdoms[Math.floor(Math.random() * duckWisdoms.length)];
		addMessage('user', 'Got any senior dev wisdom?');
		setTimeout(() => {
			playQuack();
			addMessage('duck', random);
		}, 250);
	}

	// Feed bug reactions (No Emojis)
	const bugReactions = [
		'CRUNCH! Mmm, delicious off-by-one error! Tastes like infinite loops, cold pizza, and regret!',
		'CHOMP! Swallowed a race condition! Now I answered your message before you even thought of it!',
		'GULP! Devoured a NullPointerException! 0x000000 has never tasted so crunchy.',
		'BURP! That was an unhandled promise rejection. Very spicy. My digestive tract is rejecting the promise too.',
		'OM NOM NOM! Ate a CSS z-index: 9999999 bug! Tastes like pure front-end chaos and desperation.',
		'CHOMP! Swallowed an unclosed database connection! Deepak’s PostgreSQL connection pool just wept with gratitude.',
		'CRUNCH! Devoured an infinite recursion! Devoured an infinite recursion! ...Stack overflow averted!'
	];

	function feedDuckBug() {
		bugsEaten++;
		playChomp();
		const reaction = bugReactions[Math.floor(Math.random() * bugReactions.length)];
		addMessage('user', 'Here, eat this bug.');
		setTimeout(() => {
			playQuack();
			addMessage('duck', `${reaction} (Total bugs devoured: ${bugsEaten})`);
		}, 250);
	}

	function giveDuckEspresso() {
		playCaffeine();
		isCaffeinated = true;
		clearTimeout(caffeineTimer);
		caffeineTimer = setTimeout(() => {
			isCaffeinated = false;
		}, 9000);
		addMessage('user', 'Drink this double-shot espresso!');
		setTimeout(() => {
			addMessage(
				'duck',
				'400mg OF LIQUID SPEED DETECTED! MY HEART RATE IS 9,000 RPM! I JUST REWROTE THE ENTIRE BACKEND IN RAW ASSEMBLY CODE! SHIP IT TO PRODUCTION RIGHT NOW!'
			);
		}, 250);
		setTimeout(() => {
			if (isCaffeinated) {
				addMessage(
					'duck',
					'I CAN HEAR THE ELECTRONS HUMMING IN DEEPAK’S CPU! MORE CAFFEINE! MORE DOCKER CONTAINERS!'
				);
			}
		}, 1800);
	}

	// Sections configuration with witty context-specific actions (No Emojis)
	const tourSections = [
		{
			id: 'hero',
			title: 'Welcome',
			badge: '1 / 5',
			message:
				"Quack! I'm Deepak's Senior Rubber Duck. I've survived 4,000 merge conflicts, 3 AM compiler tantrums, and zero paid vacations. Deepak builds high-performance backend systems and self-hosts everything until his RAM begs for mercy!",
			tip: 'He actually reads documentation instead of blindly copying StackOverflow!',
			actionLabel: 'Download Resume',
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
			title: 'About Deepak',
			badge: '2 / 5',
			message:
				"Deepak's coding rule: If code compiles cleanly on the first attempt, inspect the assembly immediately because something is definitely suspicious. He loves breaking systems just to learn how to rebuild them stronger!",
			tip: 'There is no cloud, it’s just someone else’s Linux server on fire.',
			actionLabel: 'Explore Stack',
			action: () => {
				document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'skills',
			title: 'Tech Architecture',
			badge: '3 / 5',
			message:
				'Go, Python, Svelte, Docker, MinIO, PostgreSQL... and yes, Deepak knows how to exit Vim without pulling the power plug! Toggle between Bento and Grid view on the right to inspect his architecture.',
			tip: '99% of production bugs were solved by explaining them to me.',
			actionLabel: 'View Projects',
			action: () => {
				document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'projects',
			title: 'Projects & Systems',
			badge: '4 / 5',
			message:
				'Check out DeepPhotos (self-hosted with Docker & MinIO because why trust third-party cloud?), Face Finder, and more. Check Spotlight mode for the real architecture struggles and battle scars!',
			tip: 'Self-hosting may cause sudden urges to purchase multiple Raspberry Pis.',
			actionLabel: 'Contact Deepak',
			action: () => {
				document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
			}
		},
		{
			id: 'contact',
			title: 'Get In Touch',
			badge: '5 / 5',
			message:
				'Drop him a message! His custom backend delivers it straight to his phone faster than a Slack ping. Whether you have an engineering role, a technical challenge, or pizza, he’d love to connect!',
			tip: 'Copy his email with 1 click, or send him a message directly below!',
			actionLabel: 'Copy Email',
			action: () => {
				navigator.clipboard.writeText('deepakofficial81@gmail.com');
				success('Email copied: deepakofficial81@gmail.com');
			}
		}
	];

	let isBubbleOpen = $state(false); // Starts strictly asleep until touched!
	let currentSectionId = $state('hero');
	let visitedSections = $state(new Set(['hero']));

	function hideChat() {
		isBubbleOpen = false;
		chatMessages = []; // Duck conversation is completely gone and duck goes to sleep!
		playQuack();
	}

	function openChat() {
		isBubbleOpen = true;
		playQuack();
		if (chatMessages.length === 0) {
			const funnyWakeUps = [
				"Quack! You touched me, so now I'm awake! I was having a lovely dream where CSS vertically centered itself on the first try.",
				"You woke me up! My consulting fee is 2 bugs per minute. What broken code are we inspecting today?",
				"Quack! I'm awake! Let's inspect Deepak's architecture. What bugs are we laughing at?",
				"Who dared poke the debugger?! Oh, it's you! Welcome to Deepak's systems portfolio.",
				"I have awoken! Did someone push unformatted code directly to main, or did you just want my company?"
			];
			const randomWake = funnyWakeUps[Math.floor(Math.random() * funnyWakeUps.length)];
			addMessage('duck', randomWake);

			if (sectionChatNotes[currentSectionId]) {
				setTimeout(() => {
					addMessage('duck', sectionChatNotes[currentSectionId]);
				}, 450);
			}
		}
	}

	$effect(() => {
		// Duck always starts quietly asleep until touched!
		isBubbleOpen = false;

		// Scroll observer to update current section in the background without waking the duck!
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

					// Randomize funny duck status in the background
					currentDuckStatus = duckStatuses[Math.floor(Math.random() * duckStatuses.length)];

					// STRICTLY NEVER AUTO-OPEN OR WAKE UP ON SCROLL!
					// Duck only awakes once the user touches it!
				}
			}
		}, observerOptions);

		for (const sec of tourSections) {
			const el = document.getElementById(sec.id);
			if (el) observer.observe(el);
		}

		return () => {
			observer.disconnect();
			if (countdownInterval) clearInterval(countdownInterval);
			if (caffeineTimer) clearTimeout(caffeineTimer);
			if (dizzyTimer) clearTimeout(dizzyTimer);
			if (bugTimer) clearTimeout(bugTimer);
		};
	});

	function handleDuckClick() {
		const now = Date.now();
		if (now - lastClickTime < 700) {
			clickCount++;
		} else {
			clickCount = 1;
		}
		lastClickTime = now;

		playQuack();

		if (clickCount >= 4) {
			isDizzy = true;
			clearTimeout(dizzyTimer);
			dizzyTimer = setTimeout(() => {
				isDizzy = false;
				clickCount = 0;
			}, 4500);
			addMessage(
				'duck',
				"WOAH! Stop poking me so fast! I'm seeing double! Now there are TWO Deepaks on screen and neither of them wrote unit tests!"
			);
			success("Slow down! You made the rubber duck dizzy!");
			return;
		}

		// Duck toggles awake/asleep strictly upon touching it!
		if (!isBubbleOpen) {
			openChat();
		} else {
			hideChat();
		}
	}

	let currentSection = $derived(
		tourSections.find((s) => s.id === currentSectionId) || tourSections[0]
	);
</script>

<!-- RUBBER DUCK COMPANION CONTAINER (Fixed at bottom right) -->
<div class="fixed bottom-5 right-5 z-[9990] flex flex-col items-end gap-2.5 pointer-events-none">
	<!-- REAL-TIME CHAT STREAM BOX -->
	{#if isBubbleOpen}
		<div
			class="pointer-events-auto max-w-xs sm:max-w-sm w-full bg-[#FCF6DC] rounded-2xl p-3.5 border border-[#44A4D8]/35 shadow-2xl space-y-2.5 text-[#4C1A0F] relative backdrop-blur-md"
			in:fly={{ y: 20, duration: 250 }}
			out:fade={{ duration: 150 }}
		>
			<!-- Chat Header -->
			<div class="flex items-center justify-between gap-2 pb-2 border-b border-[#4C1A0F]/10">
				<div class="flex items-center gap-2">
					<div class="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#FCF1D4] border border-[#F68E0B]/30 text-[#F68E0B] shrink-0">
						<DuckIcon size={16} />
						<span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white"></span>
					</div>
					<div>
						<div class="text-xs font-bold text-[#4C1A0F] flex items-center gap-1.5">
							<span>Duck Debugger</span>
						</div>
						<div class="text-[10px] text-[#4A8EAC] font-medium flex items-center gap-1">
							<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
							<span>{isCaffeinated ? 'Hyper-Overdrive (9999 WPM)' : isDizzy ? 'Dizzy • Seeing Double' : currentDuckStatus}</span>
						</div>
					</div>
				</div>

				<div class="flex items-center gap-1">
					<!-- Sound Toggle -->
					<button
						onclick={() => (soundEnabled = !soundEnabled)}
						title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
						aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
						class="p-1 rounded-md text-[#4C1A0F]/55 hover:text-[#F68E0B] hover:bg-black/5 cursor-pointer border-none bg-transparent transition"
					>
						{#if soundEnabled}
							<Volume2 size={13} />
						{:else}
							<VolumeX size={13} />
						{/if}
					</button>

					<!-- Explicit Hide Conversation Button -->
					<button
						onclick={hideChat}
						title="Hide conversation"
						aria-label="Hide duck conversation"
						class="flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold text-[#4C1A0F]/70 hover:text-red-600 hover:bg-red-500/10 border border-[#4C1A0F]/15 hover:border-red-400/40 transition cursor-pointer"
					>
						<Minus size={12} />
						<span>Hide</span>
					</button>

					<!-- Close X Button -->
					<button
						onclick={hideChat}
						title="Dismiss chat"
						aria-label="Dismiss chat"
						class="p-1 rounded-md text-[#4C1A0F]/55 hover:text-red-600 hover:bg-black/5 cursor-pointer border-none bg-transparent transition"
					>
						<X size={14} />
					</button>
				</div>
			</div>

			<!-- Real Chat Messages Stream -->
			<div
				id="duck-chat-stream"
				class="max-h-52 overflow-y-auto space-y-2 pr-1 text-xs"
			>
				{#each chatMessages as msg (msg.id)}
					{#if msg.sender === 'duck'}
						<div class="flex items-start gap-1.5" in:fly={{ y: 8, duration: 150 }}>
							<div class="w-5 h-5 rounded-full bg-[#FCF1D4] flex items-center justify-center text-[#F68E0B] shrink-0 mt-0.5 border border-[#F68E0B]/20">
								<DuckIcon size={12} />
							</div>
							<div class="bg-white/95 text-[#4C1A0F] p-2.5 rounded-2xl rounded-tl-xs border border-[#44A4D8]/20 shadow-2xs leading-relaxed font-medium">
								{msg.text}
							</div>
						</div>
					{:else}
						<div class="flex justify-end" in:fly={{ y: 8, duration: 150 }}>
							<div class="bg-[#F68E0B] text-white p-2 rounded-2xl rounded-tr-xs shadow-2xs font-medium max-w-[85%]">
								{msg.text}
							</div>
						</div>
					{/if}
				{/each}
			</div>

			<!-- Quick Prompt Chips & Actions -->
			<div class="pt-1 space-y-1.5 border-t border-[#4C1A0F]/10">
				<!-- Context Primary Action Button -->
				{#if currentSection.actionLabel}
					<button
						onclick={currentSection.action}
						class="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-white hover:bg-[#F68E0B] text-[#4C1A0F] hover:text-white border border-[#44A4D8]/30 hover:border-transparent text-xs font-bold transition shadow-2xs cursor-pointer"
					>
						{#if currentSection.id === 'hero'}
							<FileText size={12} />
						{:else if currentSection.id === 'about'}
							<Code2 size={12} />
						{:else if currentSection.id === 'skills'}
							<Briefcase size={12} />
						{:else if currentSection.id === 'projects'}
							<Send size={12} />
						{:else if currentSection.id === 'contact'}
							<Copy size={12} />
						{/if}
						<span>{currentSection.actionLabel}</span>
						<ArrowRight size={11} />
					</button>
				{/if}

				<!-- Interactive Chat Prompt Chips (Icons, Zero Emojis) -->
				<div class="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
					<button
						onclick={askDuckWisdom}
						title="Ask duck for senior developer wisdom"
						class="py-1.5 px-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-500/25 transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
					>
						<Lightbulb size={12} />
						<span class="truncate">Advice</span>
					</button>

					<button
						onclick={feedDuckBug}
						title="Feed a bug to the debugging duck"
						class="py-1.5 px-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-500/25 transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
					>
						<Bug size={12} />
						<span class="truncate">Feed Bug</span>
					</button>

					<button
						onclick={giveDuckEspresso}
						title="Give duck espresso for hyper overdrive"
						class="py-1.5 px-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-500/30 transition cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
					>
						<Coffee size={12} />
						<span class="truncate">Espresso</span>
					</button>
				</div>

				<!-- Don't Touch That! (Duck is getting angry...) Button -->
				<div>
					<button
						onclick={triggerExplosion}
						title="Whatever you do, do NOT click this button!"
						class="w-full py-1.5 px-2.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-500/30 text-[11px] font-bold tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 group select-none shadow-2xs"
					>
						<AlertTriangle size={13} class="animate-pulse" />
						<span>Don't Touch That! (Duck is getting angry...)</span>
						<Bomb size={13} class="group-hover:rotate-12 transition-transform" />
					</button>
				</div>
			</div>

			<!-- Speech Tail pointing toward duck -->
			<div
				class="absolute -bottom-2 right-8 w-3.5 h-3.5 bg-[#FCF6DC] border-r border-b border-[#44A4D8]/35 transform rotate-45 pointer-events-none"
			></div>
		</div>
	{/if}

	<!-- INTERACTIVE RUBBER DUCK MASCOT BUTTON -->
	<div class="pointer-events-auto flex items-center gap-2">
		<!-- Mini Status Pill when duck is asleep (Touch to wake) -->
		{#if !isBubbleOpen}
			<button
				onclick={openChat}
				class="px-3.5 py-1.5 rounded-full bg-[#F68E0B] hover:bg-[#EE7B48] text-white shadow-md text-[11px] font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 transform hover:scale-105 active:scale-95 border border-white/20"
				in:fade={{ duration: 150 }}
				title="Touch to wake duck"
			>
				<DuckIcon size={14} class="shrink-0" />
				<span>Duck Asleep (Touch to wake)</span>
			</button>
		{/if}

		<!-- The Duck Avatar with Floating Animation -->
		<button
			onclick={handleDuckClick}
			title={isBubbleOpen ? 'Click to put duck to sleep / hide' : 'Touch to wake duck!'}
			aria-label="Duck Guide Mascot"
			class="duck-float relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#FCF1D4] to-white border-3 border-[#F68E0B] shadow-xl hover:scale-110 active:scale-95 p-1.5 transition-all duration-300 cursor-pointer flex items-center justify-center group {isCaffeinated ? 'caffeine-shake' : ''} {isDizzy ? 'dizzy-spin' : ''}"
		>
			<!-- Cute Custom Rubber Duck SVG with Developer Glasses, Cowlick & Bow Tie -->
			<svg
				viewBox="0 0 100 100"
				class="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:rotate-6 group-active:-rotate-6"
			>
				<!-- Cute Head Feather Tuft (Funny developer cowlick) -->
				<path
					d="M52 24 Q57 13 65 15 Q60 21 57 26"
					fill="#F59E0B"
					stroke="#D97706"
					stroke-width="1.5"
				/>
				<path
					d="M48 24 Q43 14 51 15"
					fill="none"
					stroke="#D97706"
					stroke-width="2"
					stroke-linecap="round"
				/>

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

				<!-- Tiny Red Developer Bow Tie -->
				<polygon points="26,56 34,53 34,59" fill="#EF4444" />
				<polygon points="42,56 34,53 34,59" fill="#EF4444" />
				<circle cx="34" cy="56" r="2.5" fill="#DC2626" />
			</svg>

			<!-- Dizzy or Caffeine Overdrive SVG Indicators (Zero Emojis) -->
			{#if isDizzy}
				<RotateCcw size={14} class="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-700 animate-spin" />
			{:else if isCaffeinated}
				<Flame size={14} class="absolute -top-3 -left-1 text-orange-500 animate-bounce" />
				<Coffee size={14} class="absolute -top-3 -right-1 text-amber-800 animate-pulse" />
			{:else if isBubbleOpen}
				<span
					class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#F68E0B] border-2 border-white animate-pulse"
				></span>
			{/if}
		</button>
	</div>
</div>

<svelte:window
	onkeydown={(e) => {
		if (isExploding && e.key === 'Escape') restoreScreen();
	}}
/>

<!-- FULL-SCREEN EXPLOSION EASTER EGG OVERLAY (Zero Emojis) -->
{#if isExploding}
	<div
		class="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-black/95 text-white select-none backdrop-blur-md screen-shake"
		in:scale={{ duration: 150, start: 0.9 }}
		out:fade={{ duration: 250 }}
	>
		<!-- Flashing emergency strobe / vignette -->
		<div class="absolute inset-0 pointer-events-none emergency-strobe"></div>

		<!-- Flying chaotic debris & particles (Icons & Code Snippets) -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute particle-1 text-amber-400"><DuckIcon size={46} /></div>
			<div class="absolute particle-2 text-red-500"><Bomb size={42} /></div>
			<div class="absolute particle-3 text-orange-500"><Flame size={48} /></div>
			<div class="absolute particle-4 text-amber-500"><AlertTriangle size={42} /></div>
			<div class="absolute particle-5 text-red-400"><Bomb size={36} /></div>
			<div class="absolute particle-6 text-amber-300"><DuckIcon size={38} /></div>

			<div class="absolute font-mono font-black particle-code-1">SEGFAULT at 0xDEADBEEF</div>
			<div class="absolute font-mono font-black particle-code-2">undefined is not a function</div>
			<div class="absolute font-mono font-black particle-code-3">git push --force origin main</div>
			<div class="absolute font-mono font-black particle-code-4">rm -rf / --no-preserve-root</div>
			<div class="absolute font-mono font-black particle-code-5">500 SERVER ON FIRE</div>
			<div class="absolute font-mono font-black particle-code-6">DROP DATABASE production;</div>
			<div class="absolute font-mono font-black particle-code-1">AWS BILL: $94,210.00</div>
			<div class="absolute font-mono font-black particle-code-2">git blame: IT WAS YOU!</div>
			<div class="absolute font-mono font-black particle-code-3">NaN === NaN is FALSE?!</div>
			<div class="absolute font-mono font-black particle-code-5">Error 418: I'm a teapot!</div>
		</div>

		<!-- Central Warning Dialog -->
		<div
			class="relative z-10 max-w-lg mx-4 w-full p-6 sm:p-8 rounded-3xl bg-[#1c0806]/95 border-2 border-red-500/80 shadow-[0_0_80px_rgba(239,68,68,0.65)] text-center space-y-5"
		>
			<div class="inline-flex p-3.5 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 shadow-inner">
				<AlertTriangle size={38} class="animate-pulse" />
			</div>

			<div class="space-y-2">
				<h2 class="text-2xl sm:text-3xl font-black tracking-wider text-red-500 uppercase font-mono drop-shadow">
					CRITICAL ALERT: THE DUCK IS FURIOUS!
				</h2>
				<p class="text-sm sm:text-base text-red-200/90 font-medium">
					I warned you: <span class="font-bold underline decoration-red-400 text-white">“DON'T TOUCH THAT! (DUCK IS GETTING ANGRY)”</span>! You poked the duck anyway, and now the entire server is burning down on a Friday!
				</p>
			</div>

			<!-- Terminal Glitch Log Box -->
			<div class="bg-black/90 rounded-xl p-3.5 text-left font-mono text-[11px] text-red-400 border border-red-900/60 space-y-1 shadow-inner overflow-hidden">
				<div class="text-red-300">&gt; [FATAL ERROR]: Duck patience depleted. Anger level: 1000%...</div>
				<div class="text-amber-400/90">&gt; git blame: You poked the duck. No rollbacks permitted.</div>
				<div class="text-red-400/80">&gt; AWS Alert: Cloud instances multiplying exponentially...</div>
				<div class="text-amber-300/80">&gt; Evacuation: Furious rubber duck currently launching missiles...</div>
			</div>

			<!-- Countdown and Emergency Action Button -->
			<div class="pt-2 space-y-3">
				<p class="text-xs font-mono text-amber-300">
					Auto-calming duck in <span class="text-sm font-black text-white px-2 py-0.5 rounded bg-red-600 shadow">{explosionCountdown}s</span>... (or press <kbd class="px-1.5 py-0.5 rounded bg-black/60 text-[10px] border border-white/20">ESC</kbd>)
				</p>

				<button
					onclick={restoreScreen}
					class="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm tracking-wide uppercase transition-all duration-200 transform hover:scale-[1.02] active:scale-98 shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer border-none flex items-center justify-center gap-2"
				>
					<RotateCcw size={16} />
					<span>APOLOGIZE TO DUCK & RESTORE PRODUCTION</span>
				</button>
			</div>
		</div>
	</div>
{/if}

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

	/* Caffeine Shake Animation */
	@keyframes caffeineShake {
		0%, 100% { transform: translateY(0) rotate(0deg) scale(1.05); }
		20% { transform: translateY(-2px) rotate(4deg) scale(1.08); }
		40% { transform: translateY(2px) rotate(-4deg) scale(1.05); }
		60% { transform: translateY(-3px) rotate(3deg) scale(1.08); }
		80% { transform: translateY(1px) rotate(-3deg) scale(1.06); }
	}
	.caffeine-shake {
		animation: caffeineShake 0.12s infinite !important;
	}

	/* Dizzy Spin Animation */
	@keyframes dizzySpin {
		0% { transform: rotate(0deg) translateY(0); }
		25% { transform: rotate(15deg) translateY(-4px); }
		50% { transform: rotate(-15deg) translateY(2px); }
		75% { transform: rotate(10deg) translateY(-2px); }
		100% { transform: rotate(0deg) translateY(0); }
	}
	.dizzy-spin {
		animation: dizzySpin 0.35s infinite ease-in-out !important;
	}

	/* Screen Shake Animation */
	@keyframes screenShake {
		0%, 100% { transform: translate(0, 0) rotate(0deg); }
		10% { transform: translate(-6px, -4px) rotate(-1deg); }
		20% { transform: translate(7px, 5px) rotate(1deg); }
		30% { transform: translate(-5px, 6px) rotate(0deg); }
		40% { transform: translate(6px, -3px) rotate(1deg); }
		50% { transform: translate(-4px, 4px) rotate(-1deg); }
		60% { transform: translate(5px, 2px) rotate(0deg); }
		70% { transform: translate(-6px, -5px) rotate(1deg); }
		80% { transform: translate(4px, 6px) rotate(-1deg); }
		90% { transform: translate(-3px, -2px) rotate(0deg); }
	}

	.screen-shake {
		animation: screenShake 0.4s ease-in-out infinite;
	}

	/* Flashing emergency strobe backdrop */
	@keyframes emergencyStrobe {
		0%, 100% { background: radial-gradient(circle at center, rgba(239, 68, 68, 0.25) 0%, transparent 70%); }
		50% { background: radial-gradient(circle at center, rgba(245, 158, 11, 0.35) 0%, transparent 75%); }
	}

	.emergency-strobe {
		animation: emergencyStrobe 0.6s infinite alternate ease-in-out;
	}

	/* Flying Particles & Code Snippets */
	@keyframes flyDebris1 {
		0% { transform: translate(-20vw, 110vh) rotate(0deg) scale(0.5); opacity: 0; }
		20% { opacity: 1; }
		80% { opacity: 0.9; }
		100% { transform: translate(110vw, -20vh) rotate(720deg) scale(1.8); opacity: 0; }
	}
	@keyframes flyDebris2 {
		0% { transform: translate(110vw, 90vh) rotate(0deg) scale(0.6); opacity: 0; }
		25% { opacity: 1; }
		85% { opacity: 0.9; }
		100% { transform: translate(-20vw, -10vh) rotate(-540deg) scale(2); opacity: 0; }
	}
	@keyframes flyDebris3 {
		0% { transform: translate(40vw, 110vh) rotate(0deg) scale(0.4); opacity: 0; }
		30% { opacity: 1; }
		100% { transform: translate(60vw, -20vh) rotate(360deg) scale(1.5); opacity: 0; }
	}

	.particle-1 { animation: flyDebris1 2.2s infinite ease-out; font-size: 2.5rem; }
	.particle-2 { animation: flyDebris2 1.8s infinite ease-out 0.3s; font-size: 3rem; }
	.particle-3 { animation: flyDebris3 2.5s infinite ease-out 0.7s; font-size: 2.5rem; }
	.particle-4 { animation: flyDebris1 1.9s infinite ease-out 1s; font-size: 3.5rem; }
	.particle-5 { animation: flyDebris2 2.1s infinite ease-out 0.5s; font-size: 2rem; }
	.particle-6 { animation: flyDebris3 2.4s infinite ease-out 1.2s; font-size: 2.8rem; }

	.particle-code-1 { animation: flyDebris1 2.8s infinite ease-out 0.2s; color: #f87171; font-size: 0.95rem; }
	.particle-code-2 { animation: flyDebris2 2.6s infinite ease-out 0.8s; color: #fbbf24; font-size: 0.9rem; }
	.particle-code-3 { animation: flyDebris3 3.1s infinite ease-out 0.4s; color: #f43f5e; font-size: 1rem; }
	.particle-code-4 { animation: flyDebris1 2.4s infinite ease-out 1.4s; color: #f87171; font-size: 1.1rem; }
	.particle-code-5 { animation: flyDebris2 2.7s infinite ease-out 0.9s; color: #fb923c; font-size: 1rem; }
	.particle-code-6 { animation: flyDebris3 2.9s infinite ease-out 1.1s; color: #ef4444; font-size: 1.05rem; }
</style>

