<script lang="ts">
	import "@picocss/pico/css/pico.css";
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { onNavigate } from "$app/navigation";
	import { onMount } from "svelte";
	import { PAGE_TRANSITION_DURATION } from "$lib/animation";

	const PAGE_ANIMATION = {
		enter: {
			keyframes: [
				{ transform: "scale(0)", opacity: 0, filter: "blur(16px)" },
				{ transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(0, 1, 0, 1)",
				fill: "forwards" as FillMode,
			},
		},
		exit: {
			keyframes: [
				{ transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
				{ transform: "scale(2)", opacity: 0, filter: "blur(16px)" },
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(.7, 0, .4, 1)",
				fill: "forwards" as FillMode,
			},
		},
	};

	let { children } = $props();

	function enterPage() {
		const page = document.querySelector<HTMLElement>(".page");
		if (!page) return;

		page.getAnimations().forEach((a) => a.cancel());

		page.animate(
			PAGE_ANIMATION.enter.keyframes,
			PAGE_ANIMATION.enter.options,
		);
	}

	onMount(() => {
		enterPage();
	});

	onNavigate((navigation) => {
		if (navigation.to?.url.pathname === navigation.from?.url.pathname)
			return;

		const page = document.querySelector<HTMLElement>(".page");
		if (!page) return;

		const exit = page.animate(
			PAGE_ANIMATION.exit.keyframes,
			PAGE_ANIMATION.exit.options,
		);

		return exit.finished.then(() => () => {
			page.getAnimations().forEach((a) => a.cancel());
			enterPage();
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="page">
	{@render children()}
</div>

<style>
	:global(html) {
		overflow-x: hidden;
	}

	.page {
		width: 100%;
	}
</style>
