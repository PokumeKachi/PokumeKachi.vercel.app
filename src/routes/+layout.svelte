<script lang="ts">
	import "@picocss/pico/css/pico.css";
	import "./layout.css";

	import { onNavigate } from "$app/navigation";
	import { onMount } from "svelte";

	import { PAGE_TRANSITION_DURATION } from "$lib/animation";

	import Header from "./header.svelte";

	const PAGE_ANIMATION = {
		enter: {
			keyframes: [
				{ transform: "scale(0)", opacity: 0, filter: "blur(16px)" },
				{ transform: "scale(1)", opacity: 1, filter: "blur(0px)" }
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(0, 1, 0, 1)",
				fill: "forwards" as FillMode
			}
		},
		exit: {
			keyframes: [
				{ transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
				{ transform: "scale(2)", opacity: 0, filter: "blur(16px)" }
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(1, 0, 0, 1)",
				fill: "forwards" as FillMode
			}
		}
	};

	let { children } = $props();

	let navigating = $state(false);

	function enterPage() {
		const page = document.querySelector<HTMLElement>(".page");
		if (!page) return;

		page.getAnimations().forEach((a) => a.cancel());

		page.animate(
			PAGE_ANIMATION.enter.keyframes,
			PAGE_ANIMATION.enter.options
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

		navigating = true;

		const exit = page.animate(
			PAGE_ANIMATION.exit.keyframes,
			PAGE_ANIMATION.exit.options
		);

		return exit.finished.then(() => () => {
			page.getAnimations().forEach((a) => a.cancel());
			enterPage();
			navigating = false;
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="any" />
</svelte:head>

<Header {navigating} />
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
