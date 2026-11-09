<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import "./layout.css";

    import { onMount } from "svelte";
    import { onNavigate } from "$app/navigation";

    import { pageAnimation, headerAnimation } from "$lib";
    import getLenis from "$lib/singletons/lenis";

    import Header from "./Header.svelte";

    let { children } = $props();

    let navigating = $state(false);
    let headerHeight = $state(0);
    let introStarted = $state(false);

    $effect(() => {
        const root = document.documentElement;

        if (navigating) {
            root.classList.add("navigating");
        } else {
            root.classList.remove("navigating");
        }
    });

    let header = $state<{ morphTitle: (pathname: string) => void }>();

    let pageAnimationInstance: Animation | undefined;

    function animatePage(
        animation: (typeof pageAnimation)[keyof typeof pageAnimation],
    ) {
        const page = document.querySelector<HTMLElement>(".page");
        if (!page) return;

        pageAnimationInstance?.cancel();
        pageAnimationInstance = page.animate(
            animation.keyframes,
            animation.options,
        );

        return pageAnimationInstance;
    }

    onMount(() => {
        getLenis();

        animatePage(pageAnimation.intro);

        const headerElement = document.querySelector<HTMLElement>("header");

        headerElement?.animate(
            headerAnimation.keyframes,
            headerAnimation.options,
        );

        requestAnimationFrame(() => (introStarted = true));
    });

    onNavigate((navigation) => {
        const from = navigation.from?.url.pathname;
        const to = navigation.to?.url.pathname;

        if (to === from) return;

        navigating = true;

        header?.morphTitle(to ?? "/");

        const exit = animatePage(pageAnimation.exit);

        if (!exit) {
            navigating = false;
            return;
        }

        return exit.finished
            .then(() => () => {
                animatePage(pageAnimation.enter);
                navigating = false;
            })
            .catch(() => {
                navigating = false;
            });
    });
</script>

<div class:loaded={introStarted} class="before-page-load-overlay"></div>
<Header bind:this={header} bind:headerHeight {navigating} />
<div
    class="page"
    style={`--remaining-height: calc(100dvh - ${headerHeight}px)`}
>
    {@render children()}
</div>

<style>
    .page {
        min-height: 100vh;
        transform-origin: center;
    }

    .before-page-load-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;

        background: var(--pico-background-color);

        pointer-events: auto;
    }

    .before-page-load-overlay.loaded {
        display: none;
    }
</style>
