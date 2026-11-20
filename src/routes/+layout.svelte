<script lang="ts">
    import "../layout.css";

    import { onMount, onNavigate } from "$lib";

    import { acquireScrollLock } from "$lib/behaviors/ScrollLock.svelte";
    import { pageAnimation, headerAnimation } from "$lib/design-language";
    import getLenis from "$lib/singletons/lenis";

    import Header from "./Header.svelte";
    import ScrollProgress from "./ScrollProgress.svelte";

    let { children } = $props();

    let navigating = $state(false);
    let headerHeight = $state(0);
    let introStarted = $state(false);

    let pageAnimationInstance: Animation | undefined;

    $effect(() => {
        document.documentElement.classList.toggle("navigating", navigating);
    });

    function animatePage(
        animation: (typeof pageAnimation)[keyof typeof pageAnimation],
    ): Animation | undefined {
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
        callback: () => void,
    ) {
        if (animation) {
            animation.finished.then(callback, callback);
        } else {
            callback();
        }
    }

    onMount(() => {
        getLenis();

        animatePage(pageAnimation.intro);

        document
            .querySelector<HTMLElement>("header")
            ?.animate(headerAnimation.keyframes, headerAnimation.options);

        requestAnimationFrame(() => {
            introStarted = true;
        });
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
                const enter = animatePage(pageAnimation.enter);

                navigating = false;
                afterAnimation(enter, release);
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

<div id="page" style={`--header-height: ${headerHeight}px`}>
    <div id="header-spacer"></div>

    <div id="page-content">
        {@render children()}
    </div>
</div>

<style>
    #page {
        min-height: 100dvh;
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
