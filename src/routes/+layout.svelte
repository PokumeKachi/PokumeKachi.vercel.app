<script lang="ts">
	import "@picocss/pico/css/pico.css";
	import "./layout.css";

	import { onMount } from "svelte";
	import { onNavigate } from "$app/navigation";

	import {
		PAGE_INTRODUCTION_DURATION,
		PAGE_TRANSITION_DURATION
	} from "$lib/animation";

	import Header from "./Header.svelte";

	const pageAnimation = {
		enter: {
			keyframes: [
				{
					transform: "translateY(50vh)",
					opacity: 0,
					filter: "blur(16px)"
				},
				{
					transform: "translateY(0)",
					opacity: 1,
					filter: "blur(0)"
				}
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(0, 1, 0, 1)",
				fill: "forwards" as FillMode
			}
		},

		exit: {
			keyframes: [
				{
					transform: "translateY(0)",
					opacity: 1,
					filter: "blur(0)"
				},
				{
					transform: "translateY(-50vh)",
					opacity: 0,
					filter: "blur(16px)"
				}
			],
			options: {
				duration: PAGE_TRANSITION_DURATION,
				easing: "cubic-bezier(1, 0, 0, 1)",
				fill: "forwards" as FillMode
			}
		}
	};

	const headerAnimation = {
		keyframes: [
			{ transform: "translateY(-100%)", opacity: 0 },
			{ transform: "translateY(0)", opacity: 1 }
		],
		options: {
			duration: PAGE_INTRODUCTION_DURATION,
			easing: "cubic-bezier(0, 1, 0, 1)",
			fill: "forwards" as FillMode
		}
	};

	let { children } = $props();
	let navigating = $state(false);

	let header: {
		morphTitle: (pathname: string) => void;
	};

	function animatePage(
		animation: typeof pageAnimation.enter,
		duration = animation.options.duration
	) {
		const page = document.querySelector<HTMLElement>(".page");
		if (!page) return;

		page.getAnimations().forEach((a) => a.cancel());

		return page.animate(animation.keyframes, {
			...animation.options,
			duration
		});
	}

	onMount(() => {
		animatePage(
			pageAnimation.enter,
			PAGE_INTRODUCTION_DURATION
		);

		const headerElement =
			document.querySelector<HTMLElement>("header");

		headerElement?.animate(
			headerAnimation.keyframes,
			headerAnimation.options
		);
	});

	onNavigate((navigation) => {
		const from = navigation.from?.url.pathname;
		const to = navigation.to?.url.pathname;

		if (to === from) return;

		navigating = true;

		header?.morphTitle(to ?? "/");

		const exit = animatePage(pageAnimation.exit);
		if (!exit) return;

		return exit.finished.then(() => () => {
			animatePage(pageAnimation.enter);
			navigating = false;
		});
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="/favicon.ico" sizes="any" />
</svelte:head>

<Header bind:this={header} {navigating} />
<div class="page">
	{@render children()}
</div>

<style>
	:global(html) {
		overflow: hidden auto;
		scrollbar-width: none;
	}

	:global(html::-webkit-scrollbar) {
		display: none;
	}

	.page {
		min-height: 100vh;
		transform-origin: center;
	}
</style>
