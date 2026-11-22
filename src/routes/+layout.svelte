<script module lang="ts">
    import "../layout.css";

    import { onMount, onNavigate } from "$lib";

    import { acquireScrollLock } from "$lib/behaviors/ScrollLock.svelte";
    import { pageAnimation, headerAnimation } from "$lib/design-language";
    import getLenis from "$lib/singletons/lenis";

    import Header from "./Header.svelte";
    import ScrollProgress from "./ScrollProgress.svelte";
</script>

<script lang="ts">
    let { children } = $props();

    let navigating = $state(false);
    let headerHeight = $state(0);
    let introStarted = $state(false);

    let pageAnimationInstance: Animation | undefined;


    $effect(() => {
        document.documentElement.classList.toggle("navigating", navigating);
        document.documentElement.style.setProperty(
            "--header-height",
            `${headerHeight}px`,
        );
    });

    function animatePage(animation: {
        keyframes: Keyframe[];
        options: KeyframeAnimationOptions;
    }) {
        const page = document.querySelector<HTMLElement>("#page");
        if (!page) return;

        pageAnimationInstance?.cancel();
        return (pageAnimationInstance = page.animate(
            animation.keyframes,
            animation.options,
        ));
    }

    function afterAnimation(
        animation: Animation | undefined,
        done: () => void,
    ) {
        if (animation) animation.finished.then(done, done);
        else done();
    }

    onMount(() => {
        getLenis();

        animatePage(pageAnimation.intro);
        document
            .querySelector("header")
            ?.animate(headerAnimation.keyframes, headerAnimation.options);

        requestAnimationFrame(() => (introStarted = true));
    });

    onNavigate(({ from, to }) => {
        if (from?.url.pathname === to?.url.pathname) return;

        navigating = true;

        const release = acquireScrollLock();
        const exit = animatePage(pageAnimation.exit);

        if (!exit) {
            navigating = false;
            release();
            return;
        }

        return exit.finished.then(
            () => () => {
                navigating = false;
                afterAnimation(animatePage(pageAnimation.enter), release);
            },
            (error) => {
                navigating = false;
                release();

                if ((error as Error)?.name !== "AbortError") {
                    console.error(error);
                }
            },
        );
    });
</script>

<div class:loaded={introStarted} id="preload-overlay"></div>

<ScrollProgress />
<Header bind:headerHeight {navigating} />

<div id="page">
    <div id="header-spacer"></div>
    <div id="page-content">
        {@render children()}
    </div>
</div>

<style>
    #page {
        overflow: visible;
        transform-origin: center;
    }

    #header-spacer {
        height: var(--header-height);
    }

    #page-content {
        min-height: calc(100dvh - var(--header-height));
    }

    #preload-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: var(--pico-background-color);
    }

    #preload-overlay.loaded {
        display: none;
    }
</style>
