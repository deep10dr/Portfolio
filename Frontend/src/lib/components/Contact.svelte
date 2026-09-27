<script>
	import { User, Mail, MessageSquare, Send, MapPin, Phone, Copy, Check, ExternalLink } from '@lucide/svelte';
	import { success } from '$lib/toast.svelte.js';
	import LinkedinIcon from '$lib/icons/LinkedinIcon.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import LeetcodeIcon from '$lib/icons/LeetcodeIcon.svelte';

	let formData = $state({ name: '', email: '', message: '' });
	let copied = $state(false);

	function copyEmail() {
		navigator.clipboard.writeText('deepakofficial81@gmail.com');
		copied = true;
		success('Email address copied to clipboard!');
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	function handleGetInTouch(e) {
		if (e) e.preventDefault();

		const name = formData.name.trim();
		const email = formData.email.trim();
		const message = formData.message.trim();

		const subject = encodeURIComponent(
			name ? `Portfolio Inquiry from ${name}` : 'Portfolio Inquiry for Deepak S'
		);

		let bodyContent = message || "Hi Deepak,\n\nI'd like to get in touch with you regarding...";
		if (name || email) {
			bodyContent += `\n\n---\nFrom: ${name || 'A visitor'} ${email ? `<${email}>` : ''}`;
		}
		const body = encodeURIComponent(bodyContent);

		const mailtoUrl = `mailto:deepakofficial81@gmail.com?subject=${subject}&body=${body}`;
		window.location.href = mailtoUrl;
		success('Redirecting to your mail send box...');
	}

	function openGmailWeb() {
		const name = formData.name.trim();
		const email = formData.email.trim();
		const message = formData.message.trim();

		const subject = encodeURIComponent(
			name ? `Portfolio Inquiry from ${name}` : 'Portfolio Inquiry for Deepak S'
		);

		let bodyContent = message || "Hi Deepak,\n\nI'd like to get in touch with you regarding...";
		if (name || email) {
			bodyContent += `\n\n---\nFrom: ${name || 'A visitor'} ${email ? `<${email}>` : ''}`;
		}
		const body = encodeURIComponent(bodyContent);

		const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=deepakofficial81@gmail.com&su=${subject}&body=${body}`;
		window.open(gmailUrl, '_blank', 'noopener,noreferrer');
		success('Opening Gmail in a new tab...');
	}
</script>

<div id="contact" class="min-h-screen flex items-center justify-center p-6 py-24 text-[#4C1A0F]">
	<div class="max-w-5xl w-full space-y-10">
		<!-- Section Header -->
		<div class="text-center">
			<h2 class="text-4xl md:text-5xl font-bold text-[#44A4D8] border-b-4 border-[#F68E0B] inline-block pb-2">
				Contact
			</h2>
		</div>

		<!-- 2-Column Responsive Layout -->
		<div class="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
			<!-- Left: Direct Info Cards (2 Cols) -->
			<div class="md:col-span-2 space-y-4">
				<!-- Email Card with Click-to-Copy -->
				<div class="p-5 rounded-2xl bg-[#FCF1D4]/90 border-2 border-[#44A4D8]/20 shadow-sm space-y-2">
					<div class="flex items-center justify-between">
						<span class="text-xs font-bold uppercase tracking-wider text-[#4A8EAC] flex items-center gap-1.5">
							<Mail size={15} /> Email
						</span>
						<button
							onclick={copyEmail}
							class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#44A4D8]/25 text-[#44A4D8] hover:bg-[#44A4D8] hover:text-white transition flex items-center gap-1 cursor-pointer"
						>
							{#if copied}
								<Check size={13} /> <span>Copied</span>
							{:else}
								<Copy size={13} /> <span>Copy</span>
							{/if}
						</button>
					</div>
					<a
						href="mailto:deepakofficial81@gmail.com"
						class="text-sm md:text-base font-bold text-[#4C1A0F] hover:text-[#44A4D8] transition break-all block"
					>
						deepakofficial81@gmail.com
					</a>
				</div>

				<!-- Location Card -->
				<div class="p-5 rounded-2xl bg-[#FCF1D4]/90 border-2 border-[#44A4D8]/20 shadow-sm space-y-1">
					<span class="text-xs font-bold uppercase tracking-wider text-[#4A8EAC] flex items-center gap-1.5">
						<MapPin size={15} /> Location
					</span>
					<p class="text-sm md:text-base font-bold text-[#4C1A0F]">
						Salem, Tamil Nadu, India
					</p>
				</div>

				<!-- Phone Card -->
				<div class="p-5 rounded-2xl bg-[#FCF1D4]/90 border-2 border-[#44A4D8]/20 shadow-sm space-y-1">
					<span class="text-xs font-bold uppercase tracking-wider text-[#4A8EAC] flex items-center gap-1.5">
						<Phone size={15} /> Phone
					</span>
					<a
						href="tel:+918015744859"
						class="text-sm md:text-base font-bold text-[#4C1A0F] hover:text-[#44A4D8] transition block"
					>
						+91 8015744859
					</a>
				</div>

				<!-- Social Profiles Pill Row -->
				<div class="p-4 rounded-2xl bg-white/90 border border-[#44A4D8]/25 shadow-xs flex items-center justify-around">
					<a
						href="https://www.linkedin.com/in/deepak-s-dr"
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn"
						class="text-[#44A4D8] hover:scale-115 transition-transform"
					>
						<LinkedinIcon size={22} />
					</a>
					<a
						href="https://github.com/deep10dr/"
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub"
						class="text-[#44A4D8] hover:scale-115 transition-transform"
					>
						<GithubIcon size={22} />
					</a>
					<a
						href="https://leetcode.com/u/deepdr10/"
						target="_blank"
						rel="noopener noreferrer"
						title="LeetCode"
						class="text-[#F68E0B] hover:scale-115 transition-transform"
					>
						<LeetcodeIcon size={22} />
					</a>
				</div>
			</div>

			<!-- Right: Direct Mail Action Box (3 Cols) -->
			<div class="md:col-span-3 bg-[#FCF1D4]/90 backdrop-blur-md p-7 md:p-9 rounded-3xl shadow-xl border-2 border-[#44A4D8]/20 space-y-6">
				<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4C1A0F]/10 pb-4">
					<div>
						<h3 class="text-xl font-bold text-[#4C1A0F]">Get In Touch</h3>
						<p class="text-xs text-[#4A8EAC] font-medium mt-0.5">
							Compose below or click to jump straight into your email send box.
						</p>
					</div>

					<!-- Direct 1-Click Launch Button -->
					<a
						href="mailto:deepakofficial81@gmail.com?subject=Hello%20Deepak%20-%20Let's%20Connect"
						class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#44A4D8] text-[#44A4D8] hover:text-white border border-[#44A4D8]/30 font-bold text-xs shadow-2xs transition-all cursor-pointer self-start sm:self-auto shrink-0"
						title="Open default email application"
					>
						<Mail size={14} />
						<span>Open Mailbox</span>
						<ExternalLink size={12} />
					</a>
				</div>

				<form onsubmit={handleGetInTouch} class="space-y-4">
					<!-- Name -->
					<div class="space-y-1.5">
						<label for="name-input" class="text-xs font-bold text-[#4C1A0F]/80 uppercase tracking-wider block">Your Name</label>
						<div class="flex items-center gap-3 bg-white/95 rounded-xl p-3.5 shadow-2xs border border-[#44A4D8]/25 focus-within:border-[#44A4D8] focus-within:ring-2 focus-within:ring-[#44A4D8]/30 transition-all">
							<User class="text-[#44A4D8] shrink-0" size={20} />
							<input
								id="name-input"
								type="text"
								name="name"
								bind:value={formData.name}
								placeholder="e.g. John Doe"
								class="w-full bg-transparent outline-none text-sm text-[#4C1A0F] placeholder-[#4C1A0F]/40 font-medium"
							/>
						</div>
					</div>

					<!-- Email -->
					<div class="space-y-1.5">
						<label for="email-input" class="text-xs font-bold text-[#4C1A0F]/80 uppercase tracking-wider block">Your Email (Optional)</label>
						<div class="flex items-center gap-3 bg-white/95 rounded-xl p-3.5 shadow-2xs border border-[#44A4D8]/25 focus-within:border-[#44A4D8] focus-within:ring-2 focus-within:ring-[#44A4D8]/30 transition-all">
							<Mail class="text-[#44A4D8] shrink-0" size={20} />
							<input
								id="email-input"
								type="email"
								name="email"
								bind:value={formData.email}
								placeholder="e.g. john@example.com"
								class="w-full bg-transparent outline-none text-sm text-[#4C1A0F] placeholder-[#4C1A0F]/40 font-medium"
							/>
						</div>
					</div>

					<!-- Message -->
					<div class="space-y-1.5">
						<label for="msg-input" class="text-xs font-bold text-[#4C1A0F]/80 uppercase tracking-wider block">Your Message</label>
						<div class="flex gap-3 bg-white/95 rounded-xl p-3.5 shadow-2xs border border-[#44A4D8]/25 focus-within:border-[#44A4D8] focus-within:ring-2 focus-within:ring-[#44A4D8]/30 transition-all">
							<MessageSquare class="text-[#44A4D8] shrink-0 mt-0.5" size={20} />
							<textarea
								id="msg-input"
								name="message"
								bind:value={formData.message}
								placeholder="Tell me about your project, idea, or questions..."
								rows="4"
								class="w-full bg-transparent outline-none text-sm text-[#4C1A0F] placeholder-[#4C1A0F]/40 resize-none font-medium"
							></textarea>
						</div>
					</div>

					<!-- Submit / Action Buttons -->
					<div class="pt-2 space-y-3">
						<button
							type="submit"
							class="w-full flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#F68E0B] text-white text-base font-bold rounded-xl shadow-md hover:bg-[#EE7B48] hover:shadow-lg transition duration-300 transform hover:scale-102 cursor-pointer border-none"
						>
							<Send size={18} />
							<span>Get In Touch (Send via Email)</span>
						</button>

						<!-- Webmail fallback: Open in Gmail Web -->
						<div class="flex items-center justify-between text-xs text-[#4C1A0F]/70 pt-1 px-1">
							<span>Prefer webmail in browser?</span>
							<button
								type="button"
								onclick={openGmailWeb}
								class="text-[#44A4D8] hover:text-[#F68E0B] font-bold underline cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1 transition-colors"
							>
								<span>Open in Gmail Web</span>
								<ExternalLink size={12} />
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
