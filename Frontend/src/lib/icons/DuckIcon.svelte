<script>
	let { size = 24, class: className = '' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 100 100"
	width={size}
	height={size}
	class={className}
	fill="none"
>
	<!-- Duck Body -->
	<path
		d="M20 62 Q18 85 52 85 Q85 85 92 68 Q95 60 88 56 Q80 52 75 55 Q70 42 60 32 Q45 20 32 30 Q22 38 25 50 Q20 54 20 62 Z"
		fill="#FBBF24"
		stroke="#4C1A0F"
		stroke-width="3"
		stroke-linejoin="round"
	/>
	<!-- Duck Wing -->
	<path
		d="M36 63 Q46 54 62 61 Q70 66 60 75 Q44 78 36 63 Z"
		fill="#F59E0B"
		stroke="#4C1A0F"
		stroke-width="2"
	/>
	<!-- Orange Beak -->
	<path
		d="M26 40 Q8 43 12 49 Q20 54 28 49 Z"
		fill="#F97316"
		stroke="#4C1A0F"
		stroke-width="2.5"
	/>
	<!-- Blush -->
	<circle cx="38" cy="43" r="3.5" fill="#F87171" opacity="0.65" />
	<!-- Eye -->
	<circle cx="34" cy="35" r="4" fill="#1E293B" />
	<circle cx="35.5" cy="33.5" r="1.5" fill="#FFFFFF" />
	<!-- Developer Glasses -->
	<rect
		x="27"
		y="29"
		width="13"
		height="11"
		rx="3"
		fill="none"
		stroke="#4C1A0F"
		stroke-width="2.5"
	/>
	<line x1="40" y1="35" x2="46" y2="36" stroke="#4C1A0F" stroke-width="2.5" />
</svg>
