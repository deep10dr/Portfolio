<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Project from '$lib/components/Project.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="relative w-full overflow-x-hidden min-h-screen animated-bg">
	<div class="relative z-10">
		<Navbar />

		<section id="hero">
			<HeroSection />
		</section>

		<section id="about">
			<About />
		</section>

		<section id="skills">
			<Skills />
		</section>

		<section id="projects">
			<Project />
		</section>

		<section id="contact">
			<Contact />
		</section>

		<Footer />
	</div>
</div>
