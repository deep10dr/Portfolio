<script>
	import { page } from '$app/stores';
</script>

<div
	class="h-screen w-full bg-[#FCF6DC] text-[#4C1A0F] flex flex-col items-center justify-center space-y-8 px-6"
>
	<h1 class="text-9xl font-extrabold text-[#44A4D8]">{$page.status}</h1>
	<p class="text-3xl text-center font-medium text-[#4C1A0F]">
		Oops! The page you're looking for doesn't exist.
	</p>

	<a href="/">
		<button
			class="bg-[#F68E0B] text-white text-2xl font-semibold py-3 px-12 rounded-full shadow-xl hover:bg-[#EE7B48] transition duration-300 transform hover:scale-110"
		>
			Back to Home
		</button>
	</a>
</div>
