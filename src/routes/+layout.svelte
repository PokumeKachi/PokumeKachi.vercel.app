<script lang="ts">
    import "@picocss/pico/css/pico.css";
    import "./layout.css";

    import { acquireScrollLock } from "$lib/behaviors/ScrollLock.svelte";

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
        document.documentElement.classList.toggle("navigating", navigating);
    });

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

        const release = acquireScrollLock();

        const intro = animatePage(pageAnimation.intro);

        document
            .querySelector<HTMLElement>("header")
            ?.animate(headerAnimation.keyframes, headerAnimation.options);

        requestAnimationFrame(() => (introStarted = true));

        if (intro) {
            intro.finished.then(release, release);
        } else {
            release();
        }

        return release;
    });

    onNavigate((navigation) => {
        const from = navigation.from?.url.pathname;
        const to = navigation.to?.url.pathname;

        if (to === from) return;

        navigating = true;

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
            .catch((err) => {
                if ((err as Error)?.name !== "AbortError") console.error(err);
                navigating = false;
            });
    });
</script>

<div class:loaded={introStarted} class="before-page-load-overlay"></div>

<Header bind:headerHeight {navigating} />

<div
    class="page"
    style={`--remaining-height: calc(100svh - ${headerHeight}px)`}
>
    <div class="page-content">
        {@render children()}
    </div>
</div>

<style>
    .page {
        height: var(--remaining-height);
        overflow-y: auto;
        transform-origin: center;

        scrollbar-width: none;
    }

    .page::-webkit-scrollbar {
        display: none;
    }

    .page-content {
        min-height: 100%;
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
